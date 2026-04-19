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
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                <div className="flex md:flex-row flex-col justify-between gap-8">
                    <div className="flex flex-col flex-1">
                        {/* Header Section */}
                        <div className="mb-8">
                            <div className="flex flex-row justify-between items-center mb-4">
                                <div className="flex flex-row items-center text-4xl font-bold gap-4 text-white">
                                    {data['image'] ? <Image src={data['image']} alt={data['name']} width={60} height={60} className="rounded-full" /> : null}
                                    <span>{capitalize(data['name'])}</span>
                                </div>
                                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg">
                                    {data['market_cap_rank'] != 0 ? `#${data['market_cap_rank']}` : "-"}
                                </div>
                            </div>
                            <div className="text-6xl font-bold text-white mt-4">{convertToCurrency(data['current_price'])}</div>
                            <div className="text-white/60 mt-2">Current Price</div>
                        </div>

                        {/* Market Statistics Card */}
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

                    {/* Chart Section */}
                    <div className="flex-1">
                        <AreaChart className="w-full" chartData={chartData} />
                    </div>
                </div>
            </div>
        </main>
    )
}