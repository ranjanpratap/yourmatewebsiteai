'use client'
import { motion } from 'framer-motion'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#070308]" aria-hidden="true">
      {/* Base Deep Black Layer */}
      <div className="absolute inset-0 bg-[#070308]" />

      {/* Atmospheric Glow - Left (Warm/Orange) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '80vw', height: '80vw',
          top: '10%', left: '-30%',
          background: 'radial-gradient(circle, rgba(255,139,60,0.08) 0%, transparent 70%)',
          filter: 'blur(160px)',
        }}
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Atmospheric Glow - Right (Deep Purple) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '70vw', height: '70vw',
          bottom: '-10%', right: '-20%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          filter: 'blur(180px)',
        }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Center Depth Shadow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(7,3,8,0.8) 100%)'
      }} />

      {/* High-Elegance Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(254,254,254,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(254,254,254,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 90%)',
        maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 90%)',
      }} />

      {/* Top Header Fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#070308] to-transparent z-10" />
    </div>
  )
}

