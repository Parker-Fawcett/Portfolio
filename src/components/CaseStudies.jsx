import { useEffect, useRef, useState } from 'react'
import { motion as fm, useReducedMotion } from 'framer-motion'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

// Play-then-lock phase: a snap section that plays its entrance animation
// on arrival, settles, and releases. Statement and figure each get a
// different reveal variant, cycling per chapter so the scroll never
// repeats the same trick. Condensed content (statement + top-3 proof +
// before/after + figure) because full chapters exceed 100vh — complete
// metrics live in the Details modal.
const STMT_VARIANTS = ['center', 'wipe', 'left', 'zoom']
const FIG_VARIANTS = ['right', 'zoom', 'center', 'wipe']

// Metrics proof-points stagger in one line after another, same ease as
// the Hero name, instead of popping in all at once.
function MetricsList({ metrics, accent, play }) {
  const Ul = play ? fm.ul : 'ul'
  const Li = play ? fm.li : 'li'
  return (
    <Ul
      style={{ listStyle: 'none', display: 'grid', gap: 8, marginBottom: 20 }}
      {...(play
        ? {
            initial: 'hidden',
            whileInView: 'show',
            viewport: { once: true, margin: '-10% 0px' },
            variants: { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } },
          }
        : {})}
    >
      {metrics.slice(0, 3).map((m, i) => (
        <Li
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 22px) minmax(0, 1fr)',
            gap: 8,
            fontSize: '0.84rem',
            color: 'var(--ink-secondary)',
            lineHeight: 1.55,
          }}
          {...(play
            ? {
                variants: {
                  hidden: { opacity: 0, x: -14 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                },
              }
            : {})}
        >
          <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', color: accent, fontWeight: 600 }}>
            ✓
          </span>
          <span>{m}</span>
        </Li>
      ))}
    </Ul>
  )
}

function SnapPhase({ project, index, flip, motion, onViewDetails }) {
  const marker = `0.${index + 1}`
  const host = project.liveUrl.replace('https://', '').replace('http://', '')
  const accent = project.accent || 'var(--accent-deep)'

  return (
    <article
      aria-label={`${project.name} case study`}
      data-chapter={index}
      className="chapter"
      style={{
        borderTop: '1px solid var(--line)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '96px 0 72px',
        scrollSnapAlign: motion ? 'start' : 'none',
      }}
    >
      <div
        className="chapter-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: project.image
            ? 'minmax(0, 1.02fr) minmax(0, 0.98fr)'
            : 'minmax(0, 1fr)',
          gap: 56,
          alignItems: 'center',
          width: '100%',
          direction: flip ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ direction: 'ltr', minWidth: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            <span style={{ color: accent }}>[{marker}]</span>
            <span style={{ color: 'var(--ink-muted)' }}> · {project.type}</span>
          </p>
          <Reveal variant={STMT_VARIANTS[index % 4]}>
            <h3
              style={{
                fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                color: 'var(--ink)',
                marginBottom: 16,
                textWrap: 'balance',
              }}
            >
              {project.statement}
            </h3>
          </Reveal>
          <MetricsList metrics={project.metrics} accent={accent} play={motion} />
          <Reveal delay={0.2} variant="wipe">
            {project.beforeAfter && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'var(--paper-raised)',
                  marginBottom: 20,
                }}
                className="before-after"
              >
                {[
                  { tabLabel: project.beforeAfter.leftLabel, body: project.beforeAfter.leftBody },
                  { tabLabel: project.beforeAfter.rightLabel, body: project.beforeAfter.rightBody },
                ].map((cell, ci) => (
                  <div
                    key={cell.tabLabel}
                    style={{
                      padding: '14px 16px',
                      borderLeft: ci === 1 ? '1px solid var(--line-strong)' : 'none',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: ci === 1 ? accent : 'var(--ink-muted)',
                        marginBottom: 6,
                      }}
                    >
                      {cell.tabLabel}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                      {cell.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Visit live site
              </a>
              <button
                type="button"
                onClick={() => onViewDetails(project)}
                className="btn btn-secondary"
                style={{ cursor: 'pointer' }}
              >
                Details +
              </button>
            </div>
          </Reveal>
        </div>
        {project.image && (
          <Reveal delay={0.12} variant={FIG_VARIANTS[index % 4]} style={{ direction: 'ltr', minWidth: 0 }}>
            <figure style={{ margin: 0 }}>
              <div
                style={{
                  border: '1px solid var(--line-strong)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'var(--paper-raised)',
                }}
              >
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  loading="lazy"
                  style={{ width: '100%', maxHeight: '46vh', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }}
                />
                <figcaption
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '10px 14px',
                    borderTop: '1px solid var(--line)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.04em',
                    color: 'var(--ink-muted)',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {host} ↗
                  </span>
                  <span aria-hidden="true" style={{ color: accent }}>FIG. {marker}</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        )}
      </div>
    </article>
  )
}

const projects = [
  {
    name: 'When AUC Survives but Portfolios Do Not',
    type: 'Quantitative finance research',
    statement: 'Aggregate accuracy ≠ decision stability.',
    accent: '#16307f',
    image: '/images/auc.webp',
    description:
      'Independent quantitative research auditing predictive multiplicity and the mathematical disconnect between aggregate classification accuracy and decision-level portfolio stability. Modeled cross-sectional equity probability distributions across 188 monthly decisions spanning a dynamic 200-stock U.S. equity universe. A controlled validation-leakage ablation demonstrated that a marginal 0.002 shift in test AUC (0.553 to 0.551) destabilized the investment boundary, replacing 61.1% of the portfolio (mean Jaccard overlap 0.389).',
    stack: ['Python', 'Fama-French 5-factor + Carhart', 'Newey-West', 'Moving-block bootstrap', 'Deflated Sharpe', 'QuantConnect'],
    metrics: [
      '188 monthly cross-sectional decisions across 200-stock universe',
      'AUC drop of 0.002 triggered 61.1% portfolio turnover (Jaccard 0.389)',
      'Fama-French 5-factor + momentum with Newey-West (3 lags) for heteroskedasticity/autocorrelation',
      '5,000-iteration moving-block bootstraps; Deflated Sharpe across N=12 and N=38 trial sets correcting for skew (+0.417) and kurtosis (3.94)',
      'Time-series reconciliation: 0.933 monthly return correlation (R²=0.871) vs QuantConnect cloud execution',
      'Cryptographic provenance pipeline (paper_provenance.py) locks every table, cache, and seed to SHA-256 manifest',
    ],
    beforeAfter: {
      leftLabel: 'What the metric says',
      leftBody: 'AUC 0.553 → 0.551. A 0.002 shift — statistical noise by any standard gate. The model passes.',
      rightLabel: 'What the portfolio does',
      rightBody: '61.1% of holdings replaced. Mean Jaccard overlap 0.389 — a different portfolio wearing the same score.',
    },
    architecture: {
      summary: 'The paper demonstrates that standard ML evaluation (AUC) can survive while the actual portfolio decisions collapse. Separates true signal from market anomalies via factor regressions, validates return stability against resampling uncertainty with Deflated Sharpe Ratios controlling for data-mining bias, and proves local calculations replicate against QuantConnect. All stochastic seeds and computations locked in an immutable SHA-256 provenance manifest.',
      highlights: [
        'Predictive multiplicity: identical AUC masks radically different portfolio compositions',
        'Factor regressions isolate alpha from known anomalies (FF5 + Carhart, Newey-West SEs)',
        'Bootstrap + Deflated Sharpe corrects for multiple-testing and non-normal returns',
        'QuantConnect replication validates no silent calculation drift (R²=0.871)',
        'paper_provenance.py emits SHA-256 manifest for full computational reproducibility',
        'SSRN Abstract 7468682; companion repo at github.com/Parker-Fawcett/Stock',
      ],
    },
    liveUrl: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682',
    githubUrl: 'https://github.com/Parker-Fawcett/Stock',
    links: [
      { label: 'SSRN paper', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682' },
      { label: 'Companion repo', href: 'https://github.com/Parker-Fawcett/Stock' },
    ],
  },
  {
    name: 'Skora',
    type: 'B2B SaaS · Co-founder, CEO',
    statement: 'I started a company that tells students where they actually stand.',
    accent: '#8c2f2f',
    image: '/images/skora.webp',
    description:
      'College-admissions company I co-founded and run as CEO. Students get free tools to see their real admission chances, match with colleges, and improve their essays. Counselors pay for tools to manage their students and offer Skora under their own brand. Admissions estimates are built on U.S. Department of Education data. Incubated at JATC after a blind pitch.',
    stack: ['Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM', 'Clerk Auth', 'Redis', 'Groq AI', 'Stripe'],
    metrics: [
      'Free for students: real admission chances, college matches, and essay feedback. Pro is $19 a month.',
      'Counselors pay $49, $99, or $199 a month to manage their students and offer Skora under their own brand.',
      'Co-founded and run as CEO. Incubated at JATC after a blind pitch.',
    ],
    beforeAfter: {
      leftLabel: 'For students',
      leftBody: 'Free to start. See your real chances at each college, get matched to schools, and make your essays stronger.',
      rightLabel: 'For counselors',
      rightBody: 'Plans from $49 to $199 a month to manage students and run Skora under your own brand.',
    },
    architecture: {
      summary: 'Next.js on serverless Postgres, Redis for hot paths, Groq for fast drafting, Stripe for billing.',
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
  },
  {
    name: 'Fawcett Capital LLC',
    type: 'Holding company / Venture entity',
    statement: 'One holding company. Five ventures.',
    accent: '#1e6b3c',
    description:
      'Utah domestic LLC (formed May 2026) serving as an umbrella venture entity for technology products, AI software, marketplaces, research infrastructure, and digital businesses. 100% ownership. Personally drafted the Operating Agreement establishing ownership structure, management framework, business purpose, distributions, capital contributions, amendment procedures, and management transition. Manager-managed structure transitions automatically to member-managed at age 18 with full signing and operational authority vesting in the Member.',
    stack: ['LLC formation', 'Operating Agreement', 'Venture strategy', 'Portfolio management'],
    metrics: [
      'Utah LLC formed May 2026 — active entity',
      '100% ownership / sole Member',
      'Operating Agreement drafted by founder',
      'Manager-managed → member-managed auto-transition at age 18',
      'Ventures span AI software, SaaS, marketplaces, developer infrastructure, digital commerce',
    ],
    architecture: {
      summary: 'Fawcett Capital LLC centralizes financial reporting, compliance, and payments across the venture portfolio. The Operating Agreement establishes governance, distributions, capital contributions, amendments, and dissolution procedures. Directs venture strategy, product development, technical execution, commercialization, and operations across portfolio companies including Skora, CatchAndTrade, Alvien, MyNexusAI, and research infrastructure.',
      highlights: [
        'Centralized legal/financial structure for multi-venture portfolio',
        'Operating Agreement covers ownership, management, distributions, capital, amendments, dissolution',
        'Automatic governance transition at age 18 (manager-managed → member-managed)',
        'Full signing/operational authority vests in Member at transition',
        'Ventures: Skora (B2B2C SaaS), CatchAndTrade (marketplace), Alvien (BI), MyNexusAI (AI SaaS), research infra',
      ],
    },
    liveUrl: 'https://github.com/Parker-Fawcett',
    githubUrl: 'https://github.com/Parker-Fawcett',
    links: [
      { label: 'Utah Corp. record', href: 'https://secure.utah.gov/bes/' },
    ],
  },
  {
    name: 'Rebuild Dossier',
    type: 'Open-source developer tooling',
    statement: 'Record what the app does before the AI rebuilds it.',
    accent: '#1f44c8',
    image: '/images/rebuild-dossier.webp',
    description:
      'An open-source tool that records how an existing app behaves, then gives a coding agent a spec and tests to rebuild from. The tool itself has 669 tests across 94 files. The paper and evaluation artifacts are public on arXiv and GitHub, including cases where passing tests missed important behavior.',
    stack: ['TypeScript', 'ts-morph AST', 'Playwright', 'Mutation testing', 'Vitest', 'MCP'],
    metrics: [
      'Open-source tool that records how an existing app behaves, so an AI coding agent has a spec to rebuild from.',
      '669 tests across 94 files check the tool itself, and the tests it generates are checked by deliberately breaking the code.',
      'Published as a research paper on arXiv, including the cases where passing tests still missed real problems.',
    ],
    architecture: {
      summary: 'Ships as an MCP server: point it at an Express or Next.js app and it creates a locked specification, tool configuration, and tests for a separate coding agent to use. The paper evaluates where that workflow helps and where generated tests fail to establish behavioral fidelity.',
      highlights: [
        'Mutation checks whether generated tests detect deliberate changes to the original code',
        'Playwright captures reachable routes and page content when browser evidence is available',
        'A separate requirements check found behavioral gaps even when every visible test passed',
        'Per-run outputs and evaluation scripts are archived for inspection',
        'MIT licensed, maintained solo',
      ],
    },
    liveUrl: 'https://github.com/Parker-Fawcett/rebuild-dossier',
    githubUrl: 'https://github.com/Parker-Fawcett/rebuild-dossier',
    links: [
      { label: 'Research overview', href: '/research/' },
      { label: 'Findings', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/blob/main/docs/v0-findings.md' },
      { label: 'Tests', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/main/test' },
      { label: 'Mutators', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/main/src/mutation/mutators' },
      { label: 'arXiv paper', href: 'https://arxiv.org/abs/2608.23616' },
      { label: 'DOI', href: 'https://doi.org/10.5281/zenodo.22036801' },
    ],
  },
  {
    name: 'CatchAndTrade',
    type: 'Marketplace',
    statement: 'I built a home for Pokémon card collectors.',
    accent: '#8a5a00',
    image: '/images/catch-and-trade.webp',
    description:
      'Trading-card marketplace I built and run under Fawcett Capital, my holding company. Collectors search cards, track what their collection is worth, scan physical cards, and trade or sell with other collectors. Free to join.',
    stack: ['Next.js', 'React', 'Supabase PostgreSQL', 'Tesseract.js OCR', 'Google OAuth', 'TailwindCSS'],
    metrics: [
      'Collectors search a card database, track what their collection is worth, and trade or sell with other collectors.',
      'Card scanning runs on the collector\'s own device, so it costs me nothing to operate.',
      'Free to join. Built and run under my holding company, Fawcett Capital.',
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
    accent: '#0e6e6e',
    image: '/images/mynexusai.webp',
    description:
      'An AI receptionist that answers a business\'s calls and texts automatically, using that business\'s own information. Live with paying users.',
    stack: ['Node.js', 'pgvector', 'ChromaDB', 'OpenRouter API', 'Twilio Voice/SMS', 'ElevenLabs', 'AssemblyAI'],
    metrics: [
      'Answers a business\'s customer calls and texts around the clock, using its own information instead of guessing.',
      'Keeps answering even when one of the AI providers it relies on goes down.',
      'Plans at $29, $99, and $299 a month.',
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
    type: 'B2B SaaS',
    statement: 'I built a tool that stress-tests any business and writes the report.',
    accent: '#6d2f7b',
    image: '/images/alvien.webp',
    description:
      'A tool that stress-tests a business from its website. One AI makes the strongest case for the company and another attacks it, then Alvien delivers a consulting-grade report on what held up and what to fix. Built for agencies, with white-label reports. $49 per report, $497 a month for up to 10 reports, $997 a month for up to 50.',
    stack: ['Python', 'FastAPI', 'Firecrawl API', 'Groq LLMs', 'TailwindCSS'],
    metrics: [
      'Submit a company\'s website and get a full report back in under 10 minutes.',
      'Two AIs argue it out: one makes the strongest case for the business, the other attacks it, and the report shows what held up.',
      'Built for agencies: $49 for a single report, $497 a month for up to 10, $997 a month for up to 50.',
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
    accent: '#9a4a00',
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
  { name: 'Print-on-Demand / Online Commerce', desc: 'Built and operated online commerce businesses across print-on-demand and marketplace platforms. 2,000+ cumulative sales. Managed product research, design, listings, customer service, fulfillment, platform optimization, and marketplace operations.', stack: 'E-commerce · digital marketing · unit economics' },
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
  const reduceMotion = useReducedMotion()
  const motion = !reduceMotion

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
      <Reveal>
        <h2 className="section-title">Selected work</h2>
      </Reveal>

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
                  color: isActive ? (p.accent || 'var(--accent-deep)') : 'var(--ink-muted)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid transparent',
                  borderBottomColor: isActive ? (p.accent || 'var(--accent)') : undefined,
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
          <SnapPhase
            key={project.name}
            project={project}
            index={i}
            flip={i % 2 === 1}
            motion={motion}
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
        @media (max-width: 900px) {
          .chapter-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 36px !important; }
        }
        @media (max-width: 720px) {
          .rail-label { display: none; }
          .artifact-row { grid-template-columns: minmax(0, 1fr) !important; gap: 4px !important; }
        }
        @media (max-width: 640px) {
          .before-after { grid-template-columns: minmax(0, 1fr) !important; }
          .before-after > div + div { border-left: none !important; border-top: 1px solid var(--line-strong); }
        }
      `}</style>
    </section>
  )
}
