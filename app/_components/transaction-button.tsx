'use client';

import { Button } from "@mui/material"
import { useState } from "react";
import TransactionModal from "./transaction-modal";

export default function TransactionButton() {
    const [showModal, setShowModal] = useState(false)

    function handleClick() {
        setShowModal(!showModal)
    }

    return (
        <div>
            <Button className="h-10 bg-green-800" variant="contained" onClick={handleClick}>New Transaction</Button>
            <TransactionModal open={showModal} setShowModal={setShowModal}/>
        </div>
    )
}