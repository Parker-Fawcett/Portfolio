import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#case-studies' },
  { label: 'Spotlight', href: '#data-spotlight' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleItems = isMobile ? navItems.filter((item) => ['Home', 'Work'].includes(item.label)) : navItems

  return (
    <div style={{ position: 'fixed', top: isMobile ? 10 : 18, left: 0, right: 0, display: 'flex', justifyContent: scrolled ? 'flex-end' : 'center', padding: '0 14px', pointerEvents: 'none', zIndex: 1000 }}>
      <motion.nav
        layout
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }}
        style={{
          pointerEvents: 'auto',
          padding: isMobile ? '9px 18px' : '11px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 16 : 30,
          background: scrolled ? 'rgba(12, 12, 21, 0.85)' : 'rgba(12, 12, 21, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 100,
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.09)'}`,
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '0.85rem' : '1rem',
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          PF<span style={{ color: 'var(--accent-bright)' }}>.</span>
        </a>
        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', gap: isMobile ? 14 : 22 }}>
          {visibleItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: isMobile ? '0.72rem' : '0.8rem',
                fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-secondary)'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}
