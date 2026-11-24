export type PageId =
  | 'home'
  | 'laundry'
  | 'cyber'
  | 'barber'
  | 'hotel'
  | 'carwash'
  | 'team';

export type ServicePageId = Exclude<PageId, 'home' | 'team'>;

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  turnaround: string;
  rateNote: string;
  details: string[];
  accentTone: 'teal' | 'sky' | 'amber' | 'emerald' | 'blue' | 'indigo';
}

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceVisual {
  id: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export interface ServicePageConfig {
  id: ServicePageId;
  navLabel: string;
  departmentNumber: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: ServiceVisual;
  galleryImages: ServiceVisual[];
  theme: {
    badgeText: string;
    sectionBg: string;
    sectionBorder: string;
    accentButton: string;
    accentText: string;
    cardTint: string;
  };
  services: ServiceItem[];
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
  whatsappPrefill: string;
}

export interface OperatingHour {
  day: string;
  hours: string;
  confirmed: boolean;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'hub' | 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash';
  categoryLabel: string;
  title: string;
  caption: string;
}

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
  targetPage: PageId;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  serviceUsed: string;
  targetPage: ServicePageId;
  quote: string;
  surfaceTint: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  targetPage: ServicePageId;
  image: string;
  alt: string;
  whatTheyDo: string;
  duties: string[];
  whyBestTitle: string;
  whyBestPoints: string[];
  serviceHighlight: string;
}

export const BUSINESS_INFO = {
  name: 'The Junction Laundry And Services Hub',
  shortName: 'The Junction Hub',
  locationShort: 'Junction-Kodoyo, Homa Bay',
  locationReference: 'Along the Homa Bay–Rongo Road, Homa Bay County, Kenya',
  phoneDisplay: '+254 766 768617',
  phoneHref: 'tel:+254766768617',
  whatsappHref: 'https://wa.me/254766768617',
  category: 'Laundry, Cyber Café, Barber, Car Wash & Highway Hotel Hub',
  mapsExternalUrl:
    'https://www.google.com/maps/search/?api=1&query=Junction-Kodoyo+Homa+Bay+Rongo+Road+Kenya',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/MWBQt7tEaFI',
  youtubeTitle:
    'WELCOME TO THE JUNCTION BUSINESS HUB 🔥🔥🔥 // HOMA BAY TOWN // JUNCTION KODOYO',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-exterior',
    src: '/src/assets/images/junction_roadside_exterior_1795528067474.jpg',
    alt: 'Daytime exterior view of the hub along the Homa Bay–Rongo Road in Homa Bay County',
    label: 'The Junction Hub · Roadside Access',
    caption: 'Laundry, Cyber Café, Barber, Car Wash & Highway Hotel in Junction-Kodoyo',
    targetPage: 'home',
  },
  {
    id: 'slide-laundry',
    src: '/src/assets/images/colorful_laundry_baskets_1795528067141.jpg',
    alt: 'Freshly washed colorful clothes and East African kitenge fabrics folded beside front-loading washers',
    label: 'Laundry Services',
    caption: 'Wash, steam press, fold, duvets & express garment care',
    targetPage: 'laundry',
  },
  {
    id: 'slide-cyber',
    src: '/src/assets/images/cyber_digital_assistance_1795528069188.jpg',
    alt: 'Friendly cyber café attendant assisting a student with colorful printed documents at a computer desk',
    label: 'Cyber Services',
    caption: 'Document printing, scanning, typing & assisted online portals',
    targetPage: 'cyber',
  },
  {
    id: 'slide-barber',
    src: '/src/assets/images/barber_haircut_grooming_1795528341580.jpg',
    alt: 'Skilled Kenyan barber giving a clean fade haircut in a bright modern barbershop',
    label: 'Barber Services',
    caption: 'Precision fades, classic cuts, beard trims & hot towel grooming',
    targetPage: 'barber',
  },
  {
    id: 'slide-hotel',
    src: '/src/assets/images/highway_hotel_dining_1795528344272.jpg',
    alt: 'Welcoming highway hotel dining room with freshly prepared Kenyan dishes along the roadside',
    label: 'Junction Highway Hotel',
    caption: 'Fresh Kenyan meals, hot tea & clean roadside guest rooms',
    targetPage: 'hotel',
  },
  {
    id: 'slide-carwash',
    src: '/src/assets/images/car_wash_exterior_foam_1795529395014.jpg',
    alt: 'Roadside car wash bay in Homa Bay with snow foam SUV pressure washing in natural daylight',
    label: 'Car Wash Services',
    caption: 'Snow foam wash, interior vacuuming, engine rinse & bodaboda care',
    targetPage: 'carwash',
  },
];

export const EXTERIOR_IMAGE = {
  src: '/src/assets/images/junction_roadside_exterior_1795528067474.jpg',
  alt: 'Roadside storefront of The Junction Hub in Junction-Kodoyo, Homa Bay County, Kenya',
};

export const SERVICE_PAGES: Record<ServicePageId, ServicePageConfig> = {
  laundry: {
    id: 'laundry',
    navLabel: 'Laundry',
    departmentNumber: 'Laundry Department',
    title: 'Laundry Services',
    subtitle: 'Spotless wash, steam press, duvet cleaning, and express turnaround',
    description:
      'From everyday clothing and colourful kitenge fabrics to heavy household duvets and bulk baskets, our laundry team handles every load with care along the Homa Bay–Rongo Road.',
    heroImage: {
      id: 'laundry-hero',
      src: '/src/assets/images/colorful_laundry_baskets_1795528067141.jpg',
      alt: 'Neatly folded colorful clothes and woven baskets beside stainless steel washing machines',
      label: 'Sorted Wash & Fold',
      caption: 'Gentle detergents and colour-separated loads for lasting fabric life',
    },
    galleryImages: [
      {
        id: 'l-1',
        src: '/src/assets/images/colorful_laundry_baskets_1795528067141.jpg',
        alt: 'Colorful folded fabrics and towels beside front-load washers',
        label: 'Colour-Sorted Care',
        caption: 'Everyday clothes, kitenge, and towels separated before washing.',
      },
      {
        id: 'l-2',
        src: '/src/assets/images/laundry_care_service_1795527710214.jpg',
        alt: 'Commercial front-loading washers and pressed white shirts',
        label: 'Commercial Washers',
        caption: 'High-capacity machines for thorough cleaning and spin drying.',
      },
      {
        id: 'l-3',
        src: '/src/assets/images/steam_ironing_station_1795528068201.jpg',
        alt: 'Laundry specialist steam ironing striped dress shirts in morning sun',
        label: 'Steam Pressing',
        caption: 'Crisp ironing for work shirts, trousers, and uniforms.',
      },
      {
        id: 'l-4',
        src: '/src/assets/images/gallery_duvet_folding_1795527711841.jpg',
        alt: 'Freshly wrapped duvet and pressed shirts on oak counter',
        label: 'Duvet Packaging',
        caption: 'Clean protective wrapping so bedding stays fresh until pickup.',
      },
    ],
    theme: {
      badgeText: 'text-sky-300',
      sectionBg: 'bg-sky-50/75',
      sectionBorder: 'border-sky-200',
      accentButton: 'bg-sky-600 hover:bg-sky-700 text-white',
      accentText: 'text-sky-700',
      cardTint: 'bg-white/80 border-sky-200',
    },
    services: [
      {
        id: 'washing',
        number: '01',
        title: 'Clothes Washing',
        description:
          'Careful sorting by colour and fabric type with gentle detergents for everyday wear, kitenge, uniforms, and work attire.',
        turnaround: 'Standard & same-day options',
        rateNote: 'Enquire for per-load rate',
        details: [
          'Whites, darks, and bright kitenge fabrics washed in separate cycles',
          'Pre-wash spot attention for collars, cuffs, and everyday stains',
          'Fresh rinse and hygienic spin drying',
        ],
        accentTone: 'teal',
      },
      {
        id: 'ironing',
        number: '02',
        title: 'Clothes Ironing',
        description:
          'Crisp steam pressing for office shirts, trousers, school uniforms, and delicate garments ready to wear.',
        turnaround: 'Ready on hanger or folded',
        rateNote: 'Enquire for item pricing',
        details: [
          'Temperature-matched steam pressing for cotton, linen, and blends',
          'Available on hangers or neatly folded for travel bags',
          'Ideal for weekly office wear and Sunday attire',
        ],
        accentTone: 'sky',
      },
      {
        id: 'folding',
        number: '03',
        title: 'Folding & Packaging',
        description:
          'Neat garment folding and protective clean-wrap packaging so clothes stay fresh on your journey home.',
        turnaround: 'Included or standalone care',
        rateNote: 'Confirm package options',
        details: [
          'Neatly stacked by outfit or family member for easy unpacking',
          'Dust-protected clear wrapping for roadside travel',
          'Optional standalone folding and packing service',
        ],
        accentTone: 'emerald',
      },
      {
        id: 'duvets',
        number: '04',
        title: 'Bedding & Duvet Cleaning',
        description:
          'Deep wash and thorough drying for heavy duvets, blankets, bedsheets, curtains, and household linens.',
        turnaround: '24–48 hour turnaround',
        rateNote: 'Quoted by size & weight',
        details: [
          'Single, double, king-size duvets, and heavy blankets accepted',
          'Deep rinse to remove trapped dust and restore loft',
          'Protected packaging ready for storage or immediate bed use',
        ],
        accentTone: 'blue',
      },
      {
        id: 'bulk',
        number: '05',
        title: 'Bulk Laundry Services',
        description:
          'Scheduled basket and bulk volume laundry for busy households, students, guesthouses, and local businesses.',
        turnaround: 'Flexible scheduled pickup',
        rateNote: 'Custom volume quote',
        details: [
          'Weekly family and student laundry basket plans',
          'Hospitality, salon towel, and lodge linen support',
          'Counted item tagging at drop-off for full peace of mind',
        ],
        accentTone: 'amber',
      },
      {
        id: 'express',
        number: '06',
        title: 'Express Laundry Services',
        description:
          'Priority wash, dry, and press handling for travellers and urgent same-day garment turnaround needs.',
        turnaround: 'Priority same-day service',
        rateNote: 'Confirm availability by phone',
        details: [
          'Fast-track queue for urgent meetings, travel, or events',
          'Combine with a meal at Junction Highway Hotel while you wait',
          'Call ahead on +254 766 768617 to reserve an express slot',
        ],
        accentTone: 'indigo',
      },
    ],
    processTitle: 'How Laundry Drop-Off Works',
    processSubtitle: 'Simple 4-step garment care along the Homa Bay–Rongo Road.',
    processSteps: [
      {
        step: '01',
        title: 'Drop-Off & Sorting',
        detail: 'Bring garments or duvets to the Junction-Kodoyo counter for inspection and colour sorting.',
      },
      {
        step: '02',
        title: 'Wash & Fabric Care',
        detail: 'Each load is washed with fabric-appropriate settings and fresh detergents.',
      },
      {
        step: '03',
        title: 'Dry, Press & Pack',
        detail: 'Clothes are thoroughly dried, steam-ironed where requested, and folded cleanly.',
      },
      {
        step: '04',
        title: 'Ready Notification',
        detail: 'Receive a quick phone or WhatsApp alert when your clean bundle is ready.',
      },
    ],
    whatsappPrefill:
      'Hello The Junction Hub, I would like to enquire about Laundry Services and pricing.',
  },

  cyber: {
    id: 'cyber',
    navLabel: 'Cyber Café',
    departmentNumber: 'Cyber & Digital Desk',
    title: 'Cyber Services',
    subtitle: 'Printing, scanning, typing, internet access, and online portal help',
    description:
      'Equipped for students, professionals, small businesses, and walk-in travellers needing reliable desktop computers, crisp colour printing, document scanning, and patient digital assistance.',
    heroImage: {
      id: 'cyber-hero',
      src: '/src/assets/images/cyber_digital_assistance_1795528069188.jpg',
      alt: 'Cyber café attendant helping a student review colour printed charts at a desktop monitor',
      label: 'Assisted Digital & Print Desk',
      caption: 'Hands-on support for documents, eCitizen, HELB, KRA, and business forms',
    },
    galleryImages: [
      {
        id: 'c-1',
        src: '/src/assets/images/cyber_digital_assistance_1795528069188.jpg',
        alt: 'Attendant helping student review charts on screen and print',
        label: 'Guided Digital Help',
        caption: 'Friendly counter assistance with portals, forms, and school projects.',
      },
      {
        id: 'c-2',
        src: '/src/assets/images/cyber_cafe_workstations_1795527711333.jpg',
        alt: 'Bright row of desktop workstations and office printer',
        label: 'Desktop Workstations',
        caption: 'Comfortable, well-lit computer stations for browsing and study.',
      },
      {
        id: 'c-3',
        src: '/src/assets/images/gallery_document_printing_1795527711859.jpg',
        alt: 'Crisp printed academic reports beside multifunction laser printer',
        label: 'Laser Print & Scan',
        caption: 'Sharp monochrome and full-colour printing plus flatbed scanning.',
      },
      {
        id: 'c-4',
        src: '/src/assets/images/hero_junction_hub_1795527709551.jpg',
        alt: 'Full view of cyber workstations inside the hub',
        label: 'Quiet Workspace',
        caption: 'Stay productive while your laundry runs or while stopping along the highway.',
      },
    ],
    theme: {
      badgeText: 'text-sky-300',
      sectionBg: 'bg-slate-900 text-slate-100',
      sectionBorder: 'border-slate-800',
      accentButton: 'bg-amber-400 hover:bg-amber-300 text-slate-950',
      accentText: 'text-sky-400',
      cardTint: 'bg-slate-800/70 border-slate-700/90 text-slate-100',
    },
    services: [
      {
        id: 'printing',
        number: '01',
        title: 'Document Printing',
        description:
          'Clear black-and-white and full-colour printing for assignments, business proposals, receipts, and official forms.',
        turnaround: 'Walk-in & WhatsApp file print',
        rateNote: 'Enquire per-page rate',
        details: [
          'Send PDFs or Word files via WhatsApp or USB for fast printing',
          'Crisp A4 black-and-white and full-colour laser output',
          'Discounts available for multi-page student & bulk print jobs',
        ],
        accentTone: 'sky',
      },
      {
        id: 'photocopying',
        number: '02',
        title: 'Photocopying',
        description:
          'Fast single-sided and double-sided copying for IDs, academic transcripts, booklets, and office paperwork.',
        turnaround: 'Instant counter service',
        rateNote: 'Bulk copy rates available',
        details: [
          'Clear ID card, certificate, and passport page copying',
          'Single and duplex (double-sided) document runs',
          'Immediate counter turnaround with zero waiting queues',
        ],
        accentTone: 'teal',
      },
      {
        id: 'scanning',
        number: '03',
        title: 'Document Scanning',
        description:
          'High-resolution PDF and image scanning sent straight to your email, flash drive, or WhatsApp.',
        turnaround: 'Immediate digital delivery',
        rateNote: 'Per-page service',
        details: [
          'Multi-page PDF merging for job and scholarship applications',
          'File size optimization for government and university portals',
          'Direct delivery to your email, phone, or USB drive',
        ],
        accentTone: 'emerald',
      },
      {
        id: 'typing',
        number: '04',
        title: 'Typing & Document Formatting',
        description:
          'Accurate typing, CV layout, letters, school projects, and clean spreadsheet or report formatting.',
        turnaround: 'Same-day turnaround',
        rateNote: 'Quoted by document length',
        details: [
          'Professional CV drafting, cover letters, and official correspondence',
          'Academic project typesetting, tables, and cover pages',
          'Proofread formatting ready for print or email submission',
        ],
        accentTone: 'amber',
      },
      {
        id: 'internet',
        number: '05',
        title: 'Internet & Computer Access',
        description:
          'Reliable desktop workstations with internet access for research, email, coursework, and remote work.',
        turnaround: 'Timed & open sessions',
        rateNote: 'Confirm session rates',
        details: [
          'High-speed browsing for research, portals, and downloads',
          'Clean ergonomic desks with natural window lighting',
          'Printing and scanning available right beside every workstation',
        ],
        accentTone: 'blue',
      },
      {
        id: 'applications',
        number: '06',
        title: 'Online Applications & Digital Help',
        description:
          'Guided digital assistance for eCitizen services, KRA, HELB, university portals, and online form submissions.',
        turnaround: 'Assisted workstation support',
        rateNote: 'Enquire at the cyber desk',
        details: [
          'Step-by-step help with eCitizen, KRA iTax, NSSF, SHA & NTSA portals',
          'HELB, KUCCPS, college admissions, and job portal uploads',
          'Immediate printout of confirmation slips and receipts',
        ],
        accentTone: 'indigo',
      },
    ],
    processTitle: 'Quick Digital Workflow',
    processSubtitle: 'Walk in or send your document ahead on WhatsApp.',
    processSteps: [
      {
        step: '01',
        title: 'Share or Sit In',
        detail: 'Bring a flash drive, paper original, or send files ahead via WhatsApp.',
      },
      {
        step: '02',
        title: 'Review & Format',
        detail: 'Check layout, colours, or online portal details with our cyber desk attendant.',
      },
      {
        step: '03',
        title: 'Print, Scan or Submit',
        detail: 'Receive sharp printed copies, merged PDFs, or verified portal confirmations.',
      },
      {
        step: '04',
        title: 'Save & Go',
        detail: 'Take your documents cleanly packaged—and pick up your laundry or lunch next door.',
      },
    ],
    whatsappPrefill:
      'Hello The Junction Hub, I would like to send a document or enquire about Cyber Services.',
  },

  barber: {
    id: 'barber',
    navLabel: 'Barber',
    departmentNumber: 'Barber Studio',
    title: 'Barber Services',
    subtitle: 'Sharp fades, classic trims, beard grooming, and clean hygiene',
    description:
      'Step out looking fresh. Our barbershop at Junction-Kodoyo delivers clean haircuts, crisp line-ups, beard sculpting, and relaxing hot towel finishes in a bright, sanitized grooming space.',
    heroImage: {
      id: 'barber-hero',
      src: '/src/assets/images/barber_shop_interior_1795528341940.jpg',
      alt: 'Modern East African barbershop interior with leather chairs, wall mirrors, and timber grooming stations',
      label: 'Modern Grooming Studio',
      caption: 'Sanitized tools, comfortable chairs, and crisp attention to detail',
    },
    galleryImages: [
      {
        id: 'b-1',
        src: '/src/assets/images/barber_shop_interior_1795528341940.jpg',
        alt: 'Clean modern barbershop interior with two chairs and wall mirrors',
        label: 'Barber Studio Floor',
        caption: 'Bright, airy stations kept spotless between every client.',
      },
      {
        id: 'b-2',
        src: '/src/assets/images/barber_haircut_grooming_1795528341580.jpg',
        alt: 'Skilled Kenyan barber giving a clean fade haircut to a client',
        label: 'Precision Cuts & Fades',
        caption: 'Skin fades, tapers, waves, and classic cuts tailored to your style.',
      },
    ],
    theme: {
      badgeText: 'text-amber-300',
      sectionBg: 'bg-amber-50/45',
      sectionBorder: 'border-amber-200/80',
      accentButton: 'bg-amber-700 hover:bg-amber-800 text-white',
      accentText: 'text-amber-800',
      cardTint: 'bg-white border-amber-200/80',
    },
    services: [
      {
        id: 'fade-cut',
        number: '01',
        title: 'Signature Fades & Taper Cuts',
        description:
          'Clean skin fades, mid/low tapers, and sharp hairline detailing tailored to your head shape and preference.',
        turnaround: '25–35 min session',
        rateNote: 'Enquire walk-in rate',
        details: [
          'Smooth blending from skin or low guard up to desired top length',
          'Crisp razor or trimmer line-up with soothing aftershave care',
          'Sanitized clippers and fresh blades for every customer',
        ],
        accentTone: 'amber',
      },
      {
        id: 'classic-trim',
        number: '02',
        title: 'Classic Scissor & Executive Cut',
        description:
          'Neat, timeless executive trims for professionals, community leaders, and everyday smart grooming.',
        turnaround: '20–30 min session',
        rateNote: 'Enquire walk-in rate',
        details: [
          'Even clipper-and-comb shaping for natural texture',
          'Clean ear, neck, and sideburn finish',
          'Quick rinse and styling refresh available',
        ],
        accentTone: 'teal',
      },
      {
        id: 'beard-grooming',
        number: '03',
        title: 'Beard Trim & Shape-Up',
        description:
          'Balanced beard sculpting, moustache neatening, and sharp cheek/neck lines for a clean look.',
        turnaround: '15–20 min session',
        rateNote: 'Standalone or combo rate',
        details: [
          'Precision guard shaping for short or full beards',
          'Clean razor line definition along cheeks and jawline',
          'Hydrating beard oil or balm finish',
        ],
        accentTone: 'blue',
      },
      {
        id: 'hot-towel',
        number: '04',
        title: 'Hot Towel Shave & Facial Refresh',
        description:
          'Relaxing warm towel preparation for a smooth, irritation-free shave—ideal for roadside travellers.',
        turnaround: '20–25 min session',
        rateNote: 'Confirm at barber counter',
        details: [
          'Warm steamed towel softens facial hair and opens pores',
          'Gentle lather shave followed by cool soothing towel',
          'Leaves skin refreshed after long travel along Homa Bay–Rongo Road',
        ],
        accentTone: 'emerald',
      },
      {
        id: 'kids-students',
        number: '05',
        title: 'School & Youth Haircuts',
        description:
          'Patient, friendly, and neat school-regulation cuts and weekend trims for boys and students.',
        turnaround: '15–20 min session',
        rateNote: 'Student-friendly rates',
        details: [
          'Clean school-compliant cuts and tidy line-ups',
          'Calm, attentive barbers in a bright family-safe space',
          'Fast weekday and Sunday availability',
        ],
        accentTone: 'sky',
      },
      {
        id: 'dye-styling',
        number: '06',
        title: 'Hair Wash, Dye & Scalp Care',
        description:
          'Refreshing shampoo wash, black hair dye touch-ups, and clean scalp conditioning treatments.',
        turnaround: '20–40 min session',
        rateNote: 'Quoted by treatment',
        details: [
          'Deep scalp cleanse to remove dust and product buildup',
          'Natural-looking black dye application and sharp hairline set',
          'Moisturizing scalp finish',
        ],
        accentTone: 'indigo',
      },
    ],
    processTitle: 'Grooming Experience',
    processSubtitle: 'Walk-in chairs and advance phone bookings welcome.',
    processSteps: [
      {
        step: '01',
        title: 'Walk In or Book',
        detail: 'Stop by Junction-Kodoyo or message +254 766 768617 to check chair availability.',
      },
      {
        step: '02',
        title: 'Style Consultation',
        detail: 'Share your preferred fade height, guard length, and beard shape with your barber.',
      },
      {
        step: '03',
        title: 'Sanitized Precision Cut',
        detail: 'Enjoy a clean cut using sterilized clippers, fresh blades, and careful detailing.',
      },
      {
        step: '04',
        title: 'Finish & Refresh',
        detail: 'Brush-down, cooling aftershave, and mirror check before heading back on the road.',
      },
    ],
    whatsappPrefill:
      'Hello The Junction Hub, I would like to book or enquire about Barber Services.',
  },

  hotel: {
    id: 'hotel',
    navLabel: 'Highway Hotel',
    departmentNumber: 'Hospitality & Dining',
    title: 'Junction Highway Hotel',
    subtitle: 'Fresh Kenyan meals, hot tea, roadside dining, and restful guest rooms',
    description:
      'Conveniently positioned right along the Homa Bay–Rongo Road, Junction Highway Hotel welcomes local diners, professionals, and travellers with freshly cooked Kenyan dishes, hot chai, and clean, quiet rooms for overnight stays or refreshing rest stops.',
    heroImage: {
      id: 'hotel-hero',
      src: '/src/assets/images/highway_hotel_dining_1795528344272.jpg',
      alt: 'Warm modern Kenyan highway hotel dining room with wooden tables and freshly plated local meals',
      label: 'Roadside Dining & Hospitality',
      caption: 'Fresh meals, Kenyan tea, and comfortable rooms right on Homa Bay–Rongo Road',
    },
    galleryImages: [
      {
        id: 'h-1',
        src: '/src/assets/images/highway_hotel_dining_1795528344272.jpg',
        alt: 'Sunlit Kenyan highway hotel dining room with guests enjoying meals',
        label: 'Main Dining Hall',
        caption: 'Warm timber tables, crisp cleanliness, and view of the highway corridor.',
      },
      {
        id: 'h-2',
        src: '/src/assets/images/highway_hotel_hospitality_1795528342256.jpg',
        alt: 'Spotless modern guest room with white linens and woven terracotta throw',
        label: 'Guest Accommodation',
        caption: 'Quiet, airy rooms with fresh linens cared for by our on-site laundry.',
      },
    ],
    theme: {
      badgeText: 'text-emerald-300',
      sectionBg: 'bg-emerald-50/45',
      sectionBorder: 'border-emerald-200/80',
      accentButton: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      accentText: 'text-emerald-800',
      cardTint: 'bg-white border-emerald-200/80',
    },
    services: [
      {
        id: 'breakfast-chai',
        number: '01',
        title: 'Breakfast & Kenyan Tea Counter',
        description:
          'Early-morning spiced Kenyan chai, coffee, fresh chapati, mandazi, eggs, and hearty breakfast plates from 7:00 AM.',
        turnaround: 'Served from 7:00 AM',
        rateNote: 'Daily menu at counter',
        details: [
          'Hot Kenyan milk tea, black tea, and brewed coffee',
          'Freshly made chapati, mandazi, samosas, and breakfast combos',
          'Fast counter service for morning commuters and bus travellers',
        ],
        accentTone: 'amber',
      },
      {
        id: 'local-meals',
        number: '02',
        title: 'Freshly Prepared Kenyan Meals',
        description:
          'Wholesome lunch and dinner plates including ugali, rice, beef stew, grilled tilapia/fish, chicken, greens, and beans.',
        turnaround: 'Dine-in & takeaway packs',
        rateNote: 'Confirm daily specials',
        details: [
          'Freshly cooked regional staples served hot throughout the day',
          'Generous portions for individuals, families, and work teams',
          'Clean takeaway packaging for onward road journeys',
        ],
        accentTone: 'emerald',
      },
      {
        id: 'guest-rooms',
        number: '03',
        title: 'Clean Guest Rooms & Overnight Stays',
        description:
          'Quiet, comfortable private rooms with crisp freshly laundered bedding for travellers and visiting guests in Homa Bay County.',
        turnaround: 'Day rest & overnight stays',
        rateNote: 'Enquire room availability',
        details: [
          'Freshly laundered sheets and towels serviced daily on-site',
          'Clean en-suite washrooms, comfortable beds, and bright ventilation',
          'Direct access to laundry, barber, and cyber services downstairs',
        ],
        accentTone: 'teal',
      },
      {
        id: 'takeaway-snacks',
        number: '04',
        title: 'Highway Snacks & Cold Refreshments',
        description:
          'Quick roadside bites, bottled water, sodas, and fresh juices for travellers passing through Junction-Kodoyo.',
        turnaround: 'Grab-and-go counter',
        rateNote: 'Walk-in counter prices',
        details: [
          'Chilled soft drinks, bottled water, and fresh refreshments',
          'Quick warm pastries and packaged snacks for the road',
          'Easy roadside pull-in access along Homa Bay–Rongo Road',
        ],
        accentTone: 'sky',
      },
      {
        id: 'group-catering',
        number: '05',
        title: 'Group & Meeting Lunches',
        description:
          'Pre-arranged meal trays and seated dining for community groups, work crews, and travelling teams.',
        turnaround: 'Advance booking recommended',
        rateNote: 'Custom group quote',
        details: [
          'Coordinated meal timing so groups are served promptly together',
          'Flexible plate options tailored to your team budget',
          'Call ahead on +254 766 768617 to reserve tables or packs',
        ],
        accentTone: 'blue',
      },
      {
        id: 'hub-bundle',
        number: '06',
        title: 'Dine While You Wait Bundle',
        description:
          'Enjoy a hot meal or tea at Junction Highway Hotel while your clothes are washed or your haircut and printing finish.',
        turnaround: 'Seamless one-stop visit',
        rateNote: 'Ask staff on arrival',
        details: [
          'Drop off laundry or printing next door and relax at a dining table',
          'Staff notify you as soon as your garments or documents are ready',
          'Maximum convenience in a single stop at Junction-Kodoyo',
        ],
        accentTone: 'indigo',
      },
    ],
    processTitle: 'Dining & Stay Convenience',
    processSubtitle: 'Hospitality designed around comfort along the Homa Bay–Rongo Road.',
    processSteps: [
      {
        step: '01',
        title: 'Walk In or Reserve',
        detail: 'Stop by for dining anytime or call +254 766 768617 to check room availability.',
      },
      {
        step: '02',
        title: 'Freshly Prepared Order',
        detail: 'Choose from hot tea, freshly cooked Kenyan meals, or quick highway refreshments.',
      },
      {
        step: '03',
        title: 'Combine Hub Errands',
        detail: 'Take advantage of laundry, barber, and cyber services steps away while you dine or rest.',
      },
      {
        step: '04',
        title: 'Refreshed Departure',
        detail: 'Head back onto the Homa Bay–Rongo Road well-fed, rested, and organized.',
      },
    ],
    whatsappPrefill:
      'Hello The Junction Hub, I would like to enquire about meals or room availability at Junction Highway Hotel.',
  },

  carwash: {
    id: 'carwash',
    navLabel: 'Car Wash',
    departmentNumber: 'Car Wash Bay',
    title: 'Car Wash Services',
    subtitle: 'Snow foam exterior wash, interior vacuuming, engine rinse & detailing',
    description:
      'Keep your vehicle spotless right along the Homa Bay–Rongo Road. Our car wash bay serves personal saloon cars, SUVs, vans, and motorcycles with high-pressure foam washes, thorough interior vacuuming, and convenient wait-and-dine comfort.',
    heroImage: {
      id: 'carwash-hero',
      src: '/src/assets/images/car_wash_exterior_foam_1795529395014.jpg',
      alt: 'Roadside car wash bay pressure washing a silver SUV covered in snow foam in bright morning sun',
      label: 'High-Pressure Foam Wash Bay',
      caption: 'Gentle snow foam, spotless wheel arches, and roadside drive-in access',
    },
    galleryImages: [
      {
        id: 'cw-1',
        src: '/src/assets/images/car_wash_exterior_foam_1795529395014.jpg',
        alt: 'Attendant pressure washing a silver SUV covered in white foam along the highway bay',
        label: 'Exterior Snow Foam',
        caption: 'High-pressure pre-rinse and rich snow foam safe for modern paintwork.',
      },
      {
        id: 'cw-2',
        src: '/src/assets/images/car_wash_interior_detail_1795529395602.jpg',
        alt: 'Car wash specialist wiping dashboard and leather seats with microfiber cloth',
        label: 'Interior & Dashboard Detail',
        caption: 'Thorough cabin vacuuming, floor mats wash, and non-greasy dashboard care.',
      },
      {
        id: 'cw-3',
        src: '/src/assets/images/junction_roadside_exterior_1795528067474.jpg',
        alt: 'Wide paved pull-in apron along the Homa Bay–Rongo Road',
        label: 'Easy Roadside Pull-In',
        caption: 'Step inside for hot tea, laundry pickup, or a haircut while your car is washed.',
      },
    ],
    theme: {
      badgeText: 'text-sky-300',
      sectionBg: 'bg-sky-50/75',
      sectionBorder: 'border-sky-200',
      accentButton: 'bg-sky-600 hover:bg-sky-700 text-white',
      accentText: 'text-sky-700',
      cardTint: 'bg-white border-sky-200',
    },
    services: [
      {
        id: 'exterior-foam',
        number: '01',
        title: 'Exterior Foam & Pressure Wash',
        description:
          'High-pressure mud and dust removal followed by snow foam wash, microfiber hand mitt scrub, and streak-free chamois dry.',
        turnaround: '25–35 min service',
        rateNote: 'By vehicle size',
        details: [
          'Safe under-wheel arch and mud-flap pressure rinsing after wet highway drives',
          'Scratch-free two-bucket microfiber wash and clean chamois drying',
          'Crystal-clear windscreen and side mirror wipe-down',
        ],
        accentTone: 'sky',
      },
      {
        id: 'interior-vacuum',
        number: '02',
        title: 'Interior Vacuum & Cabin Clean',
        description:
          'Deep cabin vacuuming of carpets, seats, and boot space plus mat washing and dust-free dashboard conditioning.',
        turnaround: '20–30 min service',
        rateNote: 'Full wash or interior only',
        details: [
          'Seat crevices, door pockets, and boot vacuumed thoroughly',
          'Rubber and fabric floor mats scrubbed, rinsed, and air-dried',
          'Air vents, console, and door panels wiped with fresh microfiber cloths',
        ],
        accentTone: 'teal',
      },
      {
        id: 'engine-undercarriage',
        number: '03',
        title: 'Engine Bay & Undercarriage Rinse',
        description:
          'Careful degreasing and controlled pressure cleaning to keep chassis rails and engine bays free of red road dust.',
        turnaround: '30–40 min service',
        rateNote: 'Enquire at wash bay',
        details: [
          'Protected rinse avoiding sensitive electrical connectors',
          'Removes caked highway mud from underbody and suspension areas',
          'Clean matte finish on engine plastics and hoses',
        ],
        accentTone: 'blue',
      },
      {
        id: 'wax-tyre',
        number: '04',
        title: 'Body Wax & Tyre Shine',
        description:
          'Protective hand wax polish for UV sun protection alongside deep black rim and tyre dressing.',
        turnaround: '35–45 min add-on',
        rateNote: 'Quoted per vehicle',
        details: [
          'Alloy rim brake-dust clean and long-lasting satin tyre shine',
          'Hand-buffed paint wax for glossy water-beading protection',
          'Ideal preparation before weddings, events, or road trips',
        ],
        accentTone: 'amber',
      },
      {
        id: 'bodaboda-wash',
        number: '05',
        title: 'Bodaboda & Motorcycle Wash',
        description:
          'Fast, thorough pressure wash and chain-safe rinse for commuter motorcycles, scooters, and tuktuks.',
        turnaround: '15 min quick wash',
        rateNote: 'Walk-in rider rates',
        details: [
          'Quick mud and dust removal from spokes, fenders, and engine fins',
          'Seat wipe-down and bright headlamp clean',
          'Fast turnaround so riders get right back on the road',
        ],
        accentTone: 'emerald',
      },
      {
        id: 'wash-and-wait',
        number: '06',
        title: 'Wash While You Dine or Wait',
        description:
          'Relax at Junction Highway Hotel for Kenyan chai or lunch—or visit our barber or cyber desk—while your vehicle shines.',
        turnaround: 'Seamless one-stop visit',
        rateNote: 'Ask bay attendant',
        details: [
          'Bay team notifies you inside the hotel or hub once keys are ready',
          'Shaded drop-off area right off the Homa Bay–Rongo Road',
          'Combine weekly car wash with garment laundry pickup',
        ],
        accentTone: 'indigo',
      },
    ],
    processTitle: 'Car Wash Care Flow',
    processSubtitle: 'Drive in off the Homa Bay–Rongo Road with zero hassle.',
    processSteps: [
      {
        step: '01',
        title: 'Drive In & Select Package',
        detail: 'Pull straight into our Junction-Kodoyo wash bay for exterior, full valet, or bike wash.',
      },
      {
        step: '02',
        title: 'Pressure Rinse & Snow Foam',
        detail: 'Road dust and mud are loosened cleanly before gentle microfiber hand washing.',
      },
      {
        step: '03',
        title: 'Interior Vacuum & Detailing',
        detail: 'Cabin carpets, seats, mats, and glass are detailed while you relax at the hub.',
      },
      {
        step: '04',
        title: 'Final Inspection & Keys',
        detail: 'Walk around the finished vehicle with our attendant before heading back onto the highway.',
      },
    ],
    whatsappPrefill:
      'Hello The Junction Hub, I would like to enquire about Car Wash Services and pricing.',
  },
};

export const TARGET_GROUPS = [
  {
    title: 'Local Residents',
    detail:
      'Everyday laundry, neat haircuts, family dining, and neighbourhood document printing close to home.',
    accent: 'text-teal-700',
    surface: 'bg-teal-50/60 border-teal-200/80',
  },
  {
    title: 'Students',
    detail:
      'Reliable typing, assignment printing, portal applications, sharp haircuts, and affordable laundry.',
    accent: 'text-blue-700',
    surface: 'bg-sky-50/70 border-sky-200/80',
  },
  {
    title: 'Professionals & SMEs',
    detail:
      'Crisp shirt pressing, clean executive cuts, lunch breaks, and fast document formatting or scans.',
    accent: 'text-amber-700',
    surface: 'bg-amber-50/60 border-amber-200/80',
  },
  {
    title: 'Homa Bay–Rongo Travellers',
    detail:
      'Roadside meals, overnight rooms, hot towel refresh, express laundry, and urgent document stops.',
    accent: 'text-emerald-700',
    surface: 'bg-emerald-50/60 border-emerald-200/80',
  },
];

export const OPERATING_HOURS: OperatingHour[] = [
  {day: 'Monday', hours: '7:00 AM – 8:00 PM', confirmed: true},
  {day: 'Tuesday', hours: '7:00 AM – 8:00 PM', confirmed: true},
  {day: 'Wednesday', hours: '7:00 AM – 8:00 PM', confirmed: true},
  {day: 'Thursday', hours: '7:00 AM – 8:30 PM', confirmed: true},
  {day: 'Friday', hours: '7:00 AM – 8:00 PM', confirmed: true},
  {day: 'Saturday', hours: 'To be confirmed', confirmed: false},
  {day: 'Sunday', hours: '8:00 AM – 8:00 PM', confirmed: true},
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'car-wash-bay',
    src: '/src/assets/images/car_wash_exterior_foam_1795529395014.jpg',
    alt: 'Snow foam exterior car wash of a silver SUV at the roadside bay',
    category: 'carwash',
    categoryLabel: 'Car Wash',
    title: 'Roadside Car Wash & Foam Bay',
    caption:
      'High-pressure snow foam washes for saloon cars, SUVs, vans, and motorcycles along Homa Bay–Rongo Road.',
  },
  {
    id: 'car-interior-detail',
    src: '/src/assets/images/car_wash_interior_detail_1795529395602.jpg',
    alt: 'Car wash specialist detailing a dark leather cabin and dashboard',
    category: 'carwash',
    categoryLabel: 'Car Wash',
    title: 'Cabin Vacuum & Interior Care',
    caption:
      'Deep interior vacuuming, dashboard wiping, and spotless floor mat finishing.',
  },
  {
    id: 'roadside-exterior',
    src: '/src/assets/images/junction_roadside_exterior_1795528067474.jpg',
    alt: 'Daytime exterior of the hub along the Homa Bay–Rongo Road',
    category: 'hub',
    categoryLabel: 'Hub Exterior',
    title: 'Junction-Kodoyo Roadside Frontage',
    caption:
      'Welcoming roadside visibility and walk-in access along the Homa Bay–Rongo Road corridor.',
  },
  {
    id: 'highway-hotel-dining',
    src: '/src/assets/images/highway_hotel_dining_1795528344272.jpg',
    alt: 'Modern Kenyan highway hotel dining room along the roadside',
    category: 'hotel',
    categoryLabel: 'Highway Hotel',
    title: 'Junction Highway Hotel Dining Hall',
    caption:
      'Freshly cooked Kenyan meals, spiced chai, and sunlit wooden dining tables overlooking the highway.',
  },
  {
    id: 'barber-interior',
    src: '/src/assets/images/barber_shop_interior_1795528341940.jpg',
    alt: 'Clean modern barbershop interior with leather chairs and mirrors',
    category: 'barber',
    categoryLabel: 'Barber Shop',
    title: 'Barber Studio & Grooming Chairs',
    caption:
      'Spotless grooming stations with full-length mirrors and sanitized clippers.',
  },
  {
    id: 'colorful-laundry',
    src: '/src/assets/images/colorful_laundry_baskets_1795528067141.jpg',
    alt: 'Colorful kitenge fabrics and folded clothes stacked in baskets beside washing machines',
    category: 'laundry',
    categoryLabel: 'Laundry Care',
    title: 'Colour-Sorted Wash & Fold',
    caption:
      'Careful sorting of bright East African fabrics, cottons, and household towels.',
  },
  {
    id: 'cyber-assistance',
    src: '/src/assets/images/cyber_digital_assistance_1795528069188.jpg',
    alt: 'Cyber café attendant assisting a student with printed colour charts at a computer station',
    category: 'cyber',
    categoryLabel: 'Cyber & Print',
    title: 'Assisted Digital & Print Support',
    caption:
      'Friendly, patient counter support for students, documents, and online applications.',
  },
  {
    id: 'hotel-room',
    src: '/src/assets/images/highway_hotel_hospitality_1795528342256.jpg',
    alt: 'Clean bright guest room with crisp white sheets and woven terracotta throw',
    category: 'hotel',
    categoryLabel: 'Highway Hotel',
    title: 'Guest Room Accommodation',
    caption:
      'Quiet, airy rooms with fresh linens washed and pressed right at the hub.',
  },
  {
    id: 'barber-grooming',
    src: '/src/assets/images/barber_haircut_grooming_1795528341580.jpg',
    alt: 'Skilled Kenyan barber giving a crisp fade haircut in natural daylight',
    category: 'barber',
    categoryLabel: 'Barber Shop',
    title: 'Fade & Beard Detailing',
    caption:
      'Precision fades, neat school cuts, and hot towel shaves in a friendly setting.',
  },
  {
    id: 'hub-overview',
    src: '/src/assets/images/hero_junction_hub_1795527709551.jpg',
    alt: 'Main floor of The Junction Laundry And Services Hub with laundry machines and cyber café desks',
    category: 'hub',
    categoryLabel: 'Hub Interior',
    title: 'Dual-Service Hub Floor',
    caption:
      'Laundry equipment and cyber workstations organized side by side under one roof.',
  },
  {
    id: 'steam-ironing',
    src: '/src/assets/images/steam_ironing_station_1795528068201.jpg',
    alt: 'Steam-pressing colourful dress shirts in morning sunlight',
    category: 'laundry',
    categoryLabel: 'Laundry Care',
    title: 'Steam Pressing & Finishing',
    caption:
      'Crisp steam ironing for office shirts, school uniforms, and formal wear.',
  },
  {
    id: 'laundry-washers',
    src: '/src/assets/images/laundry_care_service_1795527710214.jpg',
    alt: 'Front-loading commercial washing machines and freshly pressed garments',
    category: 'laundry',
    categoryLabel: 'Laundry Care',
    title: 'Commercial Wash & Press',
    caption:
      'Dedicated front-load machines, crisp pressing, and clean sorting counters.',
  },
  {
    id: 'cyber-desks',
    src: '/src/assets/images/cyber_cafe_workstations_1795527711333.jpg',
    alt: 'Desktop workstations and office printer in the cyber café area',
    category: 'cyber',
    categoryLabel: 'Cyber & Print',
    title: 'Cyber Café Workstations',
    caption:
      'Bright desktop stations with high-speed printing and scanning access.',
  },
  {
    id: 'duvet-packaging',
    src: '/src/assets/images/gallery_duvet_folding_1795527711841.jpg',
    alt: 'Freshly ironed shirts and neatly packaged plush duvet on a wooden counter',
    category: 'laundry',
    categoryLabel: 'Laundry Care',
    title: 'Duvet & Garment Packaging',
    caption:
      'Protected folding and wrapping to keep bedding and shirts spotless until collection.',
  },
  {
    id: 'document-station',
    src: '/src/assets/images/gallery_document_printing_1795527711859.jpg',
    alt: 'Printed academic reports and multifunction laser printer at the digital desk',
    category: 'cyber',
    categoryLabel: 'Cyber & Print',
    title: 'Document Print & Bind Desk',
    caption:
      'Clean, sharp laser printing and document preparation for students and businesses.',
  },
];

export const HUB_TEAM: TeamMember[] = [
  {
    id: 'team-laundry',
    name: 'Wanjiku M.',
    role: 'Laundry & Garment Care Lead',
    department: 'Laundry Services',
    targetPage: 'laundry',
    image: '/src/assets/images/team_laundry_specialist_1795529644190.jpg',
    alt: 'Laundry specialist smiling while holding pressed shirts and folded colourful fabrics beside washing machines',
    whatTheyDo:
      'Oversees colour-sorted garment washing, heavy duvet deep cleaning, steam ironing, and protective folding.',
    duties: [
      'Inspects stains, collars, and delicate kitenge before sorting loads',
      'Runs high-capacity wash & spin cycles and crisp steam pressing',
      'Packages folded clothes and duvets with quick WhatsApp pickup alerts',
    ],
    serviceHighlight: 'Zero colour bleeding & crisp steam pressing',
    whyBestTitle: 'Why our laundry team leads along the Homa Bay–Rongo Road',
    whyBestPoints: [
      'Every basket is hand-sorted into whites, darks, and delicate East African kitenge before touching a drum',
      'Stubborn collar, cuff, and travel-dust stains receive targeted pre-treatment rather than harsh bleach',
      'Heavy family duvets are thoroughly dried and sealed in dust-free wraps so they arrive home fresh',
    ],
  },
  {
    id: 'team-cyber',
    name: 'Kevin O.',
    role: 'Cyber & Digital Support Lead',
    department: 'Cyber Services',
    targetPage: 'cyber',
    image: '/src/assets/images/team_cyber_attendant_1795529645617.jpg',
    alt: 'Cyber café attendant standing beside desktop workstations and laser printer with printed documents',
    whatTheyDo:
      'Assists students, businesses, and travellers with fast printing, PDF scanning, typing, and online government portals.',
    duties: [
      'Handles crisp monochrome and full-colour A4 document printing',
      'Formats CVs, academic reports, and scans multi-page PDF files',
      'Guides walk-ins step-by-step on eCitizen, KRA, HELB, and NTSA portals',
    ],
    serviceHighlight: 'Patient portal help & sharp colour laser print',
    whyBestTitle: 'Why customers rely on our cyber & digital desk',
    whyBestPoints: [
      'Hands-on, unhurried guidance for eCitizen, KRA iTax, HELB, and college admissions—even for first-time applicants',
      'Send documents ahead on WhatsApp so academic projects and forms are printed and ready on arrival',
      'Accurate PDF sizing and document merging that passes strict government portal upload limits on the first try',
    ],
  },
  {
    id: 'team-barber',
    name: 'Samuel K.',
    role: 'Master Barber & Grooming Stylist',
    department: 'Barber Services',
    targetPage: 'barber',
    image: '/src/assets/images/team_barber_stylist_1795529644725.jpg',
    alt: 'Master barber smiling beside a leather barber chair and mirror holding cordless clippers',
    whatTheyDo:
      'Delivers clean fades, executive scissor cuts, sharp beard line-ups, and soothing hot towel shaves.',
    duties: [
      'Performs skin fades, tapers, classic trims, and school haircuts',
      'Sculpts beards with crisp razor detailing and soothing aftershave',
      'Sanitizes all clippers, guards, and chairs thoroughly between guests',
    ],
    serviceHighlight: 'Sanitized tools & razor-sharp fade transitions',
    whyBestTitle: 'Why our barber studio earns repeat weekly clients',
    whyBestPoints: [
      'Strict hygiene protocol with thoroughly sanitized clippers, disinfected guards, and fresh blades for every chair session',
      'Consistent, smooth fade blending and razor-sharp hairlines tailored for executives, students, and school boys',
      'Relaxing steamed hot-towel facial refresh that leaves highway travellers looking sharp and rested',
    ],
  },
  {
    id: 'team-carwash',
    name: 'Dennis O.',
    role: 'Car Wash & Detailing Lead',
    department: 'Car Wash Services',
    targetPage: 'carwash',
    image: '/src/assets/images/team_carwash_specialist_1795529646249.jpg',
    alt: 'Car wash attendant smiling beside a gleaming washed SUV at the sunny roadside bay',
    whatTheyDo:
      'Leads high-pressure snow foam washes, wheel-arch mud rinsing, interior vacuuming, and motorcycle care.',
    duties: [
      'Pressure-rinses road dust and washes vehicles with gentle snow foam',
      'Vacuums carpets, boots, and leather seats plus washes floor mats',
      'Co-ordinates vehicle keys smoothly while drivers dine or shop inside',
    ],
    serviceHighlight: 'Paint-safe snow foam & red-dust underbody care',
    whyBestTitle: 'Why motorists & riders trust our car wash bay',
    whyBestPoints: [
      'Pre-rinse and rich snow foam lift abrasive Homa Bay–Rongo road grit before microfiber mitts touch your paintwork',
      'Targeted under-arch and undercarriage rinsing removes stubborn mud buildup without risking sensitive wiring',
      'Seamless wait-and-dine coordination—hand over your keys, enjoy hot tea at the hotel, and drive off gleaming',
    ],
  },
  {
    id: 'team-hotel',
    name: 'Joseph A.',
    role: 'Hospitality & Kitchen Lead',
    department: 'Junction Highway Hotel',
    targetPage: 'hotel',
    image: '/src/assets/images/team_hotel_chef_host_1795529646020.jpg',
    alt: 'Highway hotel host holding a woven tray of steaming Kenyan tea and freshly cooked meals',
    whatTheyDo:
      'Prepares fresh Kenyan breakfast, hot chai, wholesome meals, and readies clean guest rooms for travellers.',
    duties: [
      'Serves hot spiced Kenyan chai, chapati, ugali, stews, and fresh fish',
      'Maintains crisp dining tables and fast takeaway service for commuters',
      'Prepares quiet guest rooms stocked with hub-laundered white linens',
    ],
    serviceHighlight: 'Fresh daily Kenyan kitchen & hub-laundered rooms',
    whyBestTitle: 'Why travellers stop at Junction Highway Hotel',
    whyBestPoints: [
      'Meals cooked fresh from 7:00 AM daily—rich spiced chai, soft chapatis, ugali, stews, and Lake Victoria fish',
      'Fast, welcoming roadside table service built around bus schedules, work lunches, and family stopovers',
      'Every guest room features crisp sheets and towels laundered and pressed directly at our own on-site laundry',
    ],
  },
];

// Illustrative placeholder feedback per MVP guideline §10 until verified customer reviews are published.
export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Grace Achieng',
    role: 'Local Resident, Junction-Kodoyo (Sample Profile)',
    serviceUsed: 'Duvet Cleaning & Document Scanning',
    targetPage: 'laundry',
    quote:
      'Dropped off two family duvets on Monday morning and scanned school admission papers at the cyber counter during the same visit—saving an extra trip into town.',
    surfaceTint: 'bg-teal-50/50 border-teal-200',
  },
  {
    id: 't2',
    name: 'Brian Odhiambo',
    role: 'College Student, Homa Bay County (Sample Profile)',
    serviceUsed: 'Cyber Printing & Barber Grooming',
    targetPage: 'cyber',
    quote:
      'Getting my project printed, grabbing a fresh fade at the barber shop, and having lunch at Junction Highway Hotel in one stop makes campus weekends effortless.',
    surfaceTint: 'bg-sky-50/50 border-sky-200',
  },
  {
    id: 't3',
    name: 'Millicent Anyango',
    role: 'Traveller & Small Business Owner (Sample Profile)',
    serviceUsed: 'Junction Highway Hotel & Express Laundry',
    targetPage: 'hotel',
    quote:
      'Stopped along the Homa Bay–Rongo Road for hot chai and a clean meal while my work shirts were pressed—everything under one roof.',
    surfaceTint: 'bg-emerald-50/50 border-emerald-200',
  },
  {
    id: 't4',
    name: 'Peter Onyango',
    role: 'Daily Commuter, Homa Bay–Rongo Road (Sample Profile)',
    serviceUsed: 'Car Wash Bay & Barber Studio',
    targetPage: 'carwash',
    quote:
      'Pulled in with red highway dust all over my SUV—by the time I finished a haircut and a cup of chai, the exterior foam wash and cabin vacuum were spotless.',
    surfaceTint: 'bg-sky-50/50 border-sky-200',
  },
];
