import { getCloudflareContext } from '@opennextjs/cloudflare'
import { isPortalAuthenticated } from '@/lib/portal-auth'

type PushSubscriptionBody = {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

async function getDB(): Promise<D1Database | undefined> {
  try {
    const ctx = await getCloudflareContext({ async: true })
    return (ctx.env as Record<string, unknown>).DB as D1Database | undefined
  } catch {
    return undefined
  }
}

// POST /api/srsp/push — save a push subscription
export async function POST(request: Request) {
  if (!await isPortalAuthenticated()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: PushSubscriptionBody
  try {
    body = await request.json() as PushSubscriptionBody
  } catch {
    return Response.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (!body?.endpoint || !body?.keys?.p256dh || !body?.keys?.auth) {
    return Response.json({ error: 'Invalid subscription' }, { status: 400 })
  }

  const db = await getDB()
  if (!db) return Response.json({ error: 'DB unavailable' }, { status: 503 })

  await db.prepare(
    'INSERT OR REPLACE INTO push_subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?)'
  ).bind(body.endpoint, body.keys.p256dh, body.keys.auth).run()

  return Response.json({ ok: true })
}

// DELETE /api/srsp/push — remove a push subscription
export async function DELETE(request: Request) {
  if (!await isPortalAuthenticated()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { endpoint: string }
  try {
    body = await request.json() as { endpoint: string }
  } catch {
    return Response.json({ error: 'Invalid body' }, { status: 400 })
  }

  const db = await getDB()
  if (!db) return Response.json({ error: 'DB unavailable' }, { status: 503 })

  await db.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(body.endpoint).run()

  return Response.json({ ok: true })
}
