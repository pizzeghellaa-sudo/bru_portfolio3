import { useOutletContext, useLocation, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import bruPng from '../assets/bru.png';
import PageHead from '../components/PageHead';
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from '../seo/pageJsonLd';

export default function SignalSection() {
  const { language } = useOutletContext<LayoutContext>();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const t = TRANSLATIONS[language].signal;

  const langSegment = (lang ?? 'en') as 'en' | 'it';
  const pageTitle = language === 'EN' ? 'Contact — Bru Bulgarelli' : 'Contatti — Bru Bulgarelli';
  const pageDescription = language === 'EN'
    ? 'Contact Bru Bulgarelli — brand and visual designer in Verona, Italy. Available for freelance brand identity and visual communication projects.'
    : 'Contatta Bru Bulgarelli — brand e visual designer a Verona. Disponibile per progetti freelance di brand identity e comunicazione visiva.';
  const jsonLd = [
    buildPersonJsonLd(),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: `/${lang}/` },
      { name: language === 'EN' ? 'Contact' : 'Contatti', url: `/${lang}/contact` },
    ]),
  ];
  const links = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/', category: 'NETWORK' },
    { label: 'Behance', url: 'https://www.behance.net/brubulgarelli', category: 'VISUALS' },
    // { label: 'Read.cv', url: 'https://drive.google.com/file/d/1Ew3OMTzji4Hem9kgC9Dyda33ssuK89Wh/view?usp=sharing', category: 'CURRICULUM' },
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
      <div className="flex-1 flex flex-col justify-center relative">
      <div className="mb-24 flex flex-col md:flex-row items-start md:items-end gap-12">
        <div className="w-48 h-48 overflow-hidden ink/10 flex-shrink-0">
          <img
            src={bruPng}
            alt="Bruna Bulgarelli"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl lg:text-3xl font-medium tracking-[0.1em] leading-none text-ink uppercase font-montserrat">
            BRU BULGARELLI
          </h2>
          <div className="mt-8 font-mono text-xs text-slate-800 tracking-widest space-y-1">
            <p>{t.address}</p>
            <p>{t.phone}</p>
            <p><a href={`mailto:${t.email}`} className="hover:text-primary transition-colors">
              {t.email}
            </a></p>
          </div>
          <div className="mt-8 font-mono text-xs text-slate-400 uppercase tracking-widest space-y-1">
            <p>{t.availability}</p>
            <p>{t.responseTime}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-ink/10 pt-12">
        {links.map((link) => (
          <div key={link.label} className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
              {t.categories[link.category as keyof typeof t.categories] || link.category}
            </span>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-ink hover:text-primary transition-colors flex items-center gap-2">
              {link.label}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100" />
            </a>
          </div>
        ))}
      </div>

      <footer className="mt-auto pt-24 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-ink/10 mt-24 py-8">
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest whitespace-pre-line">
            {t.footer}
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-ink uppercase tracking-widest">
          <div className="w-3 h-3 bg-primary" />
          {t.builtWith}
        </div>
      </footer>
    </div>
    </>
  );
}
