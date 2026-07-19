export default function PageHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
      <div className="glow-orb left-[20%] top-[-10%] h-72 w-72 bg-brand-500/15" />
      <div className="glow-orb right-[15%] top-[10%] h-72 w-72 bg-violet-500/15" />
      <div className="container-page relative text-center">
        <div className="animate-fade-in">
          <span className="section-eyebrow">{eyebrow}</span>
        </div>
        <h1 className="animate-fade-up mt-5 font-display text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl md:text-6xl">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="text-gradient">{highlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-base text-ink-600 dark:text-ink-300 sm:text-lg [animation-delay:80ms]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
