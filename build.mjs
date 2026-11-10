import { rmSync, mkdirSync, cpSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { site } from './content/data.mjs'
import { buildPages } from './lib/pages.mjs'
import { esc, rfc822, plain } from './lib/util.mjs'
import { papers, projects } from './content/data.mjs'

const OUT = 'dist'
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
cpSync('public', OUT, { recursive: true })
cpSync('src/site.css', join(OUT, 'site.css'))

const { pages, posts } = buildPages()

for (const p of pages) {
  const file = p.file ? join(OUT, p.file) : join(OUT, p.path, 'index.html')
  mkdirSync(join(file, '..'), { recursive: true })
  writeFileSync(file, p.html)
}

// Static sections that keep their own hand-written pages in public/.
const passthrough = [
  { path: '/roblox/', lastmod: '2026-10-27', priority: '0.5' },
  { path: '/roblox/nightmart/', lastmod: '2026-10-27', priority: '0.5' },
]
const entries = [...pages.filter((p) => !p.skipSitemap), ...passthrough]
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((e) => `  <url><loc>${site.url}${e.path}</loc><lastmod>${e.lastmod}</lastmod><priority>${e.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
)

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)

writeFileSync(
  join(OUT, 'feed.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>\n<title>${site.name}</title>\n<link>${site.url}/writing/</link>\n<description>Field notes on building software and checking whether it works.</description>\n<language>en-us</language>\n<atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>\n${posts
    .map(
      (p) =>
        `<item><title>${esc(p.title)}</title><link>${site.url}/writing/${p.slug}/</link><guid isPermaLink="true">${site.url}/writing/${p.slug}/</guid><pubDate>${rfc822(p.date)}</pubDate><description>${esc(p.description)}</description></item>`,
    )
    .join('\n')}\n</channel></rss>\n`,
)

writeFileSync(
  join(OUT, 'llms.txt'),
  `# ${site.name}\n\n> ${site.description}\n\n## Research\n${papers
    .map((p) => `- [${p.title}](${p.links[0].href}): ${p.status}. ${plain(p.blurb)}`)
    .join('\n')}\n\n## Writing\n${posts.map((p) => `- [${p.title}](${site.url}/writing/${p.slug}/): ${p.description}`).join('\n')}\n\n## Projects\n${projects
    .map((p) => `- ${p.name} (${p.status}): ${p.summary}`)
    .join('\n')}\n\n## Pages\n- [About](${site.url}/about/)\n- [Speaking](${site.url}/speaking/)\n- [Press kit](${site.url}/press/)\n- [Contact](mailto:${site.email})\n`,
)

console.log(`built ${pages.length} pages to ${OUT}/`)
