'use client'

import { useEffect, useState } from 'react'

interface Review {
  author: string
  rating: number
  text: string
  time: string
}

const fallbackReviews: Review[] = [
  {
    author: 'Sarah M.',
    rating: 5,
    text: "Snel Remodeling did an incredible job painting our entire home interior. The attention to detail was outstanding — clean lines, no drips, and they left everything spotless. Highly recommend.",
    time: '2 months ago',
  },
  {
    author: 'James R.',
    rating: 5,
    text: "We hired Snel Remodeling to remodel our kitchen and couldn't be happier. Everything from the cabinets to the finishing work was done with real craftsmanship. Worth every penny.",
    time: '3 months ago',
  },
  {
    author: 'Linda K.',
    rating: 5,
    text: "Had them do drywall repair and paint after a water leak. Couldn't even tell there was damage when they finished. Professional, on time, and great communication throughout.",
    time: '1 month ago',
  },
]

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews)

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data: { reviews?: Review[] }) => {
        if (data?.reviews?.length) setReviews(data.reviews)
      })
      .catch(() => {/* keep fallback */})
  }, [])

  return (
    <section className="section-pad bg-light-warm">
      <div className="container">
        <div className="text-center mb-5">
          <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Testimonials</p>
          <h2 className="h2 fw-bold text-navy">What Our Customers Say</h2>
          <div className="stars mb-1 fs-5">{'★'.repeat(5)}</div>
          <p className="text-muted small">5-Star Rated on Google</p>
        </div>

        <div
          id="reviewsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5500"
        >
          <div className="carousel-inner pb-5">
            {reviews.map((review, i) => (
              <div key={i} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-9">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body text-center py-5 px-4 px-lg-5">
                        <div className="stars mb-3 fs-5">{'★'.repeat(review.rating)}</div>
                        <blockquote className="mb-4 fs-5 text-muted fst-italic lh-lg">
                          &ldquo;{review.text}&rdquo;
                        </blockquote>
                        <p className="fw-semibold text-navy mb-1">{review.author}</p>
                        <p className="text-muted small mb-0">{review.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-indicators" style={{ bottom: 0 }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#reviewsCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? 'active' : ''}
                style={{ backgroundColor: i === 0 ? 'var(--sr-gold)' : '#adb5bd' }}
                aria-current={i === 0 ? 'true' : undefined}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
