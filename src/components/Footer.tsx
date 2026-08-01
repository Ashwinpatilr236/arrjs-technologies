import React from 'react';
import { PageView } from '../types';
import { 
  Laptop, 
  Mail, 
  Globe, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ShieldCheck, 
  ExternalLink,
  ArrowRight,
  PhoneCall
} from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenConsultation }) => {
  const navTo = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 12-Column Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pb-8 border-b border-slate-800">
          
          {/* Column 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Bigger & Premium Logo Badge */}
            <div 
              onClick={() => navTo('home')}
              className="bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 inline-flex items-center group cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <img 
                src="/assets/logo/logo.svg" 
                alt="ARRJS Technologies Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              ARRJS Technologies provides practical, dependable technology solutions for individuals, homes, and small businesses. From custom website development to home computer repair and networking in Vadodara.
            </p>

            <div>
              <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs text-slate-200 shadow-xs">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Home & On-Site Tech Service available in <strong>Vadodara, Gujarat</strong></span>
              </div>
            </div>

            {/* Real Colorful Brand Social Media Badges */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Connect With Us</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>

                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A66C2] text-white text-xs font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('home')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => navTo('services')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Services
                </button>
              </li>
              <li>
                <button onClick={() => navTo('store')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Tech Store
                </button>
              </li>
              <li>
                <button onClick={() => navTo('portfolio')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Demo Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Our Solutions</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Website Development</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Custom PC Build (Vadodara)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>PC Assembly (Vadodara)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Computer Repair & Upgrades</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Wi-Fi & Router Setup</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Basic Office Networking</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact Cards (3 cols - Ample Width) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Direct Contact</p>
            
            <div className="space-y-2.5">
              {/* Email Card */}
              <a 
                href="mailto:arrjstechnologies@gmail.com"
                className="group flex items-center gap-3 bg-slate-800/90 hover:bg-slate-800 p-3 rounded-2xl border border-slate-700/80 hover:border-blue-500/50 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-400 text-[11px] font-semibold">Official Email</p>
                  <p className="text-white hover:text-blue-300 font-bold text-xs truncate">arrjstechnologies@gmail.com</p>
                </div>
              </a>

              {/* Website Card */}
              <a 
                href="https://arrjs-technologies.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-slate-800/90 hover:bg-slate-800 p-3 rounded-2xl border border-slate-700/80 hover:border-blue-500/50 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-400 text-[11px] font-semibold">Official Website</p>
                  <p className="text-white hover:text-blue-300 font-bold text-xs truncate flex items-center justify-between gap-1">
                    <span>arrjs-technologies.vercel.app</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </p>
                </div>
              </a>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <PhoneCall className="w-4 h-4 text-blue-200" />
              <span>Request Free Consultation</span>
            </button>
          </div>

        </div>

        {/* Affiliate Disclosure & Service Clarity */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 text-xs text-slate-400 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>ARRJS Tech Store Affiliate Partner Disclosure & Service Clarity</span>
          </div>
          <p className="leading-relaxed">
            <strong>Affiliate Partner Notice:</strong> Products featured in the ARRJS Tech Store are recommended through trusted affiliate partners such as Amazon and Flipkart. ARRJS Technologies does NOT maintain physical product inventory. Clicking affiliate links redirects you to partner platforms.
          </p>
          <p className="leading-relaxed text-slate-400">
            <strong>Local Service Notice:</strong> Computer repair, custom PC assembly, and networking home/on-site services are strictly available in <strong>Vadodara, Gujarat</strong>. Computer repair service excludes chip-level repairs. Website development and web redesign services are provided remotely for clients across India and globally.
          </p>
        </div>

        {/* Bottom Copyright & Quick Links */}
        <div className="mt-5 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} ARRJS Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <button onClick={() => navTo('about')} className="hover:text-slate-200 transition-colors cursor-pointer">About</button>
            <span>•</span>
            <button onClick={() => navTo('services')} className="hover:text-slate-200 transition-colors cursor-pointer">Vadodara Services</button>
            <span>•</span>
            <button onClick={() => navTo('contact')} className="hover:text-slate-200 transition-colors cursor-pointer">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
