import Link from 'next/link'

export default function PageBanner() {
  return (
    <section className="bg-navy py-5">
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-7">
            <span
              className="badge bg-accent text-dark fw-semibold ls-1 mb-3"
              style={{ fontSize: '0.72rem' }}
            >
              LICENSED &amp; INSURED CONTRACTOR
            </span>
            <h1 className="display-5 fw-bold text-white mb-3 lh-sm">
              Quality Craftsmanship<br />You Can Trust
            </h1>
            <p className="text-white-50 fs-5 mb-4 pe-lg-4">
              Expert painting, kitchen remodels, and drywall services delivered
              with precision and pride. Serving homeowners who expect the best.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link href="/book" className="btn btn-accent btn-lg px-4">
                <i className="bi bi-calendar-check me-2" />
                Book a Free Walkthrough
              </Link>
              <Link href="/gallery" className="btn btn-outline-light btn-lg px-4">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
