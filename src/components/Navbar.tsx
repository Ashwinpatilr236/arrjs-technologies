import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from '../lib/router';
import { Menu, X, Cpu, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { services } from '../data/content';

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
  const [mega, setMega] = useState(false);
  const [hasLogo, setHasLogo] = useState(true);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink-100 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-center gap-2.5">
          {hasLogo ? (
            <picture>
              <source srcSet="/assets/logo/logo.svg" type="image/svg+xml" />
              <img
                src="/assets/logo/logo.png"
                alt="ARRJS logo"
                className="h-9 w-auto rounded-xl object-contain"
                onError={() => setHasLogo(false)}
              />
            </picture>
          ) : (
            <>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
                <Cpu className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                ARRJS<span className="text-brand-500 dark:text-brand-400">.</span>
              </span>
            </>
          )}
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-300'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-white/5 dark:hover:text-white'
                }`
              }
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mega ? 'rotate-180' : ''}`} />
            </NavLink>
            {mega && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3">
                <div className="card grid grid-cols-1 gap-2 p-4 shadow-2xl sm:grid-cols-2">
                  {services.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.id}
                        to="/services"
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink-50 dark:hover:bg-white/5"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900 dark:text-white">{s.title}</p>
                          <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{s.tagline}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {links.slice(2).map((l) => (
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
      </nav>

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
    </header>
  );
}
