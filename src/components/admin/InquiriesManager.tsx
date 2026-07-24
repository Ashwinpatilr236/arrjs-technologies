import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Trash2, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { cms, type InquiryItem, type NewsletterItem } from '../../lib/cms';

export default function InquiriesManager() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'newsletters'>('inquiries');
  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => cms.getInquiries());
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>(() => cms.getNewsletters());

  const refresh = () => {
    setInquiries(cms.getInquiries());
    setNewsletters(cms.getNewsletters());
  };

  const handleStatus = (id: string, status: InquiryItem['status']) => {
    cms.updateInquiryStatus(id, status);
    refresh();
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry lead?')) {
      cms.deleteInquiry(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-500" /> Customer Inquiries & Leads
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            View form responses submitted by potential clients on your contact page.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-ink-100 dark:bg-ink-800 p-1 self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'inquiries' ? 'bg-white dark:bg-ink-900 shadow-sm text-ink-900 dark:text-white' : 'text-ink-600 dark:text-ink-400'
            }`}
          >
            Contact Leads ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('newsletters')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'newsletters' ? 'bg-white dark:bg-ink-900 shadow-sm text-ink-900 dark:text-white' : 'text-ink-600 dark:text-ink-400'
            }`}
          >
            Newsletter Emails ({newsletters.length})
          </button>
        </div>
      </div>

      {activeTab === 'inquiries' ? (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="card p-8 text-center text-ink-600 dark:text-ink-400 text-sm">
              📬 No inquiries received yet. Submissions from the Contact form will appear here.
            </div>
          ) : (
            inquiries.map((inq) => (
              <div key={inq.id} className="card p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink-100 dark:border-ink-800 pb-3">
                  <div>
                    <h3 className="font-semibold text-base text-ink-900 dark:text-white flex items-center gap-2">
                      {inq.name}
                      {inq.service && <span className="badge-brand text-[10px]">{inq.service}</span>}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-600 dark:text-ink-400 mt-1">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-brand-500">
                        <Mail className="h-3.5 w-3.5" /> {inq.email}
                      </a>
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="flex items-center gap-1 hover:text-brand-500">
                          <Phone className="h-3.5 w-3.5" /> {inq.phone}
                        </a>
                      )}
                      {inq.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-ink-400" /> {inq.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[10px] text-ink-400 flex items-center gap-1 mr-2">
                      <Calendar className="h-3 w-3" /> {inq.date}
                    </span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatus(inq.id, e.target.value as InquiryItem['status'])}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border-0 cursor-pointer ${
                        inq.status === 'new'
                          ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400'
                          : inq.status === 'contacted'
                          ? 'bg-amber-500/15 text-amber-600'
                          : 'bg-emerald-500/15 text-emerald-600'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="p-1.5 rounded-lg text-ink-400 hover:text-red-500 hover:bg-red-500/10"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-ink-50 dark:bg-ink-950/50 p-4 rounded-xl text-xs sm:text-sm text-ink-800 dark:text-ink-200">
                  <div className="text-[10px] font-semibold uppercase text-ink-400 mb-1">Message:</div>
                  {inq.message}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 dark:border-ink-800 pb-3">
            <h3 className="font-semibold text-ink-900 dark:text-white">Subscribed Emails</h3>
            <span className="text-xs text-ink-600 dark:text-ink-400">Total: {newsletters.length}</span>
          </div>

          {newsletters.length === 0 ? (
            <p className="text-center py-6 text-xs text-ink-600 dark:text-ink-400">
              No newsletter subscribers yet.
            </p>
          ) : (
            <div className="divide-y divide-ink-100 dark:divide-ink-800">
              {newsletters.map((n) => (
                <div key={n.id} className="py-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-900 dark:text-white">{n.email}</span>
                  <span className="text-ink-400">{n.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
