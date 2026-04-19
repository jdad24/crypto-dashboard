import TransactionTable from "@/app/_components/transactions-table"
import { fetchTransactions } from "@/app/_lib/db";
import CryptoBreadcrumbs from "@/app/_components/breadcrumbs";

export default async function Page({ params }: { params: { coin: string } }) {
    const pathParams = await params;
    const coin = pathParams?.coin
    const transactions = await fetchTransactions(coin);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <CryptoBreadcrumbs className="mb-6" coin={coin} />
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{coin.charAt(0)}</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{coin} Transactions</h1>
                            <p className="text-white/70 text-lg">Detailed transaction history for {coin}</p>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-2">Transaction History</h2>
                        <p className="text-white/60">Complete record of your {coin} trades and transactions</p>
                    </div>
                    <div className="p-8">
                        <TransactionTable transactions={transactions} />
                    </div>
                </div>
            </div>
        </main>
    )
}