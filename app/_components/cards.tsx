import { Card, CardContent } from "@mui/material"

export function BalanceCard({ title, value, className }: { title: string, value: string, className?: string }) {

    return (
        <Card className={`bg-gray-100 flex flex-col justify-center w-100 h-30 pl-4 ${className}`}>
            <CardContent>
                <div className="font-bold text-2xl p-2">{value}</div>
                <div className="font-bold text-gray-600 text-lg p-2">{title}</div>
            </CardContent>
        </Card>
    )
}

export function MarketcapCard({ title, value, className }: { title: string, value: string, className?: string }) {
    return (
        <Card className={`bg-gray-100 flex flex-col justify-center w-100 h-30 pl-4 ${className}`}>
            <CardContent>
                <div className="font-bold text-2xl p-2">{value}</div>
                <div className="font-bold text-gray-600 text-lg p-2">{title}</div>
            </CardContent>
        </Card>
    )
}

export function TokenDataCard({ marketCap, circulatingSupply, totalSupply, maxSupply, className }:
    { marketCap: string, circulatingSupply: string, totalSupply: string, maxSupply: string, className?: string }) {
    return (
        <Card className="flex flex-col justify-evenly bg-gray-100 w-100 h-50 p-3 font-bold">
            <CardContent>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Market Cap</div>
                    <div>{marketCap}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Circulating Supply</div>
                    <div>{circulatingSupply}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Total Supply</div>
                    <div>{totalSupply}</div>
                </div>
                <div className="flex flex-row justify-between border-b-1 border-gray-400">
                    <div className="w-40">Max Supply</div>
                    <div>{maxSupply}</div>
                </div>
            </CardContent>
        </Card>
    )
}