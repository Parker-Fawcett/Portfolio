import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    label: 'Web extraction',
    desc: 'Automated browser pipelines pull job listings from target sources — handles pagination, anti-bot challenges, and dynamic rendering.',
  },
  {
    label: 'Multi-source enrichment',
    desc: 'Missing contact data enriched across multiple providers (LinkedIn, Clearbit, proprietary databases) with waterfall fallbacks.',
  },
  {
    label: 'AI field/name resolution',
    desc: 'LLM-assisted disambiguation of ambiguous identities — resolves "John Smith" to correct record using context, org, role signals.',
  },
  {
    label: 'Deterministic validation',
    desc: 'Rule-based checks verify required fields (email format, phone normalization, territory mapping, license status) — zero LLM hallucination risk.',
  },
  {
    label: 'Duplicate detection',
    desc: 'Fuzzy matching on name/org/contact composite keys prevents duplicate Salesforce records — configurable threshold per source.',
  },
  {
    label: 'CRM decision logic',
    desc: 'Routing rules assign ownership, set lead status, trigger sequences, and enrich campaign metadata before write.',
  },
  {
    label: 'Controlled dry-run',
    desc: 'Full pipeline executes against staging; diff report shows creates/updates/skips with reasons — human approval gate before live.',
  },
  {
    label: 'Salesforce commit',
    desc: 'Approved batch writes via Bulk API v2 with idempotency keys; audit log captures payload, decision, and operator per record.',
  },
]

export default function DataSpotlight() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const visibleRef = useRef(new Set())

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const chapters = section.querySelectorAll('[data-step]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = Number(entry.target.dataset.step)
          if (entry.isIntersecting) visibleRef.current.add(i)
          else visibleRef.current.delete(i)
        })
        // Steps are compact — several can be visible at once. Current is
        // the furthest one reached, not whichever entry fired last.
        if (visibleRef.current.size > 0) setActive(Math.max(...visibleRef.current))
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    chapters.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToStep = (i) => {
    const section = sectionRef.current
    if (!section) return
    const el = section.querySelector(`[data-step="${i}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="data-spotlight" ref={sectionRef} className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">03 · How it works at CHG</p>
      <h2 className="section-title">The tooling flow</h2>

      <div
        aria-label="Flow progress"
        style={{
          position: 'sticky',
          top: 56,
          zIndex: 100,
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: '10px 0',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            whiteSpace: 'nowrap',
          }}
          className="rail-label"
        >
          03 · The tooling flow
        </span>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {steps.map((step, i) => {
            const isActive = i === active
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => scrollToStep(i)}
                aria-label={`Go to ${step.label}`}
                aria-current={isActive ? 'true' : undefined}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--accent-deep)' : 'var(--ink-muted)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>

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
                data-step={i}
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
          .rail-label { display: none; }
          .spotlight-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
