import {useState, type FormEvent} from 'react';
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

type ServiceDepartment =
  | 'Laundry Services'
  | 'Cyber Services'
  | 'Barber Services'
  | 'Junction Highway Hotel'
  | 'Multiple Services';

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

const DEPARTMENTS: ServiceDepartment[] = [
  'Laundry Services',
  'Cyber Services',
  'Barber Services',
  'Junction Highway Hotel',
  'Multiple Services',
];

export function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<ServiceDepartment>('Laundry Services');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      className="py-20 sm:py-24 border-t border-slate-200 bg-[#F4F3EE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-wide text-teal-700 mb-2">
            Visit &amp; Contact Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Find us along the Homa Bay–Rongo Road
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Call directly, message us on WhatsApp, or send a quick enquiry below
            for laundry turnaround, cyber services, barber bookings, or dining
            and room availability at Junction Highway Hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Enquiry Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    Telephone
                  </span>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 font-mono text-base font-medium tabular-nums text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    Physical Location
                  </span>
                  <p className="inline-flex items-start gap-2 text-sm font-medium text-slate-900">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      {BUSINESS_INFO.locationShort}
                      <span className="block text-xs font-normal text-slate-600">
                        {BUSINESS_INFO.locationReference}
                      </span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Send a Service Enquiry
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Choose a department below and share what you need.
              </p>

              {submitted ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
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
                    <a
                      href={buildWhatsAppSummaryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      New Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
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
                        className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
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
                      className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-lg"
                    >
                      {DEPARTMENTS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setDepartment(option)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            department === option
                              ? 'bg-white text-slate-900 shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
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
                      placeholder="Ask about laundry rates, printing, barber chair availability, or Junction Highway Hotel rooms & meals..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1 text-xs text-red-700">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    Prepare Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Map + Operating Hours */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
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
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <LocationMap />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-semibold text-slate-900">
                    Operating Hours
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  East Africa Time (EAT)
                </span>
              </div>

              <dl className="divide-y divide-slate-100 text-sm">
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

              <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                Schedule based on available listing details. Please call or
                WhatsApp{' '}
                <span className="font-mono tabular-nums text-slate-700">
                  {BUSINESS_INFO.phoneDisplay}
                </span>{' '}
                to confirm Saturday hours before travelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
