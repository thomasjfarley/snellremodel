import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BookingCTA from '@/components/home/BookingCTA'

type BreadcrumbItem = {
  label: string
  href?: string
}

type CategoryCard = {
  href: string
  icon: string
  title: string
  description: string
  items: string[]
}

type ServiceCategoryPageProps = {
  eyebrow: string
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  cards: CategoryCard[]
  serviceSchema: Record<string, unknown>
}

export default function ServiceCategoryPage({
  eyebrow,
  title,
  description,
  breadcrumbs,
  cards,
  serviceSchema,
}: ServiceCategoryPageProps) {
  const lastBreadcrumbIndex = breadcrumbs.length - 1

  return (
    <>
      <JsonLd data={serviceSchema} />

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
          <p className="text-white-50 fs-5 mb-0 col-lg-8">{description}</p>
        </div>
      </section>

      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="row g-4">
            {cards.map((card) => (
              <div key={card.href} className="col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card p-1">
                  <div className="card-body p-4">
                    <div className="service-icon bg-navy bg-opacity-10 mb-4">
                      <i className={`bi ${card.icon} fs-4 text-navy`} />
                    </div>
                    <h2 className="h4 fw-bold text-navy mb-2">{card.title}</h2>
                    <p className="text-muted small mb-4">{card.description}</p>
                    <ul className="list-unstyled mb-4">
                      {card.items.map((item) => (
                        <li key={item} className="d-flex align-items-center gap-2 mb-1 small">
                          <i className="bi bi-check-circle-fill text-accent" style={{ fontSize: '0.75rem' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={card.href} className="btn btn-primary w-100">
                      View Service <i className="bi bi-arrow-right ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  )
}
