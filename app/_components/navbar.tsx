'use client';

import Link from "next/link"
import Image from "next/image"
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { signOut } from "next-auth/react"
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WorkIcon from '@mui/icons-material/Work';

export default function Navbar({ email }: { email: string | null }) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuOpen(!menuOpen)
        setAnchorEl(event.currentTarget)
    }

    const renderMenu = () => {
        if (!email) {
            return (
                <Menu open={menuOpen} anchorEl={anchorEl}>
                    <Link href="/account/signup">
                        {/* <Link href="/api/auth/signup"> */}
                        <MenuItem className="font-bold">Create Account</MenuItem>
                    </Link>
                    {/* <Link href="/account/login"> */}
                    <Link href="/api/auth/signin">
                        <MenuItem className="font-bold">Login</MenuItem>
                    </Link>
                </Menu>
            )
        } else {
            return (
                <Menu open={menuOpen} anchorEl={anchorEl}>                    
                        <MenuItem className="font-bold" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Sign Out</MenuItem>                    
                </Menu>
            )
        }
    }


    const UserImage = <Image src="/user.svg" height={25} width={25} alt="Profile" className="cursor-pointer mr-5 hover:scale-120" />
    return (
        <AppBar position="sticky" className="font-bold">
            <Toolbar>
                <div className="flex flex-row items-center justify-evenly w-full h-full">
                    <Link href="/"><InsertChartIcon className="mr-2" />Market</Link>
                    {email ? <Link href="/portfolio"><WorkIcon className="mr-2" />Portfolio</Link> : null}
                </div>
                <Button id="basic-button" className="pointer-cursor" startIcon={UserImage} onClick={handleClick}>
                    {renderMenu()}
                </Button>
            </Toolbar>
        </AppBar>
    )
}