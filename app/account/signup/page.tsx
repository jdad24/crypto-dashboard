import { TextField, FormControl, Button, Box } from "@mui/material"
import { HeaderCard } from "@/app/_components/cards"
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default function SignUp() {
    async function signup(formData: FormData) {
        'use server'

        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const hashedPassword = await bcrypt.hash(password, 10)

        if (!username || !email || !password) {
            throw Error("Missing values")
        }

        try {
            const sql = neon(`${process.env.DATABASE_URL}`)
            const response = await sql`INSERT INTO users (username, email, password_hash) VALUES (${username}, ${email}, ${hashedPassword}) RETURNING *`            
            console.log(response)
        } catch (e) {
            console.error(e)
        }
        redirect('/api/auth/signin')
    }
    return (
        <main className="flex flex-col ">
            <HeaderCard title="Sign Up" className="m-5" />
            <Box component="form" action={signup}>
                <FormControl className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                    <TextField required className="w-100" name="username" label="Username" placeholder="Enter username" />
                    <TextField required className="w-100" name="email" label="Email" placeholder="Enter email" />
                    <TextField required className="w-100" name="password" label="Password" placeholder="Enter password" />
                    <Button type="submit" variant="contained" className="w-100">Create Account</Button>
                </FormControl>
            </Box>
        </main>
    )
}