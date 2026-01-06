'use client';

import Link from "next/link"
import Image from "next/image"
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuOpen(!menuOpen)
        setAnchorEl(event.currentTarget)
    }

    const UserImage = <Image src="/user.svg" height={25} width={25} alt="Profile" className="cursor-pointer mr-5 hover:scale-120" />
    return (
        <AppBar position="sticky" className="font-bold">
            <Toolbar>
                <div className="flex flex-row items-center justify-evenly w-full h-full">
                    <Link href="/">Market</Link>
                    <Link href="/portfolio">Portfolio</Link>
                </div>
                <Button id="basic-button" startIcon={UserImage} onClick={handleClick}>
                    <Menu open={menuOpen} anchorEl={anchorEl}>
                        <Link href="/account/create">
                            <MenuItem className="font-bold">Create Account</MenuItem>
                        </Link>
                        <Link href="/account/login">
                            <MenuItem className="font-bold">Login</MenuItem>
                        </Link>

                    </Menu>
                </Button>
            </Toolbar>
        </AppBar>
    )
}