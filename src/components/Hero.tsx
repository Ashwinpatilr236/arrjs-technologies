import React from 'react';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { PageView } from '../types';
import { 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Wrench, 
  Wifi, 
  MapPin, 
  ShoppingBag,
  ShieldCheck,
  Building2,
  Users,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: PageView) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentView, onOpenConsultation }) => {
  const siteConfig = useSiteConfig();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      
      {/* Background Subtle Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-slate-700 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Location & Credibility Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{siteConfig.heroBadgeText}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Honest & Dependable Service</span>
          </div>
        </div>

        {/* Hero Heading & Subtitle */}
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {siteConfig.heroHeadline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-white">
              {siteConfig.heroHighlightText}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            {siteConfig.heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-blue-200 animate-pulse" />
              <span>Get Free Consultation</span>
            </button>

            <button
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-base px-7 py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 4 Core Pillar Feature Cards */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          {/* Card 1: Web Solutions */}
          <div 
            onClick={() => setCurrentView('services')}
            className="group bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/70 hover:border-blue-500/50 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                🌐 Web Solutions
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">Remote</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Custom Website Development, Website Redesign & Mobile Optimization.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center text-xs text-blue-400 font-semibold group-hover:text-blue-300">
              <span>Explore Web Services</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Computer Solutions */}
          <div 
            onClick={() => setCurrentView('services')}
            className="group bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/70 hover:border-blue-500/50 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                💻 Computer Solutions
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">Vadodara</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Custom PC Builds, PC Assembly, Computer Repair & Hardware Upgrades.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center text-xs text-blue-400 font-semibold group-hover:text-blue-300">
              <span>Vadodara Home Service</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Networking */}
          <div 
            onClick={() => setCurrentView('services')}
            className="group bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/70 hover:border-blue-500/50 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wifi className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                🌐 Networking
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">Vadodara</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Wi-Fi Setup, Router Config, Basic Office Network & Printer Sharing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center text-xs text-blue-400 font-semibold group-hover:text-blue-300">
              <span>On-Site Networking</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Tech Store */}
          <div 
            onClick={() => setCurrentView('store')}
            className="group bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/70 hover:border-blue-500/50 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                🛍 ARRJS Tech Store
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold">Curated</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Hand-picked hardware recommendations via Amazon & Flipkart partner links.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center text-xs text-blue-400 font-semibold group-hover:text-blue-300">
              <span>Browse Tech Store</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>

        {/* Quick Honest Guarantees Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left text-xs text-slate-300">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Honest & Upfront Guidance</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Small Businesses & Clinics</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Users className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Home Users & Individuals</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Local Vadodara Doorstep Service</span>
          </div>
        </div>



      </div>
    </section>
  );
};
