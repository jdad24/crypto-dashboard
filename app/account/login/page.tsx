import { TextField, FormControl, Box, Button, Card, CardContent } from "@mui/material"
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
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <HeaderCard title="Login" className="mb-8" />
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl overflow-hidden">
                    <CardContent className="p-8">
                        <Box component="form" action={authLogin} className="space-y-6">
                            <FormControl className="w-full space-y-4">
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="outlined"
                                    className="bg-white/5"
                                    InputLabelProps={{
                                        className: "text-white"
                                    }}
                                    InputProps={{
                                        className: "text-white border-white/30",
                                        classes: {
                                            notchedOutline: "border-white/30"
                                        }
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    variant="outlined"
                                    className="bg-white/5"
                                    InputLabelProps={{
                                        className: "text-white"
                                    }}
                                    InputProps={{
                                        className: "text-white border-white/30",
                                        classes: {
                                            notchedOutline: "border-white/30"
                                        }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Login
                                </Button>
                            </FormControl>
                        </Box>
                        <div className="mt-6 text-center">
                            <p className="text-white/70 text-sm">
                                Don't have an account?{' '}
                                <a href="/account/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                    Sign up here
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}