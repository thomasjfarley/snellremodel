import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BookingCTA from '@/components/home/BookingCTA'

type BreadcrumbItem = {
  label: string
  href?: string
}

type ServiceItem = {
  icon: string
  title: string
  desc: string
  img?: string
}

type ProcessStep = {
  step: string
  title: string
  desc: string
}

type FaqItem = {
  q: string
  a: string
}

type ServiceDetailPageProps = {
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  sectionTitle: string
  sectionDescription: string
  ctaLabel: string
  serviceItems: ServiceItem[]
  process: ProcessStep[]
  faqs: FaqItem[]
  accordionId: string
  serviceSchema: Record<string, unknown>
  faqSchema: Record<string, unknown>
}

export default function ServiceDetailPage({
  title,
  description,
  breadcrumbs,
  eyebrow,
  sectionTitle,
  sectionDescription,
  ctaLabel,
  serviceItems,
  process,
  faqs,
  accordionId,
  serviceSchema,
  faqSchema,
}: ServiceDetailPageProps) {
  const lastBreadcrumbIndex = breadcrumbs.length - 1

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <section className="bg-navy text-white py-5">
        <div className="container py-2">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              {breadcrumbs.map((item, index) => (
                <li
                  key={`${item.label}-${index}`}
                  className={`breadcrumb-item${index === lastBreadcrumbIndex ? ' active text-accent' : ''}`}
                  aria-current={index === lastBreadcrumbIndex ? 'page' : undefined}
                >
                  {item.href ? (
                    <Link href={item.href} className="text-white-50 text-decoration-none">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <span className="badge bg-accent text-dark fw-semibold ls-1 mb-3" style={{ fontSize: '0.72rem' }}>
            {eyebrow}
          </span>
          <h1 className="display-5 fw-bold mb-3">{title}</h1>
          <p className="text-white-50 fs-5 mb-4 col-lg-7">{description}</p>
          <Link href="/book" className="btn btn-accent btn-lg px-4">
            <i className="bi bi-calendar-check me-2" />
            {ctaLabel}
          </Link>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">What&apos;s Included</p>
              <h2 className="h2 fw-bold text-navy mb-2">{sectionTitle}</h2>
              <p className="text-muted">{sectionDescription}</p>
            </div>
          </div>
          <div className="row g-4">
            {serviceItems.map((item) => (
              <div key={item.title} className="col-md-6 col-lg-4">
                <div className="d-flex gap-3">
                  <div className="service-icon bg-navy bg-opacity-10 flex-shrink-0" style={{ overflow: 'hidden' }}>
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={52}
                        height={52}
                        style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 10 }}
                      />
                    ) : (
                      <i className={`bi ${item.icon} text-navy fs-5`} />
                    )}
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

      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">How It Works</p>
            <h2 className="h2 fw-bold text-navy">Our Process</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {process.map((item) => (
              <div key={item.step} className="col-sm-6 col-lg-3 text-center">
                <div className="fw-bold text-accent display-6 mb-2">{item.step}</div>
                <h3 className="h6 fw-bold text-navy mb-1">{item.title}</h3>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">FAQ</p>
                <h2 className="h2 fw-bold text-navy">Common Questions</h2>
              </div>
              <div className="accordion" id={accordionId}>
                {faqs.map((faq, index) => (
                  <div key={faq.q} className="accordion-item border-0 shadow-sm mb-2 rounded">
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button fw-medium rounded${index !== 0 ? ' collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${accordionId}-${index}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                      >
                        {faq.q}
                      </button>
                    </h3>
                    <div
                      id={`${accordionId}-${index}`}
                      className={`accordion-collapse collapse${index === 0 ? ' show' : ''}`}
                      data-bs-parent={`#${accordionId}`}
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
