import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const ok = localStorage.getItem('arrjs-cookie');
      if (!ok) {
        const t = setTimeout(() => setShow(true), 1800);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('arrjs-cookie', '1');
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-5 sm:bottom-5">
      <div className="mx-auto max-w-3xl card flex items-center gap-4 p-4 shadow-2xl">
        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-300 sm:flex">
          <Cookie className="h-5 w-5" />
        </span>
        <p className="flex-1 text-xs text-ink-600 dark:text-ink-300 sm:text-sm">
          We use cookies to improve your experience and analyze traffic. By continuing you agree
          to our use of cookies. See our Privacy Policy.
        </p>
        <div className="flex items-center gap-2">
          <button onClick={accept} className="btn-primary !px-4 !py-2 text-xs">
            Accept
          </button>
          <button
            onClick={() => setShow(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 text-ink-500 dark:border-white/10 dark:text-ink-400"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
