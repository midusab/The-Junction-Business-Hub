import {useRef, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {ArrowRight, Check, MessageCircle} from 'lucide-react';
import {
  BUSINESS_INFO,
  HUB_TEAM,
  type PageId,
  type TeamMember,
} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

interface TeamSectionProps {
  onNavigate: (page: PageId) => void;
}

function TeamMemberCard({
  member,
  index,
  isSelected,
  onSelect,
  onNavigate,
}: {
  member: TeamMember;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onNavigate: (page: PageId) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const portraitParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-12, 12]
  );

  return (
    <motion.article
      ref={cardRef}
      initial={prefersReducedMotion ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.15}}
      transition={{
        duration: 0.45,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : {y: -6}}
      onClick={onSelect}
      className={`group rounded-lg border overflow-hidden flex flex-col justify-between transition-colors duration-200 cursor-pointer bg-white ${
        isSelected
          ? 'border-sky-600 ring-2 ring-sky-600/25 shadow-md'
          : 'border-sky-200/80 hover:border-sky-500 shadow-sm'
      }`}
    >
      <div>
        {/* Portrait Stage with Scroll Parallax & Hover Zoom + Action Overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <motion.div
            style={{y: portraitParallaxY}}
            className="w-full h-[112%] -mt-[6%] will-change-transform"
          >
            <ResilientImage
              src={member.image}
              alt={member.alt}
              fallbackTitle={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
          </motion.div>

          {/* Subtle bottom contrast gradient for label */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none"
          />

          {/* Department caption on visual + Hover quick CTA */}
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
            <div className="liquid-glass-dark px-3 py-1.5 rounded-md">
              <p className="text-[11px] font-medium text-sky-300">
                {member.department}
              </p>
              <p className="text-xs font-semibold text-white">{member.role}</p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(member.targetPage);
              }}
              aria-label={`Visit ${member.department} page`}
              className="w-9 h-9 rounded-md bg-sky-600 hover:bg-sky-500 text-white inline-flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shrink-0 cursor-pointer shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* What They Do Summary */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              {member.name}
            </h3>
            <span className="text-xs font-medium text-sky-700">
              {isSelected ? 'Selected' : 'View duties'}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {member.whatTheyDo}
          </p>

          <ul className="mt-4 pt-3 border-t border-sky-100 space-y-1.5 text-xs text-slate-700">
            {member.duties.map((duty, dIdx) => (
              <li key={dIdx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>{duty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Interactive Actions */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(member.targetPage);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Explore {member.department.split(' ')[0]}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>

        <a
          href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(`Hello The Junction Hub, I would like assistance from the ${member.department} team.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium text-sky-800 hover:text-sky-600 px-2.5 py-2 rounded-md hover:bg-sky-50 transition-colors whitespace-nowrap shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </motion.article>
  );
}

export function TeamSection({onNavigate}: TeamSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(HUB_TEAM[0].id);

  const activeMember =
    HUB_TEAM.find((member) => member.id === selectedId) ?? HUB_TEAM[0];

  return (
    <section
      id="team"
      className="py-20 sm:py-24 bg-white border-b border-sky-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-sky-700 mb-2">
              Hub Specialists · People Behind Every Service
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Meet the specialists keeping the hub moving
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every department is staffed by dedicated specialists ready to help
              with garment care, documents, grooming, car detailing, and hot
              Kenyan hospitality. Representative staff roles shown.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => onNavigate('team')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Full Team Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-sky-700" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </motion.div>

        {/* Interactive Animated Spotlight Banner for Selected Team Role */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMember.id}
            initial={prefersReducedMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: -8}}
            transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
            className="mb-10 liquid-glass rounded-lg p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border border-sky-200 shrink-0 bg-slate-100">
                <ResilientImage
                  src={activeMember.image}
                  alt={activeMember.alt}
                  fallbackTitle={activeMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-700">
                  {activeMember.department} · Representative Role
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {activeMember.name} — {activeMember.role}
                </h3>
                <p className="mt-1 text-sm text-slate-700 max-w-2xl">
                  {activeMember.whatTheyDo}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(activeMember.targetPage)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
            >
              <span>Open {activeMember.department}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* 5-Member Responsive Grid with Scroll Parallax + Hover Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUB_TEAM.map((member, idx) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={idx}
              isSelected={member.id === selectedId}
              onSelect={() => setSelectedId(member.id)}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
