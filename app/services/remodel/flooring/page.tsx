import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { createFaqSchema, flooringContent, flooringMetadata, flooringSchema } from '@/lib/service-content'

export const metadata: Metadata = flooringMetadata

export default function FlooringPage() {
  return (
    <ServiceDetailPage
      {...flooringContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Remodel', href: '/services/remodel' },
        { label: 'Flooring' },
      ]}
      accordionId="flooringFaq"
      serviceSchema={flooringSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(flooringContent.faqs) as Record<string, unknown>}
    />
  )
}
