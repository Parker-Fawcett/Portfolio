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
    <div style={{ position: 'fixed', top: isMobile ? 8 : 16, left: 0, right: 0, display: 'flex', justifyContent: scrolled ? 'flex-end' : 'center', padding: '0 12px', pointerEvents: 'none', zIndex: 1000 }}>
      <motion.nav
        layout
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }}
        className="card"
        style={{
          pointerEvents: 'auto',
          padding: isMobile ? '8px 16px' : '10px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 16 : 32,
          background: '#ffffff',
          borderRadius: 100,
          border: '3px solid #1a1a2e',
          boxShadow: '6px 6px 0px #1a1a2e',
        }}
      >
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: isMobile ? '0.85rem' : '1rem', color: '#1a1a2e' }}>
          PF<span style={{ color: '#7c3aed' }}>.</span>
        </span>
        <div style={{ display: 'flex', gap: isMobile ? 12 : 20 }}>
          {visibleItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: '#6b6b80',
                textDecoration: 'none',
                fontSize: isMobile ? '0.72rem' : '0.8rem',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'color 0.15s',
                padding: '4px 0',
                borderBottom: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#7c3aed'
                e.target.style.borderBottomColor = '#7c3aed'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b6b80'
                e.target.style.borderBottomColor = 'transparent'
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
