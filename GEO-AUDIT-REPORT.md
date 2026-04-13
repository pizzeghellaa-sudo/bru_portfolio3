# GEO Audit Report: Bru Bulgarelli Portfolio

**Audit Date:** 2026-04-13
**URL:** https://bru-portfolio3.vercel.app
**Business Type:** Personal Portfolio — Brand & Visual Designer (Freelance)
**Pages Analyzed:** 8 (of 40 in sitemap)
**Auditor:** geo-audit skill v1.0

---

## Executive Summary

**Overall GEO Score: 43/100 — Poor**

Bruna Bulgarelli's portfolio has a strong technical foundation — AI crawlers are explicitly welcomed, the site uses server-side rendering (SSG), schema markup is deployed sitewide, and robots.txt is best-in-class. However, the site's GEO performance is severely dragged down by critically thin homepage content (~80 words), the complete absence of an llms.txt file, near-zero third-party brand presence, and content that AI systems struggle to extract and cite. The three project case studies (Emozione3, Hotel Caesius, Kalika) are the site's only viable AI citation candidates, but they lack measurable outcomes and FAQPage structure. A focused 30-day improvement sprint could realistically push this site into the 65–75 range.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 28/100 | 25% | 7.0 |
| Brand Authority | 28/100 | 20% | 5.6 |
| Content E-E-A-T | 55/100 | 20% | 11.0 |
| Technical GEO | 68/100 | 15% | 10.2 |
| Schema & Structured Data | 54/100 | 10% | 5.4 |
| Platform Optimization | 38/100 | 10% | 3.8 |
| **Overall GEO Score** | | | **43.0/100** |

---

## Critical Issues (Fix Immediately)

### 1. llms.txt Missing (returns 404)
`https://bru-portfolio3.vercel.app/llms.txt` does not exist. This file is the emerging standard for helping AI systems understand site structure and prioritize content for citation. Its absence costs 25 weighted technical points alone and means every AI crawler must infer site structure from scratch. For a bilingual 40-URL portfolio, this is the single highest-leverage fix available.

**Fix:** Create `/llms.txt` at the site root with a 60–100 line structured summary including Bruna's identity, specialties, location, key page URLs, and bilingual structure explanation.

### 2. Homepage Content Critically Thin (~80 words visible)
The homepage is the most-crawled and most-evaluated page on any site. At approximately 80 words, it provides almost no extractable content for AI systems. There is no answer paragraph, no value proposition, no summary of services, and no context for AI models to build an entity model from.

**Fix:** Expand the homepage to 400+ words with a self-contained "About in one paragraph" block written in plain, factual prose: who Bruna is, what she does, where she is based, how long she has practised, and what types of clients she serves.

### 3. Zero Answer-Block Structures Sitewide
AI models cannot cite image galleries. The entire site operates in "show, don't tell" portfolio mode. There are no FAQ sections, no How-To content, no definition blocks, and no Q&A structures. No page answers a question such as "What does a brand identity designer do?" or "How long does a branding project take?"

**Fix:** Add a FAQ page or section (6–8 questions with 40–60 word answers each) and implement FAQPage JSON-LD schema.

### 4. No Third-Party Brand Presence
Bruna Bulgarelli has no Wikipedia article, no Wikidata entry, no Google Business Profile, no Reddit mentions, and no YouTube channel. AI models learn entity authority from independent third-party corroboration. Currently the only evidence of Bruna's existence outside her own site is her LinkedIn and Behance profiles.

**Fix:** Create a Google Business Profile (immediate, free, high impact); create a minimal Wikidata item; publish one full Behance case study with process narrative.

---

## High Priority Issues

### 5. CreativeWork Schema Has Relative Image URLs (Spec Violation)
All project-page CreativeWork schemas use relative paths for the image property (e.g., `"/assets/1-full-DjKxJrTU.webp"`). Schema.org requires fully qualified absolute URLs. AI crawlers cannot resolve relative URLs out of schema context — this is a specification violation that undermines the integrity of all project page structured data.

**Fix:** Replace every relative image URL in CreativeWork schemas with `https://bru-portfolio3.vercel.app/assets/filename.webp`.

### 6. BreadcrumbList on Selected Works Page Has Missing `item` Property
The `/en/selected-works` BreadcrumbList has a ListItem for "Home" with no `item` (URL) property. Google requires `item` for all BreadcrumbList entries except the last. This is a Google validation error.

**Fix:** Add `"item": "https://bru-portfolio3.vercel.app/en/"` to the Home ListItem on the Selected Works page breadcrumb.

### 7. sameAs Covers Only 2 Platforms (LinkedIn + Behance)
The Person schema includes `sameAs` for LinkedIn and Behance only. With only 2 external links, AI entity resolution confidence is low. No Wikidata, no Instagram, no Pinterest, no Google Business Profile URL.

**Fix:** Once additional profiles are created or confirmed (Instagram, Wikidata, GBP), add them to the `sameAs` array across all pages.

### 8. No Security Headers (5 of 6 Missing)
Vercel's default deployment does not inject security headers. Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

**Fix:** Add a `headers` block to `vercel.json` with appropriate values for all five headers.

### 9. No Privacy Policy (GDPR Exposure)
The site is operated from Italy, placing it under GDPR jurisdiction. No privacy policy page was found. This is both a legal compliance gap and a direct trust signal failure.

**Fix:** Add a minimal GDPR-compliant privacy policy page and link it from the footer.

### 10. Project Case Studies Describe Outputs, Not Outcomes
Emozione3, Hotel Caesius, and Kalika Skincare are the site's best content — but they stop at deliverable description. There are no measurable or qualitative outcomes. AI models searching for "brand designer Italy case study" need a sentence that explains what was achieved, not just what was produced.

**Fix:** Add one outcome sentence per case study. Format: "[Client] [verb] [result] through [deliverable]." Example: "Hotel Caesius deployed the new brand system across all guest touchpoints, unifying identity from arrival to departure."

---

## Medium Priority Issues

### 11. No Client Testimonials
No testimonials appear anywhere on the site or on external review platforms. A single paragraph from a named contact at Europlan S.p.A. or Wishdays S.r.l. would substantially strengthen both Authoritativeness and Trustworthiness scores.

### 12. Gmail Address Instead of Domain-Branded Email
`bulgarellibru@gmail.com` is used for professional contact. A brand identity specialist presenting with a generic email address sends an inconsistent signal. A `bru@[owndomain].com` or similar would strengthen trust signals.

### 13. speakable Property Missing Sitewide
No `speakable` property appears on any page. This property identifies content sections suitable for AI voice assistants and signals AI assistant readiness. It is almost entirely absent from designer portfolios — implementing it would be a competitive differentiator.

### 14. No Education or Credentials Listed
The 30+ year career timeline is compelling, but no formal education, design school, professional association membership (e.g., ADI, AGI), or certifications are listed. Quality rater guidelines and AI citation systems look for explicit credential signals.

### 15. Capabilities Page Claims Six Disciplines, Only Three Are Supported by Case Studies
The Capabilities page lists Brand Identity, Visual Systems, Editorial Design, Packaging, Web & Digital Design, and Print Production. Only three case studies exist, all focused on brand identity. An AI evaluating this site for packaging or editorial expertise would find zero evidence.

### 16. Project Images Lack Descriptive Alt Text
Project thumbnail images use hashed filenames with no descriptive alt text. Alt text is a primary signal for AI crawlers understanding visual content and is simultaneously an accessibility requirement.

### 17. Entry Animation Causes LCP/CLS Risk
The main content wrapper is rendered with `style="opacity:0;transform:translateY(20px)"` in the SSG HTML, making above-fold content start invisible and JS-dependent. This is a CLS and LCP risk.

### 18. Sitemap lastmod Dates Are All Identical
All 40 sitemap URLs share `lastmod: 2026-04-13`. Search engines discount `lastmod` signals when they appear artificially uniform. Accurate per-URL modification dates are preferred.

---

## Low Priority Issues

### 19. WebSite Schema Missing `inLanguage` and `potentialAction`
The WebSite schema on the homepage lacks `inLanguage: "en"` and no `SearchAction` is declared (only add SearchAction if the site actually supports search functionality).

### 20. ProfilePage URL Points to /en/ Not Root
The ProfilePage schema's `url` property points to `/en/` rather than the canonical root `/`. This creates a minor canonical mismatch.

### 21. No `twitter:site` Handle in Twitter Card
The Twitter Card meta tags are correctly implemented but missing the `twitter:site` @handle. Minor gap for social amplification cross-referencing.

### 22. No Resource Hints for Critical Assets
No `<link rel="preload">`, `<link rel="preconnect">`, or `<link rel="dns-prefetch">` tags are present. Adding preload for the main JS and CSS bundles would improve LCP.

### 23. 2023–2024 Gap in Portfolio Timeline
The Experience page shows Lead Designer at Europlan S.p.A. ending 2024 and Kalika Skincare in 2025 as the only recent project. A two-year gap with no documented work raises questions for clients evaluating an active freelancer.

---

## Category Deep Dives

### AI Citability (28/100)

The site's highest-potential content — the three case studies — averages a 36/100 block-level citability score, below the 70-point citation-ready threshold. The homepage scores 4/100 at block level.

**What works:**
- Case studies have structured narrative (Context → Role → Stack → Outcome sections)
- Emozione3 and Hotel Caesius contain 650–700 words of process documentation
- Domain vocabulary is used correctly, signalling practitioner authenticity

**What fails:**
- No FAQ or How-To structures anywhere on the site
- No statistical density (no metrics, no scale, no numbers beyond years)
- Project outcomes are described qualitatively at best, absent at worst
- Homepage is too thin for any AI system to extract a meaningful summary

**Block-level scores:**

| Page | Citability Score |
|---|---|
| Homepage | 4/100 |
| Experience | 27/100 |
| Capabilities | 25/100 |
| Emozione3 | 37/100 |
| Hotel Caesius | 37/100 |
| Kalika Skincare | 33/100 |
| Contact | 18/100 |

---

### Brand Authority (28/100)

The strongest underlying signal is a 30+ year career that is simply unexpressed online. The authority exists; the digital corroboration does not.

**Platform Presence Map:**

| Platform | Present | Notes |
|---|---|---|
| LinkedIn | Yes | Profile confirmed; completeness unverified |
| Behance | Yes | Profile confirmed; ideal platform for designer authority |
| Wikipedia | No | Not required but highest authority signal |
| Wikidata | No | Create immediately — 10 minute effort, high impact |
| Google Business Profile | No | Critical for local entity recognition |
| YouTube | No | Process video would be high value |
| Reddit | No | Zero community mention signals |
| Instagram | Unknown | High value for visual designers |

**sameAs gap:** The Person schema links to LinkedIn and Behance but not Wikidata, GBP, Instagram, or Pinterest. AI models use sameAs to triangulate entity identity; with only 2 links, confidence is low.

---

### Content E-E-A-T (55/100)

| Dimension | Score | Notes |
|---|---|---|
| Experience | 17/25 | Strong career timeline; specific clients and employers; no before/after metrics |
| Expertise | 13/25 | Correct domain vocabulary; no formal credentials; no methodology rationale |
| Authoritativeness | 9/25 | LinkedIn + Behance linked; no press, awards, testimonials, or external citations |
| Trustworthiness | 16/25 | Complete NAP (name/address/phone) + active contact; no privacy policy; gmail address |

**Content Depth:**

| Page | Word Count | Assessment |
|---|---|---|
| Homepage | ~80 | Critically thin |
| Experience | ~350 | Adequate for CV-style |
| Capabilities | ~200 | Thin — lists but doesn't demonstrate |
| Emozione3 | ~700 | Best content on site |
| Hotel Caesius | ~650 | Strong |
| Kalika Skincare | ~380 | Underdeveloped |
| Contact | ~200 | Adequate for purpose |
| **Total** | **~1,980** | Below threshold for topical authority |

---

### Technical GEO (68/100)

This is the site's strongest dimension. The Vite React SSG architecture means all content — headings, body text, schema, meta tags — is delivered in the raw HTML response, visible to AI crawlers without JavaScript execution.

**Confirmed strengths (from live technical audit):**
- HTTPS with HSTS (2-year max-age, preload flag) ✓
- robots.txt explicitly allows all major AI crawlers ✓
- `meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"` ✓
- Complete Open Graph tags (og:type, og:title, og:description, og:url, og:site_name, og:image, og:locale) ✓
- Twitter Card (summary_large_image) with title, description, image ✓
- hreflang implemented in page, sitemap, AND Open Graph ✓
- `data-server-rendered="true"` — confirmed SSG ✓
- Sitemap: 40 URLs, bilingual, proper priority, hreflang ✓

**Confirmed gaps:**
- llms.txt: 404 (costs 25 weighted points — see Critical Issues)
- Security headers: 5 of 6 missing (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- Entry animation on main content wrapper causes opacity:0 flash (CLS/LCP risk)
- No resource hints (preload/preconnect)
- Images lack explicit width/height attributes

**Sub-scores:**

| Category | Score |
|---|---|
| AI Crawler Access | 95/100 |
| llms.txt | 0/100 |
| Technical Infrastructure | 72/100 |
| Rendering & Performance | 68/100 |

---

### Schema & Structured Data (54/100)

Schema deployment is present and uses JSON-LD exclusively — the right approach. The foundation is solid; the gaps are in completeness and a critical validation error.

**Schema inventory:**

| Schema Type | Pages | Completeness | Critical Issues |
|---|---|---|---|
| Person | All pages | 72% | Only 2 sameAs links; missing contactPoint, worksFor |
| ProfilePage | Homepage only | 85% | URL points to /en/ not root; no speakable |
| WebSite | Homepage only | 70% | No SearchAction; no inLanguage |
| BreadcrumbList | All pages | 85% | Missing `item` on Selected Works page first entry |
| CreativeWork | Project pages | 55% | Relative image URL (spec violation); no @id; no dateModified |
| speakable | None | 0% | Absent sitewide |
| FAQPage | None | 0% | Not present |
| ContactPoint | None | 0% | Should be nested in Person |

**sameAs completeness:** 2/7+ expected platforms. Creating a Wikidata entry alone would be the single highest-GEO-impact action available for schema.

---

### Platform Optimization (38/100)

**Platform Scores:**

| Platform | Score | Primary Gap |
|---|---|---|
| Google AI Overviews | 44/100 | No FAQ structure; no answer-target paragraphs |
| ChatGPT Web Search | 36/100 | No Wikidata/Wikipedia; no llms.txt |
| Perplexity AI | 34/100 | Zero community validation (Reddit, forums); no third-party mentions |
| Google Gemini | 38/100 | No Google Business Profile; no YouTube; no Knowledge Graph anchor |
| Bing Copilot | 37/100 | No Bing Webmaster Tools; no IndexNow; no LinkedIn completion confirmed |

**Note:** The meta description and Open Graph tags ARE confirmed present via the SSG-rendered HTML. This is a positive finding that slightly offsets platform scores.

---

## Quick Wins (Implement This Week)

1. **Create llms.txt** — 60–100 lines, plain English, structured by section. Describe Bruna's identity, specialties, 30+ years of experience, location, languages, key page URLs with one-sentence descriptions, and bilingual structure. Deploy at the root. Recovers 25 weighted technical points.

2. **Fix relative image URLs in all CreativeWork schemas** — Change `/assets/filename.webp` to `https://bru-portfolio3.vercel.app/assets/filename.webp` across all project pages. One-line fix per page in the data layer. Resolves a spec violation.

3. **Fix BreadcrumbList on Selected Works page** — Add `"item": "https://bru-portfolio3.vercel.app/en/"` to the Home ListItem. A two-word fix that resolves a Google validation error.

4. **Add sameAs expansions to Person schema** — Add Instagram, Pinterest (if profiles exist), and a Wikidata URL once created. One JSON array update, deployed sitewide.

5. **Add one outcome sentence to each case study** — For Emozione3, Hotel Caesius, and Kalika: one sentence describing what was achieved, not just what was delivered. Creates the narrative density AI models need to cite a specific project.

---

## 30-Day Action Plan

### Week 1: Foundation Fixes
- [ ] Create `llms.txt` at site root (identity, services, location, key page URLs)
- [ ] Fix relative image URLs in all CreativeWork schemas → absolute `https://` paths
- [ ] Fix BreadcrumbList `item` missing on Selected Works page
- [ ] Add security headers to `vercel.json` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] Add `contactPoint` to Person schema
- [ ] Add `inLanguage: "en"` to WebSite schema

### Week 2: Content Expansion
- [ ] Rewrite homepage: expand from ~80 words to 400+ with a factual "About" paragraph, services summary, geographic anchor, and navigation to key sections
- [ ] Add one outcome sentence to each of the three main case studies
- [ ] Add a FAQ page (6–8 questions + 40–60 word answers) and implement FAQPage JSON-LD
- [ ] Create a minimal GDPR-compliant privacy policy page and link from footer

### Week 3: Entity & Authority Building
- [ ] Create a Google Business Profile (category: Graphic Designer or Brand Consultant, location: Valeggio sul Mincio, Verona)
- [ ] Create a Wikidata item for Bruna Bulgarelli (minimal entry: name, birthplace, occupation, sameAs links)
- [ ] Update `sameAs` in Person schema to include GBP URL, Wikidata, and any social profiles
- [ ] Verify site in Bing Webmaster Tools (add msvalidate.01 meta tag, submit sitemap)
- [ ] Publish one detailed Behance case study with 500–800 word process narrative (Emozione3 or Hotel Caesius)

### Week 4: Topical Authority & Polish
- [ ] Expand Kalika Skincare case study from ~380 to 600+ words (newest project, most underdeveloped)
- [ ] Add one new case study in a missing discipline (packaging or editorial)
- [ ] Add descriptive alt text to all project thumbnail images
- [ ] Add `speakable` property to ProfilePage and project CreativeWork schemas
- [ ] Fix entry animation (replace inline `opacity:0` style with a CSS class toggle)
- [ ] Add `<link rel="preload">` for main JS and CSS bundles in `<head>`
- [ ] List formal education or professional association membership on Experience page

---

## Schema Templates

### llms.txt Template

```
# Bru Bulgarelli — Brand & Visual Designer

> Brand and Visual Designer with 30+ years of experience in brand identity,
> visual systems, editorial design, and packaging. Based in Valeggio sul Mincio,
> Verona, Italy. Working with hospitality, retail, and corporate clients
> since 1995. Available for freelance projects in Italian and English.

## Core Services

- Brand Identity & Visual Systems
- Editorial Design
- Packaging Design
- Web & Digital Design
- Print Production
- Luxury Hospitality Branding

## Key Pages

- Homepage: https://bru-portfolio3.vercel.app/en/
- Experience (full career timeline 1995–2026): https://bru-portfolio3.vercel.app/en/experience
- Capabilities (disciplines + tools): https://bru-portfolio3.vercel.app/en/capabilities
- Selected Works (8 case studies): https://bru-portfolio3.vercel.app/en/selected-works
- Contact: https://bru-portfolio3.vercel.app/en/contact

## Case Studies

- Emozione3 (Brand & Retail System, 2016): https://bru-portfolio3.vercel.app/en/selected-works/emozione3
- Hotel Caesius (Brand System / Luxury Hospitality, 2022): https://bru-portfolio3.vercel.app/en/selected-works/hotel-caesius
- Kalika Skincare (Branding / Visual Identity, 2025): https://bru-portfolio3.vercel.app/en/selected-works/kalika-skincare
- Europlan (Branding / Print): https://bru-portfolio3.vercel.app/en/selected-works/europlan
- PAM-Panorama (Print / Pop): https://bru-portfolio3.vercel.app/en/selected-works/pam-panorama
- Il Marmo (Editorial): https://bru-portfolio3.vercel.app/en/selected-works/il-marmo
- Hotel Nettuno (Painting / Print): https://bru-portfolio3.vercel.app/en/selected-works/hotel-nettuno
- Personal Website (UI / UX / Product): https://bru-portfolio3.vercel.app/en/selected-works/personal-website

## Site Structure

- Available in: English (/en/) and Italian (/it/)
- Primary language: English
- All pages have hreflang alternates

## Contact

- Email: bulgarellibru@gmail.com
- Phone: +39 347 358 7524
- Location: Valeggio sul Mincio (VR), 37067, Italy
- LinkedIn: https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/
- Behance: https://www.behance.net/brubulgarelli
```

### Enhanced Person Schema (add contactPoint + expand sameAs)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://bru-portfolio3.vercel.app/#person",
  "name": "Bruna Bulgarelli",
  "alternateName": "Bru Bulgarelli",
  "url": "https://bru-portfolio3.vercel.app/",
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
  "image": {
    "@type": "ImageObject",
    "url": "https://bru-portfolio3.vercel.app/bru.png",
    "caption": "Bruna Bulgarelli — Brand & Visual Designer"
  },
  "knowsLanguage": ["Italian", "English"],
  "knowsAbout": [
    "Brand Identity", "Visual Systems Design", "Editorial Design",
    "Packaging Design", "Web & Digital Design", "Print Production",
    "Luxury Hospitality Branding"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "business inquiries",
    "email": "bulgarellibru@gmail.com",
    "telephone": "+393473587524",
    "availableLanguage": ["Italian", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/",
    "https://www.behance.net/brubulgarelli",
    "[WIKIDATA-URL-AFTER-CREATING]",
    "[INSTAGRAM-URL-IF-EXISTS]",
    "[GOOGLE-BUSINESS-PROFILE-URL-AFTER-CREATING]"
  ]
}
```

### FAQPage Schema (add to /en/capabilities)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What design services does Bruna Bulgarelli offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bruna Bulgarelli offers brand identity design, visual systems, editorial design, packaging design, web and digital design, and print production. With over 30 years of experience, she specialises in luxury hospitality branding, retail visual systems, and corporate brand identity."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Bruna Bulgarelli based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bruna Bulgarelli is based in Valeggio sul Mincio, Verona, Italy, and works with clients internationally in both Italian and English."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Bruna Bulgarelli for a project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reach Bruna Bulgarelli by email at bulgarellibru@gmail.com or by phone at +39 347 358 7524. She responds within 24 hours and is currently available for new projects."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Bruna Bulgarelli specialise in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bruna Bulgarelli specialises in luxury hospitality branding, retail visual systems, and corporate brand identity. Notable projects include Hotel Caesius on Lake Garda (2022), the Emozione3 brand and retail system (2016), and Kalika Skincare (2025)."
      }
    },
    {
      "@type": "Question",
      "name": "How many years of experience does Bruna Bulgarelli have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bruna Bulgarelli has over 30 years of professional design experience, having founded her first creative agency (Pressart S.r.l.) in 1995. She has worked across brand identity, packaging, editorial, and digital design for hospitality, retail, and corporate clients throughout her career."
      }
    }
  ]
}
```

### CreativeWork Schema — Fixed Template (all project pages)

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://bru-portfolio3.vercel.app/en/selected-works/[SLUG]#work",
  "name": "[Project Name]",
  "description": "[Project description]",
  "url": "https://bru-portfolio3.vercel.app/en/selected-works/[SLUG]",
  "image": {
    "@type": "ImageObject",
    "url": "https://bru-portfolio3.vercel.app/assets/[FILENAME.webp]",
    "caption": "[Project Name] — by Bruna Bulgarelli"
  },
  "dateCreated": "[YYYY]",
  "dateModified": "2026-04-13",
  "keywords": "[brand identity, visual design, ...]",
  "inLanguage": "en",
  "creator": {
    "@type": "Person",
    "@id": "https://bru-portfolio3.vercel.app/#person",
    "name": "Bruna Bulgarelli"
  },
  "genre": "[Branding / Editorial / Packaging]"
}
```

---

## Appendix: Pages Analyzed

| URL | Title | Word Count | GEO Issues |
|---|---|---|---|
| /en/ | Bru Bulgarelli — Brand & Visual Designer | ~80 | Critically thin content; no FAQ |
| /en/experience | Experience | ~350 | No named projects in freelance periods |
| /en/capabilities | Capabilities | ~200 | Lists only — no depth; no FAQ schema |
| /en/selected-works | Selected Works | ~450 | Project images lack alt text |
| /en/contact | Contact | ~200 | Gmail address; no privacy policy |
| /en/selected-works/emozione3 | Emozione3 | ~700 | Relative image in schema; no outcome metric |
| /en/selected-works/hotel-caesius | Hotel Caesius | ~650 | Relative image in schema; no outcome metric |
| /en/selected-works/kalika-skincare | Kalika | ~380 | Underdeveloped; relative image in schema |

**Pages in sitemap not analyzed:** /en/selected-works/europlan, /en/selected-works/pam-panorama, /en/selected-works/il-marmo, /en/selected-works/hotel-nettuno, /en/selected-works/personal-website, and all 20 Italian (/it/) equivalents.

---

*Report generated by geo-audit skill | bru-portfolio3.vercel.app | 2026-04-13*
