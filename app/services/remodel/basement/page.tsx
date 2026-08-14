import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { basementContent, basementMetadata, basementSchema, createFaqSchema } from '@/lib/service-content'

export const metadata: Metadata = basementMetadata

export default function BasementPage() {
  return (
    <ServiceDetailPage
      {...basementContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Remodel', href: '/services/remodel' },
        { label: 'Basement' },
      ]}
      accordionId="basementFaq"
      serviceSchema={basementSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(basementContent.faqs) as Record<string, unknown>}
    />
  )
}
