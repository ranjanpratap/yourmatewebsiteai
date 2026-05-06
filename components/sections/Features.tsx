'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PhoneFrame from '@/components/ui/PhoneFrame'
import HomeScreen from '@/components/phone-screens/HomeScreen'
import ChatScreen from '@/components/phone-screens/ChatScreen'
import MealReviewScreen from '@/components/phone-screens/MealReviewScreen'
import StatsScreen from '@/components/phone-screens/StatsScreen'
import { FEATURE_STAGES } from '@/lib/constants'
import { easing } from '@/lib/animations'

const screenMap: Record<string, React.ComponentType> = {
  chat: ChatScreen,
  meal: MealReviewScreen,
  home: HomeScreen,
  stats: StatsScreen,
  workout: HomeScreen,
}

interface FeatureBlockProps {
  stage: typeof FEATURE_STAGES[0]
  index: number
  active: number
  onInView: (index: number) => void
}

function FeatureBlock({ stage, index, active, onInView }: FeatureBlockProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: '-45% 0px -45% 0px',
  })

  useEffect(() => {
    if (isInView) {
      onInView(index)
    }
  }, [isInView, index, onInView])

  return (
    <div
      ref={ref}
      className="min-h-[80vh] lg:min-h-[60vh] flex flex-col justify-center py-16 lg:py-32"
    >
      <motion.div
        className="text-center lg:text-left max-w-md mx-auto lg:mx-auto lg:ml-12 xl:ml-20"
        animate={{ 
          opacity: active === index ? 1 : 0.3,
          x: active === index ? 0 : -20
        }}
        transition={{ duration: 0.5, ease: easing }}
      >
        <p className="eyebrow mb-4">{stage.label}</p>
        <h3 className="font-bold mb-6 text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
          {stage.title}
        </h3>
        <p className="text-lg md:text-xl text-white/60 leading-relaxed">
          {stage.body}
        </p>
      </motion.div>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState(0)
  const [phoneWidth, setPhoneWidth] = useState(320)

  // Handle phone sizing for different screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setPhoneWidth(240)
      else if (window.innerWidth < 1024) setPhoneWidth(280)
      else setPhoneWidth(320)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const ActiveScreen = screenMap[FEATURE_STAGES[active].screen]

  return (
    <section id="features" className="relative section-pad overflow-x-clip pb-32 lg:pb-48">
      <div className="container-pad">
        <div className="text-center mb-12 lg:mb-24">
          <motion.p 
            className="eyebrow mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ● FEATURES
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
          >
            Built for how you <span className="brand-gradient-text">actually live.</span>
          </motion.h2>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* Left: Sticky Phone Container */}
          <div className="absolute inset-0 w-full lg:relative lg:w-5/12 pointer-events-none lg:pointer-events-auto z-0 lg:z-auto">
            <div className="sticky top-0 lg:h-screen h-[100dvh] flex items-center justify-center lg:py-0 opacity-50 lg:opacity-100">
              <div className="relative group">
                {/* Glow background */}
                <div className="absolute inset-0 -m-12 lg:-m-20 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,139,60,0.4) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: -1,
                  }} 
                />
                
                <PhoneFrame width={phoneWidth}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="w-full h-full"
                      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5, ease: easing }}
                    >
                      <ActiveScreen />
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>

                {/* Progress dots - pinned to the left of the phone */}
                <div className="absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-auto">
                  <div className="glass p-2.5 rounded-full flex flex-col gap-3 bg-white/5 backdrop-blur-xl border border-white/10">
                    {FEATURE_STAGES.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => {
                          const element = document.getElementById(`feature-${i}`)
                          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          i === active ? 'bg-orange-400 scale-150 shadow-[0_0_15px_rgba(251,146,60,0.6)]' : 'bg-white/20'
                        }`}
                        whileHover={{ scale: 1.3, backgroundColor: 'rgba(255,255,255,0.4)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Scrolling Content */}
          <div className="w-full lg:w-7/12 relative z-10 pointer-events-auto">
            {FEATURE_STAGES.map((stage, i) => (
              <div key={stage.id} id={`feature-${i}`}>
                <FeatureBlock 
                  stage={stage}
                  index={i}
                  active={active}
                  onInView={setActive}
                />
              </div>
            ))}
            {/* Bottom spacer to allow the last text to stay in view while phone is pinned */}
            <div className="h-[20vh] lg:h-[30vh]" />
          </div>
        </div>
      </div>

      {/* Decorative gradient background for the section */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  )
}


