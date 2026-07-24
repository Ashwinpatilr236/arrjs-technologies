import { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Lock, 
  Zap, 
  Database, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cms } from '../../lib/cms';

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter your admin passcode');
      return;
    }
    setIsSubmitting(true);
    
    setTimeout(() => {
      const success = cms.login(passcode.trim());
      setIsSubmitting(false);
      if (success) {
        setError('');
        onLoginSuccess();
      } else {
        setError('Incorrect passcode. Try clicking a quick passcode below.');
      }
    }, 300);
  };

  const handleQuickFill = (code: string) => {
    setPasscode(code);
    setError('');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-brand-500/20 via-violet-500/20 to-cyan-500/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-brand-600/10 blur-2xl pointer-events-none" />
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-violet-600/10 blur-2xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Main Glass Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300">
          
          {/* Top Decorative Header Badge */}
          <div className="flex justify-between items-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              ARRJS CMS Portal
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              System Active
            </div>
          </div>

          {/* Title & Icon Header */}
          <div className="text-center">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-brand-600 via-brand-500 to-violet-600 p-0.5 shadow-xl shadow-brand-500/30">
              <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-slate-900/90 backdrop-blur">
                <Lock className="h-9 w-9 text-brand-400" />
              </div>
            </div>
            
            <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              Admin Gateway
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              Manage website blogs, store products, pricing cards & customer lead inquiries.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 rounded-2xl bg-red-500/10 p-3.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-500/20 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                  Passcode / Key
                </label>
                <span className="text-[11px] text-ink-400">Required</span>
              </div>

              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="input pl-12 pr-12 py-3.5 text-base rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-brand-500 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Quick Fill Passcodes */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-ink-400 block">Quick Demo Credentials:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin123')}
                  className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 hover:bg-brand-500/10 hover:border-brand-500/30 text-xs font-mono font-semibold text-brand-600 dark:text-brand-300 transition-all text-center"
                >
                  admin123
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('arrjs2026')}
                  className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/30 text-xs font-mono font-semibold text-violet-600 dark:text-violet-300 transition-all text-center"
                >
                  arrjs2026
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-violet-600 p-0.5 font-semibold text-white shadow-xl shadow-brand-500/25 transition-all hover:shadow-brand-500/40 active:scale-[0.99]"
            >
              <div className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-transparent font-medium transition-all group-hover:bg-white/10">
                <ShieldCheck className="h-5 w-5" />
                <span>{isSubmitting ? 'Authenticating...' : 'Unlock Admin Dashboard'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </form>

          {/* Footer Security Badges */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 gap-3 text-[11px] text-ink-500 dark:text-ink-400">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-brand-500" /> Instant Real-time Sync
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-violet-500" /> Supabase Database
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
