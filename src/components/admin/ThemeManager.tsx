import { useState } from 'react';
import { Palette, Check, Megaphone, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { cms, type SiteSettings } from '../../lib/cms';

export default function ThemeManager() {
  const [settings, setSettings] = useState<SiteSettings>(() => cms.getSiteSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cms.saveSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <Palette className="h-5 w-5 text-brand-500" /> Theme & Site Preferences Manager
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            Customize announcement banner, business contact details, and theme accents.
          </p>
        </div>
        <button type="submit" className="btn-brand text-sm px-5 py-2">
          {saved ? <span className="flex items-center gap-1"><Check className="h-4 w-4" /> Saved!</span> : 'Save Settings'}
        </button>
      </div>

      <div className="card p-6 space-y-5">
        <h3 className="font-semibold text-base text-ink-900 dark:text-white flex items-center gap-2 border-b border-ink-100 dark:border-ink-800 pb-3">
          <Megaphone className="h-4 w-4 text-brand-500" /> Announcement Banner
        </h3>

        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-ink-700 dark:text-ink-300">
            Enable Announcement Banner at Top of Site
          </label>
          <input
            type="checkbox"
            checked={settings.bannerEnabled}
            onChange={(e) => setSettings({ ...settings, bannerEnabled: e.target.checked })}
            className="h-5 w-5 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
            Banner Text / Offer Announcement
          </label>
          <input
            type="text"
            value={settings.announcementBanner}
            onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
            placeholder="e.g. 🚀 Special Offer: Get 20% off all Web & AI Development Packages!"
            className="input"
          />
        </div>
      </div>

      <div className="card p-6 space-y-5">
        <h3 className="font-semibold text-base text-ink-900 dark:text-white flex items-center gap-2 border-b border-ink-100 dark:border-ink-800 pb-3">
          <Phone className="h-4 w-4 text-brand-500" /> Business Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Contact Phone Number
            </label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              WhatsApp Number (Country Code + Number, no spaces)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              placeholder="919876543210"
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Public Support Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Address / Location Text
            </label>
            <input
              type="text"
              value={settings.contactAddress}
              onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
              className="input"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
