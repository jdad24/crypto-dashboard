'use client';

import { Modal, Box, Button, Autocomplete, TextField, } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function TransactionModal({ open, setShowModal }: { open: boolean, setShowModal: (show: boolean) => void }) {
    const [coin, setCoin] = useState("")
    const [coinSelection, setCoinSelection] = useState([])

    const [totalSpent, setTotalSpent] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [avgPrice, setAvgPrice] = useState(0)


    useEffect(() => {
        (async () => {
            const response = await fetch('/api/v1/coins')
            setCoinSelection(await response.json())
        })()
    }, [open])

    function handleCancel() {
        setCoin("")
        setCoinSelection([])
        setTotalSpent(0)
        setQuantity(0)
        setAvgPrice(0)
        setShowModal(false)
    }

    function handleAutocompleteInput(e: React.SyntheticEvent<Element>, newValue: string | null) {
        console.log(newValue)

        if (newValue != null) {
            setCoin(newValue)
        }
    }

    function handleTotalChange(e: React.ChangeEvent<HTMLInputElement>) {
        const parseNumber = Number(e.target.value)

        if (typeof parseNumber != "number") {
            return
        } else {
            setTotalSpent(parseNumber)

            const avg = parseNumber / quantity
            const avgWithValueCheck = Number.isNaN(avg) || !Number.isFinite(avg) ? 0 : avg
            setAvgPrice(avgWithValueCheck)
        }
    }

    function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
        const parseNumber = Number(e.target.value)

        if (typeof parseNumber != "number") {
            return
        } else {
            setQuantity(parseNumber)

            let avg = totalSpent / parseNumber
            const avgWithValueCheck = Number.isNaN(avg) || !Number.isFinite(avg) ? 0 : avg
            setAvgPrice(avgWithValueCheck)
        }
    }

    function handleSubmit() {
        if (Number.isNaN(totalSpent) || Number.isNaN(quantity)) {
            alert("Please input valid numbers for the total and quantity fields.")
        }
    }

    return (
        <Modal className="flex flex-row justify-center items-center" open={open}>
            <Box className="relative bg-background text-foreground h-100 w-150 pl-5 rounded-xl">
                <h1 className="font-bold text-2xl pt-5 mb-5">New Transaction</h1>
                <Autocomplete
                    className="w-70"
                    options={coinSelection.map(coin => coin['name'])}
                    onChange={(e, newValue) => handleAutocompleteInput(e, newValue)}
                    renderInput={(params) => <TextField
                        {...params} label="Select Coin" />}
                    disablePortal
                    value={coin}
                />
                <div className="flex flex-col w-70 mt-10 gap-5">
                    <TextField label="Total Spent (USD)" onChange={handleTotalChange} />
                    <TextField label="Quantity" onChange={handleQuantityChange} />
                    <TextField label="Price Per Coin" value={avgPrice} disabled />
                </div>
                <div className="absolute flex flex-row justify-end gap-5 absolute bottom-0 left-0 w-full pr-1 pb-1">
                    <Button className="bg-green-800 text-white" onClick={handleSubmit} variant="contained" >Submit</Button>
                    <Button className="bg-red-800 text-white" onClick={handleCancel} variant="contained">Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}