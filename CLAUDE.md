# CLAUDE.md

Portfólio pessoal de Walter Nascimento Barroso, publicado no GitHub Pages.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (`.tsx`, props tipadas com `type Props` no próprio ficheiro)
- Tailwind CSS 4 (tokens do design system em `src/app/design-system.json`, carregados por `tailwind.config.mjs` via `@config` no `globals.css`) com dark mode por classe via `next-themes` (`ThemeProvider` + `ModeToggle`)
- Animações: `motion` (`motion/react`), `react-type-animation`, `react-animated-numbers`
- Ícones: `@heroicons/react`
- Lint e formatação: Biome (`biome.json`)

## Comandos

```bash
npm run dev     # servidor local em http://localhost:3000
npm run build   # build estático para ./out
npm run lint    # biome check .
npm run format  # biome check --write . (formata e organiza imports)
```

Não há testes.

## Estrutura

- `src/app/[lang]/page.tsx` — home por idioma (`/en`, `/pt`, gerados por `generateStaticParams`), monta as secções
- `src/app/dictionaries/` — textos em `en.json` e `pt.json` (`en.json` define o tipo `Dictionary`); componentes recebem a fatia por props `dict`
- `src/app/(default)/page.tsx` — `/` redireciona no cliente: idioma guardado em `localStorage.lang` > idioma do browser > `en` (lógica em `LanguageToggle`)
- `src/app/components/` — secções (`HeroSection`, `AboutSection`, `ProjectsSection`, `AchievementsSection`, `EmailSection`) e UI (`Navbar`, `Footer`, `LanguageToggle`, ...)
- `src/app/(default)/privacy/page.tsx` — política de privacidade (só pt, URL `/privacy` mantido)
- `EmailSection` envia o formulário de contacto para o Web3Forms (access key pública no próprio componente)
- `public/` — imagens e assets

## Deploy

Push para `main` dispara `.github/workflows/nextjs.yml`, que faz `next build` e publica `./out` no GitHub Pages.

`next.config.js` usa `output: 'export'` e `images.unoptimized`: o site é 100% estático. Rotas de API não correm em produção; não contar com código de servidor.

## Convenções

- 2 espaços, LF, aspas duplas (`.editorconfig` + `biome.json`)
- Commits com gitmoji: `:sparkles:` feature, `:bug:` fix, `:rocket:` deploy, `:lock:` privacidade/segurança
