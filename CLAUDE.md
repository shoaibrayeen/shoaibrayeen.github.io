# CLAUDE.md — shoaibrayeen.github.io project rules

## Deploy branch is master_revamp, NOT master (critical)

- The GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers **only on push to `master_revamp`**. The repo's default branch on origin is `master`, but pushing `master` does **not** deploy anything.
- Do all site work on `master_revamp`. If asked to "deploy" or "publish", that means pushing `master_revamp`.

## Architecture docs stay in sync (mandatory)

- **Any change** that affects structure, routing, sections, the content model, build, or deployment **must update [architecture.md](architecture.md) in the same commit**.
- If the change alters a flow (build/deploy pipeline, request/deep-link handling, page → section → content relationships, external integrations), **update [architecture.svg](architecture.svg) as well** so the diagram matches the doc.
- New sections, components, or integrations are not done until they appear in both files.

## Changelog stays current (mandatory)

- **Every user-visible change must add an entry to [public/changelog.html](public/changelog.html) in the same commit** — new sections or features, content rewrites, visual/theme changes, bug fixes, removals. Skip it only for changes a visitor could never notice (test-only edits, internal refactors, doc/rule edits).
- Newest first. Work in progress goes in the single **Unreleased** block at the top (`<span class="badge-current">Unreleased</span>`); when the owner ships it, that block gets a real date (`<span class="date">26 Jul 2026</span>`) and a fresh Unreleased block is started for the next batch. Add to the existing Unreleased block rather than creating a second one.
- Each item is a `<li>` with a category tag — `added`, `changed`, `fixed` or `removed` — then plain-language wording aimed at a **site visitor, not a developer**: describe what changed for them, not file names, class names or commit hashes.
- The page is served at `/changelog.html` and is deliberately **standalone**: `public/` is copied verbatim by Vite, so Tailwind never processes it. Keep all CSS/JS inline in the file and never reference the app bundle. Its theme script reads the same `localStorage` key `"theme"` as `src/App.tsx` — if that key ever changes, update this file, `index.html` and the provider together.
- `src/test/changelog.test.ts` guards the page's structure and the storage-key contract; update it when the page's shape changes.

## Tests required for every change (mandatory)

- **Every code change must add or update test cases covering it, in the same commit.** New sections/components need at least a render test; content changes to contract-covered sections (About) need assertion updates.
- Tests live in `src/test/` (Vitest + Testing Library + jsdom; config in `vitest.config.ts`, browser-API mocks in `src/test/setup.ts`). One suite per component/page/hook/util — notable contracts: `about.test.tsx` (About content — the cross-repo contract), `hobbies.test.tsx` (cinema-hub link), `app.test.tsx` (routing + 404 fallback).
- Run `npm test` before handing work over. CI runs the suite on every push to `master_revamp` and a failure blocks deployment.

## About Me is the source of truth for cinema-hub (cross-repo)

- The About section here (`src/components/About.tsx`, plus the bio in `Hero.tsx`) is the **single source of truth** for the "ABOUT ME" card in the cinema-hub repo (`/Users/shoaib.rayeen/my_space/cinema-hub/src/pages/Index.tsx`, live at https://shoaibrayeen.github.io/cinema-hub/).
- **Whenever About/bio content changes here, update cinema-hub's About Me card to match** (condensed to its card layout but factually identical). Never edit this repo to match cinema-hub — sync only flows outward. See cinema-hub's CLAUDE.md for the mirror rule.
- The Hobbies section's Cinema Enthusiast card links out to cinema-hub (`https://shoaibrayeen.github.io/cinema-hub/`) — the href is asserted in `src/test/hobbies.test.tsx`; keep both in sync if the URL ever changes.

## GitHub Pages constraints (USER site at root)

- This is a user site served at `https://shoaibrayeen.github.io/` — Vite `base` stays at the default `/` and `BrowserRouter` has **no basename**. Do not add either.
- Do not delete or rename `public/404.html` (`pathSegmentsToKeep = 0` — root site, unlike cinema-hub's `1`), the SPA decode script in `index.html`, or `public/.nojekyll`.
- Static assets go in `public/` and are referenced root-relative (e.g. `/profile.png`).

## Content model

- All portfolio content is **hardcoded in the owning section component** (`experiences[]` in Experience.tsx, `projects[]` in Projects.tsx, `skillCategories[]` in Skills.tsx, etc.). There are no data files, no CMS, no fetching — keep it that way unless explicitly asked.
- The contact form posts to Web3Forms; the access key is **not in the repo** — `Contact.tsx` reads `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`. The real key exists **only** in the `EMAIL_API_KEY` repo secret (mapped in `deploy.yml`); `.env.local` holds a placeholder for local dev (template in `.env.example`) and tests use a random per-run stub from `vitest.config.ts`. Never hardcode the key anywhere. The resume downloads from a Google Drive link in `Hero.tsx`. These are the app's only network calls.
- `ResumeSection.tsx` is dead code (not imported); the resume button lives in Hero.

## No Lovable references

This project was migrated away from Lovable (documented in MIGRATION.md — the only place the word may appear). Never (re)introduce `lovable-tagger`, `lovable.dev`/`lovable.app` URLs, or Lovable meta tags.

## Build & verification

- On this machine node/npm are not on PATH — prefix commands with:
  `export PATH=/Users/shoaib.rayeen/tools/node-v22.22.2-darwin-arm64/bin:$PATH`
- Verify changes with `npm test`, `npm run build`, and `npm run lint`, and by loading the dev server (`npm run dev` → http://localhost:8080/, root path — no base prefix here).
- **No lockfile is committed** by design (CI runs `npm install`); do not commit `package-lock.json` unless the workflow is switched to `npm ci` at the same time.
- The repo owner commits and pushes; do not commit or push unless explicitly asked.
