const links = [
  { label: 'Email', href: 'mailto:Parkerscottfawcett@gmail.com', display: 'Parkerscottfawcett@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Parker-Fawcett', display: 'github.com/Parker-Fawcett' },
  { label: 'Website', href: 'https://www.parkerfawcett.com', display: 'parkerfawcett.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/parker-fawcett', display: 'linkedin.com/in/parker-fawcett' },
]

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '72px 24px 96px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <p
          className="section-label"
          style={{ color: 'rgba(246, 246, 244, 0.5)', marginBottom: 14 }}
        >
          04 · Contact
        </p>
        <h2 className="section-title" style={{ color: 'var(--paper)', marginBottom: 28 }}>
          Get in touch
        </h2>

        <div style={{ maxWidth: 640 }}>
          <p style={{ fontSize: '0.95rem', color: 'rgba(246, 246, 244, 0.72)', lineHeight: 1.75, marginBottom: 30 }}>
            Fastest way to reach me is email. Open to research collaborations, freelance
            builds, or talking shop about agent infrastructure.
          </p>

          <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginBottom: 34 }}>
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
                      color: 'rgba(246, 246, 244, 0.5)',
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
                      color: 'var(--accent-lift)',
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
              color: 'rgba(246, 246, 244, 0.55)',
            }}
          >
            Herriman, Utah ·{' '}
            <a href="tel:+18015002924" style={{ color: 'inherit' }} className="contact-phone">
              801-500-2924
            </a>
          </p>
        </div>
      </div>
      <style>{`
        .contact-link:hover { color: #f6f6f4 !important; }
        .contact-phone:hover { color: rgba(246, 246, 244, 0.85) !important; }
      `}</style>
    </section>
  )
}
