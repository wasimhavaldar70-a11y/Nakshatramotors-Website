import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MessageSquare, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../../lib/store';
import { validateEnquiry, generateWhatsAppLink } from '../../utils/evCalculations';
import { EnquiryType } from '../../types';
import { Reveal } from '../common/MotionPrimitives';

interface ContactSectionProps {
  preselectedModel?: string;
  preselectedType?: EnquiryType;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedModel,
  preselectedType = 'Test Ride',
}) => {
  const store = useStore();
  const settings = store.getSettings();
  const scooters = store.getScooters();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [scooterModel, setScooterModel] = useState(preselectedModel || scooters[0]?.name || '');
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(preselectedType);
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const enquiryTypes: EnquiryType[] = [
    'Test Ride',
    'Price Enquiry',
    'General Enquiry',
    'Battery Information',
    'Purchase Enquiry',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEnquiry({
      fullName,
      mobile,
      email,
      scooterModel,
      enquiryType,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Write to store / Supabase
    setTimeout(() => {
      store.addEnquiry({
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        email: email.trim() || undefined,
        scooterModel,
        enquiryType,
        message: message.trim() || `${enquiryType} request for ${scooterModel}`,
        preferredDate: preferredDate || undefined,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset fields
      setFullName('');
      setMobile('');
      setEmail('');
      setMessage('');
      setPreferredDate('');
    }, 500);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello ${settings.dealerName}, I would like to make an enquiry regarding ${scooterModel || 'Hestur Energy electric scooters'}.`;
    const link = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Dealership details */}
          <Reveal x={-20} y={0} className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                Connect With Dealership
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Schedule Your Test Ride or Request a Quote
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Experience the quiet power and superior handling of Hestur Energy scooters. Fill
                out the form or drop by our showroom for personal guidance.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Dealership Location
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {settings.address}, {settings.city}, {settings.state} ({settings.pincode})
                  </p>
                  <a
                    href={settings.showroomLocationUrl || 'https://maps.google.com/?q=Front+of+Vadgaon+Highschool,+Hatkanagale+Road,+Peth+Vadgaon,+Maharashtra+416112'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold mt-1.5"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Showroom Hours
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{settings.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Phone className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Direct Phone Lines
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 font-mono text-sm">
                    <a
                      href="tel:+917219759191"
                      className="font-bold text-blue-600 hover:text-blue-700"
                    >
                      +91 721 975 9191
                    </a>
                    <span className="text-slate-400">/</span>
                    <a
                      href="tel:+917972131513"
                      className="font-bold text-blue-600 hover:text-blue-700"
                    >
                      +91 79 7213 1513
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Mail className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Official Email
                  </h3>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-bold text-slate-800 hover:text-blue-600 mt-1 block"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full py-4 px-4 bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#25D366]/30"
              >
                <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                Chat on WhatsApp (+91 721 975 9191)
              </button>
            </div>
          </Reveal>

          {/* Right Column: Interactive Form */}
          <Reveal x={20} y={0} delay={0.1} className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Enquiry Received Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to {settings.dealerName}. Our sales advisor will contact
                  you shortly on your mobile to confirm your request and answer any questions.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
                  Send Your Enquiry / Test Ride Request
                </h3>

                {/* Full Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. 7219759191"
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                        errors.mobile
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.mobile && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address & Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Interested Model <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={scooterModel}
                      onChange={(e) => setScooterModel(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {scooters.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.certifiedRange} km)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Enquiry Type & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Enquiry Purpose <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {enquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Preferred Date <span className="text-slate-400 font-normal">(For Test Ride)</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Message / Special Requests <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide any specific requirements, financing questions or convenient time for a call..."
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
