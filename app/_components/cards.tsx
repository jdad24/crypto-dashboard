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
        <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden w-full max-w-md ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                        <div className="font-semibold text-white/80 text-sm">{title}</div>
                        <div className="text-xs text-white/60">Current portfolio value</div>
                    </div>
                </div>
                <div className="text-3xl font-bold text-white">{value}</div>
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
                const jsonResponse = await response.json()
                console.log(jsonResponse)
                if (typeof jsonResponse === "number") {
                    setMarketCap(convertToCurrency(jsonResponse, 0))
                } else {
                    setMarketCap("-")
                }
            } catch (e) {
                setMarketCap("-")
            }
        }

        fetchMarketCap()
        setInterval(fetchMarketCap, 60000) // Refresh data every 60 seconds
    }, [])

    return (
        <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden w-full max-w-sm ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                        <PublicIcon className="text-green-400 w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-semibold text-white/80 text-sm">Total Market Cap</div>
                        <div className="text-xs text-white/60">Global cryptocurrency value</div>
                    </div>
                </div>
                <div className="text-2xl font-bold text-white">{marketCap}</div>
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
        <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden w-full max-w-sm ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                        <WhatshotIcon className="text-orange-400 w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-semibold text-white/80 text-sm">{title}</div>
                        <div className="text-xs text-white/60">Top performing coins</div>
                    </div>
                </div>
                <div className="space-y-3">
                    {gainers.map((coin: any, index) => {
                        const coinName = coin.name
                        const priceChange = coin.price_change_percentage_24h.toFixed(2)
                        const filePath = priceChange < 0 ? '/down-arrow.svg' : '/up-arrow.svg'
                        const textColor = priceChange < 0 ? 'text-red-400' : 'text-green-400'

                        return (
                            <div key={index} className="flex flex-row items-center justify-between p-2 bg-white/5 rounded-lg">
                                <div className="flex flex-row gap-3 items-center">
                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                                    <div className="font-medium text-white text-sm">{coinName}</div>
                                </div>
                                <div className={`${textColor} font-bold text-sm flex items-center`}>
                                    <Image src={filePath} alt="Price Change" width={12} height={12} className="mr-1" />{priceChange}%
                                </div>
                            </div>
                        )
                    })}
                </div>
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
        <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden w-full max-w-sm ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <WhatshotIcon className="text-blue-400 w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-semibold text-white/80 text-sm">{title}</div>
                        <div className="text-xs text-white/60">Most searched coins</div>
                    </div>
                </div>
                <div className="space-y-3">
                    {trending.map((coin: any, index) => {
                        const coinName = coin.item.name
                        const price24Change = coin.item.data.price_change_percentage_24h.usd.toFixed(2)
                        const filePath = price24Change < 0 ? '/down-arrow.svg' : '/up-arrow.svg'
                        const textColor = price24Change < 0 ? 'text-red-400' : 'text-green-400'

                        return (
                            <div key={index} className="flex flex-row items-center justify-between p-2 bg-white/5 rounded-lg">
                                <div className="flex flex-row gap-3 items-center">
                                    <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6 rounded-full" />
                                    <div className="font-medium text-white text-sm">{coinName}</div>
                                </div>
                                <div className={`${textColor} font-bold text-sm flex items-center`}>
                                    <Image src={filePath} alt="Price Change" width={12} height={12} className="mr-1" />{price24Change}%
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export function CoinDataCard({ marketCap, circulatingSupply, totalSupply, maxSupply, className, ath, high_24h, low_24h }: CoinDataCardProps) {
    const renderStat = (label: string, value: string) => (
        <div className="flex flex-col justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-white/80 font-medium">{label}</span>
            <span className="text-white font-semibold">{value}</span>
        </div>
    )
    return (
        <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden w-full max-w-2xl ${className}`}>
            <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Market Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        {renderStat("Market Cap", marketCap)}
                        {renderStat("Circulating Supply", circulatingSupply)}
                        {renderStat("Total Supply", totalSupply)}
                        {renderStat("Max Supply", maxSupply != "0" ? maxSupply : "Infinite")}
                    </div>
                    <div className="space-y-4">
                        {renderStat("All Time High", ath)}
                        {renderStat("24h High", high_24h)}
                        {renderStat("24h Low", low_24h)}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}