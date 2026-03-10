'use client';

import { useEffect, useRef, useState } from "react";
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
    const [color, setColor] = useState('bg-red-400')

    const loaderRef = useRef(null)

    const fetchCoins = async () => {
        try {
            const response = await fetch(`/api/v1/coins`, { cache: "no-store" })
            const data: Array<Coin> = await response.json()
            setCoins(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const name = (entry.target as HTMLElement).dataset.name
                    if (name == '50') {
                        setColor('bg-green-200')
                    }
                }
            })

        })
        const rows = document.querySelectorAll('.h-15')
        rows.forEach(row => observer.observe(row))

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        if (color == 'bg-red-400') {
            fetchCoins()
            setInterval(fetchCoins, 60000) // Refresh data every 60 seconds
        }

        return () => observer.disconnect()
    }, [coins])

    const handleRowClick = (coin: { id: string }) => {
        router.push(`/coins/${coin['id']}`)
    }

    const renderTableRows = () => {
        return coins.map((coin, index) => {
            const textColor = coin['price_change_percentage_24h'] < 0 ? 'text-red-600' : 'text-green-600'
            const filePath = coin['price_change_percentage_24h'] < 0 ? '/down-arrow.svg' : '/up-arrow.svg'

            return (
                <TableRow data-name={index} key={index} className={`h-15 ${color} hover:bg-blue-400 cursor-pointer`} onClick={() => handleRowClick(coin)}>
                    <TableCell className="w-10">{coin['market_cap_rank']}</TableCell>
                    <TableCell className="h-15 min-w-50 font-bold">
                        <div className="flex flex-row justify-left items-center">
                            <Image className="mr-2" src={coin['image']} alt="Coin Image" width={25} height={25} style={{
                                width: '5%',
                                height: 'auto', // This preserves the aspect ratio
                            }} />
                            {coin['name']}
                        </div>
                    </TableCell>
                    <TableCell>{convertToCurrency(coin['current_price'])}</TableCell>
                    <TableCell className={`${textColor} h-15`}>
                        <div className="flex flex-row items-center">
                            <Image src={filePath} height={15} width={15} alt="Profile" className="mr-2" />
                            {Math.abs(Number(coin['price_change_percentage_24h'])).toFixed(2)}%
                        </div>
                    </TableCell>
                    <TableCell>{convertToCurrency(coin['market_cap'], 0)}</TableCell>
                </TableRow>
            )
        }
        )
    }


    return (
        <TableContainer component={Paper}>
            <Table className="w-full">
                <TableHead className="text-left">
                    <TableRow>
                        <TableCell className="w-10 font-bold">#</TableCell>
                        <TableCell className="w-20 font-bold">Coin</TableCell>
                        <TableCell className="w-20 font-bold">Price</TableCell>
                        <TableCell className="w-20 font-bold">24h</TableCell>
                        <TableCell className="w-20 font-bold">Market Cap</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="text-left">
                    {renderTableRows()}
                    <TableRow ref={loaderRef}><TableCell>Loading...</TableCell></TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

