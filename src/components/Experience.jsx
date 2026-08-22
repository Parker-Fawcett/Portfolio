const experiences = [
  {
    role: 'AI Skills Engineer',
    org: 'CHG Healthcare, Enterprise Data & AI',
    period: 'June 2026 – Present',
    location: 'Division of 60+',
    highlights: [
      'Built a central repo of AI skills and configs so downstream teams stop drifting apart. Updates propagate to daughter repos automatically.',
      'Wrote Claude Code plugins around MCP servers, hooks, and sub-agents so the company taxonomy shows up in context while you code.',
      'Claude can now suggest relevant repo skills on its own and answer plain-English questions about them mid-task.',
      'Automated the data ingestion pipelines (Python, SQL, Snowflake), which let us drop manual PR review for the whole division.',
      'Promoted from intern to full-time AI engineer before junior year of high school, by the VP of Data & AI.',
    ],
  },
  {
    role: 'Freelance technical consultant',
    org: 'Upwork & independent clients',
    period: '2025 – Present',
    highlights: [
      'Design and build web apps, API integrations, and storefronts for SMB clients in several countries (React, Node.js).',
      "Rebuilt an apparel brand's social funnel around short video, which turned passive views into verified leads instead of bounce-offs.",
    ],
  },
  {
    role: 'Founder & managing director',
    org: 'Fawcett Capital LLC',
    period: '2024 – Present',
    highlights: [
      'An LLC that keeps financial reporting, compliance, and payments in one place across my ventures.',
      'Grew CatchAndTrade into a marketplace tracking 20k+ trading cards with sub-200ms queries, OCR scanning, and live grading.',
    ],
  },
]

const leadership = [
  {
    title: 'JATC & Cypress Credit Union Summit',
    role: 'Lead event coordinator',
    period: '2026 – Present',
    desc: 'Put together a district-wide entrepreneurship conference with Cypress Credit Union: hundreds of students, all logistics, branding, and budget handled by me.',
  },
  {
    title: 'Code Elevation',
    role: 'Founder & executive director',
    period: '2025 – 2026',
    desc: 'Started a coding competition that pulled in 30+ students. Pluralsight and CHG sponsored; $1,650 in prizes plus donated software licenses.',
  },
  {
    title: "Angel's Hands Foundation (501c3)",
    role: 'Head of digital marketing',
    period: '2025 – Present',
    desc: 'Handle digital marketing for a small non-profit. Mostly SEO and social, aimed at bringing in recurring donors.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-container">
      <p className="section-label">Background</p>
      <h2 className="section-title">Experience</h2>

      <div>
        {experiences.map((exp, i) => (
          <article
            key={exp.org}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 56px) minmax(0, 1fr)',
              gap: 20,
              padding: '32px 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--line)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--accent)',
                paddingTop: 4,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{exp.role}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: 2 }}>
                    {exp.org}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.06em',
                    color: 'var(--ink-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <ul style={{ listStyle: 'disc', paddingLeft: 18, display: 'grid', gap: 8 }}>
                {exp.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: '56px 0 8px', letterSpacing: '-0.01em' }}>
        Leadership &amp; ecosystem
      </h3>
      <div>
        {leadership.map((item, i) => (
          <div
            key={item.title}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 280px) minmax(0, 1fr)',
              gap: 24,
              padding: '22px 0',
              borderTop: i === 0 ? '1px solid var(--line)' : '1px solid var(--line)',
              alignItems: 'baseline',
            }}
            className="leadership-row"
          >
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.title}</p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.05em',
                  color: 'var(--ink-muted)',
                  marginTop: 4,
                  lineHeight: 1.7,
                }}
              >
                {item.role}
                <br />
                {item.period}
              </p>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: 1.65 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 56,
          background: 'var(--paper-raised)',
          border: '1px solid var(--line)',
          borderRadius: 4,
          padding: '28px 30px',
        }}
        className="edu-card"
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 18 }}>Education &amp; skills</h3>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 28 }}
          className="edu-grid"
        >
          <div>
            <p style={{ fontSize: '0.87rem', fontWeight: 600 }}>
              Herriman High School &amp; Jordan Applied Technology Center (JATC)
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Expected June 2028 · GPA 3.8
            </p>
            <p style={{ fontSize: '0.79rem', color: 'var(--ink-secondary)', marginTop: 10, lineHeight: 1.7 }}>
              AP Lang, AP World, AP Human Geo, plus concurrent enrollment at SLCC (AutoCAD,
              business fundamentals, personal finance). BYU faculty are using me as a case study
              for research on young people starting businesses and building automated systems.
            </p>
          </div>
          <div style={{ fontSize: '0.79rem', lineHeight: 1.9 }}>
            <p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginRight: 8,
                }}
              >
                Business:
              </span>
              <span style={{ color: 'var(--ink-secondary)' }}>
                GTM strategy, B2B sales, market research, Agile/Scrum, financial modeling
              </span>
            </p>
            <p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginRight: 8,
                }}
              >
                Stack:
              </span>
              <span style={{ color: 'var(--ink-secondary)' }}>
                Python, SQL, TypeScript, Next.js 14, React, Node.js, PostgreSQL, Snowflake, Redis
              </span>
            </p>
            <p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginRight: 8,
                }}
              >
                AI &amp; infra:
              </span>
              <span style={{ color: 'var(--ink-secondary)' }}>
                Claude Code, Groq AI, OpenRouter, RAG pipelines, Docker, Vercel, Supabase, Twilio, MCP
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .leadership-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
