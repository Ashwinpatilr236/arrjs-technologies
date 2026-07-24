import { useEffect, useState } from 'react';
import { Cpu, MapPin, Mail, ArrowUp, Phone, MessageCircle } from 'lucide-react';
import { Link } from '../lib/router';
import { cms } from '../lib/cms';

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'PC Consultation & Build', to: '/services' },
      { label: 'Website Development', to: '/services' },
      { label: 'Business Setup', to: '/services' },
      { label: 'AI Chatbot Development', to: '/services' },
      { label: 'IT Support & AMC', to: '/services' },
    ],
  },
  {
    title: 'Store',
    links: [
      { label: 'Excel Templates', to: '/store' },
      { label: 'React Templates', to: '/store' },
      { label: 'Next.js Templates', to: '/store' },
      { label: 'Resume Templates', to: '/store' },
      { label: 'Free Downloads', to: '/store' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Refund Policy', to: '#' },
    ],
  },
];

export default function Footer() {
  const [settings, setSettings] = useState(() => cms.getSiteSettings());

  useEffect(() => {
    const sync = () => setSettings(cms.getSiteSettings());
    window.addEventListener('cms_settings_updated', sync);
    return () => window.removeEventListener('cms_settings_updated', sync);
  }, []);

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber || '919876543210'}`;

  return (
    <footer className="relative border-t border-ink-100 bg-ink-50/50 dark:border-white/10 dark:bg-ink-950">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
                <Cpu className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold text-ink-900 dark:text-white">
                ARRJS<span className="text-brand-500 dark:text-brand-400">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              Building Technology That Works For Everyone. Technology solutions company based in
              Vadodara, serving all of India remotely.
            </p>
            <div className="mt-5 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" /> {settings.contactAddress}
              </p>
              <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                <Mail className="h-4 w-4 text-brand-500" /> {settings.contactEmail}
              </a>
              <a href={`tel:${settings.contactPhone}`} className="flex items-center gap-2 transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                <Phone className="h-4 w-4 text-brand-500" /> {settings.contactPhone}
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                <MessageCircle className="h-4 w-4 text-brand-500" /> WhatsApp Us
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to.startsWith('#') ? (
                      <a href={l.to} className="text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-300">
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.to} className="text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-300">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row dark:border-white/10">
          <p className="text-xs text-ink-500 dark:text-ink-500">
            © {new Date().getFullYear()} ARRJS Technologies. All rights reserved.
          </p>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 transition-colors hover:text-brand-600 dark:hover:text-brand-300">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
