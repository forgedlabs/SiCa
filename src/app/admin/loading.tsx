export default function AdminLoading() {
    return (
        <div className="p-8 bg-white min-h-screen text-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="font-serif text-4xl mb-2">Dashboard</h1>
                        <p className="text-gray-500 uppercase tracking-widest text-xs">Loading...</p>
                    </div>
                </div>

                {/* Loading skeleton for stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="text-center">
                            <div className="h-10 w-16 bg-gray-100 animate-pulse mx-auto mb-2 rounded" />
                            <div className="h-3 w-20 bg-gray-100 animate-pulse mx-auto rounded" />
                        </div>
                    ))}
                </div>

                {/* Loading skeleton for metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-gray-100 p-6">
                            <div className="h-6 w-32 bg-gray-100 animate-pulse mb-6 rounded" />
                            <div className="space-y-4">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="flex justify-between py-2">
                                        <div className="h-4 w-24 bg-gray-50 animate-pulse rounded" />
                                        <div className="h-4 w-8 bg-gray-50 animate-pulse rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading skeleton for guest list */}
                <div>
                    <div className="h-8 w-32 bg-gray-100 animate-pulse mb-8 rounded" />
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-50 animate-pulse rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
