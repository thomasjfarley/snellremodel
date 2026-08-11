import Link from 'next/link'

const services = [
  {
    href: '/services/painting',
    icon: 'bi-brush',
    title: 'Painting',
    description:
      'Interior and exterior painting done right. From walls to cabinets, we deliver a flawless finish — on time and on budget.',
    badge: 'Our Specialty',
  },
  {
    href: '/services/kitchen-remodel',
    icon: 'bi-house-heart',
    title: 'Kitchen Remodels',
    description:
      'Transform your kitchen with custom cabinetry, updated countertops, and full gut renovations tailored to your vision.',
    badge: null,
  },
  {
    href: '/services/drywall',
    icon: 'bi-grid-3x3',
    title: 'Drywall',
    description:
      'New installation, repairs, and seamless texture matching. Smooth walls that make a difference in every room.',
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
              From a fresh coat of paint to a full kitchen transformation — we handle it all
              with attention to detail at every step.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {services.map((svc) => (
            <div key={svc.href} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm service-card p-1">
                <div className="card-body p-4">
                  {svc.badge && (
                    <span className="badge bg-accent text-dark small mb-3">{svc.badge}</span>
                  )}
                  <div className="service-icon bg-navy bg-opacity-10 mb-4">
                    <i className={`bi ${svc.icon} fs-4 text-navy`} />
                  </div>
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
