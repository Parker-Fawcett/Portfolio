const steps = [
  { label: 'Firecrawl API', desc: 'Gets past anti-scraping measures and returns clean markdown from competitor pages' },
  { label: 'Structured JSON', desc: 'Scraped content comes back as structured JSON tokens' },
  { label: 'Groq LLMs', desc: 'Groq turns the tokens into a finished brief with near-zero latency' },
]

export default function DataSpotlight() {
  return (
    <section id="data-spotlight" className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">03 · Data spotlight</p>
      <h2 className="section-title">From scrape to brief</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
          gap: 56,
          alignItems: 'start',
        }}
        className="spotlight-grid"
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.01em' }}>Alvien</h3>
            <span className="tag">B2B BI SaaS</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.75, marginBottom: 18 }}>
            Watches competitor domains and turns what it finds into structured strategic
            briefs, automatically.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.03em',
              color: 'var(--ink-muted)',
              marginBottom: 22,
            }}
          >
            Python · FastAPI · Firecrawl · Groq · TailwindCSS
          </p>

          <a
            href="https://alvien.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--accent-deep)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              whiteSpace: 'nowrap',
            }}
          >
            Live site ↗
          </a>
        </div>

        <div>
          <h4
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              marginBottom: 18,
            }}
          >
            Architecture flow
          </h4>

          <ol style={{ listStyle: 'none', margin: 0 }}>
            {steps.map((step, i) => (
              <li
                key={step.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '34px minmax(0, 1fr)',
                  gap: 14,
                  paddingBottom: i < steps.length - 1 ? 26 : 0,
                  position: 'relative',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    borderRight: i < steps.length - 1 ? '1px solid var(--line-strong)' : 'none',
                    paddingRight: 12,
                    textAlign: 'right',
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 3 }}>{step.label}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .spotlight-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
