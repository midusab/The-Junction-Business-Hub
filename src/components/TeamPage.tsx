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
  Award,
  Check,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  EXTERIOR_IMAGE,
  HUB_TEAM,
  SERVICE_PAGES,
  type PageId,
  type ServicePageId,
  type TeamMember,
} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

interface TeamPageProps {
  onNavigate: (page: PageId) => void;
}

type TeamFilter = 'all' | ServicePageId;

const DEPARTMENT_FILTERS: Array<{id: TeamFilter; label: string}> = [
  {id: 'all', label: 'All Departments'},
  {id: 'laundry', label: 'Laundry'},
  {id: 'cyber', label: 'Cyber Café'},
  {id: 'barber', label: 'Barber'},
  {id: 'carwash', label: 'Car Wash'},
  {id: 'hotel', label: 'Highway Hotel'},
];

function TeamDepartmentShowcase({
  member,
  index,
  onNavigate,
}: {
  member: TeamMember;
  index: number;
  onNavigate: (page: PageId) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const blockRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  });
  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-16, 16]
  );

  const [showWorkspace, setShowWorkspace] = useState(false);
  const serviceConfig = SERVICE_PAGES[member.targetPage];
  const activeSrc = showWorkspace ? serviceConfig.heroImage.src : member.image;
  const activeAlt = showWorkspace ? serviceConfig.heroImage.alt : member.alt;
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      ref={blockRef}
      initial={prefersReducedMotion ? false : {opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.15}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-16 border-b border-sky-200/80 last:border-b-0"
    >
      {/* Left / Right Visual Column with Scroll Parallax & Portrait/Workspace Switcher */}
      <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="group border border-slate-200 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={activeSrc}
                style={{y: imageParallaxY}}
                initial={
                  prefersReducedMotion ? {opacity: 1} : {opacity: 0, scale: 1.04}
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]},
                }}
                exit={{opacity: 0, transition: {duration: 0.25}}}
                className="absolute inset-0 w-full h-[112%] -mt-[6%] will-change-transform"
              >
                <ResilientImage
                  src={activeSrc}
                  alt={activeAlt}
                  fallbackTitle={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Toggle between Specialist Portrait & Department Workspace */}
          <div className="grid grid-cols-2 border-t border-sky-200/70 bg-white">
            <button
              type="button"
              onClick={() => setShowWorkspace(false)}
              aria-pressed={!showWorkspace}
              className={`px-4 py-2.5 text-xs font-semibold border-r border-sky-200/70 transition-colors cursor-pointer ${
                !showWorkspace
                  ? 'bg-sky-50 text-sky-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Specialist Portrait
            </button>
            <button
              type="button"
              onClick={() => setShowWorkspace(true)}
              aria-pressed={showWorkspace}
              className={`px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                showWorkspace
                  ? 'bg-sky-50 text-sky-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {member.department} Bay
            </button>
          </div>
        </div>
      </div>

      {/* Right / Left Narrative Column: What They Do + Why They Are The Best */}
      <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-8 shadow-md hover:shadow-xl space-y-5 sm:space-y-6 transition-all hover:border-sky-400">
          <div>
            <p className="text-xs font-semibold tracking-wide text-sky-700 mb-1.5">
              {member.department} · {member.serviceHighlight}
            </p>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {member.name} — {member.role}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
              {member.whatTheyDo}
            </p>
          </div>

          {/* What They Do Checklist */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
              What They Do Daily
            </h3>
            <ul className="space-y-2 text-sm text-slate-800">
              {member.duties.map((duty, dIdx) => (
                <motion.li
                  key={dIdx}
                  whileHover={prefersReducedMotion ? undefined : {x: 4}}
                  className="flex items-start gap-2.5"
                >
                  <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{duty}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Why They Are The Best In This Section */}
          <div className="bg-white/90 border border-sky-200 rounded-md p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Award className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{member.whyBestTitle}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {member.whyBestPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-sky-600 font-bold">
                    &bull;
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate(member.targetPage)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Open {member.department} Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(`Hello The Junction Hub, I would like to connect with the ${member.department} team.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-sky-900 bg-white hover:bg-sky-50 border border-sky-200 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-sky-700" />
              <span>Message Team</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TeamPage({onNavigate}: TeamPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<TeamFilter>('all');

  const heroRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress: heroScroll} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(
    heroScroll,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '22%']
  );

  const visibleMembers =
    activeFilter === 'all'
      ? HUB_TEAM
      : HUB_TEAM.filter((member) => member.targetPage === activeFilter);

  return (
    <div>
      {/* 1. Full-Width Parallax Team Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[400px] sm:min-h-[500px] flex items-end overflow-hidden bg-slate-950"
      >
        <motion.div
          style={{y: heroImageY}}
          className="absolute inset-0 w-full h-[115%] will-change-transform"
        >
          <ResilientImage
            src={EXTERIOR_IMAGE.src}
            alt={EXTERIOR_IMAGE.alt}
            fallbackTitle="The Junction Hub Team"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/55 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900/90 border border-white/20 px-3.5 py-2 mb-6 hover:bg-sky-700 transition-colors cursor-pointer rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hub Home</span>
          </button>

          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-300 mb-2.5">
              Our People · Junction-Kodoyo, Homa Bay–Rongo Road
            </p>
            <h1 className="text-[clamp(1.85rem,5vw,3.55rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.06] text-balance">
              Meet the team behind every service at The Junction Hub
            </h1>
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-lg font-light text-slate-100 leading-relaxed">
              Skilled local leads across laundry, cyber, barbering, car wash, and hospitality.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat With Our Team</span>
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-900 bg-white hover:bg-sky-50 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span className="font-mono tabular-nums">
                  {BUSINESS_INFO.phoneDisplay}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Department Filter Bar + Per-Service Team Breakdown */}
      <section className="py-16 sm:py-20 bg-white border-b border-sky-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-sky-200/80">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-2">
                Service Teams · Representative Staff Roles
              </p>
              <h2 className="text-3xl font-bold tracking-[-0.025em] text-slate-900 text-balance">
                Why our specialists excel in every department
              </h2>
            </div>

            <div
              role="group"
              aria-label="Filter team specialists by department"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-sky-200/80 rounded-lg self-start lg:self-auto"
            >
              {DEPARTMENT_FILTERS.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-700 hover:text-sky-800 hover:bg-sky-50'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="team-filter-pill"
                        transition={{type: 'spring', stiffness: 420, damping: 32}}
                        aria-hidden="true"
                        className="absolute inset-0 bg-sky-600 rounded-md shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {visibleMembers.map((member, idx) => (
              <TeamDepartmentShowcase
                key={member.id}
                member={member}
                index={idx}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Coordinated One-Stop Team Promise */}
      <section className="py-16 bg-white border-b border-sky-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-6 sm:p-10 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-sky-700 mb-2">
                Coordinated Under One Roof
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                Five teams working together so one stop handles your entire day
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                Drop off laundry, print forms, get a fresh cut, wash your car, and grab hot Kenyan tea—all in one stop on the Homa Bay–Rongo Road.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Back to Hub Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
