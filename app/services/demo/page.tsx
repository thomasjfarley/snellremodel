import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/services/ServiceDetailPage'
import { createFaqSchema, demoContent, demoMetadata, demoSchema } from '@/lib/service-content'

export const metadata: Metadata = demoMetadata

export default function DemoPage() {
  return (
    <ServiceDetailPage
      {...demoContent}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Demo' },
      ]}
      accordionId="demoFaq"
      serviceSchema={demoSchema as Record<string, unknown>}
      faqSchema={createFaqSchema(demoContent.faqs) as Record<string, unknown>}
    />
  )
}
