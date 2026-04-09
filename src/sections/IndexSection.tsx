import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { useOutletContext, useNavigate, useParams, useLocation } from 'react-router-dom';
import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import { switchLocalePath } from '../i18n/localePaths';
import PageHead from '../components/PageHead';
import { buildPersonJsonLd, buildProfilePageJsonLd } from '../seo/pageJsonLd';

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
  const pageDescription = t.description;
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
      <div className="flex-1 flex flex-col justify-center relative">
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
    </>
  );
}
