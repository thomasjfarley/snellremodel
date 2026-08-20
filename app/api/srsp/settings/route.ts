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

// PATCH /api/srsp/settings — change password (must be authenticated)
export async function PATCH(request: Request) {
  let body: { currentPassword?: string; newPassword?: string }

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.currentPassword || !body.newPassword) {
    return Response.json({ error: 'Both current and new password are required' }, { status: 400 })
  }

  if (body.newPassword.length < 8) {
    return Response.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
  }

  const db = await getDB()
  if (!db) return Response.json({ error: 'Database unavailable' }, { status: 503 })

  const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('password_hash').first<{ value: string }>()
  if (!row) return Response.json({ error: 'Portal not configured' }, { status: 503 })

  const valid = await bcrypt.compare(body.currentPassword, row.value)
  if (!valid) return Response.json({ error: 'Current password is incorrect' }, { status: 401 })

  const newHash = await bcrypt.hash(body.newPassword, 12)
  await db.prepare(
    "UPDATE settings SET value = ?, updated_at = datetime('now') WHERE key = ?"
  ).bind(newHash, 'password_hash').run()

  return Response.json({ ok: true })
}
