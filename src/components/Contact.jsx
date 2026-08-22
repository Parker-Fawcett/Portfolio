const links = [
  { label: 'Email', href: 'mailto:Parkerscottfawcett@gmail.com', display: 'Parkerscottfawcett@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Parker-Fawcett', display: 'github.com/Parker-Fawcett' },
  { label: 'Website', href: 'https://www.parkerfawcett.com', display: 'parkerfawcett.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/parker-fawcett', display: 'linkedin.com/in/parker-fawcett' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-container" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="section-label">Contact</p>
      <h2 className="section-title">Get in touch</h2>

      <div style={{ maxWidth: 640 }}>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.75, marginBottom: 30 }}>
          Fastest way to reach me is email. Open to research collaborations, freelance
          builds, or talking shop about agent infrastructure.
        </p>

        <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginBottom: 30 }}>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 12,
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    minWidth: 72,
                  }}
                >
                  {link.label}
                </span>
                <span
                  className="contact-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--accent-deep)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    transition: 'color 0.15s ease',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {link.display}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            letterSpacing: '0.04em',
            color: 'var(--ink-muted)',
          }}
        >
          Herriman, Utah · <a href="tel:+18015002924" style={{ color: 'var(--ink-muted)' }}>801-500-2924</a>
        </p>
      </div>

      <style>{`
        .contact-link:hover { color: var(--accent) !important; }
      `}</style>
    </section>
  )
}
