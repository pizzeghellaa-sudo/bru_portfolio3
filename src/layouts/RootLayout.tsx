import { useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import ImageModal from '../components/ImageModal';
import type { Language } from '../translations';

export interface LayoutContext {
  language: Language;
  onImageClick: (images: string[], alts: string[], index: number) => void;
}

export default function RootLayout() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  const language: Language = lang === 'it' ? 'IT' : 'EN';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalAlts, setModalAlts] = useState<string[]>([]);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Clock tick — starts client-side only to avoid SSG hydration mismatch
  useEffect(() => {
    setCurrentTime(new Date());
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

  const handleImageClick = (images: string[], alts: string[], index: number) => {
    setModalImages(images);
    setModalAlts(alts);
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
        language={language}
        currentTime={currentTime}
      />

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10">
        <MobileMenu
          language={language}
          isMobileMenuOpen={isMobileMenuOpen}
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
            alts={modalAlts}
            currentIndex={zoomIndex}
            onClose={() => { setZoomIndex(null); setModalImages([]); setModalAlts([]); }}
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
