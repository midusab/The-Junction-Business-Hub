import {useRef} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {ArrowRight, MessageCircle} from 'lucide-react';
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
  onNavigate,
}: {
  member: TeamMember;
  index: number;
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
      whileTap={prefersReducedMotion ? undefined : {scale: 0.985}}
      onClick={() => onNavigate(member.targetPage)}
      className="group rounded-lg border border-slate-200 hover:border-sky-400 shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer bg-white"
    >
      <div>
        {/* Portrait Stage with Scroll Parallax & Hover Zoom */}
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
        </div>

        {/* Visual-First Identity */}
        <div className="p-4 sm:p-5">
          <p className="text-xs font-semibold text-sky-700 mb-1">
            {member.department} · {member.role}
          </p>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
            {member.name}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-1">
            {member.serviceHighlight}
          </p>
        </div>
      </div>

      {/* Bottom Interactive Actions */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 flex items-center justify-between gap-2">
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

  return (
    <section
      id="team"
      className="py-14 sm:py-24 bg-white border-b border-sky-200/80"
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
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-2">
              Our Specialists · Representative Roles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-slate-900 text-balance">
              People behind every service
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-auto">
            <motion.button
              type="button"
              onClick={() => onNavigate('team')}
              whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Full Team Page</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
            <motion.a
              href={BUSINESS_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? undefined : {y: -1.5}}
              whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md shadow-xs hover:shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-sky-700" />
              <span>WhatsApp Desk</span>
            </motion.a>
          </div>
        </motion.div>

        {/* 5-Member Responsive Grid with Scroll Parallax + Hover Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUB_TEAM.map((member, idx) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={idx}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
