import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { createFaqSchema, kitchenContent, kitchenMetadata, kitchenSchema } from '@/lib/service-content'

export const metadata: Metadata = kitchenMetadata

export default function KitchenPage() {
  return (
    <ServiceDetailPage
      {...kitchenContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Remodel', href: '/services/remodel' },
        { label: 'Kitchen' },
      ]}
      accordionId="kitchenFaq"
      serviceSchema={kitchenSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(kitchenContent.faqs) as Record<string, unknown>}
    />
  )
}
