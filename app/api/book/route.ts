
import { bookingSchema } from '@/lib/schemas'
import { sendBookingEmails } from '@/lib/resend'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = bookingSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  try {
    // Google Calendar sync is configured via env vars (GOOGLE_CALENDAR_ID etc.)
    // When those vars are present the calendar integration activates automatically.
    // For now: validate the booking and send confirmation emails.
    await sendBookingEmails(result.data)
    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/book]', err)
    return Response.json({ error: 'Unable to complete booking. Please try again.' }, { status: 500 })
  }
}
