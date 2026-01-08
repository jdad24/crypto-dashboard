'use client';
import Link from "next/link";
import { Button } from "@mui/material";

export default function Error() {
    return (
        <main className="flex flex-col mx-[5%] gap-10 mt-5">
            <div className="text-red-800 text-3xl">Error</div>
            <Link className="hover:!scale-100" href="/">
                <Button className="font-bold">Go back to Homepage</Button>
            </Link>
        </main>
    )
}       