'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Wordmark from '@/components/ui/Wordmark'
import { Menu, X } from 'lucide-react'

const links = ['Why', 'Features', 'Demo', 'Preview']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const blur = useTransform(scrollY, [0, 80], [8, 24])
  const scale = useTransform(scrollY, [0, 80], [1, 0.97])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        style={{ scale, maxWidth: 1100, width: 'calc(100% - 32px)' }}
      >
        <motion.div
          className="glass flex items-center justify-between px-4 py-2.5 rounded-full"
          style={{ backdropFilter: `blur(${blur}px) saturate(180%)` } as React.CSSProperties}
        >
          {/* Left — logo + wordmark */}
          <a href="#" className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              <img
                src="/logo.png"
                alt="YourMate"
                style={{ width: '118%', height: '118%', objectFit: 'cover', marginLeft: '-9%', marginTop: '-9%', display: 'block' }}
              />
            </div>
            <Wordmark size="sm" />
          </a>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: 'var(--text-secondary)' }}
              >{link}</a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a href="#waitlist"
              className="hidden sm:flex items-center gap-1.5 bg-white text-[#0A0410] text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Join Waitlist
            </a>
            <button
              className="md:hidden p-2 -mr-1"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              style={{ color: 'var(--text-secondary)' }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu — solid dark background, not glass */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim backdrop — closes on tap */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer — slides down from top, fully opaque */}
            <motion.div
              key="drawer"
              className="fixed top-0 left-0 right-0 z-50 md:hidden shadow-2xl"
              style={{ background: '#0A0410', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Drawer top row */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <a href="#" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <img src="/logo.png" alt="YourMate" style={{ width: '118%', height: '118%', objectFit: 'cover', marginLeft: '-9%', marginTop: '-9%', display: 'block' }} />
                  </div>
                  <Wordmark size="sm" />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5"
                  aria-label="Close menu"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-4 gap-1">
                {links.map(link => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="px-4 py-4 rounded-2xl text-white text-base font-medium hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors flex items-center"
                    style={{ minHeight: 56 }}
                  >
                    {link}
                  </a>
                ))}

                {/* Waitlist CTA at bottom */}
                <a
                  href="#waitlist"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 bg-white text-[#0A0410] text-sm font-semibold px-6 rounded-full"
                  style={{ minHeight: 52 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Join Waitlist
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
