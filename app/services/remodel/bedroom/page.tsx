import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { bedroomContent, bedroomMetadata, bedroomSchema, createFaqSchema } from '@/lib/service-content'

export const metadata: Metadata = bedroomMetadata

export default function BedroomPage() {
  return (
    <ServiceDetailPage
      {...bedroomContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Remodel', href: '/services/remodel' },
        { label: 'Bedroom' },
      ]}
      accordionId="bedroomFaq"
      serviceSchema={bedroomSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(bedroomContent.faqs) as Record<string, unknown>}
    />
  )
}
