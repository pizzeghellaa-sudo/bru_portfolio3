# Project Detail Redesign: Case Study Layout

## Context

Replace the current simple sidebar+gallery `ProjectDetail` component with a rich "case study" story layout matching the mockup. This applies to **all projects** — projects with story data (`meta` field) get the full narrative layout; others get a visually consistent fallback with the same hero header and grid structure.

## Files to Modify

| File | Changes |
|------|---------|
| `src/types.ts` | Add `StorySection`, `ProjectMeta` interfaces; add optional `meta?` to `Project`; populate `meta` for "website" project |
| `src/translations.ts` | Add `detail` sub-object under `work` (EN + IT) with labels: YEAR, CONTEXT, ROLE, STACK |
| `src/App.tsx` | Replace `ProjectDetail` (lines 468-527) with new component; no changes to `ImageModal` or other components |

No changes to: `projectAssets.ts`, `index.css`, any other component.

---

## Step 1: Data Model (`src/types.ts`)

Add new interfaces after line 28:

```typescript
export interface StorySection {
  number: string;                    // "01", "02 & 03"
  title: { EN: string; IT: string };
  description: { EN: string; IT: string };
  layout: 'text-image' | 'image-text' | 'full-grid' | 'half';
  galleryIndices: number[];          // indices into project.gallery[]
}

export interface ProjectMeta {
  subtitle: { EN: string; IT: string };
  year: string;
  context: { EN: string; IT: string };
  roles: string[];
  stack: { label: string; value: string }[];
  sections: StorySection[];
}
```

Add to `Project` interface: `meta?: ProjectMeta`

Add `meta` to the "website" project entry with:
- subtitle: "AI-ASSISTED DESIGN AND DEVELOPMENT" / IT translation
- year: "2026"
- context: shortened description (bilingual)
- roles: ["CONCEPT", "UX STRUCTURE", "VISUAL DESIGN", "AI-ASSISTED DEVELOPMENT", "DEPLOYMENT"]
- stack: DESIGN/STITCH AI, ENGINE/GEMINI 3 FLASH, FRAMEWORK/REACT.JS / VITE, HOSTING/VERCEL
- 6 story sections matching the mockup layout

**Image mapping** (3 existing images as placeholders):

| Section | Layout | galleryIndices |
|---------|--------|---------------|
| 01 IDEATION | text-image | [0] |
| 02 & 03 STRUCTURE & WIREFRAMES | image-text | [1] |
| 04 VISUAL DESIGN | full-grid | [0, 1, 2] |
| 05 DEVELOPMENT | half | [2] |
| 06 DEPLOYMENT | half | [2] (reused) |

---

## Step 2: Translations (`src/translations.ts`)

Add inside both `EN.work` and `IT.work`:

```typescript
detail: {
  year: 'YEAR' / 'ANNO',
  context: 'CONTEXT' / 'CONTESTO',
  role: 'ROLE' / 'RUOLO',
  stack: 'STACK' / 'STACK',
}
```

---

## Step 3: New `ProjectDetail` Component (`src/App.tsx`)

Replace lines 468-527. Same function signature, same props.

### Layout Structure

```
ProjectDetail
  |-- Hero Header
  |     Back button (existing ← style)
  |     Title: text-6xl md:text-8xl font-black uppercase (BLACK, not gray)
  |     Subtitle: meta.subtitle[lang] or project.category
  |     Year badge: top-right, mono text (only if meta exists)
  |
  |-- Separator: w-full h-px bg-ink/10
  |
  |-- if project.meta:
  |     Grid: grid-cols-1 md:grid-cols-12
  |       Left (md:col-span-3): B1/CONTEXT, B2/ROLE (red bars), B3/STACK (2x2 grid)
  |       Right (md:col-span-9): Story sections
  |
  |-- else (fallback):
        Grid: grid-cols-1 md:grid-cols-12
          Left (md:col-span-3): description + tags
          Right (md:col-span-9): gallery images vertically
```

### Story Section Layouts

**`text-image`** (Section 01): 2-col grid, text left + image right
**`image-text`** (Section 02&03): 2-col grid, image left + text right (mobile: text first via `order-*`)
**`full-grid`** (Section 04): Full-width text, then `grid-cols-1 sm:grid-cols-3` image row
**`half`** (Sections 05&06): Consecutive `half` sections grouped into `grid-cols-1 md:grid-cols-2` row

### Section Visual Style
- Step number: `text-5xl md:text-6xl font-black text-primary` (red #fa3d33)
- Title: `text-xl font-bold text-ink uppercase tracking-tight`
- Description: `text-sm leading-relaxed text-ink/80`
- Images: `bg-paper cursor-zoom-in grayscale hover:grayscale-0 transition-all duration-700`

### Sidebar Visual Style
- Section labels: `font-mono text-[10px] text-slate-400 uppercase tracking-widest` with "B1 / CONTEXT" format
- Role items: red `w-0.5 h-4 bg-primary` left bar + mono text
- Stack: 2-col grid with mono label/value pairs

### Click Handling
All images call `onImageClick(galleryIndex)` — maps directly to existing `ImageModal` via `zoomIndex` state. No changes needed to modal.

### Safety Guards
- Check `project.gallery[idx]` exists before rendering (handle missing images gracefully)
- Handle odd number of `half` sections (single card gets full width)

---

## Step 4: Mobile Responsive

- Hero: `flex-col md:flex-row` for title/year, title scales `text-6xl` to `md:text-8xl`
- Main grid: `grid-cols-1 md:grid-cols-12` — sidebar stacks above content on mobile
- Story sections: all internal grids use `grid-cols-1 md:grid-cols-2`
- `image-text` layout: `order-1`/`order-2` with `md:` variants so text appears before image on mobile
- Image row (Section 04): `grid-cols-1 sm:grid-cols-3`

No custom breakpoints needed.

---

## Verification

1. `npm run dev` — dev server at localhost:3000
2. Navigate to SELECTED WORKS, click "Personal Website" — should show full case-study layout
3. Click any other project — should show fallback layout with same hero style
4. Click any image — zoom modal opens at correct index, navigation works
5. Toggle EN/IT — all text switches correctly
6. Resize to mobile — sidebar stacks above, sections go single column
7. `npm run lint` — no TypeScript errors (file has `@ts-nocheck` but verify no runtime issues)
