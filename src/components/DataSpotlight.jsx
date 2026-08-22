import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const steps = [
  { label: 'Firecrawl API', desc: 'Gets past anti-scraping measures and returns clean markdown from competitor pages' },
  { label: 'Structured JSON', desc: 'Scraped content comes back as structured JSON tokens' },
  { label: 'Groq LLMs', desc: 'Groq turns the tokens into a finished brief with near-zero latency' },
]

export default function DataSpotlight() {
  const isMobile = useIsMobile()

  return (
    <section id="data-spotlight" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Data spotlight</p>
        <h2 className="section-title">
          From scrape to <span className="gradient-text">brief</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 28, alignItems: 'start' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="glass-card" style={{ padding: '34px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>Alvien</h3>
              <span className="tag tag-cyan" style={{ fontSize: '0.62rem' }}>B2B BI SaaS</span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 22 }}>
              Watches competitor domains and turns what it finds into structured strategic briefs, automatically.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {['Python', 'FastAPI', { label: 'Firecrawl API', colorClass: 'tag-cyan' }, { label: 'Groq LLMs', colorClass: 'tag-orange' }, 'TailwindCSS'].map((tech) => (
                <span key={typeof tech === 'string' ? tech : tech.label} className={`tag ${typeof tech === 'string' ? '' : tech.colorClass}`} style={{ fontSize: '0.63rem' }}>
                  {typeof tech === 'string' ? tech : tech.label}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href="https://alvien.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '9px 22px', fontSize: '0.75rem' }}
              >
                Live site
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="glass-card" style={{ padding: '34px 30px' }}>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 26 }}>
              Architecture flow
            </h4>

            <div style={{ position: 'relative' }}>
              {steps.map((step, i) => (
                <div key={step.label} style={{ display: 'flex', gap: 18 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 26 }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.5)',
                      boxShadow: '0 0 16px rgba(139, 92, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--accent-bright)',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{
                        width: 1,
                        flex: 1,
                        minHeight: 32,
                        background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.45), rgba(139, 92, 246, 0.08))',
                      }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < steps.length - 1 ? 24 : 0 }}>
                    <p style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{step.label}</p>
                    <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
