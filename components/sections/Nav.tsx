'use client'
import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Wordmark from '@/components/ui/Wordmark'
import { Menu, X } from 'lucide-react'

const links = ['Why', 'Features', 'Demo', 'Preview']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const blur = useTransform(scrollY, [0, 80], [8, 24])
  const scale = useTransform(scrollY, [0, 80], [1, 0.97])

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
          {/* Left */}
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

          {/* Center links */}
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
              className="md:hidden p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{ color: 'var(--text-secondary)' }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          className="fixed top-20 left-4 right-4 z-40 glass-strong rounded-3xl p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex flex-col gap-4">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-base font-medium"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setOpen(false)}
              >{link}</a>
            ))}
            <a href="#waitlist"
              className="flex items-center gap-1.5 bg-white text-[#0A0410] text-sm font-semibold px-4 py-2.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Join Waitlist
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}
