import React, { useState } from 'react';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { PageView } from '../types';
import { 
  Laptop, 
  MapPin, 
  PhoneCall, 
  Menu, 
  X, 
  Globe, 
  Wrench, 
  ShoppingBag, 
  Briefcase, 
  Info, 
  Mail, 
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenConsultation
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Globe className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Wrench className="w-4 h-4" /> },
    { id: 'store', label: 'Tech Store', icon: <ShoppingBag className="w-4 h-4" />, badge: 'Curated' },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" />, badge: 'Demo' },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Read dynamic site config with real-time live sync
  const siteConfig = useSiteConfig();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Notification Bar for Vadodara Service */}
      <div className="bg-slate-900 text-slate-100 py-1.5 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-bold border border-emerald-500/30">
              <MapPin className="w-3 h-3 text-emerald-400" /> {siteConfig.locationCity || 'Vadodara'}
            </span>
            <span className="font-semibold text-slate-200">{siteConfig.topBannerText}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300 text-[11px]">
            <a href={`mailto:${siteConfig.officialEmail}`} className="hover:text-blue-300 transition-colors flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> {siteConfig.officialEmail}
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-300">{siteConfig.operatingHours}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo with Smooth Micro-Animation */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-hidden group cursor-pointer"
            aria-label="ARRJS Technologies Home"
          >
            <div className="relative py-1">
              <img 
                src="/assets/logo/logo.svg" 
                alt="ARRJS Technologies Logo" 
                className="h-11 sm:h-13 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/90 shadow-inner">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-white/80'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer border border-blue-500/30"
            >
              <PhoneCall className="w-4 h-4 text-blue-200 animate-pulse" />
              <span>Get Free Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all shadow-xs active:scale-95"
            >
              Consult
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold w-full text-left transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase font-extrabold">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md text-sm cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-blue-200" />
              <span>Get Free Consultation</span>
            </button>
            <div className="text-center text-xs text-slate-500 font-medium pt-1">
              📍 Vadodara Home Service: Mon - Sat (9 AM - 7 PM)
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
