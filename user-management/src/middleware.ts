import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'
import Role from './models/roleSchema'

export async function authMiddleware(request:any) {
  // Check if the path is a public path
  const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(request.nextUrl.pathname)

  // Get the session
  const session = await getSession({ req: request.nextRequest })

  // If it's a public path and there's a session, redirect to home
  if (isPublicPath && session) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If it's not a public path and there's no session, redirect to login
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Return null if no redirection is needed
  return null
}

export async function roleMiddleware(request:any) {
  // Your role-based middleware logic here
  // For example, fetching user role from the database and checking permissions

  // Return null if no redirection is needed
  return null
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/",'/profile', '/verifyemail']
}
