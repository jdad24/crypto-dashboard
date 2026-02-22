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
        <div className="h-screen mx-[5%] flex flex-col">
            <div className="flex flex-row justify-end my-2 space-x-2">
                <TransactionButton />
                <DownloadButton transactions={transactions} />
            </div>
            <BalanceCard title="Portfolio Value" value={currentPortfolioValue} />
            <div className="rounded-lg shadow-black shadow-lg p-8 my-4 bg-blue-400/80">
                <h2 className="text-2xl font-bold mb-4">Your Holdings</h2>
                <PortfolioTable className="mt-10" coinData={coinData} transactions={transactions} />
            </div>
        </div>
    )
}