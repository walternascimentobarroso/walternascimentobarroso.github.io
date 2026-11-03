# CLAUDE.md

Portfólio pessoal de Walter Nascimento Barroso, publicado no GitHub Pages.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (`.tsx`, props tipadas com `type Props` no próprio ficheiro)
- Tailwind CSS 4 (config em `src/app/globals.css` via `@theme`) com dark mode por classe via `next-themes` (`ThemeProvider` + `ModeToggle`)
- Animações: `motion` (`motion/react`), `react-type-animation`, `react-animated-numbers`
- Ícones: `@heroicons/react`

## Comandos

```bash
npm run dev     # servidor local em http://localhost:3000
npm run build   # build estático para ./out
npm run lint    # eslint .
```

Não há testes.

## Estrutura

- `src/app/page.tsx` — home, monta as secções
- `src/app/components/` — secções (`HeroSection`, `AboutSection`, `ProjectsSection`, `AchievementsSection`, `EmailSection`) e UI (`Navbar`, `Footer`, `ProjectCard`, ...)
- `src/app/privacy/page.tsx` — política de privacidade
- `EmailSection` envia o formulário de contacto para o Web3Forms (access key pública no próprio componente)
- `public/` — imagens e assets

## Deploy

Push para `main` dispara `.github/workflows/nextjs.yml`, que faz `next build` e publica `./out` no GitHub Pages.

`next.config.js` usa `output: 'export'` e `images.unoptimized`: o site é 100% estático. Rotas de API não correm em produção; não contar com código de servidor.

## Convenções

- 2 espaços, LF (`.editorconfig`)
- Commits com gitmoji: `:sparkles:` feature, `:bug:` fix, `:rocket:` deploy, `:lock:` privacidade/segurança
