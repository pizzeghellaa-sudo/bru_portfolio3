# bru_portfolio

Personal portfolio SPA for Bruna Bulgarelli (Brand & Visual Designer). Static site with no router, no state library, no API layer.

## Tech Stack

- React 19 + TypeScript 5.8 + Vite 6.2
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin — CSS-first config, no `tailwind.config.js`)
- Framer Motion (`motion` package, `motion/react` imports)
- Lucide React (icons)
- `@vercel/analytics` (Vercel Analytics)
- Node 18+

## Commands

- `npm run dev` — dev server at `http://localhost:3000`
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run clean` — delete `dist/`
- `npm run lint` — TypeScript type check (`tsc --noEmit`)

## Architecture

All UI lives in a single file: **`src/App.tsx`** (monolithic SPA, no component files).

```
src/
  App.tsx          # Entire app — all sections, state, layout, animations
  main.tsx         # Entry point, mounts <App /> + <Analytics />
  index.css        # Tailwind v4 @theme config + global styles
  translations.ts  # EN/IT string map (TRANSLATIONS object)
  types.ts         # TypeScript interfaces + static data (EXPERIENCE[], PROJECTS[])
  lib/
    projectAssets.ts  # Dynamic asset loading via import.meta.glob
assets/
  bru.png
  projects/
    <project-id>/
      thumb.jpg         # Archive grid thumbnail (used if no video)
      <filename>.mp4    # Optional video thumbnail (overrides thumb.jpg in grid)
      <n>-thumb.jpg     # Gallery list thumbnails
      <n>-full.jpg      # Zoom modal high-res images
```

## Key Patterns

### Navigation / Sections
`App.tsx` uses a `Section` union type (`'INDEX' | 'TIMELINE' | 'CAPABILITIES' | 'WORK' | 'CONTACTS'`) and a single `activeSection` state to swap content — no router.

### Bilingual i18n
`Language` type is `'EN' | 'IT'`. `language` state in `App.tsx` controls which strings are displayed. All UI strings come from `TRANSLATIONS[language]` in `translations.ts`. Content strings on data objects (descriptions in `types.ts`) use `{ EN: string; IT: string }` shape and are accessed as `item.description[language]`.

### Dynamic Asset Loading
`src/lib/projectAssets.ts` uses `import.meta.glob` to eagerly import all images and videos under `assets/projects/`. Three helpers:
- `projectThumb(id)` — returns `assets/projects/<id>/thumb.jpg`
- `projectGallery(id)` — returns `{ thumb, full }[]` pairs built from `<n>-thumb.jpg` / `<n>-full.jpg` naming convention
- `projectVideo(id, filename)` — returns `assets/projects/<id>/<filename>.mp4` (separate glob for `.mp4` files)

To add a new project: create `assets/projects/<id>/` with a `thumb.jpg` and numbered `<n>-thumb.jpg` + `<n>-full.jpg` pairs, then add a `Project` entry in `types.ts`. Optionally include a `.mp4` file and set the `video` field to `projectVideo(id, filename)`.

### Video Thumbnails
The `Project` interface has an optional `video?: string` field. When set, the Work grid renders a `<video>` element instead of `<img>` for that project card:
- Auto-plays (muted, no controls) with a **2-second delay** on first load via `onLoadedData` + `setTimeout`
- Loops with a **5-second pause** between iterations via `onEnded` + `setTimeout` + `video.currentTime = 0`
- No `autoPlay` or `loop` attributes — timing is fully controlled via event handlers

### Image Zoom Modal
The gallery image modal (`ImageModal` in `App.tsx`) supports zoom from 1×–3× via:
- Mousewheel (cursor-centered: zoom anchors to the point under the cursor using `getBoundingClientRect` fractions + `requestAnimationFrame` scroll adjustment)
- `+`/`-` buttons and keyboard shortcuts
- Uses explicit pixel dimensions (`width: naturalWidth * zoom`) inside an `overflow: auto` scroll container — NOT CSS `transform: scale`

### Animations
Uses `motion` from `motion/react` (Framer Motion v12). `AnimatePresence` wraps section transitions. Standard pattern: `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>`.

### Tailwind v4 Theme
Defined in `src/index.css` under `@theme {}` — no config file. Custom tokens:
- `--color-primary: #fa3d33`
- `--color-background-light: #f8f6f5`
- `--color-background-dark: #23100f`
- `--color-paper: #F4F4F0`
- `--color-ink: #000000`
- Fonts: `--font-display` (Work Sans), `--font-mono` (JetBrains Mono), `--font-montserrat` (Montserrat)

Custom utilities: `.swiss-grid-lines`, `.blend-multiply`, `.no-scrollbar`.

## Path Alias

`@/` maps to the project root (`.`). Configured in both `vite.config.ts` and `tsconfig.json`.

## Environment

- `GEMINI_API_KEY` — Google Gemini API key (unused in current build; leftover from AI Studio scaffold)
- Copy `.env.example` to `.env.local` if needed

## Deployment

Deployed on **Vercel** with automatic deploys from the `main` branch. `@vercel/analytics` is injected in `main.tsx`.

## Notes

- `App.tsx` has a top-level `// @ts-nocheck` suppressing all TypeScript errors in that file
- The `better-sqlite3`, `express`, and `dotenv` dependencies are unused scaffolding leftovers from Google AI Studio — they are not used in the app
- The `GEMINI_API_KEY` env var and `@google/genai` dependency are similarly unused scaffolding
