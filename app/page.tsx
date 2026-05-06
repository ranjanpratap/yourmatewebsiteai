import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import WhyMate from '@/components/sections/WhyMate'
import Features from '@/components/sections/Features'
import Prototype from '@/components/sections/Prototype'
import LifeChange from '@/components/sections/LifeChange'
import ReelsSection from '@/components/sections/ReelsSection'
import Founder from '@/components/sections/Founder'
import Waitlist from '@/components/sections/Waitlist'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <WhyMate />
      <Features />
      <Prototype />
      <LifeChange />
      <ReelsSection />
      <Founder />
      <Waitlist />
      <Footer />
    </main>
  )
}
