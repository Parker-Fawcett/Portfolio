import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

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
    accent: '#a78bfa',
  },
  {
    role: 'Freelance technical consultant',
    org: 'Upwork & independent clients',
    period: '2025 – Present',
    highlights: [
      'Design and build web apps, API integrations, and storefronts for SMB clients in several countries (React, Node.js).',
      "Rebuilt an apparel brand's social funnel around short video, which turned passive views into verified leads instead of bounce-offs.",
    ],
    accent: '#22d3ee',
  },
  {
    role: 'Founder & managing director',
    org: 'Fawcett Capital LLC',
    period: '2024 – Present',
    highlights: [
      'An LLC that keeps financial reporting, compliance, and payments in one place across my ventures.',
      'Grew CatchAndTrade into a marketplace tracking 20k+ trading cards with sub-200ms queries, OCR scanning, and live grading.',
    ],
    accent: '#34d399',
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
  const isMobile = useIsMobile()
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Background</p>
        <h2 className="section-title">
          <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      <div style={{ position: 'relative', paddingLeft: isMobile ? 24 : 36, marginBottom: 72 }}>
        <div
          style={{
            position: 'absolute',
            left: isMobile ? 7 : 11,
            top: 8,
            bottom: 8,
            width: 1,
            background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(34,211,238,0.25), transparent)',
          }}
        />
        <div style={{ display: 'grid', gap: 24 }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: isMobile ? -24 : -36,
                  top: 26,
                  width: 15,
                  height: 15,
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: exp.accent,
                    boxShadow: `0 0 12px ${exp.accent}`,
                    margin: '3px auto',
                  }}
                />
              </div>

              <div className="card" style={{ padding: isMobile ? '22px 20px' : '30px 32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>{exp.role}</h3>
                    <p style={{ fontSize: '0.85rem', color: exp.accent, fontWeight: 600 }}>{exp.org}</p>
                    {exp.location && <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{exp.location}</p>}
                  </div>
                  <span className="tag" style={{ alignSelf: 'flex-start', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{exp.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exp.highlights.map((h, idx) => (
                    <li key={idx} style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', paddingLeft: 18, position: 'relative', marginBottom: 8, lineHeight: 1.65 }}>
                      <span style={{ position: 'absolute', left: 0, color: exp.accent, fontWeight: 700 }}>→</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 20, letterSpacing: '-0.02em', color: 'var(--text)' }}>Leadership & ecosystem</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16, marginBottom: 64 }}>
          {leadership.map((item) => (
            <div key={item.title} className="card" style={{ padding: '22px 20px' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{item.title}</p>
              <p style={{ fontSize: '0.71rem', color: 'var(--accent-bright)', fontWeight: 600, marginBottom: 8 }}>{item.role} · {item.period}</p>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{ padding: isMobile ? '24px 20px' : '30px 34px' }}
      >
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 18, color: 'var(--text)' }}>Education & skills</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>
          <div>
            <p style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--text)' }}>Herriman High School & Jordan Applied Technology Center (JATC)</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Expected June 2028 · GPA 3.8</p>
            <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.7 }}>AP Lang, AP World, AP Human Geo, plus concurrent enrollment at SLCC (AutoCAD, business fundamentals, personal finance). BYU faculty are using me as a case study for research on young people starting businesses and building automated systems.</p>
          </div>
          <div style={{ fontSize: '0.78rem', lineHeight: 1.8 }}>
            <p><strong style={{ color: 'var(--accent-bright)' }}>Business:</strong><span style={{ color: 'var(--text-secondary)' }}> GTM strategy, B2B sales, market research, Agile/Scrum, financial modeling</span></p>
            <p><strong style={{ color: 'var(--cyan)' }}>Stack:</strong><span style={{ color: 'var(--text-secondary)' }}> Python, SQL, TypeScript, Next.js 14, React, Node.js, PostgreSQL, Snowflake, Redis</span></p>
            <p><strong style={{ color: 'var(--green)' }}>AI & infra:</strong><span style={{ color: 'var(--text-secondary)' }}> Claude Code, Groq AI, OpenRouter, RAG pipelines, Docker, Vercel, Supabase, Twilio, MCP</span></p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
