import {motion, useReducedMotion} from 'motion/react';
import {MapPin, MessageCircle, Play} from 'lucide-react';
import {BUSINESS_INFO} from '../data/hubData';

export function VideoTourSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="video-tour"
      className="py-16 sm:py-20 bg-amber-50/55 border-b border-amber-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Video Context */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-wide text-amber-800 mb-2">
              Video Walkthrough · Junction-Kodoyo, Homa Bay
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Welcome to The Junction Business Hub
            </h2>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">
              Take a real-world look at the hub in Junction-Kodoyo along the
              Homa Bay–Rongo Road. See the space, accessibility, and community
              energy that brings laundry care and digital services together in
              one convenient stop.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold text-slate-900">
                    Homa Bay Town &amp; Junction-Kodoyo:
                  </strong>{' '}
                  Direct roadside location serving locals and travellers.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Play className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold text-slate-900">
                    Walk-In Ready:
                  </strong>{' '}
                  Drop by for washing, pressing, printing, or assisted online
                  applications.
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat With Us</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-amber-300 hover:bg-amber-50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                Directions &amp; Hours
              </a>
            </div>
          </motion.div>

          {/* Responsive YouTube Video Frame */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.98}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <div className="rounded-xl overflow-hidden border border-amber-200 bg-slate-950 shadow-sm aspect-video w-full">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
