'use client'

import { useState } from 'react'

type Category = 'All' | 'Painting' | 'Kitchen' | 'Drywall'

const categories: Category[] = ['All', 'Painting', 'Kitchen', 'Drywall']

const projects = [
  { title: 'Living Room Interior Paint', category: 'Painting', desc: 'Full interior repaint — walls, trim, and ceiling.' },
  { title: 'Kitchen Cabinet Repaint', category: 'Painting', desc: 'Cabinets refinished in a clean white with new hardware.' },
  { title: 'Exterior Repaint', category: 'Painting', desc: 'Full exterior with new accent trim color.' },
  { title: 'Accent Wall', category: 'Painting', desc: 'Bold navy accent wall in a primary bedroom.' },
  { title: 'Full Kitchen Remodel', category: 'Kitchen', desc: 'Complete gut renovation with new cabinets and quartz countertops.' },
  { title: 'Kitchen Update', category: 'Kitchen', desc: 'Cabinet refacing, new countertops, and updated fixtures.' },
  { title: 'Drywall Repair', category: 'Drywall', desc: 'Water damage repair with texture matching.' },
  { title: 'New Construction Drywall', category: 'Drywall', desc: 'Full install and finish for a room addition.' },
  { title: 'Bathroom Cabinet Paint', category: 'Painting', desc: 'Vanity cabinets transformed with a satin finish.' },
  { title: 'Skim Coat', category: 'Drywall', desc: 'Smooth skim coat over textured walls before painting.' },
  { title: 'Kitchen Island', category: 'Kitchen', desc: 'Custom island addition with matching cabinetry.' },
  { title: 'Ceiling Repair', category: 'Drywall', desc: 'Crack and texture repair on vaulted ceiling.' },
]

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section className="section-pad">
      <div className="container">
        {/* Filter tabs */}
        <div className="d-flex flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`btn btn-sm px-4 ${
                active === cat ? 'btn-primary' : 'btn-outline-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="row g-4">
          {filtered.map((p, i) => (
            <div key={i} className="col-sm-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 overflow-hidden service-card">
                {/* Placeholder image area */}
                <div className="img-placeholder ratio ratio-4x3">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <i className="bi bi-image fs-1" />
                    <span className="badge bg-primary small">{p.category}</span>
                  </div>
                </div>
                <div className="card-body p-3">
                  <h3 className="h6 fw-bold text-navy mb-1">{p.title}</h3>
                  <p className="text-muted small mb-0">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-center py-5">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}
