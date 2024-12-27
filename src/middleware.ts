import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/projects', request.url))
    }
    return null
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  return null
}

export const config = {
  matcher: ['/projects/:path*', '/auth/:path*']
}
