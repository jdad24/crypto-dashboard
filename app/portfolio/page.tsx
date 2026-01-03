import { BalanceCard } from "../_components/cards";
import { Button, TextField } from "@mui/material";
import PortfolioTable from "../_components/portfolio-table";
import TransactionButton from "../_components/transaction-button";

export default function Portfolio() {

    return (
        <div className="h-screen mx-[5%] flex flex-col">
            <div className="flex flex-row justify-end my-2">                
                <TransactionButton/>                
            </div>
            <BalanceCard title="Portfolio Value" value="$100,000" />
            <PortfolioTable className="mt-10"/>
        </div>
    )
}