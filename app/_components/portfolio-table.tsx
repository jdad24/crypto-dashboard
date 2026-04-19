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
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="border-b border-white/10">
                    <tr>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Coin</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Current Value</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Quantity</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Average Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">P/L</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        portfolio.map((record) => {
                            const currentValue = calculateCurrentValue(record.coin, record.quantity);
                            const profitLoss = currentValue - (record.pricePerCoin * record.quantity);
                            const profitLossColor = profitLoss >= 0 ? 'text-green-400' : 'text-red-400';

                            return (
                                <tr key={record.coin} onClick={() => router.push(`/portfolio/${record.coin}`)} className='cursor-pointer hover:bg-white/5 transition-colors duration-200 border-b border-white/5'>
                                    <td className='py-4 px-6'>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">{record.coin.charAt(0)}</span>
                                            </div>
                                            <span className="font-semibold text-white">{record.coin}</span>
                                        </div>
                                    </td>
                                    <td className='py-4 px-6 font-semibold text-white'>{convertToCurrency(currentValue)}</td>
                                    <td className='py-4 px-6 text-white/80'>{record.quantity.toLocaleString()}</td>
                                    <td className='py-4 px-6 text-white/80'>{convertToCurrency(record.pricePerCoin)}</td>
                                    <td className={`py-4 px-6 font-semibold ${profitLossColor}`}>{convertToCurrency(profitLoss)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}