import {useEffect, useRef, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Sparkles,
} from 'lucide-react';
import {SAMPLE_TESTIMONIALS, type PageId} from '../data/hubData';

interface TestimonialsSectionProps {
  onNavigate: (page: PageId) => void;
}

const MARQUEE_ITEMS = [...SAMPLE_TESTIMONIALS, ...SAMPLE_TESTIMONIALS];

const spotlightVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 110 : -110,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -110 : 110,
    opacity: 0,
  }),
};

export function TestimonialsSection({onNavigate}: TestimonialsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTrackHovered, setIsTrackHovered] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const marqueeX = useMotionValue(0);

  // Auto-advance spotlight horizontally
  useEffect(() => {
    if (!isAutoPlay || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isAutoPlay, prefersReducedMotion]);

  // Smooth continuous horizontal marquee loop that pauses cleanly in place on hover or pause toggle
  useAnimationFrame((_, delta) => {
    if (
      prefersReducedMotion ||
      !isAutoPlay ||
      isTrackHovered ||
      !trackRef.current
    ) {
      return;
    }

    const halfWidth = trackRef.current.scrollWidth / 2;
    if (halfWidth <= 0) return;

    // 48px/sec horizontal glide
    let nextX = marqueeX.get() - (delta / 1000) * 48;
    if (nextX <= -halfWidth) {
      nextX += halfWidth;
    }
    marqueeX.set(nextX);
  });

  const activeItem = SAMPLE_TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) =>
        (prev - 1 + SAMPLE_TESTIMONIALS.length) % SAMPLE_TESTIMONIALS.length
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
  };

  const handleSelectCard = (idx: number) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  return (
    <div className="mt-16 pt-12 border-t border-sky-200/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            Community Stories
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-800 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Illustrative sample profiles</span>
          </span>

          {/* Encapsulated Auto Testimonial Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-sky-200 rounded-md shadow-xs">
            <motion.button
              type="button"
              onClick={handlePrev}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.9}}
              aria-label="Previous testimonial"
              className="w-7 h-7 rounded-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.94}}
              aria-pressed={isAutoPlay}
              className={`h-7 px-2.5 rounded-sm text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                isAutoPlay
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isAutoPlay ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
              <span>{isAutoPlay ? 'Auto' : 'Paused'}</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={handleNext}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.9}}
              aria-label="Next testimonial"
              className="w-7 h-7 rounded-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Directional Horizontal Animated Featured Testimonial Spotlight (Swipeable) */}
      <div className="mb-8 bg-sky-50/60 border border-sky-200 rounded-lg p-6 sm:p-8 shadow-md overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeItem.id}
            custom={direction}
            variants={prefersReducedMotion ? undefined : spotlightVariants}
            initial={prefersReducedMotion ? {opacity: 1} : 'enter'}
            animate="center"
            exit={prefersReducedMotion ? {opacity: 0} : 'exit'}
            transition={{duration: 0.38, ease: [0.16, 1, 0.3, 1]}}
            drag={prefersReducedMotion ? false : 'x'}
            dragConstraints={{left: 0, right: 0}}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) {
                handleNext();
              } else if (info.offset.x > 50) {
                handlePrev();
              }
            }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-grab active:cursor-grabbing"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-3">
                <Quote className="w-4 h-4 shrink-0" />
                <span>{activeItem.serviceUsed}</span>
              </div>
              <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed">
                &ldquo;{activeItem.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-slate-900">
                  {activeItem.name}
                </span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span className="text-slate-600">{activeItem.role}</span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => onNavigate(activeItem.targetPage)}
              whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-center"
            >
              <span>Visit Service Page</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Horizontal progress indicator bar for auto-advance */}
        {isAutoPlay && !prefersReducedMotion && (
          <motion.div
            key={`bar-${activeItem.id}`}
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{duration: 5.2, ease: 'linear'}}
            style={{transformOrigin: 'left'}}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500/80"
          />
        )}
      </div>

      {/* Continuous Horizontal Marquee Track (Pauses smoothly on hover/focus) */}
      <div
        className="relative overflow-hidden py-2 -mx-2 px-2"
        onMouseEnter={() => setIsTrackHovered(true)}
        onMouseLeave={() => setIsTrackHovered(false)}
        onFocusCapture={() => setIsTrackHovered(true)}
        onBlurCapture={() => setIsTrackHovered(false)}
      >
        {/* Subtle horizontal edge fade masks */}
        <div
          aria-hidden="true"
          className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10"
        />

        <motion.div
          ref={trackRef}
          style={prefersReducedMotion ? undefined : {x: marqueeX}}
          className={
            prefersReducedMotion
              ? 'flex gap-5 overflow-x-auto pb-2'
              : 'flex gap-5 w-max will-change-transform'
          }
        >
          {(prefersReducedMotion ? SAMPLE_TESTIMONIALS : MARQUEE_ITEMS).map(
            (item, trackIdx) => {
              const originalIdx = trackIdx % SAMPLE_TESTIMONIALS.length;
              const isActive = originalIdx === activeIndex;
              return (
                <motion.blockquote
                  key={`${item.id}-${trackIdx}`}
                  whileHover={prefersReducedMotion ? undefined : {y: -5}}
                  whileTap={prefersReducedMotion ? undefined : {scale: 0.97}}
                  onClick={() => handleSelectCard(originalIdx)}
                  className={`group w-[290px] sm:w-[340px] shrink-0 rounded-lg border p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer bg-white ${
                    isActive
                      ? 'border-sky-600 ring-2 ring-sky-600/20 shadow-lg'
                      : 'border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div>
                    <div className="text-xs text-sky-700 font-semibold mb-2.5">
                      {item.serviceUsed}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <footer className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {item.role}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`w-7 h-7 rounded-md inline-flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-sky-600 text-white'
                          : 'bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </footer>
                </motion.blockquote>
              );
            }
          )}
        </motion.div>
      </div>
    </div>
  );
}
