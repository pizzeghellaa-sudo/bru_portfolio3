import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';
import { switchLocalePath } from '../i18n/localePaths';

interface MobileMenuProps {
  language: Language;
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
}

const NAV_ITEMS = [
  { section: 'INDEX' as const,        path: '' },
  { section: 'TIMELINE' as const,     path: 'experience' },
  { section: 'CAPABILITIES' as const, path: 'capabilities' },
  { section: 'WORK' as const,         path: 'selected-works' },
  { section: 'CONTACTS' as const,     path: 'contact' },
] as const;
type NavSection = typeof NAV_ITEMS[number]['section'];

export default function MobileMenu({
  language,
  isMobileMenuOpen,
  onToggleMenu,
}: MobileMenuProps) {
  const t = TRANSLATIONS[language];
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-6 border-b border-ink/10 bg-background-light sticky top-0 z-30">
        <p className="text-lg font-medium tracking-[0.1em] uppercase font-montserrat">BRU BULGARELLI</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const target = language === 'EN' ? 'it' : 'en';
              navigate(switchLocalePath(location.pathname, target));
            }}
            className="font-mono text-xs font-bold text-primary border border-primary px-2 py-1"
          >
            {language}
          </button>
          <button onClick={onToggleMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {location.pathname.includes('selected-works') && (
        <div className="md:hidden px-6 py-3 border-b border-ink/10 bg-background-light">
          <p className="font-mono text-[11px] text-slate-500 tracking-wide">{t.signal.legalNote}</p>
        </div>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-ink/10 bg-background-light sticky top-[73px] z-30"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.section}
                  to={`/${lang}/${item.path}`}
                  end={item.path === ''}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-4 text-base font-medium transition-colors ${
                      isActive ? 'text-ink font-bold' : 'text-slate-500'
                    }`
                  }
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <>
                      <span className={`w-2 h-2 bg-primary transition-transform duration-300 ${
                        isActive ? 'scale-100' : 'scale-0'
                      }`} />
                      {t.nav[item.section as NavSection]}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
