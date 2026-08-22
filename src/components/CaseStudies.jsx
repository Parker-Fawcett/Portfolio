import { useState } from 'react'
import { motion } from 'framer-motion'
import CaseStudyCard from './CaseStudyCard'
import ProjectModal from './ProjectModal'
import { useIsMobile } from '../hooks/useIsMobile'

const projects = [
  {
    name: 'Rebuild Dossier',
    type: 'Open-Source Research',
    color: 'purple',
    image: '/images/rebuild-dossier.png',
    description:
      'MIT-licensed evaluation tool with 512 unit tests across 83 files — mechanically-enforced interface contracts that guarantee reliable AI code generation. Sole-author paper submitted to Empirical Software Engineering (EMSE) after arXiv endorsement by Presset Lutz.',
    stack: [
      'Python', { label: 'AST Parsing', colorClass: 'tag-cyan' },
      'Playwright', { label: 'Mutation Testing', colorClass: 'tag-orange' },
      'Docker', 'PostgreSQL',
    ],
    metrics: [
      'Solved the “0% behavioral equivalence” bottleneck in AI code migration with a zero-destruction mutation testing pipeline',
      '512 unit tests across 83 files enforce interface contracts — reliable agentic rebuilds by construction',
      'Applied for LTFF research grant to expand benchmarking and evaluate structural failure modes of higher-tier models',
    ],
    architecture: {
      summary: 'A mechanically-enforced spec system for agentic app rebuilds: AST parsing + Playwright verification ensures higher-tier models fail structurally, not silently. Documented in “Mechanically-Enforced Specs for Agentic App Rebuilds, and What Model-Tier Failures Reveal.”',
      highlights: [
        'AST parsing generates zero-destruction mutations — behavioral equivalence checked without destroying source semantics',
        'Playwright pipeline verifies end-to-end behavior against mechanically-enforced contracts',
        '512 tests serve as executable spec: any model-tier drift is caught as a hard failure, not a soft regression',
        'Benchmarking pipeline designed for LTFF-funded expansion to larger model tiers and longer-horizon tasks',
        'MIT-licensed, sole-authored and maintained — arXiv → EMSE submission track',
      ],
    },
    liveUrl: 'https://github.com/Parker-Fawcett/rebuild-dossier',
    githubUrl: 'https://github.com/Parker-Fawcett/rebuild-dossier',
  },
  {
    name: 'Skora',
    type: 'B2B SaaS',
    color: 'cyan',
    image: '/images/skora.png',
    description:
      'B2B college counseling SaaS in beta pilot — engineered Project Hermes, a GTM engine with 95% feature parity to tier-1 outreach platforms ($3K–$15K/mo) at $0 marginal operating cost. Incubated via JATC partnership after a blind enterprise pitch.',
    stack: [
      'Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM',
      { label: 'Clerk Auth', colorClass: 'tag-cyan' },
      'Redis',
      { label: 'Groq AI', colorClass: 'tag-orange' },
      { label: 'Stripe', colorClass: 'tag-green' },
    ],
    metrics: [
      'Beta pilot validating core SaaS infra; driving early-adopter acquisition via Product Hunt launch + Trustpilot reputation pipelines',
      'Project Hermes: 4-provider waterfall data validation + 26 dynamic conversion angles via Docker/Caddy with automated CAN-SPAM compliance',
      'Scaled infrastructure to support multiple active Stripe subscription tiers ($49–$199/mo)',
    ],
    architecture: {
      summary: 'Full-stack Next.js + serverless PostgreSQL with Project Hermes GTM engine: 4-provider waterfall enrichment and 26-angle conversion pipelines orchestrated via Docker/Caddy.',
      highlights: [
        'Drizzle ORM for type-safe queries against Neon PostgreSQL with connection pooling',
        'Clerk Auth multi-tenant auth with organization-based access control',
        'Redis caching layer for counselor-student data',
        '4-provider waterfall validation + Docker/Caddy for CAN-SPAM compliant outreach at $0 marginal cost',
        'Groq AI for low-latency communication tools; Stripe tiers ($49/$99/$199) with feature gating',
      ],
    },
    liveUrl: 'https://skoraadmit.com',
    githubUrl: 'https://github.com/Parker-Fawcett/AdmitPath',
  },
  {
    name: 'CatchAndTrade',
    type: 'Marketplace · Fawcett Capital LLC',
    color: 'green',
    image: '/images/catch-and-trade.png',
    description:
      'Venture under Fawcett Capital LLC — a scalable trading card marketplace tracking 20,000+ collectibles with sub-200ms query times, real-time grading engines and OCR scanning. Holding entity centralizes compliance and merchant processing for SaaS + e-commerce portfolio.',
    stack: [
      'Next.js', 'React', { label: 'Supabase PostgreSQL', colorClass: 'tag-green' },
      { label: 'Tesseract.js OCR', colorClass: 'tag-orange' },
      'Google OAuth', 'TailwindCSS',
    ],
    metrics: [
      'Designed a database architecture tracking 20,000+ unique collectibles',
      'Achieved optimized, sub-200ms query response times',
      'Integrated client-side OCR scanning engine to process physical cards seamlessly',
    ],
    architecture: {
      summary: 'Monorepo Next.js + Supabase backend with real-time OCR card scanning and deeply optimized schema for sub-200ms queries across 20k+ collectibles. Operated under Fawcett Capital LLC holding structure.',
      highlights: [
        'Supabase PostgreSQL with strategic indexing and materialized views for fast card lookups',
        'Tesseract.js OCR runs entirely client-side — no server costs for card scanning',
        'Database schema optimized for the TCG domain: cards, variants, condition grading, price history',
        'Google OAuth for frictionless authentication with rate-limited API access',
        'Sub-200ms query performance through composite indexes and denormalized price snapshots',
      ],
    },
    liveUrl: 'https://catchandtrade.com',
    githubUrl: 'https://github.com/Parker-Fawcett/catchandtrade',
  },
  {
    name: 'MyNexusAI',
    type: 'AI SaaS',
    color: 'green',
    image: '/images/mynexusai.png',
    description:
      'A production customer support SaaS and enterprise receptionist platform capable of handling automated, real-time voice and text multi-channel communication.',
    stack: [
      'Node.js', 'pgvector', 'ChromaDB',
      { label: 'OpenRouter API', colorClass: 'tag-orange' },
      { label: 'Twilio Voice/SMS', colorClass: 'tag-cyan' },
      { label: 'ElevenLabs', colorClass: 'tag-pink' },
      { label: 'AssemblyAI', colorClass: 'tag-green' },
    ],
    metrics: [
      'Configured a robust Retrieval-Augmented Generation (RAG) pipeline for domain-specific knowledge extraction',
      'Implemented multi-LLM fallback routing via OpenRouter to ensure 100% uptime',
      'Scaled to active production users across tiered models ($29–$299/mo)',
    ],
    architecture: {
      summary: 'A multi-channel AI receptionist platform combining RAG pipelines, real-time voice processing, and intelligent LLM routing for enterprise-grade customer support automation.',
      highlights: [
        'RAG pipeline uses pgvector (PostgreSQL) + ChromaDB for hybrid vector search across domain knowledge bases',
        'OpenRouter API provides multi-LLM fallback routing — if one model fails, another takes over instantly',
        'Twilio Voice/SMS handles inbound and outbound multi-channel communication',
        'ElevenLabs for ultra-realistic voice synthesis, AssemblyAI for real-time speech-to-text transcription',
        'Tiered pricing ($29/$99/$299 per month) with usage-based limits per plan',
      ],
    },
    liveUrl: 'https://mynexusai.org',
    githubUrl: 'https://github.com/Parker-Fawcett/mynexusai-support',
  },
  {
    name: 'Alvien',
    type: 'B2B BI SaaS',
    color: 'orange',
    image: '/images/alvien.png',
    description:
      'A B2B business intelligence and competitor analysis SaaS that automates the extraction of public market data to generate structured strategic briefs.',
    stack: [
      'Python', 'FastAPI',
      { label: 'Firecrawl API', colorClass: 'tag-cyan' },
      { label: 'Groq LLMs', colorClass: 'tag-orange' },
      'TailwindCSS',
    ],
    metrics: [
      'Automates real-time extraction from competitor domains via Firecrawl API, bypassing anti-scraping protections',
      'Converts unstructured web data into structured JSON tokens processed by Groq LLMs',
      'Near-zero latency strategic brief generation from raw public market data',
    ],
    architecture: {
      summary: 'A lightweight Python/FastAPI backend orchestrating a two-stage pipeline: Firecrawl for intelligent web scraping, then Groq LLMs for real-time structured brief generation.',
      highlights: [
        'Firecrawl API intelligently bypasses anti-scraping measures and parses semantic HTML into clean markdown',
        'Groq LLMs provide near-instantaneous inference for converting scraped data into structured business briefs',
        'FastAPI async endpoints handle concurrent scraping jobs with minimal resource overhead',
        'Pipeline designed for idempotent re-scraping — incremental updates without duplicating data',
        'Outputs structured strategic briefs ready for dashboards, reports, or downstream analytics',
      ],
    },
    liveUrl: 'https://alvien.onrender.com',
    githubUrl: null,
  },
  {
    name: 'Code Elevation',
    type: 'Youth Tech Initiative',
    color: 'pink',
    image: '/images/code-elevation.png',
    description:
      'A regional youth technology initiative and competitive hackathon founded to bridge the gap between high school students and professional software engineering workflows. Designed to foster high-agency technical execution among student developers.',
    stack: [
      'Next.js', 'React', 'Neon PostgreSQL', 'Drizzle ORM',
      'Cold Outreach Strategy', 'Corporate Sponsorship',
    ],
    metrics: [
      'Scaled the regional initiative to support 30+ active student participants and competitors',
      'Executed cold outreach campaigns to secure Pluralsight and CHG Healthcare as headline corporate sponsors',
      'Negotiated and managed a $1,650 cash prize pool alongside professional developer software license donations',
    ],
    architecture: {
      summary: 'Orchestrated end-to-end event logistics, engineered the web presence, and managed cross-functional corporate relations. Built and presented a live full-stack Next.js/PostgreSQL SaaS architecture demo to train participants in modern production frameworks.',
      highlights: [
        'Engineered the full web presence using Next.js, Neon PostgreSQL, and Drizzle ORM for event registration and management',
        'Cold outreach campaigns targeted enterprise tech companies — secured Pluralsight and CHG Healthcare as headline sponsors',
        'Managed a $1,650 cash prize pool with additional professional software license donations from corporate partners',
        'Designed and presented a live, end-to-end full-stack architecture demonstration during the hackathon',
        'Built cross-functional relationships bridging high school education with real-world software engineering workflows',
      ],
    },
    liveUrl: 'https://codeelevation.org',
    githubUrl: null,
  },
]

export default function CaseStudies() {
  const isMobile = useIsMobile()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="case-studies" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Case Studies</p>
        <h2 className="section-title">
          Engineering in <span className="gradient-text">Production</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: isMobile ? 20 : 24 }}>
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
