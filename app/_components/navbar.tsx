import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav className="flex flex-row items-center justify-between w-full h-15 bg-foreground text-background font-bold">
            <div className="flex flex-row items-center justify-evenly w-full h-full">
      {/* <div className="absolute left-0 text-5xl pl-3 text-blue-300">JD</div> */}            
            <Link href="/">Home</Link>           
            <Link href="/portfolio">Portfolio</Link> 
            </div>      
            <Image style={{fill: 'red'}} src="/user.svg" height={25} width={25} alt="Profile" className="cursor-pointer mr-5 hover:scale-120"/>
        </nav>
    )
}