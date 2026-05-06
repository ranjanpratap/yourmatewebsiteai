'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { reels } from '@/lib/reels-config'
import { Sparkles } from 'lucide-react'
import InstagramEmbed from '@/components/ui/InstagramEmbed'

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (diff === 0) return 'TODAY'
  if (diff === 1) return 'YESTERDAY'
  if (diff < 7) return `${diff} DAYS AGO`
  if (diff < 30) return `${Math.floor(diff / 7)} WK AGO`
  if (diff < 365) return `${Math.floor(diff / 30)} MO AGO`
  return `${Math.floor(diff / 365)} YR AGO`
}

interface ReelCardProps {
  reel: typeof reels[0]
  index: number
}

function ReelCard({ reel, index }: ReelCardProps) {
  const prefersReduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [thumb, setThumb] = useState<string | null>(reel.thumbnail ?? null)
  const [thumbLoading, setThumbLoading] = useState(!reel.thumbnail)

  useEffect(() => {
    if (reel.thumbnail) return
    // stagger by index so all cards don't hit Instagram simultaneously
    const timer = setTimeout(() => {
      fetch(`/api/instagram-thumb?url=${encodeURIComponent(reel.url)}`)
        .then(r => r.json())
        .then(d => { if (d.thumbnail) setThumb(d.thumbnail) })
        .catch(() => {})
        .finally(() => setThumbLoading(false))
    }, index * 500)
    return () => clearTimeout(timer)
  }, [reel.url, reel.thumbnail, index])

  return (
    <div
      className="reel-card flex flex-col flex-shrink-0"
      style={{ gap: 14, width: 'clamp(230px, 26vw, 290px)', scrollSnapAlign: 'start' }}
    >
      {/* Card — full-bleed thumbnail, whole thing is a link */}
      <motion.a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden"
        style={{
          aspectRatio: '9/16',
          borderRadius: 24,
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          background: '#0A0410',
        }}
        animate={prefersReduced ? {} : { y: [0, -(2 + (index % 3)), 0] }}
        transition={{ duration: 8 + index * 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 2 }}
        whileHover={{ borderColor: 'rgba(255,139,60,0.3)', boxShadow: '0 24px 60px rgba(0,0,0,0.7)' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Thumbnail */}
        {thumb ? (
          <img
            src={thumb}
            alt={reel.caption}
            className="w-full h-full"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        ) : (
          /* Skeleton pulse while loading */
          <motion.div
            className="w-full h-full"
            style={{ background: 'linear-gradient(160deg,#120820,#1E0A2E)' }}
            animate={{ opacity: thumbLoading ? [0.5, 1, 0.5] : 1 }}
            transition={{ duration: 1.4, repeat: thumbLoading ? Infinity : 0, ease: 'easeInOut' }}
          />
        )}

        {/* Hover overlay — glass "Watch Reel" button only */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.42)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className="flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.28)',
              borderRadius: 999,
              padding: '12px 24px',
            }}
            animate={{ scale: hovered ? 1 : 0.86, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
              <path d="M1 1L12 7.5L1 14V1Z" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 14, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
              Watch Reel
            </span>
          </motion.div>
        </motion.div>
      </motion.a>

      {/* Caption + meta below */}
      <div style={{ padding: '0 6px' }}>
        <p style={{
          fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 500,
          color: 'rgba(255,255,255,0.82)', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {reel.caption}
        </p>
        <div className="flex items-center gap-3" style={{ marginTop: 6 }}>
          <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.12em' }}>
            📅 {timeAgo(reel.date)}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10 }}>·</span>
          <a
            href={reel.url} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.32)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF8B3C')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}
          >
            VIEW ON IG ↗
          </a>
        </div>
      </div>
    </div>
  )
}

function ArrowBtn({ dir, onClick, disabled }: { dir: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="hidden sm:flex items-center justify-center rounded-full glass flex-shrink-0"
      style={{
        width: 44, height: 44,
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#fff',
        fontSize: 18,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.25 : 1,
        background: 'rgba(255,255,255,0.04)',
        transition: 'opacity 0.2s',
      }}
      whileHover={disabled ? {} : { scale: 1.08, borderColor: 'rgba(255,139,60,0.4)', color: '#FF8B3C' }}
      whileTap={disabled ? {} : { scale: 0.94 }}
    >
      {dir === 'left' ? '←' : '→'}
    </motion.button>
  )
}

export default function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Lazy-load embeds when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>('.reel-card')
      if (!card) return
      const cardW = card.offsetWidth + 24
      setActiveIndex(Math.min(Math.round(track.scrollLeft / cardW), reels.length - 1))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollBy = useCallback((dir: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.reel-card')
    const amount = (card ? card.offsetWidth + 24 : 300) * (dir === 'left' ? -1 : 1)
    track.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.reel-card')
    const cardW = card ? card.offsetWidth + 24 : 300
    track.scrollTo({ left: cardW * i, behavior: 'smooth' })
  }, [])

  if (reels.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="reels"
      className="relative overflow-hidden"
      style={{ paddingTop: 'clamp(96px, 12vw, 160px)', paddingBottom: 'clamp(96px, 12vw, 160px)' }}
    >
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.07) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* Header */}
      <div style={{ maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
        <div className="flex flex-col items-center text-center">

          <motion.div
            className="glass inline-flex items-center gap-2"
            style={{ padding: '8px 16px', borderRadius: 999, height: 36 }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#EC4899', display: 'block', flexShrink: 0 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)' }}>
              BEHIND THE BUILD
            </span>
          </motion.div>

          <motion.h2
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05, color: '#fff', marginTop: 20 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Watch the{' '}
            <span style={{ background: 'linear-gradient(90deg,#FF8B3C 0%,#EC4899 50%,#A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              journey.
            </span>
          </motion.h2>

          <motion.p
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 540, marginTop: 18 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Real moments from building YourMate. The wins, the doubts, the messy middle. Follow along on Instagram.
          </motion.p>

          <motion.a
            href="https://instagram.com/pratapranjan.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2"
            style={{ marginTop: 28, padding: '12px 22px', borderRadius: 999, fontFamily: 'var(--font-poppins)', fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(236,72,153,0.25)' }}
            whileTap={{ scale: 0.97 }}
          >
            📷 @pratapranjan.ai ↗
          </motion.a>
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Arrow row */}
        <div
          className="flex items-center justify-end gap-2 mb-5"
          style={{ maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)' }}
        >
          <ArrowBtn dir="left" onClick={() => scrollBy('left')} disabled={activeIndex === 0} />
          <ArrowBtn dir="right" onClick={() => scrollBy('right')} disabled={activeIndex >= reels.length - 1} />
        </div>

        {/* Scroll track — bleeds edge to show peek */}
        <div
          ref={trackRef}
          className="flex items-start"
          style={{
            gap: 24,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
            scrollPaddingLeft: 'clamp(20px, 5vw, 80px)',
            scrollPaddingRight: 'clamp(20px, 5vw, 80px)',
            paddingBottom: 24,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {reels.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2" style={{ marginTop: 20 }}>
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: i === activeIndex ? 'linear-gradient(90deg,#FF8B3C,#EC4899)' : 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA Card */}
      <motion.div
        className="max-w-5xl mx-auto px-6 mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="relative group">
          {/* Subtle outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative bg-[#0D0814]/80 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[28px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex items-center gap-4 md:gap-8">
              {/* Star Icon Badge */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-purple-500 blur-xl opacity-30 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shadow-2xl overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-purple-500/10" />
                   <motion.span 
                    className="text-2xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ⭐
                  </motion.span>
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#fefefe] mb-2 leading-tight">New reel every day</h3>
                <p className="text-[#fefefe]/50 text-base md:text-lg leading-relaxed max-w-md">
                  Join me on this journey of building something meaningful. See you on <span className="text-[#FF8B3C] font-medium">Instagram!</span> 👋
                </p>
              </div>
            </div>

            {/* CTA Column */}
            <div className="flex flex-col items-center gap-3">
              <motion.a
                href="https://www.instagram.com/pratapranjan.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative px-8 py-4 rounded-full overflow-hidden flex items-center gap-3 transition-all active:scale-95"
                style={{ 
                  background: 'linear-gradient(to right, #FF8B3C, #A855F7)',
                  boxShadow: '0 8px 32px -8px rgba(255,139,60,0.5)'
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                  <span className="text-white font-bold text-lg">Follow on Instagram</span>
                </div>
                <motion.span
                  className="text-white"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              
              <a 
                href="https://www.instagram.com/pratapranjan.ai" 
                target="_blank" 
                className="text-[#fefefe]/30 hover:text-[#fefefe]/60 transition-colors text-sm font-medium flex items-center gap-2 group/handle"
              >
                @pratapranjan.ai <span className="text-xs transition-transform group-hover/handle:translate-x-1 group-hover/handle:-translate-y-1">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mission Tagline */}
        <div className="mt-12 text-center">
          <p className="text-[#fefefe]/60 font-medium flex items-center justify-center gap-2 text-base">
            <Sparkles size={16} className="text-orange-400" />
            30 days. One mission. Building <span className="brand-gradient-text font-bold">YourMate.</span>
          </p>
        </div>
      </motion.div>

      <style>{`
        #reels .flex::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
