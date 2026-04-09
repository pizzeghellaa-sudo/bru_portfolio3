import type { Project } from '../types';
import type { Language } from '../translations';
import { SITE_URL, AUTHOR_NAME } from './siteMeta';

export function buildCreativeWorkJsonLd(project: Project, language: Language, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description[language],
    url: `${SITE_URL}${url}`,
    image: project.gallery[0]?.full ?? project.image,
    dateCreated: project.meta?.year,
    creator: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
    },
    genre: project.category,
  };
}
