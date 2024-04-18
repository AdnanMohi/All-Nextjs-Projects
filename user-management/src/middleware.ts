import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // If the conditions are not met, return null or handle the error in some way
  // You can log an error or return an error response
  return NextResponse.error() // Example error response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
 
    '/profile',
    
    '/signup',
    '/verifyemail'
   
  ]
}
