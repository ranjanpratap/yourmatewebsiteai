'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUpVariants } from '@/lib/animations'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  strong?: boolean
  animate?: boolean
  delay?: number
}

export default function GlassCard({ children, className, strong, animate = true, delay = 0 }: GlassCardProps) {
  const reducedMotion = useReducedMotion()

  if (!animate || reducedMotion) {
    return (
      <div className={cn(strong ? 'glass-strong' : 'glass', className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(strong ? 'glass-strong' : 'glass', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
