import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Snel Remodeling Services — a licensed and insured contractor with 10+ years of experience in painting, remodeling, and drywall. Serving Salt Lake County, UT.',
}

const values = [
  { icon: 'bi-check-circle',   title: 'Honest Communication',  desc: "We tell you what the job actually needs — no upselling, no surprises on the final bill." },
  { icon: 'bi-award',          title: 'Quality Craftsmanship',  desc: "Every project gets the same level of attention, whether it's a patch repair or a full kitchen renovation." },
  { icon: 'bi-clock',          title: 'Respect for Your Time',  desc: "We show up when we say we will, work efficiently, and keep your home as clean as possible throughout the job." },
  { icon: 'bi-shield-check',   title: 'Licensed & Insured',     desc: "Full licensure and insurance means you are protected and our work is backed up." },
]

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-5">
        <div className="container py-2">
          <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Our Story</p>
          <h1 className="display-5 fw-bold mb-3">About Snel Remodeling Services</h1>
          <p className="text-white-50 fs-5 col-lg-6 mb-0">
            Owner-operated by Travis Snel — a contractor who takes pride in every project, big or small.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">The Contractor</p>
              <h2 className="h2 fw-bold text-navy mb-4">Built on Honest Work</h2>
              <p className="text-muted mb-3">
                Snel Remodeling Services was founded by Travis Snel on a simple idea: do the
                job right and treat people the way you want to be treated. With over 10 years
                of hands-on experience in painting, remodeling, and drywall, Travis has
                worked in hundreds of homes across Salt Lake County and learned something from
                every one of them.
              </p>
              <p className="text-muted mb-3">
                Painting is his specialty and his passion — and it shows in the results.
                Whether it is a single room refresh or a full interior and exterior repaint,
                Travis brings the same level of care and precision to every coat.
              </p>
              <p className="text-muted mb-4">
                As the owner and operator, Travis personally handles every project from
                walkthrough to final inspection. You will always know who is in your home —
                and you can hold that person accountable.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <div className="text-center">
                  <div className="h2 fw-bold text-accent mb-0">10+</div>
                  <div className="small text-muted">Years Experience</div>
                </div>
                <div className="vr mx-2" />
                <div className="text-center">
                  <div className="h2 fw-bold text-accent mb-0">100+</div>
                  <div className="small text-muted">Projects Completed</div>
                </div>
                <div className="vr mx-2" />
                <div className="text-center">
                  <div className="h2 fw-bold text-accent mb-0">5★</div>
                  <div className="small text-muted">Google Rating</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ratio ratio-4x3 rounded-3 overflow-hidden position-relative">
                <Image
                  src="/images/contractor-worker.jpg"
                  alt="Travis Snel — Owner, Snel Remodeling Services"
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  className="object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Why Choose Us</p>
            <h2 className="h2 fw-bold text-navy">What We Stand For</h2>
          </div>
          <div className="row g-4">
            {values.map((v) => (
              <div key={v.title} className="col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 p-1">
                  <div className="card-body p-4 text-center">
                    <div className="service-icon bg-accent bg-opacity-10 mx-auto mb-3">
                      <i className={`bi ${v.icon} text-accent fs-4`} />
                    </div>
                    <h3 className="h6 fw-bold text-navy mb-2">{v.title}</h3>
                    <p className="text-muted small mb-0">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-pad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Credentials</p>
              <h2 className="h2 fw-bold text-navy mb-4">Licensed, Insured & Professional</h2>
              <p className="text-muted mb-5">
                We are fully licensed and insured for all the work we do. That means you are
                protected and can hire with confidence.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {['Licensed Contractor', 'Fully Insured', 'Free Estimates', '5-Star Google Reviews'].map((c) => (
                  <span key={c} className="badge bg-light-warm text-navy border border-2 px-3 py-2 fs-6 fw-medium">
                    <i className="bi bi-check-circle-fill text-accent me-2" />{c}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <Link href="/book" className="btn btn-accent btn-lg px-5">
                  <i className="bi bi-calendar-check me-2" />Book a Free Walkthrough
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  )
}
