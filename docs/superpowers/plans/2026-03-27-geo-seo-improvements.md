# GEO-SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve GEO score from 23/100 (Critical) to 40+ by adding structured data, meta tags, AI-readable static files, fixing the duplicate H1, and injecting a static HTML fallback so AI crawlers that don't execute JavaScript can read the full portfolio content.

**Architecture:** Three phases: (1) static additions to `index.html` and new `public/` files — no framework changes, immediate effect; (2) minor JSX fix in `App.tsx`; (3) `<noscript>` block in `index.html` body containing full portfolio text for non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot).

**Tech Stack:** React 19, Vite 6.2, TypeScript — no new dependencies needed.

---

## File Map

| Action | File | What changes |
|---|---|---|
| Modify | `index.html` | Add meta desc, OG tags, canonical, hreflang, 2× JSON-LD scripts, noscript fallback block |
| Modify | `src/App.tsx:117` | Change mobile-header `<h1>` → `<p>` (fixes duplicate H1) |
| Create | `public/robots.txt` | AI crawler Allow directives + sitemap pointer |
| Create | `public/sitemap.xml` | Single-URL sitemap |
| Create | `public/llms.txt` | Structured 200-word AI-readable summary |

---

## Task 1: Add Meta Tags, Open Graph, and Canonical to `index.html`

**Files:**
- Modify: `index.html:3-8` (inside `<head>`)

- [ ] **Step 1: Replace the current bare `<head>` block**

Open `index.html`. Replace the entire `<head>` content with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bru Bulgarelli — Brand &amp; Visual Designer</title>

    <!-- SEO / GEO Meta -->
    <meta name="description" content="Bru Bulgarelli — Brand &amp; Visual Designer with 30+ years of experience in brand identity, visual systems, editorial design and packaging. Specialising in hospitality and commercial clients. Based in Valeggio sul Mincio, Verona, Italy." />
    <link rel="canonical" href="https://bru-portfolio-flax.vercel.app/" />
    <link rel="alternate" hreflang="en" href="https://bru-portfolio-flax.vercel.app/" />
    <link rel="alternate" hreflang="it" href="https://bru-portfolio-flax.vercel.app/" />
    <link rel="alternate" hreflang="x-default" href="https://bru-portfolio-flax.vercel.app/" />

    <!-- Open Graph -->
    <meta property="og:type" content="profile" />
    <meta property="og:title" content="Bru Bulgarelli — Brand &amp; Visual Designer" />
    <meta property="og:description" content="Brand identity and visual systems for hospitality, cultural and commercial brands. 30+ years experience. Based in Verona, Italy." />
    <meta property="og:url" content="https://bru-portfolio-flax.vercel.app/" />
    <meta property="og:site_name" content="Bru Bulgarelli Portfolio" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:locale:alternate" content="it_IT" />
    <meta property="profile:first_name" content="Bruna" />
    <meta property="profile:last_name" content="Bulgarelli" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Bru Bulgarelli — Brand &amp; Visual Designer" />
    <meta name="twitter:description" content="Brand identity and visual systems for hospitality, cultural and commercial brands. Based in Verona, Italy." />

    <!-- AI Crawler hints -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </head>
```

- [ ] **Step 2: Verify the file saved correctly**

Run:
```bash
grep -n "og:title\|description\|canonical" index.html
```
Expected output: lines containing `og:title`, `description`, and `canonical` tags.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add meta description, Open Graph, canonical and hreflang tags to index.html"
```

---

## Task 2: Add JSON-LD Structured Data to `index.html`

**Files:**
- Modify: `index.html` (inside `<head>`, after the hreflang tags from Task 1)

- [ ] **Step 1: Add Person JSON-LD script block inside `<head>` before `</head>`**

In `index.html`, insert the following two `<script>` blocks immediately before the closing `</head>` tag:

```html
    <!-- Schema.org: Person -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://bru-portfolio-flax.vercel.app/#person",
      "name": "Bruna Bulgarelli",
      "alternateName": "Bru Bulgarelli",
      "url": "https://bru-portfolio-flax.vercel.app/",
      "jobTitle": "Brand & Visual Designer",
      "description": "Brand and Visual Designer with 30+ years of experience specialising in brand identity, visual systems, editorial design and packaging for hospitality, retail and corporate clients.",
      "email": "bulgarellibru@gmail.com",
      "telephone": "+393473587524",
      "address": {
        "@type": "PostalAddress",
        "postalCode": "37067",
        "addressLocality": "Valeggio sul Mincio",
        "addressRegion": "VR",
        "addressCountry": "IT"
      },
      "knowsLanguage": ["Italian", "English"],
      "knowsAbout": [
        "Brand Identity",
        "Visual Systems Design",
        "Editorial Design",
        "Packaging Design",
        "Web & Digital Design",
        "Print Production",
        "Luxury Hospitality Branding"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/",
        "https://www.behance.net/brubulgarelli"
      ]
    }
    </script>

    <!-- Schema.org: ProfilePage + WebSite -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://bru-portfolio-flax.vercel.app/#profilepage",
          "name": "Bru Bulgarelli — Brand & Visual Designer Portfolio",
          "url": "https://bru-portfolio-flax.vercel.app/",
          "description": "Portfolio and professional profile of Bruna Bulgarelli, Brand & Visual Designer based in Valeggio sul Mincio, Verona, Italy.",
          "inLanguage": ["it", "en"],
          "dateModified": "2026-03-27",
          "mainEntity": { "@id": "https://bru-portfolio-flax.vercel.app/#person" }
        },
        {
          "@type": "WebSite",
          "@id": "https://bru-portfolio-flax.vercel.app/#website",
          "name": "Bru Bulgarelli — Brand & Visual Designer",
          "url": "https://bru-portfolio-flax.vercel.app/",
          "publisher": { "@id": "https://bru-portfolio-flax.vercel.app/#person" }
        }
      ]
    }
    </script>
```

- [ ] **Step 2: Validate JSON-LD is well-formed**

Run:
```bash
grep -c "application/ld+json" index.html
```
Expected output: `2` (two JSON-LD blocks).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Person, ProfilePage and WebSite JSON-LD structured data"
```

---

## Task 3: Create `public/robots.txt`

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create the `public/` directory and `robots.txt`**

Create the file `public/robots.txt` with this exact content:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://bru-portfolio-flax.vercel.app/sitemap.xml
```

- [ ] **Step 2: Verify the file**

Run:
```bash
cat public/robots.txt
```
Expected: the content above with `Sitemap:` on the last non-blank line.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt with explicit AI crawler Allow directives"
```

---

## Task 4: Create `public/sitemap.xml`

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://bru-portfolio-flax.vercel.app/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://bru-portfolio-flax.vercel.app/" />
    <xhtml:link rel="alternate" hreflang="it" href="https://bru-portfolio-flax.vercel.app/" />
  </url>
</urlset>
```

- [ ] **Step 2: Verify the file**

Run:
```bash
grep "loc" public/sitemap.xml
```
Expected: one line containing `https://bru-portfolio-flax.vercel.app/`.

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat: add sitemap.xml"
```

---

## Task 5: Create `public/llms.txt`

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Create `public/llms.txt` with a structured AI-readable summary**

```
# Bru Bulgarelli — Brand & Visual Designer

Bruna Bulgarelli (Bru Bulgarelli) is an Italian brand and visual designer based in Valeggio sul Mincio (Verona), Italy.

She specialises in brand identity, visual systems, editorial design, packaging, and print production for hospitality, cultural, and commercial clients.

## Professional Experience

- Freelance (2025 – present): Brand identity and visual communication projects for hospitality, cultural and commercial clients.
- Lead Designer at Europlan S.p.A. (2017–2024): Designed brand and communication materials for a portfolio of Italian hotels and residences on Lake Garda. Managed full production from concept to print, including digital assets.
- Graphic Team Leader at Wishdays S.r.l. (2014–2016): Led in-house design team, managed seasonal workloads, developed brand guidelines for multiple brands, implemented XML-based automated layout workflows.
- Graphic Designer at Total Quality Food S.r.l. (2012–2013): Graphic and regulatory support for EU food labelling compliance; trade show and event materials.
- Account & Graphic Designer at Verba DDB S.r.l. (2005–2010): Managed large retail clients including PAM Group, Panorama and Bata Footwear; oversaw promotional materials, flyers, POP displays and in-store signage.
- Freelance (2003–2005): Editorial design, multilingual layout, technical manuals, static websites; collaborations with publishers, agencies and software companies.
- Founder & Co-owner at Pressart S.r.l. (1995–2002): Co-founded a creative agency specialising in branding and printed communication; developed visual identities, editorial design and packaging.

## Selected Projects

- Hotel Caesius Brand Book (Branding): Visual identity system and brand guidelines for a luxury hospitality brand on Lake Garda. Implemented across printed materials, digital platforms and internal brand documentation.
- Europlan (Branding / Print): Graphic and editorial communication materials for multiple hotel and residence properties, including promotional campaigns, trade-fair assets and printed collateral.
- Kalika (Branding / Print): Brand identity for two young entrepreneurs — logo, colour palette, window graphics and visual system for an urban retail context.
- Emozione3 Brand Book (Branding): Rebranding of Emozione3, an Italian gift box company. Defined new visual identity system including logo usage, tone of voice and brand applications.
- Emozione3 Pop (Print/POP): Design and development of POP materials for retail — seasonal displays, co-marketing initiatives and new product launches across shopping malls, bookstores and large-scale retail.
- In-Store Promotion for Panorama / PAM (Print/POP): Promotional materials, flyers, POP displays and in-store signage for Italy's largest supermarket group.
- Il Marmo Brochure (Editorial): Corporate brochure for a marble company; clean visual narrative from raw material to installation; CMYK with Pantone inks, embossed metallic cover.
- Hotel Nettuno Paintings (Art / Print): Series of cardboard artworks inspired by Lake Garda landscape; stylised vector graphic language; transparent raised varnish finish.
- Personal Website (UI/UX/Product): Designed and built this portfolio using AI-assisted design (Stitch AI) and development (React + Vite + Vercel).

## Skills

Adobe Creative Suite (InDesign, Illustrator, Photoshop), brand identity systems, editorial and publication design, packaging design, POP materials, print production, wayfinding, XML automated layout workflows, web design.

## Contact

Email: bulgarellibru@gmail.com
Phone: +39 347 3587524
Location: Valeggio sul Mincio (Verona), Italy
Available for freelance brand identity and visual system projects.

## Links

- Portfolio: https://bru-portfolio-flax.vercel.app/
- LinkedIn: https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/
- Behance: https://www.behance.net/brubulgarelli
```

- [ ] **Step 2: Verify the file**

Run:
```bash
wc -w public/llms.txt
```
Expected: ~350 words.

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "feat: add llms.txt for AI crawler discovery"
```

---

## Task 6: Fix Duplicate H1 in `src/App.tsx`

**Files:**
- Modify: `src/App.tsx:117`

**Context:** The sidebar (desktop layout, `hidden md:flex`) has an `<h1>` at line 68. The mobile header (`md:hidden`) also has an `<h1>` at line 117. Both render in the DOM simultaneously. Only one `<h1>` should exist — the sidebar one is the semantic page heading. The mobile version should be demoted to a `<p>`.

- [ ] **Step 1: Change mobile header h1 to p**

In `src/App.tsx` at line 117, change:

```tsx
          <h1 className="text-lg font-medium tracking-[0.1em] uppercase font-montserrat">BRU BULGARELLI</h1>
```

to:

```tsx
          <p className="text-lg font-medium tracking-[0.1em] uppercase font-montserrat">BRU BULGARELLI</p>
```

- [ ] **Step 2: Verify only one h1 remains**

Run:
```bash
grep -n "<h1" src/App.tsx
```
Expected output: exactly one line (the sidebar h1 at line ~68).

- [ ] **Step 3: Check the dev build renders correctly**

Run:
```bash
npm run dev
```
Open `http://localhost:3000` and verify the mobile header still displays "BRU BULGARELLI" as before (visual change: none; DOM change: h1 → p).

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "fix: demote duplicate mobile h1 to p element to resolve heading hierarchy"
```

---

## Task 7: Add Static Noscript Fallback in `index.html`

**Files:**
- Modify: `index.html` (inside `<body>`, before `<div id="root">`)

**Why:** GPTBot, ClaudeBot, and PerplexityBot don't execute JavaScript. The `<noscript>` block is part of the raw HTML response — these crawlers read it. Adding structured text content here gives AI search engines the full portfolio to index, even with no SSR migration.

- [ ] **Step 1: Add `<noscript>` block inside `<body>` before `<div id="root">`**

In `index.html`, the `<body>` currently looks like:
```html
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
```

Replace it with:

```html
  <body>
    <noscript>
      <article itemscope itemtype="https://schema.org/ProfilePage">
        <header>
          <h1 itemprop="name">Bru Bulgarelli — Brand &amp; Visual Designer</h1>
          <p>Bruna Bulgarelli is an Italian brand and visual designer based in Valeggio sul Mincio, Verona, Italy, with over 30 years of professional experience. She specialises in brand identity systems, editorial design, and packaging for hospitality, retail, and cultural clients.</p>
          <p>From 2017 to 2024 she was Lead Designer at Europlan S.p.A., directing visual communications for a portfolio of Italian hotels and residences on Lake Garda. She co-founded the creative agency Pressart S.r.l. in 1995. Her work has spanned clients including Hotel Caesius (Lake Garda), PAM Panorama Group (Italy's largest supermarket chain), Wishdays and Emozione3.</p>
          <p>Bru Bulgarelli is currently available for freelance brand identity and visual system projects.</p>
          <p>Contact: <a href="mailto:bulgarellibru@gmail.com">bulgarellibru@gmail.com</a> | +39 347 3587524</p>
          <p>
            <a href="https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/">LinkedIn</a> |
            <a href="https://www.behance.net/brubulgarelli">Behance</a>
          </p>
        </header>

        <section>
          <h2>Professional Experience</h2>
          <ul>
            <li><strong>Freelance (2025 – present):</strong> Brand identity and visual communication projects for hospitality, cultural and commercial clients.</li>
            <li><strong>Lead Designer, Europlan S.p.A. (2017–2024):</strong> Design and production of brand and communication materials for the Group's hotels and residences, including brochures, campaigns, packaging, signage and trade show displays. Managed full production process from concept to print; digital assets and collaboration with IT team on internal platforms.</li>
            <li><strong>Graphic Team Leader, Wishdays S.r.l. (2014–2016):</strong> Coordination of in-house design team and management of seasonal workloads. Design of POP materials, packaging and retail displays. Development of brand guidelines for multiple brands and implementation of XML automated layout workflows.</li>
            <li><strong>Graphic Designer, Total Quality Food S.r.l. (2012–2013):</strong> Graphic and regulatory support for food labelling in compliance with EU Regulation 1169. Development of commercial materials and graphic support for trade shows, conferences and events.</li>
            <li><strong>Account &amp; Graphic Designer, Verba DDB S.r.l. (2005–2010):</strong> Management of large retail clients including PAM Group, Panorama and Bata Footwear. Design and layout of promotional materials, flyers, POP displays and in-store signage for Italy's largest supermarket chain.</li>
            <li><strong>Freelance (2003–2005):</strong> Editorial design, multilingual layout, technical manuals, promotional materials and static website design. Collaborations with publishing houses, communication agencies, software companies and professional training institutes.</li>
            <li><strong>Founder &amp; Co-owner, Pressart S.r.l. (1995–2002):</strong> Co-founded a creative agency specialised in branding and printed communication. Developed visual identities, editorial design and packaging for a range of businesses.</li>
          </ul>
        </section>

        <section>
          <h2>Skills &amp; Capabilities</h2>
          <p>Brand identity, visual systems design, editorial and publication design, packaging, POP materials, print production, web and digital design, wayfinding. Tools: Adobe InDesign, Illustrator, Photoshop, XML automated layout workflows.</p>
        </section>

        <section>
          <h2>Selected Works</h2>
          <ul>
            <li><strong>Hotel Caesius Brand Book (Branding):</strong> Visual identity system and brand guidelines for a luxury hospitality brand on Lake Garda. Implemented across all hotel touchpoints including printed materials, digital platforms and internal brand documentation.</li>
            <li><strong>Europlan (Branding / Print):</strong> Over ten years designing graphic and editorial communication materials for multiple hotel and residence properties, including promotional campaigns, trade-fair assets and printed collateral. Roles included graphic design, editorial layout, photo post-production and wayfinding systems.</li>
            <li><strong>Kalika (Branding / Print):</strong> Brand identity for two young entrepreneurs — dynamic, feminine and approachable. Versatile logo in a young colour palette, window graphics and full visual system for urban retail.</li>
            <li><strong>Emozione3 Brand Book (Branding):</strong> Rebranding of Emozione3, an Italian gift box company (Wish Days S.r.l., Verona). Defined new visual identity system including logo usage, tone of voice and brand applications for print and digital platforms.</li>
            <li><strong>Emozione3 Pop (Print/POP):</strong> POP materials for Emozione3 retail — seasonal displays, co-marketing and new product launches across shopping malls, bookstores and large-scale retail. Consistent visual system from floor displays to counter stands and backlit walls.</li>
            <li><strong>In-Store Promotion — Panorama / PAM Group (Print/POP):</strong> Promotional materials, flyers, POP displays and in-store signage for Italy's largest supermarket group (PAM Group, Panorama). Coordination and design at Verba DDB, Verona.</li>
            <li><strong>Il Marmo Brochure (Editorial):</strong> Corporate brochure for a marble company conveying a contemporary and authoritative image. Clean process-driven visual narrative from raw material to installation. CMYK with Pantone inks, embossed metallic cover with stone names as typographic element.</li>
            <li><strong>Hotel Nettuno Paintings (Art / Print):</strong> Series of cardboard artworks inspired by Lake Garda landscape, reinterpreted through stylised minimal vector graphics. Three formats (square, horizontal, vertical); transparent raised varnish finish; sustainable materials.</li>
            <li><strong>Personal Website (UI/UX):</strong> Designed and built this portfolio — ideation, information architecture, wireframing, visual design (Stitch AI), and AI-assisted development (React, Vite, Vercel).</li>
          </ul>
        </section>
      </article>
    </noscript>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
```

- [ ] **Step 2: Verify the noscript block is in the raw HTML**

Run:
```bash
grep -c "noscript" index.html
```
Expected output: `2` (opening and closing tag).

- [ ] **Step 3: Build the project and verify noscript is in the output**

Run:
```bash
npm run build
grep -c "noscript" dist/index.html
```
Expected output: `2`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add noscript static content block for AI crawler visibility"
```

---

## Verification: Full GEO Check

After all tasks are complete, run a final verification:

- [ ] **Check all meta tags present**

```bash
grep -E "description|og:|twitter:|canonical|hreflang|ld\+json" index.html | wc -l
```
Expected: 15+ lines.

- [ ] **Check all public files exist**

```bash
ls public/
```
Expected: `robots.txt`, `sitemap.xml`, `llms.txt` (plus any pre-existing files).

- [ ] **Check single H1**

```bash
grep -c "<h1" src/App.tsx
```
Expected: `1`.

- [ ] **Check noscript content length**

```bash
grep -o "noscript" index.html | wc -l
```
Expected: `2`.

- [ ] **Build succeeds cleanly**

```bash
npm run build
```
Expected: no errors.

- [ ] **Final commit if not already done**

```bash
git status
```
If all changes committed: output shows clean working tree.

---

## Expected GEO Score Impact

| Category | Before | After these tasks |
|---|---|---|
| AI Citability | 31/100 | ~45/100 (noscript content + JSON-LD) |
| Technical GEO | 17/100 | ~50/100 (robots.txt, sitemap, llms.txt, meta tags) |
| Schema & Structured Data | 0/100 | ~65/100 (Person + ProfilePage + WebSite JSON-LD) |
| Platform Optimization | 8/100 | ~25/100 (OG tags, robots, canonical) |
| Content E-E-A-T | 52/100 | ~55/100 (minor improvement from meta desc) |
| Brand Authority | 8/100 | 8/100 (unchanged — needs off-site work) |
| **Overall** | **23/100** | **~38–43/100** |

> **Next steps (not in this plan):** Custom domain registration, SSR migration (Next.js or Astro), About biography section, richer project descriptions, LinkedIn case study publication, Wikidata entity creation.
