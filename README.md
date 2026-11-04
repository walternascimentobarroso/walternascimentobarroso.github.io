# Walter Nascimento Barroso — Portfolio

Personal bilingual portfolio (English and Portuguese), published on GitHub Pages:
**https://walternascimentobarroso.github.io**

## Features

- Sections: hero, about, projects, achievements and contact
- English (`/en`) and Portuguese (`/pt`); `/` picks the saved language, then the browser language, then English
- Light and dark theme
- Contact form sent through [Web3Forms](https://web3forms.com)
- Privacy policy at `/privacy`

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static export) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) and [next-themes](https://github.com/pacocoursey/next-themes)
- [Motion](https://motion.dev), `react-type-animation` and `react-animated-numbers` for animations
- [Heroicons](https://heroicons.com)

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # builds the static site into ./out
npm run lint
```

## Structure

```
src/app/
├── [lang]/          # home page per language (/en, /pt)
├── (default)/       # / redirect and /privacy page
├── components/      # sections and UI components
└── dictionaries/    # copy in en.json and pt.json
public/              # images and icons
```

To change the copy, edit `src/app/dictionaries/en.json` and `pt.json`.

## Deploy

Every push to `main` runs [.github/workflows/nextjs.yml](.github/workflows/nextjs.yml), which builds the site and publishes `./out` to GitHub Pages. The site is fully static: there are no API routes in production.
