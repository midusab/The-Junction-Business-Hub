import {useCallback, useEffect, useRef, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {ContactSection} from './components/ContactSection';
import {CustomCursor} from './components/CustomCursor';
import {FloatingActions} from './components/FloatingActions';
import {FullWidthParallaxHero} from './components/FullWidthParallaxHero';
import {GallerySection} from './components/GallerySection';
import {Header} from './components/Header';
import {ResilientImage} from './components/ResilientImage';
import {ServiceDetailPage} from './components/ServiceDetailPage';
import {TeamPage} from './components/TeamPage';
import {TeamSection} from './components/TeamSection';
import {TestimonialsSection} from './components/TestimonialsSection';
import {VideoTourSection} from './components/VideoTourSection';
import {
  BUSINESS_INFO,
  EXTERIOR_IMAGE,
  SERVICE_PAGES,
  TARGET_GROUPS,
} from './data/hubData';

function getInitialPageFromHash() {
  const hash = window.location.hash.replace('#', '').replace(/^\//, '');
  if (
    hash === 'laundry' ||
    hash === 'cyber' ||
    hash === 'barber' ||
    hash === 'hotel' ||
    hash === 'carwash' ||
    hash === 'team'
  ) {
    return hash;
  }
  return 'home';
}

const CHAPTER_NARRATIVES = {
  laundry: {
    kicker: 'Fresh Garments',
    storyLead: 'Drop off in the morning, collect clean & pressed.',
  },
  cyber: {
    kicker: 'Print & Digital',
    storyLead: 'Fast printing, scanning & online portal help.',
  },
  barber: {
    kicker: 'Sharp Grooming',
    storyLead: 'Clean fades, beard trims & hot towel shaves.',
  },
  hotel: {
    kicker: 'Hot Meals & Stays',
    storyLead: 'Fresh Kenyan chai, meals & quiet roadside rooms.',
  },
  carwash: {
    kicker: 'Spotless Ride',
    storyLead: 'Snow foam wash & vacuum while you relax.',
  },
};

function StoryChapter({
  servicePage,
  index,
  onNavigate,
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-18, 18]
  );

  const [activeVisualIdx, setActiveVisualIdx] = useState(0);
  const visuals = servicePage.galleryImages;
  const activeVisual = visuals[activeVisualIdx] || servicePage.heroImage;
  const narrative = CHAPTER_NARRATIVES[servicePage.id];
  const isReversed = index % 2 === 1;

  return (
    <article
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-10 lg:py-14 border-b border-sky-200/70 last:border-b-0"
    >
      {/* Visual-First Stage (8 cols) with Parallax + Hover Zoom */}
      <motion.div
        initial={prefersReducedMotion ? false : {opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
        className={`lg:col-span-8 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="group relative border border-slate-200 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <button
            type="button"
            onClick={() => onNavigate(servicePage.id)}
            className="relative block w-full aspect-[16/10] overflow-hidden text-left cursor-pointer"
            aria-label={`Open ${servicePage.title} page`}
          >
            <motion.div
              style={{y: imageY}}
              className="w-full h-[112%] -mt-[6%] will-change-transform relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeVisual.id}
                  initial={
                    prefersReducedMotion ? {opacity: 1} : {opacity: 0, scale: 1.04}
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {duration: 0.4, ease: [0.16, 1, 0.3, 1]},
                  }}
                  exit={
                    prefersReducedMotion
                      ? {opacity: 0}
                      : {opacity: 0, transition: {duration: 0.2}}
                  }
                  className="w-full h-full"
                >
                  <ResilientImage
                    src={activeVisual.src}
                    alt={activeVisual.alt}
                    fallbackTitle={servicePage.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </button>

          {/* Interactive visual switcher thumbnails */}
          {visuals.length > 1 && (
            <div className="grid grid-cols-4 border-t border-sky-200/70 bg-white">
              {visuals.slice(0, 4).map((vis, vIdx) => {
                const isSelected = vIdx === activeVisualIdx;
                return (
                  <motion.button
                    key={vis.id}
                    type="button"
                    onClick={() => setActiveVisualIdx(vIdx)}
                    whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
                    className={`relative aspect-[16/9] overflow-hidden border-r last:border-r-0 border-sky-200/70 cursor-pointer transition-opacity ${
                      isSelected
                        ? 'opacity-100'
                        : 'opacity-65 hover:opacity-100'
                    }`}
                    aria-label={`Preview ${vis.label}`}
                    aria-pressed={isSelected}
                  >
                    <ResilientImage
                      src={vis.src}
                      alt={vis.alt}
                      fallbackTitle={vis.label}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {isSelected && (
                      <motion.span
                        layoutId={`chapter-thumb-${servicePage.id}`}
                        aria-hidden="true"
                        className="absolute inset-0 ring-2 ring-inset ring-sky-500 pointer-events-none"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Clean Service Summary Card (4 cols) */}
      <motion.div
        initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
        className={`lg:col-span-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <motion.div
          whileHover={prefersReducedMotion ? undefined : {y: -3}}
          transition={{duration: 0.22}}
          className="bg-white border border-slate-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:border-sky-300"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-1.5">
            {narrative.kicker}
          </p>
          <h3 className="text-2xl font-bold tracking-[-0.025em] text-slate-900">
            {servicePage.title}
          </h3>
          <p className="mt-2 text-sm font-normal text-slate-600 leading-relaxed">
            {narrative.storyLead}
          </p>

          <div className="mt-4 pt-4 border-t border-sky-200/80 grid grid-cols-1 gap-1.5 text-xs sm:text-sm text-slate-800">
            {servicePage.services.slice(0, 3).map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onNavigate(servicePage.id)}
                whileHover={prefersReducedMotion ? undefined : {x: 4}}
                whileTap={prefersReducedMotion ? undefined : {scale: 0.99}}
                className="w-full text-left bg-white hover:bg-sky-50 border border-sky-200/70 hover:border-sky-300 px-3 py-1.5 rounded-md font-medium truncate transition-colors cursor-pointer"
              >
                {item.title}
              </motion.button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <motion.button
              type="button"
              onClick={() => onNavigate(servicePage.id)}
              whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="group/btn inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore {servicePage.navLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </motion.button>

            <motion.a
              href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(servicePage.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? undefined : {y: -1.5}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="px-3.5 py-2.5 text-sm font-medium text-sky-900 bg-white hover:bg-sky-50 border border-sky-200 rounded-md shadow-xs hover:shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </article>
  );
}

function HomePageContent({onNavigate}) {
  const prefersReducedMotion = useReducedMotion();

  const aboutVisualRef = useRef(null);
  const {scrollYProgress: aboutScroll} = useScroll({
    target: aboutVisualRef,
    offset: ['start end', 'end start'],
  });
  const aboutParallaxY = useTransform(
    aboutScroll,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-18, 18]
  );

  const serviceList = [
    SERVICE_PAGES.laundry,
    SERVICE_PAGES.cyber,
    SERVICE_PAGES.barber,
    SERVICE_PAGES.carwash,
    SERVICE_PAGES.hotel,
  ];

  return (
    <div>
      {/* Full-Width Parallax Animation Hero */}
      <FullWidthParallaxHero onNavigate={onNavigate} />

      {/* Prominent Full-Width Hub Video Walkthrough */}
      <VideoTourSection />

      {/* Visual-First Service Showcase */}
      <section
        id="services"
        className="py-12 sm:py-20 bg-white border-b border-sky-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl mb-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-2">
              Our Services · Junction-Kodoyo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-slate-900 text-balance">
              Five departments under one roof
            </h2>
          </motion.div>

          <div>
            {serviceList.map((servicePage, idx) => (
              <StoryChapter
                key={servicePage.id}
                servicePage={servicePage}
                index={idx}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Specialists */}
      <TeamSection onNavigate={onNavigate} />

      {/* About The Hub & Community */}
      <section
        id="about"
        className="py-12 sm:py-20 bg-white border-b border-sky-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-5"
            >
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-2">
                  Why Visit Us
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-slate-900 text-balance leading-[1.12]">
                  Save the extra trip into town
                </h2>
                <p className="mt-4 text-sm sm:text-base font-normal text-slate-600 leading-relaxed">
                  Laundry, cyber access, grooming, car wash, and hot meals—all
                  steps apart in Junction-Kodoyo.
                </p>
                <div className="mt-5">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline underline-offset-4"
                  >
                    <span>Get Directions &amp; Hours</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            <div ref={aboutVisualRef} className="lg:col-span-7">
              <div className="group relative h-80 sm:h-96 lg:h-[440px] rounded-lg overflow-hidden border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <motion.div
                  style={{y: aboutParallaxY}}
                  className="w-full h-[112%] -mt-[6%] will-change-transform"
                >
                  <ResilientImage
                    src={EXTERIOR_IMAGE.src}
                    alt={EXTERIOR_IMAGE.alt}
                    fallbackTitle={BUSINESS_INFO.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="mt-12 pt-10 border-t border-sky-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TARGET_GROUPS.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                whileHover={prefersReducedMotion ? undefined : {y: -5, scale: 1.01}}
                transition={{
                  duration: 0.3,
                  delay: prefersReducedMotion ? 0 : idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-lg transition-colors duration-200 hover:border-sky-300"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {group.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Animated Community Testimonials */}
          <TestimonialsSection onNavigate={onNavigate} />
        </div>
      </section>

      <GallerySection />
    </div>
  );
}

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);
  const [activePage, setActivePage] = useState(getInitialPageFromHash);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const next = getInitialPageFromHash();
      setActivePage(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = useCallback((page) => {
    setActivePage(page);
    const targetHash = page === 'home' ? '#/' : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({top: 0, behavior: 'instant'});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 overflow-x-clip">
      <CustomCursor />
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header activePage={activePage} onNavigate={navigateToPage} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="page-home"
              initial={prefersReducedMotion ? false : {opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.22}}
            >
              <HomePageContent onNavigate={navigateToPage} />
            </motion.div>
          ) : activePage === 'team' ? (
            <motion.div
              key="page-team"
              initial={prefersReducedMotion ? false : {opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
            >
              <TeamPage onNavigate={navigateToPage} />
            </motion.div>
          ) : (
            <motion.div
              key={`page-${activePage}`}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
            >
              <ServiceDetailPage
                config={SERVICE_PAGES[activePage]}
                onNavigate={navigateToPage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ContactSection />
      </main>

      {/* Persistent Call, WhatsApp & Dynamic Back-to-Top Actions */}
      <FloatingActions />

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-sky-200/80 pt-12 pb-24 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-sky-200/80">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-bold text-slate-900">
                {BUSINESS_INFO.name}
              </p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm">
                {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}
              </p>
              <p className="mt-3 text-sm text-slate-700 font-mono tabular-nums">
                Tel / WhatsApp:{' '}
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="text-sky-700 hover:underline font-semibold"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-sm">
              <p className="font-semibold text-slate-900 mb-3">Service Pages</p>
              <button
                type="button"
                onClick={() => navigateToPage('laundry')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Laundry Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('cyber')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Cyber Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('barber')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Barber Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('carwash')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Car Wash Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('hotel')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Junction Highway Hotel
              </button>
            </div>

            <div className="md:col-span-4 space-y-2 text-sm">
              <p className="font-semibold text-slate-900 mb-3">Hub Links</p>
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Hub Overview
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('team')}
                className="block text-slate-600 hover:text-sky-700 cursor-pointer transition-colors"
              >
                Our Team
              </button>
              <a
                href="#video-tour"
                className="block text-slate-600 hover:text-sky-700 transition-colors"
              >
                Video Walkthrough
              </a>
              <a
                href="#contact"
                className="block text-slate-600 hover:text-sky-700 transition-colors"
              >
                Contact &amp; Directions
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
              reserved.
            </p>
            <p>
              Service details, operating hours, and illustrative previews are
              subject to management confirmation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
