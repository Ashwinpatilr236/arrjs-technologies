import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { StoreView } from './components/StoreView';
import { PortfolioView } from './components/PortfolioView';
import { ContactView } from './components/ContactView';
import { ConsultationModal } from './components/ConsultationModal';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleOpenConsultation = (serviceName: string = '') => {
    setPreSelectedService(serviceName);
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenConsultation={() => handleOpenConsultation('')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            onOpenConsultation={() => handleOpenConsultation('')}
            onSelectServiceForBooking={(service) => handleOpenConsultation(service)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            setCurrentView={setCurrentView}
            onOpenConsultation={() => handleOpenConsultation('')}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            setCurrentView={setCurrentView}
            onOpenConsultationWithService={(service) => handleOpenConsultation(service)}
          />
        )}

        {currentView === 'store' && (
          <StoreView />
        )}

        {currentView === 'portfolio' && (
          <PortfolioView
            setCurrentView={setCurrentView}
            onOpenConsultationWithService={(service) => handleOpenConsultation(service)}
          />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenConsultation={() => handleOpenConsultation('')}
        isDarkMode={isDarkMode}
      />

      {/* Interactive Free Consultation Popup Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        preSelectedService={preSelectedService}
      />

      {/* Floating Action Button for Quick Consultation & WhatsApp Lead */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => handleOpenConsultation('Quick Inquiry from Floating Button')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 font-bold text-xs sm:text-sm active:scale-95 cursor-pointer border border-blue-400/40"
          title="Get Free Consultation"
        >
          <PhoneCall className="w-5 h-5 text-blue-200" />
          <span className="hidden sm:inline">Get Free Consultation</span>
        </button>
      </div>

    </div>
  );
}
