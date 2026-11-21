import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Battery, Zap, Gauge, Clock, ArrowRight, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatScooterPrice, generateWhatsAppLink } from '../../utils/evCalculations';
import { ScooterModel } from '../../types';
import { Reveal, EASE_OUT_EXPO } from '../common/MotionPrimitives';

interface ScootersShowcaseProps {
  onSelectScooter: (slug: string) => void;
  onBookTestRide: (scooterName: string) => void;
}

export const ScootersShowcase: React.FC<ScootersShowcaseProps> = ({
  onSelectScooter,
  onBookTestRide,
}) => {
  const store = useStore();
  const scooters = store.getScooters();
  const settings = store.getSettings();

  const [activeFilter, setActiveFilter] = useState<'all' | 'flagship' | 'city'>('all');
  const [selectedColorIndex, setSelectedColorIndex] = useState<Record<string, number>>({});

  const filteredScooters = scooters.filter((s) => {
    if (activeFilter === 'flagship') return s.certifiedRange >= 120;
    if (activeFilter === 'city') return s.topSpeed <= 50 || (s.price > 0 && s.price <= 115000);
    return true;
  });

  const handleWhatsAppQuote = (scooter: ScooterModel) => {
    const text = `Hello ${settings.dealerName}, I would like a detailed price breakdown, subsidy information and test ride booking for the ${scooter.name}.`;
    const link = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="scooters-showcase" className="py-20 lg:py-28 border-b border-slate-200/80 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              Hestur Energy Electric Lineup
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Pure Performance
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Experience zero-compromise electric mobility. Built with automotive-grade LFP battery
              chemistry, intelligent regenerative braking, and unmatched road comfort.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm self-start md:self-auto">
            {(
              [
                { id: 'all', label: `All Models (${scooters.length})` },
                { id: 'flagship', label: 'Flagship (120+ km)' },
                { id: 'city', label: 'Non-RTO / City' },
              ] as const
            ).map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="lineupFilterPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Product Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredScooters.map((scooter, index) => {
              const currentColorIdx = selectedColorIndex[scooter.id] || 0;
              const currentColor = scooter.colors[currentColorIdx] || scooter.colors[0];

              return (
                <motion.div
                  layout
                  key={scooter.id}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                  className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-colors duration-300 flex flex-col group shadow-md"
                >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-white p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={scooter.image}
                    alt={scooter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Status */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                      {scooter.series}
                    </span>
                  </div>

                  {scooter.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-950 bg-[#CCFF00] px-3 py-1 rounded-full shadow-sm">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Color Selector Overlay */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
                      {currentColor?.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {scooter.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColorIndex((prev) => ({
                              ...prev,
                              [scooter.id]: idx,
                            }));
                          }}
                          className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                            currentColorIdx === idx
                              ? 'scale-125 border-slate-900 ring-2 ring-blue-500'
                              : 'border-slate-300 hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={`Select ${color.name} color`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {scooter.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {scooter.tagline}
                    </p>
                  </div>

                  {/* Core 4-metric grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                      <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-semibold">Range</div>
                        <div className="font-extrabold text-slate-900 font-mono tabular-nums">
                          Up to {scooter.certifiedRange} km
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                      <Gauge className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-semibold">Top Speed</div>
                        <div className="font-extrabold text-slate-900 font-mono tabular-nums">
                          {scooter.topSpeed} km/h
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                      <Battery className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-semibold">Battery</div>
                        <div className="font-extrabold text-slate-900 font-mono">{scooter.batteryCapacity}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                      <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-semibold">Charging</div>
                        <div className="font-extrabold text-slate-900 font-mono">{scooter.chargingTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {scooter.price > 0 ? 'On-Road Price' : 'Dealer Price'}
                      </span>
                      <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                        {formatScooterPrice(scooter.price)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectScooter(scooter.slug)}
                        className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onBookTestRide(scooter.name)}
                        className="w-full py-2.5 px-3 bg-[#CCFF00] hover:bg-[#b8e600] active:scale-95 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-[#CCFF00]/20 flex items-center justify-center gap-1"
                      >
                        <span>Test Ride</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleWhatsAppQuote(scooter)}
                      className="w-full py-2 px-3 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      Instant WhatsApp Quote
                    </button>
                  </div>
                </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
