import React from 'react';
import { Award, Wrench, Shield, CreditCard, Navigation, HeartHandshake } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Reveal, StaggerGrid, StaggerCard } from '../common/MotionPrimitives';

export const WhyChooseUs: React.FC = () => {
  const store = useStore();
  const settings = store.getSettings();

  const reasons = [
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      title: 'Authorized Hestur Energy Dealer',
      description:
        'Official dealership guarantee with direct manufacturer support, official factory warranties, and genuine original components.',
    },
    {
      icon: <Wrench className="w-5 h-5 text-amber-500" />,
      title: 'Certified OEM Service Center',
      description:
        'Specialized high-voltage diagnostic tools and factory-trained technicians to handle regular periodic checks and software updates.',
    },
    {
      icon: <Navigation className="w-5 h-5 text-cyan-600" />,
      title: 'Comprehensive Test Rides',
      description:
        'No hasty 2-minute loops. We provide an authentic urban route to test acceleration, suspension comfort, and regenerative braking.',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      title: 'Zero-Hassle EV Financing',
      description:
        'Tie-ups with leading national banks (HDFC, IDFC First, Kotak) offering down payments from ₹9,999 and instant 15-minute approvals.',
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      title: 'Instant Registration & Delivery',
      description:
        'Complete RTO paperwork, insurance issuance, and subsidy documentation managed end-to-end by our dealership team.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
      title: 'Exchange & Buyback Support',
      description:
        'Best-in-class trade-in valuation for your old petrol two-wheeler, making your transition to electric seamless and affordable.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Reasons */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                The Nakshatra Advantage
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Riders Trust {settings.dealerName} for Their EV Journey
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Buying an electric scooter is an investment in your daily mobility. We accompany you
                at every step—from your first test ride to years of dependable after-sales care.
              </p>
            </Reveal>

            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((r) => (
                <StaggerCard
                  key={r.title}
                  hoverLift
                  className="bg-[#F8FAFC] border border-slate-200/90 p-5 rounded-2xl hover:border-blue-400 hover:shadow-md transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">{r.icon}</div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">{r.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-11">{r.description}</p>
                </StaggerCard>
              ))}
            </StaggerGrid>
          </div>

          {/* Right Column: Showroom Facility Visual */}
          <Reveal x={24} y={0} delay={0.12} className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/assets/showroom/nakshatra_experience_center.jpg"
                alt="Nakshatra Motors Authorized Hestur Dealership Experience Center"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#CCFF00] block">
                  Showroom & Experience Center
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Visit Our Experience Center in Peth Vadgaon, Maharashtra
                </h4>
                <p className="text-xs text-slate-200 mt-1">
                  Explore full vehicle displays, interactive color configurators, and schedule
                  express test rides.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
