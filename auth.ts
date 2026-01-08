import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            authorize: async (credentials) => {
                try {
                    let user = null

                    const email = credentials.email
                    const password = credentials.password

                    const sql = neon(`${process.env.DATABASE_URL}`)
                    const data = await sql`SELECT * FROM users WHERE ${email} = users.email`
                    user = data[0]
                    console.log(user)

                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }

                    const hashedPassword = user['password_hash']
                    const isMatch = await bcrypt.compare(String(password), hashedPassword)

                    if (!isMatch) {
                        // No user found, so this is their first attempt to login
                        // Optionally, this is also the place you could do a user registration

                        throw new Error("Invalid credentials.")
                    }

                    // return user object with their profile data
                    return user
                } catch (e) {                    
                    return null
                }
            },
        }),
    ],
})