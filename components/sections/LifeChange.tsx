'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, MouseEvent } from 'react'
import { Flame, Utensils, Heart, Anchor, Moon, Sparkles } from 'lucide-react'
import { easing } from '@/lib/animations'

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  className?: string
}

function GlowCard({ icon, title, description, color, className = '' }: CardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative rounded-[28px] md:rounded-[32px] border border-white/10 bg-[#0D0814] overflow-hidden p-5 md:p-8 transition-colors hover:border-white/20 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${color}15, transparent 40%)`
          ),
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: `${color}15`, color: color }}
        >
          {icon}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-[#fefefe] mb-3 md:mb-4 leading-tight">
          {title}
        </h3>
        
        <p className="text-[#fefefe]/40 text-base leading-relaxed font-light flex-1">
          {description}
        </p>

        <div 
          className="w-12 h-1 mt-8 rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  )
}

export default function LifeChange() {
  return (
    <section id="shift" className="relative section-pad bg-black overflow-hidden">
      <div className="container-pad">
        {/* Header */}
        <div className="mb-10 md:mb-20">
          <motion.p 
            className="eyebrow !text-white/20 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            HOW IT CHANGES YOUR LIFE
          </motion.p>
          <motion.h2
            className="font-bold max-w-2xl"
            style={{ 
              fontSize: 'clamp(44px, 7vw, 84px)', 
              fontWeight: 800, 
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: '#fefefe'
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing }}
          >
            Small nudges. <br />
            A <span className="brand-gradient-text">different year.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[260px] md:auto-rows-[320px]">
          {/* Main Large Card */}
          <GlowCard
            className="sm:col-span-2 md:col-span-7 md:row-span-2"
            icon={<Flame size={24} />}
            color="#FF8B3C"
            title="Stay consistent without thinking."
            description="Maya rolls your plan forward when life happens, so discipline stops being a fight."
          />

          {/* Top Right Card */}
          <GlowCard
            className="md:col-span-5 md:row-span-1"
            icon={<Utensils size={24} />}
            color="#A855F7"
            title="Eat better without tracking manually."
            description="Snap, log, done. No more counting carbs on a calculator."
          />

          {/* Mid Right Card */}
          <GlowCard
            className="md:col-span-5 md:row-span-1"
            icon={<Heart size={24} />}
            color="#3B82F6"
            title="Never feel alone in your journey."
            description="A mate who checks in — quietly, at the right time."
          />

          {/* Bottom Row */}
          <GlowCard
            className="md:col-span-4 md:row-span-1"
            icon={<Anchor size={24} />}
            color="#FF8B3C"
            title="Build discipline daily."
            description="Small wins, stacked. One nudge at a time."
          />

          <GlowCard
            className="md:col-span-4 md:row-span-1"
            icon={<Moon size={24} />}
            color="#A855F7"
            title="Sleep that compounds."
            description="Maya protects your evenings the way a good friend would."
          />

          <GlowCard
            className="md:col-span-4 md:row-span-1"
            icon={<Sparkles size={24} />}
            color="#3B82F6"
            title="Feel lighter, not tracked."
            description="No dashboards to maintain. Just a mate in your pocket."
          />
        </div>
      </div>
    </section>
  )
}
