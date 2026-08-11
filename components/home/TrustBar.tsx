const items = [
  { icon: 'bi-shield-check',   label: 'Licensed & Insured' },
  { icon: 'bi-tag',            label: 'Free Estimates' },
  { icon: 'bi-award',          label: '10+ Years Experience' },
  { icon: 'bi-emoji-smile',    label: '100+ Happy Clients' },
  { icon: 'bi-calendar-check', label: 'On-Time Completion' },
]

export default function TrustBar() {
  return (
    <section className="py-4 border-bottom border-top bg-white">
      <div className="container">
        <div className="row justify-content-center g-3">
          {items.map((item) => (
            <div key={item.label} className="col-auto">
              <div className="d-flex align-items-center gap-2 px-2">
                <i className={`bi ${item.icon} text-accent fs-5`} />
                <span className="fw-medium text-navy small">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
