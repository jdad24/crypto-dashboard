export default function Loading() {
    return (
        <div className="flex flex-col mx-[5%] gap-10 mt-12">
            <div className="rounded-lg shadow-black shadow-lg p-8 my-4 bg-blue-400/80">
                <h2 className="text-2xl font-bold mb-4">Loading...</h2>
                <div className="bg-gray-100 animate-pulse rounded-lg w-full h-24"></div>
            </div>
        </div>
    )
}