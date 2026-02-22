import TransactionTable from "@/app/_components/transactions-table"
import { fetchTransactions } from "@/app/_lib/db";
import CryptoBreadcrumbs from "@/app/_components/breadcrumbs";

export default async function Page({ params }: { params: { coin: string } }) {
    const pathParams = await params;
    const coin = pathParams?.coin
    const transactions = await fetchTransactions(coin);

    return (
        <div className="h-screen mx-[5%] flex flex-col">
            <CryptoBreadcrumbs className="font-bold text-md m-6 ml-0 mb-5" coin={coin} />
            <div className="rounded-lg shadow-black shadow-lg p-8 my-4 bg-blue-400/80">
                <h2 className="text-2xl font-bold mb-4">Your Transactions</h2>
                <TransactionTable className="w-[95%] mx-auto" transactions={transactions} />
            </div>
        </div>
    )
}