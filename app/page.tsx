import dynamic from 'next/dynamic'
import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import WhyMate from '@/components/sections/WhyMate'
import Features from '@/components/sections/Features'
import Prototype from '@/components/sections/Prototype'
import LifeChange from '@/components/sections/LifeChange'

// Lazy-load below-fold sections — reduces initial JS bundle
const ReelsSection = dynamic(() => import('@/components/sections/ReelsSection'), {
  loading: () => <div style={{ height: 600 }} />,
})
const Founder = dynamic(() => import('@/components/sections/Founder'), {
  loading: () => <div style={{ height: 600 }} />,
})
const Waitlist = dynamic(() => import('@/components/sections/Waitlist'), {
  loading: () => <div style={{ height: 400 }} />,
})
const Footer = dynamic(() => import('@/components/sections/Footer'))

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
