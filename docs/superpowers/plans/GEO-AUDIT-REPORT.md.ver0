# GEO Audit Report: Bru Bulgarelli

**Audit Date:** 2026-03-27
**URL:** https://bru-portfolio-flax.vercel.app/
**Business Type:** Personal Portfolio — Freelance Brand & Visual Designer
**Pages Analyzed:** 1 (single-page application, URL never changes)
**Auditor:** GEO-SEO Claude Skill v1.0

---

## Executive Summary

**Overall GEO Score: 23/100 (Critical)**

Bru Bulgarelli's portfolio site is effectively invisible to AI search engines. The site is a client-side rendered React SPA that delivers a near-empty HTML shell to any crawler that doesn't execute JavaScript — which includes GPTBot (ChatGPT), ClaudeBot, and PerplexityBot. The underlying content (30 years of design experience, 9 portfolio projects, rich client history spanning hospitality and FMCG) is strong raw material but is almost entirely unreachable by AI systems in the current architecture. The most urgent priority is architectural: content must be available in HTML at response time before any other GEO optimization can take effect.

---

## Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 31/100 | 25% | 7.75 |
| Brand Authority | 8/100 | 20% | 1.60 |
| Content E-E-A-T | 52/100 | 20% | 10.40 |
| Technical GEO | 17/100 | 15% | 2.55 |
| Schema & Structured Data | 0/100 | 10% | 0.00 |
| Platform Optimization | 8/100 | 10% | 0.80 |
| **Overall GEO Score** | | | **23/100 — Critical** |

---

## Critical Issues (Fix Immediately)

### CRITICAL-1: JavaScript-only rendering — AI crawlers see 1 word of content

**Impact:** Eliminates all GEO value from the site
**Detail:** A non-JS crawl of `https://bru-portfolio-flax.vercel.app/` returns only the string "Bru Bulgarelli" — the page title. The entire portfolio, career history, capabilities, projects, and contact information is rendered client-side in React. GPTBot, ClaudeBot, and PerplexityBot are documented non-JS crawlers. From their perspective, this site contains one word.
**Fix:** Migrate to Next.js (SSR/SSG), Astro (static), or add Vercel Edge rendering. The content is already structured in React components — this is primarily a build configuration change, not a content rewrite. Alternatively, pre-render static HTML at build time and inject it into `index.html`.

---

### CRITICAL-2: Complete absence of structured data (Schema.org)

**Impact:** No machine-readable identity signal for AI entity recognition
**Detail:** Zero JSON-LD scripts, zero microdata, zero schema.org markup of any kind. AI systems cannot resolve "Bru Bulgarelli" as a named entity, link her to her specialization, or connect her to her past clients.
**Fix:** Add `Person`, `ProfilePage`, and `WebSite` schemas to `index.html` immediately. These are static strings — they work even without SSR and are readable by AI crawlers regardless of JavaScript execution. Ready-to-use code is provided in the Schema section below.

---

### CRITICAL-3: No meta description, Open Graph, or Twitter Card tags

**Impact:** Crawlers that do fetch the page see no professional summary
**Detail:** `<meta name="description">` is absent. All Open Graph properties (`og:title`, `og:description`, `og:image`, `og:type`) are absent. Twitter Card tags are absent. Even crawlers that cache the page shell have no machine-readable summary of who this person is.
**Fix:** Add to `index.html` `<head>`:
```html
<meta name="description" content="Bru Bulgarelli — Brand & Visual Designer with 30+ years of experience in brand identity, visual systems, and packaging. Specialising in hospitality and commercial clients. Based in Verona, Italy.">
<meta property="og:title" content="Bru Bulgarelli — Brand & Visual Designer">
<meta property="og:description" content="Brand identity and visual systems for hospitality, cultural and commercial brands. 30+ years experience. Based in Verona, Italy.">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://bru-portfolio-flax.vercel.app/">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Bru Bulgarelli — Brand & Visual Designer">
<meta name="twitter:description" content="Brand identity and visual systems for hospitality, cultural and commercial brands. Based in Verona, Italy.">
```

---

## High Priority Issues

### HIGH-1: No llms.txt file

**Detail:** `https://bru-portfolio-flax.vercel.app/llms.txt` returns 404. The llms.txt standard is the dedicated mechanism for telling AI systems what a site contains. For a personal portfolio, a well-written llms.txt is the fastest path to AI discoverability.
**Fix:** Create `/public/llms.txt` (auto-served by Vercel) with:
```
# Bru Bulgarelli — Brand & Visual Designer

Bruna Bulgarelli (Bru Bulgarelli) is an Italian brand and visual designer based in Valeggio sul Mincio (Verona), Italy.

She specialises in: brand identity, visual systems, editorial design, packaging, and print production for hospitality, cultural, and commercial clients.

30+ years of experience including:
- Lead Designer at Europlan S.p.A. (2017–2024), designing for a portfolio of Italian hotels and residences
- Founder of Pressart S.r.l. (1995–2002), a creative agency specialising in branding and print
- Team leader roles at Wishdays and Verba DDB

Notable clients: Hotel Caesius (Lake Garda luxury hospitality), Europlan Group hotels, PAM/Panorama Group (Italy's largest supermarket chain), Emozione3

Contact: bulgarellibru@gmail.com | +39 347 3587524
Available for freelance brand identity and visual system projects.

## Links
- LinkedIn: https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/
- Behance: https://www.behance.net/brubulgarelli
```

---

### HIGH-2: No robots.txt or sitemap.xml

**Detail:** Both return 404. While the absence of robots.txt defaults to allow-all (not a blocking issue), the lack of a sitemap means crawlers have no structured inventory of site content.
**Fix:** Add `/public/robots.txt`:
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://bru-portfolio-flax.vercel.app/sitemap.xml
```
Add `/public/sitemap.xml` pointing to the homepage (and section anchors or individual project URLs once SSR is implemented).

---

### HIGH-3: Single URL for entire site — no indexable sections

**Detail:** Every section (Experience, Capabilities, Selected Works, Contacts) lives at the same URL with no hash changes or route changes. AI crawlers cannot index sections individually. There is no `/experience`, `/projects/hotel-caesius`, or `/about` URL to cite.
**Fix:** Implement hash routing at minimum (`/#experience`, `/#projects`, `/#contact`) with corresponding canonical tags. Preferred: true route-based navigation with SSR so each section/project is a distinct, crawlable URL.

---

### HIGH-4: No "About" bio section answering "Who is Bru Bulgarelli?"

**Detail:** The hero bio is one sentence (38 words). No page on the site directly answers the question AI assistants are most likely to query: "who is Bru Bulgarelli?", "who is a good Italian hospitality brand designer?". This is the single highest-impact content gap.
**Fix:** Add an "About" section with a structured biography of ~150 words. Draft:

> "Bru Bulgarelli is an Italian brand and visual designer based in Valeggio sul Mincio, Verona, with over 30 years of professional experience spanning agency, in-house, and freelance work. She specialises in brand identity systems, editorial design, and packaging for hospitality, retail, and cultural clients. From 2017 to 2024 she was Lead Designer at Europlan S.p.A., directing visual communications for a portfolio of Italian hotels and residences. She co-founded the creative agency Pressart S.r.l. in 1995. Her work has spanned clients including Hotel Caesius on Lake Garda, PAM Group (Italy's largest supermarket chain), and Wishdays. Her tools include the Adobe Creative Suite, and she has developed XML-based automated layout systems for high-volume retail production. Bru Bulgarelli is currently available for freelance brand identity and visual system projects."

---

## Medium Priority Issues

### MEDIUM-1: No custom domain

The site uses `bru-portfolio-flax.vercel.app` — a generated Vercel subdomain. A custom domain (e.g., `brubulgarelli.com` or `brubulgarelli.it`) is the baseline for domain authority, entity recognition, and professional credibility in AI knowledge graphs.

### MEDIUM-2: Portfolio projects lack descriptive text (7 of 9)

Only Hotel Caesius has a project description. The remaining 8 projects are title + category label only. Images are not readable by AI. Without text, these projects contribute zero citability signal.

### MEDIUM-3: No client testimonials or social proof

Zero testimonials, zero client quotes, zero outcome metrics. Authoritativeness — the "A" in E-E-A-T — depends on what others say, not what you say. This is the primary authority gap.

### MEDIUM-4: No Wikipedia / Wikidata entity

"Bru Bulgarelli" does not resolve in Wikidata or Wikipedia. AI systems use Wikidata Q-numbers as canonical entity identifiers. Without one, cross-platform entity matching is unreliable.

### MEDIUM-5: Duplicate H1 tags

The DOM contains two `<h1>` elements:
- `"BRU BULGARELLIPORTFOLIO 2026"` (hidden, likely the loading screen)
- `"BRU BULGARELLI"` (visible header)

Multiple H1s confuse crawlers and dilute heading hierarchy. Use a single H1 for the person's name and role.

---

## Low Priority Issues

### LOW-1: Image alt text is generic for gallery images

Portfolio gallery images use pattern `"Hotel Caesius Brand Book gallery 0"` through `"gallery 11"`. These should describe the actual visual content for accessibility and content signals.

### LOW-2: No education or certification mentions

No mention of formal design education, professional certifications, or continuing education. These add E-E-A-T trust signals, particularly for AI systems evaluating professional credentials.

### LOW-3: No canonical URL tag

Without a canonical URL, crawlers cannot determine the authoritative URL for the page. Add `<link rel="canonical" href="https://bru-portfolio-flax.vercel.app/">`.

### LOW-4: No hreflang for bilingual content

The site supports English and Italian via a toggle, but no `hreflang` tags declare this to crawlers. Add `<link rel="alternate" hreflang="it" href="...">` and `<link rel="alternate" hreflang="en" href="...">`.

---

## Category Deep Dives

### AI Citability — 31/100

**Strongest existing passage:**
> "Hotel Caesius is a luxury hospitality brand located on Lake Garda. The project involved the creation of a visual identity system and brand guidelines for print and digital applications. The identity was implemented across all hotel touchpoints including printed materials, digital platforms and internal brand documentation."

This is the only passage approaching AI citability standards. It names a client, provides geographic context, describes deliverables, and has sufficient length. It is the template for all other project descriptions.

**Core problem:** Content is structured as job duty lists, not answer blocks. AI systems preferentially cite content that directly answers a question. None of the site's content is framed as an answer to any question a user might ask.

**Rewrite priority:** Experience entries need numbers and outcomes. "Coordination of the in-house design team" → "Led a design team of [N] at Wishdays S.r.l., managing seasonal production cycles and developing brand guidelines for [N] distinct labels."

**Realistic score after fixes:** 62–68/100

---

### Brand Authority — 8/100

**Platform presence map:**

| Platform | Status | Priority |
|---|---|---|
| LinkedIn | ✓ Exists | Develop further, publish case studies |
| Behance | ✓ Exists | Complete, add project descriptions |
| Instagram | ✗ Handle taken by unrelated person | Use @brubulgarelli_design |
| Wikipedia | ✗ No entry | Not yet achievable — build other signals first |
| Wikidata | ✗ No entity | Create minimal entry — achievable now |
| YouTube | ✗ No presence | Not a priority |
| Reddit | ✗ No mentions | Build via community engagement (r/graphic_design) |
| Design awards | ✗ No entries | Submit 1–2 projects to Italian design awards |

**Key blocker:** No third-party source credits Bruna Bulgarelli as the designer of any project. Hotel Caesius, Europlan, and PAM Group are all real, indexed brands — but none of their websites or press materials link back to her as the designer. Establishing that attribution chain is the fastest path to brand authority.

---

### Content E-E-A-T — 52/100

| Dimension | Score | Key finding |
|---|---|---|
| Experience (E) | 72/100 | 30-year career timeline with named employers is genuinely strong |
| Expertise (E) | 58/100 | Skills listed but not demonstrated through case studies |
| Authoritativeness (A) | 22/100 | Zero external citations, testimonials, or awards |
| Trustworthiness (T) | 56/100 | Real identity signals present; no outcome evidence |

**Strength:** The career timeline (1995–2025) with named Italian companies is the site's most valuable content asset. Seven roles at recognisable Italian businesses establishes real experience.

**Gap:** Authoritativeness cannot be self-declared. The current site is entirely self-referential. Three client testimonials with full names and company references would more than double the authoritativeness score.

---

### Technical GEO — 17/100

| Dimension | Score | Finding |
|---|---|---|
| AI Crawler Access | 45/100 | No robots.txt — crawlers not blocked but not guided |
| Content Discoverability | 5/100 | JS-only rendering — near-zero indexable content |
| llms.txt | 0/100 | 404 Not Found |
| Meta Tags | 8/100 | Only lang + viewport present |
| Technical Foundation | 62/100 | Vercel CDN, HTTPS, Tailwind — solid infrastructure |
| URL Structure | 3/100 | Single URL, no internal links, no hash routing |

The infrastructure is good (Vercel, HTTPS, CDN). The rendering strategy cancels every infrastructure advantage.

---

### Schema & Structured Data — 0/100

**Current state:** Zero. No JSON-LD, no microdata, no schema.org markup.

**Recommended schemas in implementation order:**

1. **Person** (Critical — implement this week)
2. **ProfilePage** + **WebSite** (High — same session as Person)
3. **CreativeWork** per portfolio project (Medium — after SSR)
4. **ItemList** for portfolio grid (Medium — after SSR)
5. **ProfessionalService** (Low — after domain registration)

**Ready-to-use Person schema** (paste into `<head>` of `index.html`):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://bru-portfolio-flax.vercel.app/#person",
  "name": "Bruna Bulgarelli",
  "alternateName": "Bru Bulgarelli",
  "url": "https://bru-portfolio-flax.vercel.app/",
  "jobTitle": "Brand & Visual Designer",
  "description": "Brand and Visual Designer with 30+ years of experience specialising in brand identity, visual systems, editorial design, and packaging for hospitality, retail, and corporate clients.",
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
  "knowsAbout": ["Brand Identity", "Visual Systems Design", "Editorial Design", "Packaging Design", "Web & Digital Design", "Print Production", "Luxury Hospitality Branding"],
  "sameAs": [
    "https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/",
    "https://www.behance.net/brubulgarelli"
  ]
}
</script>
```

**ProfilePage + WebSite schema:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://bru-portfolio-flax.vercel.app/#profilepage",
      "name": "Bru Bulgarelli — Brand & Visual Designer Portfolio",
      "url": "https://bru-portfolio-flax.vercel.app/",
      "description": "Portfolio and professional profile of Bruna Bulgarelli, Brand & Visual Designer based in Valeggio sul Mincio, Italy.",
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

---

### Platform Optimization — 8/100

| Platform | Readiness | Notes |
|---|---|---|
| Google AI Overviews | 5/100 | JS rendering + no schema = invisible |
| ChatGPT / GPTBot | 5/100 | No SSR, GPTBot can't read content |
| Perplexity | 12/100 | Live-fetch with JS execution helps slightly |
| Gemini | 8/100 | Google index empty without SSR |
| Bing Copilot | 8/100 | No meta tags, no schema |

All platforms blocked primarily by the JS rendering issue.

---

## Quick Wins (Implement This Week)

1. **Add JSON-LD schemas to `index.html`** — Person + ProfilePage + WebSite schemas are static strings that go directly in `<head>`. No framework changes needed. Immediately readable by all AI crawlers. Estimated time: 30 minutes.

2. **Add meta description + Open Graph tags to `index.html`** — Five lines of HTML in `<head>`. Transforms how every crawler summarises the page. Estimated time: 15 minutes.

3. **Create `/public/llms.txt`** — Plain text file, auto-served by Vercel. Write a 200-word structured summary of who Bruna is and what she does. Estimated time: 20 minutes.

4. **Create `/public/robots.txt`** with explicit AI crawler Allow directives and a sitemap pointer. Estimated time: 10 minutes.

5. **Fix the duplicate H1** — The hidden loading H1 (`"BRU BULGARELLIPORTFOLIO 2026"`) should be removed or changed to a `<p>` or `<span>`. Estimated time: 5 minutes.

**Total time for all 5 quick wins: ~80 minutes. Estimated score improvement: +12 to +18 points.**

---

## 30-Day Action Plan

### Week 1: Technical Foundation (No Content Rewriting Required)
- [ ] Add Person + ProfilePage + WebSite JSON-LD to `index.html`
- [ ] Add meta description, Open Graph, and Twitter Card tags to `index.html`
- [ ] Create `/public/llms.txt` with structured professional summary
- [ ] Create `/public/robots.txt` with AI crawler directives
- [ ] Add canonical URL tag to `index.html`
- [ ] Fix duplicate H1 element
- [ ] Register custom domain (brubulgarelli.com or brubulgarelli.it)

### Week 2: SSR / Static Rendering Migration
- [ ] Evaluate migration options: Next.js SSG, Astro static, or Vite pre-rendering plugin
- [ ] Implement chosen SSR/SSG solution so all section content is in initial HTML
- [ ] Verify crawlable content with a curl fetch: `curl -s https://[domain]/ | grep "BRAND"`
- [ ] Add sitemap.xml once URLs are finalised
- [ ] Implement hash-based routing at minimum (`/#experience`, `/#projects`, `/#contact`)

### Week 3: Content Depth
- [ ] Write the "About" biography block (~150 words, see draft in HIGH-4 above)
- [ ] Write project descriptions for all 9 portfolio items (use Hotel Caesius as template)
- [ ] Add quantified data to Experience entries (team sizes, project volumes, brand counts)
- [ ] Request 3 client/colleague testimonials from past employers

### Week 4: Authority Building
- [ ] Create Wikidata entity for Bruna Bulgarelli
- [ ] Publish one LinkedIn case study article (Hotel Caesius or Europlan — 400–600 words)
- [ ] Update Behance profile with full project descriptions matching the portfolio
- [ ] Submit one portfolio project to an Italian design award (ADI, IF Design, or Graphis)
- [ ] Add hreflang tags for English/Italian language versions

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://bru-portfolio-flax.vercel.app/ | Bru Bulgarelli | No SSR, no meta desc, no schema, no robots.txt, no sitemap, no llms.txt, duplicate H1, no OG tags |

**Sections within the SPA (not separately indexable):**
| Section | Content Found | Indexable by AI Crawlers |
|---|---|---|
| Hero / INDEX | Role, 1-sentence bio | No (JS-rendered) |
| EXPERIENCE | 7 roles, 1995–2025 | No (JS-rendered) |
| CAPABILITIES | Disciplines + tools list | No (JS-rendered) |
| SELECTED WORKS | 9 projects, 1 with description | No (JS-rendered) |
| CONTACTS | Location, email, phone, LinkedIn, Behance | No (JS-rendered) |

---

## Projected Score After Fixes

| Phase | Actions | Estimated Score |
|---|---|---|
| Current | Nothing done | 23/100 |
| After Week 1 (Quick Wins) | JSON-LD + meta tags + llms.txt | 35–40/100 |
| After Week 2 (SSR) | Full content crawlable | 48–55/100 |
| After Week 3 (Content Depth) | Case studies + bio + experience detail | 60–68/100 |
| After Week 4 (Authority) | LinkedIn article + Wikidata + testimonials | 68–75/100 |

A score of **75/100 is achievable within 30 days** with the above plan — moving from "Critical" to "Good" and placing this portfolio in the top tier of discoverability for AI queries about Italian brand designers specialising in hospitality.

---

*Report generated by GEO-SEO Claude Code Skill | https://github.com/zubair-trabzada/geo-seo-claude*
