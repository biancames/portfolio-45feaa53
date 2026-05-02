# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/portfolio` — Bianca Mesquita Portfolio (react-vite, serves at `/`)
Vintage-inspired personal portfolio website for Bianca Mesquita, a Product & UX/UI Designer from Brazil.

**Design:**
- Palette: Aged parchment (#F5F0E8 light / #1A1A14 dark), lime accent (#A8CC2C), deep olive (#3D4A1E), warm orange (#D4713A)
- Fonts: Playfair Display (display/headings), DM Sans (body), Caveat (handwritten accents)
- Aesthetic: editorial vintage-tropical, fineline SVG illustrations, ink-stamp tags

**Features:**
- Hero with draggable fineline SVG illustrations (Figma, moka pot, laptop, sparkles)
- Custom cursor system (lime pill cursor on project cards, postcard zone)
- Dark mode SVG switch (bottom-left, illustrated wall switch)
- Projects section with hover zoom + lime overlay
- About section with draggable postcard (reveals striped back cover)
- Design Process — 5 steps with staggered scroll animations
- Skills & Tools grid
- Footer with beach SVG illustration + marquee animation

**Key files:**
- `src/App.tsx` — Root app with dark mode state
- `src/pages/Home.tsx` — Full single-page portfolio
- `src/components/CustomCursor.tsx` — Global cursor system
- `src/components/DarkModeSwitch.tsx` — Illustrated SVG toggle

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
