// One statement + proof chapter: a claim on the left, the artifact on the
// right (order alternates). The Details button opens the full dossier modal.
export default function CaseStudyChapter({ project, index, flip, onViewDetails }) {
  const marker = `0.${index + 1}`
  const host = project.liveUrl.replace('https://', '').replace('http://', '')

  return (
    <article
      aria-label={`${project.name} case study`}
      className="chapter"
      data-chapter={index}
      style={{ borderTop: '1px solid var(--line)', padding: '72px 0' }}
    >
      <div
        className="chapter-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.02fr) minmax(0, 0.98fr)',
          gap: 56,
          alignItems: 'center',
          direction: flip ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ direction: 'ltr', minWidth: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            <span style={{ color: 'var(--accent-deep)' }}>[{marker}]</span>
            <span style={{ color: 'var(--ink-muted)' }}> · {project.type}</span>
          </p>

          <h3
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              color: 'var(--ink)',
              marginBottom: 18,
              textWrap: 'balance',
            }}
          >
            {project.statement}
          </h3>

          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--ink-secondary)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              marginBottom: 22,
            }}
          >
            {project.description}
          </p>

          <ul style={{ listStyle: 'none', display: 'grid', gap: 9, marginBottom: 22 }}>
            {project.metrics.map((m, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 22px) minmax(0, 1fr)',
                  gap: 8,
                  fontSize: '0.86rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-deep)', fontWeight: 600 }}>
                  ✓
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.03em',
              color: 'var(--ink-muted)',
              marginBottom: 24,
              lineHeight: 1.9,
            }}
          >
            {project.stack.join(' · ')}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit live site
            </a>
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              className="btn btn-secondary"
              style={{ cursor: 'pointer' }}
            >
              Details +
            </button>
          </div>
        </div>

        <figure style={{ direction: 'ltr', minWidth: 0, margin: 0 }}>
          <div
            style={{
              border: '1px solid var(--line-strong)',
              borderRadius: 4,
              overflow: 'hidden',
              background: 'var(--paper-raised)',
            }}
          >
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              loading="lazy"
              style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
            />
            <figcaption
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                padding: '10px 14px',
                borderTop: '1px solid var(--line)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.04em',
                color: 'var(--ink-muted)',
              }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                {host} ↗
              </a>
              <span aria-hidden="true">FIG. {marker}</span>
            </figcaption>
          </div>
        </figure>
      </div>

      <style>{`
        .chapter { scroll-margin-top: 140px; }
        @media (max-width: 900px) {
          .chapter-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 36px !important; }
        }
      `}</style>
    </article>
  )
}
