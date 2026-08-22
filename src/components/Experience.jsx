import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const experiences = [
  {
    role: 'AI Skills Engineer',
    org: 'CHG Healthcare — Enterprise Data & AI',
    period: 'June 2026 – Present',
    location: 'Enterprise Division (60+ members)',
    highlights: [
      'Engineered centralized repository eliminating cross-repo drift; auto-provisioning updates to downstream daughter repos',
      'Architected context-aware plugins with MCP servers, automated hooks, and sub-agents integrating central taxonomy into dev workflow',
      'Enabled proactive skill suggestion: Claude answers natural-language queries and suggests relevant repo skills in real-time',
      'Automated data ingestion pipelines (Python, SQL, Snowflake) — eliminated manual human PR review bottleneck, exponential time savings',
      'Promoted from intern to full-time AI Engineer prior to junior year by VP of Data & AI',
    ],
    accent: '#a78bfa',
  },
  {
    role: 'Freelance Technical Consultant',
    org: 'Upwork & Independent Consulting',
    period: '2025 – Present',
    highlights: [
      'Architect and deploy custom web apps, API integrations, and e-commerce infra (React, Node.js) for international SMB clients',
      'Re-engineered social marketing funnel for apparel client — restructured video content, converted passive traffic to verified leads, mitigated attrition',
    ],
    accent: '#22d3ee',
  },
  {
    role: 'Founder & Managing Director',
    org: 'Fawcett Capital LLC',
    period: '2024 – Present',
    highlights: [
      'Holding entity centralizing financial reporting, compliance, and merchant processing for SaaS + e-commerce portfolio',
      'Venture scaling: CatchAndTrade marketplace — 20,000+ collectibles, sub-200ms queries, real-time grading + OCR',
    ],
    accent: '#34d399',
  },
]

const leadership = [
  { title: 'JATC & Cypress Credit Union Summit', role: 'Lead Event Coordinator', period: '2026 – Present', desc: 'District-wide entrepreneurship conference for hundreds of students — end-to-end logistics, branding, budgeting with Cypress Credit Union.' },
  { title: 'Code Elevation', role: 'Founder & Executive Director', period: '2025 – 2026', desc: 'Regional youth coding competition for 30+ participants. Sponsors: Pluralsight, CHG Healthcare. $1,650 prize pool + software licenses.' },
  { title: "Angel's Hands Foundation (501c3)", role: 'Head of Digital Marketing', period: '2025 – Present', desc: 'Core digital systems & omnichannel campaigns (SEO, social) accelerating recurring donor acquisition.' },
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
        <p className="section-label">Experience</p>
        <h2 className="section-title">
          Where I&apos;ve <span className="gradient-text">Built</span>
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
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 20, letterSpacing: '-0.02em', color: 'var(--text)' }}>Leadership & Ecosystem</h3>
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
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 18, color: 'var(--text)' }}>Education & Skills</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>
          <div>
            <p style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--text)' }}>Herriman High School & Jordan Applied Technology Center (JATC)</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Expected June 2028 · GPA 3.8</p>
            <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.7 }}>AP Language, AP World History, AP Human Geography; Concurrent Enrollment (SLCC: AutoCAD, Business Fundamentals, Personal Finance). BYU quantitative research case-study subject on youth pioneers in automated systems.</p>
          </div>
          <div style={{ fontSize: '0.78rem', lineHeight: 1.8 }}>
            <p><strong style={{ color: 'var(--accent-bright)' }}>Business</strong><span style={{ color: 'var(--text-secondary)' }}> — GTM Strategy, B2B Sales, Market Research, Agile/Scrum, Financial Modeling</span></p>
            <p><strong style={{ color: 'var(--cyan)' }}>Stack</strong><span style={{ color: 'var(--text-secondary)' }}> — Python, SQL, TypeScript, Next.js 14, React, Node.js, PostgreSQL, Snowflake, Redis</span></p>
            <p><strong style={{ color: 'var(--green)' }}>AI & Infra</strong><span style={{ color: 'var(--text-secondary)' }}> — Claude Code, Groq AI, OpenRouter, RAG Pipelines, Docker, Vercel, Supabase, Twilio, MCP</span></p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
