'use client';

import { Modal, Box, Button, Autocomplete, TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { addTransactionAction } from "../_lib/actions";

export default function TransactionModal({ open, setShowModal }: { open: boolean, setShowModal: (show: boolean) => void }) {
    const [coin, setCoin] = useState("")
    const [coinSelection, setCoinSelection] = useState([])

    const [totalSpent, setTotalSpent] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [pricePerCoin, setPricePerCoin] = useState(0)
    const [transactionType, setTransactionType] = useState<"Buy" | "Sell">("Buy")


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
        setPricePerCoin(0)
        setShowModal(false)
        setTransactionType("Buy")
    }

    function handleAutocompleteInput(e: React.SyntheticEvent<Element>, newValue: string | null) {
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
            setPricePerCoin(avgWithValueCheck)
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
            setPricePerCoin(avgWithValueCheck)
        }
    }

    function handleTypeChange(e: SelectChangeEvent<"Buy" | "Sell">) {
        if (e.target.value == "Buy") {
            setTransactionType("Buy")
        } else if (e.target.value == "Sell") {
            setTransactionType("Sell")
        }
    }

    function handleSubmit() {
        if (Number.isNaN(totalSpent) || Number.isNaN(quantity)) {
            alert("Please input valid numbers for the total and quantity fields.")
        }

        setShowModal(false)
    }

    return (
        <Modal className="flex flex-row justify-center items-center" open={open}>
            <Box className="bg-white/10 backdrop-blur-md border border-white/20 text-white h-auto w-full max-w-lg p-8 rounded-xl shadow-2xl" component="form" onSubmit={handleSubmit} action={addTransactionAction}>
                <h1 className="font-bold text-3xl mb-6 text-center">New Transaction</h1>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Autocomplete
                            className="bg-white/5 rounded-lg"
                            options={coinSelection.map(coin => coin['name'])}
                            onChange={(e, newValue) => handleAutocompleteInput(e, newValue)}
                            renderInput={(params) => <TextField
                                {...params}
                                label="Select Coin"
                                name="coin"
                                InputLabelProps={{
                                    className: "text-white"
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    className: "text-white border-white/30",
                                    classes: {
                                        notchedOutline: "border-white/30"
                                    }
                                }}
                            />}
                            disablePortal
                            value={coin}
                        />
                        <Select
                            labelId="transaction-type-label"
                            label="Transaction Type"
                            name="type"
                            value={transactionType}
                            defaultValue="Buy"
                            onChange={handleTypeChange}
                            className="bg-white/5 rounded-lg"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.7)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiSelect-select': {
                                    color: 'white',
                                },
                            }}
                        >
                            <MenuItem value="Buy">Buy</MenuItem>
                            <MenuItem value="Sell">Sell</MenuItem>
                        </Select>
                    </div>
                    <div className="space-y-4">
                        <TextField
                            fullWidth
                            label="Total Spent (USD)"
                            name="total"
                            onChange={handleTotalChange}
                            variant="outlined"
                            className="bg-white/5"
                            InputLabelProps={{
                                className: "text-white"
                            }}
                            InputProps={{
                                className: "text-white border-white/30",
                                classes: {
                                    notchedOutline: "border-white/30"
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            onChange={handleQuantityChange}
                            variant="outlined"
                            className="bg-white/5"
                            InputLabelProps={{
                                className: "text-white"
                            }}
                            InputProps={{
                                className: "text-white border-white/30",
                                classes: {
                                    notchedOutline: "border-white/30"
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Price Per Coin"
                            name="price_per_coin"
                            value={pricePerCoin}
                            variant="outlined"
                            className="bg-white/5"
                            InputLabelProps={{
                                className: "text-white"
                            }}
                            InputProps={{
                                className: "text-white border-white/30",
                                classes: {
                                    notchedOutline: "border-white/30"
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-4 mt-8">
                    <Button
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Button
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold px-6 py-2 rounded-lg transition-all duration-300 border border-red-500/30"
                        onClick={handleCancel}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}