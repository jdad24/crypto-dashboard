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

    const renderMainHeader = () => {
        return (
            <div className="relative py-8 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 shadow-2xl overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className="p-4 bg-white/20 rounded-xl backdrop-blur-md">
                        <ExploreIcon sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-white mb-2">Ethereum Blockchain Explorer</h1>
                        <p className="text-blue-100 text-lg">Real-time blockchain data, transactions & analytics</p>
                    </div>
                </div>
            </div>
        )
    }

    const renderFeaturesCards = () => {
        const features = [
            {
                icon: <SwapCallsIcon sx={{ fontSize: 30, color: '#34d399' }} />,
                title: 'Wallet Balance',
                description: 'Check ETH balance for any wallet address',
                iconBG: 'bg-green-500/20'
            },
            {
                icon: <ExploreIcon sx={{ fontSize: 30, color: '#60a5fa' }} />,
                title: 'Transaction History',
                description: 'View detailed transaction records',
                iconBG: 'bg-blue-500/20'
            },
            {
                icon: <SearchIcon sx={{ fontSize: 30, color: '#a78bfa' }} />,
                title: 'Block Explorer',
                description: 'Explore blocks and network activity',
                iconBG: 'bg-purple-500/20'
            }
        ];

        return features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${feature.iconBG} rounded-lg`}>
                        {feature.icon}
                    </div>
                    <div className='flex flex-col'>
                        <div className="text-white font-semibold text-xl">{feature.title}</div>
                        <div className="text-white/70">{feature.description}</div>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8 pb-12">
                {/* Header Section with Features */}
                <div className="space-y-8">
                    {/* Main Header */}
                    {renderMainHeader()}
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFeaturesCards()}
                    </div>
                </div>
                {/* Wallet Balance Lookup */}
                <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-2">Check Wallet Ethereum Balance</h2>
                        <p className="text-white/60 text-lg">Enter any Ethereum wallet address to view real-time balance information</p>
                    </div>
                    <div className="p-8">
                        <form onSubmit={handleSearchBalanceSubmit} className="space-y-6">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter wallet address (0x...)"
                                    className="flex-1 px-6 py-4 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white placeholder-white/50 text-lg backdrop-blur-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <SearchIcon fontSize="medium" />
                                    {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>

                            {error && (
                                <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                                    <p className="text-red-300 text-lg font-medium">{error}</p>
                                </div>
                            )}

                            {balance !== null && (
                                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 border border-emerald-500/20 shadow-2xl backdrop-blur-md">
                                    {/* Decorative background elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl"></div>

                                    <div className="relative p-8">
                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                                <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">Wallet Balance</h3>
                                                <p className="text-white/70 text-lg">Real-time Ethereum holdings</p>
                                            </div>
                                        </div>

                                        {/* Balance Values */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            {/* ETH Balance */}
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                                    <span className="text-white/80 font-medium text-lg">Ethereum</span>
                                                </div>
                                                <p className="text-3xl font-bold text-white">{balance.eth} ETH</p>
                                                <p className="text-white/60 mt-2">Native cryptocurrency</p>
                                            </div>

                                            {/* USD Value */}
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                    <span className="text-white/80 font-medium text-lg">USD Value</span>
                                                </div>
                                                <p className="text-3xl font-bold text-white">{convertToCurrency(balance.usdValue)}</p>
                                                <p className="text-white/60 mt-2">Current market value</p>
                                            </div>
                                        </div>

                                        {/* Address and additional info */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-white/20">
                                            <div className="flex items-center gap-3">
                                                <span className="text-white/60 text-lg">Address:</span>
                                                <code className="text-lg bg-white/10 px-4 py-2 rounded-lg font-mono text-white border border-white/20">
                                                    {address}
                                                </code>
                                            </div>
                                            <div className="flex items-center gap-4 text-white/60 text-lg">
                                                <span>Last updated: {new Date().toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}