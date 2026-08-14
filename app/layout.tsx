import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BootstrapClient from '@/components/BootstrapClient'
import JsonLd from '@/components/JsonLd'

const inter = Inter({ subsets: ['latin'] })

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Snel Remodeling Services',
  description:
    'Professional remodeling, restoration, and demolition services. Licensed and insured contractor.',
  url: 'https://snelremodeling.com',
  telephone: process.env.NEXT_PUBLIC_PHONE,
  email: process.env.NEXT_PUBLIC_EMAIL,
  priceRange: '$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Remodeling Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodel' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restore' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Demo' } },
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
    'Professional painting, remodeling, and drywall services. Licensed and insured contractor. Get a free estimate today.',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="d-flex flex-column min-vh-100">
        <JsonLd data={localBusinessSchema as Record<string, unknown>} />
        <BootstrapClient />
        <Navbar />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
