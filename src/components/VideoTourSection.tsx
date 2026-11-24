import {useRef} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {ArrowRight, MapPin, MessageCircle, Play} from 'lucide-react';
import {BUSINESS_INFO} from '../data/hubData';

export function VideoTourSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const theaterScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.96, 1, 0.98]
  );

  return (
    <section
      id="video-tour"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-white border-b border-sky-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Tour Header */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.25}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-sky-700 mb-1.5">
              Video Walkthrough · Junction-Kodoyo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance leading-[1.1]">
              Step inside The Junction Hub
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md shadow-xs hover:shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Prominent Centerpiece Video Theater */}
        <motion.div
          style={{scale: theaterScale}}
          className="bg-white border border-slate-200 shadow-xl p-2.5 sm:p-4 rounded-lg will-change-transform"
        >
          <div className="aspect-video w-full bg-slate-950 overflow-hidden border border-sky-200 rounded-md">
            <iframe
              className="w-full h-full"
              src={BUSINESS_INFO.youtubeEmbedUrl}
              title={BUSINESS_INFO.youtubeTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Concise Caption Strip beneath Video */}
          <div className="mt-3 pt-3 border-t border-sky-200/70 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-700">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-900">
                <Play className="w-3.5 h-3.5 text-sky-700" />
                <span>Premises Tour</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-700" />
                <span>Homa Bay–Rongo Road</span>
              </span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-semibold text-sky-700 hover:text-sky-800 hover:underline underline-offset-4"
            >
              <span>Directions &amp; Map</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
