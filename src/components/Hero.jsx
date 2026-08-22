const specRows = [
  { key: 'Role', value: 'AI Skills Engineer, CHG Healthcare' },
  { key: 'Base', value: 'Herriman, Utah' },
  { key: 'Focus', value: 'Agentic tooling, LLM migrations' },
  { key: 'Stack', value: 'Python Â· SQL Â· TypeScript Â· Next.js' },
  { key: 'Now', value: 'Paper under review at EMSE' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 110,
        paddingBottom: 64,
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: 14,
            marginBottom: 18,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-deep)',
              borderBottom: '2px solid var(--accent)',
              paddingBottom: 4,
            }}
          >
            Enterprise Data &amp; AI
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}
          >
            CHG Healthcare
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            fontSize: 'clamp(3.1rem, 10.5vw, 8rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.05em',
            marginBottom: 40,
            color: 'var(--ink)',
          }}
        >
          Parker<br />
          Fawcett<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 380px)',
            gap: 56,
            alignItems: 'end',
          }}
          className="hero-grid"
        >
          <div>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                color: 'var(--ink-secondary)',
                maxWidth: '46ch',
                marginBottom: 30,
                lineHeight: 1.7,
              }}
            >
              I build AI developer tooling at CHG Healthcare. Outside of that I run a few
              SaaS products, a holding company, and an open-source research project on
              how AI rebuilds of software go wrong.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
              <a href="#case-studies" className="btn btn-primary">
                See the work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in touch
              </a>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.05em',
                color: 'var(--ink-muted)',
              }}
            >
              Herriman, Utah Â· still in high school
            </p>
          </div>

          <aside
            aria-label="Quick facts"
            style={{
              background: 'var(--paper-raised)',
              border: '1px solid var(--line)',
              borderLeft: '3px solid var(--ink)',
              borderRadius: '0 4px 4px 0',
              padding: '20px 22px 12px',
            }}
          >
            {specRows.map((row) => (
              <div
                key={row.key}
                style={{
                  padding: '9px 0',
                  borderBottom: row.key !== 'Now' ? '1px solid var(--line)' : 'none',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: 2,
                  }}
                >
                  {row.key}
                </span>
                <span style={{ fontSize: '0.84rem', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.45 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
