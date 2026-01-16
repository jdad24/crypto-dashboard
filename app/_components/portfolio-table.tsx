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

export default function PortfolioTable({ className, transactions }: { className?: string, transactions: Transaction[] }) {
    const [portfolio, setPortfolio] = useState<Array<Holding>>([]);
    const router = useRouter();

    useEffect(() => {
        const holdingTracker: Array<Holding> = [];
        transactions.forEach((transaction) => {
            const exists = holdingTracker.find(record => record.coin === transaction.coin);
            if (!exists) {
                holdingTracker.push({
                    coin: transaction.coin,
                    total: Number(transaction.total),
                    quantity: Number(transaction.quantity),
                    pricePerCoin: Number(transaction.price_per_coin)
                });
            } else {
                holdingTracker[holdingTracker.indexOf(exists)].total += Number(transaction.total);
                holdingTracker[holdingTracker.indexOf(exists)].quantity += Number(transaction.quantity);
                holdingTracker[holdingTracker.indexOf(exists)].pricePerCoin = holdingTracker[holdingTracker.indexOf(exists)].total / holdingTracker[holdingTracker.indexOf(exists)].quantity;
            }
        })

        setPortfolio(holdingTracker)

    }, [transactions]);
    return (
        <TableContainer className={className} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='font-bold'>Coin</TableCell>
                        <TableCell className='font-bold'>Total Value</TableCell>
                        <TableCell className='font-bold'>Quantity</TableCell>
                        <TableCell className='font-bold'>Average Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        portfolio.map((record) => (
                            <TableRow key={record.coin} onClick={() => router.push(`/portfolio/${record.coin}`)} className='cursor-pointer hover:bg-gray-100'>
                                <TableCell className='font-bold'>{record.coin}</TableCell>
                                <TableCell>{convertToCurrency(record.total)}</TableCell>
                                <TableCell>{record.quantity.toLocaleString()}</TableCell>
                                <TableCell>{convertToCurrency(record.pricePerCoin)}</TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )

}