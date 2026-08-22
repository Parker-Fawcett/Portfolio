import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const colorMap = {
  purple: { border: 'rgba(139,92,246,0.5)', tag: 'tag-purple', bg: 'rgba(139,92,246,0.10)' },
  cyan: { border: 'rgba(34,211,238,0.4)', tag: 'tag-cyan', bg: 'rgba(34,211,238,0.08)' },
  green: { border: 'rgba(52,211,153,0.4)', tag: 'tag-green', bg: 'rgba(52,211,153,0.08)' },
  orange: { border: 'rgba(251,191,36,0.4)', tag: 'tag-orange', bg: 'rgba(251,191,36,0.08)' },
  pink: { border: 'rgba(244,114,182,0.4)', tag: 'tag-pink', bg: 'rgba(244,114,182,0.08)' },
}

export default function CaseStudyCard({ project, index, onViewDetails }) {
  const isMobile = useIsMobile()
  const c = colorMap[project.color] || colorMap.purple

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      className="card"
      onClick={() => onViewDetails(project)}
      style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          height: isMobile ? 130 : 175,
          background: c.bg,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {project.image ? (
          <img src={project.image} alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(circle at 50% 40%, ${c.border}, transparent 70%)`,
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.6rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.14)',
              letterSpacing: '-0.03em',
            }}>
              {project.name}
            </span>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7,7,13,0.55), transparent 50%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ padding: isMobile ? '18px 18px 22px' : '24px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            {project.name}
          </h3>
          <span className={`tag ${c.tag}`} style={{ fontSize: '0.58rem', whiteSpace: 'nowrap' }}>{project.type}</span>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 18, flex: 1 }}>
          {project.description.length > 140 && !isMobile
            ? project.description.slice(0, 140).trimEnd() + '…'
            : project.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.stack.slice(0, 4).map((tech) => (
              <span key={typeof tech === 'string' ? tech : tech.label} className={`tag ${typeof tech === 'string' ? '' : tech.colorClass || ''}`} style={{ fontSize: '0.58rem' }}>
                {typeof tech === 'string' ? tech : tech.label}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="tag" style={{ fontSize: '0.58rem' }}>+{project.stack.length - 4}</span>
            )}
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--accent-bright)',
            whiteSpace: 'nowrap',
          }}>
            View details →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
