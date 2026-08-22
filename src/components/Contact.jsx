import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const links = [
  { label: 'Email', href: 'mailto:Parkerscottfawcett@gmail.com', icon: '✉' },
  { label: 'GitHub', href: 'https://github.com/Parker-Fawcett', icon: '⌂' },
  { label: 'Website', href: 'https://www.parkerfawcett.com', icon: '◯' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/parker-fawcett', icon: '⊞' },
]

export default function Contact() {
  const isMobile = useIsMobile()

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <p className="section-label" style={{ justifyContent: 'center' }}>Contact</p>
        <h2 className="section-title" style={{ marginBottom: 18 }}>
          Let&apos;s Build <span className="gradient-text">Something</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 14px', lineHeight: 1.7 }}>
          Open to research collaboration, enterprise architecture discussions, and building the next generation of AI-powered tools.
        </p>
        <p style={{ fontSize: '0.8rem', fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: 44 }}>
          Herriman, UT&ensp;·&ensp;
          <a href="tel:+18015002924" style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}>801-500-2924</a>
          &ensp;·&ensp;
          <a href="https://www.parkerfawcett.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}>parkerfawcett.com</a>
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              {...(link.label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="glass"
              whileHover={{ y: -3 }}
              style={{
                padding: isMobile ? '13px 22px' : '15px 30px',
                borderRadius: 100,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                borderColor: 'var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)'
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = ''
              }}
            >
              <span style={{ fontSize: '1rem' }}>{link.icon}</span>
              {link.label === 'Email' ? 'Parkerscottfawcett@gmail.com' : link.href.replace('https://', '')}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
