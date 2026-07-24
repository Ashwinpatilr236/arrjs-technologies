import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from '../lib/router';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cms } from '../lib/cms';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Store', to: '/store' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/assets/logo/logo.svg');
  const [hasLogo, setHasLogo] = useState(true);
  const [settings, setSettings] = useState(() => cms.getSiteSettings());
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setSettings(cms.getSiteSettings());
    window.addEventListener('cms_settings_updated', sync);
    return () => window.removeEventListener('cms_settings_updated', sync);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Dynamic Announcement Banner */}
      {settings.bannerEnabled && settings.announcementBanner && (
        <div className="bg-gradient-to-r from-brand-600 via-violet-600 to-brand-600 text-white text-xs font-semibold py-2 px-4 text-center relative shadow-sm flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse" />
          <span className="truncate">{settings.announcementBanner}</span>
        </div>
      )}

      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-ink-100 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80 shadow-sm'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="group flex items-center gap-2.5">
            {hasLogo ? (
              <img
                src={logoSrc}
                alt="ARRJS logo"
                className="h-9 w-auto rounded-xl object-contain"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.src.endsWith('logo.svg')) {
                    setLogoSrc('/assets/logo/logo.png');
                  } else {
                    setHasLogo(false);
                  }
                }}
              />
            ) : (
              <span className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-white">
                ARRJS<span className="text-brand-500">.tech</span>
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-white/5 dark:hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-700 transition-colors hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/contact" className="btn-primary hidden sm:inline-flex">
              Free Consultation
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-ink-100 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/95 lg:hidden">
            <div className="container-page flex flex-col gap-1 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 dark:bg-white/5 dark:text-brand-300'
                        : 'text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-2 w-full">
                Free Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
