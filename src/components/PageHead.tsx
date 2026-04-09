import { Helmet } from 'react-helmet-async';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../seo/siteMeta';
import { switchLocalePath } from '../i18n/localePaths';

interface PageHeadProps {
  title: string;
  description: string;
  path: string;        // e.g. '/en/experience' — used for canonical + hreflang
  jsonLd?: object | object[];
  ogType?: string;     // defaults to 'website'
  ogImage?: string;    // defaults to DEFAULT_OG_IMAGE
  lang: 'en' | 'it';
}

export default function PageHead({
  title,
  description,
  path,
  jsonLd,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  lang,
}: PageHeadProps) {
  const canonical = `${SITE_URL}${path}`;
  const hrefEn = `${SITE_URL}${switchLocalePath(path, 'en')}`;
  const hrefIt = `${SITE_URL}${switchLocalePath(path, 'it')}`;
  const ogLocale = lang === 'it' ? 'it_IT' : 'en_GB';
  const ogLocaleAlt = lang === 'it' ? 'en_GB' : 'it_IT';

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={hrefEn} />
      <link rel="alternate" hrefLang="it" href={hrefIt} />
      <link rel="alternate" hrefLang="x-default" href={hrefEn} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Bru Bulgarelli Portfolio" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

      {jsonLdArray.map((ld, i) => (
        <script type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
