'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 })
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    document.body.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,[role="button"],input,textarea,select')) {
        ringRef.current?.classList.add('cursor-hover')
      }
    }

    const out = () => {
      ringRef.current?.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <style>{`
        .cursor-dot { pointer-events:none; position:fixed; z-index:9999; }
        .cursor-ring { pointer-events:none; position:fixed; z-index:9998;
          width:32px; height:32px; margin:-16px 0 0 -16px;
          border:1.5px solid rgba(254,254,254,0.5); border-radius:50%;
          transition:width .2s,height .2s,border-color .2s,box-shadow .2s; }
        .cursor-ring.cursor-hover {
          width:48px; height:48px; margin:-24px 0 0 -24px;
          border-color:rgba(255,139,60,0.8);
          box-shadow:0 0 20px rgba(255,139,60,0.4); }
      `}</style>
      <motion.div
        className="cursor-dot"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fefefe' }} />
      </motion.div>
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
