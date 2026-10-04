// Headline numbers in plain language. Every number carries its source and
// date — see DESIGN.md rule 6.
import Reveal from './Reveal'
const rows = [
  { number: '60+', label: 'engineers using my AI tooling at CHG Healthcare', href: 'https://www.chghealthcare.com', source: 'CHG Healthcare', date: '2026' },
  { number: '2', label: 'research papers published', href: '/research/', source: 'arXiv and SSRN', date: '2026' },
  { number: '4', label: 'live products I built or co-founded', href: 'https://skoraadmit.com', source: 'Skora, CatchAndTrade, MyNexusAI, Alvien', date: '2026' },
  { number: '669', label: 'automated tests on my open-source tool', href: 'https://github.com/Parker-Fawcett/rebuild-dossier/tree/main/test', source: 'rebuild-dossier/test', date: 'Sep 2026' },
  { number: '370+', label: 'public code commits on CatchAndTrade', href: 'https://github.com/Parker-Fawcett/catchandtrade', source: 'CatchAndTrade repo', date: 'live' },
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
          By the numbers
        </p>
        <div>
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={Math.min(i * 0.06, 0.3)}>
              <a
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
            </Reveal>
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
