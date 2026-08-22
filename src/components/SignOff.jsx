export default function SignOff() {
  return (
    <section style={{ padding: '120px 24px 72px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <p className="signoff" style={{ color: 'var(--paper)' }}>
          Still in high school<span style={{ color: 'var(--accent-lift)' }}>.</span>
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: 'rgba(246, 246, 244, 0.55)',
            marginTop: 14,
          }}
        >
          Graduating June 2028. The tooling ships anyway.
        </p>
      </div>
    </section>
  )
}
