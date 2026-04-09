import { useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import ImageModal from '../components/ImageModal';
import type { Language } from '../translations';

export interface LayoutContext {
  language: Language;
  onImageClick: (images: string[], index: number) => void;
}

// Section enum kept local — used only for nav active-state mapping
type Section = 'INDEX' | 'TIMELINE' | 'CAPABILITIES' | 'WORK' | 'CONTACTS';

const PATH_TO_SECTION: Record<string, Section> = {
  '': 'INDEX',
  'experience': 'TIMELINE',
  'capabilities': 'CAPABILITIES',
  'selected-works': 'WORK',
  'contact': 'CONTACTS',
};

const SECTION_TO_PATH: Record<Section, string> = {
  INDEX: '',
  TIMELINE: 'experience',
  CAPABILITIES: 'capabilities',
  WORK: 'selected-works',
  CONTACTS: 'contact',
};

function deriveSection(pathname: string): Section {
  // pathname is like /en/ or /en/experience or /en/selected-works/slug
  const parts = pathname.split('/').filter(Boolean);
  // parts[0] = lang, parts[1] = section (may be undefined for index)
  const segment = parts[1] ?? '';
  return PATH_TO_SECTION[segment] ?? 'INDEX';
}

export default function RootLayout() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const language: Language = lang === 'it' ? 'IT' : 'EN';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  const activeSection = deriveSection(location.pathname);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSectionChange = (section: Section) => {
    const path = SECTION_TO_PATH[section];
    navigate(`/${lang}/${path}`);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (newLang: Language) => {
    // Swap /en/ <-> /it/ in the current pathname
    const newLangSegment = newLang === 'IT' ? 'it' : 'en';
    const newPath = location.pathname.replace(/^\/(en|it)/, `/${newLangSegment}`);
    navigate(newPath);
  };

  const handleImageClick = (images: string[], index: number) => {
    setModalImages(images);
    setZoomIndex(index);
  };

  const outletContext: LayoutContext = {
    language,
    onImageClick: handleImageClick,
  };

  return (
    <div className="relative flex h-screen w-full flex-row overflow-hidden bg-background-light">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 swiss-grid-lines pointer-events-none opacity-50" />

      <Sidebar
        activeSection={activeSection}
        language={language}
        currentTime={currentTime}
        onSectionChange={handleSectionChange}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10">
        <MobileMenu
          activeSection={activeSection}
          language={language}
          isMobileMenuOpen={isMobileMenuOpen}
          onSectionChange={handleSectionChange}
          onLanguageChange={handleLanguageChange}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full flex flex-col p-6 md:p-12 lg:p-20 max-w-[1400px]"
          >
            <Outlet context={outletContext} />
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {zoomIndex !== null && modalImages.length > 0 && (
          <ImageModal
            images={modalImages}
            currentIndex={zoomIndex}
            onClose={() => { setZoomIndex(null); setModalImages([]); }}
            onNext={() => setZoomIndex(i => ((i ?? 0) + 1) % modalImages.length)}
            onPrev={() => setZoomIndex(i => ((i ?? 0) - 1 + modalImages.length) % modalImages.length)}
            language={language}
          />
        )}
      </AnimatePresence>

      <Analytics />
    </div>
  );
}
