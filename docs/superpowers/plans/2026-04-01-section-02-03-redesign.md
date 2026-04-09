# Section 02 & 03 Redesign: Annotated Wireframe Layout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic `image-text` layout for section "02 & 03" in the Personal Website case study with a 3-zone annotated wireframe layout matching the design mockup.

**Architecture:** (1) Extract 4 images from the source PNG using Python/Pillow; (2) extend the `StorySection` data model with two optional fields (`annotations`, `comparison`); (3) add a new `annotated-wireframe` render branch inside the existing `renderSection` function in `App.tsx`.

**Tech Stack:** React 19, TypeScript (with `@ts-nocheck` in App.tsx), Tailwind CSS v4, Python/Pillow for image extraction, Vite dev server.

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/assets/projects/portfolio/` | Add 8 files | `4-thumb.png`, `4-full.png`, `5-thumb.png`, `5-full.png`, `6-thumb.png`, `6-full.png`, `7-thumb.png`, `7-full.png` |
| `src/types.ts` | Modify | Extend `StorySection` interface; update "02 & 03" section data |
| `src/App.tsx` | Modify | Add `annotated-wireframe` render branch in `renderSection` |

No changes to: `translations.ts`, `index.css`, `projectAssets.ts`, `ImageModal`, any other section.

---

## Task 1: Extract images from source PNG

**Source:** `C:\Users\andpi\Downloads\ChatGPT Image Apr 1, 2026, 09_00_11 AM.png` (1024×1536 px)

**Files:**
- Create: `src/assets/projects/portfolio/4-thumb.png` + `4-full.png`
- Create: `src/assets/projects/portfolio/5-thumb.png` + `5-full.png`
- Create: `src/assets/projects/portfolio/6-thumb.png` + `6-full.png`
- Create: `src/assets/projects/portfolio/7-thumb.png` + `7-full.png`

- [ ] **Step 1.1: Run crop script**

```python
# Save as: crop_images.py (can delete after use)
from PIL import Image
import shutil, os

src = r"C:\Users\andpi\Downloads\ChatGPT Image Apr 1, 2026, 09_00_11 AM.png"
dst = r"C:\Data\Developers\bru_portfolio2\src\assets\projects\portfolio"

img = Image.open(src)
print(f"Image size: {img.size}")

crops = {
    "4": (375, 225, 990, 575),   # Hero area screenshot (sidebar nav + PERSONAL WEBSITE heading)
    "5": (340, 580, 725, 760),   # Section 02&03 detail screenshot
    "6": (25,  815, 475, 1285),  # Wireframe comparison (grayscale)
    "7": (525, 815, 990, 1285),  # Interface comparison (colored)
}

for name, box in crops.items():
    cropped = img.crop(box)
    for suffix in ("thumb", "full"):
        out = os.path.join(dst, f"{name}-{suffix}.png")
        cropped.save(out)
        print(f"Saved: {out}")
```

Run:
```bash
cd "C:\Data\Developers\bru_portfolio2"
py crop_images.py
```

Expected output:
```
Image size: (1024, 1536)
Saved: ...4-thumb.png
Saved: ...4-full.png
Saved: ...5-thumb.png
Saved: ...5-full.png
Saved: ...6-thumb.png
Saved: ...6-full.png
Saved: ...7-thumb.png
Saved: ...7-full.png
```

- [ ] **Step 1.2: Verify crops look correct**

Open the 4 `*-thumb.png` files in `src/assets/projects/portfolio/` and confirm:
- `4-thumb.png` — website hero area with sidebar navigation and "PERSONAL WEBSITE" title visible
- `5-thumb.png` — the website's 02&03 section screenshot
- `6-thumb.png` — grayscale wireframe image
- `7-thumb.png` — colored interface image

If a crop is off, adjust the coordinates in Step 1.1 and rerun. The coordinates are the only thing that may need tuning.

- [ ] **Step 1.3: Delete the crop script**

```bash
del crop_images.py
```

- [ ] **Step 1.4: Commit new assets**

```bash
cd "C:\Data\Developers\bru_portfolio2"
git add src/assets/projects/portfolio/4-thumb.png src/assets/projects/portfolio/4-full.png
git add src/assets/projects/portfolio/5-thumb.png src/assets/projects/portfolio/5-full.png
git add src/assets/projects/portfolio/6-thumb.png src/assets/projects/portfolio/6-full.png
git add src/assets/projects/portfolio/7-thumb.png src/assets/projects/portfolio/7-full.png
git commit -m "feat: add annotated wireframe images for section 02-03"
```

---

## Task 2: Extend `StorySection` interface in `src/types.ts`

**Files:**
- Modify: `src/types.ts` lines 13–28

- [ ] **Step 2.1: Update `StorySection` interface**

Find this block in `src/types.ts` (lines 13–28):

```typescript
export interface StorySection {
  number: string;
  title: { EN: string; IT: string };
  description: { EN: string; IT: string };
  layout: 'text-image' | 'image-text' | 'full-grid' | 'half';
  galleryIndices: number[];
}
```

Replace with:

```typescript
export interface StorySection {
  number: string;
  title: { EN: string; IT: string };
  description: { EN: string; IT: string };
  layout: 'text-image' | 'image-text' | 'full-grid' | 'half' | 'annotated-wireframe';
  galleryIndices: number[];
  annotations?: { EN: string; IT: string }[];
  comparison?: {
    heading: { EN: string; IT: string };
    beforeIndex: number;
    afterIndex: number;
    beforeLabel: { EN: string; IT: string };
    afterLabel: { EN: string; IT: string };
  };
}
```

- [ ] **Step 2.2: Commit interface change**

```bash
git add src/types.ts
git commit -m "feat: extend StorySection with annotations and comparison fields"
```

---

## Task 3: Update "02 & 03" section data in `src/types.ts`

**Files:**
- Modify: `src/types.ts` — the "website" project's `meta.sections` array, second entry

- [ ] **Step 3.1: Replace the "02 & 03" section entry**

Locate this section entry in the `sections` array of the "website" project's `meta`:

```typescript
{
  number: "02 & 03",
  title: { EN: "STRUCTURE & WIREFRAMES", IT: "STRUTTURA E WIREFRAME" },
  description: {
    EN: "Structured pages, navigation and content hierarchy. Explored layout structures and user flows through low-fidelity wireframes before moving to visual design.",
    IT: "Strutturazione delle pagine, della navigazione e della gerarchia dei contenuti. Esplorate le strutture di layout e i flussi utente attraverso wireframe prima di passare al visual design."
  },
  layout: "image-text",
  galleryIndices: [1]
},
```

Replace with:

```typescript
{
  number: "02 & 03",
  title: { EN: "STRUCTURE & WIREFRAMES", IT: "STRUTTURA E WIREFRAME" },
  description: {
    EN: "Structured pages, navigation and content hierarchy. Modular layout and user flow exploration following a strict 12-column grid.",
    IT: "Pagine strutturate, navigazione e gerarchia dei contenuti. Layout modulare ed esplorazione dei flussi utente seguendo una rigorosa griglia a 12 colonne."
  },
  layout: "annotated-wireframe",
  galleryIndices: [3, 4],
  annotations: [
    { EN: "12-column grid",    IT: "Griglia a 12 colonne" },
    { EN: "Modular layout",    IT: "Layout modulare" },
    { EN: "Content hierarchy", IT: "Gerarchia dei contenuti" },
  ],
  comparison: {
    heading:     { EN: "From structure to interface", IT: "Dalla struttura all'interfaccia" },
    beforeIndex: 5,
    afterIndex:  6,
    beforeLabel: { EN: "Wireframe",  IT: "Wireframe" },
    afterLabel:  { EN: "Interface",  IT: "Interfaccia" },
  },
},
```

- [ ] **Step 3.2: Commit data change**

```bash
git add src/types.ts
git commit -m "feat: update section 02-03 to annotated-wireframe layout with data"
```

---

## Task 4: Add `annotated-wireframe` render branch in `src/App.tsx`

**Files:**
- Modify: `src/App.tsx` — inside `renderSection`, after the `full-grid` block (around line 530)

- [ ] **Step 4.1: Add the new render branch**

Locate this comment at the end of `renderSection` (after the `full-grid` if-block):

```typescript
    // 'half' — returned as-is; caller groups consecutive halves
    return null;
```

Insert a new block immediately before that comment:

```typescript
    if (section.layout === 'annotated-wireframe') {
      const annotationCallouts = (
        <div className="flex flex-col gap-6 justify-center min-w-[160px]">
          {(section.annotations || []).map((a, ai) => (
            <div key={ai} className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary flex-shrink-0" />
              <span className="font-mono text-xs text-ink uppercase tracking-wider">{a[language]}</span>
              <span className="text-slate-300 text-sm hidden md:block">→</span>
            </div>
          ))}
        </div>
      );

      return (
        <div key={idx} className="flex flex-col gap-12 py-12 border-b border-ink/10">
          {/* Zone 1: Section header */}
          {textBlock}

          {/* Zone 2: Two annotated screenshot rows */}
          <div className="flex flex-col gap-10">
            {section.galleryIndices.map((galleryIdx, rowIdx) => {
              const img = project.gallery[galleryIdx];
              if (!img) return null;
              return (
                <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-center">
                  {annotationCallouts}
                  <div
                    className="overflow-hidden bg-paper cursor-zoom-in group"
                    onClick={() => onImageClick(galleryIdx)}
                  >
                    <img
                      src={img.thumb}
                      alt={`${project.title} ${section.number} screenshot ${rowIdx + 1}`}
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Zone 3: Wireframe-to-interface comparison */}
          {section.comparison && (() => {
            const { heading, beforeIndex, afterIndex, beforeLabel, afterLabel } = section.comparison;
            const beforeImg = project.gallery[beforeIndex];
            const afterImg = project.gallery[afterIndex];
            return (
              <div className="flex flex-col gap-6">
                <p className="text-lg font-medium text-ink">{heading[language]}</p>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                  <div className="flex flex-col gap-2">
                    {beforeImg && (
                      <div
                        className="overflow-hidden bg-paper cursor-zoom-in group"
                        onClick={() => onImageClick(beforeIndex)}
                      >
                        <img
                          src={beforeImg.thumb}
                          alt={beforeLabel[language]}
                          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center">{beforeLabel[language]}</p>
                  </div>

                  <span className="hidden md:block text-2xl text-slate-300 px-2">→</span>

                  <div className="flex flex-col gap-2">
                    {afterImg && (
                      <div
                        className="overflow-hidden bg-paper cursor-zoom-in group"
                        onClick={() => onImageClick(afterIndex)}
                      >
                        <img
                          src={afterImg.thumb}
                          alt={afterLabel[language]}
                          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center">{afterLabel[language]}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      );
    }
```

- [ ] **Step 4.2: Commit component change**

```bash
git add src/App.tsx
git commit -m "feat: add annotated-wireframe section renderer for 02-03"
```

---

## Task 5: Verify end-to-end

- [ ] **Step 5.1: Start dev server**

```bash
cd "C:\Data\Developers\bru_portfolio2"
npm run dev
```

Open `http://localhost:3000`.

- [ ] **Step 5.2: Verify section 02 & 03 renders correctly**

1. Click **SELECTED WORKS** in the nav
2. Click **Personal Website**
3. Scroll to section 02 & 03 and confirm:
   - Zone 1: "02 & 03" in red, title, description paragraph
   - Zone 2: Two screenshot rows, each with 3 annotation callouts on the left (red squares + text + arrow) and a screenshot on the right
   - Zone 3: "From structure to interface" heading, wireframe and interface images side by side with labels and arrow between them

- [ ] **Step 5.3: Test image click → zoom modal**

Click each of the 4 images (2 in Zone 2, 2 in Zone 3). Each should open `ImageModal` at the correct index (3, 4, 5, 6). The navigation arrows inside the modal should cycle through all 7 gallery images.

- [ ] **Step 5.4: Test language toggle**

Toggle between EN and IT using the language buttons. Confirm:
- Annotation callouts switch language ("12-column grid" ↔ "Griglia a 12 colonne")
- Comparison heading switches ("From structure to interface" ↔ "Dalla struttura all'interfaccia")
- Labels switch ("Interface" ↔ "Interfaccia")

- [ ] **Step 5.5: Test mobile responsive**

Resize browser to < 768px width and confirm:
- Zone 2: Annotation callouts appear above each screenshot (stacked, not side by side)
- Zone 3: Wireframe and interface stack vertically; the `→` arrow between them is hidden

- [ ] **Step 5.6: Verify other sections unchanged**

Scroll through the Personal Website case study and confirm sections 01, 04, 05, 06 look identical to before. Click another project (e.g. "Kalika") and confirm its fallback layout still works.

- [ ] **Step 5.7: Run lint**

```bash
npm run lint
```

Expected: same 2 pre-existing errors in `projectAssets.ts` only (`import.meta.glob` type errors). No new errors.
