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
import { AdminView } from './components/AdminView';
import { ConsultationModal } from './components/ConsultationModal';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleOpenConsultation = (serviceName: string = '') => {
    setPreSelectedService(serviceName);
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenConsultation={() => handleOpenConsultation('')}
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

        {currentView === 'admin' && (
          <AdminView setCurrentView={setCurrentView} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenConsultation={() => handleOpenConsultation('')}
      />

      {/* Interactive Free Consultation Popup Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        preSelectedService={preSelectedService}
      />

      {/* Floating Action Button for Quick Consultation */}
      <div className="fixed bottom-6 right-6 z-40 animate-float">
        <button
          onClick={() => handleOpenConsultation('Quick Inquiry from Floating Button')}
          className="group flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-blue-900/20 border border-slate-700/90 hover:border-blue-400/50 transition-all duration-300 cursor-pointer active:scale-95 hover:scale-105"
          title="Get Free Consultation"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-xs">
            <PhoneCall className="w-3.5 h-3.5 text-blue-100" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-100 group-hover:text-white">
            Get Free Consultation
          </span>
        </button>
      </div>

    </div>
  );
}
