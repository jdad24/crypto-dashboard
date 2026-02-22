import { MarketcapCard, TrendingCard } from "./_components/cards";
import { BluechipTable } from "./_components/bluechip-table";

export default async function Home() {

  return (
    <main className="flex flex-col mx-[5%] gap-10 mt-5">
      <div className="flex flex-row gap-10">
        <MarketcapCard />
        <TrendingCard title="Trending" />        
      </div>
      <div className="rounded-lg shadow-black shadow-lg p-8 my-4 bg-blue-400/80">
        <h2 className="text-2xl font-bold mb-4">Top 100 Cryptocurrencies</h2>
        <BluechipTable />
      </div>
    </main>
  );
}
