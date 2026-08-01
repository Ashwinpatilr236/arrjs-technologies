import React from 'react';
import { PageView } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Wrench, 
  Wifi, 
  PhoneCall,
  Mail,
  HeartHandshake
} from 'lucide-react';

interface AboutViewProps {
  setCurrentView: (view: PageView) => void;
  onOpenConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentView, onOpenConsultation }) => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Top Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> About ARRJS Technologies
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Practical & Dependable Technology Solutions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Empowering individuals, homes, and small businesses with honest technical guidance, modern websites, custom PC builds, and networking services.
          </p>
        </div>
      </section>

      {/* Main Narrative & Positioning */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">
              Our Positioning & Core Purpose
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At ARRJS Technologies, we believe that technology should be accessible, practical, and straightforward. Many small businesses, shops, clinics, and individuals struggle with overpriced tech services, confusing jargon, or unreliable local hardware support.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We bridge this gap by providing practical technology solutions with complete transparency—offering responsive website development for clients worldwide alongside dependable doorstep computer and networking services across Vadodara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>🌐 Remote & Global Services</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Website Development, Website Redesign, and Custom Web Applications available remotely for clients anywhere in India and internationally.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>📍 Vadodara On-Site Services</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Custom PC Builds, PC Assembly, Computer Repair (non chip-level), Hardware Upgrades, Wi-Fi setup, and Basic Office Networking available strictly in Vadodara, Gujarat.
              </p>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Our Core Operating Commitments
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              How we work with every customer, home user, and business owner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Honest Technical Advice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never recommend unnecessary hardware upgrades or complex website features you do not need. We keep advice practical and cost-effective.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">No Hidden Costs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear scope and transparent timeline estimates before commencing any work, whether for web development or computer assembly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Prompt Local Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct communication with technical professionals who take pride in resolving issues quickly and effectively.
              </p>
            </div>

          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Have Questions or Need Tech Support?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Get in touch with ARRJS Technologies today. We are always ready to assist you.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-xs"
            >
              Get Free Consultation
            </button>
            <a
              href="mailto:arrjstechnologies@gmail.com"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-blue-400" /> arrjstechnologies@gmail.com
            </a>
          </div>
        </div>

      </section>

    </div>
  );
};
