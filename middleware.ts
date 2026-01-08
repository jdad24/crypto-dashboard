import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {    
    let session = await auth()

    if (!session?.['user'] && (!request.nextUrl.pathname.startsWith('/api/auth/signin')) && (!request.nextUrl.pathname.startsWith('/account/signup'))) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }

    return NextResponse.next()

}