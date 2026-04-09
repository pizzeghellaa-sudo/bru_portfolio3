import { useOutletContext } from 'react-router-dom';
import { EXPERIENCE } from '../types';
import { TRANSLATIONS } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';

export default function TimelineSection() {
  const { language } = useOutletContext<LayoutContext>();
  const t = TRANSLATIONS[language].timeline;
  return (
    <div className="flex flex-col gap-24">
      <header>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-ink uppercase"
            style={{ color: 'rgb(179, 178, 178)' }}>
            {t.title}
        </h2>

        <div className="w-24 h-1 bg-primary mt-8" />
        <p className="mt-4 font-mono text-primary text-sm tracking-widest uppercase">{t.subtitle}</p>
      </header>

      <div className="flex flex-col border-t border-ink/10">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12 py-12 border-b border-ink/10 group hover:bg-ink/[0.02] transition-colors">
            <div className="col-span-1 md:col-span-3 font-mono text-sm text-slate-400 mb-4 md:mb-0">
              {exp.period}
            </div>
            <div className="col-span-1 md:col-span-4">
              <h3 className="text-2xl font-bold tracking-tight text-ink">
                {exp.role} / <span className="text-slate-500">{exp.company}</span>
              </h3>
            </div>
            <div className="col-span-1 md:col-span-5 mt-4 md:mt-0">
              <p className="text-lg text-slate-600 leading-relaxed relative pl-6">
                <span className="absolute left-0 top-0 text-primary font-mono text-xs">[+]</span>
                {exp.description[language]}
              </p>
            </div>
          </div>
        ))}
      </div>
     </div>
  );
}
