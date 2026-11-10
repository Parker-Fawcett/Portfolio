// Local preview: builds the site, serves dist/ on :4173, rebuilds when sources change.
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync, watch } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, extname } from 'node:path'

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' }
const build = () => {
  try { execFileSync('node', ['build.mjs'], { stdio: 'inherit' }) } catch { /* keep serving the last good build */ }
}
build()
let timer
for (const dir of ['content', 'lib', 'src', 'public']) {
  watch(dir, { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(build, 150) })
}
createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let f = join('dist', p)
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html')
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': types['.html'] }); return res.end(readFileSync('dist/404.html')) }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' })
  res.end(readFileSync(f))
}).listen(4173, () => console.log('http://localhost:4173'))
