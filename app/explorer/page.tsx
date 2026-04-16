'use client'

import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import BlockIcon from '@mui/icons-material/Block';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function Explorer() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearchBalanceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address.trim()) {
            setError('Please enter a wallet address');
            return;
        }

        setLoading(true);
        setError(null);
        setBalance(null);

        try {
            const response = await fetch(`/api/v1/etherscan/balance?address=${encodeURIComponent(address)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch balance');
            }
            const data = await response.json();
            setBalance(data.balance || '0');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setBalance(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col mx-[5%] gap-10 mt-8 pb-10">
            {/* Header Section with Features */}
            <div className="space-y-6">
                {/* Main Header */}
                <div className="relative py-8 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg overflow-hidden">
                    {/* Background decorative element */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                            <ExploreIcon sx={{ fontSize: 32, color: 'white' }} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl font-bold text-white">Ethereum Blockchain Explorer</h1>
                            <p className="text-blue-100 text-sm mt-1">Real-time blockchain data, transactions & analytics</p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <SwapCallsIcon sx={{ fontSize: 24, color: '#3b82f6' }} />
                            </div>
                            <h3 className="font-semibold text-slate-900">Live Transactions</h3>
                        </div>
                        <p className="text-sm text-slate-600">View real-time transaction data across the network</p>
                    </div>

                    <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <BlockIcon sx={{ fontSize: 24, color: '#3b82f6' }} />
                            </div>
                            <h3 className="font-semibold text-slate-900">Block Details</h3>
                        </div>
                        <p className="text-sm text-slate-600">Inspect block information, rewards, and timestamps</p>
                    </div>

                    <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <AnalyticsIcon sx={{ fontSize: 24, color: '#3b82f6' }} />
                            </div>
                            <h3 className="font-semibold text-slate-900">Network Stats</h3>
                        </div>
                        <p className="text-sm text-slate-600">Monitor blockchain metrics and network health</p>
                    </div>
                </div>
            </div>

            {/* Main Content Card
            <div className="rounded-lg shadow-lg p-8 bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div className="max-w-3xl">
                    <p className="text-lg leading-relaxed text-slate-700 mb-6">
                        Explore the blockchain and view transaction details, block information, and other data. Our explorer provides you with a comprehensive view of the cryptocurrency network.
                    </p>
                    <p className="text-base leading-relaxed text-slate-600">
                        Whether you're a seasoned investor or just getting started, our explorer is your go-to source for understanding the blockchain.
                    </p>
                </div>
            </div> */}

            {/* Wallet Balance Lookup */}
            <div className="rounded-lg shadow-lg p-8 bg-white border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Check Wallet Balance</h2>
                <form onSubmit={handleSearchBalanceSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter wallet address (0x...)"
                            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:bg-slate-400"
                        >
                            <SearchIcon fontSize="small" />
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}
                    {balance !== null && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-slate-600 mb-1">Wallet Balance</p>
                            <p className="text-2xl font-bold text-green-700">{balance} ETH</p>
                            <p className="text-xs text-slate-500 mt-2">Address: {address}</p>
                        </div>
                    )}
                </form>
            </div>
        </main>
    )
}