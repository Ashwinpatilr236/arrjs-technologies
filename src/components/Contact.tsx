import { useState, useEffect } from 'react';
import { serviceOptionsForForm } from '../data/content';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { cms } from '../lib/cms';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Inquiry = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  location?: string;
  message: string;
};

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [settings, setSettings] = useState(() => cms.getSiteSettings());
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: '',
  });

  useEffect(() => {
    const sync = () => setSettings(cms.getSiteSettings());
    window.addEventListener('cms_settings_updated', sync);
    return () => window.removeEventListener('cms_settings_updated', sync);
  }, []);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email and message.');
      return;
    }

    const payload: Inquiry = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      service: form.service || undefined,
      location: form.location.trim() || undefined,
      message: form.message.trim(),
    };

    try {
      cms.saveInquiry(payload);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', location: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please try again or WhatsApp us.');
    }
  };

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber || '919876543210'}`;

  return (
    <section id="contact" className="relative overflow-hidden py-12 md:py-16">
      <div className="glow-orb left-[20%] top-[5%] h-80 w-80 bg-brand-500/15" />
      <div className="glow-orb right-[10%] bottom-[5%] h-80 w-80 bg-violet-500/10" />
      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="section-eyebrow">Get in touch</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
              Let's build something
              <span className="text-gradient"> that works.</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-ink-600 dark:text-ink-300 sm:text-lg">
              Tell us about your project or the problem you need solved. We reply within one
              business day with next steps.
            </p>

            <div className="mt-8 space-y-4">
              <ContactItem icon={MapPin} title="Service area" value={settings.contactAddress} />
              <ContactItem icon={Mail} title="Email" value={settings.contactEmail} href={`mailto:${settings.contactEmail}`} />
              <ContactItem icon={Phone} title="Phone / WhatsApp" value={settings.contactPhone} href={waUrl} />
              <ContactItem icon={Clock} title="Business hours" value="Mon–Sat · 9:00 AM – 8:00 PM IST" />
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-violet mt-6"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          <div className="card p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-300">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900 dark:text-white">
                  Message sent!
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-600 dark:text-ink-300">
                  Thanks for reaching out. We'll reply within one business day.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-ghost mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className="input" />
                  </Field>
                  <Field label="Email" required>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className="input" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Phone / WhatsApp">
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91..." className="input" />
                  </Field>
                  <Field label="Service interested in">
                    <select value={form.service} onChange={(e) => update('service', e.target.value)} className="input">
                      <option value="">Select a service...</option>
                      {serviceOptionsForForm.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Location (City / Area)">
                  <input type="text" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Vadodara, Gujarat" className="input" />
                </Field>
                <Field label="Project details" required>
                  <textarea rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Describe your project..." className="input" />
                </Field>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-xs font-medium text-rose-500">
                    <AlertCircle className="h-4 w-4" /> {errorMsg}
                  </div>
                )}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full shadow-lg shadow-brand-500/25">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Send inquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, title, value, href }: { icon: any; title: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3.5 rounded-2xl border border-ink-100 bg-white/70 p-3.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-300">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{title}</p>
        <p className="text-sm font-semibold text-ink-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a> : inner;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}
