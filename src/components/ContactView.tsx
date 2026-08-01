import React, { useState } from 'react';
import { LeadFormData } from '../types';
import { 
  Mail, 
  Globe, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Send, 
  CheckCircle, 
  PhoneCall, 
  MessageSquare,
  Clock,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    customerType: 'Small Business',
    serviceCategory: 'web',
    specificService: 'Website Development',
    location: 'Vadodara',
    isVadodaraResident: true,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello ARRJS Technologies,\n\nI would like to contact you regarding a service query.\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `🏢 Category: ${formData.customerType}\n` +
      `🛠️ Service: ${formData.specificService}\n` +
      `📍 Location: ${formData.location}\n` +
      `📝 Note: ${formData.message || 'Please reach out to me.'}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-blue-400/30">
            <Mail className="w-4 h-4 text-blue-400" /> Contact ARRJS Technologies
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Get In Touch With Us
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have a project, custom PC build requirement, or need local Wi-Fi setup in Vadodara? Send us a message for prompt support.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Official Email */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Email</p>
              <a 
                href="mailto:arrjstechnologies@gmail.com" 
                className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors break-all"
              >
                arrjstechnologies@gmail.com
              </a>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inquiries, quote requests, and support messages are answered promptly.
            </p>
          </div>

          {/* Card 2: Official Website */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Website</p>
              <a 
                href="https://arrjs-technologies.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1 break-all"
              >
                arrjs-technologies.vercel.app
                <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
              </a>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Main portal for web solutions, Vadodara home services, and tech store curation.
            </p>
          </div>

          {/* Card 3: Vadodara Service Radius */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vadodara Home Service</p>
              <p className="text-base font-bold text-slate-900">
                Vadodara, Gujarat, India
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Doorstep computer repair, assembly & Wi-Fi setup across all Vadodara areas.
            </p>
          </div>

        </div>

        {/* Form & Social Media Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Send Us a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill out the form below and our team will get back to you with clear details.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4 bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    Thank you for reaching out to ARRJS Technologies. We will review your message and contact you shortly.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-xl inline-flex items-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your phone or WhatsApp"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.customerType}
                      onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden bg-white"
                    >
                      <option value="Small Business">Small Business / Shop Owner</option>
                      <option value="Clinic">Clinic / Medical Practice</option>
                      <option value="Retail Shop">Retail Shop</option>
                      <option value="Restaurant">Restaurant / Cafe</option>
                      <option value="Gym">Gym / Fitness Center</option>
                      <option value="Coaching Institute">Coaching Institute</option>
                      <option value="Freelancer">Freelancer / Professional</option>
                      <option value="Local Office">Local Office</option>
                      <option value="Home User">Home User / Individual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Interested In
                    </label>
                    <select
                      value={formData.specificService}
                      onChange={(e) => setFormData({ ...formData, specificService: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden bg-white"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Custom PC Build">Custom PC Build (Vadodara)</option>
                      <option value="PC Assembly">PC Assembly (Vadodara)</option>
                      <option value="Computer Repair">Computer Repair (Vadodara)</option>
                      <option value="Wi-Fi Setup">Wi-Fi & Router Setup (Vadodara)</option>
                      <option value="Basic Office Network Setup">Office Network Setup (Vadodara)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Location / Message Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide location in Vadodara or describe your web requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Side Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Social Media Presence */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Connect Online</span>
                <h3 className="text-xl font-bold text-white mt-1">Social Media Channels</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Follow ARRJS Technologies for technology recommendations, service updates, and web layout showcases.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3.5 rounded-2xl border border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white">Facebook Page</p>
                      <p className="text-[11px] text-slate-400">ARRJS Technologies</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3.5 rounded-2xl border border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white">Instagram Handle</p>
                      <p className="text-[11px] text-slate-400">@arrjstechnologies</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3.5 rounded-2xl border border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white">LinkedIn Company</p>
                      <p className="text-[11px] text-slate-400">ARRJS Technologies</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Service Guarantee Card */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Our Customer Service Pledge</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Prompt Communications:</strong> Clear response on timelines and pricing before starting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Vadodara On-Site Support:</strong> Computer and networking services at your home or office.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Honest Technical Scope:</strong> No chip-level repairs claimed; transparent advice provided.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
