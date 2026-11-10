export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Inline markup for data strings: [label](url) and *emphasis*. Input is escaped first.
export const md = (s = '') =>
  esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
      const external = /^https?:/.test(u)
      return `<a href="${u}"${external ? ' rel="noopener"' : ''}>${t}</a>`
    })
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')

export const plain = (s = '') => String(s).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*/g, '')

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const longDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
export const shortDate = (iso) => {
  const [y, m] = iso.split('-').map(Number)
  return `${MONTHS[m - 1].slice(0, 3)} ${y}`
}
export const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString()

export const html = (strings, ...vals) =>
  strings.reduce((out, s, i) => out + s + (Array.isArray(vals[i]) ? vals[i].join('') : (vals[i] ?? '')), '')
