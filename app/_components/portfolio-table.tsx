'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PortfolioTable({ className }: { className?: string }) {

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
                    <TableRow>
                        <TableCell className='font-bold'>Chainlink</TableCell>
                        <TableCell>$208.75</TableCell>
                        <TableCell>$1,000,000</TableCell>
                        <TableCell>+$700,000</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )

}