import { TextField, FormControl, Box, Button } from "@mui/material"
import { HeaderCard } from "@/app/_components/cards"
import { neon } from "@neondatabase/serverless"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export default function Login() {
    async function login(formData: FormData) {
        'use server'

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const sql = neon(`${process.env.DATABASE_URL}`)
            const data = await sql`SELECT * FROM users WHERE ${email} = users.email`
            const user = data[0]
            const hashedPassword = user['password_hash']
            const isMatch = await bcrypt.compare(password, hashedPassword)
            console.log("User Verified: ", isMatch)
        } catch (e) {
            console.error(e)
        }

        redirect('/')

    }

    async function authLogin(formData: FormData) {
        'use server'

        const options = {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false, 
            callbackUrl: '/dashboard'
        }

        console.log(options)

        try {
            await signIn("credentials", formData, {redirectTo: '/'})
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        console.error('Invalid credentials.'); // Return a user-friendly message
                        // redirect('/account/signup')
                        break
                    default:
                        console.error('Something went wrong.');
                    // redirect('/account/signup')
                }
            }
        }

    }
    return (
        <main className="flex flex-col ">
            <HeaderCard title="Login" className="m-5" />
            <Box component="form" action={authLogin}>
                <FormControl className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                    <TextField required className="w-100" name="email" label="Email" placeholder="Enter email" />
                    <TextField required className="w-100" name="password" label="Password" placeholder="Enter password" />
                    <Button type="submit" variant="contained" className="w-100">Login</Button>
                </FormControl>
            </Box>
        </main>
    )
}