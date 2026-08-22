export default function SignOff() {
  return (
    <section style={{ padding: '110px 24px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <p className="signoff">
          Still in high school<span style={{ color: 'var(--accent)' }}>.</span>
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: 'var(--ink-muted)',
            marginTop: 14,
          }}
        >
          Graduating June 2028. The tooling ships anyway.
        </p>
      </div>
    </section>
  )
}
