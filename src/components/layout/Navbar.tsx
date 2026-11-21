import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { generateWhatsAppLink } from '../../utils/evCalculations';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenTestRideModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const store = useStore();
  const settings = store.getSettings();

  const handleEnquireWhatsApp = () => {
    const text = `Hello ${settings.dealerName || 'Nakshatra Motors'}, I would like to enquire about your Hestur Energy electric scooters. Please share available models, pricing and specifications.`;
    const link = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Scooters', path: '/scooters' },
    { label: 'Battery & Tech', path: '/#battery-tech' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left group flex items-center focus:outline-none py-1"
              aria-label="Nakshatra Motors Home"
            >
              <img
                src="/assets/brand/nakshatra-logo.png"
                alt={`${settings.dealerName || 'Nakshatra Motors'} — ${settings.brandAffiliation || 'Authorized Hestur Energy Dealer'}`}
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.path);
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.path)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-blue-600 relative ${
                    isActive ? 'text-blue-600 font-bold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbarActiveLine"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action matching Lime Green Pill button */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={handleEnquireWhatsApp}
              className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-[#CCFF00] hover:bg-[#b8e600] active:scale-95 rounded-full transition-all duration-150 shadow-md shadow-[#CCFF00]/30 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={handleEnquireWhatsApp}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-[#CCFF00] rounded-full whitespace-nowrap flex items-center gap-1"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.path)}
                  className="text-left py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 border-b border-slate-100"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleEnquireWhatsApp();
                }}
                className="w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-[#CCFF00] hover:bg-[#b8e600] active:scale-95 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
