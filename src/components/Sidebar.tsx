import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';

type Section = 'INDEX' | 'TIMELINE' | 'CAPABILITIES' | 'WORK' | 'CONTACTS';

interface SidebarProps {
  activeSection: Section;
  language: Language;
  currentTime: Date;
  onSectionChange: (section: Section) => void;
  onLanguageChange: (lang: Language) => void;
}

const navItems: Section[] = ['INDEX', 'TIMELINE', 'CAPABILITIES', 'WORK', 'CONTACTS'];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour12: false,
    timeZoneName: 'short',
  });
}

export default function Sidebar({
  activeSection,
  language,
  currentTime,
  onSectionChange,
  onLanguageChange,
}: SidebarProps) {
  const t = TRANSLATIONS[language];

  return (
    <aside className="hidden md:flex flex-col justify-between w-[320px] h-full border-r border-ink/10 bg-background-light z-20 relative">
      <div className="p-8 flex flex-col gap-12">
        <div>
          <h1 className="text-xl font-medium tracking-[0.1em] leading-none text-ink uppercase font-montserrat">
            BRU BULGARELLI<br />
            <span className="text-xs font-mono text-slate-400 tracking-widest mt-1 block">PORTFOLIO 2026</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onSectionChange(item)}
              className={`group flex items-center gap-4 py-2 text-lg font-medium transition-colors ${
                activeSection === item ? 'text-ink font-bold' : 'text-slate-500 hover:text-ink'
              }`}
            >
              <span className={`w-2 h-2 bg-primary transition-transform duration-300 ${
                activeSection === item ? 'scale-100' : 'scale-0 group-hover:scale-100'
              }`} />
              {t.nav[item]}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-8 flex flex-col gap-4">
        <div className="flex gap-4 border-t border-ink/10 pt-8">
          {(['EN', 'IT'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`font-mono text-xs tracking-widest transition-colors ${
                language === lang ? 'text-primary font-bold' : 'text-slate-400 hover:text-ink'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
          VALEGGIO SUL MINCIO, IT <br />
          {formatTime(currentTime)}
        </p>
      </div>
    </aside>
  );
}
