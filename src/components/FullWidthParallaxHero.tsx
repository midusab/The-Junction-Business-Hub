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
  Car,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Pause,
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
    summary: 'Wash, steam press, duvets & express care',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-700',
    Icon: Shirt,
  },
  {
    id: 'cyber',
    title: 'Cyber Services',
    summary: 'Printing, scanning, typing & portals',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-800',
    Icon: Printer,
  },
  {
    id: 'barber',
    title: 'Barber Services',
    summary: 'Precision fades, classic cuts & trims',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-800',
    Icon: Scissors,
  },
  {
    id: 'hotel',
    title: 'Highway Hotel',
    summary: 'Fresh Kenyan meals, chai & rooms',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-800',
    Icon: UtensilsCrossed,
  },
  {
    id: 'carwash',
    title: 'Car Wash Services',
    summary: 'Snow foam wash, vacuum & bike care',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-700',
    Icon: Car,
  },
];

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
    [0, 0.88],
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
      className="relative w-full min-h-[640px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden bg-slate-950 border-b border-sky-200"
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

      {/* Balanced Contrast Scrim (keeps right & upper visuals crisp and visible) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/42 to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent pointer-events-none"
      />

      {/* Foreground Story Intro inside Liquid Glass Frame */}
      <motion.div
        style={{y: foregroundY, opacity: foregroundOpacity}}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-20 will-change-transform"
      >
        <div className="max-w-2xl liquid-glass-dark p-6 sm:p-8 lg:p-10 rounded-lg">
          <motion.p
            initial={prefersReducedMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
            className="text-xs sm:text-sm font-medium text-sky-300 mb-3 tracking-wide"
          >
            Junction-Kodoyo · Along Homa Bay–Rongo Road
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.05, ease: [0.16, 1, 0.3, 1]}}
            className="text-[clamp(2.1rem,4.1vw,3.4rem)] font-bold tracking-tight text-white leading-[1.08] text-balance"
          >
            Laundry, cyber café, barber, car wash &amp; highway hotel in one stop.
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="mt-4 text-base sm:text-lg text-slate-100 leading-relaxed"
          >
            Scroll through The Junction Hub—where residents, students,
            professionals, and highway travellers drop off garments, print
            documents, get a fresh cut, wash their vehicles, and dine well under
            one roof.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#video-tour"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Play className="w-4 h-4" />
              <span>Watch Hub Video</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/35 backdrop-blur-md rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-sky-300" />
              <span>WhatsApp Hub</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-sky-200 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono tabular-nums">
                {BUSINESS_INFO.phoneDisplay}
              </span>
            </a>
          </motion.div>
        </div>

        {/* Scene Label & Encapsulated Auto Carousel Control Bar */}
        <div className="mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm liquid-glass-dark px-4 py-2 rounded-md">
            <span className="font-semibold text-sky-300">
              {currentSlide.label}
            </span>
            <span aria-hidden="true" className="text-white/40">
              ·
            </span>
            <span className="text-white">{currentSlide.caption}</span>
            {currentSlide.targetPage !== 'home' && (
              <button
                type="button"
                onClick={() => onNavigate(currentSlide.targetPage)}
                className="inline-flex items-center gap-1 font-semibold text-sky-300 hover:text-white underline underline-offset-4 cursor-pointer ml-1"
              >
                <span>Open Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Encapsulated Auto Carousel Button Group */}
          <div className="inline-flex items-center gap-1.5 p-1 liquid-glass-dark rounded-md self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous background scene"
              className="w-8 h-8 rounded-sm hover:bg-sky-600/70 text-white inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
              aria-pressed={isAutoPlay}
              aria-label={isAutoPlay ? 'Pause automatic carousel' : 'Resume automatic carousel'}
              className={`h-8 px-2.5 rounded-sm text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isAutoPlay
                  ? 'bg-sky-600/90 text-white hover:bg-sky-500'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {isAutoPlay ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span>{isAutoPlay ? 'Auto' : 'Paused'}</span>
            </button>

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
                    className={`h-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                      active
                        ? 'w-5 bg-sky-400'
                        : 'w-2.5 bg-white/40 hover:bg-white/75'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next background scene"
              className="w-8 h-8 rounded-sm hover:bg-sky-600/70 text-white inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Interactive 5-Service Liquid Glass Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
                  delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.04,
                }}
                whileHover={prefersReducedMotion ? undefined : {y: -4}}
                whileTap={prefersReducedMotion ? undefined : {scale: 0.99}}
                onClick={() => onNavigate(dept.id)}
                className="group text-left flex items-start gap-3 p-3.5 rounded-lg liquid-glass hover:bg-white/90 transition-all cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-md ${dept.iconBg} ${dept.iconText} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center gap-1">
                    <span className="truncate">{dept.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-700 leading-snug">
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
