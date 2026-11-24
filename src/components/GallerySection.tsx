import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ChevronLeft, ChevronRight, Expand, X} from 'lucide-react';
import {GALLERY_PHOTOS, type GalleryPhoto} from '../data/hubData';
import {ResilientImage} from './ResilientImage';

type FilterCategory = 'all' | 'hub' | 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash';

const FILTERS: Array<{id: FilterCategory; label: string}> = [
  {id: 'all', label: 'All Spaces'},
  {id: 'hub', label: 'Hub Exterior'},
  {id: 'laundry', label: 'Laundry'},
  {id: 'cyber', label: 'Cyber Café'},
  {id: 'barber', label: 'Barber'},
  {id: 'hotel', label: 'Highway Hotel'},
  {id: 'carwash', label: 'Car Wash'},
];

const CATEGORY_TINTS: Record<GalleryPhoto['category'], string> = {
  hub: 'text-sky-700',
  laundry: 'text-sky-700',
  cyber: 'text-blue-700',
  barber: 'text-amber-800',
  hotel: 'text-emerald-700',
  carwash: 'text-sky-700',
};

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const visiblePhotos =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);

  const activePhoto: GalleryPhoto | null =
    selectedIndex !== null ? visiblePhotos[selectedIndex] ?? null : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
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

  const handleFilterChange = (category: FilterCategory) => {
    setActiveFilter(category);
    setSelectedIndex(null);
  };

  return (
    <section
      id="gallery"
      className="py-20 sm:py-24 border-t border-sky-200/80 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-sky-700 mb-2">
              Visual Archive · Inside Our Hub
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Inside our laundry, cyber, barber, car wash, and hotel spaces
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Filter by department or click any scene to inspect full-screen.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter gallery images by department"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F8F9FA] border border-sky-200/80 rounded-lg self-start lg:self-auto"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-sky-800 hover:bg-sky-100/70'
                  }`}
                >
                  {filter.label}
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
                  className={`${spanClass} group border border-sky-200/80 hover:border-sky-500 rounded-lg overflow-hidden bg-white flex flex-col transition-colors`}
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
                    <span className="absolute bottom-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-md liquid-glass-dark text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <Expand className="w-4 h-4" />
                    </span>
                  </button>
                  <figcaption className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div
                        className={`text-xs font-semibold mb-1.5 ${CATEGORY_TINTS[photo.category]}`}
                      >
                        <span>{photo.categoryLabel}</span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {photo.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {photo.caption}
                      </p>
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
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={
                prefersReducedMotion ? false : {opacity: 0, scale: 0.96, y: 10}
              }
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.97}}
              transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden border border-sky-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-900">
                    {activePhoto.title}
                  </span>
                  <span aria-hidden="true" className="text-slate-400">
                    ·
                  </span>
                  <span className="text-sky-700 font-medium">
                    {activePhoto.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close image preview"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md text-slate-600 hover:bg-sky-50 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-slate-950 aspect-[16/10] w-full">
                <ResilientImage
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fallbackTitle={activePhoto.title}
                  className="w-full h-full object-contain"
                />
                {visiblePhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex - 1 + visiblePhotos.length) %
                            visiblePhotos.length
                        )
                      }
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md liquid-glass text-slate-900 hover:bg-white inline-flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex + 1) % visiblePhotos.length
                        )
                      }
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md liquid-glass text-slate-900 hover:bg-white inline-flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="px-5 py-3.5 bg-[#F8F9FA] border-t border-sky-200 flex items-center justify-between gap-4">
                <p className="text-sm text-slate-700">{activePhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
