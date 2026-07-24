import { useState, useEffect } from 'react';
import { Palette, Check, Megaphone, Phone, Mail, MapPin, MessageCircle, Save, Sparkles } from 'lucide-react';
import { cms, type SiteSettings } from '../../lib/cms';

export default function ThemeManager() {
  const [settings, setSettings] = useState<SiteSettings>(() => cms.getSiteSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSettings(cms.getSiteSettings());
    window.addEventListener('cms_settings_updated', sync);
    return () => window.removeEventListener('cms_settings_updated', sync);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cms.saveSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-100 dark:border-ink-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <Palette className="h-5 w-5 text-brand-500" /> Theme & Site Preferences Manager
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            Customize top announcement banner, contact numbers, email, address, and live site preferences.
          </p>
        </div>
        <button
          type="submit"
          className="btn-brand text-sm px-6 py-2.5 shadow-lg shadow-brand-500/25 flex items-center gap-2 self-start sm:self-auto"
        >
          {saved ? (
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <Check className="h-4 w-4" /> Live Website Updated!
            </span>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Preferences
            </>
          )}
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
          Settings saved successfully! Announcement banner, phone, email, and WhatsApp links are now live across your website.
        </div>
      )}

      {/* Announcement Banner Box */}
      <div className="card p-6 space-y-5">
        <h3 className="font-semibold text-base text-ink-900 dark:text-white flex items-center gap-2 border-b border-ink-100 dark:border-ink-800 pb-3">
          <Megaphone className="h-4 w-4 text-brand-500" /> Top Announcement Banner Bar
        </h3>

        <div className="flex items-center justify-between bg-ink-50 dark:bg-ink-950/50 p-4 rounded-2xl">
          <div>
            <label className="text-xs font-bold text-ink-900 dark:text-white block">
              Enable Announcement Banner Bar
            </label>
            <span className="text-[11px] text-ink-500 dark:text-ink-400 block">
              Show glowing offer banner at top of every website page
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.bannerEnabled}
            onChange={(e) => setSettings({ ...settings, bannerEnabled: e.target.checked })}
            className="h-5 w-5 rounded border-ink-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
            Banner Offer Text / Announcement Message
          </label>
          <input
            type="text"
            value={settings.announcementBanner}
            onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
            placeholder="e.g. 🚀 Special Offer: Get 20% off all Web & AI Development Packages!"
            className="input text-sm"
          />
        </div>
      </div>

      {/* Business Contact Details Box */}
      <div className="card p-6 space-y-5">
        <h3 className="font-semibold text-base text-ink-900 dark:text-white flex items-center gap-2 border-b border-ink-100 dark:border-ink-800 pb-3">
          <Phone className="h-4 w-4 text-brand-500" /> Business Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-brand-500" /> Contact Phone Number
            </label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              placeholder="+91 9106053108"
              className="input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5 text-emerald-500" /> WhatsApp Number (Digits only, with country code e.g. 919106053108)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              placeholder="919106053108"
              className="input text-sm font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-violet-500" /> Public Support Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              placeholder="arrjs_technologies@gmail.com"
              className="input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-red-500" /> Address / Location Text
            </label>
            <input
              type="text"
              value={settings.contactAddress}
              onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
              placeholder="Vadodara, Gujarat — On-site & Remote across India"
              className="input text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="btn-brand text-sm px-8 py-3 shadow-xl shadow-brand-500/30 font-semibold"
        >
          {saved ? '✅ Saved & Updated!' : '💾 Save Settings'}
        </button>
      </div>
    </form>
  );
}
