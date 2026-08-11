import 'server-only'
import { google } from 'googleapis'
import type { BookingFormData } from './schemas'

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !key) throw new Error('Google service account credentials not configured')

  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
}

function getCalendar() {
  return google.calendar({ version: 'v3', auth: getAuth() })
}

/** Check whether a given datetime slot is free on the contractor's calendar */
export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) return true

  const start = new Date(`${date} ${time}`)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000) // 2-hour window

  const calendar = getCalendar()
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      items: [{ id: calendarId }],
    },
  })

  const busy = response.data.calendars?.[calendarId]?.busy ?? []
  return busy.length === 0
}

/** Create a Google Calendar event for a confirmed booking */
export async function createBookingEvent(data: BookingFormData): Promise<string> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) throw new Error('Google Calendar ID not configured')

  const start = new Date(`${data.date} ${data.time}`)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

  const serviceLabel = data.service.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const calendar = getCalendar()
  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Walkthrough — ${serviceLabel} (${data.name})`,
      description: [
        `Service: ${serviceLabel}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        data.notes ? `Notes: ${data.notes}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [{ email: data.email, displayName: data.name }],
    },
  })

  return event.data.id ?? ''
}
