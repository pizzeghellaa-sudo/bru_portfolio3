import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import type { Language } from '../translations';

interface ImageModalProps {
  images: string[];
  alts: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  language: Language;
}

export default function ImageModal({
  images,
  alts,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  language,
}: ImageModalProps) {
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
          alt={alts[currentIndex] || 'Full screen view'}
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
