import { useOutletContext, useLocation, useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import PageHead from '../components/PageHead';
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from '../seo/pageJsonLd';

export default function CapabilitiesSection() {
  const { language } = useOutletContext<LayoutContext>();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const t = TRANSLATIONS[language].capabilities;

  const langSegment = (lang ?? 'en') as 'en' | 'it';
  const pageTitle = `${t.title} — Bru Bulgarelli`;
  const pageDescription = language === 'EN'
    ? 'Brand identity, visual systems, editorial design, packaging, web design and print production — tools and methodologies.'
    : 'Brand identity, sistemi visivi, design editoriale, packaging, web design e produzione a stampa — strumenti e metodologie.';
  const jsonLd = [
    buildPersonJsonLd(),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: `/${lang}/` },
      { name: t.title, url: `/${lang}/capabilities` },
    ]),
  ];

  return (
    <>
      <PageHead
        title={pageTitle}
        description={pageDescription}
        path={location.pathname}
        lang={langSegment}
        jsonLd={jsonLd}
      />
      <div className="flex flex-col gap-24">
      <header className="relative">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-ink uppercase"
                    style={{ color: 'rgb(179, 178, 178)' }}>
            {t.title}
        </h2>

        <div className="w-24 h-1 bg-primary mt-8" />
        <p className="mt-4 font-mono text-primary text-sm tracking-widest uppercase">{t.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-ink/10 relative">
        <div className="col-span-1 md:col-span-6 p-8 pl-0 border-r border-ink/10">
          <h3 className="font-mono text-xs text-slate-400 mb-12 uppercase tracking-widest">{t.categories.discipline}</h3>
          <ul className="flex flex-col gap-4">
            {t.disciplines.map((item) => (
              <li key={item} className="text-3xl md:text-4xl font-bold tracking-tighter text-ink cursor-default">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-6 p-8">
          <h3 className="font-mono text-xs text-slate-400 mb-12 uppercase tracking-widest">{t.categories.tooling}</h3>
          <ul className="flex flex-col gap-6 font-mono text-sm">
            {t.tooling.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary mt-1">/</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-24 p-8 bg-paper border border-ink/5">
            <p className="font-mono text-sm leading-relaxed text-ink uppercase tracking-widest">
              <span className="text-primary mr-2">[*]</span>
              {t.quote}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
