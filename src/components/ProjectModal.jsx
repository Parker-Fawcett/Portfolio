export default function ProjectModal({ project, onClose }) {
  const handleKey = (e) => {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      onKeyDown={handleKey}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(26, 28, 32, 0.48)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 720,
          maxHeight: '88vh',
          overflowY: 'auto',
          background: 'var(--paper)',
          border: '1px solid var(--line-strong)',
          borderRadius: 4,
          boxShadow: '0 24px 64px rgba(20, 22, 26, 0.18)',
        }}
      >
        {project.image && (
          <div
            style={{
              height: 220,
              position: 'relative',
              borderBottom: '1px solid var(--line)',
              background: 'var(--paper-raised)',
            }}
          >
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 2,
                border: '1px solid var(--line-strong)',
                background: 'var(--paper-raised)',
                color: 'var(--ink)',
                fontSize: '0.85rem',
                lineHeight: 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-deep)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)' }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ padding: '28px 30px 34px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 10,
              marginBottom: 14,
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{project.name}</h2>
            {!project.image && (
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--ink)',
                  fontSize: '0.85rem',
                  lineHeight: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 0.15s ease',
                }}
              >
                ✕
              </button>
            )}
            <span className="tag">{project.type}</span>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.75, marginBottom: 26 }}>
            {project.description}
          </p>

          <section style={{ marginBottom: 26 }}>
            <h3 className="modal-h">Full tech stack</h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.03em',
                color: 'var(--ink-secondary)',
                lineHeight: 1.9,
              }}
            >
              {project.stack.join(' · ')}
            </p>
          </section>

          {project.architecture && (
            <section style={{ marginBottom: 26 }}>
              <h3 className="modal-h">Architecture &amp; approach</h3>
              <div
                style={{
                  borderLeft: '2px solid var(--line-strong)',
                  paddingLeft: 18,
                }}
              >
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
                  {project.architecture.summary}
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: 18, display: 'grid', gap: 7 }}>
                  {project.architecture.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section style={{ marginBottom: 30 }}>
            <h3 className="modal-h">Key metrics</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: 18, display: 'grid', gap: 8 }}>
              {project.metrics.map((m, i) => (
                <li key={i} style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: 1.65 }}>
                  {m}
                </li>
              ))}
            </ul>
          </section>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit live site
            </a>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                GitHub
              </a>
            )}
          </div>
        </div>

        <style>{`
          .modal-h {
            font-family: var(--font-mono);
            font-size: 0.68rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--ink-muted);
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    </div>
  )
}
