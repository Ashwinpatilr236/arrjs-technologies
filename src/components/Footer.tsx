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
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenConsultation, isDarkMode }) => {
  const navTo = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#070a11] text-slate-700 dark:text-slate-300 pt-16 pb-12 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logo/logo.svg" 
                alt="ARRJS Technologies Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
              ARRJS Technologies provides practical, dependable technology solutions for individuals, homes, and small businesses. From custom website development to home computer repair and networking in Vadodara.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 shadow-xs">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Home & On-Site Tech Service available in <strong>Vadodara, Gujarat</strong></span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Connect With Us</p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all shadow-xs"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all shadow-xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all shadow-xs"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('home')} className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-slate-400" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => navTo('services')} className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-slate-400" /> Services
                </button>
              </li>
              <li>
                <button onClick={() => navTo('store')} className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-slate-400" /> Tech Store
                </button>
              </li>
              <li>
                <button onClick={() => navTo('portfolio')} className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-slate-400" /> Demo Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-slate-400" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-slate-400" /> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Summary */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Our Solutions</p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>Website Development</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>Custom PC Build (Vadodara)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>PC Assembly (Vadodara)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>Computer Repair & Upgrades</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>Wi-Fi & Router Setup</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>Basic Office Networking</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Lead Action */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Direct Contact</p>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">Official Email</p>
                  <a href="mailto:arrjstechnologies@gmail.com" className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 font-semibold break-all">
                    arrjstechnologies@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">Official Website</p>
                  <a 
                    href="https://arrjs-technologies.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 font-semibold flex items-center gap-1 break-all"
                  >
                    arrjs-technologies.vercel.app
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors text-center cursor-pointer"
            >
              Request Free Consultation
            </button>
          </div>

        </div>

        {/* Affiliate Disclosure & Transparent Guarantees */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>ARRJS Tech Store Affiliate Partner Disclosure & Service Clarity</span>
          </div>
          <p className="leading-relaxed">
            <strong>Affiliate Partner Notice:</strong> Products featured in the ARRJS Tech Store are recommended through trusted affiliate partners such as Amazon and Flipkart. ARRJS Technologies does NOT maintain physical product inventory. Clicking affiliate links redirects you to partner platforms.
          </p>
          <p className="leading-relaxed text-slate-500 dark:text-slate-400">
            <strong>Local Service Notice:</strong> Computer repair, custom PC assembly, and networking home/on-site services are strictly available in <strong>Vadodara, Gujarat</strong>. Computer repair service excludes chip-level repairs. Website development and web redesign services are provided remotely for clients across India and globally.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ARRJS Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <button onClick={() => navTo('about')} className="hover:text-slate-900 dark:hover:text-slate-200">About</button>
            <span>•</span>
            <button onClick={() => navTo('services')} className="hover:text-slate-900 dark:hover:text-slate-200">Vadodara Services</button>
            <span>•</span>
            <button onClick={() => navTo('contact')} className="hover:text-slate-900 dark:hover:text-slate-200">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
