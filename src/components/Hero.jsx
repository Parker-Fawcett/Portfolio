import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const blobs = [
  { size: 400, x: '-5%', y: '-15%', color: 'rgba(124, 58, 237, 0.08)', rx: '40% 60% 60% 40% / 50% 40% 60% 50%', duration: 14, delay: 0 },
  { size: 350, x: '75%', y: '10%', color: 'rgba(6, 182, 212, 0.06)', rx: '50% 40% 30% 70% / 60% 50% 50% 40%', duration: 18, delay: 2 },
  { size: 250, x: '50%', y: '55%', color: 'rgba(236, 72, 153, 0.06)', rx: '60% 40% 50% 50% / 40% 50% 50% 60%', duration: 12, delay: 1 },
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
      {blobs.slice(0, isMobile ? 1 : 3).map((blob, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 40, -20, 30, 0],
            y: [0, -30, 40, -20, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
          }}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            borderRadius: blob.rx,
            background: blob.color,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 820 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span
            className="tag tag-purple"
            style={{ fontSize: '0.75rem', marginBottom: 20 }}
          >
            Enterprise AI Skills Engineer @ CHG Healthcare
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            color: '#1a1a2e',
          }}
        >
          Parker<br />Fawcett
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#6b6b80',
            maxWidth: 620,
            margin: '0 auto 12px',
            lineHeight: 1.7,
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
            fontSize: '0.85rem',
            color: '#9a9ab0',
            maxWidth: 600,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Herriman, UT &nbsp;·&nbsp; CHG Healthcare — Enterprise Data & AI &nbsp;·&nbsp; 512 tests, 83 files, zero-drift agentic tooling
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#case-studies" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
