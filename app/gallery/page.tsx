import type { Metadata } from 'next'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import BookingCTA from '@/components/home/BookingCTA'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse before and after photos of our painting, kitchen remodel, and drywall projects. See the quality of Snell Remodel firsthand.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy text-white py-5">
        <div className="container py-2">
          <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Our Portfolio</p>
          <h1 className="display-5 fw-bold mb-3">Project Gallery</h1>
          <p className="text-white-50 fs-5 col-lg-6 mb-0">
            Real projects, real results. Browse our work across painting,
            kitchen remodels, and drywall.
          </p>
        </div>
      </section>
      <GalleryGrid />
      <BookingCTA />
    </>
  )
}
