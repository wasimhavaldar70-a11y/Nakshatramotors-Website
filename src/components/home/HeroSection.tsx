import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight, MessageSquare, Zap, Sparkles } from 'lucide-react';
import { useStore } from '../../lib/store';
import { generateWhatsAppLink } from '../../utils/evCalculations';

interface HeroSectionProps {
  onExploreScooters: () => void;
  onBookTestRide?: () => void;
}

export const HERO_SLIDES = [
  {
    id: 'hestur-revolution',
    image: '/assets/hero/hero_meet_new_hestur.webp',
    alt: 'Hestur Electric Scooters — Revolutionary Design, Unstoppable Motion. Meet The New Hestur.',
    badge: 'Flagship Edition · Unstoppable Motion',
    title: 'Meet The New Hestur',
    subtitle: 'Revolutionary Design, Unstoppable Motion',
    description: 'Blending cutting-edge tech with unmatched performance and instantaneous electric drive.',
    specs: ['50 km/h Top Speed', '80–160 km Range', 'Advanced Safety'],
    scooterName: 'The New Hestur',
  },
  {
    id: 'hestur-terrain',
    image: '/assets/hero/hero_built_for_every_terrain.webp',
    alt: 'Hestur Electric Scooters — Built For Every Terrain. 80-160 KMS Range. 3+1 Years LFP Battery Warranty. IP67. Hill Assist.',
    badge: 'Built For Every Terrain · 80-160 KMS',
    title: 'Built For Every Terrain',
    subtitle: 'Endurance for Indian Roads & Climbs',
    description: 'IP67 water resistance, hill assist, and 3+1 years LFP battery warranty.',
    specs: ['80–160 km Range', '3+1 Yrs LFP Warranty', 'Hill Assist'],
    scooterName: 'Hestur Dyno Series',
  },
  {
    id: 'hestur-werewolf',
    image: '/assets/hero/hero_all_new_werewolf_plus.webp',
    alt: 'The All New Werewolf+ — Power Beyond Everyday. 150-300 KMS Range. 7 Years Battery Warranty. IP67. Hill Assist.',
    badge: 'The All New Werewolf+ · 150-300 KMS',
    title: 'Power Beyond Everyday',
    subtitle: 'Long-Range Touring with 7-Year Warranty',
    description: 'Removable battery, dual disc brakes, and up to 300 km range in Eco mode.',
    specs: ['150–300 km Range', '7-Yr Battery Warranty', 'Dual Disc Brakes'],
    scooterName: 'Werewolf+',
  },
  {
    id: 'hestur-dyno',
    image: '/assets/aistudio/image_3fa52802.png',
    alt: 'Hestur Dyno — 50 km/h Top Speed, 80-160 KMS Range, On-Road from ₹69,999.',
    badge: 'Smart Value · On-Road from ₹69,999',
    title: 'Hestur Dyno Commuter',
    subtitle: '50 km/h Top Speed · 1000 W Motor',
    description: 'Front disc brake, keyless entry, anti-theft alarm, and built-in USB smartphone charging.',
    specs: ['From ₹69,999', '50 km/h Top Speed', '1000 W Motor'],
    scooterName: 'Dyno 80 km & 160 km',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreScooters,
}) => {
  const store = useStore();
  const settings = store.getSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance slides every 5.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const goToIndex = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
  };

  const handleWhatsAppEnquiry = (slide: typeof HERO_SLIDES[0]) => {
    const text = `Hello ${settings.dealerName || 'Nakshatra Motors'}, I am interested in ${slide.title} (${slide.badge}). Please share price, availability and specifications.`;
    const link = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#060B14] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hestur Electric Scooters Showcase Banner Carousel"
    >
      {/* ============================================================ */}
      {/* 1. DEDICATED MOBILE HERO (< 768px)                          */}
      {/* Engineered specifically for mobile screens (320px - 430px)   */}
      {/* Never crops scooter bodywork/wheels, crystal-clear typography*/}
      {/* ============================================================ */}
      <div className="block md:hidden relative w-full bg-[#060B14] text-white px-4 pt-5 pb-6">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative z-10 flex flex-col"
          >
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-[#CCFF00]" />
              <span>{activeSlide.badge}</span>
            </div>

            {/* Mobile Headline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {activeSlide.title}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-xs sm:text-sm font-bold text-[#CCFF00] tracking-wide mt-1">
              {activeSlide.subtitle}
            </p>

            {/* Description (14px) */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1.5">
              {activeSlide.description}
            </p>

            {/* Framed Visual Showcase Stage — 16:9 uncropped scooter view */}
            <div
              onClick={onExploreScooters}
              className="relative w-full aspect-[16/9] my-4 rounded-2xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-[#0A101D] shadow-2xl flex items-center justify-center cursor-pointer group"
              title="Click to view scooter specifications"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.alt}
                loading={currentSlide === 0 ? 'eager' : 'lazy'}
                fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain object-center select-none ${
                  activeSlide.id === 'hestur-dyno' ? 'p-1.5' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Key Spec Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {activeSlide.specs.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono font-semibold text-slate-200"
                >
                  <Zap className="w-3 h-3 text-[#CCFF00]" />
                  {spec}
                </span>
              ))}
            </div>

            {/* Dual CTA Buttons (48px comfortable touch targets) */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <button
                type="button"
                onClick={() => handleWhatsAppEnquiry(activeSlide)}
                className="h-12 px-3 sm:px-4 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#CCFF00]/25"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950 stroke-none shrink-0" />
                <span className="truncate">Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
              </button>

              <button
                type="button"
                onClick={onExploreScooters}
                className="h-12 px-3 sm:px-4 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-1"
              >
                <span className="truncate">View Models</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Carousel Navigation Controls */}
        <div className="relative z-10 flex items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700/80 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Indicators with Active Progress Bar */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={(e) => goToIndex(idx, e)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-8 h-2 bg-white/30 shadow-sm shadow-[#CCFF00]/40'
                      : 'w-2 h-2 bg-white/30'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      key={`mobile-progress-${currentSlide}-${isPaused ? 'paused' : 'play'}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isPaused ? 0.5 : 1 }}
                      transition={{ duration: isPaused ? 0.2 : 5.5, ease: 'linear' }}
                      style={{ transformOrigin: 'left' }}
                      className="absolute inset-0 bg-[#CCFF00] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700/80 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. ESTABLISHED DESKTOP & TABLET VIEW (md: and above, >= 768px)*/}
      {/* Preserves 100% of the established desktop design and behavior */}
      {/* ============================================================ */}
      <div 
        onClick={onExploreScooters}
        className="hidden md:flex relative w-full aspect-[16/9] min-h-[460px] md:min-h-[560px] lg:min-h-[640px] max-h-[860px] overflow-hidden cursor-pointer group items-center justify-center"
        title="Explore Hestur Electric Scooter Lineup"
        role="region"
        aria-roledescription="carousel"
      >
        {/* Slides rendering with smooth crossfade & gentle zoom */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.04,
              }}
              transition={{
                opacity: { duration: 0.7, ease: 'easeInOut' },
                scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              }}
              className={`absolute inset-0 w-full h-full ${
                isActive ? 'z-10' : 'z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none transform transition-transform duration-1000 group-hover:scale-[1.015]"
              />
            </motion.div>
          );
        })}

        {/* Previous Slide Button */}
        <button
          onClick={goToPrev}
          aria-label="Previous Hero Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Next Slide Button */}
        <button
          onClick={goToNext}
          aria-label="Next Hero Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Slide Indicators / Dots */}
        <div 
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15"
          onClick={(e) => e.stopPropagation()}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={(e) => goToIndex(idx, e)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-8 sm:w-10 h-2 bg-white/30 shadow-sm shadow-[#CCFF00]/40'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                }`}
              >
                {isActive && (
                  <motion.span
                    key={`progress-${currentSlide}-${isPaused ? 'paused' : 'play'}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPaused ? 0.5 : 1 }}
                    transition={{ duration: isPaused ? 0.2 : 5.5, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-0 bg-[#CCFF00] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

