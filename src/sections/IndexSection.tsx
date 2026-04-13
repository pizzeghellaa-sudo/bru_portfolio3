import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { useOutletContext, useNavigate, useParams, useLocation } from 'react-router-dom';
import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import { switchLocalePath } from '../i18n/localePaths';
import PageHead from '../components/PageHead';
import { buildPersonJsonLd, buildProfilePageJsonLd } from '../seo/pageJsonLd';
import { TESTIMONIALS } from '../types';

export default function IndexSection() {
  const { language } = useOutletContext<LayoutContext>();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const t = TRANSLATIONS[language].index;

  const handleLanguageChange = (newLang: Language) => {
    const target = newLang === 'IT' ? 'it' : 'en';
    navigate(switchLocalePath(location.pathname, target));
  };

  const langSegment = (lang ?? 'en') as 'en' | 'it';
  const pageTitle = 'Bru Bulgarelli — Brand & Visual Designer';
  const pageDescription = t.metaDescription;
  const jsonLd = [
    buildPersonJsonLd(),
    buildProfilePageJsonLd(langSegment, location.pathname),
  ];

  return (
    <>
      <PageHead
        title={pageTitle}
        description={pageDescription}
        path={location.pathname}
        lang={langSegment}
        jsonLd={jsonLd}
        ogType="profile"
      />
      <div className="min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-10rem)] flex flex-col justify-center relative">
      <div className="relative z-10">
        {/* Language Selector (Mobile & Desktop) */}
        <div className="flex items-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">LOCALE</span>
          </div>
          <div className="flex gap-4">
            {(['EN', 'IT'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`font-mono text-xs tracking-widest transition-all relative pb-1 ${
                  language === l ? 'text-ink font-bold' : 'text-slate-400 hover:text-ink'
                }`}
              >
                {l === 'EN' ? 'ENGLISH' : 'ITALIANO'}
                {language === l && (
                  <motion.div
                    layoutId="lang-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <h2
          className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase mb-12 whitespace-pre-line"
          style={{ color: 'rgb(179, 178, 178)' }}
        >
          {t.title}
        </h2>

        <div className="max-w-xl">
          <div className="w-12 h-0.5 bg-primary mb-8" />
          <p className="text-xl md:text-2xl font-medium leading-tight text-ink mb-12">
            {t.description}
          </p>

          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate(`/${lang}/selected-works`)}
              className="bg-ink text-white px-8 py-4 font-mono text-sm tracking-widest hover:bg-primary transition-colors"
            >
              {t.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Grid Circle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-ink/5 rounded-full hidden lg:flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-ink/5" />
          ))}
        </div>
      </div>
    </div>

      {/* Testimonials Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mb-3">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            {t.testimonialsLabel}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-ink mb-16">
          {t.testimonialsTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pt-8 border-t border-ink/10 flex flex-col mb-12 md:mb-0"
            >
              {/* Oversized quote mark */}
              <span className="block text-7xl leading-none font-black text-ink/8 mb-4 -mt-1 select-none">
                "
              </span>
              {/* Quote body */}
              <p className="text-sm md:text-base leading-relaxed text-ink/70 flex-1 mb-8">
                {testimonial.quote[language]}
              </p>
              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink/6 border border-ink/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-[9px] font-bold text-ink/50 tracking-wider">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm text-ink leading-tight">{testimonial.name}</p>
                  <p className="font-mono text-[10px] text-slate-400 tracking-wider mt-0.5">
                    {testimonial.role[language]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pt-16 pb-32 md:pt-24 md:pb-40 flex flex-col items-center text-center border-t border-ink/10"
      >
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-ink mb-8">
          {t.ctaTitle}
        </h3>
        <button
          onClick={() => navigate(`/${lang}/contact`)}
          className="bg-ink text-white px-8 py-4 font-mono text-sm tracking-widest hover:bg-primary transition-colors"
        >
          {t.ctaButton}
        </button>
      </motion.section>
    </>
  );
}
