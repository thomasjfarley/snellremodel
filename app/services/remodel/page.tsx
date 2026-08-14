import type { Metadata } from 'next'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'
import { remodelCards, remodelMetadata, remodelSchema } from '@/lib/service-content'

export const metadata: Metadata = remodelMetadata

export default function RemodelPage() {
  return (
    <ServiceCategoryPage
      eyebrow="SERVICE CATEGORY"
      title="Remodel Services"
      description="Explore kitchen, bathroom, basement, bedroom, and flooring remodel services from Snel Remodeling Services in Salt Lake County, Utah."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Remodel' },
      ]}
      cards={remodelCards}
      serviceSchema={remodelSchema as Record<string, unknown>}
    />
  )
}
