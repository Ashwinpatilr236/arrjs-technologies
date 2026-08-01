import React, { useState, useEffect } from 'react';
import { PageView, AdminLead } from '../types';
import { 
  Lock, 
  Unlock, 
  Search, 
  Filter, 
  Trash2, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ShoppingBag, 
  Plus, 
  RefreshCw, 
  Download, 
  ShieldCheck, 
  UserCheck, 
  ChevronRight,
  Sparkles,
  BarChart3,
  Globe,
  Wrench,
  AlertCircle
} from 'lucide-react';

interface AdminViewProps {
  setCurrentView: (view: PageView) => void;
}

// Initial Realistic Seed Leads
const INITIAL_DEMO_LEADS: AdminLead[] = [
  {
    id: 'lead-101',
    createdAt: '2026-08-01 10:15 AM',
    name: 'Rahul Patel',
    phone: '9825012345',
    email: 'rahul.patel@gmail.com',
    customerType: 'Small Business',
    specificService: 'Custom PC Build (Vadodara)',
    location: 'Alkapuri, Vadodara',
    isVadodaraResident: true,
    message: 'Looking for a high-performance RTX 4070 PC build for video editing and CAD work. Need doorstep assembly in Alkapuri.',
    status: 'new'
  },
  {
    id: 'lead-102',
    createdAt: '2026-08-01 09:30 AM',
    name: 'Ananya Sharma',
    phone: '9712345678',
    email: 'ananya.clinic@yahoo.com',
    customerType: 'Clinic',
    specificService: 'Website Development',
    location: 'Gotri, Vadodara',
    isVadodaraResident: true,
    message: 'Need a professional responsive website for my dental clinic with online appointment booking integration.',
    status: 'contacted'
  },
  {
    id: 'lead-103',
    createdAt: '2026-07-31 04:45 PM',
    name: 'Vikram Singh',
    phone: '9909988776',
    email: 'vikram.tech@gmail.com',
    customerType: 'Local Office',
    specificService: 'Basic Office Network Setup',
    location: 'Karelibaug, Vadodara',
    isVadodaraResident: true,
    message: 'We have 8 PCs in our office needing high-speed Wi-Fi router setup, LAN cabling, and shared printer configuration.',
    status: 'quoted'
  },
  {
    id: 'lead-104',
    createdAt: '2026-07-30 02:20 PM',
    name: 'Mehta Traders',
    phone: '9898011223',
    email: 'mehtatraders.brd@gmail.com',
    customerType: 'Retail Shop',
    specificService: 'Website Redesign',
    location: 'Mandvi, Vadodara',
    isVadodaraResident: true,
    message: 'Our existing HTML website is old and not mobile friendly. Want modern redesign for product showcase.',
    status: 'completed'
  }
];

export const AdminView: React.FC<AdminViewProps> = ({ setCurrentView }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('arrjs_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Leads State synced with localStorage
  const [leads, setLeads] = useState<AdminLead[]>(() => {
    const saved = localStorage.getItem('arrjs_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved leads", e);
      }
    }
    return INITIAL_DEMO_LEADS;
  });

  const [activeTab, setActiveTab] = useState<'leads' | 'store' | 'services' | 'settings'>('leads');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Manual Lead Form State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    customerType: 'Small Business',
    specificService: 'Website Development',
    location: 'Vadodara',
    message: ''
  });

  // Save leads to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('arrjs_leads', JSON.stringify(leads));
  }, [leads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('arrjs_admin_auth', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleQuickDemoUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('arrjs_admin_auth', 'true');
    setPasscodeError(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('arrjs_admin_auth');
  };

  const handleUpdateStatus = (id: string, newStatus: AdminLead['status']) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(prev => prev.filter(lead => lead.id !== id));
    }
  };

  const handleAddManualLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: AdminLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      customerType: newLeadForm.customerType,
      specificService: newLeadForm.specificService,
      location: newLeadForm.location,
      isVadodaraResident: newLeadForm.location.toLowerCase().includes('vadodara'),
      message: newLeadForm.message,
      status: 'new'
    };

    setLeads([newLead, ...leads]);
    setShowAddLeadModal(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      customerType: 'Small Business',
      specificService: 'Website Development',
      location: 'Vadodara',
      message: ''
    });
  };

  const handleResetDemoData = () => {
    if (window.confirm("Reset all leads data to default demo state?")) {
      setLeads(INITIAL_DEMO_LEADS);
      localStorage.setItem('arrjs_leads', JSON.stringify(INITIAL_DEMO_LEADS));
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.specificService.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const inTouchCount = leads.filter(l => l.status === 'contacted' || l.status === 'quoted').length;
  const completedCount = leads.filter(l => l.status === 'completed').length;
  const vadodaraCount = leads.filter(l => l.isVadodaraResident).length;

  // Render Login Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
              Internal Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              ARRJS Admin Portal
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Enter passcode to manage inquiries, leads, and store settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
              />
              {passcodeError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Incorrect passcode. Try <strong>admin123</strong> or click Quick Unlock.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/80">
            <button
              onClick={handleQuickDemoUnlock}
              className="w-full bg-slate-700/60 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Quick Demo Unlock (One-Click)</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            ARRJS Technologies • Lead Management & Operations System
          </div>

        </div>
      </div>
    );
  }

  // Render Admin Dashboard once authenticated
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  ARRJS Admin Dashboard
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active CRM
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Manage incoming customer leads, Vadodara doorstep repair requests & website inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddLeadModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Lead</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Lock Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Analytics & KPI Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total Inquiries</span>
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{totalLeads}</p>
            <p className="text-[11px] text-slate-400 font-medium">All incoming leads</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>New Unread</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-amber-400">{newLeadsCount}</p>
            <p className="text-[11px] text-amber-300/80 font-medium">Requires initial response</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Vadodara Doorstep</span>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">{vadodaraCount}</p>
            <p className="text-[11px] text-emerald-300/80 font-medium">Local PC/Network Service</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Completed Projects</span>
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{completedCount}</p>
            <p className="text-[11px] text-slate-400 font-medium">Successfully delivered</p>
          </div>

        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Leads ({totalLeads})</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'store'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tech Store Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Vadodara Coverage & Pricing</span>
          </button>
        </div>

        {/* TAB 1: CUSTOMER LEADS CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {(['all', 'new', 'contacted', 'quoted', 'completed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {status === 'all' ? 'All Status' : status}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>

            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Inquiries Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  No customer leads match your current search or status filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const statusColors = {
                    new: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                    contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                    quoted: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                    completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                  };

                  const whatsappText = encodeURIComponent(
                    `Hello ${lead.name},\nThank you for reaching out to ARRJS Technologies regarding "${lead.specificService}". We would be happy to discuss your requirements!`
                  );

                  return (
                    <div 
                      key={lead.id} 
                      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 rounded-2xl transition-all shadow-sm space-y-4"
                    >
                      {/* Top Row: Customer Info & Status Badge */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${statusColors[lead.status]}`}>
                              {lead.status}
                            </span>
                            <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold">
                              {lead.customerType}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                            <span>📅 Received: {lead.createdAt}</span>
                            <span>•</span>
                            <span className="text-blue-400 font-medium">🛠 Service: {lead.specificService}</span>
                          </p>
                        </div>

                        {/* Status Switcher Buttons */}
                        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                          {(['new', 'contacted', 'quoted', 'completed'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateStatus(lead.id, st)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                                lead.status === st 
                                  ? 'bg-blue-600 text-white shadow-xs' 
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Middle Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                        <div className="space-y-1">
                          <p className="text-slate-500 font-semibold uppercase text-[10px]">Contact Details</p>
                          <p className="flex items-center gap-1.5 font-bold text-white">
                            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                            <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                          </p>
                          {lead.email && (
                            <p className="flex items-center gap-1.5 text-slate-400">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              <a href={`mailto:${lead.email}`} className="hover:underline break-all">{lead.email}</a>
                            </p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-slate-500 font-semibold uppercase text-[10px]">Location & Service Coverage</p>
                          <p className="flex items-center gap-1.5 text-slate-200 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{lead.location}</span>
                          </p>
                          {lead.isVadodaraResident && (
                            <span className="inline-block text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                              Eligible for Vadodara Doorstep Service
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 md:col-span-1">
                          <p className="text-slate-500 font-semibold uppercase text-[10px]">Customer Message / Inquiry Note</p>
                          <p className="text-slate-300 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed text-xs">
                            "{lead.message || 'No additional message provided.'}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom Quick Action Bar */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/91${lead.phone}?text=${whatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                            <span>Call Phone</span>
                          </a>
                        </div>

                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 hover:bg-red-500/10 p-2 rounded-lg transition-colors cursor-pointer ml-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Reset Demo Data & Reset Bar */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Showing {filteredLeads.length} of {leads.length} total leads</span>
              <button
                onClick={handleResetDemoData}
                className="hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Leads</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: TECH STORE MANAGER */}
        {activeTab === 'store' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Tech Store Product Recommendations</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage hand-picked hardware curated for Amazon & Flipkart affiliate links.
                </p>
              </div>
              <button
                onClick={() => alert("Product recommendation added to store state!")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                  Affiliate Link Integrity
                </span>
                <h4 className="font-bold text-white text-sm">Amazon & Flipkart Partner Network</h4>
                <p className="text-slate-400">
                  All store links utilize transparent affiliate redirect tags. ARRJS Technologies does not hold physical stock.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                  Curated Catalog Status
                </span>
                <h4 className="font-bold text-white text-sm">Hardware & Accessories Verified</h4>
                <p className="text-slate-400">
                  12 active hardware recommendations across Laptops, PC Components, Networking, & Office Accessories.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VADODARA SERVICE SETTINGS */}
        {activeTab === 'services' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Vadodara Doorstep Service & Local Operations
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure operational areas, working hours, and pricing estimator guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
              
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm text-emerald-400">📍 Active Vadodara Service Areas</h4>
                <ul className="space-y-1.5 text-slate-400">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Alkapuri</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Akota</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Manjalpur</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Karelibaug</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gotri & Vasna</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sayajigunj & Subhanpura</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm text-blue-400">🕒 Operating Hours</h4>
                <div className="space-y-2">
                  <p className="text-slate-300 font-semibold">Monday - Saturday:</p>
                  <p className="text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">9:00 AM - 7:00 PM IST</p>
                  <p className="text-slate-400 text-[11px]">Sunday: Emergency / Pre-booked On-Site Only</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm text-amber-400">🛡 Local Guarantee Policy</h4>
                <p className="text-slate-400 leading-relaxed">
                  Clear upfront estimates provided before starting computer repair or PC assembly. No hidden diagnostic fees for Vadodara home visits.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Modal: Add Manual Lead */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" /> Add New Manual Lead
              </h3>
              <button 
                onClick={() => setShowAddLeadModal(false)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualLeadSubmit} className="space-y-3 text-xs text-left">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Anand Shah" 
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="9876543210" 
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location / Area</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alkapuri, Vadodara" 
                    value={newLeadForm.location}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Service Required</label>
                <input 
                  type="text" 
                  placeholder="e.g. Custom PC Build or Website Redesign" 
                  value={newLeadForm.specificService}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, specificService: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notes / Requirement</label>
                <textarea 
                  rows={3} 
                  placeholder="Additional details..." 
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-hidden focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
