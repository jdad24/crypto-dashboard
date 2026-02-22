'use client';

import { Card, CardContent } from "@mui/material"
import { convertToCurrency } from "@/app/_lib/utils"
import { useEffect, useState } from "react";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PublicIcon from '@mui/icons-material/Public';
import Image from "next/image";

interface CardProps { title?: string, value?: string, className?: string }
interface CoinDataCardProps { marketCap: string, circulatingSupply: string, totalSupply: string, maxSupply: string, ath: string, high_24h: string, low_24h: string, className?: string }

export function HeaderCard({ title, className }: { title: string, className?: string }) {
    return (
        <Card className={`bg-gray-100  h-20 w-80 flex flex-row justify-center items-center ${className}`}>
            <CardContent>
                <div className="font-bold text-2xl">{title}</div>
            </CardContent>
        </Card>
    )
}
export function BalanceCard({ title, value, className }: CardProps) {

    return (
        <Card className={`bg-gray-100 flex flex-col justify-center w-100 h-30 pl-4 ${className}`}>
            <CardContent>
                <div className="font-bold text-2xl p-2">{value}</div>
                <div className="font-bold text-gray-600 text-lg p-2">{title}</div>
            </CardContent>
        </Card>
    )
}

export function MarketcapCard({ className }: CardProps) {
    const [marketCap, setMarketCap] = useState("-")

    useEffect(() => {
        const fetchMarketCap = async () => {
            try {
                const response = await fetch(`/api/v1/marketcap`, { cache: "no-store" })
                setMarketCap(convertToCurrency(await response.json(), 0))
            } catch (e) {
                setMarketCap("-")
            }
        }

        fetchMarketCap()
        setInterval(fetchMarketCap, 60000) // Refresh data every 60 seconds
    })

    return (
        <Card className={`bg-gray-100 flex flex-col justify-start w-100 h-40 pl-4 ${className}`}>
            <CardContent>
                <div className="font-bold text-gray-600 text-lg p-2">
                    <PublicIcon className="mr-2 inline fill-green-600" />Total Market Cap</div>
                <div className="font-bold text-2xl p-2">{marketCap}</div>
            </CardContent>
        </Card>
    )
}

export function TopGainersCard({ title, className }: CardProps) {
    const [gainers, setGainers] = useState([])

    useEffect(() => {
        const fetchGainers = async () => {
            try {
                const response = await fetch(`/api/v1/coins`, { cache: "no-store" })
                const data = await response.json()
                if (data.length > 0) {                    
                    const sortedGainers = data.sort((a: any, b: any) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                    const topGainers = sortedGainers.slice(0, 3)
                    setGainers(topGainers)
                } else {
                    setGainers([])
                }
            } catch (e) {
                setGainers([])
            }
        }

        fetchGainers()
        setInterval(fetchGainers, 60000) // Refresh data every 60 seconds
    }, [])

    return (
        <Card className={`bg-gray-100 flex flex-col justify-start w-100 h-40 pl-4 ${className}`}>
            <CardContent>
                <div className="font-bold text-gray-600 text-lg mb-2">{title}</div> 
                {gainers.map((coin: any, index) => {
                    const coinName = coin.name
                    const priceChange = coin.price_change_percentage_24h.toFixed(2)
                    const filePath = priceChange < 0 ? '/down-arrow.svg' : '/up-arrow.svg'
                    const textColor = priceChange < 0 ? 'text-red-600' : 'text-green-600'

                    return (
                        <div key={index} className="flex flex-row items-center justify-between p-1">
                            <div className="flex flex-row gap-2">
                                <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                                <div className="font-bold">{coinName}</div>
                            </div>
                            <div className={`${textColor} font-bold`}>
                                <Image src={filePath} alt="Price Change" width={12} height={12} className="mr-1 inline" />{priceChange}%
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export function TrendingCard({ title, className }: CardProps) {
    const [trending, setTrending] = useState([])

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch(`/api/v1/trending`, { cache: "no-store" })
                const data = (await response.json()).slice(0, 3)
                if (data.length > 0) {
                    setTrending(data)
                } else {
                    setTrending([])
                }
            } catch (e) {
                setTrending([])
            }
        }

        fetchTrending()
        setInterval(fetchTrending, 60000) // Refresh data every 60 seconds
    }, [])

    return (
        <Card className={`bg-gray-100 flex flex-col justify-start w-100 h-40 pl-4 ${className}`}>
            <CardContent>
                <div className="flex flex-row items-center font-bold text-gray-600 text-lg mb-2">
                    <WhatshotIcon className="mr-2 fill-orange-500" />{title}
                </div>
                {trending.map((coin: any, index) => {
                    const coinName = coin.item.name
                    const price24Change = coin.item.data.price_change_percentage_24h.usd.toFixed(2)
                    const filePath = price24Change < 0 ? '/down-arrow.svg' : '/up-arrow.svg'
                    const textColor = price24Change < 0 ? 'text-red-600' : 'text-green-600'

                    return (
                        <div key={index} className="flex flex-row items-center justify-between p-1">
                            <div className="flex flex-row gap-2">
                                <img src={coin.item.small} alt={coin.item.name} className="w-5 h-5" />
                                <div className="font-bold">{coinName}</div>
                            </div>
                            <div className={`${textColor} font-bold`}>
                                <Image src={filePath} alt="Trending Coin" width={12} height={12} className="mr-1 inline" />{price24Change}%
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export function CoinDataCard({ marketCap, circulatingSupply, totalSupply, maxSupply, className, ath, high_24h, low_24h }: CoinDataCardProps) {
    return (
        <Card className={`${className}flex flex-col justify-evenly bg-gray-100 w-100 h-70 p-3 font-bold`}>
            <CardContent>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">Market Cap</div>
                    <div>{marketCap}</div>
                </div>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">Circulating Supply</div>
                    <div>{circulatingSupply}</div>
                </div>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">Total Supply</div>
                    <div>{totalSupply}</div>
                </div>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">Max Supply</div>
                    <div>{maxSupply != "0" ? maxSupply : "Infinite"}</div>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">All Time High</div>
                    <div>{ath}</div>
                </div>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">24 Hour High</div>
                    <div>{high_24h}</div>
                </div>
                <div className="flex flex-row justify-between border-b border-gray-400">
                    <div className="w-40">24 Hour Low</div>
                    <div>{low_24h}</div>
                </div>
            </CardContent>
        </Card>
    )
}