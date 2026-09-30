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

export default function Research() {
  return (
    <section id="research" className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">03 · Research</p>
      <Reveal><h2 className="section-title" style={{ marginBottom: 12 }}>Research</h2></Reveal>
      <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', maxWidth: 710, lineHeight: 1.7, marginBottom: 42 }}>
        I study how to tell whether coding agents built the software they were asked to build. The work includes open-source tools, controlled rebuilds, and checks against the original application.
      </p>

      <article style={{ borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line)', padding: '28px 0 32px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: 0 }}>
          2026 &nbsp; / &nbsp; Software engineering · coding agents
        </p>
        <h3 style={{ maxWidth: 850, fontSize: 'clamp(1.55rem, 3vw, 2.3rem)', lineHeight: 1.17, letterSpacing: '-0.03em', fontWeight: 600, margin: '18px 0 14px' }}>
          Rebuild Dossier: Mechanically-Enforced Specs for Agentic App Rebuilds
        </h3>
        <p style={{ maxWidth: 710, color: 'var(--ink-secondary)', fontSize: '0.94rem', lineHeight: 1.75, marginBottom: 22 }}>
          Rebuild Dossier extracts contracts and tests from an existing application before a fresh coding agent rebuilds it. The paper reports what the process catches, what it misses, and why a passing generated suite cannot by itself establish behavioral fidelity.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px' }}>
          <a href="/research/" style={linkStyle}>Research overview →</a>
          <a href="https://arxiv.org/abs/2608.23616" style={linkStyle}>Paper on arXiv ↗</a>
          <a href="https://github.com/Parker-Fawcett/rebuild-dossier" style={linkStyle}>Code and evidence ↗</a>
        </div>
      </article>
      <style>{`
        #research a:hover { color: var(--accent) !important; }
      `}</style>
    </section>
  )
}
