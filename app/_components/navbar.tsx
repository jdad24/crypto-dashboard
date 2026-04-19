'use client';

import Link from "next/link"
import Image from "next/image"
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { signOut } from "next-auth/react"
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';

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


    const UserImage = <Image src="/user.svg" height={25} width={25} alt="Profile" className="cursor-pointer mr-3 hover:scale-110 transition-all duration-300 filter brightness-0 invert" />
    return (
        <AppBar position="sticky" className="font-bold bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800 shadow-lg">
            <Toolbar>
                <div className="flex flex-row items-center justify-evenly w-full h-full">
                    <Link className="hover:scale-110 transition-all duration-300 flex items-center gap-2 text-white hover:text-blue-300" href="/">
                        <InsertChartIcon sx={{ fontSize: 24, color: '#60a5fa' }} />
                        <span>Market</span>
                    </Link>
                    <Link className="hover:scale-110 transition-all duration-300 flex items-center gap-2 text-white hover:text-blue-300" href="/explorer">
                        <ArticleIcon sx={{ fontSize: 24, color: '#34d399' }} />
                        <span>Explorer</span>
                    </Link>
                    {email ? <Link className="hover:scale-110 transition-all duration-300 flex items-center gap-2 text-white hover:text-blue-300" href="/portfolio">
                        <WorkIcon sx={{ fontSize: 24, color: '#f59e0b' }} />
                        <span>Portfolio</span>
                    </Link> : null}
                </div>
                <Button id="basic-button" className="pl-auto text-white hover:bg-white/10 rounded-lg p-2 transition-colors" startIcon={UserImage} onClick={handleClick}>
                    {renderMenu()}
                </Button>
            </Toolbar>
        </AppBar>
    )
}