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
import { convertToCurrency } from '../_lib/utils';

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='font-bold'>Coin</TableCell>
                        <TableCell className='font-bold'>Transaction Total</TableCell>
                        <TableCell className='font-bold'>Quantity</TableCell>
                        <TableCell className='font-bold'>Average Coin Price</TableCell>
                        <TableCell className='font-bold'>Type</TableCell>
                        <TableCell className='font-bold'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow className={`${transaction.type === "Buy" ? "bg-green-200" : "bg-red-200"}`} key={transaction.id}>
                            <TableCell className='font-semibold'>{transaction.coin}</TableCell>
                            <TableCell>{convertToCurrency(Number(transaction.total))}</TableCell>
                            <TableCell>{transaction.quantity.toLocaleString()}</TableCell>
                            <TableCell>{convertToCurrency(Number(transaction.price_per_coin))}</TableCell>
                            <TableCell className={`font-bold ${transaction.type === "Buy" ? "text-green-800" : "text-red-800"}`}>{transaction.type}</TableCell>
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