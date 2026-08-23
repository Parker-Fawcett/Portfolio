const stats = [
  { number: '512', label: 'unit tests written', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/master/test' },
  { number: '83', label: 'files pinned by specs', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/master/src' },
  { number: '20k+', label: 'collectibles tracked', href: 'https://catchandtrade.com' },
  { number: '60+', label: 'engineers on my tooling', href: 'https://www.chghealthcare.com' },
]

export default function StatsBand() {
  return (
    <section className="stat-band" aria-label="Key numbers">
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '44px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 24,
        }}
        className="stats-grid"
      >
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div className="stat-number">{stat.number}</div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginTop: 8,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              {stat.label} ↗
            </div>
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 720px) {
          .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; row-gap: 36px; }
        }
      `}</style>
    </section>
  )
}
