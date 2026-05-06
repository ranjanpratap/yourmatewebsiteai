'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { easing, fadeUpVariants } from '@/lib/animations'

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

export default function Founder() {
  return (
    <section id="builder" className="relative section-pad">
      <div className="container-pad">
        <div className="text-center mb-12">
          <motion.p className="eyebrow mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            ● THE BUILDER
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left - Portrait */}
          <motion.div
            className="lg:w-[45%] w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing }}
          >
            <div className="relative" style={{ aspectRatio: '4/5' }}>
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{ padding: 2, background: 'var(--brand-gradient)' }}
                animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-3xl" style={{ background: '#0A0410' }} />
              </motion.div>

              {/* Glow */}
              <div className="absolute inset-0 -m-4 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255,139,60,0.2) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)',
                  filter: 'blur(30px)', zIndex: -1,
                }} />

              {/* Photo */}
              <div className="absolute inset-[3px] rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #1A0826 0%, #0A0410 100%)' }}>
                {/* Actual photo — save as /public/founder.jpg */}
                <Image
                  src="/founder.png"
                  alt="Pratap Ranjan — Founder of YourMate"
                  fill
                  className="object-cover object-top"
                  style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.95)' }}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
                {/* Duotone: orange rim right, purple fill left */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 90% 40%, rgba(255,139,60,0.18) 0%, transparent 50%)',
                    mixBlendMode: 'color',
                  }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 10% 40%, rgba(168,85,247,0.14) 0%, transparent 50%)',
                    mixBlendMode: 'color',
                  }} />
                {/* Bottom fade to dark bg */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #0A0410 0%, transparent 100%)' }} />
                {/* Side vignettes */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(10,4,16,0.4) 100%)' }} />
              </div>
            </div>
          </motion.div>

          {/* Right - Bio */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-bold mb-4 lg:mb-2 mx-auto lg:mx-0 leading-[1.1] lg:leading-tight" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, letterSpacing: '-0.025em' }}>
              Built by one.<br />
              <span className="brand-gradient-text">For all of us.</span>
            </h2>

            <div className="mt-2 mb-6 lg:mb-4 mx-auto lg:mx-0">
              <p className="text-xl lg:text-2xl font-bold">Pratap Ranjan</p>
              <p className="text-[14px] lg:text-[16px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>Founder & Architect of Mate</p>
            </div>

            <p className="mx-auto lg:mx-0" style={{ fontSize: 'clamp(15px, 4vw, 18px)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              &ldquo;I built YourMate because I lived the problem. I tried every fitness app, every habit tracker, every journaling tool — and none of them stuck. They counted my steps. They didn&apos;t care if I took them.
            </p>
            <p className="mx-auto lg:mx-0" style={{ fontSize: 'clamp(15px, 4vw, 18px)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              YourMate is the app I needed at 2am on a bad day. It&apos;s the friend I wished checked in when I skipped the gym. I&apos;m building it for everyone who&apos;s tried to change — and almost made it.&rdquo;
            </p>

            <div className="flex justify-center lg:justify-start gap-3">
              <motion.a
                href="https://www.linkedin.com/in/pratap-ranjan-2945271a5"
                target="_blank"
                rel="noopener noreferrer"
                className="glass w-11 h-11 flex items-center justify-center rounded-xl hover:border-white/20 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/pratapranjan.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="glass w-11 h-11 flex items-center justify-center rounded-xl hover:border-white/20 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236,72,153,0.3)' }}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
