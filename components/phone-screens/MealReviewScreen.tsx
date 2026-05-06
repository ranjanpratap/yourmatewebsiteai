'use client'
import { motion } from 'framer-motion'

const items = [
  { label: 'Rajma', kcal: 235, dot: '#FF8B3C' },
  { label: 'Steamed rice', kcal: 260, dot: '#A855F7' },
  { label: 'Roti', kcal: 90, dot: '#3B82F6' },
  { label: 'Cucumber salad', kcal: 30, dot: '#10B981' },
]

export default function MealReviewScreen() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0A0410 0%,#15081C 100%)', paddingTop: 44 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2 flex-shrink-0">
        <div
          className="glass rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ width: 32, height: 32, fontSize: 14 }}
        >‹</div>
        <p style={{ fontSize: 17, fontWeight: 700, color: '#fefefe', fontFamily: 'var(--font-poppins)', flex: 1 }}>
          Meal Review
        </p>
        <span style={{ fontSize: 16 }}>📷</span>
      </div>

      {/* Food image card */}
      <motion.div
        className="mx-4 rounded-3xl overflow-hidden relative flex-shrink-0"
        style={{
          height: 188,
          background: 'linear-gradient(145deg,#3D2000 0%,#7A3B00 40%,#4A2800 100%)',
          border: '1px solid rgba(255,139,60,0.2)',
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Warm glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 60%,rgba(255,139,60,0.25) 0%,transparent 70%)',
        }} />

        {/* AI chip */}
        <motion.div
          className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,139,60,0.4)',
            padding: '5px 10px',
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8B3C', flexShrink: 0 }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span style={{ fontSize: 10, fontWeight: 600, color: '#fefefe', fontFamily: 'var(--font-poppins)' }}>
            AI detected · 94%
          </span>
        </motion.div>

        {/* Plate emoji centred */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            style={{ fontSize: 64, lineHeight: 1, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >🍽️</motion.span>
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        style={{
          fontSize: 9, fontWeight: 500, letterSpacing: '0.18em',
          color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)',
          paddingLeft: 16, paddingRight: 16, marginTop: 14, marginBottom: 8,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        DETECTED ITEMS — TAP TO EDIT
      </motion.p>

      {/* Item rows */}
      <div className="flex flex-col px-4 gap-1.5 flex-1 overflow-hidden">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="glass rounded-2xl flex items-center justify-between"
            style={{ padding: '10px 14px', flexShrink: 0 }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#fefefe', fontFamily: 'var(--font-poppins)' }}>
                {item.label}
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(254,254,254,0.6)', fontFamily: 'var(--font-poppins)' }}>
              {item.kcal} kcal
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom macro bar */}
      <motion.div
        className="flex gap-2 px-4 pb-4 flex-shrink-0"
        style={{ marginTop: 12 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* KCAL — orange filled */}
        <div
          className="flex-1 rounded-2xl flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg,#FF8B3C,#EC4899)',
            padding: '10px 8px',
            boxShadow: '0 0 20px rgba(255,139,60,0.3)',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', lineHeight: 1 }}>615</span>
          <span style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(254,254,254,0.8)', fontFamily: 'var(--font-jetbrains)', marginTop: 2 }}>KCAL</span>
        </div>

        {[
          { val: '22g', label: 'PROTEIN' },
          { val: '92g', label: 'CARBS' },
          { val: '14g', label: 'FAT' },
        ].map(m => (
          <div
            key={m.label}
            className="glass flex-1 rounded-2xl flex flex-col items-center justify-center"
            style={{ padding: '10px 8px' }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: '#fefefe', fontFamily: 'var(--font-poppins)', lineHeight: 1 }}>{m.val}</span>
            <span style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(254,254,254,0.4)', fontFamily: 'var(--font-jetbrains)', marginTop: 2 }}>{m.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
