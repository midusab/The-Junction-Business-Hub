import {useEffect, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import {ArrowUp, Phone} from 'lucide-react';
import {BUSINESS_INFO} from '../data/hubData';

function WhatsAppIcon({className = 'w-5 h-5'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.77 14.07c-.24.68-1.39 1.3-1.93 1.38-.51.08-1.16.11-1.87-.12-.43-.14-.99-.32-1.7-.63-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09s.77-2.19 1.04-2.49c.27-.3.59-.38.79-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.84 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.38-.45.51-.15.15-.31.31-.13.61.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.2.76-.88.96-1.19.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.96.3.15.5.22.57.34.07.13.07.72-.17 1.4z" />
    </svg>
  );
}

export function FloatingActions() {
  const prefersReducedMotion = useReducedMotion();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const {scrollYProgress} = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 260);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div
      aria-label="Quick Contact and Navigation Actions"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5"
    >
      {/* Dynamic Back-to-Top with Live Scroll Progress Ring */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            initial={
              prefersReducedMotion
                ? {opacity: 1}
                : {opacity: 0, y: 16, scale: 0.85}
            }
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={
              prefersReducedMotion
                ? {opacity: 0}
                : {opacity: 0, y: 12, scale: 0.85}
            }
            whileHover={prefersReducedMotion ? undefined : {y: -3, scale: 1.05}}
            whileTap={prefersReducedMotion ? undefined : {scale: 0.94}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="relative w-11 h-11 rounded-md bg-white border border-sky-200 text-sky-700 hover:text-sky-900 hover:bg-sky-50 inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 44 44"
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            >
              <rect
                x="2"
                y="2"
                width="40"
                height="40"
                rx="6"
                fill="none"
                stroke="rgba(2, 132, 199, 0.16)"
                strokeWidth="2"
              />
              <motion.rect
                x="2"
                y="2"
                width="40"
                height="40"
                rx="6"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.25"
                style={{pathLength: smoothProgress}}
              />
            </svg>
            <ArrowUp className="w-4 h-4 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call Action Icon */}
      <motion.a
        href={BUSINESS_INFO.phoneHref}
        aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
        title={`Call ${BUSINESS_INFO.phoneDisplay}`}
        whileHover={prefersReducedMotion ? undefined : {y: -2, scale: 1.05}}
        whileTap={prefersReducedMotion ? undefined : {scale: 0.95}}
        className="w-11 h-11 rounded-md bg-sky-600 hover:bg-sky-700 text-white inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        <Phone className="w-4 h-4" />
      </motion.a>

      {/* WhatsApp Action Icon */}
      <motion.a
        href={BUSINESS_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        title="Chat on WhatsApp"
        whileHover={prefersReducedMotion ? undefined : {y: -2, scale: 1.05}}
        whileTap={prefersReducedMotion ? undefined : {scale: 0.95}}
        className="w-11 h-11 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        <WhatsAppIcon className="w-5 h-5" />
      </motion.a>
    </div>
  );
}
