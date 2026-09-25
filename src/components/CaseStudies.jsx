import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import CaseStudyChapter from './CaseStudyChapter'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

// Wide-viewport gate: the pinned scrub needs room. Narrow screens and
// reduced-motion users get the stacked chapters (zero regression path).
function useWide(min = 900) {
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= min
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${min}px)`)
    const onChange = () => setWide(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [min])
  return wide
}

const SCRUB_SPAN_VH = 220 // track length per chapter

// One condensed phase in the pinned viewport: statement + top-3 proof +
// figure + actions. Full metrics/architecture live in the Details modal,
// which is why the phase fits 100vh. Opacity is written via ref (the
// framer-motion 12.41 + React 19 style-opacity quirk — see DESIGN.md);
// transforms go through style (those propagate fine).
function ScrubPhase({ project, index, floatProg, flip, onViewDetails }) {
  const marker = `0.${index + 1}`
  const host = project.liveUrl.replace('https://', '').replace('http://', '')
  const local = useTransform(floatProg, (v) => v - index)
  const y = useTransform(local, [-1, 0, 1], [70, 0, 70])
  const scale = useTransform(local, [-1, 0, 1], [0.95, 1, 0.95])
  const ref = useRef(null)

  const apply = (v) => {
    const el = ref.current
    if (!el) return
    const a = Math.abs(v)
    el.style.opacity = a >= 1 ? '0' : String(1 - a)
    el.style.visibility = a >= 1 ? 'hidden' : 'visible'
    el.style.pointerEvents = a < 0.5 ? 'auto' : 'none'
  }
  useMotionValueEvent(local, 'change', apply)
  useEffect(() => {
    apply(local.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={ref}
      aria-label={`${project.name} case study`}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        y,
        scale,
        opacity: 0,
        visibility: 'hidden',
      }}
    >
      <div
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
            <span style={{ color: 'var(--accent-deep)' }}>[{marker}]</span>
            <span style={{ color: 'var(--ink-muted)' }}> · {project.type}</span>
          </p>
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
          <ul style={{ listStyle: 'none', display: 'grid', gap: 8, marginBottom: 20 }}>
            {project.metrics.slice(0, 3).map((m, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 22px) minmax(0, 1fr)',
                  gap: 8,
                  fontSize: '0.84rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.55,
                }}
              >
                <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-deep)', fontWeight: 600 }}>
                  ✓
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
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
        </div>
        {project.image && (
          <figure style={{ direction: 'ltr', minWidth: 0, margin: 0 }}>
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
                style={{ width: '100%', maxHeight: '52vh', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }}
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
                <span aria-hidden="true">FIG. {marker}</span>
              </figcaption>
            </div>
          </figure>
        )}
      </div>
    </motion.div>
  )
}

// Pinned scrub track: N × 220vh of scroll drives one sticky viewport through
// the chapters. Rail sync is derived from the same progress value.
function ScrubChapters({ projects, trackRef, onActive, onViewDetails }) {
  const n = projects.length
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })
  const floatProg = useTransform(scrollYProgress, [0, 1], [0, n - 1])
  const lastRef = useRef(-1)
  useMotionValueEvent(floatProg, 'change', (v) => {
    const i = Math.max(0, Math.min(n - 1, Math.round(v)))
    if (i !== lastRef.current) {
      lastRef.current = i
      onActive(i)
    }
  })
  useEffect(() => {
    const v = floatProg.get()
    onActive(Math.max(0, Math.min(n - 1, Math.round(v))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={trackRef} style={{ position: 'relative', height: `${n * SCRUB_SPAN_VH}vh` }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1120,
            margin: '0 auto',
            padding: '84px 24px 24px',
            height: '100%',
          }}
        >
          {projects.map((p, i) => (
            <ScrubPhase
              key={p.name}
              project={p}
              index={i}
              floatProg={floatProg}
              flip={i % 2 === 1}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const projects = [
  {
    name: 'When AUC Survives but Portfolios Do Not',
    type: 'Quantitative finance research',
    statement: 'Aggregate accuracy ≠ decision stability.',
    image: '/images/Auc.png',
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
    name: 'Fawcett Capital LLC',
    type: 'Holding company / Venture entity',
    statement: 'One holding company. Five ventures.',
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
    beforeAfter: {
      leftLabel: 'Enterprise outbound',
      leftBody: '$3K–$15K/mo platforms: enrichment, sequencing, and compliance sold back to you as a subscription.',
      rightLabel: 'Hermes',
      rightBody: '~95% of that surface at $0 marginal cost — 4-provider waterfall, 26 outreach angles, CAN-SPAM compliant.',
    },
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
    statement: 'A public catalog. One schema.',
    image: '/images/catch-and-trade.webp',
    description:
      'Trading-card marketplace under Fawcett Capital, my holding company. A public catalog of collectibles on composite indexes and materialized views, plus client-side OCR scanning for grading physical cards.',
    stack: ['Next.js', 'React', 'Supabase PostgreSQL', 'Tesseract.js OCR', 'Google OAuth', 'TailwindCSS'],
    metrics: [
      'Public catalog with pricing intelligence',
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
  const trackRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const wide = useWide(900)
  const scrub = wide && !reduceMotion

  useEffect(() => {
    if (scrub) return // scrub mode derives active from scroll progress
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
  }, [scrub])

  const scrollToChapter = (i) => {
    if (scrub) {
      const track = trackRef.current
      if (!track) return
      const top = track.getBoundingClientRect().top + window.scrollY
      const spanPx = window.innerHeight * (SCRUB_SPAN_VH / 100)
      window.scrollTo({ top: top + i * spanPx + spanPx / 2 - window.innerHeight / 2, behavior: 'smooth' })
      return
    }
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

      <div key={scrub ? 'scrub' : 'stack'}>
        {scrub ? (
          <ScrubChapters
            projects={projects}
            trackRef={trackRef}
            onActive={setActive}
            onViewDetails={setSelectedProject}
          />
        ) : (
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
        )}
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
