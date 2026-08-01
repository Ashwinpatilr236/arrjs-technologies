import React from 'react';
import { PageView } from '../types';
import { Hero } from './Hero';
import { SERVICES_DATA } from '../data/services';
import { STORE_PRODUCTS } from '../data/store';
import { DEMO_PROJECTS } from '../data/portfolio';
import { VadodaraChecker } from './VadodaraChecker';
import { Estimator } from './Estimator';
import { 
  Globe, 
  Wrench, 
  Wifi, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  ShoppingBag, 
  ExternalLink,
  Briefcase,
  ShieldCheck,
  Building2,
  PhoneCall,
  Laptop,
  Check
} from 'lucide-react';

interface HomeViewProps {
  setCurrentView: (view: PageView) => void;
  onOpenConsultation: () => void;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  onOpenConsultation,
  onSelectServiceForBooking
}) => {

  const targetAudiences = [
    { title: 'Small Businesses', desc: 'Custom web development & basic office network setup.', icon: '🏢' },
    { title: 'Home Users', desc: 'Doorstep PC repair, Wi-Fi setup & hardware upgrades in Vadodara.', icon: '🏠' },
    { title: 'Clinics & Healthcare', desc: 'Professional practice websites & network printer sharing.', icon: '🩺' },
    { title: 'Retail Shops', desc: 'Product showcase websites & router installation.', icon: '🛍️' },
    { title: 'Restaurants & Cafes', desc: 'Digital menu sites & Wi-Fi setup for guests.', icon: '☕' },
    { title: 'Gyms & Fitness', desc: 'Membership trial websites & office PC assembly.', icon: '🏋️' },
    { title: 'Coaching Institutes', desc: 'Syllabus/course websites & multi-PC networking.', icon: '📚' },
    { title: 'Freelancers & Professionals', desc: 'Personal portfolio sites & custom PC builds.', icon: '💼' },
    { title: 'Local Offices', desc: 'LAN networking, printer sharing & PC hardware upgrades.', icon: '🏛️' },
    { title: 'Individuals', desc: 'Custom PC assembly & tech store recommendations.', icon: '👤' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <Hero setCurrentView={setCurrentView} onOpenConsultation={onOpenConsultation} />

      {/* Vadodara Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-blue-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-600/40 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Local Home Service Highlight
              </p>
              <p className="text-sm sm:text-base font-bold text-white">
                Computer Repair, Custom PC Build & Networking Home Service is available ONLY in Vadodara.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('services')}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            View Vadodara Services
          </button>
        </div>
      </div>

      {/* Services Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
            <Wrench className="w-3.5 h-3.5" /> What We Do
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Practical Technology Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Clean, reliable, and honest services for individuals, homes and local businesses.
          </p>
        </div>

        {/* 3 Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Category 1: Web Solutions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase">
                  Remote / Global
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">🌐 Web Solutions</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Build your brand online with clean, mobile-first websites.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Website Development (For shops, clinics, offices)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Website Redesign (Modernize old slow sites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Custom Web Applications & Portals</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentView('services')}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Web Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category 2: Computer Solutions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Vadodara Only
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Laptop className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">💻 Computer Solutions</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Doorstep PC building, repair & hardware upgrades in Vadodara.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom PC Build (Office, Editing, Gaming)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>PC Assembly with cable management</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Computer Repair (excluding chip-level repair)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SSD & RAM Hardware Upgrades</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentView('services')}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Vadodara PC Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category 3: Networking */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Vadodara Only
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Wifi className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">🌐 Networking</h3>
                <p className="text-xs text-slate-500 mt-1">
                  On-site wireless & office network setup in Vadodara.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Wi-Fi Setup & Mesh dead-zone elimination</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Router Installation & Security Config</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Basic Office Network & Switch Setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Network Printer Sharing Setup</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentView('services')}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Vadodara Networking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Target Audience Section */}
      <section className="bg-slate-50 py-12 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-100/80 px-3 py-1 rounded-full">
              Who We Serve
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tailored Solutions for Local Businesses & Individuals
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We understand the distinct technology needs of diverse local sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {targetAudiences.map((aud, idx) => (
              <div 
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow text-center space-y-1.5"
              >
                <div className="text-2xl">{aud.icon}</div>
                <h3 className="font-bold text-xs text-slate-900">{aud.title}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{aud.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Vadodara Service Availability Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VadodaraChecker 
          onSelectAreaForBooking={(area) => {
            onSelectServiceForBooking(`Doorstep Service in ${area}`);
          }}
        />
      </section>

      {/* Service Estimator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Estimator 
          onSelectEstimateForBooking={(services) => {
            onSelectServiceForBooking(services);
          }}
        />
      </section>

      {/* Tech Store Section Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200 mb-1">
              <ShoppingBag className="w-3.5 h-3.5" /> ARRJS Tech Store
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Curated Hardware & Tech Gear
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Recommended technology products redirected through trusted affiliate partners like Amazon & Flipkart.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('store')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition-colors shrink-0"
          >
            <span>Explore All Recommended Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Store Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_PRODUCTS.slice(0, 4).map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-slate-100 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    {product.categoryName}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2">
                  <span>Rating: ⭐ {product.rating}</span>
                  <span className="text-slate-400 font-medium">Affiliate Links</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.affiliateUrlAmazon && (
                    <a
                      href={product.affiliateUrlAmazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 text-[11px] font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Amazon</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {product.affiliateUrlFlipkart && (
                    <a
                      href={product.affiliateUrlFlipkart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Flipkart</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview Section (Clearly labeled Demo Project) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-300 mb-1">
              <Briefcase className="w-3.5 h-3.5" /> Sample Work
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Website Concepts & Demo Showcase
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Demonstrating the design quality and layout standards we build for local clients.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('portfolio')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition-colors shrink-0"
          >
            <span>View All Demo Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_PROJECTS.slice(0, 3).map((proj) => (
            <div 
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover" 
                  />
                  {/* Strict Demo Project Tag */}
                  <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider">
                    Demo Project
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-blue-600">
                    {proj.industry}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setCurrentView('portfolio')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <span>Explore Demo Concept</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Final Conversion CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden border border-blue-800/50">
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="bg-blue-600/30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30 inline-block">
              Let's Build Something Great Together
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Technology or Build Your Website?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Contact ARRJS Technologies today for honest technical guidance, transparent pricing, and prompt support.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Get Free Consultation</span>
            </button>

            <button
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Contact Info & Location</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
