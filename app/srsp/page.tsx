import { getCloudflareContext } from '@opennextjs/cloudflare'
import { redirect } from 'next/navigation'
import ContactQueue from '@/components/portal/ContactQueue'
import SignOutButton from '@/components/portal/SignOutButton'
import { isPortalAuthenticated } from '@/lib/portal-auth'
import type { PortalContact } from '@/components/portal/ContactCard'

export const dynamic = 'force-dynamic'

async function getContacts(): Promise<PortalContact[]> {
  try {
    const ctx = await getCloudflareContext({ async: true })
    const db = (ctx.env as Record<string, unknown>).DB as D1Database | undefined

    if (!db) {
      console.warn('[app/srsp/page] D1 binding unavailable; rendering empty contact queue.')
      return []
    }

    const result = await db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all<PortalContact>()
    return result.results
  } catch (err) {
    console.warn('[app/srsp/page] Unable to load contacts:', err)
    return []
  }
}

export default async function PortalPage() {
  if (!await isPortalAuthenticated()) {
    redirect('/srsp/login')
  }

  const contacts = await getContacts()

  return (
    <section className="bg-light-warm min-vh-100 pb-5">
      <header className="bg-navy text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center gap-2 flex-wrap">
          <div>
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-1">Snel Portal</p>
            <h1 className="h4 fw-bold mb-0 text-accent">Snel Portal</h1>
          </div>
          <div className="d-flex gap-2 flex-shrink-0">
            <a href="/srsp/settings" className="btn btn-outline-light btn-sm">Settings</a>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="container py-4 py-lg-5">
        <div className="mb-4">
          <h2 className="h3 fw-bold text-navy mb-2">Contact Queue</h2>
          <p className="text-muted mb-0">Most recent walkthrough requests appear first.</p>
        </div>

        <ContactQueue initialContacts={contacts} />
      </div>
    </section>
  )
}
