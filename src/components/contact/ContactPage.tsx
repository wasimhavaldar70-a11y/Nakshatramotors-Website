import React from 'react';
import { ContactSection } from '../home/ContactSection';
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation, ShieldCheck } from 'lucide-react';
import { useStore } from '../../lib/store';
import { generateWhatsAppLink } from '../../utils/evCalculations';

export const ContactPage: React.FC = () => {
  const store = useStore();
  const settings = store.getSettings();

  const handleOpenWhatsApp = () => {
    const link = generateWhatsAppLink(
      settings.whatsappNumber,
      `Hello ${settings.dealerName}, I am reaching out through your contact page regarding Hestur Energy electric scooters.`
    );
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="py-12 border-b border-slate-800 bg-[#070A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Visit Our Showroom or Schedule a Test Ride
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Our product specialists are ready to guide you through vehicle specifications, battery
            longevity, financing options, and test ride bookings.
          </p>
        </div>
      </div>

      {/* Embed Contact Section */}
      <ContactSection />

      {/* Showroom Directions & Info */}
      <div className="py-16 bg-[#0B0E14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0E131C] border border-slate-800 rounded-3xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Dealership Address</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {settings.address}
                  <br />
                  {settings.city}, {settings.state} ({settings.pincode})
                </p>
                <div className="pt-1">
                  <a
                    href={settings.showroomLocationUrl || 'https://maps.google.com/?q=Front+of+Vadgaon+Highschool,+Hatkanagale+Road,+Peth+Vadgaon,+Maharashtra+416112'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Operating Hours</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {settings.operatingHours}
                  <br />
                  Open on Sundays for test rides & customer consultations.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Customer Helpdesk</h3>
                <div className="text-xs text-slate-400 leading-relaxed space-y-1.5">
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-semibold">Mobile Lines:</span>
                    <div className="flex flex-col gap-0.5 font-mono text-slate-200">
                      <a href="tel:+917219759191" className="hover:text-white transition-colors">
                        +91 721 975 9191
                      </a>
                      <a href="tel:+917972131513" className="hover:text-white transition-colors">
                        +91 79 7213 1513
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-semibold">Official Mail:</span>
                    <a href={`mailto:${settings.email}`} className="text-slate-200 hover:text-white underline font-mono break-all">
                      {settings.email}
                    </a>
                  </div>
                </div>
                <div className="pt-1">
                  <button
                    onClick={handleOpenWhatsApp}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-xs text-emerald-400 hover:bg-emerald-600/30 font-semibold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp (+91 721 975 9191)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
