'use client';

import { capitalize, convertToCurrency } from "@/app/_lib/utils"
import AreaChart from "@/app/_components/area-chart"
import Image from "next/image"
import { CoinDataCard } from "@/app/_components/cards"
import { useEffect, useState } from "react"

interface ProfileContentProps {
    coin: string
}

interface CoinData {
    name: string
    id: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    total_supply: number
    circulating_supply: number
    max_supply: number,
    ath: number
    high_24h: number
    low_24h: number
}

interface ChartData {
    prices: Array<Array<number>>
    market_caps: Array<Array<number>>
}

export default function CoinProfileContent({ coin }: ProfileContentProps) {
    const [data, setData] = useState<CoinData>({
        name: "",
        id: "",
        image: "",
        current_price: 0,
        market_cap: 0,
        market_cap_rank: 0,
        total_supply: 0,
        circulating_supply: 0,
        max_supply: 0,
        ath: 0,
        high_24h: 0,
        low_24h: 0
    })
    const [chartData, setChartData] = useState<ChartData>({
        prices: [],
        market_caps: []
    })

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/v1/coins?id=${coin}`)
            const coinData = await response.json()
            const { id } = coinData[0]
            setData(coinData[0])

            const response2 = await fetch(`/api/v1/coins/history?coin=${id}`)
            const historicalData = await response2.json()
            setChartData(historicalData)
        })()
    }, [])

    return (
        <div className="mx-[5%] my-10 flex flex-row justify-between">
            <div className="flex flex-col">
                <div className="mb-10">
                    <h1 className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center text-3xl font-bold mb-1 gap-2" >
                            {data['image'] ? <Image src={data['image']} alt={data['name']} width={50} height={50} /> : null}
                            {capitalize(data['name'])}
                        </div>
                        <div className="bg-gray-400 text-white font-bold text-lg p-2 rounded-md">{data['market_cap_rank'] != 0 ? `#${data['market_cap_rank']}` : "-"}</div>
                    </h1>
                    <div className="text-5xl mt-2">{convertToCurrency(data['current_price'])} </div>
                </div>
                <CoinDataCard
                    marketCap={convertToCurrency(data['market_cap'], 0)}
                    circulatingSupply={Number(data['circulating_supply']).toLocaleString()}
                    totalSupply={Number(data['total_supply']).toLocaleString()}
                    maxSupply={Number(data['max_supply']).toLocaleString() ?? "Undefined"}
                    ath={convertToCurrency(data['ath'], 2)}
                    high_24h={convertToCurrency(data['high_24h'], 2)}
                    low_24h={convertToCurrency(data['low_24h'], 2)}
                />
            </div>
            <AreaChart chartData={chartData} />
        </div>
    )
}