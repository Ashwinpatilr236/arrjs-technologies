import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { PageView, ServiceItem } from '../types';
import { 
  Globe, 
  Wrench, 
  Wifi, 
  MapPin, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  ShieldAlert,
  Search,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface ServicesViewProps {
  setCurrentView: (view: PageView) => void;
  onOpenConsultationWithService: (serviceName: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  setCurrentView,
  onOpenConsultationWithService
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'computer' | 'networking'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Read dynamic services list from localStorage
  const servicesList: ServiceItem[] = React.useMemo(() => {
    const saved = localStorage.getItem('arrjs_admin_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SERVICES_DATA;
  }, []);

  const filteredServices = servicesList.filter((service) => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-blue-400/30">
            <Wrench className="w-4 h-4 text-blue-400" /> Professional Solutions Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our Technology Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Custom Web Development available worldwide, plus on-site Computer Repair, Custom PC Builds, and Networking home services in Vadodara.
          </p>
        </div>

        {/* Location Notice Card */}
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-800 space-y-1">
              <p className="font-bold text-slate-900">
                Service Coverage Notice
              </p>
              <p className="text-slate-600 leading-relaxed">
                • <strong>Web Solutions</strong> are delivered remotely across India & internationally.<br />
                • <strong>Computer Solutions</strong> & <strong>Networking Services</strong> are doorstep services <strong>strictly in Vadodara, Gujarat</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultationWithService('Vadodara On-Site Service')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Inquire Doorstep Service
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Services ({servicesList.length})
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'web' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌐 Web Solutions
            </button>
            <button
              onClick={() => setActiveTab('computer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'computer' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              💻 Computer (Vadodara)
            </button>
            <button
              onClick={() => setActiveTab('networking')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'networking' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌐 Networking (Vadodara)
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-blue-600"
            />
          </div>

        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              {/* Top Category & Trending Tag Badges */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                    {service.categoryTitle}
                  </span>
                  {(() => {
                    const tagList = (service.badges && service.badges.length > 0)
                      ? service.badges
                      : (service.badge ? service.badge.split(',').map(b => b.trim()).filter(Boolean) : []);
                    
                    return tagList.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-extrabold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                        {tag}
                      </span>
                    ));
                  })()}
                </div>

                {service.isLocalOnly ? (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" /> Vadodara Doorstep
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Globe className="w-3 h-3 text-blue-600" /> Worldwide Remote
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Key Service Highlights:</p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location & Timeline footer */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {service.estimatedTimeline || '2-5 days'}
                  </span>
                </div>

                <button
                  onClick={() => onOpenConsultationWithService(service.title)}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book / Inquire for {service.title}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Disclaimer for Computer Repair */}
        <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl text-xs text-slate-600 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
          <p>
            <strong>Note on Computer Repair:</strong> ARRJS Technologies provides software diagnostics, component replacement, OS installation, and hardware upgrades. We explicitly <strong>exclude chip-level repair</strong> to maintain quality and reliability.
          </p>
        </div>

      </div>
    </div>
  );
};
