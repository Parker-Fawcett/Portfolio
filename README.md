# parkerfawcett.com

Static site with no runtime dependencies. `build.mjs` turns the data in `content/` into plain HTML in `dist/`.

```bash
npm run dev     # build, serve on http://localhost:4173, rebuild on change
npm run build   # write dist/
```

## Where things live

- `content/data.mjs`: site info, papers, projects, talks, timeline, bios. Edit text here.
- `content/writing/*.html`: one file per post. Front matter (title, description, deck, date, category, read) then the body. Put `<!--sources-->` before the source list.
- `lib/pages.mjs`: page templates. `lib/layout.mjs`: head, header, footer, JSON-LD.
- `src/site.css`: all styles. Light and dark follow the system setting.
- `public/`: copied into `dist/` as is (images, `resume.pdf`, the hand-written `/roblox/` pages).

The build also writes `sitemap.xml`, `robots.txt`, `feed.xml` and `llms.txt`.

## Adding a post

Copy an existing file in `content/writing/`, change the front matter and body, run `npm run build`. The index, home page, feed and sitemap update from the file.

## Status wording

Papers, talks and projects carry a status label. Use the exact stage: preprint, submitted or under review, accepted (upcoming), delivered. Move an item only when the stage has changed.
