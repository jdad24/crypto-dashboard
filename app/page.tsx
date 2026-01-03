import { MarketcapCard } from "./_components/cards";
import { BluechipTable } from "./_components/bluechip-table";
import { convertToCurrency } from "@/utils";
import { headers } from "next/headers";

export default async function Home() {
  const host = await getHostUrl()
  console.log(host)

  const response = await fetch(`${host}/api/v1/marketcap`)
  const totalMarketCap = convertToCurrency(await response.json(), 0)

  return (
    <div className="">
      <main className="">
        <div className="flex flex-col mx-[5%] gap-10 mt-5">
          <MarketcapCard title="Total Market Cap" value={totalMarketCap} />
          <BluechipTable />
        </div>
      </main>
    </div>
  );
}

async function getHostUrl() {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';

    return `${protocol}://${host}`;
}
