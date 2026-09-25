import { useEffect, useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const specRows = [
  { key: 'Role', value: 'AI Skills Engineer, CHG Healthcare' },
  { key: 'Base', value: 'Herriman, Utah' },
  { key: 'Focus', value: 'Agentic tooling, LLM migrations' },
  { key: 'Stack', value: 'Python · SQL · TypeScript · Next.js' },
  { key: 'Now', value: 'Paper under review at EMSE' },
]

// Lab log — the "evidence behind the name" layer, dossier-flavored.
const leftFeed = [
  'skill: snowflake-ingest → v14 ✓',
  'propagated → 12 daughter repos',
  'hook: taxonomy-inject ✓ active',
  'sub-agent: review-bypass · live',
  'claude suggests skill: dbt-model ✓',
  'drift: 0 files across division',
  'manual PR review: dropped ✓',
  'ontology: 60+ engineers onboard',
]
const rightFeed = [
  '512 unit tests passing ✓',
  '83 test files with enforced specs ✓',
  '188 monthly decisions modeled',
  '5,000 bootstrap iterations',
  '370+ public commits',
  '80+ API endpoints live',
  '16 trials locked by SHA-256',
  'R² = 0.871 vs QuantConnect',
  '172 sets tracked',
  'paper: under review @ EMSE',
  'outbound: 95% of $15k/mo stack',
  'ocr: $0 per scan, client-side',
  'careermd: manual → automated ✓',
  'margin: $0 operating cost ✓',
  'status: still in high school',
]

export default function Hero() {
  const trackRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Act I (0 → ~0.4): dark showcase — giant name pinned over the lab log.
  // Dissolve (~0.35 → 0.7): dark act fades, paper curtain rises.
  // Act II (~0.7 → 1): paper dossier content.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgOpacity = useTransform(scrollYProgress, [0.35, 0.7], [1, 0])
  const typeScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.72])
  const typeY = useTransform(scrollYProgress, [0, 0.55], ['0vh', '-26vh'])
  const typeOpacity = useTransform(scrollYProgress, [0.45, 0.8], [1, 0])
  const labelsOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const contentY = useTransform(scrollYProgress, [0.45, 0.85], ['62vh', '0vh'])
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.68], [0, 1])
  const still = reduceMotion === true

  // Two-act palette: dark showcase vs paper dossier. Still mode is paper.
  const gridColor = still
    ? 'rgba(26,28,32,0.07)'
    : 'rgba(235,238,245,0.07)'
  const nameColor = still ? 'var(--ink)' : '#f2f3f1'
  const periodColor = still ? 'var(--accent)' : '#97a9f2'
  const cornerColor = still ? 'var(--ink-muted)' : 'rgba(235,238,245,0.62)'
  const cornerRule = still ? 'var(--line-strong)' : 'rgba(235,238,245,0.3)'
  const monoLabel = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: cornerColor,
    lineHeight: 1.7,
  }

  // NOTE: opacity MotionValues passed via `style` do not propagate to the DOM
  // in this setup (framer-motion 12.41 + React 19: transforms apply, opacity
  // stays frozen — verified live). Drive fades with direct DOM writes instead:
  // same visual result, zero re-renders.
  const typeOpacityRef = useRef(null)
  const labelsOpacityRef = useRef(null)
  const contentOpacityRef = useRef(null)
  const bgOpacityRef = useRef(null)
  useMotionValueEvent(typeOpacity, 'change', (v) => {
    if (!still && typeOpacityRef.current) typeOpacityRef.current.style.opacity = v
  })
  useMotionValueEvent(labelsOpacity, 'change', (v) => {
    if (!still && labelsOpacityRef.current) labelsOpacityRef.current.style.opacity = v
  })
  useMotionValueEvent(contentOpacity, 'change', (v) => {
    if (!still && contentOpacityRef.current) contentOpacityRef.current.style.opacity = v
  })
  useMotionValueEvent(bgOpacity, 'change', (v) => {
    if (!still && bgOpacityRef.current) bgOpacityRef.current.style.opacity = v
  })
  // Cover mid-page loads (no scroll event fires before first paint).
  useEffect(() => {
    if (still) return
    const pairs = [
      [typeOpacityRef, typeOpacity],
      [labelsOpacityRef, labelsOpacity],
      [contentOpacityRef, contentOpacity],
      [bgOpacityRef, bgOpacity],
    ]
    pairs.forEach(([ref, mv]) => {
      if (ref.current) ref.current.style.opacity = mv.get()
    })
  }, [still, typeOpacity, labelsOpacity, contentOpacity, bgOpacity])

  const trackStyle = still
    ? { position: 'relative', background: 'var(--paper)' }
    : { position: 'relative', height: '320vh', background: 'var(--paper)' }

  return (
    <section id="hero" ref={trackRef} style={trackStyle}>
      <div
        style={
          still
            ? { position: 'relative', overflow: 'hidden', padding: '120px 0 96px' }
            : {
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
              }
        }
      >
        {/* ── Act I: dark showcase (grid + lab log + margin notes) ─ */}
        <div
          ref={bgOpacityRef}
          aria-hidden
          className={still ? undefined : 'hero-dark'}
          style={
            still
              ? { position: 'absolute', inset: 0, opacity: 1 }
              : { position: 'absolute', inset: 0, opacity: 1, background: '#0e1013' }
          }
        >
        <motion.div
          aria-hidden
          style={
            still
              ? { position: 'absolute', inset: 0 }
              : { position: 'absolute', inset: '-12% 0', y: bgY }
          }
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse 90% 75% at 50% 45%, black 30%, transparent 75%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 75% at 50% 45%, black 30%, transparent 75%)',
            }}
          />
        </motion.div>
        {/* ── Lab log rails ─────────────────────────────────────── */}
        <motion.div
          aria-hidden
          style={
            still
              ? { position: 'absolute', inset: 0, opacity: 0.9 }
              : { position: 'absolute', inset: '-12% 0', y: bgY }
          }
        >
          <div className="hero-feed hero-feed-left">
            {leftFeed.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div className="hero-feed hero-feed-right">
            {rightFeed.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </motion.div>

        {/* ── Margin notes (fade with Act I) ────────────────────── */}
        <div
          ref={labelsOpacityRef}
          aria-hidden
          className="hero-corners"
          style={{ opacity: 1 }}
        >
          <div className="hero-corner hero-corner-tl" style={{ ...monoLabel, borderColor: cornerRule }}>
            Field dossier
            <br />
            Nº 001
          </div>
          <div className="hero-corner hero-corner-tr" style={{ ...monoLabel, borderColor: cornerRule }}>
            Scroll
            <br />
            to explore
          </div>
          <div className="hero-corner hero-corner-bl" style={{ ...monoLabel, borderColor: cornerRule }}>
            AI tooling · CHG Healthcare
          </div>
          <div className="hero-corner hero-corner-br" style={{ ...monoLabel, borderColor: cornerRule }}>
            Herriman, Utah · ©2026
          </div>
          <div className="hero-scrollcue" aria-hidden>
            <span style={monoLabel}>Scroll</span>
            <span className="hero-scrollcue-line" style={{ background: cornerRule }} />
          </div>
        </div>
        </div>

        {/* ── Giant pinned name ─────────────────────────────────── */}
        <motion.div
          ref={typeOpacityRef}
          style={
            still
              ? { position: 'relative', maxWidth: 1120, margin: '0 auto', padding: '0 24px' }
              : {
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  scale: typeScale,
                  y: typeY,
                  opacity: 1,
                  pointerEvents: 'none',
                }
          }
        >
          <motion.div
            className="hero-type-inner"
            initial={still ? false : { opacity: 0, y: 28 }}
            animate={still ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: 'clamp(2.9rem, 11.5vw, 11rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
              color: nameColor,
              textAlign: 'left',
            }}
          >
            Parker
            <br />
            Fawcett<span style={{ color: periodColor }}>.</span>
          </h1>
          </motion.div>
        </motion.div>

        {/* ── Act II: paper dossier content ───────────────────────── */}

        <motion.div
          ref={contentOpacityRef}
          style={
            still
              ? {
                  position: 'relative',
                  maxWidth: 1120,
                  margin: '72px auto 0',
                  padding: '0 24px',
                  width: '100%',
                }
              : {
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  y: contentY,
                  opacity: 0,
                  pointerEvents: 'none',
                  background: 'var(--paper)',
                }
          }
        >
          <div
            className="hero-panel"
            style={{ maxWidth: 1120, margin: '0 auto', padding: '84px 24px 0', width: '100%', pointerEvents: 'auto' }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-deep)',
                  borderBottom: '2px solid var(--accent)',
                  paddingBottom: 4,
                }}
              >
                Enterprise Data &amp; AI
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                CHG Healthcare
              </span>
            </div>

            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 360px)', gap: 56, alignItems: 'end' }}>
              <div>
                <p
                  style={{
                    fontSize: 'clamp(1.05rem, 1.7vw, 1.25rem)',
                    color: 'var(--ink-secondary)',
                    maxWidth: '44ch',
                    marginBottom: 30,
                    lineHeight: 1.7,
                  }}
                >
                  I build AI developer tooling at CHG Healthcare. Outside of that I run a few
                  SaaS products, a holding company, and an open-source research project on
                  how AI rebuilds of software go wrong.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                  <a href="#case-studies" className="btn btn-primary">
                    See the work
                  </a>
                  <a href="#contact" className="btn btn-secondary">
                    Get in touch
                  </a>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Résumé
                  </a>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.05em',
                    color: 'var(--ink-muted)',
                  }}
                >
                  Herriman, Utah · still in high school
                </p>
              </div>

              <aside
                aria-label="Quick facts"
                style={{
                  background: 'var(--paper-raised)',
                  border: '1px solid var(--line)',
                  borderLeft: '3px solid var(--ink)',
                  borderRadius: '0 4px 4px 0',
                  padding: '20px 22px 12px',
                }}
              >
                <img
                  src="/images/parker.webp"
                  alt="Parker Fawcett"
                  width="288"
                  height="288"
                  style={{
                    width: '100%',
                    height: 190,
                    objectFit: 'cover',
                    objectPosition: '38% 25%',
                    borderRadius: 3,
                    border: '1px solid var(--line-strong)',
                    marginBottom: 16,
                    display: 'block',
                  }}
                />
                {specRows.map((row) => (
                  <div
                    key={row.key}
                    style={{
                      padding: '9px 0',
                      borderBottom: row.key !== 'Now' ? '1px solid var(--line)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-muted)',
                        marginBottom: 2,
                      }}
                    >
                      {row.key}
                    </span>
                    <span style={{ fontSize: '0.84rem', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.45 }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-type-inner { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .hero-feed {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          line-height: 2.5;
          white-space: nowrap;
          color: rgba(26, 28, 32, 0.42);
          animation: hero-feed-drift 26s linear infinite alternate;
        }
        .hero-feed-right { color: rgba(26, 28, 32, 0.32); animation-delay: -13s; }
        .hero-dark .hero-feed { color: rgba(235, 238, 245, 0.4); }
        .hero-dark .hero-feed-right { color: rgba(235, 238, 245, 0.28); }
        .hero-feed-left { left: max(16px, calc(50% - 760px)); text-align: left; }
        .hero-feed-right { right: max(16px, calc(50% - 760px)); text-align: right; }
        @keyframes hero-feed-drift {
          from { margin-top: -34px; }
          to { margin-top: 34px; }
        }
        .hero-corners { position: absolute; inset: 0; pointer-events: none; }
        .hero-corner { position: absolute; padding-left: 10px; border-left: 1px solid var(--line-strong); }
        .hero-corner-tl { top: 84px; left: max(20px, calc(50% - 720px)); }
        .hero-corner-tr { top: 84px; right: max(20px, calc(50% - 720px)); text-align: right; padding-left: 0; padding-right: 10px; border-left: none; border-right: 1px solid var(--line-strong); }
        .hero-corner-bl { bottom: 28px; left: max(20px, calc(50% - 720px)); }
        .hero-corner-br { bottom: 28px; right: max(20px, calc(50% - 720px)); text-align: right; padding-left: 0; padding-right: 10px; border-left: none; border-right: 1px solid var(--line-strong); }
        .hero-scrollcue {
          position: absolute;
          bottom: 26px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .hero-scrollcue-line {
          display: block;
          width: 1px;
          height: 44px;
          background: var(--line-strong);
          transform-origin: top;
          animation: hero-cue 1.8s ease-in-out infinite;
        }
        @keyframes hero-cue {
          0% { transform: scaleY(0); opacity: 0; }
          35% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1) translateY(10px); opacity: 0; }
        }
        @media (max-width: 1100px) {
          .hero-feed { display: none; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 32px !important; }
          .hero-grid > aside { order: -1; }
          .hero-grid > aside img { height: 150px !important; }
          .hero-corner-bl, .hero-corner-br { display: none; }
        }
        @media (max-height: 760px) and (min-width: 901px) {
          .hero-grid > aside img { height: 140px !important; }
        }
      `}</style>
    </section>
  )
}
