import { MarketcapCard } from "./_components/cards";
import { BluechipTable } from "./_components/bluechip-table";
import { convertToCurrency } from "@/utils";

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/v1/marketcap')
  const totalMarketCap = convertToCurrency(await response.json(), 0)
  
  return (
    <div className="">
      <main className="">
        <div className="flex flex-col mx-[5%] gap-10 mt-5">      
          <MarketcapCard title="Total Market Cap" value={totalMarketCap} />
          <BluechipTable/>
        </div>
      </main>
    </div>
  );
}
