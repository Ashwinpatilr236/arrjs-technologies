import React, { useState } from 'react';
import { LeadFormData } from '../types';
import { 
  X, 
  Send, 
  CheckCircle, 
  PhoneCall, 
  MapPin, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = ''
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    customerType: 'Small Business',
    serviceCategory: 'web',
    specificService: preSelectedService || 'Website Development',
    location: 'Vadodara',
    isVadodaraResident: true,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello ARRJS Technologies,\n\nI would like to request a Free Consultation.\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `🏢 Category: ${formData.customerType}\n` +
      `🛠️ Service: ${formData.specificService}\n` +
      `📍 Location: ${formData.location} ${formData.isVadodaraResident ? '(Vadodara Resident)' : ''}\n` +
      `📝 Note: ${formData.message || 'Please contact me regarding my enquiry.'}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white text-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between relative">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-600/30 text-blue-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400" /> Free & Honest Guidance
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Get Free Consultation
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              No pressure. Tell us what you need and we will provide clear options & estimates.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Enquiry Submitted!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our team at ARRJS Technologies will review your requirement and respond shortly.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-700 text-left space-y-1.5">
                <p><strong>Service:</strong> {formData.specificService}</p>
                <p><strong>Customer Category:</strong> {formData.customerType}</p>
                <p><strong>Location:</strong> {formData.location}</p>
                <p><strong>Email:</strong> arrjstechnologies@gmail.com</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct WhatsApp Message</span>
                </button>
                <button
                  onClick={resetForm}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahulp@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden"
                />
              </div>

              {/* Customer Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  You are inquiring for:
                </label>
                <select
                  value={formData.customerType}
                  onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden bg-white"
                >
                  <option value="Small Business">Small Business / Shop Owner</option>
                  <option value="Clinic">Clinic / Medical Practice</option>
                  <option value="Retail Shop">Retail Shop / Showroom</option>
                  <option value="Restaurant">Restaurant / Cafe</option>
                  <option value="Gym">Gym / Fitness Center</option>
                  <option value="Coaching Institute">Coaching Institute / School</option>
                  <option value="Freelancer">Freelancer / Professional</option>
                  <option value="Local Office">Local Office</option>
                  <option value="Home User">Home User / Individual</option>
                </select>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Service:
                </label>
                <select
                  value={formData.specificService}
                  onChange={(e) => setFormData({ ...formData, specificService: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden bg-white"
                >
                  <optgroup label="🌐 Web Solutions (Worldwide)">
                    <option value="Website Development">Website Development</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Custom Website Development">Custom Web Development</option>
                  </optgroup>
                  <optgroup label="💻 Computer Solutions (Vadodara Home Service)">
                    <option value="Custom PC Build">Custom PC Build</option>
                    <option value="PC Assembly">PC Assembly</option>
                    <option value="Computer Repair">Computer Repair (non chip-level)</option>
                    <option value="Hardware Upgrades">SSD & RAM Hardware Upgrade</option>
                  </optgroup>
                  <optgroup label="🌐 Networking (Vadodara On-Site)">
                    <option value="Wi-Fi Setup">Wi-Fi & Mesh Network Setup</option>
                    <option value="Router Installation">Router Installation</option>
                    <option value="Basic Office Network Setup">Basic Office Network Setup</option>
                    <option value="Printer Sharing">Printer Sharing Setup</option>
                  </optgroup>
                  <optgroup label="🛍 Tech Store Inquiry">
                    <option value="Product Recommendation Query">Product Recommendation Query</option>
                  </optgroup>
                </select>
              </div>

              {/* Location & Vadodara Indicator */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Location / Area
                  </label>
                  <label className="text-xs text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isVadodaraResident}
                      onChange={(e) => setFormData({ ...formData, isVadodaraResident: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Vadodara Resident</span>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="e.g. Alkapuri, Vadodara or City Name"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-hidden bg-white"
                />

                {formData.isVadodaraResident && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Eligible for Doorstep / On-site Computer & Networking Services in Vadodara.
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Details / Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your requirement or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Honest service guarantee. No artificial spam. Direct support from ARRJS Technologies.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
