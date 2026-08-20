import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { getCloudflareContext } from '@opennextjs/cloudflare'

async function getDB(): Promise<D1Database | undefined> {
  try {
    const ctx = await getCloudflareContext({ async: true })
    return (ctx.env as Record<string, unknown>).DB as D1Database | undefined
  } catch {
    return undefined
  }
}

export async function POST(request: Request) {
  let body: { password?: string }

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.password) {
    return Response.json({ error: 'Password required' }, { status: 400 })
  }

  const db = await getDB()

  if (!db) {
    return Response.json({ error: 'Database unavailable' }, { status: 503 })
  }

  const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('password_hash').first<{ value: string }>()

  if (!row) {
    return Response.json({ error: 'Portal not configured — visit /srsp/setup' }, { status: 503 })
  }

  const valid = await bcrypt.compare(body.password, row.value)

  if (!valid) {
    return Response.json({ error: 'Invalid password' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('srsp_auth', 'authenticated', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return Response.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('srsp_auth')
  return Response.json({ ok: true })
}
