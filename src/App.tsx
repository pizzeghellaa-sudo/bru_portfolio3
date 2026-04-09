// @ts-nocheck
import { Analytics } from "@vercel/analytics/react";
import IndexSection from './sections/IndexSection';
import TimelineSection from './sections/TimelineSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import WorkSection from './sections/WorkSection';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCE, PROJECTS } from './types';
import { TRANSLATIONS, Language } from './translations';
import {
  ArrowDown,
  Menu,
  X,
  Grid,
  Brush,
  View,
  Play,
  Book,
  Terminal,
  ExternalLink,
  Globe,
  ZoomIn,
  ZoomOut,
  Maximize
} from 'lucide-react';
import bruPng from "./assets/bru.png";

type Section = 'INDEX' | 'TIMELINE' | 'CAPABILITIES' | 'WORK' | 'CONTACTS';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('INDEX');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const mainRef = useRef<HTMLElement>(null);

  const t = TRANSLATIONS[language];

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);
  const modalImages = activeProject?.gallery.map(img => img.full) || [];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [selectedProjectId, activeSection]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
    hour12: false,
    timeZoneName: 'short'
  });
};
  const navItems: Section[] = ['INDEX', 'TIMELINE', 'CAPABILITIES', 'WORK', 'CONTACTS'];

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setSelectedProjectId(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative flex h-screen w-full flex-row overflow-hidden bg-background-light">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 swiss-grid-lines pointer-events-none opacity-50" />

      {/* Sidebar Navigation */}
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
                onClick={() => handleSectionChange(item)}
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
                onClick={() => setLanguage(lang)}
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

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-6 border-b border-ink/10 bg-background-light sticky top-0 z-30">
          <p className="text-lg font-medium tracking-[0.1em] uppercase font-montserrat">BRU BULGARELLI</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'IT' : 'EN')}
              className="font-mono text-xs font-bold text-primary border border-primary px-2 py-1"
            >
              {language}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                    onClick={() => handleSectionChange(item)}
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




function ProjectDetail({ projectId, onBack, onImageClick, language }: { projectId: string, onBack: () => void, onImageClick: (index: number) => void, language: Language }) {
  const project = PROJECTS.find(p => p.id === projectId);
  const t = TRANSLATIONS[language].work;
  if (!project) return null;

  const meta = project.meta;

  // Render a single story section
  const renderSection = (section, idx) => {
    const images = section.galleryIndices
      .map(i => project.gallery[i])
      .filter(Boolean);

    const textBlock = (
      <div className="flex flex-col gap-4 justify-center">
        <span className="text-5xl md:text-6xl font-black text-primary leading-none">{section.number}</span>
        <h4 className="text-xl font-bold text-ink uppercase tracking-tight">{section.title[language]}</h4>
        <p className="text-sm leading-[1.75] text-ink/80">{section.description[language]}</p>
      </div>
    );

    const imageBlock = (img, i) => img ? (
      <div
        key={i}
        className="overflow-hidden bg-paper cursor-zoom-in group"
        onClick={() => onImageClick(section.galleryIndices[i])}
      >
        <img
          src={img.thumb}
          alt={`${project.title} ${section.number}`}
          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    ) : null;

    if (section.layout === 'text-image') {
      return (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 py-12 border-b border-ink/10">
          {textBlock}
          {imageBlock(images[0], 0)}
        </div>
      );
    }

    if (section.layout === 'image-text') {
      return (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 py-12 border-b border-ink/10">
          <div className="order-2 md:order-1">{imageBlock(images[0], 0)}</div>
          <div className="order-1 md:order-2">{textBlock}</div>
        </div>
      );
    }

    if (section.layout === 'full-grid') {
      const imageGrid = images.length === 1
        ? <div>{imageBlock(images[0], 0)}</div>
        : images.length === 2
          ? <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-4">{images.map((img, i) => imageBlock(img, i))}</div>
          : <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{images.map((img, i) => imageBlock(img, i))}</div>;
      return (
        <div key={idx} className="flex flex-col gap-8 py-16 border-b border-ink/10">
          {textBlock}
          {imageGrid}
        </div>
      );
    }

    if (section.layout === 'diagram') {
      const img = images[0];
      return (
        <div key={idx} className="flex flex-col gap-6 pt-20 pb-28 border-b border-ink/10">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            {section.title[language]}
          </span>
          {img && (
            <div
              className="overflow-hidden cursor-zoom-in group"
              onClick={() => onImageClick(section.galleryIndices[0])}
            >
              <img
                src={img.full}
                alt={section.title[language]}
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest text-center">
            {section.description[language]}
          </p>
        </div>
      );
    }

    if (section.layout === 'annotated-wireframe') {
      const annotationCallouts = (
        <div className="flex flex-col gap-6 justify-center w-[180px]">
          {(section.annotations || []).map((a, ai) => (
            <div key={ai} className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary flex-shrink-0" />
              <span className="font-mono text-xs text-ink uppercase tracking-wider">{a[language]}</span>
              <span className="ml-auto text-slate-500 text-sm hidden md:block">→</span>
            </div>
          ))}
        </div>
      );

      return (
        <div key={idx} className="flex flex-col gap-12 py-12 border-b border-ink/10">
          {/* Zone 1: Section header */}
          {textBlock}

          {/* Zone 2: Two annotated screenshot rows */}
          <div className="flex flex-col gap-10">
            {section.galleryIndices.map((galleryIdx, rowIdx) => {
              const img = project.gallery[galleryIdx];
              if (!img) return null;
              return (
                <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-center">
                  {annotationCallouts}
                  <div
                    className="overflow-hidden bg-paper cursor-zoom-in group"
                    onClick={() => onImageClick(galleryIdx)}
                  >
                    <img
                      src={img.thumb}
                      alt={`${project.title} ${section.number} screenshot ${rowIdx + 1}`}
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Zone 3: Wireframe-to-interface comparison */}
          {section.comparison && (() => {
            const { heading, beforeIndex, afterIndex, beforeLabel, afterLabel } = section.comparison;
            const beforeImg = project.gallery[beforeIndex];
            const afterImg = project.gallery[afterIndex];
            return (
              <div className="flex flex-col gap-6">
                <p className="text-lg font-medium text-ink">{heading[language]}</p>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                  <div className="flex flex-col gap-2">
                    {beforeImg && (
                      <div
                        className="overflow-hidden bg-paper cursor-zoom-in group"
                        onClick={() => onImageClick(beforeIndex)}
                      >
                        <img
                          src={beforeImg.thumb}
                          alt={beforeLabel[language]}
                          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center">{beforeLabel[language]}</p>
                  </div>

                  <span className="hidden md:block text-2xl text-slate-500 px-2">→</span>

                  <div className="flex flex-col gap-2">
                    {afterImg && (
                      <div
                        className="overflow-hidden bg-paper cursor-zoom-in group"
                        onClick={() => onImageClick(afterIndex)}
                      >
                        <img
                          src={afterImg.thumb}
                          alt={afterLabel[language]}
                          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center">{afterLabel[language]}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      );
    }

    // 'half' — returned as-is; caller groups consecutive halves
    return null;
  };

  // Group consecutive 'half' sections into pairs
  const renderSections = () => {
    if (!meta) return null;
    const result = [];
    let i = 0;
    while (i < meta.sections.length) {
      const sec = meta.sections[i];
      if (sec.layout === 'half') {
        const pair = [sec];
        if (i + 1 < meta.sections.length && meta.sections[i + 1].layout === 'half') {
          pair.push(meta.sections[i + 1]);
          i += 2;
        } else {
          i += 1;
        }
        result.push(
          <div key={`half-${i}`} className={`grid grid-cols-1 ${pair.length === 2 ? 'md:grid-cols-2' : ''} gap-12 py-16 border-b border-ink/10`}>
            {pair.map((s, pi) => {
              const img = project.gallery[s.galleryIndices[0]];
              return (
                <div key={pi} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    {s.number
                      ? <span className="text-5xl md:text-6xl font-black text-primary leading-none">{s.number}</span>
                      : <div className="w-12 h-0.5 bg-primary" />
                    }
                    <h4 className="text-xl font-bold text-ink uppercase tracking-tight">{s.title[language]}</h4>
                    <p className="text-sm leading-[1.75] text-ink/80">{s.description[language]}</p>
                  </div>
                  {img && (
                    <div
                      className="overflow-hidden bg-paper cursor-zoom-in group"
                      onClick={() => onImageClick(s.galleryIndices[0])}
                    >
                      <img
                        src={img.thumb}
                        alt={`${project.title} ${s.number}`}
                        className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      } else {
        result.push(renderSection(sec, i));
        i += 1;
      }
    }
    return result;
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Header */}
      <header className="flex flex-col gap-8">
        <button
          onClick={onBack}
          className="font-mono text-xs text-slate-400 hover:text-ink transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <span className="text-primary">←</span> {t.back}
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
          <div>
            <h2
              className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
              style={{ color: 'rgb(179, 178, 178)' }}
            >
              {project.title}
            </h2>
            <p className="font-mono text-xs text-primary mt-2 uppercase tracking-widest">
              {meta ? meta.subtitle[language] : project.category}
            </p>
          </div>
          {meta && (
            <div className="font-mono text-xs text-slate-400 uppercase tracking-widest flex-shrink-0">
              {t.detail.year} — {meta.year}
            </div>
          )}
        </div>
      </header>

      {/* Separator */}
      <div className="w-full h-px bg-ink/10" />

      {/* Main grid */}
      {meta ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="col-span-1 md:col-span-3 flex flex-col gap-10">
            {/* B1 / CONTEXT */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">B1 / {t.detail.context}</span>
              <p className="text-sm leading-relaxed text-ink/80">{meta.context[language]}</p>
            </div>
            {/* B2 / ROLE */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">B2 / {t.detail.role}</span>
              <ul className="flex flex-col gap-2">
                {meta.roles.map(role => (
                  <li key={role} className="flex items-center gap-3">
                    <span className="w-0.5 h-4 bg-primary flex-shrink-0" />
                    <span className="font-mono text-xs text-ink uppercase tracking-wider">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* B3 / STACK */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">B3 / {t.detail.stack}</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {meta.stack.map(item => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{item.label}</span>
                    <span className="font-mono text-xs text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Story sections */}
          <div className="col-span-1 md:col-span-9">
            {renderSections()}
          </div>
        </div>
      ) : (
        /* Fallback layout for projects without meta */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-3">
            <div className="w-12 h-0.5 bg-primary mb-8" />
            <p className="text-xl font-medium leading-tight text-ink whitespace-pre-line">
              {project.description[language]}
            </p>
            <div className="mt-12 flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 border border-ink/10 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 md:col-span-9 flex flex-col gap-12">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden bg-paper cursor-zoom-in group"
                onClick={() => onImageClick(i)}
              >
                <img
                  src={img.thumb}
                  alt={`${project.title} gallery ${i}`}
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImageModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  language
}: {
  images: string[],
  currentIndex: number,
  onClose: () => void,
  onNext: () => void,
  onPrev: () => void,
  language: Language
}) {
  const t = TRANSLATIONS[language].common;
  const src = images[currentIndex];
  const [zoom, setZoom] = useState(1);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const zoomIn = () => setZoom(z => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom(z => Math.max(z - 0.25, 1));
  const zoomReset = () => setZoom(1);

  // Reset zoom and natural size when image changes
  useEffect(() => { setZoom(1); setImgNatural({ w: 0, h: 0 }); }, [currentIndex]);

  const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (zoom <= 1) return;
    const el = containerRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, scrollLeft: el.scrollLeft, scrollTop: el.scrollTop };
    el.setPointerCapture(e.pointerId);
  }, [zoom]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
    el.scrollTop = dragStart.current.scrollTop - (e.clientY - dragStart.current.y);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      return Math.min(Math.max(z + delta, 1), 3);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') zoomReset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  const zoomLabel = zoom === 1 ? '100%' : `${Math.round(zoom * 100)}%`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 md:p-12"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-primary" />
          <span className="font-mono text-xs text-white tracking-widest uppercase">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={zoomOut}
            className="p-1.5 text-white/40 hover:text-primary transition-colors"
            title="Zoom out (−)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={zoomReset}
            className="px-2 py-1 font-mono text-xs text-white/60 hover:text-primary transition-colors tracking-widest min-w-[3.5rem] text-center"
            title="Reset to 100% (0)"
          >
            {zoomLabel}
          </button>

          <button
            onClick={zoomIn}
            className="p-1.5 text-white/40 hover:text-primary transition-colors"
            title="Zoom in (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <button
            onClick={() => setZoom(1)}
            className={`p-1.5 transition-colors ${zoom === 1 ? 'text-primary' : 'text-white/40 hover:text-primary'}`}
            title="Fit to screen (0)"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        className="absolute top-8 right-8 text-white hover:text-primary transition-colors z-50"
        onClick={onClose}
      >
        <span className="font-mono text-xs tracking-widest uppercase">{t.close}</span>
      </button>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-24 flex items-center justify-center z-50">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="p-4 text-white/40 hover:text-primary transition-colors group"
        >
          <span className="font-mono text-4xl group-hover:-translate-x-2 transition-transform block">←</span>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 w-12 md:w-24 flex items-center justify-center z-50">
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="p-4 text-white/40 hover:text-primary transition-colors group"
        >
          <span className="font-mono text-4xl group-hover:translate-x-2 transition-transform block">→</span>
        </button>
      </div>

      <div
        ref={containerRef}
        className={`absolute inset-0 top-16 bottom-16 mx-12 md:mx-24 z-30 overflow-auto no-scrollbar select-none ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'flex items-center justify-center'}`}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <motion.img
          ref={imgRef}
          key={src}
          src={src}
          alt="Full screen view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          draggable={false}
          onLoad={handleImgLoad}
          className="object-contain shadow-2xl pointer-events-none"
          style={zoom <= 1 ? {
            maxWidth: '100%',
            maxHeight: '100%',
          } : {
            width: imgNatural.w ? imgNatural.w * zoom : 'auto',
            height: imgNatural.h ? imgNatural.h * zoom : 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            flexShrink: 0,
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Thumbnails indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary' : 'w-4 bg-white/20'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SignalSection({ language }: { language: Language }) {
  const t = TRANSLATIONS[language].signal;
  const links = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bruna-bulgarelli-8a9b7819/', category: 'NETWORK' },
    { label: 'Behance', url: 'https://www.behance.net/brubulgarelli', category: 'VISUALS' },
    // { label: 'Read.cv', url: 'https://drive.google.com/file/d/1Ew3OMTzji4Hem9kgC9Dyda33ssuK89Wh/view?usp=sharing', category: 'CURRICULUM' },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center relative">
      <div className="mb-24 flex flex-col md:flex-row items-start md:items-end gap-12">
        <div className="w-48 h-48 overflow-hidden ink/10 flex-shrink-0">
          <img 
            src={bruPng}
            alt="Bruna Bulgarelli" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl lg:text-3xl font-medium tracking-[0.1em] leading-none text-ink uppercase font-montserrat">
            BRU BULGARELLI
          </h2>
          <div className="mt-8 font-mono text-xs text-slate-800 tracking-widest space-y-1">
            <p>{t.address}</p>
            <p>{t.phone}</p>
            <p><a href={`mailto:${t.email}`} className="hover:text-primary transition-colors">
              {t.email}
            </a></p>
          </div>
          <div className="mt-8 font-mono text-xs text-slate-400 uppercase tracking-widest space-y-1">
            <p>{t.availability}</p>
            <p>{t.responseTime}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-ink/10 pt-12">
        {links.map((link) => (
          <div key={link.label} className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
              {t.categories[link.category as keyof typeof t.categories] || link.category}
            </span>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-ink hover:text-primary transition-colors flex items-center gap-2">
              {link.label}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100" />
            </a>
          </div>
        ))}
      </div>

      <footer className="mt-auto pt-24 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-ink/10 mt-24 py-8">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] text-slate-500 tracking-wide max-w-xs">{t.legalNote}</p>
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest whitespace-pre-line">
            {t.footer}
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-ink uppercase tracking-widest">
          <div className="w-3 h-3 bg-primary" />
          {t.builtWith}
        </div>
      </footer>
    </div>
  );
}
