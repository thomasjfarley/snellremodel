import 'server-only'
import { Resend } from 'resend'
import type { ContactFormData } from './schemas'

function getClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY not configured')
  return new Resend(apiKey)
}

const FROM = process.env.RESEND_FROM_EMAIL ?? 'booking@snelremodeling.com'
const CONTRACTOR = process.env.RESEND_CONTRACTOR_EMAIL ?? process.env.NEXT_PUBLIC_EMAIL ?? ''

const serviceLabels: Record<NonNullable<ContactFormData['service']>, string> = {
  remodel: 'Remodel',
  restore: 'Restore',
  demo: 'Demo',
  other: 'Other / Not Sure',
  '': 'Not specified',
}

const preferredContactLabels: Record<ContactFormData['preferredContact'], string> = {
  morning: 'Morning (8am–12pm)',
  afternoon: 'Afternoon (12pm–5pm)',
  evening: 'Evening (5pm–8pm)',
  anytime: 'Anytime',
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  if (!CONTRACTOR) return

  const resend = getClient()
  const serviceLabel = serviceLabels[data.service ?? ''] ?? 'Not specified'
  const preferredContactLabel = preferredContactLabels[data.preferredContact]

  await resend.emails.send({
    from: FROM,
    to: CONTRACTOR,
    replyTo: data.email,
    subject: `New Walkthrough Request — ${data.name} (${serviceLabel})`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
        <h2 style="margin-bottom: 16px; color: #1a2e44;">New walkthrough request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 700; width: 180px;">Name</td>
            <td style="padding: 8px 0;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Phone</td>
            <td style="padding: 8px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Service</td>
            <td style="padding: 8px 0;">${escapeHtml(serviceLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Preferred contact time</td>
            <td style="padding: 8px 0;">${escapeHtml(preferredContactLabel)}</td>
          </tr>
        </table>
        <div style="margin-top: 20px;">
          <p style="margin: 0 0 8px; font-weight: 700;">Message</p>
          <div style="padding: 16px; background: #f7f5f0; border-left: 4px solid #c8a254; border-radius: 6px;">
            ${escapeHtml(data.message).replace(/\n/g, '<br />')}
          </div>
        </div>
      </div>
    `,
  })
}
