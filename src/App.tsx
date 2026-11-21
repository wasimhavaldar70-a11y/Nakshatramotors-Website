import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { EnergeticBentoSection } from './components/home/EnergeticBentoSection';
import { ScootersShowcase } from './components/home/ScootersShowcase';
import { BatteryTechSection } from './components/home/BatteryTechSection';
import { SavingsCalculator } from './components/home/SavingsCalculator';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { CustomerTrust } from './components/home/CustomerTrust';
import { FAQSection } from './components/home/FAQSection';
import { ContactSection } from './components/home/ContactSection';
import { ScootersPage } from './components/scooters/ScootersPage';
import { ScooterDetailPage } from './components/scooters/ScooterDetailPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './components/legal/LegalPages';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { TestRideModal } from './components/common/TestRideModal';
import { useStore } from './lib/store';

export default function App() {
  const store = useStore();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [testRideModalOpen, setTestRideModalOpen] = useState(false);
  const [selectedScooterForModal, setSelectedScooterForModal] = useState<string>('');

  // Synchronize browser history and path changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Redirect any legacy admin URLs directly to home
  useEffect(() => {
    if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
      window.history.replaceState({}, '', '/');
      setCurrentPath('/');
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const anchor = path.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTestRide = (scooterName?: string) => {
    setSelectedScooterForModal(scooterName || '');
    setTestRideModalOpen(true);
  };

  // Route matching
  const renderCurrentView = () => {
    // 1. Scooter detail page: /scooters/:slug
    if (currentPath.startsWith('/scooters/')) {
      const slug = currentPath.replace('/scooters/', '');
      return (
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenTestRideModal={() => handleOpenTestRide()}
          />
          <main>
            <ScooterDetailPage
              slug={slug}
              onBack={() => navigate('/scooters')}
              onNavigateToSlug={(newSlug) => navigate(`/scooters/${newSlug}`)}
              onBookTestRide={(scooterName) => handleOpenTestRide(scooterName)}
            />
          </main>
          <Footer onNavigate={navigate} />
          <WhatsAppFloatingButton activeScooterName={slug} />
        </>
      );
    }

    // 4. All scooters page: /scooters
    if (currentPath === '/scooters') {
      return (
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenTestRideModal={() => handleOpenTestRide()}
          />
          <main>
            <ScootersPage
              onSelectScooter={(slug) => navigate(`/scooters/${slug}`)}
              onBookTestRide={(scooterName) => handleOpenTestRide(scooterName)}
            />
          </main>
          <Footer onNavigate={navigate} />
          <WhatsAppFloatingButton />
        </>
      );
    }

    // 5. About page: /about
    if (currentPath === '/about') {
      return (
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenTestRideModal={() => handleOpenTestRide()}
          />
          <main>
            <AboutPage onNavigate={navigate} />
          </main>
          <Footer onNavigate={navigate} />
          <WhatsAppFloatingButton />
        </>
      );
    }

    // 6. Contact page: /contact
    if (currentPath === '/contact') {
      return (
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenTestRideModal={() => handleOpenTestRide()}
          />
          <main>
            <ContactPage />
          </main>
          <Footer onNavigate={navigate} />
          <WhatsAppFloatingButton />
        </>
      );
    }

    // 7. Privacy policy: /privacy-policy
    if (currentPath === '/privacy-policy') {
      return (
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenTestRideModal={() => handleOpenTestRide()}
          />
          <main>
            <PrivacyPolicyPage />
          </main>
          <Footer onNavigate={navigate} />
          <WhatsAppFloatingButton />
        </>
      );
    }

    // 8. Terms: /terms
    if (currentPath === '/terms') {
      return (
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenTestRideModal={() => handleOpenTestRide()}
          />
          <main>
            <TermsPage />
          </main>
          <Footer onNavigate={navigate} />
          <WhatsAppFloatingButton />
        </>
      );
    }

    // Default: Homepage (/)
    return (
      <>
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenTestRideModal={() => handleOpenTestRide()}
        />
        <main>
          {/* SECTION 1: Iconic Hero Section */}
          <HeroSection
            onExploreScooters={() => {
              const el = document.getElementById('scooters-showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onBookTestRide={() => handleOpenTestRide()}
          />

          {/* SECTION 2: Hestur Energy Electric Lineup — Engineered for Pure Performance */}
          <ScootersShowcase
            onSelectScooter={(slug) => navigate(`/scooters/${slug}`)}
            onBookTestRide={(scooterName) => handleOpenTestRide(scooterName)}
          />

          {/* SECTION 3: Certification Strip & Unique Bento Grid Structure */}
          <EnergeticBentoSection />

          {/* SECTION 4: Battery & Technology */}
          <BatteryTechSection />

          {/* SECTION 5: Savings Calculator Section */}
          <SavingsCalculator onBookTestRide={() => handleOpenTestRide()} />

          {/* SECTION 6: Why Choose Nakshatra Motors */}
          <WhyChooseUs />

          {/* SECTION 7: Customer Trust */}
          <CustomerTrust />

          {/* SECTION 8: FAQ */}
          <FAQSection />

          {/* SECTION 9: Contact & Enquiry */}
          <ContactSection />
        </main>
        <Footer onNavigate={navigate} />
        <WhatsAppFloatingButton />
      </>
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {renderCurrentView()}

        {/* Global Test Ride Modal */}
        <TestRideModal
          isOpen={testRideModalOpen}
          onClose={() => setTestRideModalOpen(false)}
          initialScooterName={selectedScooterForModal}
        />
      </div>
    </MotionConfig>
  );
}
