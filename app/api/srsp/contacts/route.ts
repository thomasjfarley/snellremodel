import { getCloudflareContext } from '@opennextjs/cloudflare'
import { isPortalAuthenticated } from '@/lib/portal-auth'

export async function GET() {
  if (!await isPortalAuthenticated()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const ctx = await getCloudflareContext({ async: true })
    const db = (ctx.env as Record<string, unknown>).DB as D1Database | undefined

    if (!db) {
      return Response.json([])
    }

    const result = await db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
    return Response.json(result.results)
  } catch (err) {
    console.error('[/api/srsp/contacts]', err)
    return Response.json({ error: 'Unable to load contacts' }, { status: 500 })
  }
}
