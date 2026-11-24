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
      className="py-20 sm:py-24 bg-gradient-to-b from-[#F8F9FA] via-white to-[#F8F9FA] border-b border-sky-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Tour Header */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.25}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-sky-700 mb-2">
              Video Walkthrough · Junction-Kodoyo, Homa Bay Town
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance leading-[1.1]">
              Step inside The Junction Business Hub
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Watch our featured video tour along the Homa Bay–Rongo Road to see
              how our services come together for the community.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-sky-900 liquid-glass hover:bg-white rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Prominent Centerpiece Video Theater */}
        <motion.div
          style={{scale: theaterScale}}
          className="liquid-glass p-3 sm:p-4 lg:p-5 rounded-lg will-change-transform"
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

          {/* Liquid Glass Story Strip beneath Video */}
          <div className="mt-4 pt-4 border-t border-sky-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2.5">
              <Play className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Real Premises Walkthrough
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Explore the location and atmosphere before you arrive.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Junction-Kodoyo Highway Frontage
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Easy stopover along the Homa Bay–Rongo Road corridor.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between md:justify-end gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 font-semibold text-sky-700 hover:text-sky-800 hover:underline underline-offset-4"
              >
                <span>Open Map &amp; Directions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
