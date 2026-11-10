import { readFileSync, readdirSync } from 'node:fs'
import { site, papers, findings, projects, contributions, repos, talks, timeline, now, bios, socials } from '../content/data.mjs'
import { esc, md, plain, longDate, shortDate, html } from './util.mjs'
import { page, personLd, websiteLd } from './layout.mjs'

// ---------- writing content ----------
export function loadPosts() {
  const dir = new URL('../content/writing/', import.meta.url)
  return readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => {
      const raw = readFileSync(new URL(f, dir), 'utf8')
      const [, fm, rest] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      const meta = Object.fromEntries(fm.split('\n').map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]))
      const [body, sources = ''] = rest.split('<!--sources-->')
      return { slug: f.replace(/\.html$/, ''), ...meta, body, sources }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

const links = (arr) =>
  arr.map((l) => `<a href="${l.href}"${/^https?:/.test(l.href) ? ' rel="noopener"' : ''}>${esc(l.label)}${/^https?:/.test(l.href) ? ' ↗' : ' →'}</a>`).join('')

const head = (kicker, h1, lede) => html`
<div class="wrap page-head">
  <p class="kicker">${esc(kicker)}</p>
  <h1>${esc(h1)}</h1>
  ${lede ? `<p class="lede">${md(lede)}</p>` : ''}
</div>`

const block = (title, more, inner, id = '') => html`
<section class="block"${id ? ` id="${id}"` : ''}>
  <div class="wrap">
    <div class="block-head"><h2>${esc(title)}</h2>${more ? `<a class="more" href="${more.href}">${esc(more.label)} →</a>` : ''}</div>
    ${inner}
  </div>
</section>`

const paperRow = (p, full = false) => html`
<article class="row paper">
  <p class="meta"><span class="chip">${esc(p.status)}</span> ${esc(p.field)}, ${p.year}</p>
  <h3>${esc(full ? p.title : p.short)}</h3>
  <p>${md(full ? p.summary : p.blurb)}</p>
  <p class="actions">${links(p.links)}</p>
</article>`

const postRow = (p) => html`
<article class="row post">
  <time datetime="${p.date}">${shortDate(p.date)}</time>
  <div>
    <h3><a href="/writing/${p.slug}/">${esc(p.title)}</a></h3>
    <p>${esc(p.deck)}</p>
  </div>
</article>`

const projectCard = (p) => html`
<article class="card" id="${p.slug}">
  ${p.image ? `<img src="${p.image}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy">` : ''}
  <div class="card-body">
    <p class="meta"><span class="chip">${esc(p.status)}</span> ${esc(p.kind)}, ${esc(p.year)}</p>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.summary)}</p>
    <p class="actions">${links(p.links)}</p>
  </div>
</article>`

const talkRow = (t) => html`
<article class="row talk">
  <time datetime="${t.date}">${esc(t.when)}</time>
  <div>
    <h3>${esc(t.title)}</h3>
    <p class="meta">${esc(t.event)}. ${esc(t.place)}.</p>
    <p>${esc(t.note)}</p>
  </div>
</article>`

// ---------- pages ----------
export function buildPages() {
  const posts = loadPosts()
  const out = []
  const add = (p) => out.push(p)

  // Home
  add({
    path: '/',
    lastmod: site.built,
    priority: '1.0',
    html: page({
      path: '/',
      fullTitle: `${site.name} | ${site.tagline}`,
      description: site.description,
      jsonld: [personLd, websiteLd, { '@type': 'ProfilePage', mainEntity: { '@id': `${site.url}/#parker` }, url: site.url + '/', name: site.name }],
      body: html`
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="kicker">Independent researcher and engineer</p>
      <h1>${site.name}</h1>
      <p class="hero-lead">I study why AI&#8209;written software passes its tests and <span class="ink-red">still does not work</span>.</p>
      <p class="hero-sub">I run a small lab with one rule: publish the red ink too. Every project keeps score honestly, passes and failures alike. By day I build AI tooling at CHG Healthcare, and I run <a href="/projects/#skora">Skora</a>, a college admissions platform.</p>
      <p class="cta"><a class="btn" href="/research/">Read the research</a><a class="btn ghost" href="/writing/">Read the writing</a></p>
      <ul class="inline-links">${socials.map((s) => `<li><a href="${s.href}" rel="me noopener">${s.label}</a></li>`)}</ul>
    </div>
    <img class="portrait" src="/images/parker.webp?v=2" alt="Portrait of Parker Fawcett" width="1000" height="1000" fetchpriority="high">
  </div>
</section>

<section class="idea">
  <div class="wrap idea-grid">
    <div>
      <p class="kicker">The question I work on</p>
      <h2>A passing test suite is not a correct rebuild.</h2>
      <p>A coding agent can rebuild an app until every test goes green. When one pipeline writes both the spec and the tests, they can share the same blind spot, so green says less than it appears to. My work measures that gap and proposes ways to audit it.</p>
      <p class="actions"><a href="/research/">See the papers →</a></p>
    </div>
    <div class="scorecards">
      <figure class="scorecard">
        <figcaption>An HTTP 200 stub, scored two ways</figcaption>
        <ul>
          <li class="pass"><span class="mark" aria-hidden="true">✓</span><span class="lbl">Visible tests<span class="vh"> passed</span></span><b>20/20</b></li>
          <li class="pass"><span class="mark" aria-hidden="true">✓</span><span class="lbl">Held-out test files<span class="vh"> passed</span></span><b>12/12</b></li>
          <li class="fail"><span class="mark" aria-hidden="true">✗</span><span class="lbl">Behavioral checks<span class="vh"> failed</span></span><b>0/77</b></li>
        </ul>
        <p class="src"><a href="https://github.com/Parker-Fawcett/rebuild-dossier/tree/main/evidence/baselines/constant-200" rel="noopener">Reproduce the baseline ↗</a></p>
      </figure>
      <figure class="scorecard">
        <figcaption>A stock-picking model, corrected for leakage</figcaption>
        <ul>
          <li class="pass"><span class="mark" aria-hidden="true">✓</span><span class="lbl">Test AUC<span class="vh"> held steady</span></span><b>0.553 → 0.551</b></li>
          <li class="fail"><span class="mark" aria-hidden="true">✗</span><span class="lbl">Selected stocks in common<span class="vh"> changed</span></span><b>38.9%</b></li>
        </ul>
        <p class="src"><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7468682" rel="noopener">Read the SSRN paper ↗</a></p>
      </figure>
    </div>
  </div>
</section>

${block('Latest writing', { href: '/writing/', label: 'All writing' }, `<div class="rows">${posts.map(postRow).join('')}</div><p class="book">Also in progress: <em>Experience Without Permission</em>, a book on how AI changes the way beginners become experts.</p>`)}
${block('Research', { href: '/research/', label: 'All research' }, `<div class="rows">${papers.map((p) => paperRow(p)).join('')}</div>`)}
${block('Projects', { href: '/projects/', label: 'All projects' }, `<div class="cards">${projects.slice(0, 4).map(projectCard).join('')}</div>`)}
${block('Speaking', { href: '/speaking/', label: 'All talks' }, `<div class="rows">${[...talks.upcoming, ...talks.past].map(talkRow).join('')}</div>`)}

<section class="block contact">
  <div class="wrap contact-grid">
    <h2>Get in touch</h2>
    <p>Email is the fastest way to reach me. I welcome replication attempts, technical feedback and invitations to speak or write.</p>
    <p class="cta"><a class="btn" href="mailto:${site.email}">${site.email}</a><a class="btn ghost" href="/press/">Press kit</a></p>
  </div>
</section>`,
    }),
  })

  // About
  add({
    path: '/about/',
    lastmod: site.built,
    priority: '0.8',
    html: page({
      path: '/about/',
      title: 'About',
      description: 'Parker Fawcett is an independent researcher and engineer in Utah. Bio, current work, experience and how to reach him.',
      jsonld: [{ ...personLd, '@type': 'Person' }],
      crumbs: [{ name: 'About', path: '/about/' }],
      body: html`
${head('About', 'About Parker Fawcett')}
<div class="wrap prose-wrap">
  <div class="prose">
    ${bios.long.map((p) => `<p>${md(p)}</p>`)}
    <h2>Right now</h2>
    <ul>${now.map((n) => `<li>${md(n)}</li>`)}</ul>
    <h2>Experience</h2>
    <ol class="timeline">${timeline.map((t) => `<li><p class="meta">${esc(t.when)}</p><h3>${esc(t.role)}, ${esc(t.org)}</h3><p>${md(t.text)}</p></li>`)}</ol>
    <h2>Education</h2>
    <p>High school in Utah, class of 2028, with concurrent enrollment at the Jordan Applied Technology Center and Salt Lake Community College.</p>
    <h2>Elsewhere</h2>
    <ul class="plain">${socials.map((s) => `<li><a href="${s.href}" rel="me noopener">${s.label} ↗</a></li>`)}<li><a href="/resume.pdf?v=2">Résumé (PDF) →</a></li><li><a href="mailto:${site.email}">${site.email}</a></li></ul>
  </div>
</div>`,
    }),
  })

  // Research
  add({
    path: '/research/',
    lastmod: site.built,
    priority: '0.9',
    html: page({
      path: '/research/',
      title: 'Research',
      description: 'Research by Parker Fawcett on verifying AI-generated software and on how accuracy metrics hide unstable decisions. Rebuild Dossier on arXiv, ICSE 2027 submission, and an SSRN finance paper.',
      image: '/images/og-research.jpg',
      jsonld: papers
        .filter((p) => p.ld)
        .map((p) => ({
          '@type': 'ScholarlyArticle',
          headline: p.title,
          url: p.ld.url,
          datePublished: p.ld.datePublished,
          author: { '@id': `${site.url}/#parker` },
          abstract: plain(p.summary),
        })),
      crumbs: [{ name: 'Research', path: '/research/' }],
      body: html`
${head('Research', 'Research', 'Two lines of work. One asks whether a coding agent built the software it was asked to build. The other finds where a standard machine-learning accuracy score hides unstable decisions. Profiles: [ORCID](https://orcid.org/0009-0003-9699-7422) and [Google Scholar](https://scholar.google.com/citations?hl=en&user=y4WhQAIAAAAJ).')}
<div class="wrap"><div class="rows">${papers.map((p) => paperRow(p, true)).join('')}</div></div>
${block('What the evaluation found', null, `<div class="prose narrow"><p class="statement">A passing suite can leave the wrong behavior intact.</p>${findings.map((f) => `<p>${md(f)}</p>`).join('')}</div>`)}
${block('From the workbench', { href: '/writing/', label: 'All writing' }, `<div class="rows">${posts.map(postRow).join('')}</div>`)}`,
    }),
  })

  // Projects
  add({
    path: '/projects/',
    lastmod: site.built,
    priority: '0.8',
    html: page({
      path: '/projects/',
      title: 'Projects',
      description: 'Projects by Parker Fawcett: Rebuild Dossier, Skora, CatchAndTrade, MyNexusAI, Alvien, the Roblox game Nightmart and the Code Elevation competition.',
      crumbs: [{ name: 'Projects', path: '/projects/' }],
      body: html`
${head('Projects', 'Projects', 'Things I built or run, each labeled with its current stage. Failed runs and limits are published alongside the results.')}
<div class="wrap"><div class="cards">${projects.map(projectCard).join('')}</div></div>
${block('Open-source contributions', null, `<div class="prose narrow"><p>Three merged fixes to <a href="https://github.com/openclaw/openclaw" rel="noopener">OpenClaw</a>, an open-source agent framework.</p><ul>${contributions.map((c) => `<li><a href="${c.href}" rel="noopener">${esc(c.title)} ↗</a></li>`).join('')}</ul></div>`)}
${block('More on GitHub', { href: 'https://github.com/Parker-Fawcett', label: 'All repositories' }, `<div class="rows">${repos.map((r) => `<article class="row"><h3><a href="${r.href}" rel="noopener">${esc(r.name)} ↗</a></h3><p>${esc(r.text)}</p></article>`).join('')}</div>`)}
${block('Roblox development', null, `<div class="prose narrow"><p>I write Luau for Roblox: server-owned game rules, camera and UI systems, progression and save-data integration. Nightmart is the working example, and I take well-scoped contracts.</p><p class="actions"><a href="/roblox/">Roblox work →</a><a href="/roblox/nightmart/">Nightmart case study →</a></p></div>`)}`,
    }),
  })

  // Speaking
  add({
    path: '/speaking/',
    lastmod: site.built,
    priority: '0.7',
    html: page({
      path: '/speaking/',
      title: 'Speaking',
      description: 'Talks by Parker Fawcett on verifying AI-generated software, AI evaluation and how beginners become experts. Upcoming and past events, plus topics for hosts.',
      crumbs: [{ name: 'Speaking', path: '/speaking/' }],
      jsonld: talks.upcoming.map((t) => ({
        '@type': 'Event',
        name: t.event,
        startDate: t.date,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: t.place.split(',').slice(0, 2).join(',') },
        performer: { '@id': `${site.url}/#parker` },
        description: t.note,
      })),
      body: html`
${head('Speaking', 'Speaking', 'Short talks on testing AI-built software and on how AI changes learning. I am happy to talk to meetups, clubs, classes and podcasts.')}
${block('Upcoming', null, `<div class="rows">${talks.upcoming.map(talkRow).join('')}</div>`)}
${block('Past', null, `<div class="rows">${talks.past.map(talkRow).join('')}</div>`)}
${block('Topics I can cover', null, `<ul class="topics">${talks.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul><p class="actions"><a href="mailto:${site.email}?subject=Speaking%20request">Invite me to speak ↗</a><a href="/press/">Bio and photo →</a></p>`)}`,
    }),
  })

  // Writing index
  add({
    path: '/writing/',
    lastmod: posts[0].date,
    priority: '0.9',
    html: page({
      path: '/writing/',
      title: 'Writing',
      description: 'Field notes by Parker Fawcett on building software with coding agents and checking whether it works.',
      crumbs: [{ name: 'Writing', path: '/writing/' }],
      jsonld: [{ '@type': 'Blog', name: `${site.name}, Writing`, url: `${site.url}/writing/`, author: { '@id': `${site.url}/#parker` }, blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${site.url}/writing/${p.slug}/`, datePublished: p.date })) }],
      body: html`
${head('Writing', 'Writing', 'Field notes on building software and checking whether it works. Subscribe with the [RSS feed](/feed.xml).')}
<div class="wrap"><div class="rows">${posts.map(postRow).join('')}</div>
<p class="book">In progress: <em>Experience Without Permission</em>, a book on how AI is changing the way beginners become experts.</p></div>`,
    }),
  })

  // Articles
  posts.forEach((p, i) => {
    const prev = posts[i + 1]
    const next = posts[i - 1]
    const path = `/writing/${p.slug}/`
    add({
      path,
      lastmod: p.date,
      priority: '0.8',
      post: p,
      html: page({
        path,
        title: p.title,
        description: p.description,
        type: 'article',
        published: p.date,
        modified: p.date,
        crumbs: [{ name: 'Writing', path: '/writing/' }, { name: p.title, path }],
        jsonld: [{ '@type': 'BlogPosting', headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date, mainEntityOfPage: `${site.url}${path}`, image: site.url + site.ogImage, author: { '@id': `${site.url}/#parker` }, publisher: { '@id': `${site.url}/#parker` }, articleSection: p.category }],
        body: html`
<article class="wrap article">
  <header class="article-head">
    <p class="kicker"><a href="/writing/">Writing</a> / ${esc(p.category)}</p>
    <h1>${esc(p.title)}</h1>
    <p class="deck">${esc(p.deck)}</p>
    <p class="byline"><a href="/about/">${site.name}</a> <span>${longDate(p.date)}</span> <span>${p.read} min read</span></p>
  </header>
  <div class="prose article-body">${p.body}</div>
  ${p.sources ? `<aside class="sources prose"><h2>Source material</h2>${p.sources}</aside>` : ''}
  <aside class="author-box">
    <img src="/images/parker.webp?v=2" alt="" width="64" height="64" loading="lazy">
    <div>
      <p class="author-name">${site.name}</p>
      <p>Independent researcher. I build tools for coding agents and write about how to check the software they produce.</p>
      <p class="actions"><a href="/research/">Research →</a><a href="/about/">About →</a><a href="mailto:${site.email}">Reply by email ↗</a></p>
    </div>
  </aside>
  <nav class="pager" aria-label="More writing">
    ${prev ? `<a href="/writing/${prev.slug}/"><span>Previous</span>${esc(prev.title)}</a>` : '<span></span>'}
    ${next ? `<a class="r" href="/writing/${next.slug}/"><span>Next</span>${esc(next.title)}</a>` : '<a class="r" href="/writing/"><span>All posts</span>Back to writing</a>'}
  </nav>
</article>`,
      }),
    })
  })

  // Press
  add({
    path: '/press/',
    lastmod: site.built,
    priority: '0.6',
    html: page({
      path: '/press/',
      title: 'Press kit',
      description: 'Bios, photo, facts and interview topics for Parker Fawcett, an independent researcher on AI-written software reliability.',
      image: '/images/og-press.jpg',
      crumbs: [{ name: 'Press kit', path: '/press/' }],
      body: html`
${head('Press kit', 'Press kit', 'Everything a host, editor or event organizer needs. Copy any bio as written.')}
<div class="wrap prose-wrap">
  <div class="prose">
    <figure class="press-photo"><img src="/images/parker.webp?v=2" alt="Parker Fawcett" width="240" height="240"><figcaption><a href="/images/parker.webp?v=2" download="Parker-Fawcett-photo.webp">Download photo ↗</a></figcaption></figure>
    <h2>Short bio</h2>
    <p>${md(bios.short)}</p>
    <h2>Long bio</h2>
    ${bios.long.map((p) => `<p>${md(p)}</p>`)}
    <h2>Facts</h2>
    <dl class="facts">
      <div><dt>Current role</dt><dd>AI Skills Engineer, CHG Healthcare, Enterprise Data & AI</dd></div>
      <div><dt>Company</dt><dd>CEO of Skora, a college admissions platform</dd></div>
      <div><dt>Research</dt><dd>Coding-agent verification (arXiv, with a second paper under review at ICSE 2027). Machine-learning evaluation in finance (SSRN).</dd></div>
      <div><dt>Book</dt><dd><em>Experience Without Permission</em>, in progress</dd></div>
      <div><dt>Location</dt><dd>Utah</dd></div>
    </dl>
    <h2>Interview topics</h2>
    <ul>${talks.topics.map((t) => `<li>${esc(t)}</li>`)}</ul>
    <h2>Verify and contact</h2>
    <ul class="plain">
      <li><a href="/research/">Research and papers →</a></li>
      ${socials.map((s) => `<li><a href="${s.href}" rel="me noopener">${s.label} ↗</a></li>`)}
      <li><a href="/resume.pdf?v=2" download="Parker-Fawcett-resume.pdf">Résumé (PDF) ↗</a></li>
      <li><a href="mailto:${site.email}?subject=Interview%20request">Request an interview ↗</a></li>
    </ul>
  </div>
</div>`,
    }),
  })

  // 404
  add({
    path: '/404.html',
    file: '404.html',
    skipSitemap: true,
    html: page({
      path: '/404.html',
      title: 'Page not found',
      description: 'This page does not exist.',
      noindex: true,
      body: html`${head('404', 'Page not found', 'That address does not exist. Try [writing](/writing/), [research](/research/) or the [home page](/).')}`,
    }),
  })

  return { pages: out, posts }
}
