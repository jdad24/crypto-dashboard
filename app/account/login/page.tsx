import { TextField, FormControl, Box, Button } from "@mui/material"
import { HeaderCard } from "@/app/_components/cards"
import { neon } from "@neondatabase/serverless"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export default function Login() {
    async function login(formData: FormData) {
        'use server'

        const username = formData.get("username") as string
        const password = formData.get("password") as string        

        try {
            const sql = neon(`${process.env.DATABASE_URL}`)
            const data = await sql`SELECT * FROM users WHERE ${username} = users.username`
            const user = data[0]     
            const hashedPassword = user['password_hash']      
            const isMatch = await bcrypt.compare(password, hashedPassword)
            console.log("User Verified: ", isMatch)
        } catch(e) {
            console.error(e)
        }

        redirect('/')

    }
    return (
        <main className="flex flex-col ">
            <HeaderCard title="Login" className="m-5"/>
             <Box component="form" action={login}>
                <FormControl className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                    <TextField required className="w-100" name="username" label="Username" placeholder="Enter username" />                    
                    <TextField required className="w-100" name="password" label="Password" placeholder="Enter password" />
                    <Button type="submit" variant="contained" className="w-100">Login</Button>
                </FormControl>
            </Box>
        </main>
    )
}