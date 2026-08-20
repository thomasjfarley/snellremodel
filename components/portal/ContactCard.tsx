'use client'

import { useMemo, useState } from 'react'

type ContactStatus = 'new' | 'contacted' | 'scheduled' | 'closed'

export type PortalContact = {
  id: number
  name: string
  email: string
  phone: string | null
  service: string | null
  preferred_contact: 'morning' | 'afternoon' | 'evening' | 'anytime' | null
  message: string
  status: ContactStatus
  notes: string | null
  created_at: string
}

const statusVariants: Record<ContactStatus, string> = {
  new: 'primary',
  contacted: 'warning text-dark',
  scheduled: 'success',
  closed: 'secondary',
}

const statusLabels: Record<ContactStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  scheduled: 'Scheduled',
  closed: 'Closed',
}

const preferredContactLabels = {
  morning: 'Morning (8am–12pm)',
  afternoon: 'Afternoon (12pm–5pm)',
  evening: 'Evening (5pm–8pm)',
  anytime: 'Anytime',
} as const

const serviceLabels: Record<string, string> = {
  remodel: 'Remodel',
  restore: 'Restore',
  demo: 'Demo',
  other: 'Other / Not Sure',
}

type ContactCardProps = {
  contact: PortalContact
  onUpdated: (contact: PortalContact) => void
}

export default function ContactCard({ contact, onUpdated }: ContactCardProps) {
  const [status, setStatus] = useState<ContactStatus>(contact.status)
  const [notes, setNotes] = useState(contact.notes ?? '')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSavingStatus, setIsSavingStatus] = useState(false)
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const truncatedMessage = useMemo(() => {
    if (isExpanded || contact.message.length <= 180) {
      return contact.message
    }

    return `${contact.message.slice(0, 180).trimEnd()}…`
  }, [contact.message, isExpanded])

  const serviceLabel = contact.service ? serviceLabels[contact.service] ?? contact.service : 'Not specified'
  const preferredContact = preferredContactLabels[contact.preferred_contact ?? 'anytime']

  async function saveContact(nextStatus: ContactStatus, nextNotes: string) {
    const response = await fetch(`/api/srsp/contacts/${contact.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: nextStatus,
        notes: nextNotes.trim() ? nextNotes.trim() : null,
      }),
    })

    if (!response.ok) {
      throw new Error('Unable to update contact')
    }

    const updatedContact = {
      ...contact,
      status: nextStatus,
      notes: nextNotes.trim() ? nextNotes.trim() : null,
    }

    setStatus(nextStatus)
    setNotes(nextNotes)
    onUpdated(updatedContact)
  }

  async function handleStatusUpdate(nextStatus: ContactStatus) {
    setError(null)
    setIsSavingStatus(true)

    try {
      await saveContact(nextStatus, notes)
    } catch {
      setError('Unable to update status right now.')
    } finally {
      setIsSavingStatus(false)
    }
  }

  async function handleNotesSave() {
    setError(null)
    setIsSavingNotes(true)

    try {
      await saveContact(status, notes)
    } catch {
      setError('Unable to save notes right now.')
    } finally {
      setIsSavingNotes(false)
    }
  }

  return (
    <article className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div className="min-w-0">
            <h2 className="h5 fw-bold text-navy mb-1">{contact.name}</h2>
            <div className="d-flex flex-column flex-sm-row flex-wrap gap-1 gap-sm-2">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="text-decoration-none fw-semibold fs-6">
                  📞 {contact.phone}
                </a>
              )}
              <a href={`mailto:${contact.email}`} className="small text-muted text-decoration-none text-truncate">
                {contact.email}
              </a>
            </div>
          </div>
          <span className={`badge bg-${statusVariants[status]} px-3 py-2`}>
            {statusLabels[status]}
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge text-bg-light border">{serviceLabel}</span>
          <span className="badge text-bg-light border">{preferredContact}</span>
          <span className="badge text-bg-light border">
            {new Date(contact.created_at).toLocaleString()}
          </span>
        </div>

        <div className="mb-3">
          <p className="fw-semibold text-navy small text-uppercase ls-1 mb-2">Message</p>
          <p className="text-muted mb-2">{truncatedMessage}</p>
          {contact.message.length > 180 && (
            <button
              type="button"
              className="btn btn-link btn-sm px-0 text-decoration-none"
              onClick={() => setIsExpanded((current) => !current)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        <div className="mb-3">
          <p className="fw-semibold text-navy small text-uppercase ls-1 mb-2">Status</p>
          <div className="d-flex flex-wrap gap-2">
            {(['new', 'contacted', 'scheduled', 'closed'] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={`btn btn-sm ${status === option ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleStatusUpdate(option)}
                disabled={isSavingStatus}
              >
                {statusLabels[option]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor={`contact-notes-${contact.id}`} className="form-label fw-semibold text-navy small text-uppercase ls-1">
            Notes
          </label>
          <textarea
            id={`contact-notes-${contact.id}`}
            rows={3}
            className="form-control mb-2"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add follow-up notes..."
          />
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleNotesSave}
            disabled={isSavingNotes}
          >
            {isSavingNotes ? 'Saving…' : 'Save Notes'}
          </button>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small mt-3 mb-0" role="alert">
            {error}
          </div>
        )}
      </div>
    </article>
  )
}
