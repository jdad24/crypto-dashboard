import { BalanceCard } from "../_components/cards";
import PortfolioTable from "../_components/portfolio-table";
import TransactionButton from "../_components/transaction-button";
import { fetchTransactions } from "../_lib/db";
import { convertToCurrency } from "../_lib/utils";

export default async function Portfolio() {
    const transactions = await fetchTransactions();
    const portfolioValue = convertToCurrency(transactions.reduce((amount, transaction) => (amount + Number(transaction.total)), 0));

    return (
        <div className="h-screen mx-[5%] flex flex-col">
            <div className="flex flex-row justify-end my-2">
                <TransactionButton />
            </div>
            <BalanceCard title="Portfolio Value" value={portfolioValue} />
            <PortfolioTable className="mt-10" transactions={transactions} />
        </div>
    )
}