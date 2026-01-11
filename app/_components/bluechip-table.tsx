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
}

export function BluechipTable() {
    const [coins, setCoins] = useState<Array<Coin>>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(`/api/v1/coins`)
                const data: Array<Coin> = await response.json()
                setCoins(data)
            } catch (e) {
                console.error(e)
            }
        }

        fetchCoins()
    }, [])

    const handleRowClick = (coin: { id: string }) => {
        router.push(`/coins/${coin['id']}`)
    }

    const renderTableRows = () => {
        return coins.map((coin, index) =>
            <TableRow key={index} className="hover:bg-blue-400 cursor-pointer" onClick={() => handleRowClick(coin)}>
                <TableCell className="w-10">{coin['market_cap_rank']}</TableCell>
                <TableCell className="min-w-50 h-15 flex flex-row justify-left items-center font-bold">
                    <Image className="mr-2" src={coin['image']} alt="Coin Image" width={25} height={25} style={{
                        width: '5%',
                        height: 'auto', // This preserves the aspect ratio
                    }} />
                    {coin['name']}
                </TableCell>
                <TableCell>{convertToCurrency(coin['current_price'])}</TableCell>
                <TableCell>{convertToCurrency(coin['market_cap'], 0)}</TableCell>
            </TableRow>
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
                        <TableCell className="w-20 font-bold">Market Cap</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="text-left">
                    {renderTableRows()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

