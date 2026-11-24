import {useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {BUSINESS_INFO, OPERATING_HOURS} from '../data/hubData';
import {LocationMap} from './LocationMap';
import {CircularSocialLinks} from './SocialIcons';

const DEPARTMENTS = [
  'Laundry Services',
  'Cyber Services',
  'Barber Services',
  'Car Wash Services',
  'Junction Highway Hotel',
  'Multiple Services',
];

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Laundry Services');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    const digitsOnly = phone.replace(/[\s\-()+]/g, '');
    if (digitsOnly.length < 9) {
      nextErrors.phone = 'Please enter a valid Kenyan phone or WhatsApp number.';
    }
    if (message.trim().length < 8) {
      nextErrors.message = 'Please share a brief note about the service you need.';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const buildWhatsAppSummaryUrl = () => {
    const text = `Hello The Junction Hub, my name is ${name.trim()} (${phone.trim()}). Service enquiry (${department}): ${message.trim()}`;
    return `${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setDepartment('Laundry Services');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-14 sm:py-20 border-t border-sky-200/80 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 mb-2">
            Visit &amp; Contact Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-slate-900 text-balance">
            Find us along the Homa Bay–Rongo Road
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Direct Contact & Enquiry Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-sky-50/50 border border-sky-200 rounded-lg p-4 sm:p-6 shadow-md space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    Telephone
                  </span>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 font-mono text-base font-medium tabular-nums text-slate-900 hover:text-sky-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    Physical Location
                  </span>
                  <p className="inline-flex items-start gap-2 text-sm font-medium text-slate-900">
                    <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>
                      {BUSINESS_INFO.locationShort}
                      <span className="block text-xs font-normal text-slate-600">
                        {BUSINESS_INFO.locationReference}
                      </span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-200/70 flex flex-wrap gap-3">
                <motion.a
                  href={BUSINESS_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
                  whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </motion.a>
                <motion.a
                  href={BUSINESS_INFO.phoneHref}
                  whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
                  whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-sky-300 hover:bg-sky-50 rounded-md shadow-xs hover:shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 text-sky-700" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </motion.a>
              </div>

              <div className="pt-4 border-t border-sky-200/70 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    Follow Us Online
                  </span>
                  <span className="text-[11px] text-slate-500">
                    TikTok · Instagram · Facebook
                  </span>
                </div>
                <CircularSocialLinks />
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Send a Service Enquiry
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Pick a department and send your question straight to WhatsApp.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="submitted-card"
                    initial={
                      prefersReducedMotion ? {opacity: 1} : {opacity: 0, y: 10, scale: 0.98}
                    }
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: -8}}
                    transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
                    className="rounded-md border border-sky-200 bg-sky-50/70 p-5 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">
                          Enquiry prepared for {department}
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                          Thank you, {name}. Send your message directly to our
                          WhatsApp desk for the fastest response, or call us on{' '}
                          <span className="font-mono tabular-nums font-medium text-slate-900">
                            {BUSINESS_INFO.phoneDisplay}
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <motion.a
                        href={buildWhatsAppSummaryUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
                        whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        New Enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="enquiry-form"
                    initial={prefersReducedMotion ? false : {opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block text-xs font-medium text-slate-700 mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel Otieno"
                        aria-invalid={Boolean(errors.name)}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1 text-xs text-red-700">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-xs font-medium text-slate-700 mb-1.5"
                      >
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0712 345678"
                        aria-invalid={Boolean(errors.phone)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1 text-xs text-red-700">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-slate-700 mb-1.5">
                      Service Department
                    </span>
                    <div
                      role="group"
                      aria-label="Choose service department"
                      className="flex flex-wrap gap-1.5 p-1.5 bg-slate-50 border border-sky-200/80 rounded-md"
                    >
                      {DEPARTMENTS.map((option) => {
                        const isSelected = department === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setDepartment(option)}
                            className={`relative px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isSelected
                                ? 'text-white'
                                : 'text-slate-700 hover:text-sky-800 hover:bg-sky-100/70'
                            }`}
                          >
                            {isSelected && (
                              <motion.span
                                layoutId="contact-dept-pill"
                                transition={{type: 'spring', stiffness: 420, damping: 32}}
                                aria-hidden="true"
                                className="absolute inset-0 bg-sky-600 rounded-sm shadow-xs"
                              />
                            )}
                            <span className="relative z-10">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-medium text-slate-700 mb-1.5"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about laundry rates, printing, barber chairs, car wash packages, or Junction Highway Hotel rooms & meals..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1 text-xs text-red-700">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={prefersReducedMotion ? undefined : {y: -1.5, scale: 1.02}}
                    whileTap={prefersReducedMotion ? undefined : {scale: 0.96}}
                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm hover:shadow-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Prepare Enquiry
                  </motion.button>
                </motion.form>
              )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Interactive Map + Operating Hours */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Map &amp; Directions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Junction-Kodoyo · Homa Bay–Rongo Road
                  </p>
                </div>
                <a
                  href={BUSINESS_INFO.mapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700 hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <LocationMap />
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-md">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-700" />
                  <h3 className="text-base font-semibold text-slate-900">
                    Operating Hours
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  East Africa Time (EAT)
                </span>
              </div>

              <dl className="divide-y divide-sky-200/60 text-sm">
                {OPERATING_HOURS.map((item) => (
                  <div
                    key={item.day}
                    className="py-2.5 flex items-center justify-between gap-4"
                  >
                    <dt className="font-medium text-slate-800">{item.day}</dt>
                    <dd
                      className={`font-mono text-xs sm:text-sm tabular-nums ${
                        item.confirmed
                          ? 'text-slate-700'
                          : 'text-amber-800 font-medium'
                      }`}
                    >
                      {item.hours}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 pt-3 border-t border-sky-200/70 text-xs text-slate-600 leading-relaxed">
                Call or WhatsApp{' '}
                <span className="font-mono tabular-nums text-slate-800">
                  {BUSINESS_INFO.phoneDisplay}
                </span>{' '}
                to confirm Saturday hours before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
