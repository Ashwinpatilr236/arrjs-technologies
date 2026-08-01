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
  ArrowRight
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
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <img 
                  src="/assets/logo/logo-icon.svg" 
                  alt="ARRJS Technologies Logo" 
                  className="w-10 h-10 rounded-xl object-contain shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-10 h-10 rounded-xl bg-blue-600 items-center justify-center text-white shadow-md">
                  <Laptop className="w-5 h-5 text-blue-200" />
                </div>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                ARRJS <span className="text-blue-400">Technologies</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              ARRJS Technologies provides practical, dependable technology solutions for individuals, homes, and small businesses. From custom website development to home computer repair and networking in Vadodara.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Home & On-Site Tech Service available in <strong>Vadodara, Gujarat</strong></span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connect With Us</p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-500 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('home')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => navTo('services')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Services
                </button>
              </li>
              <li>
                <button onClick={() => navTo('store')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Tech Store
                </button>
              </li>
              <li>
                <button onClick={() => navTo('portfolio')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Demo Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Summary */}
          <div className="space-y-3">
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

          {/* Column 4: Official Contact & Lead Action */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Direct Contact</p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 font-medium text-[11px]">Official Email</p>
                  <a href="mailto:arrjstechnologies@gmail.com" className="text-white hover:text-blue-300 font-semibold break-all">
                    arrjstechnologies@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 font-medium text-[11px]">Official Website</p>
                  <a 
                    href="https://arrjs-technologies.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 font-semibold flex items-center gap-1 break-all"
                  >
                    arrjs-technologies.vercel.app
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors text-center"
            >
              Request Free Consultation
            </button>
          </div>

        </div>

        {/* Affiliate Disclosure & Transparent Guarantees */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
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

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ARRJS Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => navTo('about')} className="hover:text-slate-300">About</button>
            <span>•</span>
            <button onClick={() => navTo('services')} className="hover:text-slate-300">Vadodara Services</button>
            <span>•</span>
            <button onClick={() => navTo('contact')} className="hover:text-slate-300">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
