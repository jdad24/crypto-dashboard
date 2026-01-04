import CoinProfileContent from "@/app/_components/coin-profile-content"

export default async function CoinProfile({ params }: { params: Promise<{ coin: string }> }) {
    const { coin } = await params
   

    return (
       <CoinProfileContent coin={coin}/>
    )
}