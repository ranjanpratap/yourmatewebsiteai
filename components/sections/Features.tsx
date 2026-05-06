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
      className="min-h-[60vh] flex flex-col justify-center py-20 lg:py-32"
    >
      <motion.div
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
        <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-md">
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
    <section id="features" className="relative section-pad overflow-visible pb-32 lg:pb-48">
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          
          {/* Sticky Phone Container - phone sticks in center while text scrolls */}
          <div className="sticky top-0 h-screen z-30 self-start w-full lg:w-auto flex items-center justify-center">
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 -m-8 md:-m-12 rounded-full opacity-50"
                style={{
                  background: 'radial-gradient(circle, rgba(255,139,60,0.3) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)',
                  filter: 'blur(50px)',
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

              {/* Progress dots - only on desktop to avoid overflow */}
              <div className="absolute -left-10 lg:-left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
                <div className="glass p-2 rounded-full flex flex-col gap-2 bg-white/5 backdrop-blur-md">
                  {FEATURE_STAGES.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        i === active ? 'bg-orange-400 scale-150 shadow-[0_0_10px_rgba(251,146,60,0.5)]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="flex-1 w-full">
            {FEATURE_STAGES.map((stage, i) => (
              <FeatureBlock 
                key={stage.id}
                stage={stage}
                index={i}
                active={active}
                onInView={setActive}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient background for the section */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  )
}


