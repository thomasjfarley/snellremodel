import 'server-only'
import { Resend } from 'resend'
import type { BookingFormData, ContactFormData } from './schemas'

function getClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY not configured')
  return new Resend(apiKey)
}

const FROM = process.env.RESEND_FROM_EMAIL ?? 'booking@snelremodeling.com'
const CONTRACTOR = process.env.RESEND_CONTRACTOR_EMAIL ?? process.env.NEXT_PUBLIC_EMAIL ?? ''

export async function sendBookingEmails(data: BookingFormData): Promise<void> {
  const resend = getClient()
  const serviceLabel = data.service.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  // Confirmation to customer
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Walkthrough Confirmed — Snel Remodeling Services`,
    html: `
      <h2>Your walkthrough is confirmed!</h2>
      <p>Hi ${data.name},</p>
      <p>We have you scheduled for a free walkthrough. Here are the details:</p>
      <table>
        <tr><td><strong>Service:</strong></td><td>${serviceLabel}</td></tr>
        <tr><td><strong>Date:</strong></td><td>${data.date}</td></tr>
        <tr><td><strong>Time:</strong></td><td>${data.time}</td></tr>
      </table>
      ${data.notes ? `<p><strong>Your notes:</strong> ${data.notes}</p>` : ''}
      <p>We will be in touch if anything changes. See you soon!</p>
      <p>— Snel Remodeling Services</p>
    `,
  })

  // Notification to contractor
  if (CONTRACTOR) {
    await resend.emails.send({
      from: FROM,
      to: CONTRACTOR,
      subject: `New Walkthrough Booking — ${data.name} (${serviceLabel})`,
      html: `
        <h2>New booking received</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Service:</strong></td><td>${serviceLabel}</td></tr>
          <tr><td><strong>Date:</strong></td><td>${data.date}</td></tr>
          <tr><td><strong>Time:</strong></td><td>${data.time}</td></tr>
          ${data.notes ? `<tr><td><strong>Notes:</strong></td><td>${data.notes}</td></tr>` : ''}
        </table>
      `,
    })
  }
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const resend = getClient()
  const serviceLabel = data.service
    ? data.service.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Not specified'

  if (CONTRACTOR) {
    await resend.emails.send({
      from: FROM,
      to: CONTRACTOR,
      replyTo: data.email,
      subject: `New Contact Message — ${data.name}`,
      html: `
        <h2>New contact form submission</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          ${data.phone ? `<tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>` : ''}
          <tr><td><strong>Service:</strong></td><td>${serviceLabel}</td></tr>
        </table>
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    })
  }

  // Auto-reply to sender
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Thanks for reaching out — Snel Remodeling Services`,
    html: `
      <p>Hi ${data.name},</p>
      <p>Thanks for getting in touch! We received your message and will get back to you shortly.</p>
      <p>In the meantime, feel free to call us at ${process.env.NEXT_PUBLIC_PHONE ?? '(425) 524-1379'}.</p>
      <p>— Snel Remodeling Services</p>
    `,
  })
}
