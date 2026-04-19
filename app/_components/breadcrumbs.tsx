import Link from "next/link"

export default function CryptoBreadcrumbs({ base, coin, className }: { base: string, coin: string, className?: string }) {
    return (
        <nav aria-label="breadcrumb" className={`${className || ''}`}>
            <ol className="font-bold flex items-center space-x-2 text-sm">
                <li>
                    <Link href={`/${base}`} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                        <span>{base.charAt(0).toUpperCase() + base.slice(1)}</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <span className="text-white/50 mx-2">/</span>
                    <span className="text-white/70">{coin}</span>
                </li>
            </ol>
        </nav>
    );
}