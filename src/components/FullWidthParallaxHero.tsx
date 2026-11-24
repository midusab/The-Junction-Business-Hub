import {useEffect, useRef, useState, type MouseEvent} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Pause,
  Phone,
  Play,
} from 'lucide-react';
import {BUSINESS_INFO, HERO_SLIDES, type PageId} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

interface FullWidthParallaxHeroProps {
  onNavigate: (page: PageId) => void;
}

export function FullWidthParallaxHero({
  onNavigate,
}: FullWidthParallaxHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Pointer-reactive interactive depth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, {stiffness: 90, damping: 24});
  const smoothMouseY = useSpring(mouseY, {stiffness: 90, damping: 24});

  const bgShiftX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    prefersReducedMotion ? [0, 0] : [14, -14]
  );
  const bgShiftYOffset = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    prefersReducedMotion ? [0, 0] : [10, -10]
  );

  // Full-width background vertical parallax + subtle zoom on scroll
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '22%']
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.04, 1.16]
  );
  const foregroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 28]
  );
  const foregroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.9],
    prefersReducedMotion ? [1, 1] : [1, 0.35]
  );

  useEffect(() => {
    if (!isAutoPlay || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isAutoPlay, prefersReducedMotion]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[540px] lg:min-h-[620px] flex flex-col justify-end overflow-hidden bg-slate-950 border-b border-slate-200"
    >
      {/* Full-Width Animated Parallax + Pointer-Reactive Background Layer */}
      <motion.div
        style={{
          y: bgY,
          x: bgShiftX,
          translateY: bgShiftYOffset,
          scale: bgScale,
        }}
        className="absolute -inset-4 will-change-transform pointer-events-none"
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={
              prefersReducedMotion ? {opacity: 1} : {opacity: 0, scale: 1.07}
            }
            animate={
              prefersReducedMotion
                ? {opacity: 1}
                : {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      opacity: {duration: 0.9, ease: [0.16, 1, 0.3, 1]},
                      scale: {duration: 6.0, ease: 'easeOut'},
                    },
                  }
            }
            exit={
              prefersReducedMotion
                ? {opacity: 0}
                : {
                    opacity: 0,
                    transition: {duration: 0.75, ease: [0.16, 1, 0.3, 1]},
                  }
            }
            className="absolute inset-0 w-full h-full"
          >
            <ResilientImage
              src={currentSlide.src}
              alt={currentSlide.alt}
              fallbackTitle={currentSlide.label}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Clean Gradient Contrast Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/45 to-slate-950/15 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent pointer-events-none"
      />

      {/* Simple, Clean Foreground Content with Interactive Motion */}
      <motion.div
        style={{y: foregroundY, opacity: foregroundOpacity}}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-8 lg:pb-10 will-change-transform"
      >
        <div className="max-w-xl">
          <motion.p
            initial={prefersReducedMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
            className="text-xs sm:text-sm font-medium text-sky-300 mb-2.5 tracking-wide"
          >
            Junction-Kodoyo · Homa Bay–Rongo Road
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.05, ease: [0.16, 1, 0.3, 1]}}
            className="text-[clamp(2.15rem,4.4vw,3.6rem)] font-bold tracking-tight text-white leading-[1.08] text-balance"
          >
            Five everyday services in one stop.
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="mt-3 text-base sm:text-lg text-slate-100 leading-relaxed"
          >
            Laundry, cyber café, barber, car wash &amp; highway hotel.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#video-tour"
              whileHover={prefersReducedMotion ? undefined : {y: -2, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-md shadow-lg hover:shadow-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Play className="w-4 h-4" />
              <span>Watch Video</span>
            </motion.a>

            <motion.a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? undefined : {y: -2, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-900 bg-white hover:bg-sky-50 rounded-md shadow-lg hover:shadow-xl transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </motion.a>

            <motion.a
              href={BUSINESS_INFO.phoneHref}
              whileHover={prefersReducedMotion ? undefined : {y: -1}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.97}}
              className="inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium text-sky-200 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono tabular-nums">
                {BUSINESS_INFO.phoneDisplay}
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Animated Bottom Scene Caption & Carousel Switcher */}
        <div className="mt-10 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: -6}}
              transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm"
            >
              <span className="font-semibold text-sky-300">
                {currentSlide.label}
              </span>
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
              <span className="text-slate-100">{currentSlide.caption}</span>
              {currentSlide.targetPage !== 'home' && (
                <button
                  type="button"
                  onClick={() => onNavigate(currentSlide.targetPage)}
                  className="group/link inline-flex items-center gap-1 font-semibold text-sky-300 hover:text-white underline underline-offset-4 cursor-pointer ml-1"
                >
                  <span>Open Page</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-900/95 border border-white/20 rounded-md shadow-lg self-start sm:self-auto shrink-0">
            <motion.button
              type="button"
              onClick={goPrev}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.88}}
              aria-label="Previous background scene"
              className="w-8 h-8 rounded-sm hover:bg-sky-600 text-white inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.94}}
              aria-pressed={isAutoPlay}
              aria-label={isAutoPlay ? 'Pause automatic carousel' : 'Resume automatic carousel'}
              className={`h-8 px-2.5 rounded-sm text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isAutoPlay
                  ? 'bg-sky-600 text-white hover:bg-sky-500'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isAutoPlay ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span>{isAutoPlay ? 'Auto' : 'Paused'}</span>
            </motion.button>

            <div
              role="tablist"
              aria-label="Select background scene"
              className="flex items-center gap-1 px-1.5"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show ${slide.label}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-sm transition-all duration-300 cursor-pointer ${
                      active
                        ? 'w-5 bg-sky-400'
                        : 'w-2.5 bg-white/40 hover:bg-white/75'
                    }`}
                  />
                );
              })}
            </div>

            <motion.button
              type="button"
              onClick={goNext}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.88}}
              aria-label="Next background scene"
              className="w-8 h-8 rounded-sm hover:bg-sky-600 text-white inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Auto-Slide Live Progress Track */}
      {isAutoPlay && !prefersReducedMotion && (
        <motion.div
          key={`hero-progress-${currentSlide.id}`}
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{duration: 4.8, ease: 'linear'}}
          style={{transformOrigin: 'left'}}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-sky-400/90 z-20 pointer-events-none"
        />
      )}
    </section>
  );
}
