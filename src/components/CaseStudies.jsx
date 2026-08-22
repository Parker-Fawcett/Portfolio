import { useState } from 'react'
import CaseStudyCard from './CaseStudyCard'
import ProjectModal from './ProjectModal'

const projects = [
  {
    name: 'Rebuild Dossier',
    type: 'Open-source research',
    image: '/images/rebuild-dossier.png',
    description:
      'A test harness for rebuilding apps with AI. 512 tests across 83 files pin down the interfaces so a rebuild either matches the original or fails loudly. The paper behind it is submitted to Empirical Software Engineering.',
    stack: ['Python', 'AST parsing', 'Playwright', 'Mutation testing', 'Docker', 'PostgreSQL'],
    metrics: [
      'AI code migrations used to score 0% behavioral equivalence; AST-based mutation checks verify behavior without touching the source',
      '512 unit tests across 83 files act as executable specs, so model drift shows up as hard failures instead of quiet regressions',
      'Applied for an LTFF grant to push the benchmarks to higher-tier models',
    ],
    architecture: {
      summary: 'The idea is to treat specs as mechanically enforced contracts. Instead of hoping a rebuild matches intent, you check it: parse the AST, mutate without destroying, replay behavior through Playwright. The paper is "Mechanically-enforced specs for agentic app rebuilds, and what model-tier failures reveal", sole-authored after an arXiv endorsement from Presset Lutz.',
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
  },
  {
    name: 'Skora',
    type: 'B2B SaaS',
    image: '/images/skora.png',
    description:
      'College counseling software, currently in beta. The interesting piece is Project Hermes, an outbound engine that covers about 95% of what $3K to $15K/mo enterprise platforms do, with zero marginal operating cost. It started through a JATC partnership after a cold pitch.',
    stack: ['Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM', 'Clerk Auth', 'Redis', 'Groq AI', 'Stripe'],
    metrics: [
      'Beta pilot running now; early users come in through a Product Hunt launch and Trustpilot reviews',
      'Hermes validates every contact through a 4-provider waterfall and tests 26 outreach angles on Docker/Caddy, CAN-SPAM compliant',
      'Stripe subscriptions run $49 to $199/mo',
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
    githubUrl: 'https://github.com/Parker-Fawcett/AdmitPath',
  },
  {
    name: 'CatchAndTrade',
    type: 'Marketplace',
    image: '/images/catch-and-trade.png',
    description:
      'Trading-card marketplace under Fawcett Capital, my holding company. Tracks 20,000+ collectibles with sub-200ms queries, plus OCR scanning for grading physical cards.',
    stack: ['Next.js', 'React', 'Supabase PostgreSQL', 'Tesseract.js OCR', 'Google OAuth', 'TailwindCSS'],
    metrics: [
      'Schema tracks 20,000+ unique collectibles',
      'Most queries return in under 200ms',
      'OCR runs client-side, so scanning physical cards costs nothing server-side',
    ],
    architecture: {
      summary: 'Monorepo: Next.js in front, Supabase underneath. Most of the work went into the schema, which models the TCG domain specifically.',
      highlights: [
        'Strategic indexing and materialized views keep card lookups fast',
        'Tesseract.js runs entirely in the browser',
        'Schema covers cards, variants, condition grading, and price history',
        'Google OAuth with rate-limited API access',
        'Sub-200ms comes from composite indexes plus denormalized price snapshots',
      ],
    },
    liveUrl: 'https://catchandtrade.com',
    githubUrl: 'https://github.com/Parker-Fawcett/catchandtrade',
  },
  {
    name: 'MyNexusAI',
    type: 'AI SaaS',
    image: '/images/mynexusai.png',
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
    image: '/images/alvien.png',
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
    githubUrl: null,
  },
  {
    name: 'Code Elevation',
    type: 'Youth tech initiative',
    image: '/images/code-elevation.png',
    description:
      'A coding competition I ran for high schoolers in my area, built to feel like real software engineering rather than a school club.',
    stack: ['Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM', 'Cold outreach', 'Sponsorship'],
    metrics: [
      '30+ student participants and competitors',
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

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="case-studies" className="section-container">
      <p className="section-label">02 · Projects</p>
      <h2 className="section-title">Selected work</h2>

      <div style={{ borderBottom: '1px solid var(--line)' }}>
        {projects.map((project, i) => (
          <CaseStudyCard key={project.name} project={project} index={i} onViewDetails={setSelectedProject} />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
