import Link from "next/link"

export default function CryptoBreadcrumbs({ coin, className }: { coin: string, className?: string }) {
    return (
        <nav aria-label="breadcrumb" className={`${className || ''}`}>
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link href="/portfolio" className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center">
                        <span>Portfolio</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <span className="text-white/50 mx-2">/</span>
                    <span className="text-white/70 font-medium">{coin}</span>
                </li>
            </ol>
        </nav>
    );
}