import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'Remodeling',
  description:
    'Professional remodeling services in Salt Lake County — kitchens, bathrooms, basements, and more. Full gut renovations to targeted upgrades. Free estimates available.',
  keywords: [
    'remodeling contractor',
    'home remodel',
    'kitchen remodel',
    'bathroom remodel',
    'basement remodel',
    'room addition',
    'Salt Lake County contractor',
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Remodeling',
  provider: { '@type': 'LocalBusiness', name: 'Snel Remodeling Services' },
  description: 'Full home remodeling services including kitchens, bathrooms, basements, and custom renovations.',
  serviceType: 'Home Remodeling',
}

const faqs = [
  {
    q: 'What types of remodeling projects do you take on?',
    a: 'Kitchens, bathrooms, basements, living spaces, and more. Whether it is a targeted upgrade or a full gut renovation, we assess each project individually and give you an honest recommendation.',
  },
  {
    q: 'How long does a remodel take?',
    a: 'It depends heavily on scope. A bathroom refresh might take 1–2 weeks. A full kitchen or basement renovation typically takes 4–8 weeks. We give you a realistic timeline upfront — not an optimistic one.',
  },
  {
    q: 'Do I need permits?',
    a: "Structural changes, electrical, and plumbing upgrades typically require permits. We'll advise you on what's needed for your specific project before we start, so there are no surprises.",
  },
  {
    q: 'Can I stay in my home during the remodel?',
    a: "In most cases, yes. We work efficiently, keep the job site clean each day, and communicate clearly so you always know what to expect. For major renovations we'll discuss the best approach during the walkthrough.",
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
  { icon: 'bi-house-door',   title: 'Kitchen Remodels',       desc: 'From cabinet refreshes to full gut renovations — new layouts, countertops, cabinetry, and finishes tailored to how you actually use your space.' },
  { icon: 'bi-droplet',      title: 'Bathroom Remodels',      desc: 'Tile work, vanity replacement, shower and tub surrounds, and complete bathroom overhauls with quality materials that last.' },
  { icon: 'bi-layers',       title: 'Basement Finishing',     desc: 'Turn an unfinished basement into livable, finished space — home office, rec room, guest suite, or whatever fits your lifestyle.' },
  { icon: 'bi-arrows-move',  title: 'Layout Changes',         desc: 'Move walls, open up floor plans, or reconfigure rooms to better match how you live. We handle the structural and finish work.' },
  { icon: 'bi-grid',         title: 'Cabinet Work',           desc: 'Custom and semi-custom cabinet installation, refacing, or painting — kitchens, bathrooms, built-ins, and more.' },
  { icon: 'bi-wrench',       title: 'Targeted Upgrades',      desc: 'Not every project needs to be a full renovation. Countertop replacement, flooring, trim work, or fixture updates can transform a space on a focused budget.' },
]

const process = [
  { step: '01', title: 'Free Walkthrough', desc: 'We visit your space, discuss your vision, and assess what is needed.' },
  { step: '02', title: 'Detailed Estimate', desc: 'You receive a clear, itemized quote with no hidden costs.' },
  { step: '03', title: 'Scheduled Build', desc: 'We agree on a timeline and get to work — keeping you updated throughout.' },
  { step: '04', title: 'Final Walkthrough', desc: 'We review every detail together before calling the job complete.' },
]

export default function RemodelingPage() {
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
              <li className="breadcrumb-item active text-accent" aria-current="page">Remodeling</li>
            </ol>
          </nav>
          <h1 className="display-5 fw-bold mb-3">Remodeling</h1>
          <p className="text-white-50 fs-5 mb-4 col-lg-7">
            Kitchens, bathrooms, basements, and beyond — we handle the full scope of residential
            remodeling with the same care and precision on every project.
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
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">What We Do</p>
              <h2 className="h2 fw-bold text-navy mb-2">Remodeling Services</h2>
              <p className="text-muted">Every project is different. We tailor our approach to your goals, timeline, and budget.</p>
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
              <div className="accordion" id="remodelingFaq">
                {faqs.map((faq, i) => (
                  <div key={i} className="accordion-item border-0 shadow-sm mb-2 rounded">
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button fw-medium rounded${i !== 0 ? ' collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-r-${i}`}
                        aria-expanded={i === 0 ? 'true' : 'false'}
                      >
                        {faq.q}
                      </button>
                    </h3>
                    <div
                      id={`faq-r-${i}`}
                      className={`accordion-collapse collapse${i === 0 ? ' show' : ''}`}
                      data-bs-parent="#remodelingFaq"
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
