# shoaibrayeen.github.io

[![Deploy to GitHub Pages](https://github.com/shoaibrayeen/shoaibrayeen.github.io/actions/workflows/deploy.yml/badge.svg?branch=master_revamp)](https://github.com/shoaibrayeen/shoaibrayeen.github.io/actions/workflows/deploy.yml)

Personal portfolio of **Mohd Shoaib Rayeen** — Technical Lead specializing in backend architecture, Gen AI, RAG/MCP integrations, and scalable distributed systems.

**Live:** https://shoaibrayeen.github.io/

## What's inside

A fully static single-page portfolio — one scrolling page composed of self-contained section components (Hero, About, Experience, Skills, Projects, Education, Contact, Achievements, Hobbies). All content is hardcoded inside the owning component; there is no CMS, no data files, and no backend. The only outbound calls are the contact form (Web3Forms), the resume download (Google Drive), and the [Cinema Hub](https://shoaibrayeen.github.io/cinema-hub/) link on the Hobbies section.

See [architecture.md](architecture.md) for the full architecture (with diagram) and [MIGRATION.md](MIGRATION.md) for the history of the Jekyll → React migration.

## Tech stack

| Layer | Tools |
|---|---|
| Build | Vite 5, TypeScript (loose mode) |
| UI | React 18, React Router 6, Tailwind CSS, shadcn/ui (Radix), lucide-react |
| Tests | Vitest 3, Testing Library, jsdom |
| Hosting | GitHub Pages (user site at the domain root) |

## Getting started

Node 22+ is required (CI uses Node 24).

```bash
npm install        # no lockfile is committed by design — see below
cp .env.example .env.local   # placeholder is fine for dev; real key lives only in the EMAIL_API_KEY GitHub secret
npm run dev        # dev server → http://localhost:8080/
npm test           # run the full test suite once (CI mode)
npm run test:watch # watch mode for development
npm run lint       # eslint
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Testing

Every source file has a test suite in `src/test/` — one per component/page/hook/util, plus clustered suites for the shadcn/ui primitives. Config lives in `vitest.config.ts`; shared jsdom mocks (matchMedia, ResizeObserver, IntersectionObserver, scrollIntoView) live in `src/test/setup.ts`.

**Every change must ship with new or updated tests in the same commit** — this is enforced by convention (see [CLAUDE.md](CLAUDE.md)) and by CI: the deploy workflow runs `npm test` before building, so a red suite blocks publishing.

## Deployment

⚠️ **Deploys trigger on `master_revamp`, not `master`.** The GitHub Actions workflow ([deploy.yml](.github/workflows/deploy.yml)) runs on every push to `master_revamp`:

```
push → npm install → npm test → vite build (⊕ EMAIL_API_KEY secret) → deploy dist/ to GitHub Pages
```

Notes:

- The contact-form key is **not in the source**: the build step maps the `EMAIL_API_KEY` repo secret (Settings → Secrets and variables → Actions) onto the `VITE_WEB3FORMS_ACCESS_KEY` env var (Vite only exposes `VITE_*` to client code) and fails if it's unset. The real key exists only in that secret — `.env.local` uses a placeholder and tests use a random stub. Locally, put it in `.env.local` (see `.env.example`). Note that Vite bakes `VITE_`-prefixed vars into the shipped JS bundle — Web3Forms access keys are public-facing by design, so this is repo hygiene, not true secrecy.
- This is a GitHub Pages **user site** served at the domain root — Vite `base` stays `/` and the router has no basename.
- Deep links work via the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) pattern: `public/404.html` redirects unknown paths into a query string that `index.html` decodes before React mounts. Don't delete `public/404.html` or `public/.nojekyll`.
- **No lockfile is committed** — CI runs `npm install`, so dependencies re-resolve on each deploy. Don't commit `package-lock.json` unless the workflow is switched to `npm ci` at the same time.

## Cross-repo contract

The About section here (`src/components/About.tsx`) is the **source of truth** for the "About Me" card in the [cinema-hub](https://github.com/shoaibrayeen/cinema-hub) repo. When About content changes here, cinema-hub's card must be updated to match — never the other way around.

## License

[MIT](LICENSE.txt) © Shoaib Rayeen
