import type { Metadata } from 'next'
import Link from 'next/link'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Explore Snel Remodeling's professional services: expert painting, kitchen remodels, and drywall. Licensed and insured contractor serving Salt Lake County, UT.",
}

const services = [
  {
    href: '/services/painting',
    icon: 'bi-brush',
    title: 'Painting',
    badge: 'Our Specialty',
    description:
      "Interior and exterior painting, cabinet refinishing, color consultation, and more. Our specialty — done right every time.",
    items: [
      'Interior Painting',
      'Exterior Painting',
      'Cabinet Painting',
      'Color Consultation',
      'Trim & Accent Walls',
    ],
  },
  {
    href: '/services/kitchen-remodel',
    icon: 'bi-house-heart',
    title: 'Kitchen Remodels',
    badge: null,
    description:
      "From countertop upgrades to full gut renovations — we transform kitchens into spaces you'll love.",
    items: [
      'Full Kitchen Renovation',
      'Cabinet Installation',
      'Countertop Replacement',
      'Layout Changes',
      'Fixture & Hardware Updates',
    ],
  },
  {
    href: '/services/drywall',
    icon: 'bi-grid-3x3',
    title: 'Drywall',
    badge: null,
    description:
      'Professional drywall installation, repair, and finishing. Seamless results that stand the test of time.',
    items: [
      'Drywall Installation',
      'Crack & Hole Repair',
      'Water Damage Repair',
      'Texture Matching',
      'Skim Coating',
    ],
  },
]

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
                Snel Remodeling handles painting, kitchen remodels, and drywall with the same
                commitment to quality on every project — big or small.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {services.map((svc) => (
              <div key={svc.href} className="col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card p-1">
                  <div className="card-body p-4">
                    {svc.badge && (
                      <span className="badge bg-accent text-dark small mb-3">{svc.badge}</span>
                    )}
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
                      Learn More <i className="bi bi-arrow-right ms-1" />
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
