# DESIGN.md — Parker Fawcett portfolio

Direction: **lab dossier**. The site should read like the EMSE paper it cites:
empirical, tabular, printed. Ink on paper, monospace data, ruled lines.

## Tokens (see `src/index.css`)

- `--paper` `#f6f6f4` — page ground. `--paper-raised` `#fcfcfb` — cards.
- `--ink` `#1a1c20` — type, primary buttons. `--ink-secondary` `#46494f` —
  body. `--ink-muted` `#6d7076` — labels only (never body copy).
- `--line` / `--line-strong` — rules and borders.
- `--accent` `#1f44c8` / `--accent-deep` `#16307f` — base blue.
   Chapters carry their own locked accent (marker, checks, FIG tag,
   active rail marker): AUC `#16307f`, Fawcett `#1e6b3c`, Rebuild
   `#1f44c8`, Skora `#8c2f2f`, CatchAndTrade `#8a5a00`, MyNexusAI
   `#0e6e6e`, Alvien `#6d2f7b`, Code Elevation `#9a4a00`. All dark
   ink hues on paper — never fills, never glows, never gradients.
- Type: IBM Plex Sans (prose/UI), IBM Plex Mono (display, data, labels).
  Display face is Mono — that *is* the brand. No third family, no Inter,
  no trendy serif.

## Hard rules (anti-slop)

1. **No gradients.** No linear/radial color washes, no gradient text.
   Fades via masks only where a texture must dissolve (e.g. grid edges).
2. **No glow.** No blurred accent blobs, no neon shadows. Emphasis comes
   from weight, scale, and rules — not light effects.
3. **No glass.** No `backdrop-blur` panels. Cards are solid `paper-raised`
   with 1px `line` borders.
4. **Radii 2–4px max.** Sharp, printed feel. No pills (except the scroll
   cue line, which is 1px).
5. **Two acts, earned.** The hero opens with Act I: a flat near-black
   (`#0e1013`) cinematic showcase — no glow, no gradient, no glass, ever.
   It dissolves into Act II: the paper dossier, which carries all bulk
   reading. Dark is for showcase imagery only; text lives on paper.
   Chapters play-then-lock: snap sections (`proximity`, never
   `mandatory` — the scroll is never hijacked) that play a varied
   entrance on arrival and settle. Condensed phases (statement +
   top-3 proof + before/after + figure) because full chapters exceed
   100vh — complete metrics live in the Details modal.
6. **Numbers carry provenance.** Every stat ships with source + date.
   Floating context-free numerals are banned — use the appendix table.
7. **Left-aligned display type.** Centered heroes are the template
   default. Asymmetry + negative space instead.
8. **Motion with intent.** Scroll choreography and one eased hover per
   control. No fade-in-on-everything, no bounce, nothing that loops
   without meaning. Honor `prefers-reduced-motion` with a static layout.
   The sanctioned reveal is `Reveal.jsx`: once-only entrances on chapter
   landmarks (statements, figures, stat rows, section titles) with a
   cycling variant — `wipe`, `center` (middle-out open), `left`,
   `right`, `zoom` — so the scroll never repeats the same trick.
   Never bare opacity fades.
9. **Contrast is measured.** Muted-on-paper must clear 4.5:1. Check new
   pairs, don't eyeball.

## Known framework quirk

framer-motion 12.41 + React 19: `opacity` MotionValues passed via `style`
on target-scroll components never reach the DOM (transforms work fine —
verified in dev and prod builds). Fades are driven via
`useMotionValueEvent` + direct DOM writes in `Hero.jsx`. If upgrading
framer-motion, re-test and delete the workaround.

Verified unaffected: `whileInView` animate paths (`Reveal.jsx`) resolve
opacity/clip-path correctly in prod — the quirk is specific to
scroll-linked MotionValues passed through `style`.
