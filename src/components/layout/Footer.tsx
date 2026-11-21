import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { generateWhatsAppLink } from '../../utils/evCalculations';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const store = useStore();
  const settings = store.getSettings();
  const scooters = store.getScooters();

  const handleWhatsApp = () => {
    const link = generateWhatsAppLink(
      settings.whatsappNumber,
      `Hello ${settings.dealerName}, I would like to inquire about Hestur Energy electric scooters and pricing.`
    );
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Dealership Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base">
                N
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block uppercase font-sans">
                  {settings.dealerName}
                </span>
                <span className="text-xs tracking-wider text-blue-400 uppercase font-bold">
                  {settings.brandAffiliation}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Official authorized dealership delivering next-generation Hestur Energy electric
              scooters. Bringing sustainable, high-performance urban mobility with dedicated sales,
              certified service, and authentic warranty support.
            </p>

            <div className="pt-2">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-400 stroke-none" />
                WhatsApp: +91 721 975 9191
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 3: Electric Scooter Models */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Scooter Models
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              {scooters.map((scooter) => (
                <li key={scooter.id}>
                  <button
                    onClick={() => onNavigate(`/scooters/${scooter.slug}`)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {scooter.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/scooters')}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors text-left flex items-center gap-1"
                >
                  View All Models &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Explore & Support
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Dealership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/#battery-tech')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Battery & BMS Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Book Test Ride
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Showroom Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Showroom Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} ({settings.pincode})
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-mono">
                  <a href="tel:+917219759191" className="hover:text-white transition-colors">
                    +91 721 975 9191
                  </a>
                  <a href="tel:+917972131513" className="hover:text-white transition-colors">
                    +91 79 7213 1513
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors break-all">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.operatingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>
            &copy; {new Date().getFullYear()} {settings.dealerName}. All rights reserved. Authorized
            dealership for Hestur Energy.
          </p>
          <div className="flex items-center gap-6">
            <span>ARAI Certified Vehicles</span>
            <span>·</span>
            <span>Zero Direct Emissions</span>
            <span>·</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
