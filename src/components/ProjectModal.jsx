import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const colorMap = {
  purple: { accent: '#a78bfa', bg: 'rgba(139,92,246,0.12)' },
  cyan: { accent: '#22d3ee', bg: 'rgba(34,211,238,0.10)' },
  green: { accent: '#34d399', bg: 'rgba(52,211,153,0.10)' },
  orange: { accent: '#fbbf24', bg: 'rgba(251,191,36,0.10)' },
  pink: { accent: '#f472b6', bg: 'rgba(244,114,182,0.10)' },
}

export default function ProjectModal({ project, onClose }) {
  const isMobile = useIsMobile()
  const c = colorMap[project.color] || colorMap.purple

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? 0 : 24,
          background: 'rgba(4, 4, 9, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : 740,
            maxHeight: isMobile ? '100vh' : '88vh',
            borderRadius: isMobile ? 0 : 24,
            overflowY: 'auto',
            background: 'var(--bg-raised)',
            border: `1px solid ${c.border || 'var(--border-strong)'}`,
            boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 60px ${c.bg}`,
          }}
        >
          <div
            style={{
              height: isMobile ? 160 : 230,
              background: c.bg,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {project.image ? (
              <img src={project.image} alt={project.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.12)',
                letterSpacing: '-0.03em',
              }}>
                {project.name}
              </span>
            )}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12,12,21,0.7), transparent 60%)',
              pointerEvents: 'none',
            }} />
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(12,12,21,0.7)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.3)'
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(12,12,21,0.7)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: isMobile ? '24px 20px 30px' : '32px 34px 38px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 10 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.65rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                {project.name}
              </h2>
              <span className="tag" style={{
                fontSize: '0.62rem',
                padding: '5px 14px',
                background: c.bg,
                color: c.accent,
                borderColor: c.accent,
                whiteSpace: 'nowrap',
              }}>{project.type}</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}>
              {project.description}
            </p>

            <div style={{ marginBottom: 28 }}>
              <h4 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                color: c.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 12,
              }}>
                Full tech stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.stack.map((tech) => (
                  <span key={typeof tech === 'string' ? tech : tech.label} className={`tag ${typeof tech === 'string' ? '' : tech.colorClass || ''}`}>
                    {typeof tech === 'string' ? tech : tech.label}
                  </span>
                ))}
              </div>
            </div>

            {project.architecture && (
              <div style={{ marginBottom: 28 }}>
                <h4 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: c.accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 12,
                }}>
                  Architecture & approach
                </h4>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 14,
                  padding: 22,
                  border: '1px solid var(--border)',
                }}>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 14 }}>
                    {project.architecture.summary}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {project.architecture.highlights.map((h, i) => (
                      <li key={i} style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        paddingLeft: 18,
                        position: 'relative',
                        marginBottom: 8,
                        lineHeight: 1.65,
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: c.accent, fontWeight: 700 }}>→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 32 }}>
              <h4 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                color: c.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 12,
              }}>
                Key metrics
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {project.metrics.map((m, i) => (
                  <li key={i} style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    paddingLeft: 18,
                    position: 'relative',
                    marginBottom: 9,
                    lineHeight: 1.65,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: c.accent, fontWeight: 700 }}>→</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.82rem', padding: '12px 28px', textAlign: 'center', justifyContent: 'center' }}
              >
                Visit live site
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '12px 28px', textAlign: 'center', justifyContent: 'center' }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
