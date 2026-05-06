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
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10"
    >
      <motion.div
        animate={{ 
          opacity: active === index ? 1 : 0,
          y: active === index ? 0 : 40,
          scale: active === index ? 1 : 0.95,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <p className="eyebrow mb-6 text-orange-400/80">{stage.label}</p>
        <h3 className="font-bold mb-8 text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white drop-shadow-2xl">
          {stage.title}
        </h3>
        <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
          {stage.body}
        </p>
      </motion.div>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState(0)
  const [phoneWidth, setPhoneWidth] = useState(340)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setPhoneWidth(260)
      else if (window.innerWidth < 1024) setPhoneWidth(300)
      else setPhoneWidth(340)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const ActiveScreen = screenMap[FEATURE_STAGES[active].screen]

  return (
    <section id="features" className="relative section-pad overflow-visible">
      <div className="container-pad">
        {/* Intro Header — Standalone above the cinematic flow */}
        <div className="text-center mb-16 lg:mb-32">
          <motion.p 
            className="eyebrow mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ● FEATURES
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl mx-auto leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Built for how you <span className="brand-gradient-text">actually live.</span>
          </motion.h2>
        </div>

        {/* Cinematic Flow Container */}
        <div className="relative">
          {/* Sticky Phone Backdrop — limited to this flow */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <div className="relative transform-gpu">
              {/* Intense Ambient Glow */}
              <div className="absolute inset-0 -m-32 rounded-full opacity-40 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(255,139,60,0.4) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)',
                  filter: 'blur(80px)',
                }} 
              />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: 0.5, 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneFrame width={phoneWidth}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="w-full h-full"
                      initial={{ opacity: 0, filter: 'blur(20px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(20px)' }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    >
                      <ActiveScreen />
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>
              </motion.div>
            </div>
          </div>

          {/* Foreground Scrolling Feature Blocks */}
          <div className="relative -mt-[100vh] z-10">
            <div className="space-y-0">
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
            {/* Bottom space to allow last point to stay centered */}
            <div className="h-[30vh]" />
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[130px] rounded-full pointer-events-none -z-10" />
    </section>
  )
}


