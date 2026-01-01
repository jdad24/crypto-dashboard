import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const coin = request.nextUrl.searchParams.get("coin")

    try {
        if (!coin) throw Error("Invalid token value")
        
        const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&interval=daily&days=365`
        const options = {headers: {'x-cg-demo-api-key': `${process.env.CG_API_KEY}`}}

        const response = await fetch(url, options)
        const data = await response.json()
        return NextResponse.json(data)

    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}