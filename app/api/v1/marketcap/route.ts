import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const url = "https://api.coingecko.com/api/v3/global"
    const options = {
        headers: {
            'x-cg-demo-api-key': `${process.env.CG_API_KEY}`
        },
        next: { revalidate: 60 }
    }

    try {
        const response = await fetch(url, options)

        if (response.ok) {
            const { data } = await response.json()                      
            const totalMarketcap = Number(data?.['total_market_cap']?.['usd']) || 0
            return NextResponse.json(totalMarketcap)
        }

        throw new Error(response.statusText || "Failed to fetch market cap data")
    } catch (e) {
        console.error(e)
        return NextResponse.json(String(e))
    }
}