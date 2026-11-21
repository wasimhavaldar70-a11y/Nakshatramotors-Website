import React, { useState } from 'react';
import { Search, Zap, Gauge, Battery, Clock, ArrowRight, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../../lib/store';
import { filterAndSortScooters, formatScooterPrice, generateWhatsAppLink } from '../../utils/evCalculations';
import { ScooterModel } from '../../types';
import { Reveal, EASE_OUT_EXPO } from '../common/MotionPrimitives';

interface ScootersPageProps {
  onSelectScooter: (slug: string) => void;
  onBookTestRide: (scooterName: string) => void;
}

export const ScootersPage: React.FC<ScootersPageProps> = ({
  onSelectScooter,
  onBookTestRide,
}) => {
  const store = useStore();
  const scooters = store.getScooters();
  const settings = store.getSettings();

  const [search, setSearch] = useState('');
  const [minRange, setMinRange] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'range_desc' | 'speed_desc'>('recommended');

  const filteredScooters = filterAndSortScooters(scooters, {
    search,
    minRange: minRange > 0 ? minRange : undefined,
    maxPrice: maxPrice > 0 ? maxPrice : undefined,
    sortBy,
  });

  const handleWhatsAppQuote = (scooter: ScooterModel) => {
    const text = `Hello ${settings.dealerName}, please send me full pricing, warranty and delivery timelines for ${scooter.name}.`;
    const link = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <Reveal className="mb-10 text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            The Complete Hestur Energy Lineup
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Electric Scooters Built for Pure Performance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Compare ranges, top speeds, battery specifications and prices to find the ideal electric
            scooter for your daily lifestyle.
          </p>
        </Reveal>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 mb-12 shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Min Range Filter */}
            <div>
              <select
                value={minRange}
                onChange={(e) => setMinRange(Number(e.target.value))}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value={0}>All Certified Ranges</option>
                <option value={90}>Minimum 90+ km</option>
                <option value={120}>Minimum 120+ km</option>
                <option value={150}>Minimum 150+ km</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value={0}>Any Budget (All Prices)</option>
                <option value={90000}>Under ₹90,000</option>
                <option value={115000}>Under ₹1,15,000</option>
                <option value={140000}>Under ₹1,40,000</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="recommended">Featured Order</option>
                <option value="range_desc">Highest Range First</option>
                <option value="speed_desc">Top Speed First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredScooters.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <p className="text-slate-500 font-medium">No scooter models match your current filters.</p>
            <button
              onClick={() => {
                setSearch('');
                setMinRange(0);
                setMaxPrice(0);
                setSortBy('recommended');
              }}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScooters.map((scooter, index) => (
              <motion.div
                layout
                key={scooter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3), ease: EASE_OUT_EXPO }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-colors duration-300 flex flex-col group shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-white p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={scooter.image}
                    alt={scooter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                      {scooter.series}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {scooter.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{scooter.tagline}</p>
                  </div>

                  {/* Spec Strip */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                      <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-semibold">Range</div>
                        <div className="font-extrabold text-slate-900 font-mono tabular-nums">
                          {scooter.certifiedRange} km
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

                  {/* Pricing and Actions */}
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
                        Specifications
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
                      WhatsApp Price Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
