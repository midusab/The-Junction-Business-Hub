import {useEffect, useRef, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Play,
  Printer,
  Scissors,
  Shirt,
  UtensilsCrossed,
} from 'lucide-react';
import {BUSINESS_INFO, HERO_SLIDES, type PageId} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

interface FullWidthParallaxHeroProps {
  onNavigate: (page: PageId) => void;
}

const DEPARTMENT_QUICK_CARDS: Array<{
  id: Exclude<PageId, 'home'>;
  title: string;
  summary: string;
  iconBg: string;
  iconText: string;
  Icon: typeof Shirt;
}> = [
  {
    id: 'laundry',
    title: 'Laundry Services',
    summary: 'Wash, steam press, fold, duvets & express care',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-800',
    Icon: Shirt,
  },
  {
    id: 'cyber',
    title: 'Cyber Services',
    summary: 'Printing, scanning, typing & online portals',
    iconBg: 'bg-sky-100',
    iconText: 'text-blue-800',
    Icon: Printer,
  },
  {
    id: 'barber',
    title: 'Barber Services',
    summary: 'Precision fades, classic cuts & beard trims',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-800',
    Icon: Scissors,
  },
  {
    id: 'hotel',
    title: 'Junction Highway Hotel',
    summary: 'Fresh Kenyan meals, hot chai & guest rooms',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-800',
    Icon: UtensilsCrossed,
  },
];

export function FullWidthParallaxHero({
  onNavigate,
}: FullWidthParallaxHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Full-width background vertical parallax + subtle zoom on scroll
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '26%']
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.03, 1.16]
  );
  const foregroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 32]
  );
  const foregroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    prefersReducedMotion ? [1, 1] : [1, 0.25]
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const currentSlide = HERO_SLIDES[currentIndex];

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[620px] lg:min-h-[680px] flex flex-col justify-between overflow-hidden bg-slate-950 border-b border-slate-800"
    >
      {/* Full-Width Animated Parallax Background Layer */}
      <motion.div
        style={{y: bgY, scale: bgScale}}
        className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
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
                      scale: {duration: 6.2, ease: 'easeOut'},
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

      {/* Multi-Directional Contrast Scrims for WCAG AA Legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/72 to-slate-950/35 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/20 to-slate-950/45 pointer-events-none"
      />

      {/* Foreground Content */}
      <motion.div
        style={{y: foregroundY, opacity: foregroundOpacity}}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-20 will-change-transform"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={prefersReducedMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
            className="text-xs sm:text-sm font-medium text-amber-300 mb-3 tracking-wide"
          >
            Junction-Kodoyo · Along Homa Bay–Rongo Road · Homa Bay County
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.05, ease: [0.16, 1, 0.3, 1]}}
            className="text-[clamp(2.25rem,4.4vw,3.75rem)] font-bold tracking-tight text-white leading-[1.08] text-balance"
          >
            Laundry, cyber café, barber &amp; highway hotel in one stop.
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl"
          >
            The Junction Hub brings together spotless garment care, digital
            printing &amp; cyber workstations, sharp barber grooming, and fresh
            roadside dining and rooms at Junction Highway Hotel.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span className="font-mono tabular-nums">
                {BUSINESS_INFO.phoneDisplay}
              </span>
            </a>

            <a
              href="#video-tour"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-amber-200 hover:text-amber-100 transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-4 h-4" />
              <span>Watch Hub Video</span>
            </a>
          </motion.div>
        </div>

        {/* Interactive Background Scene Indicator & Controls */}
        <div className="mt-10 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
            <span className="font-semibold text-amber-300">
              {currentSlide.label}
            </span>
            <span aria-hidden="true" className="text-white/40">
              ·
            </span>
            <span className="text-slate-200">{currentSlide.caption}</span>
            {currentSlide.targetPage !== 'home' && (
              <button
                type="button"
                onClick={() => onNavigate(currentSlide.targetPage)}
                className="inline-flex items-center gap-1 font-semibold text-sky-300 hover:text-sky-200 underline underline-offset-4 cursor-pointer ml-1"
              >
                <span>Open Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              role="tablist"
              aria-label="Select background scene"
              className="flex items-center gap-1.5"
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
                    className={`h-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                      active
                        ? 'w-7 bg-amber-400'
                        : 'w-3 bg-white/40 hover:bg-white/75'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous background scene"
                className="w-9 h-9 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white border border-white/20 inline-flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next background scene"
                className="w-9 h-9 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white border border-white/20 inline-flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Interactive 4-Service Quick Navigation Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DEPARTMENT_QUICK_CARDS.map((dept, idx) => {
            const Icon = dept.Icon;
            return (
              <motion.button
                key={dept.id}
                type="button"
                initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
                animate={{opacity: 1, y: 0}}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.05,
                }}
                whileHover={prefersReducedMotion ? undefined : {y: -3}}
                whileTap={prefersReducedMotion ? undefined : {scale: 0.99}}
                onClick={() => onNavigate(dept.id)}
                className="group text-left flex items-start gap-3 p-3.5 rounded-xl bg-white/95 hover:bg-white backdrop-blur-md border border-white/40 shadow-sm transition-colors cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${dept.iconBg} ${dept.iconText} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-1">
                    <span className="truncate">{dept.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                    {dept.summary}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
