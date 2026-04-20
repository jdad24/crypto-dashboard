import { request } from "https";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const address = url.searchParams.get("address");
    // const address = "0x4f3adCB5812Ed3d785a6E0e87EAfd79dBac896A4"

    const res = await fetch(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBalance",
                params: [address, "latest"],
            }),
            next: { revalidate: 60 }
        }
    );

    console.log(res)

    const data = await res.json();
    console.log(data)

    if (!data.result) {
        return Response.json({ error: data.error || "No result" }, { status: 500 });
    }

    const wei = BigInt(data.result);
    const eth = Number(wei) / 1e18;


    const priceRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum`, {
        headers: {
            'x-cg-demo-api-key': `${process.env.CG_API_KEY}`
        }});

    const priceData = await priceRes.json();
    const ethPrice = priceData?.[0]?.current_price || null;
    const usdValue = eth * ethPrice;

    return Response.json({ address, eth, usdValue });
}