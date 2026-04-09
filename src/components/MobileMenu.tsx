import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';

type Section = 'INDEX' | 'TIMELINE' | 'CAPABILITIES' | 'WORK' | 'CONTACTS';

interface MobileMenuProps {
  activeSection: Section;
  language: Language;
  isMobileMenuOpen: boolean;
  onSectionChange: (section: Section) => void;
  onLanguageChange: (lang: Language) => void;
  onToggleMenu: () => void;
}

const navItems: Section[] = ['INDEX', 'TIMELINE', 'CAPABILITIES', 'WORK', 'CONTACTS'];

export default function MobileMenu({
  activeSection,
  language,
  isMobileMenuOpen,
  onSectionChange,
  onLanguageChange,
  onToggleMenu,
}: MobileMenuProps) {
  const t = TRANSLATIONS[language];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-6 border-b border-ink/10 bg-background-light sticky top-0 z-30">
        <p className="text-lg font-medium tracking-[0.1em] uppercase font-montserrat">BRU BULGARELLI</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onLanguageChange(language === 'EN' ? 'IT' : 'EN')}
            className="font-mono text-xs font-bold text-primary border border-primary px-2 py-1"
          >
            {language}
          </button>
          <button onClick={onToggleMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

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
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => onSectionChange(item)}
                  className={`flex items-center gap-3 py-3 px-4 text-base font-medium transition-colors ${
                    activeSection === item ? 'text-ink font-bold' : 'text-slate-500'
                  }`}
                >
                  <span className={`w-2 h-2 bg-primary transition-transform duration-300 ${
                    activeSection === item ? 'scale-100' : 'scale-0'
                  }`} />
                  {t.nav[item]}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
