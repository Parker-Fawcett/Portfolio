export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            color: 'var(--ink-muted)',
          }}
        >
          © {new Date().getFullYear()} Parker Fawcett
        </span>
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            color: 'var(--ink-muted)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { e.target.style.color = 'var(--accent-deep)' }}
          onMouseLeave={(e) => { e.target.style.color = 'var(--ink-muted)' }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
