'use client'

import { useMemo, useState } from 'react'
import ContactCard, { type PortalContact } from '@/components/portal/ContactCard'

type ContactStatusFilter = 'all' | 'new' | 'contacted' | 'scheduled' | 'closed'

const filterLabels: Record<ContactStatusFilter, string> = {
  all: 'All',
  new: 'New',
  contacted: 'Contacted',
  scheduled: 'Scheduled',
  closed: 'Closed',
}

type ContactQueueProps = {
  initialContacts: PortalContact[]
}

export default function ContactQueue({ initialContacts }: ContactQueueProps) {
  const [activeFilter, setActiveFilter] = useState<ContactStatusFilter>('all')
  const [contacts, setContacts] = useState(initialContacts)

  const counts = useMemo(() => {
    return contacts.reduce<Record<'new' | 'contacted' | 'scheduled' | 'closed', number>>(
      (accumulator, contact) => {
        accumulator[contact.status] += 1
        return accumulator
      },
      { new: 0, contacted: 0, scheduled: 0, closed: 0 },
    )
  }, [contacts])

  const filteredContacts = useMemo(() => {
    if (activeFilter === 'all') {
      return contacts
    }

    return contacts.filter((contact) => contact.status === activeFilter)
  }, [activeFilter, contacts])

  function handleUpdatedContact(updatedContact: PortalContact) {
    setContacts((current) => current.map((contact) => (
      contact.id === updatedContact.id ? updatedContact : contact
    )))
  }

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {(Object.keys(filterLabels) as ContactStatusFilter[]).map((filter) => {
          const count = filter === 'all' ? contacts.length : counts[filter as keyof typeof counts]
          return (
            <button
              key={filter}
              type="button"
              className={`btn btn-sm ${activeFilter === filter ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filterLabels[filter]}
              <span className={`badge ms-2 ${activeFilter === filter ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filteredContacts.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-center text-muted">
            No contacts in this view yet.
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="col-12 col-xl-6">
              <ContactCard contact={contact} onUpdated={handleUpdatedContact} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
