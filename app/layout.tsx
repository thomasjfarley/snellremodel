import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import BootstrapClient from '@/components/BootstrapClient'
import JsonLd from '@/components/JsonLd'
import SiteChrome from '@/components/layout/SiteChrome'

const inter = Inter({ subsets: ['latin'] })

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Snel Remodeling Services',
  description:
    'Professional painting, remodeling, and drywall services in Salt Lake City, Utah. Licensed and insured contractor.',
  url: 'https://snelremodeling.com',
  telephone: process.env.NEXT_PUBLIC_PHONE ?? '(801) 981-9977',
  email: process.env.NEXT_PUBLIC_EMAIL,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Salt Lake City',
    addressRegion: 'UT',
    addressCountry: 'US',
  },
  areaServed: [
    'Salt Lake City', 'Sandy', 'Draper', 'Murray', 'West Jordan',
    'South Jordan', 'Herriman', 'Riverton', 'Taylorsville', 'Millcreek',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Remodeling Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drywall Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Damage Restoration' } },
    ],
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://snelremodeling.com'),
  title: {
    default: 'Snel Remodeling Services | Painting, Remodeling & Drywall',
    template: '%s | Snel Remodeling Services',
  },
  description:
    'Professional painting, remodeling, and drywall services in Salt Lake City, Utah. Licensed and insured contractor. Free estimates — call today.',
  keywords: [
    'painting contractor',
    'home remodel',
    'kitchen remodel',
    'bathroom remodel',
    'drywall',
    'interior painting',
    'exterior painting',
    'cabinet painting',
    'drywall repair',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Snel Remodeling Services',
    title: 'Snel Remodeling Services | Painting, Remodeling & Drywall',
    description:
      'Professional painting, remodeling, and drywall services. Get a free estimate today.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snel Remodeling Services | Painting, Remodeling & Drywall',
    description:
      'Professional painting, remodeling, and drywall services. Get a free estimate today.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://snelremodeling.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="d-flex flex-column min-vh-100">
        <JsonLd data={localBusinessSchema as Record<string, unknown>} />
        <BootstrapClient />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
