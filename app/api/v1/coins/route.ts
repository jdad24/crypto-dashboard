import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
    const options = {
        headers: {
            'x-cg-demo-api-key': `${process.env.CG_API_KEY}`
        }
    }
    const coinId = request.nextUrl.searchParams.get("id")

    if (coinId) {
        url += `&ids=${coinId}`
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json()        
        return NextResponse.json(data)
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}