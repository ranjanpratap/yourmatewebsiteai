'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easing } from '@/lib/animations'

function Confetti() {
  const colors = ['#FF8B3C', '#EC4899', '#A855F7', '#3B82F6', '#10B981']
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors[i % colors.length],
            left: `${30 + Math.random() * 40}%`,
            top: '50%',
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: 0,
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 1) * 300,
            scale: [0, 1, 0],
          }}
          transition={{ duration: 1.5, delay: i * 0.03, ease: easing }}
        />
      ))}
    </div>
  )
}

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="relative section-pad overflow-hidden">
      {/* Pulsing orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(255,139,60,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-pad relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
          >
            <span>✨</span>
            <span className="eyebrow">LIMITED EARLY ACCESS</span>
          </motion.div>

          <motion.h2
            className="font-bold mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
          >
            <span className="brand-gradient-text">YourMate</span> is<br />launching soon.
          </motion.h2>

          <motion.p
            className="mb-10"
            style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 560 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
          >
            Be the first to experience your AI life partner. We&apos;re onboarding a small group of early mates — thoughtfully, slowly.
          </motion.p>

          <motion.div
            className="relative w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
          >
            {showConfetti && <Confetti />}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="glass-strong p-6 rounded-full text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: easing }}
                >
                  <p className="font-semibold">✓ You&apos;re in. We&apos;ll email when it&apos;s your turn.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-strong flex flex-col md:flex-row gap-2 p-2 rounded-3xl md:rounded-full"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@awesome.com"
                    required
                    className="flex-1 bg-transparent outline-none px-4 py-3 md:py-2 text-sm rounded-2xl md:rounded-full"
                    style={{ color: 'var(--text-primary)', fontSize: 15, minHeight: 52 }}
                  />
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="cta-gradient-bg text-white font-semibold text-sm px-6 py-4 md:py-3 rounded-2xl md:rounded-full flex-shrink-0 disabled:opacity-70 whitespace-nowrap w-full md:w-auto"
                    style={{ boxShadow: '0 0 20px rgba(255,139,60,0.3)', minHeight: 52 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(255,139,60,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'loading' ? '...' : 'Get Early Access →'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2 text-center">Something went wrong. Please try again.</p>
            )}
          </motion.div>

          <motion.p
            className="eyebrow mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            No spam. One email when we launch.
          </motion.p>

          {/* Social proof */}
          <motion.div
            className="flex items-center gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex -space-x-2">
              {(['#FF8B3C', '#EC4899', '#A855F7'] as const).map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0410] flex items-center justify-center text-xs font-bold"
                  style={{ background: color }}>
                  {['R', 'A', 'M'][i]}
                </div>
              ))}
            </div>
            <span className="eyebrow">213 MATES ALREADY WAITING</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
