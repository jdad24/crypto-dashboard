'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Transaction } from '../_lib/db';
import { useEffect, useState } from 'react';
import { convertToCurrency } from '../_lib/utils';
import { useRouter } from 'next/navigation';

interface Holding {
    coin: string;
    total: number;
    quantity: number;
    pricePerCoin: number;
}

interface Coin {
    id: string
    market_cap_rank: string
    current_price: number
    market_cap: number
    image: string
    name: string
    price_change_percentage_24h: number
}

export default function PortfolioTable({ className, transactions, coinData }: { className?: string, transactions: Transaction[], coinData: Array<Coin> }) {
    const [portfolio, setPortfolio] = useState<Array<Holding>>([]);
    const router = useRouter();

    useEffect(() => {
        const holdingTracker: Array<Holding> = [];
        transactions.forEach((transaction) => {
            const exists = holdingTracker.find(record => record.coin === transaction.coin);

            if (!exists) {
                holdingTracker.push({
                    coin: transaction.coin,
                    total: transaction.type == "Buy" ? Number(transaction.total) : - Number(transaction.total),
                    quantity: transaction.type == "Buy" ? Number(transaction.quantity) : - Number(transaction.quantity),
                    pricePerCoin: Number(transaction.price_per_coin)
                });
            } else {
                if (transaction.type == "Buy") {
                    holdingTracker[holdingTracker.indexOf(exists)].total += Number(transaction.total);
                    holdingTracker[holdingTracker.indexOf(exists)].quantity += Number(transaction.quantity);
                } else if (transaction.type == "Sell") {
                    holdingTracker[holdingTracker.indexOf(exists)].total -= Number(transaction.total);
                    holdingTracker[holdingTracker.indexOf(exists)].quantity -= Number(transaction.quantity);
                }

                holdingTracker[holdingTracker.indexOf(exists)].pricePerCoin = holdingTracker[holdingTracker.indexOf(exists)].total / holdingTracker[holdingTracker.indexOf(exists)].quantity;
            }
        })

        setPortfolio(holdingTracker)

    }, [transactions]);

    const calculateCurrentValue = (coin: string, quantity: number): number => {
        const coinInfo = coinData.find((coinRecord) => coinRecord.name.toLowerCase() === coin.toLowerCase());
        console.log(coinData)
        if (coinInfo) {
            return quantity * coinInfo.current_price;
        }
        return 0;
    }

    return (
        <TableContainer className={className} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='font-bold'>Coin</TableCell>
                        <TableCell className='font-bold'>Current Value</TableCell>
                        <TableCell className='font-bold'>Quantity</TableCell>
                        <TableCell className='font-bold'>Average Price</TableCell>
                        <TableCell className='font-bold'>P/L</TableCell>
                        {/* <TableCell className='font-bold'>Purchase Value</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        portfolio.map((record) => {
                            const currentValue = calculateCurrentValue(record.coin, record.quantity);
                            return (
                                <TableRow key={record.coin} onClick={() => router.push(`/portfolio/${record.coin}`)} className='cursor-pointer hover:bg-gray-100'>
                                    <TableCell className='font-bold'>{record.coin}</TableCell>
                                    <TableCell>{convertToCurrency(currentValue)}</TableCell>
                                    <TableCell>{record.quantity.toLocaleString()}</TableCell>
                                    <TableCell>{convertToCurrency(record.pricePerCoin)}</TableCell>
                                    <TableCell>{convertToCurrency(currentValue - (record.pricePerCoin * record.quantity))}</TableCell>
                                    {/* <TableCell>{convertToCurrency(record.total)}</TableCell> */}
                                </TableRow>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )

}