import { TextField, FormControl, Button, Box, Card, CardContent } from "@mui/material"
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
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <HeaderCard title="Sign Up" className="mb-8" />
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl overflow-hidden">
                    <CardContent className="p-8">
                        <Box component="form" action={signup} className="space-y-6">
                            <FormControl className="w-full space-y-4">
                                <TextField
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    placeholder="Enter your username"
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
                                    Create Account
                                </Button>
                            </FormControl>
                        </Box>
                        <div className="mt-6 text-center">
                            <p className="text-white/70 text-sm">
                                Already have an account?{' '}
                                <a href="/account/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                    Login here
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}