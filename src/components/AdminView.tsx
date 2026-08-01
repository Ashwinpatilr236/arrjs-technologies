import React, { useState, useEffect } from 'react';
import { PageView, AdminLead, ServiceItem, StoreProduct, DemoProject, SiteConfig } from '../types';
import { SERVICES_DATA } from '../data/services';
import { STORE_PRODUCTS } from '../data/store';
import { DEMO_PROJECTS } from '../data/portfolio';
import { DEFAULT_SITE_CONFIG } from '../data/config';
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
  AlertCircle,
  Briefcase,
  Edit3,
  Eye,
  Sliders,
  Settings,
  X,
  ExternalLink,
  Layers,
  Save,
  Share2,
  FileText,
  Link as LinkIcon
} from 'lucide-react';

interface AdminViewProps {
  setCurrentView: (view: PageView) => void;
}

// Initial Seed Leads
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

  // Active Tab State (Defaults to 'customizer' for immediate view)
  const [activeTab, setActiveTab] = useState<'leads' | 'services' | 'store' | 'portfolio' | 'customizer' | 'settings'>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('leads')) return 'leads';
    if (hash.includes('services')) return 'services';
    if (hash.includes('store')) return 'store';
    if (hash.includes('portfolio')) return 'portfolio';
    return 'customizer';
  });

  // Leads State
  const [leads, setLeads] = useState<AdminLead[]>(() => {
    const saved = localStorage.getItem('arrjs_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_DEMO_LEADS;
  });

  // Services State
  const [servicesList, setServicesList] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('arrjs_admin_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SERVICES_DATA;
  });

  // Store Products State
  const [storeList, setStoreList] = useState<StoreProduct[]>(() => {
    const saved = localStorage.getItem('arrjs_admin_store');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return STORE_PRODUCTS;
  });

  // Portfolio Projects State
  const [portfolioList, setPortfolioList] = useState<DemoProject[]>(() => {
    const saved = localStorage.getItem('arrjs_admin_portfolio');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEMO_PROJECTS;
  });

  // Full Site Customization Config State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('arrjs_site_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
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

  // Full Item Editor Modals State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingStoreProduct, setEditingStoreProduct] = useState<StoreProduct | null>(null);
  const [editingPortfolioProject, setEditingPortfolioProject] = useState<DemoProject | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('arrjs_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('arrjs_admin_services', JSON.stringify(servicesList));
  }, [servicesList]);

  useEffect(() => {
    localStorage.setItem('arrjs_admin_store', JSON.stringify(storeList));
  }, [storeList]);

  useEffect(() => {
    localStorage.setItem('arrjs_admin_portfolio', JSON.stringify(portfolioList));
  }, [portfolioList]);

  useEffect(() => {
    localStorage.setItem('arrjs_site_config', JSON.stringify(siteConfig));
    window.dispatchEvent(new Event('arrjs_site_config_updated'));
  }, [siteConfig]);

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

  const handleUpdateLeadStatus = (id: string, newStatus: AdminLead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(prev => prev.filter(l => l.id !== id));
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

  // Service Save Handler
  const handleSaveServiceItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServicesList(prev => {
      const exists = prev.some(s => s.id === editingService.id);
      if (exists) {
        return prev.map(s => s.id === editingService.id ? editingService : s);
      }
      return [editingService, ...prev];
    });
    setEditingService(null);
  };

  // Store Product Save Handler
  const handleSaveStoreProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStoreProduct) return;

    setStoreList(prev => {
      const exists = prev.some(p => p.id === editingStoreProduct.id);
      if (exists) {
        return prev.map(p => p.id === editingStoreProduct.id ? editingStoreProduct : p);
      }
      return [editingStoreProduct, ...prev];
    });
    setEditingStoreProduct(null);
  };

  // Portfolio Save Handler
  const handleSavePortfolioProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolioProject) return;

    setPortfolioList(prev => {
      const exists = prev.some(p => p.id === editingPortfolioProject.id);
      if (exists) {
        return prev.map(p => p.id === editingPortfolioProject.id ? editingPortfolioProject : p);
      }
      return [editingPortfolioProject, ...prev];
    });
    setEditingPortfolioProject(null);
  };

  const handleSaveSiteConfig = () => {
    localStorage.setItem('arrjs_site_config', JSON.stringify(siteConfig));
    alert("Website Customization Settings saved successfully!");
  };

  const handleResetAllDemoData = () => {
    if (window.confirm("Reset all CRM leads, services, products, portfolio, and customization settings back to original defaults?")) {
      setLeads(INITIAL_DEMO_LEADS);
      setServicesList(SERVICES_DATA);
      setStoreList(STORE_PRODUCTS);
      setPortfolioList(DEMO_PROJECTS);
      setSiteConfig(DEFAULT_SITE_CONFIG);
      localStorage.removeItem('arrjs_leads');
      localStorage.removeItem('arrjs_admin_services');
      localStorage.removeItem('arrjs_admin_store');
      localStorage.removeItem('arrjs_admin_portfolio');
      localStorage.removeItem('arrjs_site_config');
      alert("All data and customization settings reset to original defaults!");
    }
  };

  const handleExportDataJSON = () => {
    const data = {
      leads,
      servicesList,
      storeList,
      portfolioList,
      siteConfig,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `arrjs-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.specificService.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const inTouchCount = leads.filter(l => l.status === 'contacted' || l.status === 'quoted').length;
  const completedCount = leads.filter(l => l.status === 'completed').length;
  const vadodaraCount = leads.filter(l => l.isVadodaraResident).length;

  // Render Passcode Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
              Secret Control Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              ARRJS Admin Portal
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Enter passcode to manage inquiries, services, store items, and website customization.
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
                placeholder="Enter passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-hidden"
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
              <span>Unlock Admin Dashboard</span>
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
            ARRJS Technologies • Comprehensive Business & Customization Portal
          </div>

        </div>
      </div>
    );
  }

  // Render Full Admin Portal Dashboard
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
                  ARRJS Control Center
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Full Customization Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Full site management: Leads CRM, Website Content Customizer, Services, Tech Store & Portfolio.
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total Leads</span>
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">{totalLeads}</p>
            <p className="text-[11px] text-slate-400 font-medium">Inquiries received</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>New Unread</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{newLeadsCount}</p>
            <p className="text-[11px] text-amber-300/80 font-medium">Action required</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Vadodara Doorstep</span>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{vadodaraCount}</p>
            <p className="text-[11px] text-emerald-300/80 font-medium">On-site repair/assembly</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Active Services</span>
              <Wrench className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">{servicesList.length}</p>
            <p className="text-[11px] text-slate-400 font-medium">Web, PC & Network</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Store Products</span>
              <ShoppingBag className="w-4 h-4 text-pink-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">{storeList.length}</p>
            <p className="text-[11px] text-slate-400 font-medium">Curated recommendations</p>
          </div>

        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Leads ({totalLeads})</span>
          </button>

          <button
            onClick={() => setActiveTab('customizer')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'customizer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Site Customizer (Full Control)</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services Catalog ({servicesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'store'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tech Store ({storeList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'portfolio'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Demo Portfolio ({portfolioList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Operations & Backup</span>
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
                    `Hello ${lead.name},\nThank you for reaching out to ${siteConfig.companyName} regarding "${lead.specificService}". We would be happy to discuss your requirements!`
                  );

                  return (
                    <div 
                      key={lead.id} 
                      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 rounded-2xl transition-all shadow-sm space-y-4"
                    >
                      {/* Top Row */}
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
                              onClick={() => handleUpdateLeadStatus(lead.id, st)}
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

                      {/* Bottom Action Bar */}
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
          </div>
        )}

        {/* TAB 2: SITE CUSTOMIZER — Click-to-Edit */}
        {activeTab === 'customizer' && (() => {
          // --- Inline Edit Field Component ---
          const InlineField = ({
            label, hint, value, fieldKey, type = 'text', isTextarea = false, accentColor = 'blue'
          }: {
            label: string; hint?: string; value: string;
            fieldKey: keyof SiteConfig; type?: string;
            isTextarea?: boolean; accentColor?: string;
          }) => {
            const [editing, setEditing] = React.useState(false);
            const [draft, setDraft] = React.useState(value);
            const inputRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null);

            React.useEffect(() => { setDraft(value); }, [value]);
            React.useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

            const commit = () => {
              setSiteConfig(prev => ({ ...prev, [fieldKey]: draft }));
              setEditing(false);
            };
            const cancel = () => { setDraft(value); setEditing(false); };

            const ringClass = accentColor === 'emerald' ? 'focus:ring-emerald-500' : accentColor === 'purple' ? 'focus:ring-purple-500' : accentColor === 'amber' ? 'focus:ring-amber-500' : 'focus:ring-blue-500';
            const borderActiveClass = accentColor === 'emerald' ? 'border-emerald-500' : accentColor === 'purple' ? 'border-purple-500' : accentColor === 'amber' ? 'border-amber-500' : 'border-blue-500';

            return (
              <div className="group/field">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-semibold text-[11px] uppercase tracking-wider">{label}</label>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="opacity-0 group-hover/field:opacity-100 flex items-center gap-1 text-[10px] text-slate-400 hover:text-blue-400 transition-all px-2 py-0.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  )}
                </div>

                {editing ? (
                  <div className="space-y-1.5">
                    {isTextarea ? (
                      <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        rows={3}
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Escape') cancel(); }}
                        className={`w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 ${borderActiveClass} text-white text-xs outline-none leading-relaxed transition-all ${ringClass}`}
                      />
                    ) : (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type={type}
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel(); }}
                        className={`w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 ${borderActiveClass} text-white text-xs font-medium outline-none transition-all ${ringClass}`}
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <button onClick={commit} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                        <CheckCircle2 className="w-3 h-3" /> Save
                      </button>
                      <button onClick={cancel} className="flex items-center gap-1 text-slate-400 hover:text-white text-[10px] px-2 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                        <X className="w-3 h-3" /> Cancel
                      </button>
                      <span className="text-[9px] text-slate-600 ml-1">Enter to save · Esc to cancel</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-600 text-white text-xs font-medium transition-all cursor-pointer group/val flex items-center justify-between gap-2 hover:bg-slate-950"
                    title="Click to edit"
                  >
                    <span className={`truncate ${!draft ? 'text-slate-500 italic' : ''}`}>
                      {draft || `(empty — click to set ${label})`}
                    </span>
                    <Edit3 className="w-3 h-3 text-slate-600 group-hover/val:text-blue-400 shrink-0 transition-colors" />
                  </button>
                )}

                {hint && !editing && (
                  <p className="text-[10px] text-slate-500 mt-1">{hint}</p>
                )}
              </div>
            );
          };

          // --- Inline Stat Pair ---
          const StatPair = ({ label, valKey, labelKey, valDefault, labelDefault }: {
            label: string; valKey: keyof SiteConfig; labelKey: keyof SiteConfig;
            valDefault: string; labelDefault: string;
          }) => {
            const [editingVal, setEditingVal] = React.useState(false);
            const [editingLabel, setEditingLabel] = React.useState(false);
            const [draftVal, setDraftVal] = React.useState(String(siteConfig[valKey] || valDefault));
            const [draftLabel, setDraftLabel] = React.useState(String(siteConfig[labelKey] || labelDefault));

            React.useEffect(() => { setDraftVal(String(siteConfig[valKey] || valDefault)); }, [siteConfig[valKey]]);
            React.useEffect(() => { setDraftLabel(String(siteConfig[labelKey] || labelDefault)); }, [siteConfig[labelKey]]);

            return (
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 group/stat">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{label}</span>
                </div>
                {/* Value */}
                {editingVal ? (
                  <div className="flex gap-1.5">
                    <input autoFocus value={draftVal} onChange={e => setDraftVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { setSiteConfig(p => ({ ...p, [valKey]: draftVal })); setEditingVal(false); } if (e.key === 'Escape') setEditingVal(false); }}
                      className="flex-1 min-w-0 px-2 py-1 bg-slate-900 border border-blue-500 text-white text-xs font-bold rounded-lg outline-none" />
                    <button onClick={() => { setSiteConfig(p => ({ ...p, [valKey]: draftVal })); setEditingVal(false); }} className="bg-blue-600 text-white text-[10px] px-2 rounded-lg">✓</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingVal(true)} className="w-full text-left px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-between">
                    <span>{draftVal}</span><Edit3 className="w-2.5 h-2.5 text-slate-600" />
                  </button>
                )}
                {/* Label */}
                {editingLabel ? (
                  <div className="flex gap-1.5">
                    <input autoFocus value={draftLabel} onChange={e => setDraftLabel(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { setSiteConfig(p => ({ ...p, [labelKey]: draftLabel })); setEditingLabel(false); } if (e.key === 'Escape') setEditingLabel(false); }}
                      className="flex-1 min-w-0 px-2 py-1 bg-slate-900 border border-blue-500 text-slate-300 text-[11px] rounded-lg outline-none" />
                    <button onClick={() => { setSiteConfig(p => ({ ...p, [labelKey]: draftLabel })); setEditingLabel(false); }} className="bg-blue-600 text-white text-[10px] px-2 rounded-lg">✓</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingLabel(true)} className="w-full text-left px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 text-slate-400 text-[11px] transition-colors cursor-pointer flex items-center justify-between">
                    <span>{draftLabel}</span><Edit3 className="w-2.5 h-2.5 text-slate-600" />
                  </button>
                )}
              </div>
            );
          };

          return (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    Website Content &amp; Branding Customizer
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Edit3 className="w-3 h-3 text-blue-400" />
                    Click any field to edit it — press Enter or ✓ to save
                  </p>
                </div>
                <button
                  onClick={handleSaveSiteConfig}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All</span>
                </button>
              </div>

              {/* Section 1: Company Profile */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" /> 1. Company Profile &amp; Official Contacts
                  </h4>
                  <span className="text-[11px] bg-blue-500/10 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/20 font-semibold">Header &amp; Footer Synced</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <InlineField label="Company Name" fieldKey="companyName" value={siteConfig.companyName} hint="Primary business name displayed everywhere." />
                  <InlineField label="Business Tagline" fieldKey="tagline" value={siteConfig.tagline} hint="Short slogan under logo &amp; footer." />
                  <InlineField label="Official Email Address" fieldKey="officialEmail" value={siteConfig.officialEmail} type="email" hint="Direct contact email link." />
                  <InlineField label="Official Phone Number" fieldKey="officialPhone" value={siteConfig.officialPhone} hint="Clickable call link across site." />
                  <InlineField label="WhatsApp Number (no spaces/dashes)" fieldKey="officialWhatsApp" value={siteConfig.officialWhatsApp || ''} accentColor="emerald" hint="e.g. 919825012345 — used for 1-click customer chat." />
                  <InlineField label="Operating Business Hours" fieldKey="operatingHours" value={siteConfig.operatingHours} hint="Working schedule in top notification bar." />
                  <InlineField label="Location City" fieldKey="locationCity" value={siteConfig.locationCity} hint="Primary service area badge." />
                  <InlineField label="Full Office Address" fieldKey="officeAddress" value={siteConfig.officeAddress || ''} hint="Displayed in contact view &amp; Google Snippets." />
                </div>
              </div>

              {/* Section 2: Banner & Hero */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" /> 2. Top Banner &amp; Hero Section
                  </h4>
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">Hero Live Preview</span>
                </div>
                <div className="space-y-4 text-xs">
                  <InlineField label="Top Notification Banner Text" fieldKey="topBannerText" value={siteConfig.topBannerText} accentColor="emerald" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InlineField label="Hero Main Headline (Start)" fieldKey="heroHeadline" value={siteConfig.heroHeadline} />
                    <InlineField label="Hero Highlight Gradient Text" fieldKey="heroHighlightText" value={siteConfig.heroHighlightText} />
                    <InlineField label="Hero Top Location Badge Text" fieldKey="heroBadgeText" value={siteConfig.heroBadgeText || ''} />
                    <InlineField label="Primary CTA Button Label" fieldKey="heroPrimaryCtaText" value={siteConfig.heroPrimaryCtaText || ''} />
                  </div>
                  <InlineField label="Hero Subtitle Paragraph" fieldKey="heroSubtitle" value={siteConfig.heroSubtitle} isTextarea hint="Shown below the hero headline." />
                </div>
              </div>

              {/* Section 3: Trust Stats */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" /> 3. Trust Stats Counters
                  </h4>
                  <span className="text-[11px] bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-semibold">4 Achievement Cards</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <StatPair label="Stat 1" valKey="stat1Value" labelKey="stat1Label" valDefault="120+" labelDefault="Projects Delivered" />
                  <StatPair label="Stat 2" valKey="stat2Value" labelKey="stat2Label" valDefault="98%" labelDefault="Satisfaction Rate" />
                  <StatPair label="Stat 3" valKey="stat3Value" labelKey="stat3Label" valDefault="24-48 Hrs" labelDefault="Turnaround Time" />
                  <StatPair label="Stat 4" valKey="stat4Value" labelKey="stat4Label" valDefault="4.9 ⭐" labelDefault="Vadodara Rating" />
                </div>
              </div>

              {/* Section 4: Floating CTA & Modal */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-pink-400" /> 4. Floating CTA &amp; Consultation Modal Text
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <InlineField label="Floating CTA Button Label" fieldKey="floatingCtaText" value={siteConfig.floatingCtaText || ''} />
                  <InlineField label="Consultation Modal Title" fieldKey="modalTitle" value={siteConfig.modalTitle || ''} />
                  <InlineField label="Consultation Modal Subtitle" fieldKey="modalSubtitle" value={siteConfig.modalSubtitle || ''} />
                </div>
              </div>

              {/* Section 5: Footer & Social */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-purple-400" /> 5. Footer Text &amp; Social Media Links
                  </h4>
                </div>
                <div className="space-y-4 text-xs">
                  <InlineField label="Footer About Description" fieldKey="footerDescription" value={siteConfig.footerDescription || ''} isTextarea hint="Shown in footer brand column." />
                  <InlineField label="Copyright Text" fieldKey="copyrightText" value={siteConfig.copyrightText || ''} hint="Bottom footer copyright line." />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InlineField label="Facebook URL" fieldKey="facebookUrl" value={siteConfig.facebookUrl} type="url" accentColor="blue" />
                    <InlineField label="Instagram URL" fieldKey="instagramUrl" value={siteConfig.instagramUrl} type="url" accentColor="purple" />
                    <InlineField label="LinkedIn URL" fieldKey="linkedinUrl" value={siteConfig.linkedinUrl} type="url" accentColor="blue" />
                  </div>
                </div>
              </div>

              {/* Section 6: Google Search Preview */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-400" /> 6. Google Search Live Preview
                  </h4>
                  <span className="text-[11px] bg-blue-500/10 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/20 font-semibold">Google Rich Snippet Simulation</span>
                </div>
                <div className="space-y-3 text-xs">
                  <InlineField label="SEO Page Title" fieldKey="customSeoTitle" value={siteConfig.customSeoTitle || ''} hint="Shown in Google search results as page title." />
                  <InlineField label="SEO Meta Description" fieldKey="customSeoDescription" value={siteConfig.customSeoDescription || ''} isTextarea hint="Description shown in Google snippets (150–160 chars ideal)." />
                  <InlineField label="SEO Keywords (comma-separated)" fieldKey="customSeoKeywords" value={siteConfig.customSeoKeywords || ''} hint="Helps Google understand your services." />
                </div>

                {/* Live Preview */}
                <div className="bg-white p-5 rounded-2xl space-y-2 border border-slate-200 text-left font-sans text-xs mt-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">A</span>
                    <span className="text-slate-800 font-medium">https://arrjs-technologies.vercel.app</span>
                    <span className="text-slate-400">› vadodara</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-normal text-blue-800 hover:underline cursor-pointer leading-snug">
                    {siteConfig.customSeoTitle || `${siteConfig.companyName} - IT Services, Computer Repair & Custom PC Build Vadodara`}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {siteConfig.customSeoDescription || `${siteConfig.topBannerText}. ${siteConfig.tagline}. Contact: ${siteConfig.officialPhone}.`}
                  </p>
                </div>
              </div>

              {/* Save Bar */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Click any field to edit • Enter or ✓ to save • Changes sync live</span>
                </div>
                <button
                  onClick={handleSaveSiteConfig}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Customization Settings</span>
                </button>
              </div>
            </div>
          );
        })()}

        {/* TAB 3: SERVICES CATALOG MANAGER */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-400" />
                  Website Services Catalog ({servicesList.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage all Web Development, Vadodara Computer Repair/Assembly, & Networking service offerings.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    id: `svc-${Date.now()}`,
                    category: 'web',
                    categoryTitle: '🌐 Web Solutions',
                    title: '',
                    description: '',
                    features: ['Custom feature 1', 'Fast delivery'],
                    isLocalOnly: false,
                    locationNote: 'Available globally & remotely',
                    iconName: 'Globe',
                    estimatedTimeline: '3 to 7 business days',
                    badge: '🔥 Trending'
                  });
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesList.map((svc) => (
                <div key={svc.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                        {svc.categoryTitle}
                      </span>
                      {svc.badge ? (
                        <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                          {svc.badge}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                          No Tag
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white">{svc.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{svc.description}</p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <p className="font-semibold text-slate-300">⏱ Timeline: {svc.estimatedTimeline || 'Standard'}</p>
                      <p className="text-slate-400">{svc.features.length} Key Features Configured</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => setEditingService(svc)}
                      className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Full Details
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${svc.title}"?`)) {
                          setServicesList(prev => prev.filter(s => s.id !== svc.id));
                        }
                      }}
                      className="text-slate-500 hover:text-red-400 cursor-pointer ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TECH STORE MANAGER */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-pink-400" />
                  ARRJS Tech Store Items ({storeList.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage hand-picked products, specs, and Amazon/Flipkart affiliate buy links.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingStoreProduct({
                    id: `prod-${Date.now()}`,
                    title: '',
                    category: 'components',
                    categoryName: 'PC Hardware',
                    description: '',
                    rating: 4.8,
                    specs: ['High Performance', 'Original Manufacturer Warranty'],
                    recommendedFor: 'Gaming & Workstation PCs',
                    affiliateUrlAmazon: 'https://amazon.in',
                    affiliateUrlFlipkart: 'https://flipkart.com',
                    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80',
                    badge: '🔥 Best Seller'
                  });
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {storeList.map((prod) => (
                <div key={prod.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                        {prod.categoryName}
                      </span>
                      {prod.badge && (
                        <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white">{prod.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <p className="text-slate-300">⭐ Rating: {prod.rating} / 5</p>
                      <p className="text-emerald-400 truncate flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> Amazon: {prod.affiliateUrlAmazon || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => setEditingStoreProduct(prod)}
                      className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Links & Details
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete product "${prod.title}"?`)) {
                          setStoreList(prev => prev.filter(p => p.id !== prod.id));
                        }
                      }}
                      className="text-slate-500 hover:text-red-400 cursor-pointer ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DEMO PORTFOLIO MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  Demo Portfolio Showcase Projects ({portfolioList.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage interactive website demo projects, live preview links, & tech stack.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingPortfolioProject({
                    id: `proj-${Date.now()}`,
                    title: '',
                    category: 'Website Development',
                    industry: 'Local Business Showcase',
                    description: '',
                    isDemo: true,
                    features: ['Responsive UI', 'SEO Optimized', 'WhatsApp Integration'],
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
                    techStack: ['React', 'Tailwind CSS', 'TypeScript'],
                    previewUrl: 'https://demo-example.com',
                    demoDetails: {
                      challenge: 'Creating a fast modern web interface for local lead capture.',
                      solution: 'Built clean responsive web layout with direct consultation modal.',
                      highlights: ['Fast page load speed', 'Mobile-first layout']
                    }
                  });
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioList.map((proj) => (
                <div key={proj.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {proj.industry}
                      </span>
                      <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                        Demo Showcase
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <p className="text-slate-300">🛠 Tech Stack: {proj.techStack.join(', ')}</p>
                      <p className="text-blue-400 truncate flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Link: {proj.previewUrl || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => setEditingPortfolioProject(proj)}
                      className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Project & Links
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          setPortfolioList(prev => prev.filter(p => p.id !== proj.id));
                        }
                      }}
                      className="text-slate-500 hover:text-red-400 cursor-pointer ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: OPERATIONS & BACKUP DATA */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Operations & Data Backup Tools
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Export complete website backup or reset data to default factory state.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white text-sm text-blue-400 flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export Complete Data Backup (JSON)
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    Download a full JSON backup file containing all CRM leads, services data, store items, portfolio projects, and site customization settings.
                  </p>
                  <button
                    onClick={handleExportDataJSON}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer mt-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white text-sm text-amber-400 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Factory Reset All Data
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    Reset all CRM leads, custom services, products, portfolio, and branding settings back to clean original defaults.
                  </p>
                  <button
                    onClick={handleResetAllDemoData}
                    className="bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-300 font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer mt-2"
                  >
                    Reset All Data to Defaults
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD MANUAL LEAD */}
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

      {/* MODAL 2: FULL SERVICE ITEM EDITOR */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-400" /> Edit Service Details & Features
              </h3>
              <button 
                onClick={() => setEditingService(null)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveServiceItem} className="space-y-4 text-xs text-left">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Service Title *</label>
                <input 
                  type="text" 
                  required 
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const catTitleMap = {
                        web: '🌐 Web Solutions',
                        computer: '💻 Computer Solutions',
                        networking: '🌐 Networking Solutions'
                      };
                      setEditingService({ 
                        ...editingService, 
                        category: cat,
                        categoryTitle: catTitleMap[cat]
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                  >
                    <option value="web">🌐 Web Solutions</option>
                    <option value="computer">💻 Computer Solutions (Vadodara)</option>
                    <option value="networking">🌐 Networking (Vadodara)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Trending Tags / Badges (Comma-separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 🔥 Trending, 📍 Vadodara Special, ⚡ Express Service" 
                    value={(editingService.badges && editingService.badges.length > 0) ? editingService.badges.join(', ') : (editingService.badge || '')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setEditingService({ ...editingService, badge: e.target.value, badges: tags });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Multi-Tag Select Workflow Presets */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Multi-Tag Select Workflow (Click to Add / Remove):
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditingService({ ...editingService, badge: '', badges: [] })}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear All Tags
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    '🔥 Trending',
                    '⭐ Most Popular',
                    '📍 Vadodara Special',
                    '🏆 Best Seller',
                    '⚡ Same-Day Express',
                    '💎 Premium Quality',
                    '🆕 New Launch',
                    '🌐 Remote Available'
                  ].map((presetTag) => {
                    const currentList = (editingService.badges && editingService.badges.length > 0) 
                      ? editingService.badges 
                      : (editingService.badge ? editingService.badge.split(',').map(b => b.trim()).filter(Boolean) : []);
                    const isSelected = currentList.includes(presetTag);

                    return (
                      <button
                        type="button"
                        key={presetTag}
                        onClick={() => {
                          let updated: string[];
                          if (isSelected) {
                            updated = currentList.filter(t => t !== presetTag);
                          } else {
                            updated = [...currentList, presetTag];
                          }
                          setEditingService({
                            ...editingService,
                            badge: updated.join(', '),
                            badges: updated
                          });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-2 ring-amber-400 scale-105'
                            : 'bg-slate-900 text-amber-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        <span>{isSelected ? '✓' : '+'}</span>
                        <span>{presetTag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description Paragraph</label>
                <textarea 
                  rows={3} 
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500 leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Service Highlights / Features (One feature per line)
                </label>
                <textarea 
                  rows={4} 
                  value={editingService.features.join('\n')}
                  onChange={(e) => setEditingService({ 
                    ...editingService, 
                    features: e.target.value.split('\n').filter(f => f.trim()) 
                  })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Timeline</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3 to 7 business days" 
                    value={editingService.estimatedTimeline || ''}
                    onChange={(e) => setEditingService({ ...editingService, estimatedTimeline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isLocalOnly"
                    checked={editingService.isLocalOnly || false}
                    onChange={(e) => setEditingService({ ...editingService, isLocalOnly: e.target.checked })}
                    className="w-4 h-4 rounded-md accent-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="isLocalOnly" className="text-slate-300 font-semibold cursor-pointer">
                    Vadodara Doorstep Only
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Save Service Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: FULL TECH STORE PRODUCT EDITOR */}
      {editingStoreProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-pink-400" /> Edit Product & Buy Affiliate Links
              </h3>
              <button 
                onClick={() => setEditingStoreProduct(null)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStoreProduct} className="space-y-4 text-xs text-left">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Title *</label>
                <input 
                  type="text" 
                  required 
                  value={editingStoreProduct.title}
                  onChange={(e) => setEditingStoreProduct({ ...editingStoreProduct, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input 
                    type="text" 
                    value={editingStoreProduct.categoryName}
                    onChange={(e) => setEditingStoreProduct({ ...editingStoreProduct, categoryName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Badge Tags (Comma-separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 🔥 Best Seller, 📍 Vadodara Special, 🎮 Gaming Build" 
                    value={(editingStoreProduct.badges && editingStoreProduct.badges.length > 0) ? editingStoreProduct.badges.join(', ') : (editingStoreProduct.badge || '')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setEditingStoreProduct({ ...editingStoreProduct, badge: e.target.value, badges: tags });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Multi-Tag Select Workflow Presets for Tech Store */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Multi-Tag Select Workflow (Click to Add / Remove):
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditingStoreProduct({ ...editingStoreProduct, badge: '', badges: [] })}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear All Tags
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    '🔥 Best Seller',
                    '⭐ Top Rated',
                    '📍 Vadodara Special',
                    '🎮 Gaming Build',
                    '💼 Workstation Grade',
                    '⚡ High Speed SSD',
                    '🏆 Recommended Choice',
                    '🆕 New Arrival'
                  ].map((presetTag) => {
                    const currentList = (editingStoreProduct.badges && editingStoreProduct.badges.length > 0) 
                      ? editingStoreProduct.badges 
                      : (editingStoreProduct.badge ? editingStoreProduct.badge.split(',').map(b => b.trim()).filter(Boolean) : []);
                    const isSelected = currentList.includes(presetTag);

                    return (
                      <button
                        type="button"
                        key={presetTag}
                        onClick={() => {
                          let updated: string[];
                          if (isSelected) {
                            updated = currentList.filter(t => t !== presetTag);
                          } else {
                            updated = [...currentList, presetTag];
                          }
                          setEditingStoreProduct({
                            ...editingStoreProduct,
                            badge: updated.join(', '),
                            badges: updated
                          });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md ring-2 ring-pink-400 scale-105'
                            : 'bg-slate-900 text-pink-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        <span>{isSelected ? '✓' : '+'}</span>
                        <span>{presetTag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" /> Affiliate Buy Links
                </h4>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amazon Link URL *</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://amazon.in/dp/..." 
                    value={editingStoreProduct.affiliateUrlAmazon || ''}
                    onChange={(e) => setEditingStoreProduct({ ...editingStoreProduct, affiliateUrlAmazon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Flipkart Link URL</label>
                  <input 
                    type="url" 
                    placeholder="https://flipkart.com/..." 
                    value={editingStoreProduct.affiliateUrlFlipkart || ''}
                    onChange={(e) => setEditingStoreProduct({ ...editingStoreProduct, affiliateUrlFlipkart: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-blue-300 outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Description</label>
                <textarea 
                  rows={2} 
                  value={editingStoreProduct.description}
                  onChange={(e) => setEditingStoreProduct({ ...editingStoreProduct, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={editingStoreProduct.imageUrl}
                  onChange={(e) => setEditingStoreProduct({ ...editingStoreProduct, imageUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStoreProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Save Product & Links
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: FULL DEMO PORTFOLIO EDITOR */}
      {editingPortfolioProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" /> Edit Project Details & Demo Preview Link
              </h3>
              <button 
                onClick={() => setEditingPortfolioProject(null)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePortfolioProject} className="space-y-4 text-xs text-left">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                <input 
                  type="text" 
                  required 
                  value={editingPortfolioProject.title}
                  onChange={(e) => setEditingPortfolioProject({ ...editingPortfolioProject, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Industry Tag</label>
                  <input 
                    type="text" 
                    value={editingPortfolioProject.industry}
                    onChange={(e) => setEditingPortfolioProject({ ...editingPortfolioProject, industry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Live Demo Preview Link</label>
                  <input 
                    type="url" 
                    placeholder="https://demo-link.com" 
                    value={editingPortfolioProject.previewUrl || ''}
                    onChange={(e) => setEditingPortfolioProject({ ...editingPortfolioProject, previewUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-blue-300 outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Description</label>
                <textarea 
                  rows={2} 
                  value={editingPortfolioProject.description}
                  onChange={(e) => setEditingPortfolioProject({ ...editingPortfolioProject, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  value={editingPortfolioProject.techStack.join(', ')}
                  onChange={(e) => setEditingPortfolioProject({ 
                    ...editingPortfolioProject, 
                    techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input 
                  type="text" 
                  value={editingPortfolioProject.image}
                  onChange={(e) => setEditingPortfolioProject({ ...editingPortfolioProject, image: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPortfolioProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Save Project Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
