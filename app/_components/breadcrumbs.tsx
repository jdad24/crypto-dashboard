import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function CryptoBreadcrumbs({ coin, className }: { coin: string, className?: string }) {
    return (
        <Breadcrumbs aria-label="breadcrumb" className={`${className || ''}`} separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/portfolio" className="text-blue-500 hover:underline">Portfolio</Link>
            <span className="text-gray-500">{coin}</span>
        </Breadcrumbs>
    );
}