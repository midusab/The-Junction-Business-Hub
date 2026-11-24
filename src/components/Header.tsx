import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {BUSINESS_INFO, type PageId} from '../data/hubData';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: Array<{id: PageId; label: string}> = [
  {id: 'home', label: 'Home'},
  {id: 'laundry', label: 'Laundry'},
  {id: 'cyber', label: 'Cyber Café'},
  {id: 'barber', label: 'Barber'},
  {id: 'hotel', label: 'Highway Hotel'},
  {id: 'carwash', label: 'Car Wash'},
  {id: 'team', label: 'Our Team'},
];

export function Header({activePage, onNavigate}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 liquid-glass border-x-0 border-t-0 border-b border-sky-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded-sm"
        >
          {BUSINESS_INFO.shortName}
        </button>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Service Pages Navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-1 underline-offset-8 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded-sm ${
                  isActive
                    ? 'text-sky-700 underline decoration-2 decoration-sky-600'
                    : 'text-slate-700 hover:text-sky-700 hover:underline'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Contact &amp; Map
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-800 hover:bg-sky-100/70 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sky-600 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Service Navigation"
          className="lg:hidden border-t border-sky-200/80 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-800 font-semibold border border-sky-200'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-sky-50/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
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
