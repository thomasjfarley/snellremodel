import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'Drywall Services',
  description:
    'Professional drywall installation, repair, texture matching, and skim coating. Licensed contractor. Free estimates on all drywall projects.',
  keywords: [
    'drywall repair',
    'drywall installation',
    'drywall contractor',
    'texture matching',
    'skim coat',
    'water damage drywall repair',
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Drywall Services',
  provider: { '@type': 'LocalBusiness', name: 'Snel Remodeling Services' },
  description: 'Professional drywall installation, repair, texture matching, and skim coating.',
  serviceType: 'Drywall',
}

const faqs = [
  {
    q: 'Can you match my existing wall texture?',
    a: "Yes — texture matching is one of our core skills. Whether you have orange peel, knockdown, skip trowel, or another finish, we can blend new drywall work seamlessly into your existing walls.",
  },
  {
    q: 'How long does a drywall repair take?',
    a: 'Small patches (nail holes, small holes) can be done in a few hours. Larger repairs involving multiple sheets or water damage typically take 2–4 days including drying time between coats.',
  },
  {
    q: 'Do you handle water damage repairs?',
    a: "Yes. We assess the damage, ensure the source has been fixed, then replace affected drywall, treat for mold if necessary, and refinish to match your existing walls.",
  },
  {
    q: 'Do I need to paint after drywall work?',
    a: "New or repaired drywall requires painting — the repaired area will be primed but won't match your existing paint color. We offer painting as an add-on so you get a seamless result.",
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
  { icon: 'bi-plus-square',    title: 'New Installation',       desc: 'Full drywall installation for new construction, additions, or room conversions. Properly hung, taped, and finished.' },
  { icon: 'bi-tools',          title: 'Drywall Repair',         desc: 'Holes, cracks, and damaged sections repaired and feathered to blend seamlessly with surrounding walls.' },
  { icon: 'bi-droplet',        title: 'Water Damage Repair',    desc: 'Assess, remove, replace, and finish drywall damaged by leaks or flooding — ready for paint.' },
  { icon: 'bi-grid-3x3-gap',   title: 'Texture Matching',       desc: 'Orange peel, knockdown, skip trowel — we match your existing texture so repairs are invisible.' },
  { icon: 'bi-layers',         title: 'Skim Coating',           desc: 'Smooth out rough or damaged surfaces with a full skim coat for a clean, paint-ready wall.' },
  { icon: 'bi-square',         title: 'Ceiling Work',           desc: 'Drywall, texture, and finishing for ceilings including repairs to popcorn and smooth ceilings.' },
]

export default function DrywallPage() {
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
              <li className="breadcrumb-item active text-accent" aria-current="page">Drywall</li>
            </ol>
          </nav>
          <h1 className="display-5 fw-bold mb-3">Drywall Services</h1>
          <p className="text-white-50 fs-5 mb-4 col-lg-7">
            New installation, repairs, and seamless texture matching. We make sure
            you cannot tell where the old wall ends and our work begins.
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
              <h2 className="h2 fw-bold text-navy mb-2">Drywall Services</h2>
              <p className="text-muted">From hairline cracks to full room installs — we handle drywall work of every size and complexity.</p>
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

      {/* FAQ */}
      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">FAQ</p>
                <h2 className="h2 fw-bold text-navy">Common Questions</h2>
              </div>
              <div className="accordion" id="drywallFaq">
                {faqs.map((faq, i) => (
                  <div key={i} className="accordion-item border-0 shadow-sm mb-2 rounded">
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button fw-medium rounded${i !== 0 ? ' collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-d-${i}`}
                        aria-expanded={i === 0 ? 'true' : 'false'}
                      >
                        {faq.q}
                      </button>
                    </h3>
                    <div
                      id={`faq-d-${i}`}
                      className={`accordion-collapse collapse${i === 0 ? ' show' : ''}`}
                      data-bs-parent="#drywallFaq"
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
