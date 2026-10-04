import Reveal from './Reveal'

const linkStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--accent-deep)',
  textDecoration: 'none',
}

const papers = [
  {
    meta: '2026   /   Software engineering · coding agents',
    title: 'Rebuild Dossier: Mechanically-Enforced Specs for Agentic App Rebuilds',
    summary:
      'Rebuild Dossier extracts contracts and tests from an existing application before a fresh coding agent rebuilds it. The paper reports what the process catches, what it misses, and why a passing generated suite cannot by itself establish behavioral fidelity.',
    links: [
      { label: 'Research overview →', href: '/research/' },
      { label: 'Paper on arXiv ↗', href: 'https://arxiv.org/abs/2608.23616' },
      { label: 'Code and evidence ↗', href: 'https://github.com/Parker-Fawcett/rebuild-dossier' },
    ],
  },
  {
    meta: '2026   /   Quantitative finance · machine learning',
    title: 'When AUC Survives but Portfolios Do Not',
    summary:
      'A model’s accuracy score barely moved (0.553 to 0.551), yet 61.1% of the stocks it picked changed. The paper audits a machine-learning stock-selection study and shows how an accuracy metric can look stable while the decisions it drives are not.',
    links: [
      { label: 'Paper on SSRN ↗', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682' },
      { label: 'Code and evidence ↗', href: 'https://github.com/Parker-Fawcett/Stock' },
    ],
  },
]

export default function Research() {
  return (
    <section id="research" className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">03 · Research</p>
      <Reveal><h2 className="section-title" style={{ marginBottom: 12 }}>Research</h2></Reveal>
      <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', maxWidth: 710, lineHeight: 1.7, marginBottom: 42 }}>
        Two lines of work: telling whether coding agents built the software they were asked to build, and finding where a standard machine-learning accuracy score hides unstable decisions.
      </p>

      {papers.map((paper, i) => (
        <article
          key={paper.title}
          style={{
            borderTop: i === 0 ? '1px solid var(--line-strong)' : 'none',
            borderBottom: '1px solid var(--line)',
            padding: '28px 0 32px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: 0 }}>
            {paper.meta}
          </p>
          <h3 style={{ maxWidth: 850, fontSize: 'clamp(1.55rem, 3vw, 2.3rem)', lineHeight: 1.17, letterSpacing: '-0.03em', fontWeight: 600, margin: '18px 0 14px' }}>
            {paper.title}
          </h3>
          <p style={{ maxWidth: 710, color: 'var(--ink-secondary)', fontSize: '0.94rem', lineHeight: 1.75, marginBottom: 22 }}>
            {paper.summary}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px' }}>
            {paper.links.map((l) => (
              <a key={l.label} href={l.href} style={linkStyle}>{l.label}</a>
            ))}
          </div>
        </article>
      ))}
      <style>{`
        #research a:hover { color: var(--accent) !important; }
      `}</style>
    </section>
  )
}
