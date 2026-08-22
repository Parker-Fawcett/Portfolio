const specRows = [
  { key: 'Role', value: 'AI Skills Engineer, CHG Healthcare' },
  { key: 'Base', value: 'Herriman, Utah' },
  { key: 'Focus', value: 'Agentic tooling, LLM migrations' },
  { key: 'Stack', value: 'Python · SQL · TypeScript · Next.js · Claude Code' },
  { key: 'Now', value: 'Rebuild Dossier paper under review at EMSE' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 72,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 64,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              marginBottom: 20,
            }}
          >
            Enterprise Data &amp; AI · CHG Healthcare
          </p>

          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.4rem)',
              fontWeight: 650,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              marginBottom: 22,
              color: 'var(--ink)',
            }}
          >
            Parker Fawcett
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.12rem)',
              color: 'var(--ink-secondary)',
              maxWidth: '54ch',
              marginBottom: 32,
              lineHeight: 1.7,
            }}
          >
            I build AI developer tooling at CHG Healthcare. Outside of that I run a few
            SaaS products, a holding company, and an open-source research project on
            how AI rebuilds of software go wrong.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
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
            Herriman, Utah · still in high school
          </p>
        </div>

        <aside
          aria-label="Quick facts"
          style={{
            background: 'var(--paper-raised)',
            border: '1px solid var(--line)',
            borderRadius: 4,
            padding: '26px 26px 18px',
          }}
        >
          {specRows.map((row) => (
            <div
              key={row.key}
              style={{
                display: 'grid',
                gridTemplateColumns: '84px minmax(0, 1fr)',
                gap: 16,
                padding: '10px 0',
                borderBottom: row.key !== 'Now' ? '1px solid var(--line)' : 'none',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                {row.key}
              </span>
              <span style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                {row.value}
              </span>
            </div>
          ))}
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
