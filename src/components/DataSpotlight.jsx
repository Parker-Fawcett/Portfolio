const steps = [
  { label: 'Central taxonomy', desc: 'A single repo of AI skills and configs that every downstream daughter repo tracks — updates propagate automatically, drift disappears.' },
  { label: 'Plugin provisioning', desc: 'Claude Code plugins around MCP servers, hooks, and sub-agents inject the taxonomy into the editor while you code.' },
  { label: 'In-flow suggestion', desc: 'Claude suggests the right repo skills on its own and answers plain-English questions about them mid-task.' },
  { label: 'Auto-ingestion', desc: 'Python/SQL/Snowflake pipelines run ingestion without a human PR review bottleneck — the whole division stops waiting on reviews.' },
]

export default function DataSpotlight() {
  return (
    <section id="data-spotlight" className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">03 · How it works at CHG</p>
      <h2 className="section-title">The tooling flow</h2>

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
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.01em' }}>CHG Healthcare</h3>
            <span className="tag">Enterprise Data & AI</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.75, marginBottom: 18 }}>
            The work I do day-to-day: standardize how a 60+ person division writes, shares, and
            discovers AI-assisted development patterns — so ideas survive across repos instead of
            dying in one.
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
            Python · SQL · Snowflake · Claude Code · MCP · Hooks
          </p>

          <a
            href="https://www.chghealthcare.com"
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
            chghealthcare.com ↗
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
            How a skill reaches an engineer
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
