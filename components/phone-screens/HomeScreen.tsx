'use client'
import { motion } from 'framer-motion'

function ConcentricRings() {
  const rings = [
    { r: 46, pct: 0.72, color: '#FF8B3C', delay: 0.2 },
    { r: 36, pct: 0.60, color: '#A855F7', delay: 0.4 },
    { r: 26, pct: 0.80, color: '#3B82F6', delay: 0.6 },
  ]
  const size = 104
  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map(({ r }) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none"
            stroke="rgba(254,254,254,0.06)" strokeWidth="7" />
        ))}
        {rings.map(({ r, pct, color, delay }) => {
          const circ = 2 * Math.PI * r
          return (
            <motion.circle key={r} cx={cx} cy={cy} r={r}
              fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ * (1 - pct) }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
              style={{ transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${cy}px` }}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontSize: 18, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', lineHeight: 1 }}>72%</span>
        <span style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(254,254,254,0.5)', fontFamily: 'var(--font-jetbrains)' }}>ON TRACK</span>
      </div>
    </div>
  )
}

export default function HomeScreen() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(160deg,#0A0410 0%,#15081C 60%,#0A0410 100%)',
        paddingTop: 44,
      }}
    >
      {/* Warm glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(255,139,60,0.18) 0%,transparent 70%)', filter: 'blur(24px)' }} />

      <div className="flex flex-col flex-1 px-4 pt-3 gap-2.5 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between flex-shrink-0">
          <div>
            <p style={{
              fontSize: 20, fontWeight: 800, color: '#fefefe',
              letterSpacing: '-0.02em', fontFamily: 'var(--font-poppins)', lineHeight: 1.1,
            }}>Morning, Pratap.</p>
            <p style={{
              fontSize: 10, fontWeight: 500, letterSpacing: '0.16em',
              color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginTop: 3,
            }}>TUE · 23 APR · DAY 7</p>
          </div>
          <div
            className="flex items-center justify-center rounded-full text-base flex-shrink-0"
            style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg,#A855F7,#EC4899)',
              boxShadow: '0 0 0 2px rgba(168,85,247,0.35)',
            }}
          >👩🏻</div>
        </div>

        {/* Trial banner */}
        <motion.div
          className="glass rounded-2xl flex items-center justify-between flex-shrink-0"
          style={{ paddingLeft: 14, paddingRight: 14, height: 40 }}
          animate={{ boxShadow: ['0 0 0 1px rgba(255,139,60,0.12)', '0 0 0 1px rgba(255,139,60,0.32)', '0 0 0 1px rgba(255,139,60,0.12)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p style={{ fontSize: 12, fontFamily: 'var(--font-poppins)', color: '#fefefe' }}>
            <span style={{ color: '#FF8B3C', fontWeight: 600 }}>2 days left</span>{' '}in your free trial
          </p>
          <p style={{ fontSize: 12, color: '#FF8B3C', fontWeight: 500, fontFamily: 'var(--font-poppins)' }}>See plans →</p>
        </motion.div>

        {/* Main stats card */}
        <div className="glass rounded-2xl flex gap-3 flex-shrink-0" style={{ padding: '14px 14px' }}>
          <ConcentricRings />
          <div className="flex flex-col justify-center gap-2.5 flex-1">
            {[
              { label: 'CALORIES', val: '1,420', sub: '/ 2,100' },
              { label: 'WATER',    val: '2.1',   sub: '/ 3.0L'  },
              { label: 'WORKOUT',  val: 'Pending', sub: ''       },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)' }}>{s.label}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fefefe', fontFamily: 'var(--font-poppins)', lineHeight: 1.2 }}>
                  {s.val}{' '}
                  {s.sub && <span style={{ fontWeight: 400, color: 'rgba(254,254,254,0.45)', fontSize: 11 }}>{s.sub}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps + Protein */}
        <div className="flex gap-2.5 flex-shrink-0">
          <div className="glass rounded-2xl flex-1" style={{ padding: '12px 14px' }}>
            <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)' }}>STEPS</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', marginTop: 2, lineHeight: 1 }}>6,240</p>
            <p style={{ fontSize: 11, color: 'rgba(254,254,254,0.6)', fontFamily: 'var(--font-poppins)', marginTop: 3 }}>
              <span style={{ color: '#10B981' }}>↗</span> Best this week
            </p>
          </div>
          <div className="glass rounded-2xl flex-1" style={{ padding: '12px 14px' }}>
            <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)' }}>PROTEIN</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', marginTop: 2, lineHeight: 1 }}>
              72<span style={{ fontSize: 13, color: 'rgba(254,254,254,0.5)' }}>g</span>
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,139,60,0.85)', fontFamily: 'var(--font-poppins)', marginTop: 3 }}>Low — aim higher</p>
          </div>
        </div>

        {/* Next up */}
        <div
          className="glass rounded-2xl flex-shrink-0"
          style={{
            padding: '12px 14px',
            background: 'linear-gradient(135deg,rgba(255,139,60,0.09),rgba(168,85,247,0.06))',
            borderColor: 'rgba(255,139,60,0.18)',
          }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', color: '#FF8B3C', fontFamily: 'var(--font-jetbrains)' }}>
            NEXT UP · IN 2 HRS
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', marginTop: 3 }}>
            Gym — Push day 🔥
          </p>
          <p style={{ fontSize: 11, color: 'rgba(254,254,254,0.65)', fontFamily: 'var(--font-poppins)', marginTop: 2, lineHeight: 1.4 }}>
            Maya has your session planned. 6 exercises, ~55 min.
          </p>
          <div
            className="mt-2.5 inline-flex items-center bg-white rounded-full"
            style={{ padding: '6px 16px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0A0410', fontFamily: 'var(--font-poppins)' }}>Open workout</span>
          </div>
        </div>

      </div>

      {/* Tab bar — always pinned at bottom */}
      <div
        className="glass flex items-center justify-around flex-shrink-0"
        style={{
          height: 52, borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
          borderTop: '1px solid rgba(254,254,254,0.06)',
          backdropFilter: 'blur(24px)', paddingLeft: 16, paddingRight: 16,
        }}
      >
        {[
          { icon: '⌂', label: 'HOME', active: true },
          { icon: '📊', label: 'STATS' },
          { icon: '+', special: true },
          { icon: '≡', label: 'PLAN' },
          { icon: '◑', label: 'YOU' },
        ].map((t, i) => (
          <div key={i} className="flex flex-col items-center relative" style={{ gap: 2 }}>
            {t.special ? (
              <div
                className="flex items-center justify-center rounded-full text-white font-bold"
                style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#FF8B3C,#A855F7)', boxShadow: '0 0 14px rgba(255,139,60,0.4)', fontSize: 18 }}
              >+</div>
            ) : (
              <>
                <span style={{ fontSize: 15, lineHeight: 1 }}>{t.icon}</span>
                <span style={{ fontSize: 8, color: t.active ? '#FF8B3C' : 'rgba(254,254,254,0.35)', fontFamily: 'var(--font-jetbrains)', letterSpacing: '0.08em' }}>{t.label}</span>
                {t.active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF8B3C', position: 'absolute', bottom: -5 }} />}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
