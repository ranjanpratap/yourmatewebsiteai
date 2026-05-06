'use client'
import { motion } from 'framer-motion'

export default function WelcomeScreen() {
  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A0410 0%, #1A0826 60%, #0A0410 100%)', paddingTop: 44 }}>

      {/* Warm glow top-right */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full -z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,139,60,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="flex flex-col flex-1 px-6 pt-5 relative z-10">
        {/* Logo small */}
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', fontFamily: 'var(--font-poppins)', marginBottom: 32 }}>
          Your<span style={{ background: 'linear-gradient(90deg,#FF8B3C,#EC4899,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Mate</span>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 38, fontWeight: 800, color: '#fefefe', lineHeight: 1.0, letterSpacing: '-0.02em', fontFamily: 'var(--font-poppins)' }}>Welcome.</p>
          <p style={{ fontSize: 13, color: 'rgba(254,254,254,0.55)', marginTop: 6, fontFamily: 'var(--font-poppins)' }}>Sign in to continue with YourMate</p>
        </motion.div>

        {/* Auth card */}
        <motion.div
          className="glass rounded-3xl mt-9"
          style={{ padding: 18 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {/* Phone input */}
          <div className="flex gap-2.5 mb-3.5">
            <div className="glass rounded-2xl flex flex-col items-center justify-center" style={{ width: 60, height: 56 }}>
              <span style={{ fontSize: 10, color: 'rgba(254,254,254,0.8)', fontFamily: 'var(--font-poppins)' }}>🇮🇳</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(254,254,254,0.8)', fontFamily: 'var(--font-poppins)' }}>+91</span>
            </div>
            <div className="glass rounded-2xl flex items-center flex-1 px-4" style={{ height: 56 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(254,254,254,0.8)', fontFamily: 'var(--font-poppins)' }}>98765 43210</span>
            </div>
          </div>

          {/* Phone CTA */}
          <motion.div
            className="w-full rounded-full flex items-center justify-center cursor-pointer mb-3.5"
            style={{
              height: 54,
              background: 'linear-gradient(135deg, #FF8B3C, #FF6B1A)',
              boxShadow: '0 0 30px rgba(255,139,60,0.4)',
              fontFamily: 'var(--font-poppins)',
            }}
            animate={{ boxShadow: ['0 0 20px rgba(255,139,60,0.3)', '0 0 40px rgba(255,139,60,0.5)', '0 0 20px rgba(255,139,60,0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: '#fefefe' }}>Continue with Phone</span>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px" style={{ background: 'rgba(254,254,254,0.08)' }} />
            <span style={{ fontSize: 12, color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-poppins)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(254,254,254,0.08)' }} />
          </div>

          {/* Google CTA */}
          <div className="glass w-full rounded-full flex items-center justify-center gap-3 mt-3.5 cursor-pointer" style={{ height: 54 }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#fefefe', fontSize: 12, fontWeight: 800, color: '#4285F4' }}>G</div>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#fefefe', fontFamily: 'var(--font-poppins)' }}>Continue with Google</span>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-auto pb-4 text-center" style={{ fontSize: 10, color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-poppins)', lineHeight: 1.5 }}>
          By continuing you agree to our{' '}
          <span style={{ textDecoration: 'underline' }}>Terms</span> and{' '}
          <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}
