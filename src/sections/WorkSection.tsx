import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext, useNavigate, useParams, useLocation } from 'react-router-dom';
import { PROJECTS } from '../types';
import { TRANSLATIONS } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import PageHead from '../components/PageHead';
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from '../seo/pageJsonLd';

export default function WorkSection() {
  const { language } = useOutletContext<LayoutContext>();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState('ALL');
  const t = TRANSLATIONS[language].work;

  const langSegment = (lang ?? 'en') as 'en' | 'it';
  const pageTitle = `${t.title} — Bru Bulgarelli`;
  const pageDescription = language === 'EN'
    ? 'Portfolio of brand identity and visual design projects for hospitality, commercial and cultural clients.'
    : 'Portfolio di progetti di brand identity e visual design per clienti nel settore ospitalità, commerciale e culturale.';
  const jsonLd = [
    buildPersonJsonLd(),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: `/${lang}/` },
      { name: t.title, url: `/${lang}/selected-works` },
    ]),
  ];
  const filters = ['ALL', 'IDENTITY', 'DIGITAL', 'POP', 'PRINT'] as const;

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'ALL') return true;
    const cat = project.category.toUpperCase();
    if (filter === 'IDENTITY') return cat.includes('IDENTITY') || cat.includes('BRANDING');
    if (filter === 'POP') return cat.includes('POP');
    if (filter === 'DIGITAL') return cat.includes('UI') || cat.includes('UX') || cat.includes('PRODUCT') || cat.includes('WEBSITE');
    if (filter === 'PRINT') return cat.includes('PRINT') || cat.includes('EDITORIAL');
    return false;
  });

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
      <header className="flex flex-col md:flex-row justify-between items-baseline gap-8">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-ink uppercase"
                    style={{ color: 'rgb(179, 178, 178)' }}>
            {t.title}

            <div className="w-24 h-1 bg-primary mt-8" />
              <p className="mt-4 font-mono text-primary text-sm tracking-widest uppercase">{t.subtitle}</p>
        </h2>

        <nav className="flex gap-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest transition-colors relative pb-1 ${
                filter === f ? 'text-ink' : 'text-slate-400 hover:text-ink'
              }`}
            >
              {t.filters[f]}
              {filter === f && <motion.div layoutId="filter-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background-light border border-ink/10 min-h-[600px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/${lang}/selected-works/${project.slug}`)}
              className="bg-background-light p-8 flex flex-col gap-6 group cursor-pointer"
            >
              <div className="flex justify-between font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                <span>{project.id} — {project.tags[0]}</span>
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-paper relative">
                {project.video ? (
                  <video
                    src={project.video}
                    muted
                    playsInline
                    onLoadedData={(e) => {
                      const video = e.currentTarget;
                      setTimeout(() => video.play().catch(() => {}), 2000);
                    }}
                    onEnded={(e) => {
                      const video = e.currentTarget;
                      setTimeout(() => {
                        video.currentTime = 0;
                        video.play().catch(() => {});
                      }, 7000);
                    }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors" />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
