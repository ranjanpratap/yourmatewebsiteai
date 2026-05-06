'use client'
import { motion } from 'framer-motion'

export default function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          top: '-200px', right: '-100px',
          background: 'radial-gradient(circle, rgba(255,139,60,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          bottom: '-200px', left: '-100px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'linear', delay: 5 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400, height: 400,
          top: '40%', left: '40%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear', delay: 10 }}
      />
    </div>
  )
}
