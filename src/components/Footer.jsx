export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--ink)' }}>
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '26px 24px',
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
            color: 'rgba(246, 246, 244, 0.6)',
          }}
        >
          © {new Date().getFullYear()} Parker Fawcett
        </span>
        <a
          href="#hero"
          className="footer-top"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            color: 'rgba(246, 246, 244, 0.6)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Back to top ↑
        </a>
      </div>
      <style>{`
        .footer-top:hover { color: #f6f6f4 !important; }
      `}</style>
    </footer>
  )
}
