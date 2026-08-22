const stats = [
  { number: '512', label: 'unit tests written' },
  { number: '83', label: 'files pinned by specs' },
  { number: '20k+', label: 'collectibles tracked' },
  { number: '60+', label: 'engineers on my tooling' },
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
          <div key={stat.label}>
            <div className="stat-number">{stat.number}</div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </div>
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
