import {useEffect, useRef, useState} from 'react';
import {
  Car,
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Printer,
  Scissors,
  Shirt,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {
  BUSINESS_INFO,
  type PageId,
  type ServicePageId,
} from '../data/hubData';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const SERVICE_DROPDOWN_ITEMS: Array<{
  id: ServicePageId;
  label: string;
  caption: string;
  Icon: typeof Shirt;
}> = [
  {
    id: 'laundry',
    label: 'Laundry Services',
    caption: 'Wash, press, fold & duvets',
    Icon: Shirt,
  },
  {
    id: 'cyber',
    label: 'Cyber Café',
    caption: 'Print, scan, typing & portals',
    Icon: Printer,
  },
  {
    id: 'barber',
    label: 'Barber Studio',
    caption: 'Fades, trims & hot towel',
    Icon: Scissors,
  },
  {
    id: 'carwash',
    label: 'Car Wash Bay',
    caption: 'Foam wash, vacuum & bikes',
    Icon: Car,
  },
  {
    id: 'hotel',
    label: 'Highway Hotel',
    caption: 'Kenyan meals, chai & rooms',
    Icon: UtensilsCrossed,
  },
];

export function Header({activePage, onNavigate}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const isServicePage =
    activePage === 'laundry' ||
    activePage === 'cyber' ||
    activePage === 'barber' ||
    activePage === 'hotel' ||
    activePage === 'carwash';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (page: PageId) => {
    setMobileOpen(false);
    setServicesOpen(false);
    onNavigate(page);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    if (activePage !== 'home') {
      onNavigate('home');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
      }, 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded-sm"
        >
          {BUSINESS_INFO.shortName}
        </button>

        {/* Zone 2: Clean 4-item navigation with Services Dropdown */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            aria-current={activePage === 'home' ? 'page' : undefined}
            className={`py-1 underline-offset-8 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer rounded-sm ${
              activePage === 'home'
                ? 'text-sky-700 underline decoration-2 decoration-sky-600'
                : 'text-slate-700 hover:text-sky-700 hover:underline'
            }`}
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 py-1 underline-offset-8 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer rounded-sm ${
                isServicePage
                  ? 'text-sky-700 underline decoration-2 decoration-sky-600'
                  : 'text-slate-700 hover:text-sky-700'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  servicesOpen ? 'rotate-180 text-sky-700' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  role="menu"
                  initial={
                    prefersReducedMotion
                      ? {opacity: 1}
                      : {opacity: 0, y: 6, scale: 0.98}
                  }
                  animate={{opacity: 1, y: 0, scale: 1}}
                  exit={
                    prefersReducedMotion
                      ? {opacity: 0}
                      : {opacity: 0, y: 4, scale: 0.98}
                  }
                  transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                  className="absolute left-0 top-full pt-2 w-72 z-50"
                >
                  <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-2 space-y-1">
                    {SERVICE_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.Icon;
                      const active = activePage === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="menuitem"
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors cursor-pointer ${
                            active
                              ? 'bg-sky-50 text-sky-800'
                              : 'hover:bg-sky-50/75 text-slate-800'
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                              active
                                ? 'bg-sky-600 text-white'
                                : 'bg-sky-100 text-sky-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold leading-tight">
                              {item.label}
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5 truncate">
                              {item.caption}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('team')}
            aria-current={activePage === 'team' ? 'page' : undefined}
            className={`py-1 underline-offset-8 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer rounded-sm ${
              activePage === 'team'
                ? 'text-sky-700 underline decoration-2 decoration-sky-600'
                : 'text-slate-700 hover:text-sky-700 hover:underline'
            }`}
          >
            Our Team
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('gallery')}
            className="py-1 underline-offset-8 text-slate-700 hover:text-sky-700 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer rounded-sm"
          >
            Gallery
          </button>
        </nav>

        {/* Zone 3: Call & WhatsApp Icons + Primary Contact CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            href={BUSINESS_INFO.phoneHref}
            aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
            title={`Call ${BUSINESS_INFO.phoneDisplay}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-sky-200 bg-white hover:bg-sky-50 text-sky-700 shadow-xs hover:shadow-sm transition-all shrink-0"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href={BUSINESS_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp The Junction Hub"
            title="Message on WhatsApp"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 shadow-xs hover:shadow-sm transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Contact &amp; Map
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-800 hover:bg-sky-100/70 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sky-600 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Expandable Services Dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1.5"
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'bg-sky-50 text-sky-800 font-semibold border border-sky-200'
                : 'text-slate-700 hover:bg-sky-50/50'
            }`}
          >
            Home
          </button>

          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              aria-expanded={mobileServicesOpen}
              className="flex items-center justify-between w-full text-left px-3 py-2.5 text-base font-medium text-slate-800 rounded-md hover:bg-sky-50/60 cursor-pointer"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileServicesOpen ? 'rotate-180 text-sky-700' : ''
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="mt-1 ml-3 pl-3 border-l border-sky-200 space-y-1">
                {SERVICE_DROPDOWN_ITEMS.map((item) => {
                  const Icon = item.Icon;
                  const active = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                        active
                          ? 'bg-sky-50 text-sky-800 font-semibold'
                          : 'text-slate-700 hover:bg-sky-50/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('team')}
            className={`block w-full text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors cursor-pointer ${
              activePage === 'team'
                ? 'bg-sky-50 text-sky-800 font-semibold border border-sky-200'
                : 'text-slate-700 hover:bg-sky-50/50'
            }`}
          >
            Our Team
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('gallery')}
            className="block w-full text-left px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-sky-50/50 rounded-md cursor-pointer"
          >
            Gallery
          </button>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
            >
              Contact &amp; Map
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
