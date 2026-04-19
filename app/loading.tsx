export default function Loading() {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Crypto Dashboard</h1>
                    <p className="text-white/70 text-lg">Track your favorite cryptocurrencies and market trends</p>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg animate-pulse">
                                <div className="w-6 h-6 bg-white/20 rounded"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-white/20 rounded animate-pulse mb-1"></div>
                                <div className="h-3 bg-white/10 rounded animate-pulse w-24"></div>
                            </div>
                        </div>
                        <div className="h-8 bg-white/20 rounded animate-pulse"></div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse">
                                <div className="w-6 h-6 bg-white/20 rounded"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-white/20 rounded animate-pulse mb-1"></div>
                                <div className="h-3 bg-white/10 rounded animate-pulse w-20"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                <div className="flex gap-3 items-center">
                                    <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                                    <div className="h-4 bg-white/20 rounded animate-pulse w-16"></div>
                                </div>
                                <div className="h-4 bg-white/20 rounded animate-pulse w-12"></div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                <div className="flex gap-3 items-center">
                                    <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                                    <div className="h-4 bg-white/20 rounded animate-pulse w-14"></div>
                                </div>
                                <div className="h-4 bg-white/20 rounded animate-pulse w-12"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg animate-pulse">
                                <div className="w-6 h-6 bg-white/20 rounded"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-white/20 rounded animate-pulse mb-1"></div>
                                <div className="h-3 bg-white/10 rounded animate-pulse w-22"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                <div className="flex gap-3 items-center">
                                    <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                                    <div className="h-4 bg-white/20 rounded animate-pulse w-16"></div>
                                </div>
                                <div className="h-4 bg-white/20 rounded animate-pulse w-12"></div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                <div className="flex gap-3 items-center">
                                    <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                                    <div className="h-4 bg-white/20 rounded animate-pulse w-14"></div>
                                </div>
                                <div className="h-4 bg-white/20 rounded animate-pulse w-12"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cryptocurrency Table Section Skeleton */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-yellow-400/20 rounded animate-pulse"></div>
                            <div className="h-8 bg-white/20 rounded animate-pulse w-64"></div>
                        </div>
                        <div className="h-4 bg-white/10 rounded animate-pulse w-96"></div>
                    </div>
                    <div className="p-8">
                        <div className="space-y-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg animate-pulse">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-white/20 rounded w-24"></div>
                                            <div className="h-3 bg-white/10 rounded w-16"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-white/20 rounded w-20"></div>
                                        <div className="h-3 bg-white/10 rounded w-16"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}