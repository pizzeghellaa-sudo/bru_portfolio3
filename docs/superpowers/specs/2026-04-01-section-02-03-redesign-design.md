# Section 02 & 03 Redesign: Annotated Wireframe Layout

## Context

The current "02 & 03 STRUCTURE & WIREFRAMES" section in the PersonalWebsite case study uses a generic `image-text` layout (image left, text right). The redesign replaces it with a richer, purpose-built layout that shows annotated screenshots and a wireframe-to-interface comparison, matching the provided mockup.

Scope: only section 02 & 03. No changes to other sections, colors, fonts, or font sizes.

## Source Image

`C:\Users\andpi\Downloads\ChatGPT Image Apr 1, 2026, 09_00_11 AM.png`

4 images will be cropped from this file and saved as new gallery entries.

---

## Layout Structure

The section has 3 zones stacked vertically:

### Zone 1: Section Header

Existing pattern, no changes:
- "02 & 03" in `text-5xl md:text-6xl font-black text-primary`
- Title: "STRUCTURE & WIREFRAMES" in `text-xl font-bold text-ink uppercase tracking-tight`
- Description paragraph in `text-sm leading-relaxed text-ink/80`

### Zone 2: Two Annotated Screenshots

Two rows, each containing:
- **Left column**: 3 annotation callouts stacked vertically
  - Each callout: red square (`w-2.5 h-2.5 bg-primary`) + text + arrow (`-->`) pointing right
  - Callout texts (shared between both rows, bilingual):
    1. EN: "12-column grid" / IT: "Griglia a 12 colonne"
    2. EN: "Modular layout" / IT: "Layout modulare"
    3. EN: "Content hierarchy" / IT: "Gerarchia dei contenuti"
- **Right column**: Screenshot image (clickable, opens zoom modal)

Layout: `grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8` for each row. Annotations column has fixed width, image fills remaining space.

Images:
- Row 1: Hero area screenshot (gallery index 3)
- Row 2: Section 02&03 area screenshot (gallery index 4)

### Zone 3: Wireframe-to-Interface Comparison

- Heading: EN "From structure to interface" / IT "Dalla struttura all'interfaccia"
  - Style: `text-lg font-medium text-ink`
- Two images side by side in `grid grid-cols-1 md:grid-cols-2 gap-8`
  - Left: Wireframe image (gallery index 5), label "Wireframe" underneath
  - Right: Interface image (gallery index 6), label EN "Interface" / IT "Interfaccia" underneath
  - Arrow between them on desktop (hidden on mobile): `text-slate-400 text-2xl` centered between the two
- Image labels: `font-mono text-xs text-slate-400 uppercase tracking-widest text-center mt-2`
- Both images are clickable (open zoom modal)

---

## Data Model Changes

### `StorySection` interface (`src/types.ts`)

Add to the `layout` union type:
```
'text-image' | 'image-text' | 'full-grid' | 'half' | 'annotated-wireframe'
```

Add optional fields:
```typescript
annotations?: { EN: string; IT: string }[];
comparison?: {
  heading: { EN: string; IT: string };
  beforeIndex: number;       // gallery index for wireframe
  afterIndex: number;        // gallery index for interface
  beforeLabel: { EN: string; IT: string };
  afterLabel: { EN: string; IT: string };
};
```

### Section data update (`src/types.ts`)

Change the "02 & 03" section entry:
- `layout`: `"image-text"` -> `"annotated-wireframe"`
- `galleryIndices`: `[1]` -> `[3, 4]` (two annotated screenshots)
- Add `annotations`: 3 bilingual callout strings
- Add `comparison`: heading + indices 5, 6 + bilingual labels

### New gallery images

Extract 4 images from the source PNG. Save as both thumb and full (same file, screenshots don't need separate resolutions):

| Gallery Index | Filename | Content |
|---|---|---|
| 3 | `4-thumb.png` / `4-full.png` | Hero area screenshot |
| 4 | `5-thumb.png` / `5-full.png` | Section 02&03 screenshot |
| 5 | `6-thumb.png` / `6-full.png` | Wireframe (grayscale) |
| 6 | `7-thumb.png` / `7-full.png` | Final interface |

Note: gallery indices are 0-based; filenames are 1-based (following existing convention where `1-thumb.png` = gallery[0]).

---

## Component Changes (`src/App.tsx`)

Add a new `if (section.layout === 'annotated-wireframe')` branch in `renderSection`, after the existing `full-grid` branch (before the `half` comment).

The branch renders:
1. `textBlock` (existing — section number + title + description)
2. Zone 2: Two annotated screenshot rows
3. Zone 3: Comparison section

All images use `onImageClick(galleryIndex)` to open the existing zoom modal.
Images use the existing style: `bg-paper cursor-zoom-in grayscale hover:grayscale-0 transition-all duration-700`.

---

## Translation Changes

None needed beyond existing `detail` translations. Annotation strings and comparison labels live in `types.ts` section data (bilingual `{ EN, IT }` objects), not in `translations.ts`.

---

## Mobile Responsive

- Zone 2: Annotations stack above each screenshot on mobile (`grid-cols-1`)
- Zone 3: Wireframe and interface stack vertically on mobile; arrow hidden
- All existing responsive patterns preserved

---

## Files Modified

| File | Changes |
|---|---|
| `src/types.ts` | Extend `StorySection.layout` union; add `annotations?` and `comparison?` fields; update "02 & 03" section data |
| `src/App.tsx` | Add `annotated-wireframe` render branch in `renderSection` |
| `src/assets/projects/portfolio/` | Add 8 new image files (4 pairs of thumb/full) |

No changes to: `translations.ts`, `index.css`, `projectAssets.ts`, `ImageModal`, any other section.

---

## Image Extraction

Use Python (Pillow) to crop 4 regions from the source PNG. Approximate crop regions will be determined by reading the image dimensions and visually identifying boundaries. Each crop is saved twice (as `N-thumb.png` and `N-full.png`).

---

## Verification

1. `npm run dev` — open localhost:3000
2. Navigate to SELECTED WORKS > "Personal Website"
3. Scroll to section 02 & 03 — verify 3 zones render correctly
4. Click any of the 4 new images — zoom modal opens at correct index
5. Toggle EN/IT — annotations and comparison labels switch
6. Resize to mobile — annotations stack, comparison stacks
7. Verify other sections (01, 04, 05, 06) are unchanged
8. Click other projects — fallback layout still works
