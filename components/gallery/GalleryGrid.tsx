'use client'

import { useState } from 'react'
import Image from 'next/image'

type Category = 'All' | 'Painting' | 'Remodeling' | 'Drywall'

const categories: Category[] = ['All', 'Painting', 'Remodeling', 'Drywall']

const projects = [
  { title: 'Living Room Interior Paint', category: 'Painting', desc: 'Full interior repaint — walls, trim, and ceiling.', img: '/images/painting-room.jpg' },
  { title: 'Kitchen Cabinet Repaint', category: 'Painting', desc: 'Cabinets refinished in a clean white with new hardware.', img: '/images/kitchen-cabinets.jpg' },
  { title: 'Exterior Repaint', category: 'Painting', desc: 'Full exterior with new accent trim color.', img: '/images/home-exterior.jpg' },
  { title: 'Accent Wall', category: 'Painting', desc: 'Bold navy accent wall in a primary bedroom.', img: '/images/painting-accent-wall.jpg' },
  { title: 'Full Kitchen Remodel', category: 'Remodeling', desc: 'Complete gut renovation with new cabinets and quartz countertops.', img: '/images/kitchen-remodel.jpg' },
  { title: 'Kitchen Update', category: 'Remodeling', desc: 'Cabinet refacing, new countertops, and updated fixtures.', img: '/images/kitchen-modern.jpg' },
  { title: 'Drywall Repair', category: 'Drywall', desc: 'Water damage repair with texture matching.', img: '/images/drywall-ceiling.jpg' },
  { title: 'New Construction Drywall', category: 'Drywall', desc: 'Full install and finish for a room addition.', img: '/images/drywall-construction.jpg' },
  { title: 'Bathroom Cabinet Paint', category: 'Painting', desc: 'Vanity cabinets transformed with a satin finish.', img: '/images/painting-roller.jpg' },
  { title: 'Skim Coat', category: 'Drywall', desc: 'Smooth skim coat over textured walls before painting.', img: '/images/drywall-install.jpg' },
  { title: 'Bathroom Remodel', category: 'Remodeling', desc: 'New tile, vanity, and fixtures — complete bathroom transformation.', img: '/images/bathroom-remodel.jpg' },
  { title: 'Ceiling Repair', category: 'Drywall', desc: 'Crack and texture repair on vaulted ceiling.', img: '/images/drywall-ceiling.jpg' },
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
                <div className="ratio ratio-4x3 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                    className="object-fit-cover"
                  />
                </div>
                <div className="card-body p-3">
                  <span className="badge bg-light-warm text-navy small mb-1">{p.category}</span>
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

