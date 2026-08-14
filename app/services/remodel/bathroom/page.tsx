import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { bathroomContent, bathroomMetadata, bathroomSchema, createFaqSchema } from '@/lib/service-content'

export const metadata: Metadata = bathroomMetadata

export default function BathroomPage() {
  return (
    <ServiceDetailPage
      {...bathroomContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Remodel', href: '/services/remodel' },
        { label: 'Bathroom' },
      ]}
      accordionId="bathroomFaq"
      serviceSchema={bathroomSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(bathroomContent.faqs) as Record<string, unknown>}
    />
  )
}
