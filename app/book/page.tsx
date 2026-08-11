import type { Metadata } from 'next'
import BookingForm from '@/components/booking/BookingForm'

export const metadata: Metadata = {
  title: 'Book a Walkthrough',
  description:
    'Schedule a free walkthrough with Snel Remodeling Services. Pick a time, describe your project, and get a detailed estimate. Serving Salt Lake County, UT.',
}

export default function BookPage() {
  return (
    <>
      <section className="bg-navy text-white py-5">
        <div className="container py-2">
          <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Free, No Obligation</p>
          <h1 className="display-5 fw-bold mb-3">Book a Walkthrough</h1>
          <p className="text-white-50 fs-5 col-lg-6 mb-0">
            Schedule a time for us to visit your space, see the project firsthand,
            and give you a detailed, honest estimate.
          </p>
        </div>
      </section>

      <section className="section-pad bg-light-warm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-lg-5">
                  <BookingForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
