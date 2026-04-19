export default function Loading() {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                {/* Breadcrumb Skeleton */}
                <div className="mb-6">
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-white/20 rounded animate-pulse w-16"></div>
                        <div className="h-4 bg-white/10 rounded animate-pulse w-1"></div>
                        <div className="h-4 bg-white/20 rounded animate-pulse w-20"></div>
                        <div className="h-4 bg-white/10 rounded animate-pulse w-1"></div>
                        <div className="h-4 bg-white/20 rounded animate-pulse w-24"></div>
                    </div>
                </div>

                {/* Header Section Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
                        <div>
                            <div className="h-8 bg-white/20 rounded animate-pulse w-32 mb-2"></div>
                            <div className="h-4 bg-white/10 rounded animate-pulse w-48"></div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-10 bg-blue-500/20 rounded-lg animate-pulse w-24"></div>
                        <div className="h-10 bg-green-500/20 rounded-lg animate-pulse w-32"></div>
                    </div>
                </div>

                {/* Transaction Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg animate-pulse">
                                <div className="w-6 h-6 bg-white/20 rounded"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-white/20 rounded animate-pulse mb-1 w-20"></div>
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
                                <div className="h-4 bg-white/20 rounded animate-pulse mb-1 w-16"></div>
                                <div className="h-3 bg-white/10 rounded animate-pulse w-20"></div>
                            </div>
                        </div>
                        <div className="h-8 bg-white/20 rounded animate-pulse"></div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg animate-pulse">
                                <div className="w-6 h-6 bg-white/20 rounded"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-white/20 rounded animate-pulse mb-1 w-18"></div>
                                <div className="h-3 bg-white/10 rounded animate-pulse w-22"></div>
                            </div>
                        </div>
                        <div className="h-8 bg-white/20 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Transactions Table Skeleton */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-white/20 rounded animate-pulse"></div>
                            <div className="h-8 bg-white/20 rounded animate-pulse w-48"></div>
                        </div>
                        <div className="h-4 bg-white/10 rounded animate-pulse w-80"></div>
                    </div>
                    <div className="p-8">
                        <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg animate-pulse">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-white/20 rounded w-24"></div>
                                            <div className="h-3 bg-white/10 rounded w-16"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-white/20 rounded w-16"></div>
                                        <div className="h-3 bg-white/10 rounded w-12"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-white/20 rounded w-20"></div>
                                        <div className="h-3 bg-white/10 rounded w-14"></div>
                                    </div>
                                    <div className="h-8 bg-blue-500/20 rounded-lg animate-pulse w-20"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}