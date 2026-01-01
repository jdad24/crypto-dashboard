import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const url = "https://api.coingecko.com/api/v3/global"
    const options = {
        headers: {
            'x-cg-demo-api-key': `${process.env.CG_API_KEY}`
        }
    }

    try {
        const response = await fetch(url, options)
        const { data } = await response.json()
        const totalMarketcap = data?.['total_market_cap']?.['usd']

        if (totalMarketcap) {
            return NextResponse.json(totalMarketcap)
        }

        throw new Error("Total marketcap fetch failure")
    } catch (e) {
        console.error(e)
        return NextResponse.json(String(e))
    }
}