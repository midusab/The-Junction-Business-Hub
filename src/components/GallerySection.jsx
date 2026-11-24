import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {GALLERY_PHOTOS} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

const FILTERS = [
  {id: 'all', label: 'All Spaces'},
  {id: 'hub', label: 'Hub Exterior'},
  {id: 'laundry', label: 'Laundry'},
  {id: 'cyber', label: 'Cyber Café'},
  {id: 'barber', label: 'Barber'},
  {id: 'hotel', label: 'Highway Hotel'},
  {id: 'carwash', label: 'Car Wash'},
];

const CATEGORY_TINTS = {
  hub: 'text-sky-700',
  laundry: 'text-sky-700',
  cyber: 'text-blue-700',
  barber: 'text-amber-800',
  hotel: 'text-emerald-700',
  carwash: 'text-sky-700',
};

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const visiblePhotos =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);

  const activePhoto =
    selectedIndex !== null ? visiblePhotos[selectedIndex] ?? null : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, visiblePhotos.length]);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setSelectedIndex(null);
  };

  return (
    <section
      id="gallery"
      className="py-14 sm:py-24 border-t border-sky-200/80 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-2">
              Visual Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-slate-900 text-balance">
              Inside The Junction Hub
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter gallery images by department"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F8F9FA] border border-slate-200 rounded-lg shadow-xs self-start lg:self-auto"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleFilterChange(filter.id)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-700 hover:text-sky-800 hover:bg-sky-100/70'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      transition={{type: 'spring', stiffness: 420, damping: 32}}
                      aria-hidden="true"
                      className="absolute inset-0 bg-sky-600 rounded-md shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout={!prefersReducedMotion}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo, index) => {
              const spanClass =
                activeFilter === 'all' && index === 0
                  ? 'md:col-span-4'
                  : activeFilter === 'all' && index === 1
                    ? 'md:col-span-2'
                    : 'md:col-span-2';

              const aspectClass =
                activeFilter === 'all' && index === 0
                  ? 'aspect-[16/10]'
                  : 'aspect-[4/3]';

              return (
                <motion.figure
                  key={photo.id}
                  layout={!prefersReducedMotion}
                  initial={
                    prefersReducedMotion ? false : {opacity: 0, y: 14, scale: 0.98}
                  }
                  animate={{opacity: 1, y: 0, scale: 1}}
                  exit={
                    prefersReducedMotion
                      ? {opacity: 0}
                      : {opacity: 0, scale: 0.97}
                  }
                  whileHover={prefersReducedMotion ? undefined : {y: -4}}
                  transition={{
                    duration: 0.35,
                    delay: prefersReducedMotion ? 0 : Math.min(index * 0.03, 0.21),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`${spanClass} group border border-slate-200 hover:border-sky-400 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl flex flex-col transition-all duration-200`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`relative w-full ${aspectClass} overflow-hidden bg-slate-100 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-sky-600`}
                    aria-label={`View larger image of ${photo.title}`}
                  >
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      fallbackTitle={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                  </button>
                  <figcaption className="p-4 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <span
                        className={`text-xs font-semibold ${CATEGORY_TINTS[photo.category]}`}
                      >
                        {photo.categoryLabel}
                      </span>
                      <h3 className="mt-1 text-sm sm:text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {photo.title}
                      </h3>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            initial={prefersReducedMotion ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={
                prefersReducedMotion ? false : {opacity: 0, scale: 0.96, y: 10}
              }
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.97}}
              transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden border border-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
                  <span className="font-semibold text-slate-900 truncate">
                    {activePhoto.title}
                  </span>
                  <span aria-hidden="true" className="text-slate-400 shrink-0">
                    ·
                  </span>
                  <span className="text-sky-700 font-medium truncate">
                    {activePhoto.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close image preview"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md text-slate-600 hover:bg-sky-50 hover:text-slate-900 cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-slate-950 aspect-[16/10] w-full overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activePhoto.id}
                    initial={
                      prefersReducedMotion ? {opacity: 1} : {opacity: 0, scale: 0.98}
                    }
                    animate={{opacity: 1, scale: 1}}
                    exit={
                      prefersReducedMotion ? {opacity: 0} : {opacity: 0, scale: 1.01}
                    }
                    transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
                    className="w-full h-full"
                  >
                    <ResilientImage
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      fallbackTitle={activePhoto.title}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                {visiblePhotos.length > 1 && (
                  <>
                    <motion.button
                      type="button"
                      whileHover={prefersReducedMotion ? undefined : {scale: 1.08}}
                      whileTap={prefersReducedMotion ? undefined : {scale: 0.92}}
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex - 1 + visiblePhotos.length) %
                            visiblePhotos.length
                        )
                      }
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-white/95 border border-slate-200 text-slate-900 hover:bg-white inline-flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={prefersReducedMotion ? undefined : {scale: 1.08}}
                      whileTap={prefersReducedMotion ? undefined : {scale: 0.92}}
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex + 1) % visiblePhotos.length
                        )
                      }
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-white/95 border border-slate-200 text-slate-900 hover:bg-white inline-flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </>
                )}
              </div>

              <div className="px-5 py-3.5 bg-white border-t border-sky-200 flex items-center justify-between gap-4">
                <p className="text-sm text-slate-700">{activePhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
