import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
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

export function TestimonialsSection({onNavigate}: TestimonialsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isAutoPlay, prefersReducedMotion]);

  const activeItem = SAMPLE_TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + SAMPLE_TESTIMONIALS.length) % SAMPLE_TESTIMONIALS.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
  };

  return (
    <div className="mt-16 pt-12 border-t border-sky-200/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            Community Use Cases &amp; Sample Stories
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Illustrative local scenarios showing how residents, students, and
            travellers combine all five hub services.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-800 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Illustrative sample profiles</span>
          </span>

          {/* Encapsulated Auto Testimonial Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-sky-200 rounded-md shadow-xs">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-7 h-7 rounded-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
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
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-7 h-7 rounded-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Featured Testimonial Spotlight */}
      <div className="mb-8 liquid-glass rounded-lg p-6 sm:p-8 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={
              prefersReducedMotion ? {opacity: 1} : {opacity: 0, x: 24}
            }
            animate={{opacity: 1, x: 0}}
            exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, x: -24}}
            transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
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

            <button
              type="button"
              onClick={() => onNavigate(activeItem.targetPage)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-center"
            >
              <span>Visit Service Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Subtle progress indicator bar for auto-advance */}
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

      {/* Scroll-Triggered Interactive Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {SAMPLE_TESTIMONIALS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <motion.blockquote
              key={item.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.15}}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={prefersReducedMotion ? undefined : {y: -5}}
              onClick={() => setActiveIndex(idx)}
              className={`group rounded-lg border p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer bg-white ${
                isActive
                  ? 'border-sky-600 ring-2 ring-sky-600/20 shadow-sm'
                  : 'border-sky-200/80 hover:border-sky-400'
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
                  <p className="text-xs text-slate-500 truncate">{item.role}</p>
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
        })}
      </div>
    </div>
  );
}
