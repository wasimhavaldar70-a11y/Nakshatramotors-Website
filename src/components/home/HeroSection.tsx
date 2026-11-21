import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreScooters: () => void;
  onBookTestRide: () => void;
}

export const HERO_SLIDES = [
  {
    id: 'hestur-revolution',
    image: '/assets/hero/hero_meet_new_hestur.webp',
    alt: 'Hestur Electric Scooters — Revolutionary Design, Unstoppable Motion. Meet The New Hestur.',
    badge: 'Flagship Edition · Unstoppable Motion',
    title: 'Meet The New Hestur',
  },
  {
    id: 'hestur-terrain',
    image: '/assets/hero/hero_built_for_every_terrain.webp',
    alt: 'Hestur Electric Scooters — Built For Every Terrain. 80-160 KMS Range. 3+1 Years LFP Battery Warranty. IP67. Hill Assist.',
    badge: 'Built For Every Terrain · 80-160 KMS',
    title: 'Built For Every Terrain',
  },
  {
    id: 'hestur-werewolf',
    image: '/assets/hero/hero_all_new_werewolf_plus.webp',
    alt: 'The All New Werewolf+ — Power Beyond Everyday. 150-300 KMS Range. 7 Years Battery Warranty. IP67. Hill Assist.',
    badge: 'The All New Werewolf+ · 150-300 KMS',
    title: 'Power Beyond Everyday',
  },
  {
    id: 'hestur-dyno',
    image: '/assets/aistudio/image_3fa52802.png',
    alt: 'Hestur Dyno — 50 km/h Top Speed, 80-160 KMS Range, On-Road from ₹69,999.',
    badge: 'Hestur Dyno · 50 km/h Top Speed',
    title: '80-160 KMS Range · On-Road from ₹69,999',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreScooters,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance slides every 5.5 seconds unless hovered
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

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#060B14] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hestur Electric Scooters Showcase Banner Carousel"
    >
      {/* Aspect Ratio Container for edge-to-edge 16:9 1920x1080 display */}
      <div 
        onClick={onExploreScooters}
        className="relative w-full aspect-[16/9] min-h-[320px] sm:min-h-[460px] md:min-h-[560px] lg:min-h-[640px] max-h-[860px] overflow-hidden cursor-pointer group flex items-center justify-center"
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

