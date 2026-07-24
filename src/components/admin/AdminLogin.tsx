import { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { cms } from '../../lib/cms';

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter passcode');
      return;
    }
    const success = cms.login(passcode.trim());
    if (success) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid admin passcode. Hint: admin123 or arrjs2026');
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="glow-orb -top-10 -right-10 h-40 w-40 bg-brand-500/20" />
        
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-400">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
            ARRJS Admin Panel
          </h1>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            Enter your admin passcode to manage blogs, store products, testimonials & inquiries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs font-medium text-red-600 dark:text-red-400 border border-red-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400 mb-2">
              Admin Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (Default: admin123)"
                className="input pl-11 py-3 text-base"
                autoFocus
              />
            </div>
          </div>

          <button type="submit" className="btn-brand w-full py-3 text-base font-semibold shadow-lg shadow-brand-500/25">
            <ShieldCheck className="h-5 w-5" /> Login to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-ink-600 dark:text-ink-400">
          🔒 Secure local session auth · ARRJS Technologies
        </div>
      </div>
    </div>
  );
}
