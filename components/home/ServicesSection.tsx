import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    href: '/services/remodel',
    img: '/images/kitchen-remodel.jpg',
    title: 'Remodel',
    description:
      'Kitchen, bathroom, basement, bedroom, and flooring updates tailored to your space, budget, and goals.',
    badge: null,
  },
  {
    href: '/services/restore',
    img: '/images/painting-interior.jpg',
    title: 'Restore',
    description:
      'Paint, drywall, and water damage restoration services that refresh and repair interior spaces.',
    badge: 'Popular',
  },
  {
    href: '/services/demo',
    img: '/images/drywall-construction.jpg',
    title: 'Demo',
    description:
      'Selective interior demolition, debris removal, and site prep that gets your remodel started cleanly.',
    badge: null,
  },
]

export default function ServicesSection() {
  return (
    <section className="section-pad bg-light-warm">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">What We Do</p>
            <h2 className="h2 fw-bold text-navy mb-2">Our Services</h2>
            <p className="text-muted">
              From a fresh coat of paint to a full home remodel — we handle it all
              with attention to detail at every step.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {services.map((svc) => (
            <div key={svc.href} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm service-card overflow-hidden">
                {svc.badge && (
                  <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 1 }}>
                    <span className="badge bg-accent text-dark small">{svc.badge}</span>
                  </div>
                )}
                <div className="ratio ratio-16x9">
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-fit-cover"
                  />
                </div>
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold text-navy mb-2">{svc.title}</h3>
                  <p className="text-muted mb-4 small">{svc.description}</p>
                  <Link href={svc.href} className="btn btn-outline-primary btn-sm stretched-link">
                    Learn More <i className="bi bi-arrow-right ms-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
