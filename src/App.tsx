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
  type PageId,
  type ServicePageConfig,
  type ServicePageId,
} from './data/hubData';

function getInitialPageFromHash(): PageId {
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

const CHAPTER_NARRATIVES: Record<
  ServicePageId,
  {kicker: string; storyLead: string}
> = {
  laundry: {
    kicker: 'Morning Drop-Off',
    storyLead:
      'Start the day by handing over work shirts, bright kitenge, or heavy family duvets at the laundry counter—sorted by fabric and care-pressed while you handle your errands.',
  },
  cyber: {
    kicker: 'Midday Productivity',
    storyLead:
      'Step across to the digital workstations to print assignments, scan official paperwork, format business proposals, or get friendly hands-on help with online portals.',
  },
  barber: {
    kicker: 'Afternoon Refresh',
    storyLead:
      'Take a seat in the barber studio for a sharp fade, classic executive trim, or soothing hot towel shave—sanitized tools and relaxed care right beside the highway.',
  },
  hotel: {
    kicker: 'Meal & Rest',
    storyLead:
      'Unwind at Junction Highway Hotel with steaming Kenyan chai, freshly cooked local meals, or a quiet, spotless guest room stocked with crisp hub-laundered linens.',
  },
  carwash: {
    kicker: 'Drive-In Wash & Shine',
    storyLead:
      'Pull straight into our roadside car wash bay for snow foam pressure washing, thorough cabin vacuuming, or quick motorcycle care while you enjoy lunch or run errands inside.',
  },
};

function StoryChapter({
  servicePage,
  index,
  onNavigate,
}: {
  servicePage: ServicePageConfig;
  index: number;
  onNavigate: (page: PageId) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-16 border-b border-sky-200/70 last:border-b-0"
    >
      {/* Crisp Visual Stage with Parallax + Hover Zoom */}
      <motion.div
        initial={prefersReducedMotion ? false : {opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
        className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="group relative border border-sky-200/80 bg-white rounded-lg overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => onNavigate(servicePage.id)}
            className="relative block w-full aspect-[16/10] overflow-hidden text-left cursor-pointer"
            aria-label={`Open ${servicePage.title} page`}
          >
            <motion.div
              style={{y: imageY}}
              className="w-full h-[112%] -mt-[6%] will-change-transform"
            >
              <ResilientImage
                src={activeVisual.src}
                alt={activeVisual.alt}
                fallbackTitle={servicePage.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </motion.div>

            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md liquid-glass-dark px-4 py-2.5 rounded-md flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium text-sky-300 tracking-wide">
                  {activeVisual.label}
                </p>
                <p className="text-xs sm:text-sm text-white font-medium line-clamp-1">
                  {activeVisual.caption}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-300 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </button>

          {/* Interactive visual switcher thumbnails */}
          {visuals.length > 1 && (
            <div className="grid grid-cols-4 border-t border-sky-200/70 bg-white">
              {visuals.slice(0, 4).map((vis, vIdx) => {
                const isSelected = vIdx === activeVisualIdx;
                return (
                  <button
                    key={vis.id}
                    type="button"
                    onClick={() => setActiveVisualIdx(vIdx)}
                    className={`relative aspect-[16/9] overflow-hidden border-r last:border-r-0 border-sky-200/70 cursor-pointer transition-opacity ${
                      isSelected
                        ? 'ring-2 ring-inset ring-sky-600 opacity-100'
                        : 'opacity-70 hover:opacity-100'
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
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Narrative Liquid-Glass Content Panel */}
      <motion.div
        initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
        className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="liquid-glass p-6 sm:p-8 rounded-lg transition-all duration-300 hover:border-sky-400">
          <p className="text-xs font-semibold tracking-wide text-sky-700 mb-2">
            {narrative.kicker}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {servicePage.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            {narrative.storyLead}
          </p>

          <div className="mt-5 pt-5 border-t border-sky-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800">
            {servicePage.services.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white/80 border border-sky-200/70 px-3 py-2 rounded-md font-medium truncate"
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate(servicePage.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Open {servicePage.navLabel} Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(servicePage.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-sm font-medium text-sky-900 bg-white/85 hover:bg-white border border-sky-200 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              WhatsApp Desk
            </a>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

function HomePageContent({onNavigate}: {onNavigate: (page: PageId) => void}) {
  const prefersReducedMotion = useReducedMotion();

  const aboutVisualRef = useRef<HTMLDivElement | null>(null);
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

      {/* Sequential Storytelling Service Showcase */}
      <section
        id="services"
        className="py-20 sm:py-24 bg-[#F8F9FA] border-b border-sky-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-3xl mb-6"
          >
            <p className="text-xs font-semibold tracking-wide text-sky-700 mb-2">
              Our Services · One Stop Along Homa Bay–Rongo Road
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              A day at The Junction Hub across five connected departments
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
              Scroll through each section below to preview real hub visuals, or
              step inside any department page for full service menus,
              turnaround workflows, and direct WhatsApp enquiries.
            </p>
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

      {/* Meet Our Specialists (Employee Section) */}
      <TeamSection onNavigate={onNavigate} />

      {/* About The Hub & Who We Serve */}
      <section
        id="about"
        className="py-20 sm:py-24 bg-[#F8F9FA] border-b border-sky-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-6"
            >
              <div className="liquid-glass p-6 sm:p-8 rounded-lg">
                <p className="text-xs font-semibold tracking-wide text-sky-700 mb-2">
                  About The Hub · Junction-Kodoyo
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                  Built for everyday convenience along the Homa Bay–Rongo Road
                </h2>
                <div className="mt-5 space-y-4 text-base text-slate-700 leading-relaxed">
                  <p>
                    <strong className="font-semibold text-slate-900">
                      {BUSINESS_INFO.name}
                    </strong>{' '}
                    brings together five everyday essentials under one accessible
                    roadside destination: garment and duvet laundry, a digital
                    cyber café, a modern barber studio, a roadside car wash bay,
                    and Junction Highway Hotel.
                  </p>
                  <p>
                    Whether you live in Junction-Kodoyo, study nearby, run a
                    local business, or are travelling between Homa Bay and
                    Rongo, every stop saves time without sacrificing quality.
                  </p>
                </div>
              </div>
            </motion.div>

            <div ref={aboutVisualRef} className="lg:col-span-6">
              <div className="group relative h-80 sm:h-96 lg:h-[420px] rounded-lg overflow-hidden border border-sky-200 bg-white">
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
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto liquid-glass-dark px-4 py-2.5 rounded-md">
                  <p className="text-[11px] font-medium text-sky-300 tracking-wide">
                    Junction-Kodoyo Frontage
                  </p>
                  <p className="text-xs sm:text-sm text-white font-medium">
                    Direct roadside pull-in along the Homa Bay–Rongo corridor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="mt-14 pt-12 border-t border-sky-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_GROUPS.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="liquid-glass rounded-lg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
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
  const [activePage, setActivePage] = useState<PageId>(getInitialPageFromHash);
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

  const navigateToPage = useCallback((page: PageId) => {
    setActivePage(page);
    const targetHash = page === 'home' ? '#/' : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({top: 0, behavior: 'instant'});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900">
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

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-sky-200/80 py-12">
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
