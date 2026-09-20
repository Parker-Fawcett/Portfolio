import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    role: 'AI Skills Engineer',
    org: 'CHG Healthcare, Enterprise Data & AI',
    period: 'June 2026 – Present',
    location: 'Division of 60+',
    highlights: [
      'Architect AI-assisted enterprise automation pipelines that ingest job listings, enrich missing contact data across multiple sources, resolve ambiguous identities, validate required fields, and route qualified records into Salesforce workflows.',
      'Built a CareerMD lead-generation pipeline combining web extraction, multi-source enrichment, AI-assisted field/name resolution, deterministic validation, duplicate detection, and CRM decision logic; engineered for controlled dry-runs before live Salesforce writes.',
      'Develop Python/SQL data workflows and Snowflake integrations while translating ambiguous business requirements into production-oriented technical systems.',
      'Build internal AI tooling and automation used across the Enterprise Data & AI organization, collaborating through agile development and iterative deployment.',
      'Redesigned CareerMD lead-gen from manual Python research into automated n8n workflows and advanced web-scraping pipelines.',
      'Transitioned from summer internship into AI engineering role before junior year of high school.',
    ],
  },
  {
    role: 'Corporate Strategy & Operations Intern',
    org: 'CHG Healthcare',
    period: 'Summer 2026',
    highlights: [
      'Analyzed enterprise operations and cross-departmental data workflows to support strategic initiatives.',
      'Supported strategic and operational initiatives through research, analysis, and structured problem solving.',
      'Worked within a large healthcare-services organization while simultaneously developing independent software, research, and entrepreneurial projects.',
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
    role: 'Founder & Managing Director / Sole Member',
    org: 'Fawcett Capital LLC',
    period: 'May 2026 – Present',
    location: 'Herriman, UT',
    highlights: [
      'Founded and operate Fawcett Capital LLC as an umbrella venture entity for technology products, AI software, marketplaces, research infrastructure, and digital businesses; 100% ownership.',
      'Personally drafted the Operating Agreement establishing ownership structure, management framework, business purpose, distributions, capital contributions, amendment procedures, and management transition.',
      'Direct venture strategy, product development, technical execution, commercialization, and operations across the portfolio spanning AI software, SaaS, marketplaces, developer infrastructure, and digital commerce.',
      'Established manager-managed LLC structure with automatic transition to member-managed at age 18 and transfer of full signing and operational authority.',
    ],
  },
  {
    role: 'Associate',
    org: 'Five Below',
    period: '2025 – Present',
    highlights: [
      'Balance part-time retail employment with advanced coursework, enterprise AI engineering, independent research, and entrepreneurship.',
      'Recognized as Employee of the Month.',
      'Provide customer service, merchandising, store operations, and team support in a high-volume retail environment.',
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
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const chapters = section.querySelectorAll('[data-exp]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.exp))
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    chapters.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToExp = (i) => {
    const section = sectionRef.current
    if (!section) return
    const el = section.querySelector(`[data-exp="${i}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="experience" ref={sectionRef} className="section-container">
      <p className="section-label">01 · Background</p>
      <h2 className="section-title">Experience</h2>

      <div
        aria-label="Role progress"
        style={{
          position: 'sticky',
          top: 56,
          zIndex: 100,
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: '10px 0',
          marginBottom: 8,
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
          01 · Background
        </span>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {experiences.map((exp, i) => {
            const isActive = i === active
            return (
              <button
                key={exp.org}
                type="button"
                onClick={() => scrollToExp(i)}
                aria-label={`Go to ${exp.role}`}
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
                {String(i + 1).padStart(2, '0')}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        {experiences.map((exp, i) => (
          <article
            key={exp.org}
            data-exp={i}
            className="exp-chapter"
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
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{exp.role}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', letterSpacing: '0.03em', color: 'var(--ink-muted)', marginTop: 4 }}>
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
              Expected June 2028 · GPA 3.8 UW / 4.3 W
            </p>
            <p style={{ fontSize: '0.79rem', color: 'var(--ink-secondary)', marginTop: 10, lineHeight: 1.7 }}>
              AP Lang, AP World, AP Human Geo (4), plus concurrent enrollment at SLCC (AutoCAD,
              business fundamentals, personal finance).
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
        .exp-chapter { scroll-margin-top: 140px; }
        @media (max-width: 720px) {
          .rail-label { display: none; }
          .leadership-row { grid-template-columns: minmax(0, 1fr) !important; gap: 8px !important; }
          .edu-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
