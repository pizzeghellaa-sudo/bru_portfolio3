# TASK
Design and implement a Swiss-style "Experience" section for a portfolio website.

The section must follow a strict editorial layout, with strong hierarchy, precise spacing, and a clean typographic system.

---

# GOAL

Create an Experience section that:

- Feels structured and minimal (Swiss design approach)
- Uses a clear hierarchy between role, content, and metadata
- Integrates bilingual content (EN + IT) in a clean way
- Includes project links as supporting evidence (not primary UI elements)
- Maintains a consistent vertical rhythm and alignment

---

# LAYOUT SYSTEM

Use a 3-column grid:

- Column 1 (Date): 120px
- Column 2 (Role): 320px
- Column 3 (Content): 420px

Gap between columns: 32px

All content must align to a consistent vertical axis.

---

# STRUCTURE (PER EXPERIENCE ENTRY)

Each entry must follow this exact order:

1. Date (left column)
2. Role title (center column)
3. EN description (right column)
4. IT description (right column)
5. Projects label (right column)
6. Project links (right column)
7. Divider

---

# TYPOGRAPHY

## Role title
- font-size: 18–20px
- font-weight: 700
- color: #111
- format: "Lead Designer — Europlan S.p.A."

Company name:
- font-weight: 600
- color: #6E819C

---

## Date
- font-size: 12px
- letter-spacing: 0.08em
- color: #9AA3B2

---

## EN text
- font-size: 15–16px
- line-height: 1.6
- color: #5E6B7A
- max-width: 420px

---

## IT text
- font-size: 15–16px
- line-height: 1.6
- color: #7A8694 (lighter than EN)

---

## Labels (e.g. PROJECTS)
- font-size: 11–12px
- uppercase
- letter-spacing: 0.12em
- color: #9AA3B2

---

## Project links
- font-size: 14px
- font-weight: 500
- color: #111
- inline layout
- gap: 12px

Arrow:
- color: primary red (#FF4B36)
- placed after text → "Europlan ↗"

Hover:
- arrow moves +2px right
- optional subtle underline

---

# SPACING SYSTEM

- Entry padding (top/bottom): 40px
- Role → EN: 24px
- EN → IT: 20px
- IT → PROJECTS: 20px
- PROJECTS → links: 8px
- Links → divider: 28px

Divider:
- 1px solid #E6E8EC

---

# CONTENT RULES

## Bilingual structure
DO NOT duplicate roles.

Correct:

Lead Designer — Europlan

EN
...

IT
...

PROJECTS
...

Wrong:

EN role  
IT role  

---

## Project links

- Must appear AFTER IT block
- Must be aligned with text column only
- Must NOT be placed under role title
- Must feel secondary, not dominant

---

# EXAMPLE ENTRY

Date:
2017 — 2024

Role:
Lead Designer — Europlan S.p.A.

EN:
Led the design and production of brand and editorial communication systems for a hospitality group.  
Managed the full process from concept to print, ensuring consistency across properties, formats and materials.  
Coordinated internal teams, external suppliers and digital workflows, integrating print and digital assets.

IT:
Responsabile della progettazione e produzione di sistemi di comunicazione brand ed editoriali per un gruppo hospitality.  
Gestione dell’intero processo, dal concept alla stampa, garantendo coerenza tra strutture, formati e materiali.  
Coordinamento di team interni, fornitori esterni e flussi digitali, integrando asset print e digital.

PROJECTS:
Europlan ↗  
Hotel Caesius ↗

---

# DESIGN PRINCIPLES

- Everything must align to a vertical grid
- Avoid visual noise (no icons, no heavy UI)
- Maintain strong whitespace
- Prioritize readability over decoration
- Project links must feel like "proof", not navigation

---

# OUTPUT

Generate:

- Clean HTML structure
- Minimal CSS (or Tailwind equivalent)
- Responsive behavior (stack columns on mobile)
- Maintain exact hierarchy and spacing

---

# IMPORTANT

The final result must feel like:

- Editorial layout
- Structured system
- High-end portfolio (not a CV)