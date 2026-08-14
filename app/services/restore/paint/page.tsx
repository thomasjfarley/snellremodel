import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { createFaqSchema, paintContent, paintMetadata, paintSchema } from '@/lib/service-content'

export const metadata: Metadata = paintMetadata

export default function PaintPage() {
  return (
    <ServiceDetailPage
      {...paintContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Restore', href: '/services/restore' },
        { label: 'Paint' },
      ]}
      accordionId="paintFaq"
      serviceSchema={paintSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(paintContent.faqs) as Record<string, unknown>}
    />
  )
}
