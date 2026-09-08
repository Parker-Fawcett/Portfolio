import { useEffect, useRef, useState } from 'react'
import CaseStudyChapter from './CaseStudyChapter'
import ProjectModal from './ProjectModal'

const projects = [
  {
    name: 'Rebuild Dossier',
    type: 'Open-source research',
    statement: 'Lock the contract before the model.',
    image: '/images/rebuild-dossier.webp',
    description:
      'An MCP server that reverse-engineers a locked rebuild spec (CLAUDE.md, .claude/ config, mutation-tested tests) from an existing app, so any coding agent can rebuild it cleanly against that spec instead of guessing. 512 tests across 83 test files. The 48-page paper is on arXiv (2608.23616) and submitted to Empirical Software Engineering.',
    stack: ['TypeScript', 'ts-morph AST', 'Playwright', 'Mutation testing', 'Vitest', 'MCP'],
    metrics: [
      'Prior research scored 0% behavioral equivalence with no feedback loop (arXiv:2605.17535); this tool locks contracts before tests to close that gap',
      '512 unit tests across 83 test files act as executable specs, so model drift shows up as hard failures instead of quiet regressions',
      'Negative results published too — cases where enforcement failed to beat a single-prompt baseline',
    ],
    architecture: {
      summary: 'Ships as an MCP server: point it at a repo and it reverse-engineers a locked CLAUDE.md, .claude/ config, and mutation-tested suite. It deliberately does not rebuild the app — it produces the spec a coding agent consumes. The paper is "Mechanically-enforced specs for agentic app rebuilds, and what model-tier failures reveal", sole-authored after an arXiv endorsement from Presset Lutz.',
      highlights: [
        'AST-based mutations check behavioral equivalence without corrupting the source under test',
        'Playwright replays end-to-end flows against the enforced contracts',
        'When a higher-tier model gets something structurally wrong, tests catch it as a failure rather than letting it slide',
        'Benchmark pipeline is built to scale up to larger models and longer tasks',
        'MIT licensed, maintained solo',
      ],
    },
    liveUrl: 'https://github.com/Parker-Fawcett/rebuild-dossier',
    githubUrl: 'https://github.com/Parker-Fawcett/rebuild-dossier',
    links: [
      { label: 'Findings', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/blob/master/docs/v0-findings.md' },
      { label: 'Tests', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/master/test' },
      { label: 'Mutators', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/master/src/mutation/mutators' },
      { label: 'arXiv paper', href: 'https://arxiv.org/abs/2608.23616' },
      { label: 'DOI', href: 'https://doi.org/10.5281/zenodo.22036801' },
    ],
  },
  {
    name: 'Skora',
    type: 'B2B SaaS',
    statement: 'Enterprise outbound at zero marginal cost.',
    image: '/images/skora.webp',
    description:
      'College-counseling software I co-founded (CEO): free admissions tools for students, paid workflow and white-label infrastructure for counselors. 80+ API endpoints over Postgres, admissions analysis on College Scorecard/IPEDS data. Project Hermes, the outbound engine, covers about 95% of what $3K to $15K/mo enterprise platforms do at zero marginal cost. Incubated at JATC after a blind pitch.',
    stack: ['Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM', 'Clerk Auth', 'Redis', 'Groq AI', 'Stripe'],
    metrics: [
      '80+ API endpoints with counselor workflows, usage controls, and end-to-end Stripe billing ($49–$199/mo tiers)',
      'Hermes validates every contact through a 4-provider waterfall and rotates 26 outreach angles, CAN-SPAM compliant',
      'Counselor-in-the-loop essay review grounded in federal admissions data, not vibes',
    ],
    architecture: {
      summary: 'Next.js on serverless Postgres, Redis for hot paths, Groq for fast drafting. Hermes handles outbound: enrichment waterfall, angle rotation, compliance.',
      highlights: [
        'Drizzle ORM against Neon Postgres, typed queries end to end',
        'Clerk handles multi-tenant auth with org-level access control',
        'Redis caches counselor-student data',
        'Groq powers low-latency message drafting',
        'Three Stripe tiers ($49/$99/$199) with per-plan feature gating',
      ],
    },
    liveUrl: 'https://skoraadmit.com',
    githubUrl: null, // repo private by design
    links: [
      { label: 'hermes-agent', href: 'https://github.com/Parker-Fawcett/hermes-agent' },
    ],
  },
  {
    name: 'CatchAndTrade',
    type: 'Marketplace',
    statement: '20,078 cards. One catalog.',
    image: '/images/catch-and-trade.webp',
    description:
      'Trading-card marketplace under Fawcett Capital, my holding company. A public catalog of 20,000+ collectibles on composite indexes and materialized views, plus client-side OCR scanning for grading physical cards.',
    stack: ['Next.js', 'React', 'Supabase PostgreSQL', 'Tesseract.js OCR', 'Google OAuth', 'TailwindCSS'],
    metrics: [
      'Public catalog of 20,000+ unique collectibles with pricing intelligence',
      'Composite indexes plus denormalized price snapshots keep lookups fast',
      'OCR runs client-side, so scanning physical cards costs nothing server-side',
    ],
    architecture: {
      summary: 'Monorepo: Next.js in front, Supabase underneath. Most of the work went into the schema, which models the TCG domain specifically.',
      highlights: [
        'Strategic indexing and materialized views keep card lookups fast',
        'Tesseract.js runs entirely in the browser',
        'Schema covers cards, variants, condition grading, and price history',
        'Google OAuth with rate-limited API access',
        '370+ public commits of sustained development',
      ],
    },
    liveUrl: 'https://catchandtrade.com',
    githubUrl: 'https://github.com/Parker-Fawcett/catchandtrade',
  },
  {
    name: 'MyNexusAI',
    type: 'AI SaaS',
    statement: 'An AI receptionist with paying users.',
    image: '/images/mynexusai.webp',
    description:
      'An AI receptionist that handles voice and text support channels automatically. Live in production with paying users.',
    stack: ['Node.js', 'pgvector', 'ChromaDB', 'OpenRouter API', 'Twilio Voice/SMS', 'ElevenLabs', 'AssemblyAI'],
    metrics: [
      'RAG pipeline grounds answers in domain knowledge instead of guessing',
      'Multi-model fallback through OpenRouter keeps uptime at 100%',
      'Tiered plans from $29 to $299/mo',
    ],
    architecture: {
      summary: 'Hybrid vector search feeds a routing layer that switches LLM providers instantly when one fails.',
      highlights: [
        'pgvector plus ChromaDB cover hybrid search across knowledge bases',
        'OpenRouter routes around provider outages automatically',
        'Twilio carries inbound and outbound voice/SMS',
        'ElevenLabs does voices, AssemblyAI does transcription',
        'Usage limits per tier ($29/$99/$299)',
      ],
    },
    liveUrl: 'https://mynexusai.org',
    githubUrl: 'https://github.com/Parker-Fawcett/mynexusai-support',
  },
  {
    name: 'Alvien',
    type: 'B2B BI SaaS',
    statement: 'Point at a competitor. Get the brief.',
    image: '/images/alvien.webp',
    description:
      'Point it at a competitor site and get back a structured strategic brief. Scraping and summarization run automatically.',
    stack: ['Python', 'FastAPI', 'Firecrawl API', 'Groq LLMs', 'TailwindCSS'],
    metrics: [
      'Firecrawl pulls competitor pages even behind anti-scraping protections',
      'Raw HTML comes back as structured JSON tokens for the LLM',
      'Briefs generate in near real time',
    ],
    architecture: {
      summary: 'Small Python/FastAPI backend running a two-stage pipeline: Firecrawl scrapes, Groq writes the brief.',
      highlights: [
        'Firecrawl handles anti-bot measures and returns semantic markdown',
        'Groq converts scraped data into briefs in seconds',
        'Async endpoints run concurrent scraping jobs cheaply',
        'Re-scrapes are idempotent, so updates never duplicate rows',
        'Output lands ready for dashboards or downstream analytics',
      ],
    },
    liveUrl: 'https://alvien.onrender.com',
    githubUrl: 'https://github.com/Parker-Fawcett/alvien',
  },
  {
    name: 'Code Elevation',
    type: 'Youth tech initiative',
    statement: 'Thirty students. Real engineering.',
    image: '/images/code-elevation.webp',
    description:
      'A coding competition I ran for high schoolers in my area, built to feel like real software engineering rather than a school club.',
    stack: ['Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM', 'Cold outreach', 'Sponsorship'],
    metrics: [
      '30+ participants, ages 13–17',
      'Pluralsight and CHG Healthcare signed on as sponsors after cold outreach',
      '$1,650 prize pool plus donated software licenses',
    ],
    architecture: {
      summary: 'I handled everything: event ops, the website, sponsor relationships, and a live walkthrough of a production Next.js/Postgres stack during the event.',
      highlights: [
        'Built the event site on Next.js, Neon Postgres, and Drizzle for registration',
        'Cold outreach landed Pluralsight and CHG Healthcare as headline sponsors',
        'Managed the $1,650 pool and license donations from partners',
        'Presented a full-stack architecture demo live during the hackathon',
        'Connected students to workflows they would hit in real jobs',
      ],
    },
    liveUrl: 'https://codeelevation.org',
    githubUrl: null,
  },
]

// Smaller public experiments. Per-repo deep links pending the link bank —
// the section links the profile until exact slugs are confirmed.
const artifacts = [
  { name: 'Skill-Drift', desc: 'Classifies AI-agent skill changes as cosmetic, risk-relevant, or undeterminable — drift vs. danger.', stack: 'Python · LLM eval' },
  { name: 'Message', desc: 'End-to-end encrypted messaging on X3DH + Double Ratchet via WebCrypto, with forward secrecy.', stack: 'WebCrypto · applied crypto' },
  { name: 'Ai-Startup-funny', desc: 'One prompt, one autonomous agent, one startup — then an audit of what it actually built.', stack: 'Agent experiment' },
  { name: 'Depop', desc: 'Android marketplace client on Supabase with Apify-powered scanning.', stack: 'Android · Supabase' },
  { name: 'Totally-Normal', desc: 'A website generated entirely from a Whitespace program.', stack: 'Esolang' },
]

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const chapters = section.querySelectorAll('[data-chapter]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.chapter))
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    chapters.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToChapter = (i) => {
    const section = sectionRef.current
    if (!section) return
    const el = section.querySelector(`[data-chapter="${i}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="case-studies" ref={sectionRef} className="section-container">
      <p className="section-label">02 · Projects</p>
      <h2 className="section-title">Selected work</h2>

      <div
        aria-label="Chapter progress"
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
          02 · Selected work
        </span>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {projects.map((p, i) => {
            const isActive = i === active
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => scrollToChapter(i)}
                aria-label={`Go to ${p.name}`}
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
                0.{i + 1}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--line)' }}>
        {projects.map((project, i) => (
          <CaseStudyChapter
            key={project.name}
            project={project}
            index={i}
            flip={i % 2 === 1}
            onViewDetails={setSelectedProject}
          />
        ))}
      </div>

      <div style={{ marginTop: 64 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            More artifacts
          </h3>
          <a
            href="https://github.com/Parker-Fawcett"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-deep)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Full source on GitHub ↗
          </a>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 16 }}>
          Smaller public experiments — each one built to answer a single question.
        </p>
        <div style={{ borderBottom: '1px solid var(--line)' }}>
          {artifacts.map((a) => (
            <div
              key={a.name}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 220px) minmax(0, 1fr) auto',
                gap: 20,
                alignItems: 'baseline',
                padding: '16px 0',
                borderTop: '1px solid var(--line)',
              }}
              className="artifact-row"
            >
              <p style={{ fontSize: '0.92rem', fontWeight: 600 }}>{a.name}</p>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{a.desc}</p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.04em',
                  color: 'var(--ink-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {a.stack}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <style>{`
        @media (max-width: 720px) {
          .rail-label { display: none; }
          .artifact-row { grid-template-columns: minmax(0, 1fr) !important; gap: 4px !important; }
        }
      `}</style>
    </section>
  )
}
