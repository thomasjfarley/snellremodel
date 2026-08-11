import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'Painting Services',
  description:
    'Professional interior and exterior painting services. Cabinet painting, color consultation, accent walls, and more. Licensed contractor. Get a free estimate.',
  keywords: [
    'painting contractor',
    'interior painting',
    'exterior painting',
    'cabinet painting',
    'house painter',
    'painting services',
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Painting Services',
  provider: { '@type': 'LocalBusiness', name: 'Snell Remodel' },
  description:
    'Professional interior and exterior painting, cabinet refinishing, and color consultation.',
  serviceType: 'Painting',
}

const faqs = [
  {
    q: 'How long does an interior painting project take?',
    a: 'Most single-room projects take 1–2 days. A full home interior typically takes 3–7 days depending on square footage, prep work needed, and number of coats.',
  },
  {
    q: 'Do I need to move my furniture before you start?',
    a: 'We ask that you move smaller items and valuables. We handle moving larger furniture away from walls and protect all floors and surfaces with drop cloths.',
  },
  {
    q: 'What paint brands do you use?',
    a: "We work with premium brands including Sherwin-Williams and Benjamin Moore. We're happy to use the product of your choice or recommend the best option for your project.",
  },
  {
    q: 'Do you offer color consultation?',
    a: "Yes — we can help you choose colors that complement your space, lighting, and style. Just mention it when you book your walkthrough.",
  },
  {
    q: 'Do you paint kitchen cabinets?',
    a: "Absolutely — cabinet painting is one of our specialties. Proper prep, priming, and a durable topcoat give you results that hold up to daily use and look factory-fresh.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const serviceItems = [
  { icon: 'bi-house',      title: 'Interior Painting',    desc: 'Walls, ceilings, trim, and doors painted to a professional standard. We protect everything and leave your home cleaner than we found it.' },
  { icon: 'bi-sun',        title: 'Exterior Painting',    desc: 'Weatherproof finishes that protect your home and add serious curb appeal. Proper surface prep and priming make all the difference.' },
  { icon: 'bi-grid',       title: 'Cabinet Painting',     desc: 'Transform your kitchen or bathroom without a full remodel. Our cabinet refinishing process delivers a durable, factory-fresh finish.' },
  { icon: 'bi-palette',    title: 'Color Consultation',   desc: 'Choosing the right colors is harder than it sounds. We help you find what works with your light, architecture, and personal style.' },
  { icon: 'bi-columns',    title: 'Accent Walls',         desc: "A single bold wall can transform a room. We help you plan and execute dramatic accents that complement the rest of your space." },
  { icon: 'bi-building',   title: 'Commercial Painting',  desc: 'Offices, retail spaces, and light commercial projects done on your schedule to minimize downtime.' },
]

export default function PaintingPage() {
  return (
    <>
      <JsonLd data={serviceSchema as Record<string, unknown>} />
      <JsonLd data={faqSchema as Record<string, unknown>} />

      {/* Page header */}
      <section className="bg-navy text-white py-5">
        <div className="container py-2">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-white-50 text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/services" className="text-white-50 text-decoration-none">Services</Link>
              </li>
              <li className="breadcrumb-item active text-accent" aria-current="page">Painting</li>
            </ol>
          </nav>
          <span className="badge bg-accent text-dark fw-semibold ls-1 mb-3" style={{ fontSize: '0.72rem' }}>
            OUR SPECIALTY
          </span>
          <h1 className="display-5 fw-bold mb-3">Painting Services</h1>
          <p className="text-white-50 fs-5 mb-4 col-lg-7">
            From a single accent wall to a full exterior repaint — we deliver flawless results
            with meticulous prep work and premium materials.
          </p>
          <Link href="/book" className="btn btn-accent btn-lg px-4">
            <i className="bi bi-calendar-check me-2" />Get a Free Estimate
          </Link>
        </div>
      </section>

      {/* Service items */}
      <section className="section-pad">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">What's Included</p>
              <h2 className="h2 fw-bold text-navy mb-2">Painting Services</h2>
              <p className="text-muted">We handle every type of painting project with the same level of care and precision.</p>
            </div>
          </div>
          <div className="row g-4">
            {serviceItems.map((item) => (
              <div key={item.title} className="col-md-6 col-lg-4">
                <div className="d-flex gap-3">
                  <div className="service-icon bg-accent bg-opacity-10 flex-shrink-0">
                    <i className={`bi ${item.icon} text-accent fs-5`} />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold text-navy mb-1">{item.title}</h3>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">FAQ</p>
                <h2 className="h2 fw-bold text-navy">Common Questions</h2>
              </div>
              <div className="accordion" id="paintingFaq">
                {faqs.map((faq, i) => (
                  <div key={i} className="accordion-item border-0 shadow-sm mb-2 rounded">
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button fw-medium rounded${i !== 0 ? ' collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-p-${i}`}
                        aria-expanded={i === 0 ? 'true' : 'false'}
                      >
                        {faq.q}
                      </button>
                    </h3>
                    <div
                      id={`faq-p-${i}`}
                      className={`accordion-collapse collapse${i === 0 ? ' show' : ''}`}
                      data-bs-parent="#paintingFaq"
                    >
                      <div className="accordion-body text-muted">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  )
}
