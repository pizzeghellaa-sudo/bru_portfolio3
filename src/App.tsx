// @ts-nocheck
import { Analytics } from "@vercel/analytics/react";
import IndexSection from './sections/IndexSection';
import TimelineSection from './sections/TimelineSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import WorkSection from './sections/WorkSection';
import ProjectDetail from './sections/ProjectDetail';
import SignalSection from './sections/SignalSection';
import ImageModal from './components/ImageModal';
import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from './types';
import { TRANSLATIONS, Language } from './translations';

type Section = 'INDEX' | 'TIMELINE' | 'CAPABILITIES' | 'WORK' | 'CONTACTS';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('INDEX');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const mainRef = useRef<HTMLElement>(null);

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);
  const modalImages = activeProject?.gallery.map(img => img.full) || [];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [selectedProjectId, activeSection]);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setSelectedProjectId(null);
    setIsMobileMenuOpen(false);
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
        onLanguageChange={setLanguage}
      />

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10">
        <MobileMenu
          activeSection={activeSection}
          language={language}
          isMobileMenuOpen={isMobileMenuOpen}
          onSectionChange={handleSectionChange}
          onLanguageChange={setLanguage}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProjectId ? `project-${selectedProjectId}` : activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full flex flex-col p-6 md:p-12 lg:p-20 max-w-[1400px]"
          >
            {selectedProjectId ? (
              <ProjectDetail
                projectId={selectedProjectId}
                onBack={() => setSelectedProjectId(null)}
                onImageClick={(index) => setZoomIndex(index)}
                language={language}
              />
            ) : (
              <>
                {activeSection === 'INDEX' && (
                  <IndexSection
                    onNavigate={handleSectionChange}
                    language={language}
                    onLanguageChange={setLanguage}
                  />
                )}
                {activeSection === 'TIMELINE' && <TimelineSection language={language} />}
                {activeSection === 'CAPABILITIES' && <CapabilitiesSection language={language} />}
                {activeSection === 'WORK' && <WorkSection onSelectProject={setSelectedProjectId} language={language} />}
                {activeSection === 'CONTACTS' && <SignalSection language={language} />}
              </>
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      <AnimatePresence>
        {zoomIndex !== null && activeProject && (
          <ImageModal
            images={modalImages}
            currentIndex={zoomIndex}
            onClose={() => setZoomIndex(null)}
            onNext={() => setZoomIndex((zoomIndex + 1) % modalImages.length)}
            onPrev={() => setZoomIndex((zoomIndex - 1 + modalImages.length) % modalImages.length)}
            language={language}
          />
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
