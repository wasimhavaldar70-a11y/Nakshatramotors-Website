import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Cpu,
  Flame,
  Droplets,
  Zap,
  RefreshCw,
  BatteryCharging,
  Award,
  Timer,
  CheckCircle2,
  LayoutGrid,
  Table,
  Sparkles,
} from 'lucide-react';
import { Reveal, StaggerGrid, StaggerCard, EASE_OUT_EXPO, VIEWPORT_ONCE } from '../common/MotionPrimitives';

export const BatteryTechSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const techPillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'Lithium Ferro Phosphate (LFP) Packs',
      description:
        'Built with high-density cells (such as 60V configurations) and an integrated Battery Management System (BMS) to protect against overcharging, short circuits, and overheating.',
    },
    {
      icon: <Flame className="w-5 h-5 text-amber-500" />,
      title: 'Graphene Battery Packs',
      description:
        'Engineered for high-temperature resistance, faster charging, and improved thermal stability—with standalone 12V 32Ah (20HR) modular replacement configurations.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      title: 'Integrated Active BMS Telemetry',
      description:
        'Smart automotive Battery Management continuously guards against overcharging, short circuits, voltage spikes, and overheating across every ride.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      title: 'IP67 Water & Dust Protection',
      description:
        'Sealed automotive enclosures protect critical battery packs and wiring harnesses across wet city commutes and Indian monsoon conditions.',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      title: 'Extended Warranty Coverage',
      description:
        'Dyno packs carry a 3+1 year LFP battery warranty (4 years total), while Werewolf / Werewolf+ flagships include an official 7-year battery warranty.',
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      title: 'Multi-Mode High-Output Drive',
      description:
        'Long-range 4.5 kWh powertrains support Eco (300 km), Normal (~220 km), and Sport (~180 km) modes alongside high-torque 1000 W to 8000 W motors.',
    },
  ];

  const scooterPowertrainModels = [
    {
      model: 'Hestur Dyno (80 km / 160 km)',
      badge: 'Urban Commuter',
      badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-200',
      category: 'Everyday Non-RTO Mobility',
      motorPower: '1000 W',
      topSpeed: '50 km/h',
      claimedRange: '80–160 km',
      batteryCharging: 'High-density pack (3–4 hrs charge)',
      priceTag: 'From ₹69,999',
      keyFeatures:
        'Front disc brake, keyless entry, anti-theft alarm, USB port, on-road from ₹69,999.',
      features: [
        'Front disc brake & CBS safety',
        'Keyless entry & anti-theft alarm',
        'Built-in USB phone charger',
        'Hill Assist & IP67 water resistance',
        'Dyno 80 km (₹69,999) / Dyno 160 km (₹1,04,999)',
      ],
      highlight: false,
    },
    {
      model: 'Hestur WereWolf (150 km)',
      badge: 'Performance Commuter',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      category: 'Removable Battery Touring',
      motorPower: 'High-Torque Electric Motor',
      topSpeed: '~65 km/h (up to 90 km/h peak)',
      claimedRange: '150 km (up to 300 km in Eco)',
      batteryCharging: 'Removable pack (5 hrs charge)',
      priceTag: '₹1,25,999',
      keyFeatures:
        'Dual disc brakes, hill hold/assist, reverse gear, on-road ₹1,25,999.',
      features: [
        'Dual disc brakes (Front & Rear)',
        'Hill hold assist & reverse gear assist',
        'Removable NMC pack (~5 hrs charge)',
        'Up to 90 km/h peak throttle capability',
        '7 Years manufacturer battery warranty',
      ],
      highlight: false,
    },
    {
      model: 'Hestur WereWolf Plus',
      badge: 'Flagship Power',
      badgeStyle: 'bg-purple-50 text-purple-700 border border-purple-200',
      category: 'Power Beyond Everyday',
      motorPower: '3000 W',
      topSpeed: 'Mid-to-high speed (~65 km/h)',
      claimedRange: '150 km (up to 300 km in Eco)',
      batteryCharging: 'High-capacity pack (5 hrs charge)',
      priceTag: '8 Colors',
      keyFeatures:
        'Available in 8 colors including Fiery Crimson Red and Graphite Grey Storm.',
      features: [
        '3000 W high-power electric drive',
        '150 km range (up to 300 km in Eco)',
        '8 colors (Fiery Crimson Red, Graphite Grey)',
        'High-capacity pack with 5 hrs charge',
        '7 Years official battery warranty',
      ],
      highlight: true,
    },
    {
      model: '300 km Long-Range Variant',
      badge: 'Ultimate Endurance',
      badgeStyle: 'bg-amber-50 text-amber-700 border border-amber-200',
      category: 'Multi-Mode Extended Touring',
      motorPower: 'High-output',
      topSpeed: 'Multi-mode',
      claimedRange: 'Up to 300 km (Eco)',
      batteryCharging: '4.5 kWh pack',
      priceTag: '3 Ride Modes',
      keyFeatures:
        'Three ride modes: Eco (300 km), Normal (~220 km), and Sport (~180 km).',
      features: [
        'Eco Mode: Up to 300 km maximum range',
        'Normal Mode: ~220 km balanced range',
        'Sport Mode: ~180 km dynamic response',
        '4.5 kWh high-energy battery pack',
        'Regenerative braking & energy recovery',
      ],
      highlight: false,
    },
  ];

  const batteryTechSpecs = [
    {
      icon: <BatteryCharging className="w-5 h-5 text-amber-600" />,
      badge: 'Modular Power',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Graphene Battery Packs',
      description:
        'Engineered for high-temperature resistance, faster charging, and improved thermal stability. Standalone replacement units include 12V 32Ah (20HR) configurations used in modular scooter setups.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      badge: '60V + BMS',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Lithium Ferro Phosphate (LFP) Packs',
      description:
        'Built with high-density cells (such as 60V configurations) and an integrated Battery Management System (BMS) to protect against overcharging, short circuits, and overheating.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-emerald-600" />,
      badge: 'Up to 10 Yrs',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Extended Warranty Coverage',
      description:
        'Entry-level commuter packs (such as the Dyno) carry a 4-year warranty. Flagship 300 km range variants include a standard 7-year or 1,40,000 km warranty, extendable up to 10 years or 2,00,000 km.',
    },
  ];

  return (
    <section id="battery-tech" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading — Center Aligned */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Automotive Powertrain &amp; Energy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Battery Architecture Built for Maximum Safety &amp; Longevity
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hestur Energy offers a lineup of electric scooters ranging from low-speed city commuters
            to high-performance models, backed by graphene and Lithium Ferro Phosphate (LFP)
            battery technology.
          </p>
        </Reveal>

        {/* Feature Bento Grid with Central Battery Cutaway */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          {/* Left Column Pillars */}
          <div className="lg:col-span-4 space-y-6">
            {techPillars.slice(0, 3).map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_OUT_EXPO }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-[#F8FAFC] border border-slate-200/90 p-5 rounded-2xl hover:border-blue-400 hover:shadow-md transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">{pillar.icon}</div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-11">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Central High-Tech Cutaway Image */}
          <Reveal scale={0.94} y={16} delay={0.15} className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/assets/battery/hestur_battery_architecture_cutaway.jpg"
                alt="Electric vehicle lithium battery pack engineering cutaway"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Graphene &amp; LFP Architecture
                </span>
                <span className="text-sm font-bold text-white">
                  High-Density Cells &amp; Integrated BMS Protection
                </span>
              </div>
            </div>

            {/* Warranty Highlights Box */}
            <div className="mt-4 w-full bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    3+1 Yr Dyno · 7-Yr Werewolf Battery Warranty
                  </div>
                  <div className="text-[11px] text-blue-800">
                    Official manufacturer battery coverage: 3+1 years LFP on Dyno and 7 years on Werewolf models
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column Pillars */}
          <div className="lg:col-span-4 space-y-6">
            {techPillars.slice(3, 6).map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_OUT_EXPO }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-[#F8FAFC] border border-slate-200/90 p-5 rounded-2xl hover:border-blue-400 hover:shadow-md transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">{pillar.icon}</div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-11">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hestur Energy Scooter Models Powertrain & Battery Lineup Matrix */}
        <Reveal delay={0.1} className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Model Comparison Matrix
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hestur Energy Scooter Models
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                From 1000 W city commuters to 3000 W &amp; 300 km endurance flagships. Compare key specs at a glance.
              </p>
            </div>

            {/* View Mode Toggle: Cards vs Table */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Comparison Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                Spec Matrix Table
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'cards' ? (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {scooterPowertrainModels.map((item) => (
                  <div
                    key={item.model}
                    className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-200 bg-white border ${
                      item.highlight
                        ? 'border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                        : 'border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.badgeStyle}`}>
                          {item.badge}
                        </span>
                        {item.priceTag && (
                          <span className="text-xs font-extrabold text-blue-600 font-mono">
                            {item.priceTag}
                          </span>
                        )}
                      </div>

                      {/* Model Title */}
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug mb-1">
                        {item.model}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mb-4">
                        {item.category}
                      </p>

                      {/* Primary Metrics: Range & Speed */}
                      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl mb-4 text-center">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            Claimed Range
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-emerald-700 font-mono block">
                            {item.claimedRange}
                          </span>
                        </div>
                        <div className="border-l border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            Top Speed
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono block">
                            {item.topSpeed}
                          </span>
                        </div>
                      </div>

                      {/* Key Specs Breakdown */}
                      <div className="space-y-2.5 text-xs mb-4">
                        <div className="flex items-start gap-2 text-slate-700">
                          <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <div className="leading-tight">
                            <span className="text-slate-400 font-semibold text-[11px] block">Motor Power</span>
                            <span className="font-semibold text-slate-900 font-mono">{item.motorPower}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-slate-700">
                          <Timer className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <div className="leading-tight">
                            <span className="text-slate-400 font-semibold text-[11px] block">Battery &amp; Charging</span>
                            <span className="font-medium text-slate-800">{item.batteryCharging}</span>
                          </div>
                        </div>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="pt-3 border-t border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                          Key Features
                        </span>
                        <ul className="space-y-1.5">
                          {item.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-600 leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                        <th className="py-4 px-5 font-bold">Model</th>
                        <th className="py-4 px-4 font-bold">Motor Power</th>
                        <th className="py-4 px-4 font-bold">Top Speed</th>
                        <th className="py-4 px-4 font-bold">Claimed Range</th>
                        <th className="py-4 px-4 font-bold">Battery &amp; Charging</th>
                        <th className="py-4 px-5 font-bold">Key Features</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                      {scooterPowertrainModels.map((item, idx) => (
                        <tr
                          key={item.model}
                          className={`hover:bg-blue-50/40 transition-colors ${
                            idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                          }`}
                        >
                          <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{item.model}</span>
                              {item.highlight && (
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                  Flagship
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-normal block mt-0.5">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                            {item.motorPower}
                          </td>
                          <td className="py-4 px-4 font-mono text-slate-800 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold">
                              {item.topSpeed}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-emerald-700 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
                              {item.claimedRange}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-700 font-medium">
                            {item.batteryCharging}
                          </td>
                          <td className="py-4 px-5 text-slate-600 text-xs leading-relaxed max-w-sm">
                            {item.keyFeatures}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Battery Technologies & Specifications Cards */}
        <div className="mb-10">
          <div className="mb-5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block mb-1">
              Cell Engineering &amp; Protection
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Battery Technologies &amp; Specifications
            </h3>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {batteryTechSpecs.map((spec) => (
              <StaggerCard
                key={spec.title}
                hoverLift
                className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 hover:border-blue-400 hover:shadow-md transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                      {spec.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${spec.badgeClass}`}
                    >
                      {spec.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{spec.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{spec.description}</p>
                </div>
              </StaggerCard>
            ))}
          </StaggerGrid>
        </div>

        {/* Technical Data Highlights */}
        <Reveal delay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#F8FAFC] border border-slate-200 rounded-3xl text-xs">
          <div>
            <span className="text-slate-500 uppercase tracking-wider block mb-1 font-semibold">Cell Chemistries</span>
            <span className="text-sm font-bold text-slate-900">Graphene &amp; 60V LFP Packs</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider block mb-1 font-semibold">Modular Units</span>
            <span className="text-sm font-bold text-slate-900">12V 32Ah (20HR) Replacement</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider block mb-1 font-semibold">Motor Lineup</span>
            <span className="text-sm font-bold text-slate-900">1000 W to 8000 W Peak</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider block mb-1 font-semibold">Extended Warranty</span>
            <span className="text-sm font-bold text-slate-900">4 Yrs Dyno · Up to 10 Yrs / 2L km</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
