'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Transaction } from '../_lib/db';
import { deleteTransactionAction } from '../_lib/actions';

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='font-bold'>Coin</TableCell>
                        <TableCell className='font-bold'>Total Value</TableCell>
                        <TableCell className='font-bold'>Quantity</TableCell>
                        <TableCell className='font-bold'>Price</TableCell>
                        <TableCell className='font-bold'>Type</TableCell>
                        <TableCell className='font-bold'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className='font-semibold'>{transaction.coin}</TableCell>
                            <TableCell>{transaction.total.toLocaleString()}</TableCell>
                            <TableCell>{transaction.quantity.toLocaleString()}</TableCell>
                            <TableCell>{transaction.price_per_coin.toLocaleString()}</TableCell>
                            <TableCell>{transaction.quantity > 0 ? "Buy" : "Sell"}</TableCell>
                            <TableCell>
                                <Button className='text-red-800 border-gray-400 shadow-sm shadow-gray-400 border-1 font-bold' onClick={() => deleteTransactionAction(transaction.id as number)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}