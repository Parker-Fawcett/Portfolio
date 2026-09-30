const footerLinkStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.05em',
  color: 'rgba(246, 246, 244, 0.6)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(246, 246, 244, 0.12)' }}>
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
        <nav aria-label="Footer links" style={{ display: 'flex', gap: 24 }}>
          <a href="/research/" className="footer-link" style={footerLinkStyle}>
            Research
          </a>
          <a href="/writing/" className="footer-link" style={footerLinkStyle}>
            Writing
          </a>
          <a href="/press/" className="footer-link" style={footerLinkStyle}>
            Press / media
          </a>
          <a href="#hero" className="footer-link" style={footerLinkStyle}>
            Back to top ↑
          </a>
        </nav>
      </div>
      <style>{`
        .footer-link:hover { color: #f6f6f4 !important; }
      `}</style>
    </footer>
  )
}
