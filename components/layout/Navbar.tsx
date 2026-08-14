'use client'

import Link from 'next/link'
import { useState } from 'react'

const serviceGroups = [
  {
    label: 'Remodel',
    items: [
      { href: '/services/remodel/kitchen',  label: 'Kitchen' },
      { href: '/services/remodel/bathroom', label: 'Bathroom' },
      { href: '/services/remodel/basement', label: 'Basement' },
      { href: '/services/remodel/bedroom',  label: 'Bedroom' },
      { href: '/services/remodel/flooring', label: 'Flooring' },
    ],
  },
  {
    label: 'Restore',
    items: [
      { href: '/services/restore/paint',        label: 'Paint' },
      { href: '/services/restore/drywall',       label: 'Drywall' },
      { href: '/services/restore/water-damage',  label: 'Water Damage' },
    ],
  },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-navy navbar-dark sticky-top shadow-sm">
        <div className="container">
          <Link href="/" className="navbar-brand text-white">
            Snel <span className="text-accent">Remodeling Services</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">

              <li className="nav-item">
                <Link href="/" className="nav-link text-white">Home</Link>
              </li>

              {/* Services mega-menu */}
              <li className="nav-item sr-mega-wrap">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-white border-0 bg-transparent p-0 px-lg-2 py-2"
                  aria-expanded="false"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                </button>

                {/* Desktop mega menu */}
                <div className="sr-mega-menu shadow">
                  <div className="sr-mega-inner">
                    {serviceGroups.map((group) => (
                      <div key={group.label} className="sr-mega-col">
                        <p className="sr-mega-heading">{group.label}</p>
                        <ul className="list-unstyled mb-0">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href} className="sr-mega-link">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="sr-mega-col sr-mega-col--solo">
                      <Link href="/services/demo" className="sr-mega-link fw-semibold">
                        <i className="bi bi-hammer me-2" />Demo
                      </Link>
                      <Link href="/services" className="sr-mega-link text-accent mt-2">
                        <i className="bi bi-grid me-2" />All Services
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile accordion */}
                {mobileServicesOpen && (
                  <div className="d-lg-none ps-3 pb-2">
                    {serviceGroups.map((group) => (
                      <div key={group.label} className="mb-2">
                        <p className="text-accent small fw-semibold text-uppercase mb-1" style={{ letterSpacing: '0.08em' }}>
                          {group.label}
                        </p>
                        {group.items.map((item) => (
                          <Link key={item.href} href={item.href} className="d-block text-white-50 small py-1 text-decoration-none">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <div className="mt-2">
                      <Link href="/services/demo" className="d-block text-white small py-1 text-decoration-none fw-semibold">
                        Demo
                      </Link>
                      <Link href="/services" className="d-block text-accent small py-1 text-decoration-none">
                        All Services
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              {navLinks.slice(1).map((link) => (
                <li key={link.href} className="nav-item">
                  <Link href={link.href} className="nav-link text-white">{link.label}</Link>
                </li>
              ))}
            </ul>

            <Link href="/book" className="btn btn-accent ms-lg-3 mt-3 mt-lg-0 px-4">
              Book a Walkthrough
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

