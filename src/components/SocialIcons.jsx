import {motion, useReducedMotion} from 'motion/react';
import {SOCIAL_PROFILES} from '../data/hubData';

export function TikTokIcon({className = 'w-5 h-5'}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.21 8.21 0 0 0 4.76 1.52V6.89a4.85 4.85 0 0 1-1-.2Z" />
    </svg>
  );
}

export function InstagramIcon({className = 'w-5 h-5'}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({className = 'w-5 h-5'}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

export function PlatformIcon({
  platform,
  className = 'w-5 h-5',
}) {
  if (platform === 'tiktok') return <TikTokIcon className={className} />;
  if (platform === 'instagram') return <InstagramIcon className={className} />;
  return <FacebookIcon className={className} />;
}

const PLATFORM_CIRCLE_STYLES = {
  tiktok: 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900',
  instagram: 'bg-pink-600 hover:bg-pink-500 text-white border-pink-600',
  facebook: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-600',
};

export function CircularSocialLinks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {SOCIAL_PROFILES.map((profile) => (
        <motion.a
          key={profile.platform}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${profile.label} (${profile.handle})`}
          title={`${profile.label} · ${profile.handle}`}
          whileHover={prefersReducedMotion ? undefined : {y: -3, scale: 1.08}}
          whileTap={prefersReducedMotion ? undefined : {scale: 0.94}}
          className={`w-11 h-11 rounded-full border inline-flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${PLATFORM_CIRCLE_STYLES[profile.platform]}`}
        >
          <PlatformIcon platform={profile.platform} className="w-5 h-5" />
          <span className="sr-only">{profile.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
