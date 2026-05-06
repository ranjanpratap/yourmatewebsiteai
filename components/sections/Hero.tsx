'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import PhoneFrame from '@/components/ui/PhoneFrame'
import HeroBackground from '@/components/ui/HeroBackground'
import SplashScreen from '@/components/phone-screens/SplashScreen'
import WelcomeScreen from '@/components/phone-screens/WelcomeScreen'
import OnboardingScreen from '@/components/phone-screens/OnboardingScreen'
import HomeScreen from '@/components/phone-screens/HomeScreen'
import ChatScreen from '@/components/phone-screens/ChatScreen'
import MealReviewScreen from '@/components/phone-screens/MealReviewScreen'
import StatsScreen from '@/components/phone-screens/StatsScreen'

const SCREENS = [
  SplashScreen,
  WelcomeScreen,
  OnboardingScreen,
  HomeScreen,
  ChatScreen,
  MealReviewScreen,
  StatsScreen,
] as const

export default function Hero() {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReduced = useReducedMotion()

  const startCycle = () => {
    intervalRef.current = setInterval(
      () => setIndex(i => (i + 1) % SCREENS.length),
      4000,
    )
  }
  const stopCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startCycle()
    return stopCycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CurrentScreen = SCREENS[index]

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden section-pad"
    >
      <HeroBackground />

      <div className="container-pad relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14 lg:gap-8">

          {/* ── LEFT: TEXT CONTENT ── */}
          <div className="w-full flex flex-col items-center text-center lg:items-start lg:text-left max-w-[640px] mx-auto lg:mx-0">

            {/* Eyebrow Pill */}
            <motion.div
              className="glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 md:mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-orange-500"
                animate={prefersReduced ? {} : { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="eyebrow !text-white/80 !mb-0">App Launching Soon</span>
            </motion.div>

            {/* Main Heading Group */}
            <div className="flex flex-col gap-3 mb-6 md:mb-8">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Meet Your <span className="brand-gradient-text">Mate.</span>
              </motion.h1>
              
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/30 tracking-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Your daily life partner.
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mb-8 md:mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              An AI that remembers your goals, tracks your life, and shows up when
              it matters — a mate who notices when you skip the gym and celebrates
              when you eat better.
            </motion.p>

            {/* Buttons Row */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-10 md:mb-16 w-full sm:w-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href="#waitlist"
                className="px-8 py-4 text-bg-base font-bold rounded-full shadow-lg hover:shadow-white/10 transition-all flex items-center justify-center gap-2"
                style={{ background: '#fefefe', minHeight: 52 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-orange-500">✨</span> Join Waitlist ↗
              </motion.a>

              <motion.a
                href="#demo"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                style={{ color: '#fefefe', minHeight: 52 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-orange-500">▸</span> Watch Demo
              </motion.a>
            </motion.div>

            {/* Bottom Value Row */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 md:gap-x-8 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {['PRIVATE BY DEFAULT', 'MEMORY THAT MATTERS', 'CONTEXT OVER COMMANDS'].map((item, i) => (
                <div key={item} className="flex items-center gap-8">
                  <span className="eyebrow !text-white/20 !mb-0">{item}</span>
                  {i < 2 && <div className="w-1 h-1 rounded-full bg-white/10" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: PHONE MOCKUP ── */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 0 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              onMouseEnter={stopCycle}
              onMouseLeave={startCycle}
              className="relative max-w-[270px] sm:max-w-[300px] md:max-w-none w-full"
            >
              {/* Outer Glow behind phone */}
              <div className="absolute inset-0 -m-20 bg-purple-500/10 blur-[100px] rounded-full" />
              
              <PhoneFrame width={320}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    className="w-full h-full"
                    initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <CurrentScreen />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

