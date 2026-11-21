import React from 'react';
import { Award, ShieldCheck, HeartHandshake, MapPin, Phone, Users, CheckCircle } from 'lucide-react';
import { useStore } from '../../lib/store';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const store = useStore();
  const settings = store.getSettings();

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Story & Dealership Heritage Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-3 shadow-xs">
            Our Story & Dealership Heritage
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Pioneering Clean, High-Performance Mobility with Hestur Energy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Nakshatra Motors was founded with a singular ambition: to make electric two-wheeler ownership in Maharashtra transparent, delightful, and supported by world-class after-sales engineering.
          </p>
        </div>

        {/* Showroom Visual + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl relative group">
              <img
                src="/assets/showroom/nakshatra_experience_center.jpg"
                alt="Nakshatra Motors Authorized Hestur Energy Dealership Experience Center"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#CCFF00] block">
                  State-of-the-Art Experience Center
                </span>
                <p className="text-sm font-bold text-white">
                  Front of Vadgaon Highschool, Peth Vadgaon Experience Center
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              An Authorized Partnership Rooted in Engineering Excellence
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              As an authorized dealer for Hestur Energy, we share their uncompromising ethos:
              electric scooters must be built for the reality of Indian roads, with thermal
              resilience, true-to-claim driving range, and zero shortcuts on safety.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              When you purchase a scooter from {settings.dealerName}, you gain more than an electric
              vehicle—you gain a lifetime mobility partner. Our facility houses specialized battery
              testing equipment, computer-guided diagnostics, and factory-trained mechanics.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium">100% Genuine Spare Parts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium">Express Periodic Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium">Full RTO & Subsidy Filing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium">Flexible Bank EMI Options</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm">
            <Award className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Authorized Dealership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct factory association ensures verified serial numbers, instant warranty
              activation, and priority delivery from manufacturing batches.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm">
            <ShieldCheck className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Unwavering Safety</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We guide every customer through safe battery maintenance practices, charger care, and
              proper riding habits to maximize cell health over 8+ years.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm">
            <HeartHandshake className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Customer First Ethos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Over {settings.happyCustomersCount}+ families have trusted us for their two-wheeler
              needs. We pride ourselves on zero hidden charges and transparent quotes.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Experience the Hestur Difference Today
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto mt-2">
            Visit our showroom or schedule an express test ride at our Peth Vadgaon experience center.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('/scooters')}
              className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Explore Scooter Models ↗
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition-all"
            >
              Contact Showroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
