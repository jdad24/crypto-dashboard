export async function GET() {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`, { cache: "no-store" })
        const data = await response.json()
        return new Response(JSON.stringify(data.coins), { status: 200 })
    } catch (e) {
        return new Response(JSON.stringify([]), { status: 500 })
    }
}