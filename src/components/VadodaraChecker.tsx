import React, { useState } from 'react';
import { VADODARA_AREAS } from '../data/services';
import { MapPin, Search, CheckCircle2, Shield, Wrench, Wifi, Laptop } from 'lucide-react';

interface VadodaraCheckerProps {
  onSelectAreaForBooking?: (area: string) => void;
}

export const VadodaraChecker: React.FC<VadodaraCheckerProps> = ({ onSelectAreaForBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filteredAreas = VADODARA_AREAS.filter(area => 
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (area: string) => {
    setSelectedArea(area);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/40 shadow-xl relative overflow-hidden">
      
      {/* Decorative subtle ambient circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
            <MapPin className="w-3.5 h-3.5 text-blue-400" /> Doorstep Service Availability
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Vadodara Home & On-Site Service Checker
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Need computer repair, custom PC assembly, hardware upgrades, or office Wi-Fi setup at your doorstep in Vadodara? Check if your locality is covered!
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type your Vadodara area (e.g. Alkapuri, Gotri, Sama)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedArea(null);
            }}
            className="w-full pl-11 pr-4 py-3 bg-slate-800/90 border border-slate-700/80 rounded-xl text-white text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
          />
        </div>

        {/* Quick Area Chips */}
        <div className="space-y-2 text-center">
          <p className="text-xs text-slate-400 font-medium">Popular Vadodara Coverage Areas:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {filteredAreas.slice(0, 10).map((area) => (
              <button
                key={area}
                onClick={() => handleSelect(area)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  selectedArea === area 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-xs scale-105'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                📍 {area}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Area Result Banner */}
        {selectedArea && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 sm:p-5 rounded-2xl animate-in fade-in duration-200 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-white">
                    Service Available in {selectedArea}, Vadodara!
                  </h4>
                  <p className="text-xs text-emerald-200 mt-0.5 leading-relaxed">
                    Our technical technician is available for doorstep PC assembly, repair, SSD upgrades, and router network setup in {selectedArea}.
                  </p>
                </div>
              </div>

              {onSelectAreaForBooking && (
                <button
                  onClick={() => onSelectAreaForBooking(selectedArea)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors cursor-pointer shadow-xs"
                >
                  Book Home Service in {selectedArea}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Honest Service Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
            <Wrench className="w-4 h-4 text-blue-400" />
            <span>PC Assembly & Hardware</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
            <Wifi className="w-4 h-4 text-blue-400" />
            <span>Wi-Fi & Network Setup</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Transparent Service (No chip-level)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
