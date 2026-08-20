import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const proto = request.headers.get('x-forwarded-proto')

  // Redirect HTTP → HTTPS in production
  if (proto === 'http') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    return NextResponse.redirect(url, { status: 301 })
  }

  // Redirect www → non-www
  if (host.startsWith('www.')) {
    const canonical = host.slice(4)
    const url = request.nextUrl.clone()
    url.host = canonical
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next|favicon.ico|.*\\..*).*)',
}
