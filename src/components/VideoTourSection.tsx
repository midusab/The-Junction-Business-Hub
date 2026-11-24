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
      className="py-12 sm:py-20 bg-black text-white border-b border-neutral-800"
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
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-400 mb-2">
              Inside The Hub
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white text-balance leading-[1.1]">
              See the space before you visit
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? undefined : {y: -2, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-md shadow-sm hover:shadow-md transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </motion.a>
            <motion.a
              href="#services"
              whileHover={prefersReducedMotion ? undefined : {y: -2, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-md shadow-xs hover:shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>

        {/* Prominent Centerpiece Video Theater */}
        <motion.div
          style={{scale: theaterScale}}
          className="bg-neutral-950 border border-neutral-800 shadow-2xl p-2.5 sm:p-4 rounded-lg will-change-transform"
        >
          <div className="aspect-video w-full bg-black overflow-hidden border border-neutral-800 rounded-md">
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
          <div className="mt-3 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-300">
              <span className="inline-flex items-center gap-1.5 font-medium text-white">
                <Play className="w-3.5 h-3.5 text-sky-400" />
                <span>Premises Tour</span>
              </span>
              <span aria-hidden="true" className="text-neutral-700">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Homa Bay–Rongo Road</span>
              </span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-semibold text-sky-400 hover:text-sky-300 hover:underline underline-offset-4 whitespace-nowrap"
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
