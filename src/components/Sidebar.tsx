import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';
import { switchLocalePath } from '../i18n/localePaths';

interface SidebarProps {
  language: Language;
  currentTime: Date;
}

const NAV_ITEMS = [
  { section: 'INDEX' as const,        path: '' },
  { section: 'TIMELINE' as const,     path: 'experience' },
  { section: 'CAPABILITIES' as const, path: 'capabilities' },
  { section: 'WORK' as const,         path: 'selected-works' },
  { section: 'CONTACTS' as const,     path: 'contact' },
] as const;
type NavSection = typeof NAV_ITEMS[number]['section'];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour12: false,
    timeZoneName: 'short',
  });
}

export default function Sidebar({ language, currentTime }: SidebarProps) {
  const t = TRANSLATIONS[language];
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();

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
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.section}
              to={`/${lang}/${item.path}`}
              end={item.path === ''}
              className={({ isActive }) =>
                `group flex items-center gap-4 py-2 text-lg font-medium transition-colors ${
                  isActive ? 'text-ink font-bold' : 'text-slate-500 hover:text-ink'
                }`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <span className={`w-2 h-2 bg-primary transition-transform duration-300 ${
                    isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                  }`} />
                  {t.nav[item.section as NavSection]}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-8 flex flex-col gap-4">
        <div className="flex gap-4 border-t border-ink/10 pt-8">
          {(['EN', 'IT'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => navigate(switchLocalePath(location.pathname, l === 'IT' ? 'it' : 'en'))}
              className={`font-mono text-xs tracking-widest transition-colors ${
                language === l ? 'text-primary font-bold' : 'text-slate-400 hover:text-ink'
              }`}
            >
              {l}
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
