'use client'
import { motion } from 'framer-motion'

const characters = [
  { name: 'Maya', sub: 'Calm & caring', emoji: '👩🏻', grad: 'linear-gradient(135deg,#A855F7,#EC4899)', selected: true },
  { name: 'Arjun', sub: 'Friendly buddy', emoji: '👨🏻', grad: 'linear-gradient(135deg,#3B82F6,#A855F7)', selected: false },
  { name: 'Meera', sub: 'Cheerful & playful', emoji: '👩🏽', grad: 'linear-gradient(135deg,#EC4899,#F97316)', selected: false },
  { name: 'Rohit', sub: 'Strict coach', emoji: '👨🏽', grad: 'linear-gradient(135deg,#3B82F6,#0EA5E9)', selected: false },
]

export default function OnboardingScreen() {
  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0A0410 0%,#15081C 100%)', paddingTop: 44 }}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(255,139,60,0.12) 0%,transparent 70%)', filter: 'blur(30px)' }}
      />

      <div className="flex flex-col flex-1 px-5 pt-3 overflow-hidden">
        {/* Progress row */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="glass rounded-xl flex items-center justify-center"
            style={{ width: 36, height: 36, fontSize: 14, flexShrink: 0 }}
          >‹</div>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(254,254,254,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg,#FF8B3C,#A855F7)' }}
              initial={{ width: '0%' }}
              animate={{ width: '85%' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
            color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginBottom: 10,
          }}>
            STEP 11 OF 13 · YOUR COMPANION
          </p>
          <h2 style={{
            fontSize: 30, fontWeight: 800, color: '#fefefe',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            fontFamily: 'var(--font-poppins)', marginBottom: 6,
          }}>
            Pick your{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(90deg,#FF8B3C,#EC4899,#A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>mate.</span>
          </h2>
          <p style={{
            fontSize: 13, color: 'rgba(254,254,254,0.65)',
            lineHeight: 1.5, fontFamily: 'var(--font-poppins)', marginBottom: 18,
          }}>
            Choose who'll check in on you. Change anytime.
          </p>
        </motion.div>

        {/* Character label */}
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
          color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginBottom: 10,
        }}>
          CHOOSE CHARACTER
        </p>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {characters.map((c, i) => (
            <motion.div
              key={c.name}
              className="glass rounded-2xl p-3 flex flex-col items-center"
              style={c.selected ? {
                border: '1.5px solid rgba(255,139,60,0.6)',
                boxShadow: '0 0 20px rgba(236,72,153,0.15)',
              } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl mb-2"
                style={{ background: c.grad }}
              >
                {c.emoji}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fefefe', fontFamily: 'var(--font-poppins)' }}>{c.name}</p>
              <p style={{ fontSize: 10, color: 'rgba(254,254,254,0.6)', fontFamily: 'var(--font-poppins)', textAlign: 'center' }}>{c.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Tone label */}
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
          color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginBottom: 10,
        }}>
          TONE FOR NUDGES
        </p>

        <div className="flex gap-2.5">
          {['Warm', 'Firm', 'Playful'].map((t, i) => (
            <motion.div
              key={t}
              className="rounded-full px-3 py-1.5 cursor-pointer"
              style={{
                background: i === 0 ? 'linear-gradient(135deg,#FF8B3C,#EC4899)' : 'rgba(254,254,254,0.06)',
                border: i === 0 ? 'none' : '1px solid rgba(254,254,254,0.08)',
                color: '#fefefe',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 500,
                fontSize: 12,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue button */}
      <div className="px-5 pb-5 flex-shrink-0">
        <motion.div
          className="w-full rounded-full flex items-center justify-center"
          style={{
            height: 52,
            background: 'linear-gradient(135deg,#FF8B3C,#EC4899)',
            boxShadow: '0 0 24px rgba(255,139,60,0.35)',
            fontFamily: 'var(--font-poppins)',
            cursor: 'pointer',
          }}
          animate={{ boxShadow: ['0 0 16px rgba(255,139,60,0.3)', '0 0 32px rgba(255,139,60,0.5)', '0 0 16px rgba(255,139,60,0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fefefe' }}>Continue</span>
        </motion.div>
      </div>
    </div>
  )
}
