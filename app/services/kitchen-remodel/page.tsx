import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'Kitchen Remodels',
  description:
    'Expert kitchen remodeling services: full gut renovations, cabinet installation, countertop replacement, and layout redesign. Free estimates available.',
  keywords: [
    'kitchen remodel',
    'kitchen renovation',
    'cabinet installation',
    'countertop replacement',
    'kitchen contractor',
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Kitchen Remodeling',
  provider: { '@type': 'LocalBusiness', name: 'Snell Remodel' },
  description: 'Full kitchen renovations including cabinets, countertops, and layout changes.',
  serviceType: 'Kitchen Remodel',
}

const faqs = [
  {
    q: 'How long does a kitchen remodel take?',
    a: 'A minor update (countertops, hardware, paint) can take 1–2 weeks. A full gut renovation typically takes 4–8 weeks depending on scope, material lead times, and permits.',
  },
  {
    q: 'Do I need permits for a kitchen remodel?',
    a: "It depends on the scope of work. Structural changes, electrical, and plumbing upgrades typically require permits. We'll advise you on what's needed for your project before we start.",
  },
  {
    q: 'Can you work with my existing cabinets?',
    a: "Absolutely. We can reface, paint, or modify existing cabinets if they're structurally sound. This is often a great way to refresh your kitchen at a lower cost than full replacement.",
  },
  {
    q: 'Can I stay in my home during the remodel?',
    a: "For most kitchen remodels, yes — though you'll need to plan around limited kitchen access. We work efficiently and clean up each day to minimize disruption to your daily life.",
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
  { icon: 'bi-house-door',   title: 'Full Kitchen Renovation',   desc: 'Complete gut renovations from floor to ceiling — new layout, cabinets, countertops, and finishes.' },
  { icon: 'bi-grid',         title: 'Cabinet Installation',      desc: 'Custom and semi-custom cabinet installation with professional fitting, alignment, and hardware.' },
  { icon: 'bi-square',       title: 'Countertop Replacement',    desc: 'Quartz, granite, laminate, or butcher block — we handle templating, fabrication coordination, and installation.' },
  { icon: 'bi-arrows-move',  title: 'Layout Changes',            desc: 'Reimagine your kitchen flow. We can move walls, islands, and fixture locations to create the kitchen you actually want.' },
  { icon: 'bi-lightbulb',    title: 'Fixture & Hardware Updates', desc: 'New faucets, lighting, handles, and pulls that tie the whole look together.' },
  { icon: 'bi-brush',        title: 'Kitchen Painting',          desc: 'Fresh paint, cabinet refinishing, and color consultation to complete the transformation.' },
]

const process = [
  { step: '01', title: 'Free Walkthrough', desc: 'We visit your space, discuss your vision, and assess what is needed.' },
  { step: '02', title: 'Detailed Estimate', desc: 'You receive a clear, itemized quote with no hidden costs.' },
  { step: '03', title: 'Scheduled Build', desc: 'We agree on a timeline and get to work — keeping you updated throughout.' },
  { step: '04', title: 'Final Walkthrough', desc: 'We review every detail together before calling the job complete.' },
]

export default function KitchenRemodelPage() {
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
              <li className="breadcrumb-item active text-accent" aria-current="page">Kitchen Remodels</li>
            </ol>
          </nav>
          <h1 className="display-5 fw-bold mb-3">Kitchen Remodels</h1>
          <p className="text-white-50 fs-5 mb-4 col-lg-7">
            From a simple cabinet refresh to a full gut renovation — we transform kitchens
            into spaces you will actually want to spend time in.
          </p>
          <Link href="/book" className="btn btn-accent btn-lg px-4">
            <i className="bi bi-calendar-check me-2" />Schedule a Free Walkthrough
          </Link>
        </div>
      </section>

      {/* Service items */}
      <section className="section-pad">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">What's Included</p>
              <h2 className="h2 fw-bold text-navy mb-2">Kitchen Remodeling Services</h2>
              <p className="text-muted">Every kitchen project is different. We tailor our approach to your goals and budget.</p>
            </div>
          </div>
          <div className="row g-4">
            {serviceItems.map((item) => (
              <div key={item.title} className="col-md-6 col-lg-4">
                <div className="d-flex gap-3">
                  <div className="service-icon bg-navy bg-opacity-10 flex-shrink-0">
                    <i className={`bi ${item.icon} text-navy fs-5`} />
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

      {/* Process */}
      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">How It Works</p>
            <h2 className="h2 fw-bold text-navy">Our Process</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {process.map((p) => (
              <div key={p.step} className="col-sm-6 col-lg-3 text-center">
                <div className="fw-bold text-accent display-6 mb-2">{p.step}</div>
                <h3 className="h6 fw-bold text-navy mb-1">{p.title}</h3>
                <p className="text-muted small mb-0">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">FAQ</p>
                <h2 className="h2 fw-bold text-navy">Common Questions</h2>
              </div>
              <div className="accordion" id="kitchenFaq">
                {faqs.map((faq, i) => (
                  <div key={i} className="accordion-item border-0 shadow-sm mb-2 rounded">
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button fw-medium rounded${i !== 0 ? ' collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-k-${i}`}
                        aria-expanded={i === 0 ? 'true' : 'false'}
                      >
                        {faq.q}
                      </button>
                    </h3>
                    <div
                      id={`faq-k-${i}`}
                      className={`accordion-collapse collapse${i === 0 ? ' show' : ''}`}
                      data-bs-parent="#kitchenFaq"
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
