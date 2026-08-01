import React, { useState } from 'react';
import { ESTIMATOR_SERVICES } from '../data/services';
import { Calculator, Clock, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface EstimatorProps {
  onSelectEstimateForBooking: (serviceName: string) => void;
}

export const Estimator: React.FC<EstimatorProps> = ({ onSelectEstimateForBooking }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['web-single']);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedServices = ESTIMATOR_SERVICES.filter(s => selectedIds.includes(s.id));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 mb-2">
            <Calculator className="w-3.5 h-3.5 text-blue-600" /> Transparent Pricing Guidance
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Interactive Service Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Select one or more services to calculate estimated timelines and typical budget ranges.
          </p>
        </div>

        <div className="text-right text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="font-semibold text-slate-800">Honesty First Policy</span>
          <p className="text-[11px] text-slate-500">No hidden charges or unexpected surprise fees.</p>
        </div>
      </div>

      {/* Service Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ESTIMATOR_SERVICES.map((item) => {
          const isChecked = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? 'bg-blue-50/70 border-blue-500/80 shadow-xs ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0 uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs mt-1.5">
                  <span className="font-bold text-blue-700">{item.baseEstimate}</span>
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" /> {item.timeframe}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estimate Summary Footer */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 font-medium">Selected Services ({selectedServices.length}):</p>
            <p className="text-sm font-semibold text-white mt-0.5">
              {selectedServices.map(s => s.name).join(' + ')}
            </p>
          </div>

          <button
            onClick={() => onSelectEstimateForBooking(selectedServices.map(s => s.name).join(', '))}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <span>Request Quote For Selected Items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Note: Estimates are indicative. Final quotes depend on exact scope, custom logic, or hardware component choices.</span>
        </div>
      </div>

    </div>
  );
};
