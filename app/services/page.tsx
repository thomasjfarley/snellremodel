import type { Metadata } from 'next'
import Link from 'next/link'
import BookingCTA from '@/components/home/BookingCTA'
import { serviceCategories, servicesIndexMetadata } from '@/lib/service-content'

export const metadata: Metadata = servicesIndexMetadata

export default function ServicesPage() {
  return (
    <>
      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">What We Offer</p>
              <h1 className="h1 fw-bold text-navy mb-3">Our Services</h1>
              <p className="text-muted fs-5">
                Explore our Remodel, Restore, and Demo categories to find the right fit for your
                project in Salt Lake County.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {serviceCategories.map((svc) => (
              <div key={svc.href} className="col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card p-1">
                  <div className="card-body p-4">
                    <div className="service-icon bg-navy bg-opacity-10 mb-4">
                      <i className={`bi ${svc.icon} fs-4 text-navy`} />
                    </div>
                    <h2 className="h4 fw-bold text-navy mb-2">{svc.title}</h2>
                    <p className="text-muted small mb-4">{svc.description}</p>
                    <ul className="list-unstyled mb-4">
                      {svc.items.map((item) => (
                        <li key={item} className="d-flex align-items-center gap-2 mb-1 small">
                          <i className="bi bi-check-circle-fill text-accent" style={{ fontSize: '0.75rem' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={svc.href} className="btn btn-primary w-100">
                      View Services <i className="bi bi-arrow-right ms-1" />
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
