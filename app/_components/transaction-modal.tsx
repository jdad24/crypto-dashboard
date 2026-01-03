'use client';

import { Modal, Box, Button, Autocomplete, TextField, } from "@mui/material";
import { useState, useEffect } from "react";

export default function TransactionModal({ open, setShowModal }: { open: boolean, setShowModal: (show: boolean) => void }) {
    const [coin, setCoin] = useState(null)
    const [coinSelection, setCoinSelection] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/v1/coins')
            setCoinSelection(await response.json())
        })()
    }, [])

    function handleCancel() {
        setShowModal(false)
    }

    function handleAutocompleteInput(e: any) {
        console.log(e.target.value)
        setCoin(e.target.value)
    }

    return (
        <Modal className="flex flex-row justify-center items-center" open={open}>
            <Box className="relative bg-background text-foreground h-100 w-150 pl-5 rounded-xl">
                <h1 className="font-bold text-2xl pt-5 mb-5">New Transaction</h1>
                <Autocomplete             
                    options={coinSelection.map(coin => coin['name'])}       
                    onChange={(e) => handleAutocompleteInput(e)}
                    renderInput={(params) => <TextField                         
                        {...params} label="Select Coin" />}
                    disablePortal
                />
                <div className="absolute flex flex-row justify-end gap-5 absolute bottom-0 left-0 w-full pr-1 pb-1">
                    <Button className="bg-green-800 text-white" onClick={handleCancel} variant="contained">Submit</Button>
                    <Button className="bg-red-800 text-white" onClick={handleCancel} variant="contained">Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}