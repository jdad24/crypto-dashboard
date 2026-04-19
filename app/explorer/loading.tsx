export default function Loading() {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                {/* Header Section with Features Skeleton */}
                <div className="space-y-6 mb-8">
                    {/* Main Header Skeleton */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg animate-pulse">
                                <div className="w-8 h-8 bg-white/20 rounded"></div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="h-10 bg-white/20 rounded animate-pulse w-96"></div>
                                <div className="h-4 bg-white/10 rounded animate-pulse w-80"></div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse">
                                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                                </div>
                                <div className="h-5 bg-white/20 rounded animate-pulse w-32"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-white/10 rounded animate-pulse w-full"></div>
                                <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500/20 rounded-lg animate-pulse">
                                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                                </div>
                                <div className="h-5 bg-white/20 rounded animate-pulse w-28"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-white/10 rounded animate-pulse w-full"></div>
                                <div className="h-4 bg-white/10 rounded animate-pulse w-2/3"></div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-500/20 rounded-lg animate-pulse">
                                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                                </div>
                                <div className="h-5 bg-white/20 rounded animate-pulse w-36"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-white/10 rounded animate-pulse w-full"></div>
                                <div className="h-4 bg-white/10 rounded animate-pulse w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wallet Balance Lookup Skeleton */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-8">
                    <div className="h-8 bg-white/20 rounded animate-pulse w-48 mb-6"></div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div className="flex-1 h-12 bg-white/5 rounded-lg animate-pulse"></div>
                            <div className="w-24 h-12 bg-blue-500/20 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}