import PageBanner from '@/components/home/PageBanner'
import TrustBar from '@/components/home/TrustBar'
import ServicesSection from '@/components/home/ServicesSection'
import WhyUs from '@/components/home/WhyUs'
import FeaturedWork from '@/components/home/FeaturedWork'
import ReviewsCarousel from '@/components/home/ReviewsCarousel'
import BookingCTA from '@/components/home/BookingCTA'

export default function HomePage() {
  return (
    <>
      <PageBanner />
      <TrustBar />
      <ServicesSection />
      <WhyUs />
      <FeaturedWork />
      <ReviewsCarousel />
      <BookingCTA />
    </>
  )
}
