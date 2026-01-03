import { MarketcapCard } from "./_components/cards";
import { BluechipTable } from "./_components/bluechip-table";

export default async function Home() {

  return (
    <div className="">
      <main className="">
        <div className="flex flex-col mx-[5%] gap-10 mt-5">
          <MarketcapCard />
          <BluechipTable />
        </div>
      </main>
    </div>
  );
}
