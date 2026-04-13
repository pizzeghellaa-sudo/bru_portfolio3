import { useOutletContext, useLocation, useParams, Link } from 'react-router-dom';
import { EXPERIENCE } from '../types';
import { TRANSLATIONS } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import PageHead from '../components/PageHead';
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from '../seo/pageJsonLd';

export default function TimelineSection() {
  const { language } = useOutletContext<LayoutContext>();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const t = TRANSLATIONS[language].timeline;

  const langSegment = (lang ?? 'en') as 'en' | 'it';
  const pageTitle = `${t.title} — Bru Bulgarelli`;
  const pageDescription = language === 'EN'
    ? 'Professional timeline of Bru Bulgarelli — Brand & Visual Designer. 30+ years across brand identity, retail communication and hospitality, from 1995 to present.'
    : 'Percorso professionale di Bru Bulgarelli — Brand & Visual Designer. Oltre 30 anni tra brand identity, comunicazione retail e ospitalità, dal 1995 a oggi.';
  const jsonLd = [
    buildPersonJsonLd(),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: `/${lang}/` },
      { name: t.title, url: `/${lang}/experience` },
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
      <div className="flex flex-col gap-16">
        {/* Header */}
        <header>
          <h2
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
            style={{ color: 'rgb(179, 178, 178)' }}
          >
            {t.title}
          </h2>
          <p className="mt-3 font-mono text-primary text-sm tracking-widest uppercase">
            {t.subtitle}
          </p>
        </header>

        {/* Timeline entries */}
        <div className="border-t border-[#E6E8EC]">
          {EXPERIENCE.map((exp, i) => {
            const isSelfEmployed = exp.company === 'Self employed';
            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[120px_320px_1fr] gap-x-8 py-10 border-b border-[#E6E8EC]"
              >
                {/* Column 1: Date */}
                <div className="font-mono text-xs tracking-[0.08em] text-[#9AA3B2] mb-3 md:mb-0 pt-0.5">
                  {exp.period}
                </div>

                {/* Column 2: Role */}
                <div className="mb-6 md:mb-0">
                  {isSelfEmployed ? (
                    <h3 className="text-[18px] font-bold uppercase tracking-tight text-[#111]">
                      {exp.role}
                    </h3>
                  ) : (
                    <h3 className="text-[18px] font-bold uppercase tracking-tight text-[#111]">
                      {exp.role}
                      <span className="font-semibold normal-case text-[#6E819C]"> — {exp.company}</span>
                    </h3>
                  )}
                </div>

                {/* Column 3: Content */}
                <div className="flex flex-col">
                  {/* Active language description */}
                  <p
                    className="text-[15px] leading-[1.6] whitespace-pre-line"
                    style={{ color: '#5E6B7A' }}
                  >
                    {exp.description[language]}
                  </p>

                  {/* Projects */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="mt-5">
                      <span
                        className="block text-[11px] uppercase tracking-[0.12em] mb-2"
                        style={{ color: '#9AA3B2' }}
                      >
                        {t.projects}
                      </span>
                      <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {exp.projects.map((proj) => (
                          <Link
                            key={proj.slug}
                            to={`/${lang}/selected-works/${proj.slug}`}
                            className="group inline-flex items-center gap-1 text-sm font-medium text-[#111] hover:text-primary transition-colors"
                          >
                            {proj.name}
                            <span className="text-primary transition-transform duration-150 group-hover:translate-x-0.5 inline-block">↗</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
