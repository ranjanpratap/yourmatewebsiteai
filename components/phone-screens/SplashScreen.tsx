'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: '#0A0410' }} />
  )

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ background: 'linear-gradient(160deg, #0A0410 0%, #1A0826 50%, #0A0410 100%)', paddingTop: 44 }}>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full -z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,139,60,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      <div className="absolute bottom-16 left-0 w-40 h-40 rounded-full -z-0"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      {/* Wordmark */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8 w-28 h-28 rounded-[28%] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border border-white/5"
        >
          <img 
            src="/logo.png" 
            alt="Mate Logo" 
            className="w-full h-full object-cover scale-[1.4]"
          />
        </motion.div>

        <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'var(--font-poppins)', lineHeight: 1 }}>
          <span style={{ color: '#fefefe' }}>Your</span>
          <motion.span
            style={{ background: 'linear-gradient(90deg, #FF8B3C, #EC4899, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            initial={{ backgroundPosition: '100% 0' }}
            animate={{ backgroundPosition: '0% 0' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >Mate</motion.span>
        </div>

        <motion.p
          style={{ fontSize: 13, color: 'rgba(254,254,254,0.55)', marginTop: 14, fontWeight: 400, fontFamily: 'var(--font-poppins)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your daily life partner.
        </motion.p>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-10 flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: 6, height: 6 }}
            animate={{ background: ['rgba(254,254,254,0.25)', '#FF8B3C', 'rgba(254,254,254,0.25)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.67, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}
