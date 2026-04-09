# REFACTOR.md

## Project Objective

Refactor an existing React + Vite portfolio website to improve SEO and GEO (Generative Engine Optimization) while preserving the current visual appearance, multilingual behavior (EN/IT), and Vercel deployment compatibility.

This is a **refactor task**, not a redesign.

---

## Non-Negotiable Constraints

### Visual Fidelity (CRITICAL)

* Preserve layout, spacing, typography, proportions, and responsiveness with effectively **100% fidelity**.
* Do NOT alter:

  * grid system
  * spacing scale
  * typography hierarchy
  * animation style or timing
  * component structure (unless required for routing/rendering)
* Any visual deviation must be justified as technically necessary.

### Multilingual Support (CRITICAL)

* Preserve full EN / IT support.
* No regressions in:

  * language switching
  * translated content
  * routing
  * metadata per language
* Ensure SEO-friendly multilingual structure (hreflang-compatible).

### Deployment (CRITICAL)

* Must remain fully compatible with **Vercel**.
* Build must succeed with standard Vercel configuration.
* Avoid introducing infrastructure incompatible with Vercel.

---

## Current Site Structure

Main pages:

* Home
* Experience
* Capabilities
* Selected Works
* Contacts

Site type:

* Portfolio for a designer specializing in brand identities and visual systems

---

## Core Problem

The current implementation behaves as a **client-rendered SPA**, which results in:

* weak crawlability
* delayed content rendering for search engines
* suboptimal indexing

Goal: move to an **HTML-first architecture** where each route returns meaningful content on first load.

---

## Target Architecture

### Rendering Strategy

Public pages MUST be:

* **Statically generated (SSG/prerendered)** OR
* **Server-side rendered (SSR)** if necessary

NOT acceptable:

* client-only rendering for primary content

React should be used for:

* hydration
* interactivity
* animations

### Routing

Each page must have a real URL:

Example:

* /en/

* /en/experience

* /en/capabilities

* /en/selected-works

* /en/contact

* /it/

* /it/experience

* /it/capabilities

* /it/selected-works

* /it/contact

Avoid:

* hash-based routing (#)
* single-route content swapping

---

## Implementation Strategy

### Step 1 — Audit

* Analyze current rendering model
* Identify SPA patterns
* Identify where content is injected client-side

### Step 2 — Choose Approach

Compare:

1. Keep Vite + add SSR/prerender
2. Migrate to Next.js (Vercel-native)

Decision criteria:

* visual fidelity risk
* implementation complexity
* multilingual preservation
* long-term maintainability

Prefer the **lowest-risk solution**.

### Step 3 — Refactor

Refactor so that:

* each page is independently renderable
* HTML contains meaningful content before hydration
* components are reused without redesign

### Step 4 — Hydration

* Add hydration only where needed
* Avoid full-page hydration if unnecessary

---

## SEO Requirements

Each page must include:

* unique `<title>`
* meta description
* canonical URL
* semantic HTML structure
* proper heading hierarchy (H1–H3)
* internal links

Global requirements:

* robots.txt
* sitemap.xml

### Content Handling

* Do NOT rewrite copy unnecessarily
* Only adjust content when needed for:

  * semantic clarity
  * accessibility
  * metadata

---

## GEO (AI-Friendly Content) Requirements

Ensure pages contain explicit, extractable information:

* clear service descriptions
* structured sections (what, who, how, outcomes)
* readable text (not hidden in UI)
* minimal reliance on interaction for core info

Avoid:

* content hidden behind tabs/carousels
* text inside images

---

## Multilingual Implementation

Requirements:

* route-based language separation OR equivalent
* consistent structure across EN and IT
* metadata per language
* no mixed-language pages

Preferred:

* hreflang-compatible structure

---

## Vercel Compatibility

Ensure:

* build command works
* output is compatible with Vercel
* no unsupported server runtime introduced

If needed:

* update `vercel.json`
* keep configuration minimal and documented

---

## Code Guidelines

* Reuse existing components
* Avoid unnecessary rewrites
* Maintain clean structure
* Avoid hacks or temporary fixes
* Keep code production-ready

---

## Deliverables

Claude must provide:

1. Architecture assessment
2. Migration plan
3. Code changes
4. Explanation of decisions
5. Vercel notes (if any)
6. Validation checklist

---

## Validation Checklist

### Visual

* Layout matches original
* No spacing or typography drift

### Multilingual

* EN and IT both functional
* Language switching intact

### SEO

* Each page returns HTML content
* Metadata present per page

### Routing

* Each page has its own URL
* No SPA-only navigation

### Deployment

* Builds successfully on Vercel

---

## Guiding Principle

If a page is meant to be read and indexed → it must be rendered as HTML on first load.

If a component is meant to be interactive → it can remain client-side.

---

## Final Instruction

Act as a senior engineer performing a **precision refactor**.

Do NOT redesign.
Do NOT simplify by removing features.
Do NOT introduce breaking changes.

Optimize architecture while preserving the exact user-facing result.
