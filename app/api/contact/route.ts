
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
    await sendContactEmail(result.data)
    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return Response.json({ error: 'Unable to send message. Please try again.' }, { status: 500 })
  }
}
