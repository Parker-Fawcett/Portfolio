// Appendix table: every number carries its provenance. Numbers without
// sources are decoration — see DESIGN.md rule 6.
const rows = [
  { number: '512', label: 'unit tests written', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/master/test', source: 'rebuild-dossier/test', date: '2026' },
  { number: '83', label: 'test files with enforced specs', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/master/test', source: 'rebuild-dossier/test', date: '2026' },
  { number: '188', label: 'monthly cross-sectional decisions', href: 'https://github.com/Parker-Fawcett/Stock', source: 'AUC paper / Stock repo', date: '2026' },
  { number: '5,000', label: 'bootstrap iterations', href: 'https://github.com/Parker-Fawcett/Stock', source: 'AUC paper / Stock repo', date: '2026' },
  { number: '16', label: 'experimental trials (locked)', href: 'https://github.com/Parker-Fawcett/Stock', source: 'AUC provenance manifest', date: '2026' },
  { number: '370+', label: 'public commits', href: 'https://github.com/Parker-Fawcett/catchandtrade', source: 'CatchAndTrade repo', date: 'live' },
  { number: '80+', label: 'API endpoints', href: 'https://skoraadmit.com', source: 'Skora production', date: '2026' },
  { number: '60+', label: 'engineers on my tooling', href: 'https://www.chghealthcare.com', source: 'CHG Healthcare', date: '2026' },
]

export default function StatsBand() {
  return (
    <section className="stat-band" aria-label="Key numbers with sources">
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '44px 24px',
        }}
      >
        <p className="section-label" style={{ marginBottom: 4 }}>
          Appendix A — figures cited
        </p>
        <div>
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className="stat-row"
              style={{ textDecoration: 'none', display: 'grid' }}
            >
              <span className="stat-row-number">{row.number}</span>
              <span className="stat-row-label">{row.label}</span>
              <span className="stat-row-source">
                {row.source} ↗
                <span className="stat-row-date">{row.date}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .stat-row {
          grid-template-columns: 200px minmax(0, 1fr) auto;
          align-items: baseline;
          gap: 24px;
          padding: 18px 4px;
          border-top: 1px solid var(--line);
        }
        .stat-row:last-child { border-bottom: 1px solid var(--line); }
        .stat-row-number {
          font-family: var(--font-mono);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          letter-spacing: -0.02em;
          color: var(--accent-deep);
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
        }
        .stat-row-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-secondary);
        }
        .stat-row-source {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: var(--ink-muted);
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
        }
        .stat-row-date {
          display: inline-block;
          margin-left: 12px;
          padding: 1px 7px;
          border: 1px solid var(--line-strong);
          border-radius: 2px;
          text-decoration: none;
          color: var(--ink-muted);
        }
        .stat-row:hover .stat-row-source { color: var(--accent-deep); }
        @media (max-width: 720px) {
          .stat-row { grid-template-columns: minmax(0, 1fr) auto; row-gap: 6px; }
          .stat-row-label { grid-column: 1; grid-row: 2; }
          .stat-row-source { grid-column: 2; grid-row: 1 / span 2; align-self: center; }
        }
      `}</style>
    </section>
  )
}
