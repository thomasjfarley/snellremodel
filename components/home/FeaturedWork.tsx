import Link from 'next/link'

const projects = [
  { label: 'Interior Painting' },
  { label: 'Kitchen Remodel' },
  { label: 'Cabinet Painting' },
  { label: 'Drywall Finish' },
]

export default function FeaturedWork() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="row align-items-end mb-5">
          <div className="col-lg-6">
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Portfolio</p>
            <h2 className="h2 fw-bold text-navy mb-0">Our Work</h2>
          </div>
          <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
            <Link href="/gallery" className="btn btn-outline-primary">
              View Full Gallery <i className="bi bi-arrow-right ms-1" />
            </Link>
          </div>
        </div>

        <div className="row g-3">
          {projects.map((p, i) => (
            <div key={i} className="col-6 col-lg-3">
              <div className="img-placeholder ratio ratio-4x3 rounded-3 overflow-hidden">
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                  <i className="bi bi-image fs-2 text-muted" />
                  <span className="small text-muted fw-medium">{p.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
