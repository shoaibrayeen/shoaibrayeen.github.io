# shoaibrayeen.github.io

Personal portfolio website for Mohd Shoaib Rayeen — Senior Software Engineer specializing in Backend Architecture, Gen AI, MCP, and Scalable Distributed Systems.

**Live:** [https://shoaibrayeen.github.io](https://shoaibrayeen.github.io)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** (Radix UI) for component primitives
- **Lucide React** for icons
- **React Router** for client-side routing

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions on every push to `master_revamp`.

**Workflow:** `.github/workflows/deploy.yml`

The workflow:
1. Checks out the code
2. Installs Node.js 20 and dependencies
3. Runs `npm run build` (Vite builds to `dist/`)
4. Deploys `dist/` to GitHub Pages

### First-time Setup

After the first push, go to **GitHub repo Settings > Pages** and set the **Source** to **"GitHub Actions"**.

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deployment
├── public/
│   ├── 404.html                   # SPA redirect for GitHub Pages
│   ├── .nojekyll                  # Bypass Jekyll processing
│   ├── profile.png                # Profile photo
│   ├── robots.txt
│   └── placeholder.svg
├── src/
│   ├── components/                # UI sections
│   │   ├── Header.tsx             # Sticky navigation
│   │   ├── Hero.tsx               # Hero with profile photo
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   ├── Achievements.tsx
│   │   ├── Hobbies.tsx
│   │   ├── Footer.tsx
│   │   └── ui/                    # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx              # Main portfolio page
│   │   └── NotFound.tsx           # 404 page
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx                    # Router setup
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Tailwind + design tokens
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT License - see [LICENSE.txt](LICENSE.txt)
