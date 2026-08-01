import React, { useState } from 'react';
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Bar for Vadodara Service */}
      <div className="bg-slate-900 text-slate-200 py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-flex items-center gap-1 bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-blue-500/30">
              <MapPin className="w-3 h-3 text-blue-400" /> Vadodara
            </span>
            <span>Home Service Available for Computer Repair, PC Builds & Networking</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300 text-[11px]">
            <a href="mailto:arrjstechnologies@gmail.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-400" /> arrjstechnologies@gmail.com
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Mon - Sat: 9:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="relative flex items-center justify-center">
              <img 
                src="/assets/logo/logo-icon.svg" 
                alt="ARRJS Technologies Logo" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
                <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                  ARRJS <span className="text-blue-600">Technologies</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Practical Technology Solutions
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200/80">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all transform active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-blue-200" />
              <span>Get Free Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3 py-2 rounded-lg transition-colors"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold w-full text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80' 
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
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase font-bold">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-xs text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Get Free Consultation</span>
            </button>
            <div className="text-center text-xs text-slate-500 pt-1">
              📍 Vadodara Home Service: Mon - Sat (9 AM - 7 PM)
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
