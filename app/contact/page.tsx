import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Snel Remodeling Services. Request a free estimate, ask a question, or schedule a walkthrough. Serving Salt Lake County, UT.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-5">
        <div className="container py-2">
          <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Get in Touch</p>
          <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
          <p className="text-white-50 fs-5 col-lg-6 mb-0">
            Questions, estimates, or just want to talk through a project?
            We respond promptly.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row g-5">
            {/* Contact info */}
            <div className="col-lg-4">
              <h2 className="h4 fw-bold text-navy mb-4">Contact Information</h2>
              <ul className="list-unstyled">
                <li className="mb-4">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="service-icon bg-accent bg-opacity-10 flex-shrink-0">
                      <i className="bi bi-telephone-fill text-accent fs-5" />
                    </div>
                    <div>
                      <p className="fw-semibold text-navy mb-0 small text-uppercase ls-1">Phone</p>
                      <a
                        href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                        className="text-muted text-decoration-none"
                      >
                        {process.env.NEXT_PUBLIC_PHONE ?? '(425) 524-1379'}
                      </a>
                    </div>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="service-icon bg-accent bg-opacity-10 flex-shrink-0">
                      <i className="bi bi-envelope-fill text-accent fs-5" />
                    </div>
                    <div>
                      <p className="fw-semibold text-navy mb-0 small text-uppercase ls-1">Email</p>
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                        className="text-muted text-decoration-none"
                      >
                        {process.env.NEXT_PUBLIC_EMAIL ?? 'snelremodeling@gmail.com'}
                      </a>
                    </div>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="service-icon bg-accent bg-opacity-10 flex-shrink-0">
                      <i className="bi bi-geo-alt-fill text-accent fs-5" />
                    </div>
                    <div>
                      <p className="fw-semibold text-navy mb-0 small text-uppercase ls-1">Service Area</p>
                      <p className="text-muted mb-0">
                        {process.env.NEXT_PUBLIC_SERVICE_AREA ?? 'Salt Lake County, UT'}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="card border-0 bg-light-warm p-4 mt-4">
                <p className="fw-bold text-navy mb-1 small">Prefer to book directly?</p>
                <p className="text-muted small mb-3">
                  Use our online scheduler to pick a time that works for a free walkthrough.
                </p>
                <a href="/book" className="btn btn-accent btn-sm">
                  Book a Walkthrough
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-8">
              <h2 className="h4 fw-bold text-navy mb-4">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
