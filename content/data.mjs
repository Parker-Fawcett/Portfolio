// All site content lives here. Inline text supports [label](url) links and *emphasis*.
// Status labels match the master résumé: submitted or under review papers are labeled that way
// and an accepted talk is labeled upcoming until it has been delivered.

export const site = {
  url: 'https://www.parkerfawcett.com',
  name: 'Parker Fawcett',
  email: 'Parkerscottfawcett@gmail.com',
  tagline: 'AI researcher and builder',
  description:
    'Parker Fawcett is an AI researcher and builder. He studies how AI systems fail, publishes the results, and builds products, agents and open-source tools with them. AI Skills Engineer at CHG Healthcare and CEO of Skora.',
  ogImage: '/images/og.jpg?v=2',
  built: new Date().toISOString().slice(0, 10),
}

export const nav = [
  { label: 'Research', href: '/research/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Speaking', href: '/speaking/' },
  { label: 'About', href: '/about/' },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Parker-Fawcett' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parker-fawcett-0713a7407/' },
  { label: 'arXiv', href: 'https://arxiv.org/abs/2608.23616' },
  { label: 'SSRN', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682' },
  { label: 'Substack', href: 'https://substack.com/@parkerfawcett' },
  { label: 'X', href: 'https://x.com/Parker_Fawcett' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0003-9699-7422' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?hl=en&user=y4WhQAIAAAAJ' },
]

export const papers = [
  {
    id: 'R.001',
    blurb:
      'An open-source MCP server that extracts contracts and tests from an existing app so a fresh coding agent can rebuild it from a spec. The paper reports the runs that worked and the ones that failed.',
    status: 'Preprint on arXiv',
    field: 'Software engineering, agentic systems',
    year: '2026',
    title: 'Rebuild Dossier: Mechanically-Enforced Specs for Agentic App Rebuilds, and What Model-Tier Failures Reveal',
    short: 'Rebuild Dossier: Mechanically-Enforced Specs for Agentic App Rebuilds',
    summary:
      'Rebuild Dossier is an open-source MCP server that extracts interface contracts and tests from an existing Express or Next.js application. It packages them for a fresh coding agent and adds hooks that enforce parts of the rebuild workflow. The tool produces a spec and evaluation material and the agent does the rebuild. The paper reports the runs that worked and the ones that failed.',
    links: [
      { label: 'Read on arXiv', href: 'https://arxiv.org/abs/2608.23616' },
      { label: 'Code and evidence', href: 'https://github.com/Parker-Fawcett/rebuild-dossier' },
      { label: 'Archived software DOI', href: 'https://doi.org/10.5281/zenodo.22036801' },
    ],
    ld: { url: 'https://arxiv.org/abs/2608.23616', datePublished: '2026' },
  },
  {
    id: 'R.002',
    blurb:
      'When one pipeline writes both the spec and the acceptance tests, they share a blind spot. A do-nothing stub passed every generated test across 30 frozen rebuilds. The paper proposes a three-step audit to run before trusting a green rebuild.',
    status: 'Under review at ICSE 2027 SEIP',
    field: 'Software engineering, agentic systems',
    year: '2026',
    title: 'Rebuild Dossier: Shared Blind Spots in Co-Generated Specifications and Acceptance Tests for Agent Rebuilds',
    short: 'Shared Blind Spots in Co-Generated Specifications and Acceptance Tests',
    summary:
      'A separate paper on the same tool, submitted to the Software Engineering in Practice track of ICSE 2027. When one pipeline derives both a rebuild’s specification and its acceptance tests from the same extraction, the two can share a blind spot. In a pre-registered study of 30 frozen rebuilds, a do-nothing stub passed every generated visible and held-out test. A requirements oracle frozen before scoring, plus 59 checks written independently by an external researcher, showed the weaker-model rebuilds answering every authentication-rejection check incorrectly. The paper proposes a three-step audit to run before trusting a green rebuild.',
    links: [{ label: 'Code and evidence', href: 'https://github.com/Parker-Fawcett/rebuild-dossier' }],
  },
  {
    id: 'R.003',
    blurb:
      'A model’s accuracy score barely moved (0.553 to 0.551), yet 61.1% of the stocks it picked changed. An audit of how a stable metric can sit on top of unstable decisions.',
    status: 'Under review at the Journal of Financial Data Science',
    field: 'Quantitative finance, machine learning',
    year: '2026',
    title: 'When AUC Survives but Portfolios Do Not: Leakage-Repair Effects on Predictive-Metric Stability versus Investment-Decision Stability in a Cross-Sectional Equity Classifier',
    short: 'When AUC Survives but Portfolios Do Not',
    summary:
      'An audit of a tree classifier that ranks 99 U.S. small-cap stocks by their probability of beating a market benchmark. Repairing a validation-label leak left test AUC nearly unchanged (0.553 to 0.551) but replaced most of the selected portfolio (mean Jaccard overlap 0.389). Three variants that each change one factor, including a switch to logistic regression, reproduce the pattern, and the size of the gap depends on the model. A machine-learning-only portfolio does not beat a frozen momentum benchmark under corrected accounting. The paper does not claim a trading strategy. The stock list uses current constituents, so returns are provisional. The SSRN preprint is an earlier version of this paper.',
    links: [
      { label: 'Earlier version on SSRN', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682' },
      { label: 'Code and evidence', href: 'https://github.com/Parker-Fawcett/Stock' },
    ],
    ld: { url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682', datePublished: '2026' },
  },
]

export const findings = [
  'In a sealed follow-up on one application, all 30 rebuild snapshots passed the 20 visible tests. A separate requirements check found large differences in authentication and response behavior. The check covered 77 database-independent requirements out of 132 written checks. It was written by the author and compared responses by key only. The result marks a concrete limit of the generated suite in that setting. It is not a failure rate for coding agents.',
  'The [chronological findings log](https://github.com/Parker-Fawcett/rebuild-dossier/blob/main/docs/v0-findings.md) records the experiments, bugs, fixes and later corrections. The arXiv paper is a versioned publication and the log is the living record. The latest requirements check is in the [archived oracle and results](https://github.com/Parker-Fawcett/rebuild-dossier/tree/main/evidence/fidelity-oracle).',
]

export const projects = [
  {
    slug: 'rebuild-dossier',
    name: 'Rebuild Dossier',
    kind: 'Open-source research tool',
    year: '2026',
    status: 'Active research',
    summary:
      'Records what an app does before an AI agent rebuilds it, so the agent has a spec to work from and a test suite you can audit. The papers report where that process catches problems and where a green run still hides them.',
    links: [
      { label: 'Source', href: 'https://github.com/Parker-Fawcett/rebuild-dossier' },
      { label: 'Paper', href: 'https://arxiv.org/abs/2608.23616' },
      { label: 'Research page', href: '/research/' },
    ],
  },
  {
    slug: 'skora',
    name: 'Skora',
    kind: 'College admissions platform',
    year: '2025 to present',
    status: 'Early stage, in counselor pilots',
    image: '/images/skora.webp',
    alt: 'Skora admissions platform screenshot',
    w: 800,
    h: 500,
    summary:
      'Students see their estimated chances at each college, get matched to schools and get feedback on essays. Counselors manage their students and offer Skora under their own brand. College facts come from College Scorecard and IPEDS data. Essay feedback is drafted by AI and reviewed by a counselor. I am the CEO.',
    links: [{ label: 'skoraadmit.com', href: 'https://skoraadmit.com' }],
  },
  {
    slug: 'catchandtrade',
    name: 'CatchAndTrade',
    kind: 'Collectibles marketplace',
    year: '2025 to present',
    status: 'Live',
    image: '/images/catch-and-trade.webp',
    alt: 'CatchAndTrade marketplace screenshot',
    w: 800,
    h: 503,
    summary:
      'A marketplace and portfolio tracker for Pokémon card collectors. Search a card database, track what a collection is worth, and trade or sell with other collectors. Card scanning runs on the collector’s own device. It is also the app behind the 30 frozen rebuilds in the Rebuild Dossier study.',
    links: [
      { label: 'catchandtrade.com', href: 'https://catchandtrade.com' },
    ],
  },
  {
    slug: 'mynexusai',
    name: 'MyNexusAI',
    kind: 'AI receptionist',
    year: '2025 to present',
    status: 'Prototype',
    image: '/images/mynexusai.webp',
    alt: 'MyNexusAI receptionist screenshot',
    w: 800,
    h: 500,
    summary:
      'Answers a small business’s calls and texts using the business’s own documents. It started when an HVAC chatbot I was testing invented a coupon that appeared nowhere in its source material. That turned my attention to grounding and AI reliability.',
    links: [{ label: 'mynexusai.org', href: 'https://mynexusai.org' }],
  },
  {
    slug: 'alvien',
    name: 'Alvien',
    kind: 'Business research tool',
    year: '2025 to present',
    status: 'Prototype',
    image: '/images/alvien.webp',
    alt: 'Alvien report screenshot',
    w: 1600,
    h: 828,
    summary:
      'Give it a company’s website and it writes a stress-test report. One model argues the strongest case for the business, another attacks it, and the report shows what held up.',
    links: [{ label: 'Live demo', href: 'https://alvien.onrender.com' }],
  },
  {
    slug: 'nightmart',
    name: 'Nightmart',
    kind: 'Roblox horror game',
    year: '2026',
    status: 'Published',
    image: '/images/roblox/nightmart-compare.webp',
    alt: 'Nightmart inspection screen comparing a live face with the face on a license',
    w: 1318,
    h: 1080,
    summary:
      'You are the night clerk. Customers arrive at your window, you compare their faces with their licenses, and you close the window on anything that is not who it claims to be. Server-owned game state, 12 anomaly types and automated Luau test fixtures.',
    links: [
      { label: 'Case study', href: '/roblox/nightmart/' },
      { label: 'Play on Roblox', href: 'https://www.roblox.com/games/123840336518508' },
    ],
  },
  {
    slug: 'code-elevation',
    name: 'Code Elevation',
    kind: 'Youth coding competition',
    year: '2025 to 2026',
    status: 'Completed',
    image: '/images/code-elevation.webp',
    alt: 'Code Elevation competition site',
    w: 1440,
    h: 900,
    summary:
      'A coding competition for ages 13 to 17 that I founded and ran. CHG Healthcare and Pluralsight sponsored it, with a $1,650 prize pool and donated software licenses. More than 30 students took part.',
    links: [{ label: 'codeelevation.org', href: 'https://codeelevation.org' }],
  },
]

export const repos = [
  { name: 'custody', href: 'https://github.com/Parker-Fawcett/custody', text: 'A Hermes plugin that works out what a destructive command would really affect before it runs.' },
  { name: 'Skill-Drift', href: 'https://github.com/Parker-Fawcett/Skill-Drift', text: 'Classifies changes between versions of an AI agent skill as cosmetic or risk-relevant.' },
  { name: 'redbubble-mcp', href: 'https://github.com/Parker-Fawcett/redbubble-mcp', text: 'MCP server that lets AI agents upload designs and manage works on a Redbubble artist account.' },
  { name: 'Message', href: 'https://github.com/Parker-Fawcett/Message', text: 'End-to-end encrypted messenger on Next.js and Socket.IO with X3DH and Double Ratchet key handling. An experiment, not an audited product.' },
  { name: 'Keepsake', href: 'https://github.com/Parker-Fawcett/Keepsake', text: 'Notes app that turns pasted or spoken notes into people, dates, memories and reminders.' },
  { name: 'Ai-Startup-funny', href: 'https://github.com/Parker-Fawcett/Ai-Startup-funny', text: 'An AI agent was given one prompt, build a startup, and left to run. The repo records what it chose, built and got wrong.' },
  { name: 'Totally-Normal', href: 'https://github.com/Parker-Fawcett/Totally-Normal', text: 'A website generated from a Whitespace program, so the source file has no visible characters.' },
]

export const contributions = [
  { title: 'Clamp OpenAI Responses max_output_tokens to model capacity', href: 'https://github.com/openclaw/openclaw/pull/128282' },
  { title: 'Preserve tool-result boundary whitespace for Mistral and Ollama', href: 'https://github.com/openclaw/openclaw/pull/128266' },
  { title: 'Route Telegram commentary through one frozen progress owner', href: 'https://github.com/openclaw/openclaw/pull/128259' },
]

export const talks = {
  upcoming: [
    {
      date: '2026-11-19',
      when: 'November 19, 2026',
      title: 'Lightning talk: how easier AI-enabled building changes the development of professional judgment',
      event: 'University of Utah Student-Led AI Symposium',
      place: 'Gould Auditorium, Salt Lake City, session on AI and the Future of Work',
      note: 'Five minutes on why building has become easier, why judgment still takes real-world feedback, and what that means for how beginners learn.',
    },
  ],
  past: [
    {
      date: '2026-10-27',
      when: 'October 27, 2026',
      title: 'How we test whether an AI agent rebuilt an app correctly',
      event: 'Vibe Code Club, Utah Valley Business Resource Center',
      place: 'Main research presentation, 15 minutes',
      note: 'The Rebuild Dossier results on agent rebuild testing, including the stub that passed every generated test.',
    },
  ],
  topics: [
    'Why a passing test suite can still describe the wrong software',
    'How to audit AI-generated tests before trusting a green run',
    'Why a model’s accuracy metric can hold steady while the decisions it drives change',
    'How AI changes the way beginners become experts, and what happens to junior jobs',
    'Working in an enterprise AI team, starting a company and finishing high school at the same time',
  ],
}

export const timeline = [
  {
    when: 'June 2026 to present',
    role: 'AI Skills Engineer',
    org: 'CHG Healthcare, Enterprise Data & AI',
    text: 'Builds AI-assisted automation and agent tooling. Work includes a CareerMD lead pipeline (web extraction, multi-source enrichment, validation, duplicate detection and dry-run checks before any Salesforce write), Python and SQL workflows on Snowflake, and shared infrastructure for reusable agent instructions. Moved into the role from a summer internship.',
  },
  {
    when: 'Summer 2026',
    role: 'Corporate Strategy & Operations Intern',
    org: 'CHG Healthcare',
    text: 'Analyzed operations and cross-department workflows and helped turn vague operational problems into structured data and automation work.',
  },
  {
    when: 'May 2026 to present',
    role: 'Founder and sole member',
    org: 'Fawcett Capital LLC, Utah',
    text: 'Holding company for my software products, research infrastructure and digital businesses.',
  },
  {
    when: '2025 to present',
    role: 'CEO',
    org: 'Skora',
    text: 'Admissions platform for students and counselors. See [Projects](/projects/).',
  },
  {
    when: '2025 to present',
    role: 'Founder and developer',
    org: 'CatchAndTrade, MyNexusAI, Alvien',
    text: 'Three independent products, from a marketplace to an AI receptionist. See [Projects](/projects/).',
  },
  {
    when: '2025 to 2026',
    role: 'Founder and executive director',
    org: 'Code Elevation',
    text: 'Youth coding competition with CHG Healthcare and Pluralsight as sponsors.',
  },
  {
    when: '2026',
    role: 'Lead event coordinator',
    org: 'JATC and Cypress Credit Union entrepreneurship summit',
    text: 'Organized a student entrepreneurship event covering branding, budget and logistics.',
  },
  {
    when: '2025 to present',
    role: 'Freelance developer',
    org: 'Upwork and independent clients',
    text: 'Web apps, API integrations and storefronts for small businesses in several countries.',
  },
]

export const now = [
  'The ICSE 2027 submission and a finance paper on model evaluation (Journal of Financial Data Science) are under review.',
  'Extending the rebuild study from one application to several, with independent behavioral checks and explicit false-positive and false-negative counts. This is in progress and has no results yet.',
  'Giving a lightning talk at the University of Utah AI symposium on November 19.',
  'Writing *Experience Without Permission*, a book about how AI changes the way beginners become experts.',
]

export const bios = {
  short:
    'Parker Fawcett is an AI researcher and builder in Utah. He studies how AI systems fail, publishes the results, and builds products, agents and open-source tools with them. He is an AI Skills Engineer at CHG Healthcare, the CEO of the college admissions platform Skora, and the author of the Rebuild Dossier papers on [coding-agent verification](https://arxiv.org/abs/2608.23616) and a paper on [machine-learning evaluation in finance](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682). He is a high school student in Utah.',
  long: [
    'Parker Fawcett is an AI researcher and builder in Utah. He is in high school, with concurrent enrollment at the Jordan Applied Technology Center and Salt Lake Community College. At CHG Healthcare he works in Enterprise Data & AI on AI-assisted automation and agent tooling, a role he moved into after a summer internship.',
    'His research asks how to tell whether a coding agent built the software it was asked to build. Rebuild Dossier is an open-source MCP server that extracts an existing app’s interface contracts and produces a test-backed spec for an agent to rebuild from. His 2026 arXiv preprint reports the successful and failed evaluations of that process, and a second paper on the same tool is under review at ICSE 2027. A separate 2026 finance paper, under review at the Journal of Financial Data Science, *When AUC Survives but Portfolios Do Not*, shows how a standard accuracy metric can barely move while a model’s actual stock picks change.',
    'He is the CEO of Skora, a college admissions platform, and builds other products under his holding company, Fawcett Capital LLC. He founded Code Elevation, a youth coding competition sponsored by CHG Healthcare and Pluralsight, and is writing a book, *Experience Without Permission*, about how AI is changing the way beginners become experts.',
  ],
}
