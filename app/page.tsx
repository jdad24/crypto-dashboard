import { MarketcapCard, TopGainersCard, TrendingCard } from "./_components/cards";
import { BluechipTable } from "./_components/bluechip-table";
import StarIcon from '@mui/icons-material/Star';

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex flex-col mx-[5%] gap-10 pt-8 pb-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Crypto Dashboard</h1>
          <p className="text-white/70 text-lg">Track your favorite cryptocurrencies and market trends</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MarketcapCard />
          <TrendingCard title="Trending" />
          <TopGainersCard title="Top Gainers" />
        </div>

        {/* Cryptocurrency Table Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <StarIcon className="text-yellow-400 w-8 h-8" />
              Top 100 Cryptocurrencies
            </h2>
            <p className="text-white/60">Comprehensive market data for the world's leading digital assets</p>
          </div>
          <div className="p-8">
            <BluechipTable />
          </div>
        </div>
      </div>
    </main>
  );
}
