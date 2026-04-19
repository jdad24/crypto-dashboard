export const runtime = "nodejs";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const address = url.searchParams.get("address");
    // const address = "0x4f3adCB5812Ed3d785a6E0e87EAfd79dBac896A4"

    const baseUrl = url.origin;

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
        }
    );

    const data = await res.json();

    if (!data.result) {
        return Response.json({ error: data.error || "No result" }, { status: 500 });
    }

    const wei = BigInt(data.result);
    const eth = Number(wei) / 1e18;

    const priceRes = await fetch(`${baseUrl}/api/v1/coins?id=ethereum`);
    const priceData = await priceRes.json();
    const ethPrice = priceData?.[0]?.current_price || null;
    const usdValue = eth * ethPrice;

    return Response.json({ address, eth, usdValue });
}