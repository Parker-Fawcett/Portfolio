const navItems = [
  { label: 'Experience', href: '#experience', desktopOnly: true },
  { label: 'Work', href: '#case-studies', desktopOnly: false },
  { label: 'Spotlight', href: '#data-spotlight', desktopOnly: true },
  { label: 'Contact', href: '#contact', desktopOnly: false },
]

export default function Navbar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(246, 246, 244, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Parker Fawcett
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.desktopOnly ? 'nav-desktop' : undefined}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-secondary)',
                textDecoration: 'none',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.target.style.color = 'var(--accent-deep)' }}
              onMouseLeave={(e) => { e.target.style.color = 'var(--ink-secondary)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </header>
  )
}
