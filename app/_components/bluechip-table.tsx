'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { convertToCurrency } from "@/utils";
import { useRouter } from "next/navigation";

export function BluechipTable() {
    const [coins, setCoins] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/coins")
                const data = await response.json()
                console.log(data)
                setCoins(data)
            } catch (e) {
                console.error(e)
            }
        }

        fetchCoins()
    }, [])

    const handleRowClick = (coin: { id: string }) => {
        router.push(`/coins/${coin['id']}`)
    }

    const renderTableRows = () => {
        return coins.map((coin, index) =>
            <tr key={index} className="border-b-1 border-gray-400 h-15 hover:bg-blue-400 cursor-pointer" onClick={() => handleRowClick(coin)}>
                <td className="w-5">{coin['market_cap_rank']}</td>
                <td className="h-15 flex flex-row justify-left items-center font-bold">

                    <Image className="scale-50" src={coin['image']} alt="Coin Image" width={50} height={20} />
                    {coin['name']}
                </td>
                <td>{convertToCurrency(coin['current_price'])}</td>
                <td>{convertToCurrency(coin['market_cap'], 0)}</td>
            </tr>
        )
    }


    return (
        <table className="w-full">
            <thead className="text-left">
                <tr className="border-b-1">
                    <th className="w-10">#</th>
                    <th className="w-20">Coin</th>
                    <th className="w-20">Price</th>
                    <th className="w-20">Marketcap</th>
                </tr>
            </thead>
            <tbody className="text-left">
                {renderTableRows()}
            </tbody>
        </table>
    )
}

