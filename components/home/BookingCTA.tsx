import Link from 'next/link'

export default function BookingCTA() {
  return (
    <section className="section-pad bg-navy text-white">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-8">
            <h2 className="h2 fw-bold mb-2">Ready to Get Started?</h2>
            <p className="text-white-50 fs-5 mb-0 pe-lg-4">
              Schedule a free walkthrough and get a detailed estimate for your project.
              No obligation — just honest advice from an experienced contractor.
            </p>
          </div>
          <div className="col-lg-4 d-flex flex-wrap gap-3 justify-content-lg-end">
            <Link href="/book" className="btn btn-accent btn-lg px-4">
              <i className="bi bi-calendar-check me-2" />
              Book a Walkthrough
            </Link>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
              className="btn btn-outline-light btn-lg px-4"
            >
              <i className="bi bi-telephone me-2" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
