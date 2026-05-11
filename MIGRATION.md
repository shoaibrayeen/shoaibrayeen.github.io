# Migration: Jekyll to React (Vite + Tailwind)

This document describes the migration of `shoaibrayeen.github.io` from a Jekyll-based static site to a modern React SPA, and all adaptations made for GitHub Pages compatibility.

## Overview

| Aspect | Before | After |
|--------|--------|-------|
| Framework | Jekyll (Markdown + Liquid) | React 18 + TypeScript |
| Build Tool | GitHub Pages built-in Jekyll | Vite 5 |
| Styling | Plain CSS (`css/main.css`) | Tailwind CSS + shadcn/ui |
| Components | HTML includes (`_includes/`) | React components (`src/components/`) |
| Deployment | Automatic Jekyll build | GitHub Actions -> Vite build -> Pages |
| Content Format | Markdown files | JSX/TSX components |

## Files Removed (Old Jekyll Site)

| File/Directory | Purpose |
|----------------|---------|
| `_config.yml` | Jekyll configuration |
| `_layouts/` | HTML layout templates (default, homepage, page, post) |
| `_includes/` | Shared HTML fragments (head, header, footer) |
| `css/main.css` | Site stylesheet |
| `doc/` | 10 Markdown pages with custom permalinks |
| `index.md` | Homepage content |
| `readMe.md` | Old README |
| `images/` | Image assets |

## Files Added/Modified

### New Files

| File | Purpose |
|------|---------|
| `src/` | Full React application source |
| `public/profile.png` | Profile photo (downloaded from Lovable CDN) |
| `public/404.html` | SPA redirect for GitHub Pages |
| `public/.nojekyll` | Prevents Jekyll processing on GitHub Pages |
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD pipeline |
| `package.json` | Node.js dependencies and scripts |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `index.html` | HTML shell with meta tags |
| `README.md` | Updated documentation |
| `MIGRATION.md` | This file |

### Modified from Source Portfolio

These files were changed from the original `shoaib-rayeen-portfolio` to ensure GitHub Pages compatibility:

| File | Change | Reason |
|------|--------|--------|
| `vite.config.ts` | Removed `lovable-tagger` import and plugin | Lovable-specific; not needed for GitHub Pages |
| `package.json` | Removed `lovable-tagger` devDependency, renamed package | Clean up Lovable references |
| `index.html` | Removed `gptengineer.js` script | Lovable tooling script; not needed |
| `index.html` | Updated OG/Twitter/canonical URLs | Point to `shoaibrayeen.github.io` instead of `lovable.app` |
| `index.html` | Added SPA redirect decode script | Handle GitHub Pages routing for SPA |
| `src/components/Hero.tsx` | Changed image path from `/lovable-uploads/...` to `/profile.png` | Image hosted locally instead of Lovable CDN |

---

## Route Map

### React Router Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `src/pages/Index.tsx` | Main single-scroll portfolio page |
| `*` (catch-all) | `src/pages/NotFound.tsx` | 404 page with "Return to Home" link |

### Page Sections (Scroll Targets)

| Section ID | Component | In Header Nav |
|------------|-----------|---------------|
| `home` | `Hero.tsx` | Yes |
| `about` | `About.tsx` | Yes |
| `experience` | `Experience.tsx` | Yes |
| `skills` | `Skills.tsx` | Yes |
| `projects` | `Projects.tsx` | Yes |
| `education` | `Education.tsx` | Yes |
| `contact` | `Contact.tsx` | Yes |
| `achievements` | `Achievements.tsx` | No (scroll only) |
| `hobbies` | `Hobbies.tsx` | No (scroll only) |

---

## Asset Inventory

### Local Assets (in `public/`)

| File | Purpose | Referenced By |
|------|---------|---------------|
| `profile.png` | Profile photo | `Hero.tsx`, `index.html` (OG/Twitter meta) |
| `404.html` | SPA redirect for GitHub Pages | GitHub Pages server |
| `.nojekyll` | Bypass Jekyll processing | GitHub Pages server |
| `robots.txt` | Search engine crawling rules | Direct URL access |
| `placeholder.svg` | Placeholder image | Available but unused |

### External Links

| Purpose | URL | Component |
|---------|-----|-----------|
| LinkedIn profile | `https://www.linkedin.com/in/shoaibrayeen/` | `Contact.tsx` |
| GitHub profile | `https://github.com/shoaibrayeen` | `Contact.tsx` |
| Email (Gmail compose) | `https://mail.google.com/mail/?view=cm&fs=1&to=shoaibrayeen.me@gmail.com` | `Contact.tsx` |
| Email (mailto fallback) | `mailto:shoaibrayeen.me@gmail.com` | `Contact.tsx` |
| Resume download | `https://drive.google.com/uc?export=download&id=1uIxXCEDzKNIDLiA7lw_ONSRKNxUkA3d8` | `Hero.tsx` |
| "Start a Conversation" | `https://www.linkedin.com/in/shoaibrayeen/` | `Contact.tsx` |

---

## GitHub Pages Compatibility

### Issues Fixed

#### Build Breakers

| Issue | Fix |
|-------|-----|
| `lovable-tagger` plugin in `vite.config.ts` | Removed import and plugin usage |
| `lovable-tagger` in `package.json` devDeps | Removed dependency |
| No build pipeline (GitHub Pages defaults to Jekyll) | Added GitHub Actions workflow |
| Jekyll processing ignores `_`-prefixed dirs | Added `.nojekyll` file |

#### Runtime Breakers

| Issue | Fix |
|-------|-----|
| Profile image path `/lovable-uploads/...` only on Lovable CDN | Downloaded to `public/profile.png`, updated `Hero.tsx` |
| `gptengineer.js` external script | Removed from `index.html` |
| `BrowserRouter` + GitHub Pages = 404 on direct URL access | Added `public/404.html` SPA redirect + decode script in `index.html` |

#### Metadata

| Issue | Fix |
|-------|-----|
| `og:url` pointed to `lovable.app` | Updated to `https://shoaibrayeen.github.io/` |
| `og:image` pointed to Lovable CDN | Updated to `https://shoaibrayeen.github.io/profile.png` |
| `twitter:image` pointed to Lovable CDN | Updated to `https://shoaibrayeen.github.io/profile.png` |
| `canonical` pointed to `lovable.app` | Updated to `https://shoaibrayeen.github.io/` |

### SPA Routing on GitHub Pages

GitHub Pages serves static files and returns a real 404 for unknown paths. Since this is a React SPA using `BrowserRouter`, we use the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) pattern:

1. `public/404.html` intercepts 404 responses and redirects to `/` with the path encoded as a query parameter
2. A script in `index.html` `<head>` decodes the query parameter and uses `history.replaceState` to restore the original URL
3. React Router then handles the route client-side

---

## Deployment

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**Trigger:** Push to `master_revamp` branch (or manual via `workflow_dispatch`)

**Steps:**
1. Checkout code
2. Setup Node.js 20 with npm cache
3. `npm install` (install dependencies)
4. `npm run build` (Vite builds to `dist/`)
5. Upload `dist/` as Pages artifact
6. Deploy to GitHub Pages

### First-time Setup

After the first push to `master_revamp`, configure GitHub Pages:

1. Go to the GitHub repository
2. Navigate to **Settings > Pages**
3. Under **Source**, select **"GitHub Actions"** (instead of "Deploy from a branch")
4. The next push will trigger the workflow and deploy the site

### Build Output (`dist/`)

After `npm run build`, the `dist/` directory should contain:

```
dist/
├── index.html          # Main HTML with bundled script references
├── 404.html            # SPA redirect
├── .nojekyll           # Jekyll bypass
├── profile.png         # Profile photo
├── robots.txt          # Crawling rules
├── placeholder.svg     # Placeholder image
└── assets/
    ├── index-[hash].js     # Bundled JavaScript
    └── index-[hash].css    # Bundled CSS
```

---

## Validation Checklist

After deployment, verify each item:

### Visual Parity

- [ ] Hero section: profile photo loads, name/title/tagline displayed, gradient background, animated circles, tech stack chips
- [ ] Header: sticky, transparent on top, blur on scroll, all 7 nav links (home/about/experience/skills/projects/education/contact)
- [ ] About section: stat cards (5+ Years, 15+ Projects), 3 feature cards with icons
- [ ] Experience section: timeline layout, 3 companies (Sirion, Airtel Africa, Housing.com), positions, achievements
- [ ] Skills section: all skill categories rendered
- [ ] Projects section: project cards with descriptions and tech tags
- [ ] Education section: degree details
- [ ] Contact section: LinkedIn, Email, GitHub cards clickable, "Ready to Collaborate?" CTA
- [ ] Achievements section: renders below Contact
- [ ] Hobbies section: renders below Achievements
- [ ] Footer: dark gradient background, copyright text

### Functional Parity

- [ ] Smooth scroll: clicking any nav item scrolls to the correct section
- [ ] Mobile menu: hamburger icon toggles navigation on small screens
- [ ] Resume download: "Download CV" button triggers Google Drive download
- [ ] LinkedIn link: opens `linkedin.com/in/shoaibrayeen/` in new tab
- [ ] GitHub link: opens `github.com/shoaibrayeen` in new tab
- [ ] Email button: opens Gmail compose (or mailto on Windows/Outlook)
- [ ] "Start a Conversation" button: opens LinkedIn in new tab
- [ ] "View My Work" button: scrolls to projects section
- [ ] "Get In Touch" button: scrolls to contact section
- [ ] Fade-in animation: page fades in on initial load

### GitHub Pages Specific

- [ ] `https://shoaibrayeen.github.io/` loads the site correctly
- [ ] Hitting a random URL (e.g. `/anything`) redirects to the SPA (404.html works)
- [ ] Profile image loads (no 404 in browser Network tab)
- [ ] No console errors from removed Lovable scripts
- [ ] Page source has correct OG/Twitter/canonical URLs pointing to `shoaibrayeen.github.io`
- [ ] `https://shoaibrayeen.github.io/robots.txt` is accessible

### Build Output Verification

- [ ] `dist/index.html` exists and contains bundled script references
- [ ] `dist/404.html` exists with SPA redirect script
- [ ] `dist/.nojekyll` exists (empty file)
- [ ] `dist/profile.png` exists
- [ ] `dist/assets/` contains JS and CSS bundles
- [ ] No `lovable-uploads/` directory in `dist/`
- [ ] No reference to `gptengineer.js` in `dist/index.html`
- [ ] No reference to `lovable.app` in `dist/index.html`

---

## Troubleshooting

### Site shows 404 after push

- Ensure GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Check the Actions tab for build errors

### Profile image not loading

- Verify `public/profile.png` exists and is committed
- Check that `Hero.tsx` references `/profile.png` (not the old Lovable path)

### Navigation to sections doesn't work

- Ensure each section component has the correct `id` attribute
- Check browser console for JavaScript errors

### Build fails in GitHub Actions

- Check Node.js version compatibility (should be 20)
- Verify `package-lock.json` is committed (required for `npm ci`)
- Check for missing dependencies in `package.json`

### Blank page after deployment

- Check browser console for errors
- Verify `dist/index.html` references the correct JS bundle paths
- Ensure `.nojekyll` is present in `dist/`
