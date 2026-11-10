import { site, nav, socials } from '../content/data.mjs'
import { esc, html } from './util.mjs'

const FONTS =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&display=swap'

export function page({ path, title, fullTitle, description, type = 'website', image, jsonld = [], crumbs = [], body, noindex = false, published, modified }) {
  const url = site.url + path
  const t = fullTitle || `${title} | ${site.name}`
  const img = site.url + (image || site.ogImage)
  const graph = [...jsonld]
  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: site.url + c.path,
      })),
    })
  }
  const ld = graph.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>` : ''
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#fbfaf7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121316" media="(prefers-color-scheme: dark)">
<meta property="og:site_name" content="${site.name}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${img}">
${published ? `<meta property="article:published_time" content="${published}">` : ''}
${modified ? `<meta property="article:modified_time" content="${modified}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="msvalidate.01" content="D5E67D9D7148D57948F56FBA31570DD3">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="${site.name}" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/site.css?v=${site.built}">
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="wordmark" href="/">${site.name}</a>
    <nav aria-label="Main">
      ${nav.map((n) => `<a href="${n.href}"${path.startsWith(n.href) ? ' aria-current="page"' : ''}>${n.label}</a>`)}
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap foot">
    <div>
      <p class="foot-name">${site.name}</p>
      <p class="foot-line">${esc(site.tagline)}.</p>
      <p><a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <div>
      <p class="foot-h">Browse</p>
      <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`)}<li><a href="/press/">Press kit</a></li></ul>
    </div>
    <div>
      <p class="foot-h">Elsewhere</p>
      <ul>${socials.map((s) => `<li><a href="${s.href}" rel="me noopener">${s.label}</a></li>`)}</ul>
    </div>
    <div>
      <p class="foot-h">Subscribe</p>
      <ul><li><a href="/feed.xml">RSS feed</a></li><li><a href="/resume.pdf?v=2">Résumé (PDF)</a></li></ul>
    </div>
  </div>
  <div class="wrap legal"><span>&copy; 2026 ${site.name}</span><span>Each paper and project carries its current status.</span></div>
</footer>
</body>
</html>
`
}

export const personLd = {
  '@type': 'Person',
  '@id': `${site.url}/#parker`,
  name: site.name,
  url: site.url + '/',
  image: `${site.url}/images/parker.webp?v=2`,
  jobTitle: 'AI Skills Engineer',
  description: site.description,
  worksFor: { '@type': 'Organization', name: 'CHG Healthcare', url: 'https://www.chghealthcare.com/' },
  sameAs: [
    'https://github.com/Parker-Fawcett',
    'https://www.linkedin.com/in/parker-fawcett-0713a7407/',
    'https://orcid.org/0009-0003-9699-7422',
    'https://scholar.google.com/citations?user=y4WhQAIAAAAJ',
    'https://arxiv.org/abs/2608.23616',
    'https://substack.com/@parkerfawcett',
    'https://x.com/Parker_Fawcett',
  ],
  knowsAbout: [
    'Coding agents',
    'AI-generated software verification',
    'Software testing',
    'Model Context Protocol',
    'Machine-learning evaluation',
    'Quantitative finance',
  ],
}

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url + '/',
  name: site.name,
  publisher: { '@id': `${site.url}/#parker` },
}
