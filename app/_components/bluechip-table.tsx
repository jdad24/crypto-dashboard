'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { convertToCurrency } from "@/app/_lib/utils";
import { useRouter } from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Coin {
    id: string
    market_cap_rank: string
    current_price: number
    market_cap: number
    image: string
    name: string
    price_change_percentage_24h: number
}

export function BluechipTable() {
    const [coins, setCoins] = useState<Array<Coin>>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(`/api/v1/coins`, { next: { revalidate: 60 } })
                const data: Array<Coin> = await response.json()
                setCoins(data)
            } catch (e) {
                console.error(e)
            }
        }

        fetchCoins()
        setInterval(fetchCoins, 60000) // Refresh data every 60 seconds
    }, [])

    const handleRowClick = (coin: { id: string }) => {
        router.push(`/coins/${coin['id']}`)
    }

    const renderTableRows = () => {
        return coins.map((coin, index) => {
            const textColor = coin['price_change_percentage_24h'] < 0 ? 'text-red-600' : 'text-green-600'
            const filePath = coin['price_change_percentage_24h'] < 0 ? '/down-arrow.svg' : '/up-arrow.svg'
            return (
                <tr key={index} className="hover:bg-white/5 cursor-pointer transition-colors duration-200 border-b border-white/5" onClick={() => handleRowClick(coin)}>
                    <td className="py-4 px-6 text-white/70 font-medium">{coin['market_cap_rank']}</td>
                    <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                            <Image className="rounded-full" src={coin['image']} alt="Coin Image" width={32} height={32} />
                            <span className="font-semibold text-white">{coin['name']}</span>
                        </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">{convertToCurrency(coin['current_price'])}</td>
                    <td className="py-4 px-6">
                        <div className={`flex items-center gap-2 font-semibold ${textColor}`}>
                            <Image src={filePath} height={16} width={16} alt="Price change" />
                            {Math.abs(Number(coin['price_change_percentage_24h'])).toFixed(2)}%
                        </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">{convertToCurrency(coin['market_cap'], 0)}</td>
                </tr>
            )
        }
        )
    }


    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="border-b border-white/10">
                    <tr>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">#</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Coin</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">24h</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    )
}

