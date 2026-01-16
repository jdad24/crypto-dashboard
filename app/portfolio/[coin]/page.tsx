import TransactionTable from "@/app/_components/transactions-table"
import { fetchTransactions } from "@/app/_lib/db";

export default async function Page({ params }: { params: { coin: string } }) {
    const pathParams = await params;
    const coin = pathParams?.coin
    const transactions = await fetchTransactions(coin);
    
    return (
        <TransactionTable transactions={transactions} />
    )
}