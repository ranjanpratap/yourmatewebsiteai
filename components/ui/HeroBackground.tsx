'use client'
import { useReducedMotion } from 'framer-motion'

export default function HeroBackground() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#070308]" aria-hidden="true">
      <div className="absolute inset-0 bg-[#070308]" />

      {/* Atmospheric Glow - Left (Orange) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '70vw', height: '70vw',
          top: '10%', left: '-25%',
          background: 'radial-gradient(circle, rgba(255,139,60,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: prefersReduced ? 'none' : 'heroGlowL 15s ease-in-out infinite',
        }}
      />

      {/* Atmospheric Glow - Right (Purple) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '60vw', height: '60vw',
          bottom: '-10%', right: '-15%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: prefersReduced ? 'none' : 'heroGlowR 18s ease-in-out 2s infinite',
        }}
      />

      {/* Center depth vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(7,3,8,0.8) 100%)'
      }} />

      {/* Subtle grid — hidden on mobile for performance */}
      <div className="absolute inset-0 hidden sm:block" style={{
        backgroundImage: `
          linear-gradient(rgba(254,254,254,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(254,254,254,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 90%)',
        maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 90%)',
      }} />

      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#070308] to-transparent z-10" />

      <style>{`
        @keyframes heroGlowL {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes heroGlowR {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.05); }
        }
        @media (max-width: 767px) {
          @keyframes heroGlowL { 0%,100% { opacity: 0.4; } }
          @keyframes heroGlowR { 0%,100% { opacity: 0.5; } }
        }
      `}</style>
    </div>
  )
}
