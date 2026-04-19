'use client'

import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import { convertToCurrency } from '../_lib/utils';

interface BalanceResponse {
    address: string;
    eth: number;
    usdValue: number;
}

export default function Explorer() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState<BalanceResponse | null>(null);
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
            const response = await fetch(`/api/v1/wallets/balance?address=${encodeURIComponent(address)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch balance');
            }
            const data = await response.json();
            setBalance(data || '--');
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
                <div className="relative py-8 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg shadow-black/40 overflow-hidden">
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
                    <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <SwapCallsIcon sx={{ fontSize: 24, color: '#3b82f6' }} />
                            </div>
                            <h3 className="font-semibold text-slate-900">Wallet Balance</h3>
                        </div>
                        <p className="text-sm text-slate-600">Check ETH balance for any wallet address</p>
                    </div>
                </div>
            </div>

            {/* Wallet Balance Lookup */}
            <div className="rounded-lg shadow-lg p-8 bg-white border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Check Wallet Ethereum Balance</h2>
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
                            className="hover:cursor-pointer px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:bg-slate-400"
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
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-200 shadow-lg">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-full blur-2xl opacity-40"></div>

                            <div className="relative p-6">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800">Wallet Balance</h3>
                                        <p className="text-sm text-slate-600">Real-time Ethereum holdings</p>
                                    </div>
                                </div>

                                {/* Balance Values */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* ETH Balance */}
                                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-slate-600">Ethereum</span>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-800">{balance.eth} ETH</p>
                                        <p className="text-xs text-slate-500 mt-1">Native cryptocurrency</p>
                                    </div>

                                    {/* USD Value */}
                                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-slate-600">USD Value</span>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-800">{convertToCurrency(balance.usdValue)}</p>
                                        <p className="text-xs text-slate-500 mt-1">Current market value</p>
                                    </div>
                                </div>

                                {/* Address and additional info */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-emerald-100">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Address:</span>
                                        <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono text-slate-700">
                                            {address}
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span>Last updated: {new Date().toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </main>
    )
}