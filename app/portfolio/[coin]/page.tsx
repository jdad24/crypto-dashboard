import TransactionTable from "@/app/_components/transactions-table"
import { fetchTransactions } from "@/app/_lib/db";
import CryptoBreadcrumbs from "@/app/_components/breadcrumbs";

export default async function Page({ params }: { params: { coin: string } }) {
    const pathParams = await params;
    const coin = pathParams?.coin
    const transactions = await fetchTransactions(coin);

    return (
        <>
            <CryptoBreadcrumbs className="font-bold text-md m-6 mb-10" coin={coin} />
            <TransactionTable className="w-[95%] mx-auto" transactions={transactions} />
        </>
    )
}