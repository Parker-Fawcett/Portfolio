import Reveal from './Reveal'

const entries = [
  {
    number: 'B.001',
    category: 'Book',
    title: 'Experience Without Permission',
    summary: 'How AI is changing the way beginners become experts: what a good junior job supplied besides tasks, what happens when AI changes that work, and what might replace it.',
    date: 'In progress',
  },
  {
    number: 'W.002',
    category: 'API contracts',
    title: 'The API Tests Passed. Existing Clients Broke',
    summary: 'A rebuilt Express API accepted JSON where the original read query parameters. Every generated check passed; the existing request broke.',
    href: '/writing/api-tests-passed-existing-clients-broke/',
    date: 'Sep 2026',
  },
  {
    number: 'W.001',
    category: 'Software testing',
    title: 'Visible Tests Are Not a Specification',
    summary: 'A generated check passed on a todo page that could not add, edit, or delete tasks. Here is the browser path the test missed.',
    href: '/writing/visible-tests-are-not-a-specification/',
    date: 'Sep 2026',
  },
]

export default function Writing() {
  return (
    <section id="writing" className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">04 · Writing</p>
      <Reveal><h2 className="section-title" style={{ marginBottom: 12 }}>Writing</h2></Reveal>
      <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', maxWidth: 650, lineHeight: 1.7, marginBottom: 42 }}>
        Field notes on building software and checking whether it works, and a book in progress on how beginners become experts.
      </p>

      {entries.map((entry, index) => {
        const Wrapper = entry.href ? 'a' : 'div'
        return (
          <Wrapper
            key={entry.number}
            {...(entry.href ? { href: entry.href, className: 'writing-entry' } : {})}
            style={{ display: 'block', borderTop: index === 0 ? '1px solid var(--line-strong)' : 'none', borderBottom: '1px solid var(--line)', padding: '26px 0 30px', color: 'inherit', textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
              <span><span style={{ color: 'var(--accent-deep)', fontWeight: 600 }}>{entry.number}</span> &nbsp; / &nbsp; {entry.category}</span>
              <span>{entry.date}</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', lineHeight: 1.17, letterSpacing: '-0.03em', fontWeight: 600, margin: '18px 0 12px' }}>
              {entry.title}
            </h3>
            <p style={{ maxWidth: 650, color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: entry.href ? 16 : 0 }}>
              {entry.summary}
            </p>
            {entry.href && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-deep)' }}>Read entry →</span>
            )}
          </Wrapper>
        )
      })}
      <a href="/writing/" className="writing-all" style={{ display: 'inline-block', marginTop: 26, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-deep)', textDecoration: 'none' }}>
        All writing →
      </a>
      <style>{`
        .writing-entry:hover h3, .writing-all:hover { color: var(--accent) !important; }
      `}</style>
    </section>
  )
}
