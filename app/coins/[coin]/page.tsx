import { capitalize, convertToCurrency } from "@/utils"
import { headers } from "next/headers"
import AreaChart from "@/app/_components/area-chart"
import Image from "next/image"
import { CoinDataCard } from "@/app/_components/cards"

export default async function CoinProfile({ params }: { params: Promise<{ coin: string }> }) {
    const { coin } = await params
    const host = await getHostUrl()

    const response = await fetch(`${host}/api/v1/coins?id=${coin}`)
    const coinData = await response.json()
    console.log(coinData[0])
    const { name, id, image: imageUrl, current_price, market_cap, total_supply, circulating_supply, max_supply } = coinData[0]

    const response2 = await fetch(`${host}/api/v1/coins/history?coin=${id}`)
    const historicalData = await response2.json()

    return (
        <div className="mx-[5%] my-10 flex flex-row justify-between">
            <div className="flex flex-col">
                <div className="mb-10">
                    <h1 className="flex flex-row items-center text-3xl font-bold mb-1 gap-2">
                        <Image src={imageUrl} alt={name} width={50} height={50} />{capitalize(name)}
                    </h1>
                    <div className="text-5xl">{convertToCurrency(current_price)} </div>
                </div>
                <CoinDataCard
                    marketCap={convertToCurrency(market_cap, 0)}
                    circulatingSupply={Number(circulating_supply).toLocaleString()}
                    totalSupply={Number(total_supply).toLocaleString()}
                    maxSupply={Number(max_supply).toLocaleString() ?? "Undefined"}
                />
            </div>
            <AreaChart historicalData={historicalData} />
        </div>
    )
}

export async function getHostUrl() {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';

    return `${protocol}://${host}`;
}