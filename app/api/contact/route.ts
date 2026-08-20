import { getCloudflareContext } from '@opennextjs/cloudflare'
import { contactSchema } from '@/lib/schemas'
import { sendContactEmail } from '@/lib/resend'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  try {
    try {
      const ctx = await getCloudflareContext({ async: true })
      const db = (ctx.env as Record<string, unknown>).DB as D1Database | undefined

      if (db) {
        await db.prepare(
          'INSERT INTO contacts (name, email, phone, service, preferred_contact, message) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(
          result.data.name,
          result.data.email,
          result.data.phone,
          result.data.service || null,
          result.data.preferredContact ?? 'anytime',
          result.data.message
        ).run()
      } else {
        console.warn('[/api/contact] D1 binding unavailable; skipping contact insert.')
      }
    } catch (err) {
      console.warn('[/api/contact] D1 insert failed:', err)
    }

    await sendContactEmail(result.data)
    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return Response.json({ error: 'Unable to send message. Please try again.' }, { status: 500 })
  }
}
