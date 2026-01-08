'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Transaction } from '../_lib/db';

export default function PortfolioTable({ className, transactions }: { className?: string, transactions: Transaction[] }) {

    return (
        <TableContainer className={className} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='font-bold'>Coin</TableCell>
                        <TableCell className='font-bold'>Price</TableCell>
                        <TableCell className='font-bold'>Holdings</TableCell>
                        <TableCell className='font-bold'>Profit/Loss</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className='font-bold'>{transaction.coin}</TableCell>
                                <TableCell>${transaction.price_per_coin}</TableCell>
                                <TableCell>{transaction.quantity}</TableCell>
                                <TableCell>${(transaction.quantity * transaction.price_per_coin).toFixed(2)}</TableCell>
                            </TableRow>
                        ))
                    }
            
                </TableBody>
            </Table>
        </TableContainer>
    )

}