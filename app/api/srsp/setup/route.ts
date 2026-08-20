import bcrypt from 'bcryptjs'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { cookies } from 'next/headers'

async function getDB(): Promise<D1Database | undefined> {
  try {
    const ctx = await getCloudflareContext({ async: true })
    return (ctx.env as Record<string, unknown>).DB as D1Database | undefined
  } catch {
    return undefined
  }
}

// POST /api/srsp/setup — set initial password (only works if no password exists yet)
export async function POST(request: Request) {
  let body: { password?: string }

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.password || body.password.length < 8) {
    return Response.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const db = await getDB()
  if (!db) return Response.json({ error: 'Database unavailable' }, { status: 503 })

  const existing = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('password_hash').first()
  if (existing) {
    return Response.json({ error: 'Portal already configured' }, { status: 409 })
  }

  const hash = await bcrypt.hash(body.password, 12)
  await db.prepare(
    "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))"
  ).bind('password_hash', hash).run()

  const cookieStore = await cookies()
  cookieStore.set('srsp_auth', 'authenticated', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/srsp',
  })

  return Response.json({ ok: true })
}
