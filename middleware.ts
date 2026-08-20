import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  if (host.startsWith('www.')) {
    const canonical = host.slice(4) // strip www.
    const url = request.nextUrl.clone()
    url.host = canonical
    return NextResponse.redirect(url, { status: 301 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next|favicon.ico|.*\\..*).*)',
}
