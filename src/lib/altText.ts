import type { Language } from '../translations';

type BilingualString = { EN: string; IT: string };

/**
 * Resolve alt text for a gallery image.
 * Priority: custom alt → auto-generated from project context
 */
export function resolveGalleryAlt(
  customAlt: BilingualString | undefined,
  projectTitle: string,
  category: string,
  language: Language,
  sectionTitle?: BilingualString,
): string {
  if (customAlt?.[language]) return customAlt[language];

  const designer =
    language === 'EN'
      ? 'designed by Bruna Bulgarelli'
      : 'progettato da Bruna Bulgarelli';
  const cat = category.toLowerCase();
  const sectionPart = sectionTitle?.[language] ? ` — ${sectionTitle[language]}` : '';
  return `${projectTitle}${sectionPart} — ${cat} ${designer}`;
}

/**
 * Resolve alt text for the archive grid thumbnail.
 * Priority: custom alt → auto-generated from project title + category
 */
export function resolveThumbAlt(
  customAlt: BilingualString | undefined,
  projectTitle: string,
  category: string,
  language: Language,
): string {
  if (customAlt?.[language]) return customAlt[language];

  const designer =
    language === 'EN'
      ? 'designed by Bruna Bulgarelli'
      : 'progettato da Bruna Bulgarelli';
  return `${projectTitle} — ${category.toLowerCase()} ${designer}`;
}

/**
 * Resolve aria-label for a video thumbnail.
 * Priority: custom alt → auto-generated default
 */
export function resolveVideoAlt(
  customAlt: BilingualString | undefined,
  projectTitle: string,
  language: Language,
): string {
  if (customAlt?.[language]) return customAlt[language];

  return language === 'EN'
    ? `${projectTitle} — animated logo preview by Bruna Bulgarelli`
    : `${projectTitle} — anteprima logo animato di Bruna Bulgarelli`;
}
