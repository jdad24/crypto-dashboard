import Link from "next/link"
import Image from "next/image"
import { AppBar, Toolbar } from "@mui/material"

export default function Navbar() {
    return (
        <AppBar position="sticky" className="font-bold">
            <Toolbar>
                <div className="flex flex-row items-center justify-evenly w-full h-full">
                    <Link href="/">Market</Link>
                    <Link href="/portfolio">Portfolio</Link>
                </div>
                <Image src="/user.svg" height={25} width={25} alt="Profile" className="cursor-pointer mr-5 hover:scale-120" />
            </Toolbar>
        </AppBar>
    )
}