import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Flame, Droplets, Zap, RefreshCw, BatteryCharging, Award } from 'lucide-react';
import { Reveal, StaggerGrid, StaggerCard, EASE_OUT_EXPO, VIEWPORT_ONCE } from '../common/MotionPrimitives';

export const BatteryTechSection: React.FC = () => {
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
        'Entry-level Dyno commuter packs carry a 4-year warranty, while flagship 300 km range variants include a 7-year or 1,40,000 km warranty (extendable up to 10 years or 2,00,000 km).',
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
      motorPower: '1000 W',
      topSpeed: '50 km/h',
      claimedRange: '80–160 km',
      batteryCharging: 'High-density pack (3–4 hrs charge)',
      keyFeatures: 'Front disc brake, keyless entry, anti-theft alarm, USB port, on-road from ₹69,999.',
    },
    {
      model: 'Hestur WereWolf Plus',
      motorPower: '3000 W',
      topSpeed: 'Mid-to-high speed (~65 km/h)',
      claimedRange: '150 km (up to 300 km in Eco)',
      batteryCharging: 'High-capacity pack (5 hrs charge)',
      keyFeatures: 'Available in 8 colors including Fiery Crimson Red and Graphite Grey Storm.',
    },
    {
      model: 'Hestur WereWolf (150 km)',
      motorPower: 'High-Torque Electric Motor',
      topSpeed: '~65 km/h (up to 90 km/h peak)',
      claimedRange: '150 km (up to 300 km in Eco)',
      batteryCharging: 'Removable pack (5 hrs charge)',
      keyFeatures:
        'Dual disc brakes, hill hold/assist, reverse gear, on-road ₹1,25,999.',
    },
    {
      model: '300 km Long-Range Variant',
      motorPower: 'High-output',
      topSpeed: 'Multi-mode',
      claimedRange: 'Up to 300 km (Eco)',
      batteryCharging: '4.5 kWh pack',
      keyFeatures: 'Three ride modes: Eco (300 km), Normal (~220 km), and Sport (~180 km).',
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
                src="/src/assets/images/scooter_battery_tech_1794361173099.jpg"
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
                    4-Yr Commuter · Up to 7–10 Yr Flagship Warranty
                  </div>
                  <div className="text-[11px] text-blue-800">
                    7 yrs / 1,40,000 km standard on 300 km variant (extendable to 10 yrs / 2,00,000 km)
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
        <Reveal delay={0.1} className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Model Comparison Matrix
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Hestur Energy Scooter Models
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              From 1000 W urban commuters to 8000 W &amp; 300 km long-range flagships
            </span>
          </div>

          {/* Desktop Comparison Table */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-5 font-bold">Model</th>
                    <th className="py-3.5 px-4 font-bold">Motor Power</th>
                    <th className="py-3.5 px-4 font-bold">Top Speed</th>
                    <th className="py-3.5 px-4 font-bold">Claimed Range</th>
                    <th className="py-3.5 px-4 font-bold">Battery &amp; Charging</th>
                    <th className="py-3.5 px-5 font-bold">Key Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {scooterPowertrainModels.map((item) => (
                    <tr key={item.model} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                        {item.model}
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-blue-600 whitespace-nowrap">
                        {item.motorPower}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-800 whitespace-nowrap">
                        {item.topSpeed}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-emerald-700 whitespace-nowrap">
                        {item.claimedRange}
                      </td>
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {item.batteryCharging}
                      </td>
                      <td className="py-4 px-5 text-slate-600 text-xs leading-relaxed max-w-xs">
                        {item.keyFeatures}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {scooterPowertrainModels.map((item) => (
              <div
                key={item.model}
                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <h4 className="font-bold text-slate-900 text-base">{item.model}</h4>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {item.claimedRange}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-500 block">Motor Power</span>
                    <span className="font-mono font-bold text-blue-600">{item.motorPower}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Top Speed</span>
                    <span className="font-mono font-semibold text-slate-900">{item.topSpeed}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Battery &amp; Charging</span>
                    <span className="font-medium text-slate-800">{item.batteryCharging}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200/70">
                  {item.keyFeatures}
                </p>
              </div>
            ))}
          </div>
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
