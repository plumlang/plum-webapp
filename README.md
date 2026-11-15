# plum.elixpo.com

The website and documentation of [Plumlang](https://github.com/plumlang/plumlang),
a small, fast, memory-safe programming language. An Elixpo production, created
by Ayushman Bhattacharya, Subhro Koley and Rohan Hudati.

The site is fully static: Next.js exports it to `out/`, and Cloudflare Pages
serves it at <https://plum.elixpo.com>. There is no server code, no API route
and no server action.

## What is here

| Path | Contents |
|---|---|
| `/` | The landing page: what Plumlang is, a first program, features, install. |
| `/docs/` | The documentation's overview. |
| `/docs/tour/` | A beginner's tour in eleven steps, written for this site. |
| `/docs/language/` | The language reference: `docs/spec.md`, one page per section. |
| `/docs/stdlib/` | The standard library: one page per module from `docs/stdlib/`. |
| `/docs/errors/` | Every error code, each with its own anchor (`/docs/errors/#E0401`). |
| `/docs/install/` | Download and install. |
| `/playground/` | Placeholder for the WebAssembly playground ([plumlang#32](https://github.com/plumlang/plumlang/issues/32)). |

## Source of truth

The language, its specification and its library documentation live in
[plumlang/plumlang](https://github.com/plumlang/plumlang). This repository
keeps a reviewed snapshot of that `docs/` folder in `content/docs/`, so a
build never fetches anything and is reproducible from this tree.
`content/docs/source.json` records the commit the snapshot came from and a
hash of each file.

To update the snapshot, with a plumlang checkout next to this repository:

```bash
node scripts/sync-docs.mjs ../plumlang          # or: npm run docs:sync -- ../plumlang
node scripts/sync-docs.mjs ../plumlang --check  # or: npm run docs:check -- ../plumlang
```

The script copies `docs/spec.md`, `docs/errors.md` and `docs/stdlib/*.md`,
removes files deleted upstream, and refuses a checkout whose `docs/` has
uncommitted changes (`--allow-dirty` previews them locally). Commit the result
as its own change, and review it like any other: the diff is the docs' diff.

Corrections to the reference go to plumlang; every reference page links to
its source with "Edit this page on GitHub". The tour (`content/tour/`) and the
install page (`content/site/`) belong to this repository. Every runnable
sample in the tour is run against `plum` before it is committed, and its
output is shown exactly as printed.

Brand assets (the pixel plum in `app/icon.svg`, `public/plum.svg` and the
icons made from it) come from
[plumlang/branding](https://github.com/plumlang/branding).

## How it is built

| Part | Where |
|---|---|
| Pages and layouts | `app/` (Next.js 16 App Router, React 19) |
| Components | `components/` (Tailwind CSS v4, shadcn) |
| Docs registry: pages, order, navigation, links | `lib/docs.ts` |
| Markdown rendering ([marked](https://marked.js.org)) | `lib/markdown.ts` |
| Plumlang syntax highlighting | `lib/highlight.ts` |
| Metadata, Open Graph, JSON-LD | `lib/seo.ts`, `lib/site.ts` |
| Sitemap, robots, web manifest | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` |
| Cloudflare Pages headers | `public/_headers` |

The spec is split at its numbered `##` sections; headings get GitHub's slugs,
so anchors written for GitHub keep working, and "section 9.4" in the text
links to that part of the spec. Links between docs files become site links,
and links to other files of the plumlang repository go to GitHub.

`next.config.ts` sets `output: "export"` and `trailingSlash: true`: every page
is `out/<path>/index.html` and has exactly one URL, ending in `/`. Canonical
URLs, the sitemap and internal links all use that form.

## Development

Node.js 22 or later.

```bash
npm install
npm run dev          # http://localhost:3000
```

Before a pull request:

```bash
npm run lint
npm run typecheck
npm run build        # the static site, in out/
npm run site:check   # python3 scripts/check_site.py out
```

`scripts/check_site.py` (Python standard library only) checks the exported
site: one `<h1>`, a title, a description, a canonical URL and social cards on
every page; every internal link and `#anchor`; the sitemap against the pages;
`robots.txt`; and the files Cloudflare Pages needs.

## Deployment

Pushing to `main` deploys: `.github/workflows/deploy.yml` builds the site
with `npm run build` and publishes `out/` to the `plum-elixpo` Cloudflare
Pages project, which serves `plum.elixpo.com`. The CI and deploy workflows
are shared Elixpo workflows, synced from plumlang; change them there.

After a deploy, `.github/workflows/search-console.yml` submits the sitemap to
Google Search Console.

## Related repositories

- [plumlang/plumlang](https://github.com/plumlang/plumlang): the language,
  its compiler and runtime, the specification and the library docs.
- [plumlang/branding](https://github.com/plumlang/branding): the logo, icons
  and editor support.

## Licence

Plumlang is source-available under the
[Plumlang Commercial License 1.0](https://github.com/plumlang/plumlang/blob/main/LICENSE);
it is not open source. "Plumlang", "Plum" and the Plumlang logo are trademarks
of Elixpo. Questions: [hello@elixpo.com](mailto:hello@elixpo.com).
