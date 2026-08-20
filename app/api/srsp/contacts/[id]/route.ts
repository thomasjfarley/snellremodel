import { getCloudflareContext } from '@opennextjs/cloudflare'
import { isPortalAuthenticated } from '@/lib/portal-auth'

const allowedStatuses = new Set(['new', 'contacted', 'scheduled', 'closed'])

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!await isPortalAuthenticated()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  let body: { status?: string; notes?: string | null }

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.status || !allowedStatuses.has(body.status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    const ctx = await getCloudflareContext({ async: true })
    const db = (ctx.env as Record<string, unknown>).DB as D1Database | undefined

    if (!db) {
      return Response.json({ error: 'DB unavailable' }, { status: 503 })
    }

    await db.prepare('UPDATE contacts SET status = ?, notes = ? WHERE id = ?')
      .bind(body.status, body.notes ?? null, Number.parseInt(id, 10))
      .run()

    return Response.json({ ok: true })
  } catch (err) {
    console.error(`[/api/srsp/contacts/${id}]`, err)
    return Response.json({ error: 'Unable to update contact' }, { status: 500 })
  }
}
