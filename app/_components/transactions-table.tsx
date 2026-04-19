'use client';

import { Transaction } from '../_lib/db';
import { deleteTransactionAction } from '../_lib/actions';
import { convertToCurrency } from '../_lib/utils';

export default function TransactionTable({ transactions, className }: { transactions: Transaction[], className?: string }) {

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="border-b border-white/10">
                    <tr>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Coin</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Transaction Total</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Quantity</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Average Coin Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Type</th>
                        <th className="text-left py-4 px-6 font-semibold text-white/80">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors duration-200 ${transaction.type === "Buy" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                            <td className='py-4 px-6'>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{transaction.coin.charAt(0)}</span>
                                    </div>
                                    <span className="font-semibold text-white">{transaction.coin}</span>
                                </div>
                            </td>
                            <td className='py-4 px-6 font-semibold text-white'>{convertToCurrency(Number(transaction.total))}</td>
                            <td className='py-4 px-6 text-white/80'>{transaction.quantity.toLocaleString()}</td>
                            <td className='py-4 px-6 text-white/80'>{convertToCurrency(Number(transaction.price_per_coin))}</td>
                            <td className='py-4 px-6'>
                                <span className={`font-bold px-3 py-1 rounded-full text-sm ${transaction.type === "Buy" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                                    {transaction.type}
                                </span>
                            </td>
                            <td className='py-4 px-6'>
                                <button
                                    className='bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold px-4 py-2 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50'
                                    onClick={() => deleteTransactionAction(transaction.id as number)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}