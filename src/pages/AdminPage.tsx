import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  MessageSquareQuote, 
  Mail, 
  Palette, 
  LogOut, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { cms } from '../lib/cms';
import AdminLogin from '../components/admin/AdminLogin';
import BlogManager from '../components/admin/BlogManager';
import StoreManager from '../components/admin/StoreManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import InquiriesManager from '../components/admin/InquiriesManager';
import ThemeManager from '../components/admin/ThemeManager';

type Tab = 'dashboard' | 'blogs' | 'store' | 'testimonials' | 'inquiries' | 'theme';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => cms.isLoggedIn());
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const blogs = cms.getBlogs();
  const products = cms.getProducts();
  const testimonials = cms.getTestimonials();
  const inquiries = cms.getInquiries();
  const newsletters = cms.getNewsletters();

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
              ARRJS Control Panel
              <span className="badge-brand text-xs">CMS Active</span>
            </h1>
            <p className="text-xs text-ink-600 dark:text-ink-400">
              Manage website content, products, articles, customer reviews & inquiries in real time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <a
            href="/"
            target="_blank"
            className="btn-ghost text-xs flex items-center gap-1 text-ink-700 dark:text-ink-300"
          >
            View Live Site <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => {
              cms.logout();
              setIsAuthenticated(false);
            }}
            className="btn-ghost text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-ink-100 dark:border-ink-800 pb-2">
        <TabButton id="dashboard" active={activeTab} onClick={setActiveTab} icon={LayoutDashboard} label="Dashboard" />
        <TabButton id="blogs" active={activeTab} onClick={setActiveTab} icon={FileText} label={`Blogs (${blogs.length})`} />
        <TabButton id="store" active={activeTab} onClick={setActiveTab} icon={ShoppingBag} label={`Store (${products.length})`} />
        <TabButton id="testimonials" active={activeTab} onClick={setActiveTab} icon={MessageSquareQuote} label={`Reviews (${testimonials.length})`} />
        <TabButton 
          id="inquiries" 
          active={activeTab} 
          onClick={setActiveTab} 
          icon={Mail} 
          label={`Leads ${newInquiriesCount > 0 ? `(${newInquiriesCount} New)` : ''}`} 
          badge={newInquiriesCount > 0 ? newInquiriesCount : undefined}
        />
        <TabButton id="theme" active={activeTab} onClick={setActiveTab} icon={Palette} label="Theme Settings" />
      </div>

      {/* Main Tab Content */}
      <div className="pt-2">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Articles" count={blogs.length} sub="Blogs & News" icon={FileText} color="brand" />
              <StatCard title="Store Products" count={products.length} sub="Digital items & templates" icon={ShoppingBag} color="violet" />
              <StatCard title="Client Reviews" count={testimonials.length} sub="Featured testimonials" icon={MessageSquareQuote} color="emerald" />
              <StatCard title="New Leads" count={newInquiriesCount} sub={`${inquiries.length} total form inquiries`} icon={Mail} color="amber" highlight={newInquiriesCount > 0} />
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6 space-y-4">
                <h3 className="font-semibold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-500" /> Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button onClick={() => setActiveTab('blogs')} className="p-4 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-medium text-left transition-all">
                    + Write New Blog Post
                  </button>
                  <button onClick={() => setActiveTab('store')} className="p-4 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-300 font-medium text-left transition-all">
                    + Add Store Item
                  </button>
                  <button onClick={() => setActiveTab('testimonials')} className="p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-medium text-left transition-all">
                    + Add Testimonial
                  </button>
                  <button onClick={() => setActiveTab('inquiries')} className="p-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 font-medium text-left transition-all">
                    📩 View Contact Leads
                  </button>
                </div>
              </div>

              <div className="card p-6 space-y-4">
                <h3 className="font-semibold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-500" /> Recent Contact Submissions
                </h3>
                {inquiries.length === 0 ? (
                  <p className="text-xs text-ink-600 dark:text-ink-400 py-4 text-center">
                    No contact form leads recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="p-3 rounded-xl bg-ink-50 dark:bg-ink-950/50 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-ink-900 dark:text-white">{inq.name}</span>
                          <span className="text-ink-400 block">{inq.email}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                          inq.status === 'new' ? 'bg-brand-500/15 text-brand-600' : 'bg-emerald-500/15 text-emerald-600'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && <BlogManager />}
        {activeTab === 'store' && <StoreManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}
        {activeTab === 'inquiries' && <InquiriesManager />}
        {activeTab === 'theme' && <ThemeManager />}
      </div>
    </div>
  );
}

function TabButton({ id, active, onClick, icon: Icon, label, badge }: { 
  id: Tab; 
  active: Tab; 
  onClick: (t: Tab) => void; 
  icon: any; 
  label: string;
  badge?: number;
}) {
  const isSelected = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all relative ${
        isSelected
          ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25'
          : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {badge && (
        <span className="h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ title, count, sub, icon: Icon, color, highlight }: { 
  title: string; 
  count: number; 
  sub: string; 
  icon: any; 
  color: string;
  highlight?: boolean;
}) {
  return (
    <div className={`card p-5 space-y-2 ${highlight ? 'border-2 border-brand-500 ring-2 ring-brand-500/20' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400">{title}</span>
        <span className="p-2 rounded-xl bg-ink-100 dark:bg-ink-800 text-brand-500">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="text-2xl font-bold font-display text-ink-900 dark:text-white">
        {count}
      </div>
      <p className="text-[11px] text-ink-600 dark:text-ink-400">{sub}</p>
    </div>
  );
}
