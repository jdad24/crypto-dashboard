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
            <Button
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                variant="contained"
                onClick={handleClick}
            >
                New Transaction
            </Button>
            <TransactionModal open={showModal} setShowModal={setShowModal}/>
        </div>
    )
}