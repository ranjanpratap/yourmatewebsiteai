export const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const springConfig = { stiffness: 100, damping: 20 }
export const springFast = { stiffness: 300, damping: 28 }

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: easing }
  }
}

export const staggerContainer = (stagger = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } }
})

export const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } }
}

export const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: easing, delay: i * 0.1 }
  })
}
