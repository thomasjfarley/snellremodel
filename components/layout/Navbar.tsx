'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'

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
      { href: '/services/restore/paint',       label: 'Paint' },
      { href: '/services/restore/drywall',     label: 'Drywall' },
      { href: '/services/restore/water-damage',label: 'Water Damage' },
    ],
  },
]

export default function Navbar() {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const closeMenu = useCallback(() => {
    setMobileServicesOpen(false)
    // Collapse the Bootstrap navbar on mobile
    const nav = document.getElementById('mainNav')
    if (nav?.classList.contains('show')) {
      nav.classList.remove('show')
    }
  }, [])

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

              {/* Services dropdown */}
              <li className="nav-item sr-flyout-root">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-white border-0 bg-transparent p-0 px-lg-2 py-2"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                >
                  Services
                </button>

                {/* Desktop flyout — top-level */}
                <ul className="sr-flyout-menu shadow">
                  {serviceGroups.map((group) => (
                    <li key={group.label} className="sr-flyout-item sr-flyout-item--parent">
                      <span className="sr-flyout-link d-flex align-items-center justify-content-between">
                        {group.label}
                        <i className="bi bi-chevron-right ms-3 small" />
                      </span>
                      {/* Desktop sub-flyout */}
                      <ul className="sr-flyout-menu sr-flyout-menu--sub shadow">
                        {group.items.map((item) => (
                          <li key={item.href} className="sr-flyout-item">
                            <Link href={item.href} className="sr-flyout-link">{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                  <li className="sr-flyout-item">
                    <Link href="/services/demo" className="sr-flyout-link">Demo</Link>
                  </li>
                </ul>

                {/* Mobile accordion */}
                {mobileServicesOpen && (
                  <div className="d-lg-none ps-3 pb-2">
                    {serviceGroups.map((group) => (
                      <div key={group.label} className="mb-1">
                        <p className="text-accent small fw-semibold text-uppercase mb-1" style={{ letterSpacing: '0.08em', fontSize: '0.72rem' }}>
                          {group.label}
                        </p>
                        <div className="ps-2">
                          {group.items.map((item) => (
                            <Link key={item.href} href={item.href} onClick={closeMenu} className="d-block text-white-50 small py-1 text-decoration-none">
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link href="/services/demo" onClick={closeMenu} className="d-block text-white small fw-medium py-1 text-decoration-none mt-1">
                      Demo
                    </Link>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <Link href="/gallery" onClick={closeMenu} className="nav-link text-white">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" onClick={closeMenu} className="nav-link text-white">About</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" onClick={closeMenu} className="nav-link text-white">Contact</Link>
              </li>
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


