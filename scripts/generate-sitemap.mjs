#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SITE_URL = 'https://bru-portfolio-flax.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const LANGS = ['en', 'it'];

const STATIC_SECTIONS = [
  { path: '', priority: '1.0', changefreq: 'monthly' },
  { path: 'experience', priority: '0.7', changefreq: 'monthly' },
  { path: 'capabilities', priority: '0.7', changefreq: 'monthly' },
  { path: 'selected-works', priority: '0.9', changefreq: 'monthly' },
  { path: 'contact', priority: '0.6', changefreq: 'yearly' },
];

const PROJECT_SLUGS = [
  'emozione3',
  'pam-panorama',
  'europlan',
  'hotel-caesius',
  'kalika-skincare',
  'il-marmo',
  'hotel-nettuno',
  'personal-website',
];

function buildUrl(lang, sectionPath) {
  const fullPath = sectionPath ? `/${lang}/${sectionPath}` : `/${lang}/`;
  return `${SITE_URL}${fullPath}`;
}

function buildUrlEntry(lang, sectionPath, priority, changefreq) {
  const url = buildUrl(lang, sectionPath);
  const altEn = buildUrl('en', sectionPath);
  const altIt = buildUrl('it', sectionPath);

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${altEn}" />
    <xhtml:link rel="alternate" hreflang="it" href="${altIt}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${altEn}" />
  </url>`;
}

const entries = [];

// Static sections (EN + IT)
for (const lang of LANGS) {
  for (const { path: sectionPath, priority, changefreq } of STATIC_SECTIONS) {
    entries.push(buildUrlEntry(lang, sectionPath, priority, changefreq));
  }
}

// Project detail pages (EN + IT)
for (const lang of LANGS) {
  for (const slug of PROJECT_SLUGS) {
    entries.push(buildUrlEntry(lang, `selected-works/${slug}`, '0.8', 'yearly'));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');
console.log(`✓ Sitemap written to ${outputPath} (${entries.length} entries)`);
