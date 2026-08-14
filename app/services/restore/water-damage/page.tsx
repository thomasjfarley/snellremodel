import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { createFaqSchema, waterDamageContent, waterDamageMetadata, waterDamageSchema } from '@/lib/service-content'

export const metadata: Metadata = waterDamageMetadata

export default function WaterDamagePage() {
  return (
    <ServiceDetailPage
      {...waterDamageContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Restore', href: '/services/restore' },
        { label: 'Water Damage' },
      ]}
      accordionId="waterDamageFaq"
      serviceSchema={waterDamageSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(waterDamageContent.faqs) as Record<string, unknown>}
    />
  )
}
