'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
  className?: string
  href?: string
  type?: 'button' | 'submit'
}

export default function GlowButton({ variant = 'primary', children, onClick, className, href, type = 'button' }: GlowButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer'
  const variants = {
    primary: 'bg-white text-[#0A0410] shadow-[0_0_20px_rgba(254,254,254,0.15)] hover:shadow-[0_0_30px_rgba(254,254,254,0.25)]',
    secondary: 'glass text-white border border-white/10 hover:border-white/20',
  }

  const content = (
    <motion.span
      className={cn(base, variants[variant], className)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  )

  if (href) return <a href={href}>{content}</a>
  return <button type={type} onClick={onClick}>{content}</button>
}
