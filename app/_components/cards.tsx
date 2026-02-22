'use client';

import { Card, CardContent } from "@mui/material"
import { convertToCurrency } from "@/app/_lib/utils"
import { useEffect, useState } from "react";

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
        setInterval(fetchMarketCap, 10000) // Refresh data every 10 seconds
    })

    return (
        <Card className={`bg-gray-100 flex flex-col justify-center w-100 h-30 pl-4 ${className}`}>
            <CardContent>
                <div className="font-bold text-2xl p-2">{marketCap}</div>
                <div className="font-bold text-gray-600 text-lg p-2">Total Market Cap</div>
            </CardContent>
        </Card>
    )
}

export function CoinDataCard({ marketCap, circulatingSupply, totalSupply, maxSupply, className, ath, high_24h, low_24h }: CoinDataCardProps) {
    return (
        <Card className={`${className}flex flex-col justify-evenly bg-gray-100 w-100 h-70 p-3 font-bold`}>
            <CardContent>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Market Cap</div>
                    <div>{marketCap}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Circulating Supply</div>
                    <div>{circulatingSupply}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Total Supply</div>
                    <div>{totalSupply}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Max Supply</div>
                    <div>{maxSupply != "0" ? maxSupply : "Infinite"}</div>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">All Time High</div>
                    <div>{ath}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">24 Hour High</div>
                    <div>{high_24h}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">24 Hour Low</div>
                    <div>{low_24h}</div>
                </div>
            </CardContent>
        </Card>
    )
}