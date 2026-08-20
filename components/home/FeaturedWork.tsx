import Link from 'next/link'
import Image from 'next/image'

const projects = [
  { label: 'Painting', badge: 'Popular', img: '/images/painting-interior.jpg' },
  { label: 'Remodeling',        badge: null,     img: '/images/garage-remodel-sandy-after.jpg' },
  { label: 'Cabinet Painting',  badge: null,     img: '/images/cabinet-painting-south-jordan-after.jpg' },
  { label: 'Drywall Finish',    badge: null,     img: '/images/water-damage-repair-draper-final.jpg' },
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
              <div className="ratio ratio-4x3 rounded-3 overflow-hidden position-relative">
                <Image
                  src={p.img}
                  alt={p.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-fit-cover"
                />
                <div
                  style={{ position: 'absolute', top: 8, left: 8, zIndex: 2, width: 'auto', height: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span
                    className="text-white small fw-medium rounded px-2 py-1"
                    style={{ background: 'rgba(26,46,68,0.65)' }}
                  >
                    {p.label}
                  </span>
                  {p.badge && (
                    <span className="badge bg-accent text-dark" style={{ fontSize: '0.65rem' }}>{p.badge}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
