'use client'
import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface PhoneFrameProps {
  children: React.ReactNode
  width?: number
  className?: string
}

export default function PhoneFrame({ children, width = 300, className = '' }: PhoneFrameProps) {
  const height = Math.round(width * (19.5 / 9))

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [8, -8]), { stiffness: 100, damping: 20 })
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const w = document.body.getBoundingClientRect().width
      const h = document.body.getBoundingClientRect().height
      mouseX.set((e.clientX - w / 2) / (w / 2))
      mouseY.set((e.clientY - h / 2) / (h / 2))
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width,
        height,
        rotateY,
        rotateX,
        transformPerspective: 1400,
      }}
    >
      {/* Y-bob on inner wrapper only */}
      <motion.div
        className="relative w-full h-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow behind phone */}
        <div className="absolute -inset-16 -z-10 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(255,139,60,0.18) 0%, rgba(168,85,247,0.18) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }} />

        {/* Drop shadow */}
        <div className="absolute inset-0 rounded-[52px]" style={{
          boxShadow: '0 80px 120px rgba(0,0,0,0.6)',
        }} />

        {/* Outer bezel */}
        <div className="absolute inset-0 rounded-[52px]" style={{
          background: 'linear-gradient(145deg, #2C2C2E, #1C1C1E)',
          border: '1px solid rgba(254,254,254,0.1)',
        }} />

        {/* Inner bezel highlight */}
        <div className="absolute inset-[1px] rounded-[51px]" style={{
          border: '1px solid rgba(254,254,254,0.06)',
        }} />

        {/* Screen Area */}
        <div className="absolute bg-black" style={{
          top: 6, left: 6, right: 6, bottom: 6,
          borderRadius: width * 0.14, // Responsive radius
          overflow: 'hidden',
        }}>
          <div style={{
            width: 360,
            height: (height - 12) / ((width - 12) / 360),
            transform: `scale(${(width - 12) / 360})`,
            transformOrigin: 'top left',
            borderRadius: 'inherit',
          }}>
            {children}
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{
          top: 14,
          width: Math.round(width * 0.3),
          height: 11,
          background: '#000',
          borderRadius: 20,
        }} />

        {/* Status bar overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-3"
          style={{ height: 44, pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(254,254,254,0.8)', fontFamily: 'var(--font-poppins)' }}>9:41</span>
          <div style={{ width: Math.round(width * 0.3) }} />
          <div className="flex items-center gap-1">
            {/* Signal */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="9" width="3" height="3" rx="0.5" fill="rgba(254,254,254,0.8)" />
              <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="rgba(254,254,254,0.8)" />
              <rect x="9" y="3" width="3" height="9" rx="0.5" fill="rgba(254,254,254,0.8)" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="rgba(254,254,254,0.8)" />
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 9.5L10 11.5L8 9.5L6 11.5L8 9.5Z" fill="rgba(254,254,254,0.8)" />
              <path d="M4.5 7C5.7 5.8 7 5.2 8 5.2s2.3.6 3.5 1.8" stroke="rgba(254,254,254,0.8)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M2 4.5C3.8 2.7 5.8 1.8 8 1.8s4.2.9 6 2.7" stroke="rgba(254,254,254,0.8)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="rgba(254,254,254,0.5)" />
              <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="rgba(254,254,254,0.4)" />
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="rgba(254,254,254,0.8)" />
            </svg>
          </div>
        </div>

        {/* Side buttons */}
        {[
          { side: 'right' as const, top: '22%', h: '8%' },
          { side: 'right' as const, top: '33%', h: '13%' },
          { side: 'left' as const, top: '20%', h: '5%' },
          { side: 'left' as const, top: '28%', h: '10%' },
          { side: 'left' as const, top: '40%', h: '10%' },
        ].map((b, i) => (
          <div key={i} className="absolute" style={{
            [b.side]: -3,
            top: b.top,
            width: 3,
            height: b.h,
            background: '#2A2A2C',
            borderRadius: b.side === 'right' ? '0 2px 2px 0' : '2px 0 0 2px',
          }} />
        ))}
      </motion.div>
    </motion.div>
  )
}
