import { MarketcapCard, TopGainersCard, TrendingCard } from "./_components/cards";
import { BluechipTable } from "./_components/bluechip-table";
import StarIcon from '@mui/icons-material/Star';

export default function Home() {

  return (
    <main className="flex flex-col mx-[5%] gap-10 mt-5">
      <div className="flex flex-row gap-10">
        <MarketcapCard />
        <TrendingCard title="Trending" />   
        <TopGainersCard title="Top Gainers" />     
      </div>
      <div className="bg-blue-400 rounded-lg shadow-lg shadow-black/70 p-8 my-4">
        <h2 className="text-2xl font-bold mb-4"><StarIcon className="mr-2 inline fill-yellow-500" />Top 100 Cryptocurrencies</h2>
        <BluechipTable />
      </div>
    </main>
  );
}
