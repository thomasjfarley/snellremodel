import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { createFaqSchema, drywallContent, drywallMetadata, drywallSchema } from '@/lib/service-content'

export const metadata: Metadata = drywallMetadata

export default function DrywallPage() {
  return (
    <ServiceDetailPage
      {...drywallContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Restore', href: '/services/restore' },
        { label: 'Drywall' },
      ]}
      accordionId="drywallFaq"
      serviceSchema={drywallSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(drywallContent.faqs) as Record<string, unknown>}
    />
  )
}
