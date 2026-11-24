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
import {VideoTourSection} from './components/VideoTourSection';
import {
  BUSINESS_INFO,
  EXTERIOR_IMAGE,
  SAMPLE_TESTIMONIALS,
  SERVICE_PAGES,
  TARGET_GROUPS,
  type PageId,
} from './data/hubData';

function getInitialPageFromHash(): PageId {
  const hash = window.location.hash.replace('#', '').replace(/^\//, '');
  if (
    hash === 'laundry' ||
    hash === 'cyber' ||
    hash === 'barber' ||
    hash === 'hotel'
  ) {
    return hash;
  }
  return 'home';
}

function HomePageContent({onNavigate}: {onNavigate: (page: PageId) => void}) {
  const prefersReducedMotion = useReducedMotion();

  // Parallax for About section exterior photo
  const aboutVisualRef = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress: aboutScroll} = useScroll({
    target: aboutVisualRef,
    offset: ['start end', 'end start'],
  });
  const aboutParallaxY = useTransform(
    aboutScroll,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-16, 16]
  );

  const serviceList = [
    SERVICE_PAGES.laundry,
    SERVICE_PAGES.cyber,
    SERVICE_PAGES.barber,
    SERVICE_PAGES.hotel,
  ];

  return (
    <div>
      {/* Full-Width Parallax Animation Hero Section */}
      <FullWidthParallaxHero onNavigate={onNavigate} />

      {/* Embedded YouTube Hub Video Tour */}
      <VideoTourSection />

      {/* Four Dedicated Service Pages Directory */}
      <section id="services" className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-medium tracking-wide text-blue-700 mb-2">
              Four Dedicated Service Pages
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Explore each department in full detail
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Select any service below to open its dedicated page with visual
              previews, full service listings, turnaround workflow, and direct
              booking options.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceList.map((servicePage, idx) => (
              <motion.article
                key={servicePage.id}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.15}}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onNavigate(servicePage.id)}
                    className="relative block w-full aspect-[16/9] overflow-hidden bg-slate-900 text-left cursor-pointer"
                    aria-label={`Open ${servicePage.title} page`}
                  >
                    <ResilientImage
                      src={servicePage.heroImage.src}
                      alt={servicePage.heroImage.alt}
                      fallbackTitle={servicePage.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"
                    />
                    <span className="absolute bottom-3 left-4 text-xs font-medium text-amber-300">
                      {servicePage.departmentNumber} ·{' '}
                      {servicePage.services.length} Services
                    </span>
                  </button>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {servicePage.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {servicePage.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs text-slate-700">
                      {servicePage.services.slice(0, 4).map((item) => (
                        <span key={item.id} className="truncate">
                          {item.number}. {item.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate(servicePage.id)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${servicePage.theme.accentButton}`}
                  >
                    <span>Explore {servicePage.navLabel} Page</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <a
                    href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(servicePage.whatsappPrefill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline whitespace-nowrap"
                  >
                    WhatsApp Desk
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* About Us with Parallax Visual */}
      <section id="about" className="py-20 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-6"
            >
              <p className="text-xs font-medium tracking-wide text-emerald-700 mb-2">
                About The Hub
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                Built for everyday convenience in Junction-Kodoyo
              </h2>
              <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  <strong className="font-semibold text-slate-900">
                    {BUSINESS_INFO.name}
                  </strong>{' '}
                  serves residents, students, professionals, and travellers
                  along the Homa Bay–Rongo Road with four complementary services
                  in one location: laundry care, a cyber café, a modern barber
                  shop, and Junction Highway Hotel.
                </p>
                <p>
                  Drop off a duvet, print a document, get a clean fade, and
                  enjoy freshly cooked Kenyan food or rest in a clean room—all
                  in a single stop.
                </p>
              </div>
            </motion.div>

            <div ref={aboutVisualRef} className="lg:col-span-6">
              <div className="h-72 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <motion.div
                  style={{y: aboutParallaxY}}
                  className="w-full h-[112%] -mt-[6%] will-change-transform"
                >
                  <ResilientImage
                    src={EXTERIOR_IMAGE.src}
                    alt={EXTERIOR_IMAGE.alt}
                    fallbackTitle={BUSINESS_INFO.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="mt-14 pt-12 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className={`border rounded-xl p-6 ${group.surface}`}
              >
                <span
                  className={`font-mono text-xs font-medium tabular-nums ${group.accent}`}
                >
                  0{idx + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {group.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Adjacent Sample Community Profiles */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Community Use Cases &amp; Sample Feedback
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Illustrative local scenarios demonstrating how residents,
                  students, and travellers use all four hub departments.
                </p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                Illustrative sample profiles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAMPLE_TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.id}
                  className={`border rounded-xl p-6 flex flex-col justify-between ${item.surfaceTint}`}
                >
                  <div>
                    <div className="text-xs text-slate-700 font-semibold mb-3">
                      {item.serviceUsed}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <footer className="mt-5 pt-4 border-t border-slate-200/70">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-600">{item.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-slate-900">
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
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
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
                  className="text-teal-700 hover:underline"
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
                className="block text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Laundry Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('cyber')}
                className="block text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cyber Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('barber')}
                className="block text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Barber Services
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('hotel')}
                className="block text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Junction Highway Hotel
              </button>
            </div>

            <div className="md:col-span-4 space-y-2 text-sm">
              <p className="font-semibold text-slate-900 mb-3">Hub Links</p>
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className="block text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Hub Overview
              </button>
              <a
                href="#contact"
                className="block text-slate-600 hover:text-slate-900"
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
