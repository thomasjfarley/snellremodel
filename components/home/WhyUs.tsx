export default function WhyUs() {
  const reasons = [
    {
      icon: 'bi-shield-check',
      title: 'Licensed & Insured',
      body: 'Fully licensed and insured for your peace of mind. Every project is backed by professional accountability.',
    },
    {
      icon: 'bi-brush',
      title: 'Painting Specialists',
      body: 'From interior walls to exterior siding and cabinet painting — we deliver a flawless finish every time.',
    },
    {
      icon: 'bi-house-check',
      title: 'Full-Service Remodeling',
      body: 'Kitchens, bathrooms, basements, and beyond. We manage your remodel start to finish with attention to every detail.',
    },
    {
      icon: 'bi-tools',
      title: 'Drywall & Repair Experts',
      body: 'Precision drywall installation, finishing, and repair — including water damage restoration and texture matching.',
    },
    {
      icon: 'bi-chat-dots',
      title: 'Clear Communication',
      body: 'We keep you informed throughout the project. No surprises, no runaround — just straightforward updates.',
    },
    {
      icon: 'bi-geo-alt',
      title: 'Serving Salt Lake County',
      body: 'Proudly serving homeowners across Salt Lake City, Sandy, Draper, Murray, West Jordan, Riverton, and surrounding Utah communities.',
    },
  ]

  return (
    <section className="section-pad bg-white">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Why Choose Us</p>
            <h2 className="h2 fw-bold text-navy mb-2">Utah&apos;s Trusted Remodeling &amp; Painting Contractor</h2>
            <p className="text-muted">
              Snel Remodeling Services has built a reputation across Salt Lake County for quality work,
              fair pricing, and a crew that treats your home with respect. Whether it&apos;s a fresh coat of
              paint or a complete kitchen remodel, we bring the same craftsmanship to every job.
            </p>
          </div>
        </div>
        <div className="row g-4">
          {reasons.map((r) => (
            <div key={r.title} className="col-md-6 col-lg-4">
              <div className="d-flex gap-3">
                <div className="flex-shrink-0">
                  <div
                    className="rounded-circle bg-accent d-flex align-items-center justify-content-center"
                    style={{ width: 44, height: 44 }}
                  >
                    <i className={`bi ${r.icon} text-dark`} style={{ fontSize: '1.1rem' }} />
                  </div>
                </div>
                <div>
                  <h3 className="h6 fw-bold text-navy mb-1">{r.title}</h3>
                  <p className="text-muted small mb-0">{r.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
