export default function Loading() {
    return (
        <div className="flex flex-col mx-[5%] gap-10 mt-5">
            <div className="flex flex-row gap-10">
                <div className="bg-gray-100 animate-pulse rounded-lg w-full h-40"></div>
                <div className="bg-gray-100 animate-pulse rounded-lg w-full h-40"></div>
                <div className="bg-gray-100 animate-pulse rounded-lg w-full h-40"></div>
            </div>
        </div>
    )
}