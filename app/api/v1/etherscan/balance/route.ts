import { formatEther } from 'ethers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    const response = await fetch(`https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`);
    const data = await response.json();

    if (data.status === "1") {
        const etherBalance = formatEther(data.result);
        console.log(`Balance for address ${address}: ${etherBalance} ETH`);
        return Response.json({ balance: etherBalance });
    } else {
        return new Response(JSON.stringify({ error: data.message }), { status: 500 });
    }
}