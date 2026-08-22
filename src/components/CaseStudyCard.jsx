export default function CaseStudyCard({ project, index, onViewDetails }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onViewDetails(project)
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails(project)}
      onKeyDown={handleKey}
      className="work-row"
      aria-label={`Open details for ${project.name}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 44px) minmax(0, 1fr) minmax(0, auto)',
        gap: 20,
        alignItems: 'center',
        padding: '22px 0',
        borderTop: '1px solid var(--line)',
        cursor: 'pointer',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--accent)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              transition: 'color 0.15s ease',
            }}
            className="work-row-title"
          >
            {project.name}
          </h3>
          <span className="tag">{project.type}</span>
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--ink-secondary)',
            lineHeight: 1.65,
            marginTop: 6,
            maxWidth: '72ch',
          }}
        >
          {project.description}
        </p>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.03em',
            color: 'var(--ink-muted)',
            marginTop: 10,
          }}
        >
          {project.stack.slice(0, 4).join(' · ')}
          {project.stack.length > 4 ? ` · +${project.stack.length - 4}` : ''}
        </p>
      </div>

      {project.image && (
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="work-row-thumb"
          style={{
            width: 128,
            height: 76,
            objectFit: 'cover',
            borderRadius: 2,
            border: '1px solid var(--line)',
            display: 'block',
          }}
        />
      )}

      <style>{`
        @media (max-width: 720px) {
          .work-row { grid-template-columns: minmax(0, 32px) minmax(0, 1fr) !important; }
          .work-row-thumb { display: none !important; }
        }
        .work-row:hover .work-row-title { color: var(--accent-deep); }
      `}</style>
    </article>
  )
}
