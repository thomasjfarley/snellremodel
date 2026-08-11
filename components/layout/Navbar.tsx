import Link from 'next/link'

type NavChild = { href: string; label: string }
type NavItem = { href?: string; label: string; children?: NavChild[] }

const navLinks: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    label: 'Services',
    children: [
      { href: '/services/painting', label: 'Painting' },
      { href: '/services/kitchen-remodel', label: 'Kitchen Remodels' },
      { href: '/services/drywall', label: 'Drywall' },
      { href: '/services', label: 'All Services' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-navy navbar-dark sticky-top shadow-sm">
        <div className="container">
          <Link href="/" className="navbar-brand text-white">
            Snel <span className="text-accent">Remodeling</span>
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
              {navLinks.map((link) =>
                link.children ? (
                  <li key={link.label} className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle btn btn-link text-white border-0 bg-transparent p-0 px-lg-2 py-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {link.label}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark border-0 shadow">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="dropdown-item">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={link.href} className="nav-item">
                    <Link href={link.href!} className="nav-link text-white">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
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
