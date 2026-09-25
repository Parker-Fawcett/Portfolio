// Scroll-open reveals. Variants cycle per chapter so the scroll never
// repeats the same trick: curtain wipe, middle-out open, side slides,
// settle-zoom. Applied to landmarks only (see DESIGN.md rule 8), once
// each. Reduced-motion users get the static layout, no JS animation.
import { motion, useReducedMotion } from 'framer-motion'

const VARIANTS = {
  // classic curtain: opens bottom-to-top with a small rise
  wipe: {
    initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 28 },
    animate: { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 },
  },
  // middle-out: splits open from the center toward both sides
  center: {
    initial: { clipPath: 'inset(0 42% 0 42%)', opacity: 0 },
    animate: { clipPath: 'inset(0 0% 0 0%)', opacity: 1 },
  },
  left: {
    initial: { x: 90, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  right: {
    initial: { x: -90, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  zoom: {
    initial: { scale: 0.94, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
}

export default function Reveal({ children, delay = 0, className, style, variant = 'wipe' }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
  const v = VARIANTS[variant] || VARIANTS.wipe
  return (
    <motion.div
      className={className}
      style={{ ...(style || {}), ...(variant === 'zoom' ? { transformOrigin: 'center' } : null) }}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
