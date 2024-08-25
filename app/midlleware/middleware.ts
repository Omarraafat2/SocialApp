import { NextRequest } from "next/server"


export default function middleware(request: NextRequest) {

    const currentUser = request.cookies.get('token')?.value
    const {pathname}= request.nextUrl
 

    if (currentUser) {
        if (pathname === '/signin' ||pathname === '/' ||  pathname === '/signup') {

            return Response.redirect(new URL('/posts', request.url))
        } else {
            if (pathname !== ' /' && pathname !== '/signup') {
                return Response.redirect(new URL('/posts', request.url))
            }
        }


    }
}

export const config = {
    matcher: ['/', '/signup'],
}