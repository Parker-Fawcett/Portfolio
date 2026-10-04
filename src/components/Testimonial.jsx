import Reveal from './Reveal'

export default function Testimonial() {
  return (
    <section
      aria-label="What people say"
      className="section-container"
      style={{ borderTop: '1px solid var(--line)', paddingTop: 56, paddingBottom: 56 }}
    >
      <Reveal>
        <figure style={{ margin: 0, maxWidth: 820, borderLeft: '3px solid var(--accent)', paddingLeft: 'clamp(18px, 3vw, 32px)' }}>
          <blockquote
            style={{
              margin: 0,
              fontSize: 'clamp(1.1rem, 2.1vw, 1.45rem)',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              fontWeight: 500,
            }}
          >
            “I’ve enjoyed exchanging ideas with Parker about his Rebuild Dossier project and AI-assisted
            software development. After reviewing his work and running his repository’s tests, I was
            impressed by his attention to reproducibility, openness to feedback, and honest discussion of
            limitations. Parker brings curiosity and care to his work, and I’d gladly recommend him to teams
            looking for a thoughtful, motivated developer.”
          </blockquote>
          <figcaption
            style={{
              marginTop: 22,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              lineHeight: 1.8,
              color: 'var(--ink-muted)',
            }}
          >
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Sheikh Nazib</span>
            <br />
            AI Architect | Automation | Telecom AI
            <br />
            <a
              href="https://www.linkedin.com/in/parker-fawcett-0713a7407/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-deep)', textUnderlineOffset: 3 }}
            >
              LinkedIn recommendation · September 28, 2026 ↗
            </a>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
