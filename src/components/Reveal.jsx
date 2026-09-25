// Scroll-open reveal: a curtain wipe (clip-path), not a fade. Applied only to
// chapter landmarks — statement, figure, stat rows — once each, so motion
// marks structure instead of decorating everything (see DESIGN.md rule 8).
// Reduced-motion users get the static layout, no JS animation at all.
import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className, style }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 28 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
