import { NextRequest } from "next/server";

export async function GET(response: NextRequest) {
    const address = response.nextUrl.searchParams.get("address");
    // const address = "0x4f3adCB5812Ed3d785a6E0e87EAfd79dBac896A4"

    if(!address) {
        throw new Error("Address parameter is required");
    }

    try {
        const res = await fetch(
            `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            {
                next: { revalidate: 60 },
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: "0x0",
                            toBlock: "latest",
                            toAddress: address,
                            category: ["external", "erc20", "erc721"],
                        },
                    ],
                }),
            }
        );

        const data = await res.json();
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch transaction history" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

