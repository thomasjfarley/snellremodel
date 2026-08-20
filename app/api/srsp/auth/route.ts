import { cookies } from 'next/headers'

export async function POST(request: Request) {
  let body: { password?: string }

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const password = process.env.PORTAL_PASSWORD

  if (!password || body.password !== password) {
    return Response.json({ error: 'Invalid password' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('srsp_auth', process.env.PORTAL_PASSWORD!, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/srsp',
  })

  return Response.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('srsp_auth')
  return Response.json({ ok: true })
}
