import { BalanceCard } from "../_components/cards";
import { Button } from "@mui/material";

export default function Portfolio() {

    return (
        <div className="h-screen mx-[5%] flex flex-col">
            <div className="flex flex-row justify-between my-2">
                <h1 className="font-bold text-3xl">My Portfolio</h1>
                <Button className="h-10" variant="contained">New Transaction</Button>
            </div>
            <BalanceCard title="Portfolio Value" value="$100,000" />
        </div>
    )
}