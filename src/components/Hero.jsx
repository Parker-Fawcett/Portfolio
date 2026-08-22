import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const orbs = [
  { size: 520, x: '-12%', y: '-20%', color: 'rgba(139, 92, 246, 0.16)', duration: 16, delay: 0 },
  { size: 420, x: '70%', y: '5%', color: 'rgba(34, 211, 238, 0.10)', duration: 20, delay: 2 },
  { size: 320, x: '45%', y: '60%', color: 'rgba(244, 114, 182, 0.08)', duration: 14, delay: 1 },
]

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isMobile ? '100px 20px 60px' : '120px 24px 80px',
      }}
    >
      {orbs.slice(0, isMobile ? 1 : 3).map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 50, -25, 35, 0],
            y: [0, -35, 45, -25, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${orb.color}, transparent 70%)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 860 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}
        >
          <span
            className="tag tag-purple"
            style={{ fontSize: '0.75rem', padding: '6px 16px', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--green)',
                boxShadow: '0 0 10px var(--green)',
                display: 'inline-block',
              }}
            />
            Enterprise AI Skills Engineer @ CHG Healthcare
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: 24,
            color: 'var(--text)',
          }}
        >
          Parker <span className="gradient-text">Fawcett</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: 640,
            margin: '0 auto 16px',
            lineHeight: 1.75,
          }}
        >
          Enterprise AI Skills Engineer and independent researcher specializing in
          agentic software engineering and LLM migrations — architecting enterprise-grade
          AI infrastructure and scaling B2B SaaS platforms.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          style={{
            fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
            margin: '0 auto 44px',
          }}
        >
          Herriman, UT&ensp;·&ensp;512 tests, 83 files&ensp;·&ensp;zero-drift agentic tooling
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#case-studies" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(to bottom, transparent, var(--accent-bright))',
          }}
        />
      </motion.div>
    </section>
  )
}
