export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '36px 24px',
        fontSize: '0.7rem',
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: '0.04em',
        color: 'var(--text-muted)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      &copy; {new Date().getFullYear()} Parker Fawcett&ensp;·&ensp;Built with React & Framer Motion
    </footer>
  )
}
