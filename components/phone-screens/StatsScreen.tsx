'use client'
import { motion } from 'framer-motion'

const weightData = [75.8, 75.2, 74.9, 74.6, 74.4, 74.3, 74.2]
const calData    = [1820, 2100, 1650, 1960, 2200, 1780, 1900]
const barColors  = ['#FF8B3C', '#10B981', '#EC4899', '#FF8B3C', '#10B981', '#EC4899', '#FF8B3C']
const dayLabels  = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const W = 288   // SVG internal width for line chart
const H = 56
const minW = Math.min(...weightData) - 0.3
const maxW = Math.max(...weightData) + 0.3

function toX(i: number) { return (i / (weightData.length - 1)) * W }
function toY(v: number) { return H - ((v - minW) / (maxW - minW)) * (H - 8) - 4 }

const linePts = weightData.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')
const areaPath = `M0,${H} ` + weightData.map((v, i) => `L${toX(i)},${toY(v)}`).join(' ') + ` L${W},${H} Z`

const activeWorkoutDays = new Set([1, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26])
const todayCell = 23

export default function StatsScreen() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(160deg,#0A0410 0%,#15081C 60%,#0A0410 100%)',
        paddingTop: 44,
      }}
    >
      {/* Warm glow top-right */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.15) 0%,transparent 70%)', filter: 'blur(30px)' }} />

      <div className="flex flex-col flex-1 px-4 pt-3 gap-2.5 overflow-hidden">

        {/* Weight header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', lineHeight: 1, letterSpacing: '-0.03em' }}>74.2</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: 'rgba(254,254,254,0.5)', fontFamily: 'var(--font-poppins)' }}>kg</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#10B981', fontFamily: 'var(--font-poppins)', marginTop: 2 }}>
            ↓ 1.8 kg · goal 70 kg
          </p>
        </motion.div>

        {/* Line chart card */}
        <motion.div
          className="glass rounded-2xl flex-shrink-0"
          style={{ padding: '12px 14px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginBottom: 8 }}>
            WEIGHT · LAST 7 DAYS
          </p>
          <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" overflow="visible">
            <defs>
              <linearGradient id="stats-line-grad" x1="0" y1="0" x2="100%" y2="0">
                <stop stopColor="#FF8B3C" />
                <stop offset="0.5" stopColor="#EC4899" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="stats-area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#FF8B3C" stopOpacity="0.25" />
                <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <motion.path
              d={areaPath}
              fill="url(#stats-area-grad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            {/* Line */}
            <motion.polyline
              points={linePts}
              fill="none"
              stroke="url(#stats-line-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* End dot */}
            <motion.circle
              cx={toX(weightData.length - 1)}
              cy={toY(weightData[weightData.length - 1])}
              r="4"
              fill="#FF8B3C"
              stroke="#0A0410"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Bar chart card */}
        <motion.div
          className="glass rounded-2xl flex-shrink-0"
          style={{ padding: '12px 14px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginBottom: 8 }}>
            CALORIES · LAST 7 DAYS
          </p>
          <div className="flex items-end gap-1" style={{ height: 44 }}>
            {calData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center" style={{ gap: 3 }}>
                <motion.div
                  className="w-full rounded-t-md"
                  style={{
                    background: barColors[i],
                    opacity: 0.85,
                    boxShadow: `0 0 6px ${barColors[i]}50`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: (v / Math.max(...calData)) * 36 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <span style={{ fontSize: 7, color: 'rgba(254,254,254,0.35)', fontFamily: 'var(--font-jetbrains)' }}>
                  {dayLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Calendar card */}
        <motion.div
          className="glass rounded-2xl flex-shrink-0"
          style={{ padding: '12px 14px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginBottom: 8 }}>
            WORKOUT CONSISTENCY · APRIL
          </p>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
              const isActive = activeWorkoutDays.has(day)
              const isToday = day === todayCell
              return (
                <motion.div
                  key={day}
                  className="rounded-md flex items-center justify-center"
                  style={{
                    aspectRatio: '1',
                    background: isActive ? 'rgba(16,185,129,0.25)' : 'rgba(254,254,254,0.04)',
                    border: isToday ? '1.5px solid #FF8B3C' : 'none',
                    boxShadow: isToday ? '0 0 8px rgba(255,139,60,0.4)' : 'none',
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + day * 0.018, duration: 0.25 }}
                >
                  <span style={{
                    fontSize: 7,
                    fontWeight: isActive || isToday ? 700 : 400,
                    color: isToday ? '#FF8B3C' : isActive ? '#10B981' : 'rgba(254,254,254,0.3)',
                    fontFamily: 'var(--font-jetbrains)',
                  }}>{day}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Insight card */}
        <motion.div
          className="rounded-2xl flex-shrink-0"
          style={{
            padding: '12px 14px',
            background: 'linear-gradient(135deg,rgba(168,85,247,0.18),rgba(236,72,153,0.12))',
            border: '1px solid rgba(168,85,247,0.25)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', color: '#A855F7', fontFamily: 'var(--font-jetbrains)', marginBottom: 4 }}>
            THIS WEEK · INSIGHT
          </p>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#fefefe', fontFamily: 'var(--font-poppins)', lineHeight: 1.3 }}>
            You&apos;re on track 🎯
          </p>
          <p style={{ fontSize: 11, color: 'rgba(254,254,254,0.6)', fontFamily: 'var(--font-poppins)', marginTop: 3, lineHeight: 1.4 }}>
            -0.4 kg this week · goal weight in ~6 weeks
          </p>
        </motion.div>

      </div>
    </div>
  )
}
