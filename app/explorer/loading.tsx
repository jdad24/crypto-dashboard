export default function Loading() {
    return (
        <main className="flex flex-col mx-[5%] gap-10 mt-8 pb-10">
            {/* Header Section with Features Skeleton */}
            <div className="space-y-6">
                {/* Main Header Skeleton */}
                <div className="relative py-8 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-lg backdrop-blur animate-pulse">
                            <div className="w-8 h-8 bg-white/30 rounded"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="h-10 bg-white/20 rounded animate-pulse w-96"></div>
                            <div className="h-4 bg-white/10 rounded animate-pulse w-80"></div>
                        </div>
                    </div>
                </div>

                {/* Features Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg animate-pulse">
                                <div className="w-6 h-6 bg-blue-200 rounded"></div>
                            </div>
                            <div className="h-5 bg-slate-200 rounded animate-pulse w-32"></div>
                        </div>
                        <div className="h-4 bg-slate-100 rounded animate-pulse w-full mb-1"></div>
                        <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4"></div>
                    </div>
                </div>
            </div>

            {/* Wallet Balance Lookup Skeleton */}
            <div className="rounded-lg shadow-lg p-8 bg-white border border-slate-200">
                <div className="h-8 bg-slate-200 rounded animate-pulse w-48 mb-6"></div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <div className="flex-1 h-12 bg-slate-100 rounded-lg animate-pulse"></div>
                        <div className="w-24 h-12 bg-blue-100 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}