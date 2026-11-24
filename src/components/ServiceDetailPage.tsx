import {useRef, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Expand,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICE_PAGES,
  type PageId,
  type ServiceItem,
  type ServicePageConfig,
} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

interface ServiceDetailPageProps {
  config: ServicePageConfig;
  onNavigate: (page: PageId) => void;
}

const LIGHT_TONE_CLASSES: Record<ServiceItem['accentTone'], string> = {
  teal: 'text-teal-700',
  sky: 'text-sky-700',
  amber: 'text-amber-700',
  emerald: 'text-emerald-700',
  blue: 'text-sky-800',
  indigo: 'text-indigo-700',
};

const DARK_TONE_CLASSES: Record<ServiceItem['accentTone'], string> = {
  teal: 'text-teal-300',
  sky: 'text-sky-300',
  amber: 'text-amber-300',
  emerald: 'text-emerald-300',
  blue: 'text-sky-300',
  indigo: 'text-indigo-300',
};

export function ServiceDetailPage({
  config,
  onNavigate,
}: ServiceDetailPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDarkSection = config.id === 'cyber';

  // Parallax Hero Scroll Tracking
  const heroRef = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress: heroProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(
    heroProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '24%']
  );
  const heroImageScale = useTransform(
    heroProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.02, 1.14]
  );

  // Mid-page Parallax Showcase Tracking
  const visualRef = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress: visualProgress} = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  });
  const visualParallaxY = useTransform(
    visualProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-18, 18]
  );

  // Interactive On-Click State
  const [selectedVisualIdx, setSelectedVisualIdx] = useState(0);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    config.services[0]?.id ?? null
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeVisual =
    config.galleryImages[selectedVisualIdx] ?? config.heroImage;

  const otherServices = (
    Object.values(SERVICE_PAGES) as ServicePageConfig[]
  ).filter((page) => page.id !== config.id);

  const toggleServiceCard = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* 1. Full-Width Parallax Hero Banner */}
      <section
        ref={heroRef}
        className="relative min-h-[480px] sm:min-h-[540px] flex items-end overflow-hidden bg-slate-950"
      >
        <motion.div
          style={{y: heroImageY, scale: heroImageScale}}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <ResilientImage
            src={config.heroImage.src}
            alt={config.heroImage.alt}
            fallbackTitle={config.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Balanced Contrast Scrim keeping background photography visible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-white liquid-glass-dark px-3.5 py-2 mb-6 hover:bg-sky-700/70 transition-colors cursor-pointer rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hub Story</span>
          </button>

          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl liquid-glass-dark p-6 sm:p-8 rounded-lg"
          >
            <p className="text-xs sm:text-sm font-medium tracking-wide mb-2 text-sky-300">
              {config.departmentNumber} · Junction-Kodoyo · Homa Bay–Rongo Road
            </p>
            <h1 className="text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold tracking-tight text-white leading-[1.08] text-balance">
              {config.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl">
              {config.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(config.whatsappPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-sky-300" />
                <span className="font-mono tabular-nums">
                  {BUSINESS_INFO.phoneDisplay}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Visual Gallery & Parallax Showcase */}
      <section
        ref={visualRef}
        className={`py-16 sm:py-20 border-b ${config.theme.sectionBg} ${config.theme.sectionBorder}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Visual Frame with Scroll Parallax */}
            <div className="lg:col-span-7">
              <motion.div
                style={{y: visualParallaxY}}
                className="relative aspect-[16/10] w-full overflow-hidden border border-sky-200 bg-slate-900 shadow-sm group rounded-lg"
              >
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={activeVisual.id}
                    initial={
                      prefersReducedMotion
                        ? {opacity: 1}
                        : {opacity: 0, scale: 1.05}
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]},
                    }}
                    exit={{
                      opacity: 0,
                      transition: {duration: 0.3},
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <ResilientImage
                      src={activeVisual.src}
                      alt={activeVisual.alt}
                      fallbackTitle={activeVisual.label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent pointer-events-none"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-sky-300">
                      {activeVisual.label}
                    </p>
                    <p className="text-sm text-white/95 font-medium">
                      {activeVisual.caption}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label={`Inspect ${activeVisual.label} full screen`}
                    className="w-10 h-10 rounded-md liquid-glass-dark hover:bg-sky-600/80 text-white inline-flex items-center justify-center shrink-0 cursor-pointer transition-transform active:scale-95"
                  >
                    <Expand className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Interactive Thumbnail Strip (On-Click Switcher) */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {config.galleryImages.map((img, idx) => {
                  const isSelected = idx === selectedVisualIdx;
                  return (
                    <motion.button
                      key={img.id}
                      type="button"
                      whileHover={prefersReducedMotion ? undefined : {y: -2}}
                      whileTap={prefersReducedMotion ? undefined : {scale: 0.97}}
                      onClick={() => setSelectedVisualIdx(idx)}
                      className={`group text-left overflow-hidden border transition-all cursor-pointer rounded-md ${
                        isSelected
                          ? 'ring-2 ring-sky-600 border-sky-600'
                          : isDarkSection
                            ? 'border-slate-700 opacity-80 hover:opacity-100'
                            : 'border-sky-200 opacity-85 hover:opacity-100 hover:border-sky-400'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full bg-slate-200 overflow-hidden">
                        <ResilientImage
                          src={img.src}
                          alt={img.alt}
                          fallbackTitle={img.label}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p
                        className={`px-2.5 py-1.5 text-xs font-medium truncate ${
                          isDarkSection
                            ? 'bg-slate-800 text-slate-200'
                            : 'bg-white text-slate-800'
                        }`}
                      >
                        {img.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right: Service Overview & Process Timeline */}
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-5"
            >
              <p
                className={`text-xs font-semibold tracking-wide mb-2 ${
                  isDarkSection ? 'text-sky-300' : 'text-sky-700'
                }`}
              >
                {config.processTitle}
              </p>
              <h2
                className={`text-2xl sm:text-3xl font-bold tracking-tight text-balance ${
                  isDarkSection ? 'text-white' : 'text-slate-900'
                }`}
              >
                {config.subtitle}
              </h2>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed ${
                  isDarkSection ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {config.processSubtitle}
              </p>

              <div className="mt-6 space-y-3">
                {config.processSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    initial={prefersReducedMotion ? false : {opacity: 0, x: 12}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`border rounded-lg p-4 transition-colors ${
                      isDarkSection
                        ? 'liquid-glass-dark'
                        : 'liquid-glass hover:bg-white'
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        isDarkSection ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 text-xs sm:text-sm leading-relaxed ${
                        isDarkSection ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      {step.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. On-Click Interactive Services Directory */}
      <section
        className={`py-16 sm:py-20 border-b ${
          isDarkSection
            ? 'bg-slate-950 text-slate-100 border-slate-800'
            : 'bg-white text-slate-900 border-sky-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p
              className={`text-xs font-semibold tracking-wide mb-2 ${
                isDarkSection ? 'text-sky-300' : 'text-sky-700'
              }`}
            >
              Available Services · Click any card for details
            </p>
            <h2
              className={`text-3xl font-bold tracking-tight text-balance ${
                isDarkSection ? 'text-white' : 'text-slate-900'
              }`}
            >
              Explore {config.title}
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDarkSection ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Select any service below to inspect what is included and send a
              direct enquiry. Pricing is confirmed transparently at the counter
              or via WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {config.services.map((service, idx) => {
              const isExpanded = expandedServiceId === service.id;
              return (
                <motion.article
                  key={service.id}
                  initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.15}}
                  transition={{
                    duration: 0.35,
                    delay: prefersReducedMotion ? 0 : Math.min(idx * 0.05, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={prefersReducedMotion ? undefined : {y: -3}}
                  className={`border rounded-lg overflow-hidden transition-colors ${
                    isDarkSection
                      ? isExpanded
                        ? 'bg-slate-900 border-sky-400'
                        : 'bg-slate-900/75 border-slate-800 hover:border-sky-500/60'
                      : isExpanded
                        ? 'bg-sky-50/70 border-sky-600'
                        : 'bg-white border-slate-200 hover:border-sky-400'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleServiceCard(service.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-sky-600"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className={`text-xs font-medium ${
                          isDarkSection
                            ? DARK_TONE_CLASSES[service.accentTone]
                            : LIGHT_TONE_CLASSES[service.accentTone]
                        }`}
                      >
                        {service.turnaround}
                      </span>

                      <motion.span
                        animate={{rotate: isExpanded ? 180 : 0}}
                        transition={{duration: 0.2}}
                        className={
                          isDarkSection ? 'text-sky-300' : 'text-sky-700'
                        }
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </div>

                    <h3
                      className={`text-lg font-semibold ${
                        isDarkSection ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isDarkSection ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {service.description}
                    </p>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? {opacity: 1}
                            : {opacity: 0, y: -6}
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.22, ease: [0.16, 1, 0.3, 1]},
                        }}
                        exit={{
                          opacity: 0,
                          transition: {duration: 0.15},
                        }}
                        className={`px-6 pb-6 pt-3 border-t ${
                          isDarkSection
                            ? 'border-slate-800 text-slate-300'
                            : 'border-sky-200/80 text-slate-700'
                        }`}
                      >
                        <ul className="space-y-2 text-xs sm:text-sm mb-4">
                          {service.details.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className={`font-mono ${
                                  isDarkSection
                                    ? 'text-sky-300'
                                    : 'text-sky-700'
                                }`}
                              >
                                &bull;
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200/20">
                          <span className="text-xs opacity-75">
                            {service.rateNote}
                          </span>
                          <a
                            href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(`Hello The Junction Hub, I would like to enquire about ${service.title} (${config.title}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 bg-sky-600 hover:bg-sky-700 text-white"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Enquire</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Explore Other Hub Service Pages */}
      <section className="py-14 bg-[#F8F9FA] border-b border-sky-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-sky-700 mb-1">
                More at The Junction Hub
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Continue exploring our services
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-sm font-medium text-sky-700 hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Return to Full Hub Story
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.map((servicePage) => (
              <motion.button
                key={servicePage.id}
                type="button"
                whileHover={prefersReducedMotion ? undefined : {y: -4}}
                whileTap={prefersReducedMotion ? undefined : {scale: 0.99}}
                onClick={() => onNavigate(servicePage.id)}
                className="group text-left bg-white border border-sky-200 rounded-lg overflow-hidden hover:border-sky-500 transition-colors cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={servicePage.heroImage.src}
                    alt={servicePage.heroImage.alt}
                    fallbackTitle={servicePage.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-sky-700">
                      {servicePage.departmentNumber}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {servicePage.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {servicePage.subtitle}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                    <span>Open Page</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeVisual.label}
            initial={prefersReducedMotion ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.96}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.97}}
              className="max-w-4xl w-full bg-white rounded-lg overflow-hidden border border-sky-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
                <span className="font-semibold text-sm text-slate-900">
                  {activeVisual.label} · {config.title}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close image preview"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md text-slate-600 hover:bg-sky-50 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-slate-950 aspect-[16/10] w-full">
                <ResilientImage
                  src={activeVisual.src}
                  alt={activeVisual.alt}
                  fallbackTitle={activeVisual.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-5 py-3.5 bg-sky-50 border-t border-sky-200 text-sm text-slate-700">
                {activeVisual.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
