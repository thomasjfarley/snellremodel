import { bookingSchema } from '@/lib/schemas'
import { isSlotAvailable, createBookingEvent } from '@/lib/google-calendar'
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

  const data = result.data

  try {
    const available = await isSlotAvailable(data.date, data.time)
    if (!available) {
      return Response.json(
        { error: 'That time slot is no longer available. Please choose another time.' },
        { status: 409 }
      )
    }

    await createBookingEvent(data)
    await sendBookingEmails(data)

    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/book]', err)
    return Response.json({ error: 'Unable to complete booking. Please try again.' }, { status: 500 })
  }
}
