export default function Loading() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="mx-[5%] py-8">
                <div className="flex md:flex-row flex-col justify-between gap-8">
                    <div className="flex flex-col flex-1">
                        {/* Header Section Skeleton */}
                        <div className="mb-8">
                            <div className="flex flex-row justify-between items-center mb-4">
                                <div className="flex flex-row items-center text-4xl font-bold gap-4 text-white">
                                    <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
                                    <div className="h-10 bg-white/20 rounded animate-pulse w-32"></div>
                                </div>
                                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg animate-pulse w-24 h-12"></div>
                            </div>
                            <div className="h-16 bg-white/20 rounded animate-pulse w-64"></div>
                            <div className="h-4 bg-white/10 rounded animate-pulse w-32 mt-2"></div>
                        </div>

                        {/* Market Statistics Card Skeleton */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden w-full max-w-2xl">
                            <div className="p-6">
                                <div className="h-6 bg-white/20 rounded animate-pulse mb-6 w-40"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg animate-pulse">
                                                <div className="h-4 bg-white/20 rounded w-24"></div>
                                                <div className="h-4 bg-white/20 rounded w-20"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg animate-pulse">
                                                <div className="h-4 bg-white/20 rounded w-24"></div>
                                                <div className="h-4 bg-white/20 rounded w-20"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section Skeleton */}
                    <div className="flex-1">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden p-6">
                            <div className="h-64 bg-white/5 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}