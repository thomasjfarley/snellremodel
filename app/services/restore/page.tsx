import type { Metadata } from 'next'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'
import { restoreCards, restoreMetadata, restoreSchema } from '@/lib/service-content'

export const metadata: Metadata = restoreMetadata

export default function RestorePage() {
  return (
    <ServiceCategoryPage
      eyebrow="SERVICE CATEGORY"
      title="Restore Services"
      description="Explore paint, drywall, and water damage restoration services from Snel Remodeling Services in Salt Lake County, Utah."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Restore' },
      ]}
      cards={restoreCards}
      serviceSchema={restoreSchema as Record<string, unknown>}
    />
  )
}
