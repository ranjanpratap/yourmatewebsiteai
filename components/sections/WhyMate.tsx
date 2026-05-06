'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const rows = [
  {
    muted: 'Most apps track you.',
    bold: 'YourMate understands you.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.12)',
  },
  {
    muted: 'When you skip the gym…',
    bold: 'it notices.',
    color: '#FF8B3C',
    glow: 'rgba(255,139,60,0.12)',
  },
  {
    muted: 'When you eat better…',
    bold: 'it celebrates.',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.12)',
  },
  {
    muted: 'When life feels off…',
    bold: 'it checks in.',
    gradient: 'linear-gradient(90deg,#A855F7,#EC4899)',
    glow: 'rgba(168,85,247,0.12)',
  },
]

function Row({ muted, bold, color, gradient, glow, index }: typeof rows[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start"
      style={{
        borderTop: '1px solid rgba(254,254,254,0.07)',
        padding: 'clamp(32px, 5vw, 64px) 0',
        gap: 'clamp(24px, 6vw, 80px)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      {/* Counter */}
      <p
        className="eyebrow"
        style={{
          color: 'rgba(254,254,254,0.2)',
          paddingTop: '0.75rem',
          flexShrink: 0,
        }}
      >
        {num} / {String(rows.length).padStart(2, '0')}
      </p>

      {/* Statement Container */}
      <div className="flex flex-col">
        <h3
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: 'clamp(26px, 3.5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#fefefe',
          }}
        >
          {muted}
          <br />
          {gradient ? (
            <span style={{
              background: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {bold}
            </span>
          ) : (
            <span style={{ color }}>{bold}</span>
          )}
        </h3>
      </div>
    </motion.div>
  )
}

export default function WhyMate() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <section id="why" className="relative overflow-hidden section-pad">
      <div className="container-pad">
        {/* Header Layout */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 lg:gap-16"
          style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          {/* Left Side */}
          <div className="max-w-2xl">
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              WHY YOURMATE
            </motion.p>

            <motion.h2
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: 'clamp(32px, 5.5vw, 64px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#fefefe',
              }}
              initial={{ opacity: 0, x: -15 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Less noise.<br />
              More{' '}
              <span className="brand-gradient-text">
                connection.
              </span>
            </motion.h2>
          </div>

          {/* Right Side */}
          <motion.div
            className="max-w-full md:max-w-[300px] lg:max-w-[360px] pb-1 md:pb-2"
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light">
              Your mate is not another dashboard. It&apos;s the one that notices —
              the small wins, the quiet struggles, the rhythm of your life.
            </p>
          </motion.div>
        </div>

        {/* Feature Rows */}
        <div className="relative">
          {rows.map((row, i) => (
            <Row key={i} {...row} index={i} />
          ))}
          {/* Final Border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}


