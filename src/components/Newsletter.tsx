import { useState } from 'react';
import { Mail, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Newsletter Subscription:', email);

      setStatus('done');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="relative py-16">
      <div className="container-page">
        <div className="card relative overflow-hidden p-8 text-center sm:p-12">
          <div className="glow-orb left-[20%] top-[-20%] h-60 w-60 bg-brand-500/20" />
          <div className="glow-orb right-[20%] bottom-[-20%] h-60 w-60 bg-violet-500/20" />

          <div className="relative mx-auto max-w-xl">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
              <Mail className="h-6 w-6" />
            </span>

            <h3 className="mt-5 font-display text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">
              Get Tech Tips & Product Updates
            </h3>

            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Subscribe to receive website development tips, AI insights,
              PC building guides, special offers and updates about our
              latest digital products.
            </p>

            {status === 'done' ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-5 py-3 text-sm font-medium text-brand-700 dark:border-brand-400/30 dark:bg-brand-400/10 dark:text-brand-300">
                <CheckCircle2 className="h-4 w-4" />
                Thank you! You're subscribed.
              </div>
            ) : (
              <form
                onSubmit={subscribe}
                className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input"
                  required
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary shrink-0 disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}