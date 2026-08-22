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
    accent: '#7c3aed',
  },
  {
    role: 'Freelance Technical Consultant',
    org: 'Upwork & Independent Consulting',
    period: '2025 – Present',
    highlights: [
      'Architect and deploy custom web apps, API integrations, and e-commerce infra (React, Node.js) for international SMB clients',
      'Re-engineered social marketing funnel for apparel client — restructured video content, converted passive traffic to verified leads, mitigated attrition',
    ],
    accent: '#06b6d4',
  },
  {
    role: 'Founder & Managing Director',
    org: 'Fawcett Capital LLC',
    period: '2024 – Present',
    highlights: [
      'Holding entity centralizing financial reporting, compliance, and merchant processing for SaaS + e-commerce portfolio',
      'Venture scaling: CatchAndTrade marketplace — 20,000+ collectibles, sub-200ms queries, real-time grading + OCR',
    ],
    accent: '#10b981',
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
        <h2 className="section-title">Where I&apos;ve Built</h2>
      </motion.div>

      <div style={{ display: 'grid', gap: 20, marginBottom: 56 }}>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card"
            style={{ padding: isMobile ? '20px 18px' : '28px 28px', borderLeft: `6px solid ${exp.accent}` }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{exp.role}</h3>
                <p style={{ fontSize: '0.85rem', color: exp.accent, fontWeight: 600 }}>{exp.org}</p>
                {exp.location && <p style={{ fontSize: '0.75rem', color: '#9a9ab0' }}>{exp.location}</p>}
              </div>
              <span className="tag" style={{ alignSelf: 'flex-start', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{exp.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {exp.highlights.map((h, idx) => (
                <li key={idx} style={{ fontSize: '0.82rem', color: '#4a4a5e', paddingLeft: 16, position: 'relative', marginBottom: 6, lineHeight: 1.6 }}>
                  <span style={{ position: 'absolute', left: 0, color: exp.accent, fontWeight: 700 }}>→</span>{h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>Leadership & Ecosystem</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16, marginBottom: 56 }}>
          {leadership.map((item) => (
            <div key={item.title} className="card" style={{ padding: '18px 16px' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>{item.title}</p>
              <p style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600, marginBottom: 4 }}>{item.role} · {item.period}</p>
              <p style={{ fontSize: '0.76rem', color: '#6b6b80', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ padding: isMobile ? '20px 18px' : '24px 28px', background: '#faf7f2' }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>Education & Skills</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Herriman High School & Jordan Applied Technology Center (JATC)</p>
            <p style={{ fontSize: '0.75rem', color: '#6b6b80' }}>Expected June 2028 · GPA 3.8</p>
            <p style={{ fontSize: '0.75rem', color: '#6b6b80', marginTop: 6, lineHeight: 1.6 }}>AP Language, AP World History, AP Human Geography; Concurrent Enrollment (SLCC: AutoCAD, Business Fundamentals, Personal Finance). BYU quantitative research case-study subject on youth pioneers in automated systems.</p>
          </div>
          <div style={{ fontSize: '0.76rem', color: '#4a4a5e', lineHeight: 1.7 }}>
            <p><strong>Business:</strong> GTM Strategy, B2B Sales, Market Research, Agile/Scrum, Financial Modeling</p>
            <p><strong>Stack:</strong> Python, SQL, TypeScript, Next.js 14, React, Node.js, PostgreSQL, Snowflake, Redis</p>
            <p><strong>AI & Infra:</strong> Claude Code, Groq AI, OpenRouter, RAG Pipelines, Docker, Vercel, Supabase, Twilio, MCP</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
