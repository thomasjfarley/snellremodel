import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4">
            <h2 className="h5 fw-bold mb-3">
              Snel <span className="text-accent">Remodeling Services</span>
            </h2>
            <p className="text-white-50 small mb-3">
              Quality remodeling, restoration, and demolition services.
              Licensed, insured, and dedicated to exceptional craftsmanship.
            </p>
            <p className="text-white-50 small mb-1">
              <i className="bi bi-shield-check text-accent me-2" />
              Licensed &amp; Insured
            </p>
            <p className="text-white-50 small">
              <i className="bi bi-star-fill text-accent me-2" />
              5-Star Rated on Google
            </p>
          </div>

          {/* Services */}
          <div className="col-6 col-lg-2">
            <h3 className="h6 fw-semibold text-uppercase ls-1 text-white-50 mb-3">Services</h3>
            <ul className="list-unstyled mb-0 small">
              <li className="mb-2"><Link href="/services/remodel">Remodel</Link></li>
              <li className="mb-2"><Link href="/services/restore">Restore</Link></li>
              <li className="mb-2"><Link href="/services/demo">Demo</Link></li>
              <li><Link href="/services">All Services</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-lg-2">
            <h3 className="h6 fw-semibold text-uppercase ls-1 text-white-50 mb-3">Company</h3>
            <ul className="list-unstyled mb-0 small">
              <li className="mb-2"><Link href="/about">About</Link></li>
              <li className="mb-2"><Link href="/gallery">Gallery</Link></li>
              <li className="mb-2"><Link href="/contact">Contact</Link></li>
              <li><Link href="/book">Book a Walkthrough</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4">
            <h3 className="h6 fw-semibold text-uppercase ls-1 text-white-50 mb-3">Get in Touch</h3>
            <ul className="list-unstyled mb-0 small">
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-accent" />
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>
                  {process.env.NEXT_PUBLIC_PHONE ?? '(425) 524-1379'}
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-accent" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                  {process.env.NEXT_PUBLIC_EMAIL ?? 'snelremodeling@gmail.com'}
                </a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt-fill text-accent mt-1" />
                <span className="text-white-50">
                  Serving {process.env.NEXT_PUBLIC_SERVICE_AREA ?? 'Salt Lake County, UT'}
                </span>
              </li>
            </ul>
            <Link href="/book" className="btn btn-accent btn-sm mt-4">
              Book a Free Walkthrough
            </Link>
          </div>
        </div>

        <hr className="border-secondary mt-4 mb-3" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center text-white-50 small">
          <p className="mb-1 mb-sm-0">
            &copy; {new Date().getFullYear()} Snel Remodeling Services. All rights reserved.
          </p>
          <p className="mb-0">Licensed &amp; Insured Contractor</p>
        </div>
      </div>
    </footer>
  )
}
