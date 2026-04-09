import { SITE_URL, SAME_AS, AUTHOR_NAME } from './siteMeta';

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    alternateName: 'Bru Bulgarelli',
    url: `${SITE_URL}/`,
    jobTitle: 'Brand & Visual Designer',
    description: 'Brand and Visual Designer with 30+ years of experience specialising in brand identity, visual systems, editorial design and packaging for hospitality, retail and corporate clients.',
    email: 'bulgarellibru@gmail.com',
    telephone: '+393473587524',
    address: {
      '@type': 'PostalAddress',
      postalCode: '37067',
      addressLocality: 'Valeggio sul Mincio',
      addressRegion: 'VR',
      addressCountry: 'IT',
    },
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/bru.png`,
      caption: 'Bruna Bulgarelli — Brand & Visual Designer',
    },
    knowsLanguage: ['Italian', 'English'],
    knowsAbout: [
      'Brand Identity',
      'Visual Systems Design',
      'Editorial Design',
      'Packaging Design',
      'Web & Digital Design',
      'Print Production',
      'Luxury Hospitality Branding',
    ],
    sameAs: SAME_AS,
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Bru Bulgarelli — Brand & Visual Designer',
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}

export function buildProfilePageJsonLd(lang: 'en' | 'it', url: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        name: 'Bru Bulgarelli — Brand & Visual Designer Portfolio',
        url: `${SITE_URL}${url}`,
        description:
          'Portfolio and professional profile of Bruna Bulgarelli, Brand & Visual Designer based in Valeggio sul Mincio, Verona, Italy.',
        inLanguage: lang === 'it' ? 'it' : 'en',
        dateModified: '2026-03-27',
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      buildWebSiteJsonLd(),
    ],
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
