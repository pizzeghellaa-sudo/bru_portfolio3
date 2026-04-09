# GEO Audit Report: Bru Bulgarelli

**Audit Date:** 2026-03-27 (v2 — Post-Fix Re-Audit)
**URL:** https://bru-portfolio-flax.vercel.app/
**Business Type:** Personal Portfolio — Freelance Brand & Visual Designer
**Pages Analyzed:** 1 (single-page application)
**Previous Score:** 23/100 (Critical)

---

## Executive Summary

**Overall GEO Score: 51/100 — Poor (+28 points from v1)**

In a single session, the site moved from "Critical" to "Poor" — a 28-point improvement representing one of the most efficient GEO gains achievable. The key wins: all metadata (meta description, OG tags, Twitter Cards, hreflang, canonical) is now in the static HTML; two JSON-LD schemas (Person + ProfilePage/WebSite) are crawler-readable without JavaScript; a `robots.txt` with explicit AI crawler directives, `sitemap.xml`, and `llms.txt` are all live; and full static HTML content (About bio, all 7 experience entries, all 9 portfolio descriptions) is now visible to non-JS crawlers. The ceiling above 51 is held by a single structural constraint: no third-party corroboration exists anywhere on the web.

---

## Score Breakdown

| Category | v1 Score | v2 Score | Change | Weight | Weighted |
|---|---|---|---|---|---|
| AI Citability | 31/100 | 64/100 | +33 | 25% | 16.00 |
| Brand Authority | 8/100 | 17/100 | +9 | 20% | 3.40 |
| Content E-E-A-T | 52/100 | 67/100 | +15 | 20% | 13.40 |
| Technical GEO | 17/100 | 71/100 | +54 | 15% | 10.65 |
| Schema & Structured Data | 0/100 | 62/100 | +62 | 10% | 6.20 |
| Platform Optimization | 8/100 | 17/100 | +9 | 10% | 1.70 |
| **Overall GEO Score** | **23/100** | **51/100** | **+28** | | **51.35** |

---

## What Was Fixed (v1 → v2)

| Fix | Status | Impact |
|---|---|---|
| Meta description (full, specific) | ✅ Done | High |
| Canonical URL tag | ✅ Done | Medium |
| Open Graph tags (full suite incl. `og:type=profile`) | ✅ Done | High |
| `profile:first_name` / `profile:last_name` OG tags | ✅ Done | Medium |
| Twitter Card tags | ✅ Done | Medium |
| Hreflang (en, it, x-default) | ✅ Done | Medium |
| `meta robots` directive | ✅ Done | Medium |
| JSON-LD Person schema | ✅ Done | Critical |
| JSON-LD ProfilePage + WebSite schema | ✅ Done | High |
| robots.txt with AI crawler Allow directives | ✅ Done | High |
| sitemap.xml | ✅ Done | Medium |
| llms.txt | ✅ Done | High |
| About bio in static HTML (~150 words) | ✅ Done | Critical |
| All 9 portfolio descriptions in static HTML | ✅ Done | High |
| Full experience timeline in static HTML | ✅ Done | High |
| Page title improved | ✅ Done | Medium |
| Duplicate H1 fixed (nav now `<p>`) | ✅ Done | Low |

---

## Remaining Issues

### High Priority

**HIGH-1: No third-party corroboration — the primary authority ceiling**

This single gap is responsible for the Brand Authority score staying at 17/100 and capping the overall score. AI systems weight entity claims far more heavily when independent sources corroborate them. Currently, the schema, llms.txt, and bio all make claims about Bruna Bulgarelli that no external source on the open web confirms.

**Fastest paths to fix:**
1. Publish a LinkedIn article (400–600 words) crediting her work on Hotel Caesius or the Emozione3 rebrand — AI systems index LinkedIn articles
2. Ask a past client contact (Europlan, Hotel Caesius, Wishdays) to publish a brief LinkedIn recommendation that links to the portfolio
3. Submit one portfolio project to Behance's featured projects — a Behance editorial feature creates an attributable third-party citation
4. List the studio in an Italian design directory (ADI, Grafiche.it, or similar)

---

**HIGH-2: No custom domain**

The site lives at `bru-portfolio-flax.vercel.app`. The JSON-LD `@id` anchor, schema `@id` URIs, and all external links point to a generated Vercel subdomain. This:
- Signals a provisional/experimental deployment to AI systems
- Caps domain authority accumulation
- Means any future citations will point to a low-trust subdomain

**Fix:** Register `brubulgarelli.com` or `brubulgarelli.it` (under €15/year). Update the JSON-LD `@id`, `sameAs` on LinkedIn/Behance, and llms.txt canonical URL. Deploy with Vercel's custom domain feature (free). This is the highest ROI infrastructure change remaining.

---

**HIGH-3: No client testimonials**

Zero testimonials, zero client quotes on the site. Authoritativeness — the "A" in E-E-A-T — cannot be self-declared. Even one attributed quote from a past client at a named company would materially improve both the E-E-A-T score and AI citation probability.

**Fix:** Ask 2–3 past colleagues or clients for a 2–3 sentence quote. Display with full name, title, and company. Format for schema (`Review` or `Recommendation` type on the Person).

---

### Medium Priority

**MEDIUM-1: No measurable outcomes in project descriptions**

All 9 project descriptions are process-oriented ("designed X", "created Y"). None state a result. AI systems weigh factual precision heavily when deciding whether a passage is citable.

**Examples of outcome additions:**
- Hotel Caesius: "…implemented across 6 hotel properties across Lake Garda"
- Europlan: "…sustaining visual continuity across 7 years of seasonal campaigns"
- Emozione3 Pop: "…deployed across 300+ points of sale in shopping malls and bookstores"
- Kalika: "…covering 3 retail locations in urban Verona"

---

**MEDIUM-2: Person schema missing `image` property**

The JSON-LD Person schema has no `image` field. This is required for Google Knowledge Panel eligibility and is used by AI assistants for visual identity anchoring.

**Fix:** Add to Person schema:
```json
"image": {
  "@type": "ImageObject",
  "url": "https://bru-portfolio-flax.vercel.app/[photo-filename].jpg",
  "caption": "Bruna Bulgarelli — Brand & Visual Designer"
}
```

---

**MEDIUM-3: No CreativeWork schema for portfolio projects**

Each portfolio project should have a `CreativeWork` (or `VisualArtwork`) JSON-LD entry. This turns portfolio items into citable named entities in AI knowledge graphs.

**Fix:** Add an `ItemList` + `CreativeWork` block to the existing JSON-LD. Example for Hotel Caesius:
```json
{
  "@type": "VisualArtwork",
  "name": "Hotel Caesius Brand Book",
  "creator": { "@id": "https://bru-portfolio-flax.vercel.app/#person" },
  "description": "Visual identity system and brand guidelines for Hotel Caesius, a luxury hospitality brand on Lake Garda.",
  "artMedium": "Brand Identity, Print",
  "keywords": ["brand identity", "hospitality branding", "Lake Garda", "brand guidelines"]
}
```

---

**MEDIUM-4: llms.txt lacks markdown section headers and specifics**

The current llms.txt is a prose summary. For maximum AI ingestion quality, it should use `## Section` headers and include concrete specifics (named clients, years, deliverables, contact method).

**Recommended structure:**
```
# Bru Bulgarelli — Brand & Visual Designer

## About
[2-3 sentence bio with location, specialization, years]

## Expertise
[Discipline list with brief descriptions]

## Notable Clients
[Client: context/project one-liner]

## Professional Timeline
[Structured year-by-year with company, role, key deliverable]

## Contact
[Email, phone, availability status]

## Links
[LinkedIn, Behance, CV]
```

---

**MEDIUM-5: Single URL — no per-project or per-section URLs**

The entire site (7 experience entries, 9 projects, capabilities, contact) lives at one URL. AI crawlers cannot index sections independently. A dedicated URL per portfolio project would create 9 additional crawlable endpoints.

**Fix:** Implement React Router or Next.js routes so `/projects/hotel-caesius`, `/experience`, etc. are real URLs with their own `<title>` and meta. Update sitemap.xml to include all routes.

---

### Low Priority

**LOW-1: `og:image` not confirmed**
Verify that `og:image` is set in the HTML. Without it, AI crawlers that render OG cards and social sharing will use no image or a fallback.

**LOW-2: WebSite schema missing `potentialAction`**
Add `SearchAction` to the WebSite schema for sitelinks eligibility.

**LOW-3: `robots.txt` — add `OAI-SearchBot` and `anthropic-ai` to explicit allowlist**
Current explicit allowlist covers GPTBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot. Add:
```
User-agent: OAI-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /
```

**LOW-4: No Wikidata entity**
A minimal Wikidata Q-number (instance of: human; occupation: graphic designer; country: Italy; website; sameAs) makes the entity resolvable in knowledge graph queries. Not yet achievable without more external citations but worth planning for.

**LOW-5: Hidden H1 still present**
`<h1>BRU BULGARELLIPORTFOLIO 2026</h1>` (the loading screen element) is the only H1 in the DOM. The visible "BRAND & VISUAL DESIGNER" heading is an H2. Consider either making "Bru Bulgarelli" an H1 in the primary content or hiding the loading element from screen readers and crawlers.

---

## Category Deep Dives

### AI Citability — 64/100 (+33)

**Top citable passages (ready for AI extraction now):**

1. **About bio** — strongest, most self-contained:
   > "Bruna Bulgarelli is an Italian brand and visual designer based in Valeggio sul Mincio, Verona, Italy, with over 30 years of professional experience. She specialises in brand identity systems, editorial design, and packaging for hospitality, retail, and cultural clients. From 2017 to 2024 she was Lead Designer at Europlan S.p.A., directing visual communications for a portfolio of Italian hotels and residences on Lake Garda."

2. **PAM Group passage** — named client + scale signal:
   > "Promotional materials, flyers, POP displays and in-store signage for Italy's largest supermarket group (PAM Group, Panorama). Coordination and design at Verba DDB, Verona."

3. **Emozione3 Brand Book** — named client + defined deliverable:
   > "Rebranding of Emozione3, an Italian gift box company (Wish Days S.r.l., Verona). Defined new visual identity system including logo usage, tone of voice and brand applications for print and digital platforms."

**Remaining citability gap:** Project descriptions average 40–60 words. Optimal AI citation passages are 134–167 words. Expanding the top 3 projects (Hotel Caesius, Europlan, Emozione3) to 150+ words with outcome data would push this score to ~75.

---

### Brand Authority — 17/100 (+9)

The schema work created entity anchors — machine-readable claims about who Bruna is. But brand authority is corroboration density: how many independent sources confirm those claims. Currently: zero.

**Platform presence map:**
| Platform | Status |
|---|---|
| LinkedIn | ✅ Exists — schema-linked |
| Behance | ✅ Exists — schema-linked |
| Wikidata | ❌ No entity |
| Wikipedia | ❌ No article |
| Reddit mentions | ❌ None found |
| YouTube | ❌ No presence |
| Italian design press | ❌ No mentions |
| Client attribution (external) | ❌ None |

---

### Content E-E-A-T — 67/100 (+15)

| Dimension | Score | Notes |
|---|---|---|
| Experience | 84/100 | 30-yr career, 7 named roles, co-founder, scale clients now documented |
| Expertise | 72/100 | Production specifics (CMYK/Pantone, XML workflows, wayfinding) demonstrate craft depth |
| Authoritativeness | 26/100 | All signals still self-asserted; no external validation |
| Trustworthiness | 62/100 | Real identity + location + contact clear; no outcomes, no domain |

---

### Technical GEO — 71/100 (+54)

| Dimension | v1 | v2 |
|---|---|---|
| AI Crawler Access (robots.txt) | 10 | 95 |
| Content Discoverability | 5 | 78 |
| llms.txt | 0 | 72 |
| Meta Tags | 20 | 92 |
| Technical Foundation | 30 | 68 |
| URL Structure / Internal Linking | 15 | 18 |

The only dimension that didn't materially move is URL structure — inherent to the SPA architecture.

---

### Schema & Structured Data — 62/100 (+62)

| Schema | Status | Quality |
|---|---|---|
| Person | ✅ Implemented | Strong — name, @id, jobTitle, address, knowsAbout, sameAs |
| ProfilePage | ✅ Implemented | Good — mainEntity cross-reference correct |
| WebSite | ✅ Implemented | Basic — missing potentialAction |
| Person.image | ❌ Missing | Critical gap |
| CreativeWork (projects) | ❌ Missing | High value — 9 portfolio items not yet schema-marked |
| ItemList | ❌ Missing | Needed to wrap portfolio entries |

---

### Platform Optimization — 17/100 (+9)

| Platform | Readiness | Blocker |
|---|---|---|
| Google AI Overviews | 35/100 | No custom domain, no inbound links |
| ChatGPT / GPTBot | 40/100 | Static HTML + Person schema now readable |
| Perplexity | 42/100 | llms.txt + meta tags help; no external citations |
| Gemini | 35/100 | Google index improving; no domain authority |
| Bing Copilot | 35/100 | Same as Google |

---

## Quick Wins (Next Session)

1. **Register custom domain** — Move to `brubulgarelli.com` or `brubulgarelli.it`. Update all schema `@id` and `sameAs` URLs. Estimated time: 30–60 min. Impact: +5–8 pts.

2. **Add `Person.image` to JSON-LD** — One ImageObject block with the photo URL, width, height, and caption. Estimated time: 10 min. Impact: +3–5 pts schema, Knowledge Panel eligibility.

3. **Add outcome phrases to 3 project descriptions** — Add one sentence of scope/result to Hotel Caesius, Europlan, and Emozione3. e.g. "deployed across 6 hotel properties on Lake Garda". Estimated time: 20 min. Impact: +3–5 pts citability.

4. **Improve llms.txt with `##` section headers** — Restructure into About, Expertise, Notable Clients, Professional Timeline, Contact, Links. Estimated time: 20 min. Impact: +3–4 pts technical.

5. **Publish one LinkedIn article about a project** — 400–600 words about Hotel Caesius or Emozione3 rebrand, naming Bruna as the designer. Estimated time: 60 min. Impact: +8–12 pts brand authority (first external citation).

---

## 30-Day Action Plan

### Week 1: Domain + Schema Completion
- [ ] Register custom domain (`brubulgarelli.com` or `.it`)
- [ ] Configure Vercel custom domain, update all schema `@id` URIs
- [ ] Add `Person.image` to JSON-LD schema
- [ ] Add `CreativeWork` entries for top 3 portfolio projects (Hotel Caesius, Europlan, Emozione3)
- [ ] Add `og:image` if not yet set

### Week 2: Content Enrichment
- [ ] Add outcome/scope sentence to all 9 project descriptions
- [ ] Restructure llms.txt with `##` section headers and concrete specifics
- [ ] Request 2–3 client testimonials (email former contacts at Europlan, Wishdays, Hotel Caesius)
- [ ] Add testimonials to site once received (with `Review` schema)

### Week 3: Authority Building
- [ ] Publish LinkedIn article: "The branding story behind [Hotel Caesius / Emozione3]" (400–600 words, names Bruna as designer)
- [ ] Update Behance profile with full project descriptions matching site
- [ ] Submit Hotel Caesius or Europlan project to Behance's featured/curated sections
- [ ] List studio in ADI (Associazione per il Disegno Industriale) or Italian design directory

### Week 4: Technical Polish + Wikidata
- [ ] Add `WebSite.potentialAction` (SearchAction) to schema
- [ ] Add `OAI-SearchBot` and `anthropic-ai` to robots.txt allowlist
- [ ] Fix hidden H1 loading element
- [ ] Create minimal Wikidata entity (after LinkedIn article is indexed — provides external citation)
- [ ] Add `ItemList` schema wrapping portfolio CreativeWork entries

---

## Projected Score Trajectory

| Milestone | Score | Rating |
|---|---|---|
| v1 (pre-fixes) | 23/100 | Critical |
| v2 (this audit) | 51/100 | Poor |
| After custom domain + schema completion | ~57/100 | Poor→Fair |
| After first external citation (LinkedIn article) | ~63/100 | Fair |
| After testimonials + outcome data | ~70/100 | Fair |
| After Wikidata + directory listings | ~75/100 | Good |

**75/100 (Good) is achievable within 30 days.**

---

## Appendix: Pages Analyzed

| URL | Title | Crawlable Without JS |
|---|---|---|
| https://bru-portfolio-flax.vercel.app/ | Bru Bulgarelli — Brand & Visual Designer | ✅ Yes (static HTML added) |

**Static content confirmed in raw HTML (no JS required):**
- About bio (~150 words) ✅
- 7 experience entries with dates ✅
- Skills & Capabilities ✅
- 9 portfolio project descriptions ✅
- Contact information ✅
- 2 JSON-LD schemas ✅
- Full meta/OG/Twitter/hreflang head tags ✅

---

*Report generated by GEO-SEO Claude Code Skill v1.0 | https://github.com/zubair-trabzada/geo-seo-claude*
*Audit v1: 2026-03-27 23/100 → Audit v2: 2026-03-27 51/100 (+28 pts)*
