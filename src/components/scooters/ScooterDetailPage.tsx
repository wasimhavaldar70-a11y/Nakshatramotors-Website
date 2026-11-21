import React, { useState, useEffect } from 'react';
import {
  Zap,
  Gauge,
  Battery,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatInr, formatScooterPrice, generateWhatsAppLink } from '../../utils/evCalculations';
import { ScooterModel } from '../../types';

interface ScooterDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigateToSlug: (slug: string) => void;
  onBookTestRide: (scooterName: string) => void;
}

export const ScooterDetailPage: React.FC<ScooterDetailPageProps> = ({
  slug,
  onBack,
  onNavigateToSlug,
  onBookTestRide,
}) => {
  const store = useStore();
  const scooter = store.getScooterBySlug(slug);
  const settings = store.getSettings();
  const allScooters = store.getScooters();

  const [activeImage, setActiveImage] = useState<string>(scooter?.image || '');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  useEffect(() => {
    setActiveImage(scooter?.image || '');
    setSelectedColorIndex(0);
  }, [slug, scooter?.image]);

  if (!scooter) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900">Scooter Model Not Found</h2>
        <p className="text-slate-600 text-sm mt-2">
          The requested electric scooter model does not exist or has been removed.
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          &larr; Back to All Scooters
        </button>
      </div>
    );
  }

  const currentColor = scooter.colors[selectedColorIndex] || scooter.colors[0];
  const relatedScooters = allScooters.filter((s) => s.id !== scooter.id).slice(0, 3);

  const handleWhatsApp = () => {
    const text = `Hello ${settings.dealerName}, I am reviewing the ${scooter.name} specifications. Can you share on-road price in Maharashtra, EMI plans, and test ride slots?`;
    const link = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const imagesList = scooter.gallery && scooter.gallery.length > 0 ? scooter.gallery : [scooter.image];

  return (
    <div className="py-10 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Scooters Lineup
        </button>

        {/* 1. Hero & Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left: Gallery & Main Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] bg-white rounded-3xl border border-slate-200/90 p-8 flex items-center justify-center overflow-hidden shadow-xl shadow-slate-200/50">
              <img
                src={activeImage || scooter.image}
                alt={scooter.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              {/* Series badge */}
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200">
                  {scooter.series}
                </span>
              </div>
            </div>

            {/* Thumbnail switcher if gallery exists */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-16 rounded-xl border overflow-hidden p-1 bg-white transition-all ${
                      (activeImage || scooter.image) === img
                        ? 'border-blue-600 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Purchase / Booking CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1.5">
                Authorized Hestur Energy Dealership
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {scooter.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 font-medium">{scooter.tagline}</p>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-baseline justify-between shadow-sm">
              <div>
                <span className="text-xs text-slate-500 block">
                  {scooter.price > 0 ? 'On-Road Price' : 'Dealer Price'}
                </span>
                <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {formatScooterPrice(scooter.price)}
                </span>
              </div>
              <div className="text-right">
                {scooter.price > 0 ? (
                  <>
                    <span className="text-xs text-emerald-600 font-semibold block">EMI from</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      {formatInr(Math.round(scooter.price / 36))} / mo*
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-blue-600 font-semibold block">Dealership Quote</span>
                    <span className="text-xs font-medium text-slate-500">On-Road &amp; EMI Available</span>
                  </>
                )}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Selected Color:</span>
                <span className="text-slate-900 font-medium">{currentColor?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {scooter.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform shadow-sm ${
                      selectedColorIndex === idx
                        ? 'scale-110 border-blue-600 ring-2 ring-blue-500/30'
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select ${c.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => onBookTestRide(scooter.name)}
                className="w-full py-4 px-6 bg-[#CCFF00] hover:bg-[#b8e600] active:scale-[0.98] text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                Book Test Ride for {scooter.name} ↗
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 px-6 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Ask for Price Breakdown on WhatsApp
              </button>
            </div>

            {/* Dealer Guarantee */}
            <div className="text-xs text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Sold & serviced by {settings.dealerName}. Includes official {scooter.warranty.battery}.
              </span>
            </div>
          </div>
        </div>

        {/* 2. Key Specifications Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Comprehensive Specifications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">
                Driving Range
              </div>
              <div className="text-xl font-bold text-blue-600 font-mono tabular-nums">
                Up to {scooter.certifiedRange} km
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Per Single Full Charge</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Top Speed</div>
              <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                {scooter.topSpeed} km/h
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Electronically Governed</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">
                Battery Capacity
              </div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {scooter.batteryCapacity}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">High-Density Smart Pack</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Charging Time</div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {scooter.chargingTime}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Standard Home Charger</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Motor Power</div>
              <div className="text-base font-bold text-slate-900">{scooter.motorPower}</div>
              <div className="text-[11px] text-slate-500 mt-1">Instant Throttle Response</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Peak Torque</div>
              <div className="text-base font-bold text-slate-900">{scooter.torque}</div>
              <div className="text-[11px] text-slate-500 mt-1">Wheel Torque</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Acceleration</div>
              <div className="text-base font-bold text-slate-900">{scooter.acceleration}</div>
              <div className="text-[11px] text-slate-500 mt-1">From Standstill</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Boot Capacity</div>
              <div className="text-base font-bold text-slate-900">{scooter.bootSpace}</div>
              <div className="text-[11px] text-slate-500 mt-1">Under-Seat Storage</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Braking System</div>
              <div className="text-base font-bold text-slate-900">{scooter.brakes}</div>
              <div className="text-[11px] text-slate-500 mt-1">With Regenerative Tech</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Suspension</div>
              <div className="text-base font-bold text-slate-900">{scooter.suspension}</div>
              <div className="text-[11px] text-slate-500 mt-1">Tuned for Indian Roads</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Curb Weight</div>
              <div className="text-base font-bold text-slate-900">{scooter.curbWeight}</div>
              <div className="text-[11px] text-slate-500 mt-1">Effortless Control</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">
                Battery Warranty
              </div>
              <div className="text-base font-bold text-slate-900">{scooter.warranty.battery}</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold">≥80% Health Assured</div>
            </div>
          </div>
        </div>

        {/* 3. Features & Smart Tech Checklist */}
        <div className="mb-16 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Equipped with Automotive Grade Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scooter.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-800 font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Related Scooters */}
        {relatedScooters.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
              Compare with Other Hestur Models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedScooters.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateToSlug(rel.slug)}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="aspect-[4/3] p-4 flex items-center justify-center">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">{rel.name}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                      <span>Up to {rel.certifiedRange} km Range</span>
                      <span className="font-mono font-bold text-blue-600">{formatScooterPrice(rel.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
