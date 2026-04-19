import { BalanceCard } from "../_components/cards";
import PortfolioTable from "../_components/portfolio-table";
import TransactionButton from "../_components/transaction-button";
import DownloadButton from "../_components/download-transactions-button";
import { fetchTransactions } from "../_lib/db";
import { convertToCurrency } from "../_lib/utils";
import { headers } from "next/headers";

interface Coin {
    id: string
    market_cap_rank: string
    current_price: number
    market_cap: number
    image: string
    name: string
    price_change_percentage_24h: number
}

export default async function Portfolio() {
    const headerList = await headers();
    const host = headerList.get("host");
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const origin = `${protocol}://${host}`;

    const transactions = await fetchTransactions();
    const coinData: Coin[] = await fetch(`${origin}/api/v1/coins`).then(response => response.json())

    const currentPortfolioValue = convertToCurrency(transactions.reduce((amount, transaction) => {
        const coinInfo = coinData.find((coinRecord) => coinRecord.name.toLowerCase() === transaction.coin.toLowerCase());
        if (coinInfo) {
            return amount + Number(transaction.quantity) * coinInfo.current_price;
        }
        return amount;
    }, 0), 2);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Portfolio</h1>
                        <p className="text-white/70">Track your cryptocurrency investments</p>
                    </div>
                    <div className="flex gap-3">
                        <TransactionButton />
                        <DownloadButton transactions={transactions} />
                    </div>
                </div>

                {/* Portfolio Value Card */}
                <div className="mb-8">
                    <BalanceCard title="Portfolio Value" value={currentPortfolioValue} />
                </div>

                {/* Holdings Table */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-2">Your Holdings</h2>
                        <p className="text-white/60">Detailed view of your cryptocurrency portfolio</p>
                    </div>
                    <div className="p-8">
                        <PortfolioTable className="mt-0" coinData={coinData} transactions={transactions} />
                    </div>
                </div>
            </div>
        </main>
    )
}