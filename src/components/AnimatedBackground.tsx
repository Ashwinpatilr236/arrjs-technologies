export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-dark dark:opacity-100 opacity-0 transition-opacity duration-500"
        style={{ backgroundSize: '64px 64px' }}
      />
      <div
        className="absolute inset-0 bg-grid-light dark:opacity-0 opacity-100 transition-opacity duration-500"
        style={{ backgroundSize: '64px 64px' }}
      />
      <div className="glow-orb left-[-10%] top-[-5%] h-[480px] w-[480px] bg-brand-500/20 animate-pulse-glow" />
      <div className="glow-orb right-[-5%] top-[15%] h-[420px] w-[420px] bg-violet-500/20 animate-pulse-glow" />
      <div className="glow-orb left-[30%] bottom-[5%] h-[360px] w-[360px] bg-brand-400/10 animate-float-slow" />
      <div className="absolute left-[12%] top-[30%] h-3 w-3 rounded-full bg-brand-400/40 animate-float" />
      <div className="absolute right-[18%] top-[55%] h-2 w-2 rounded-full bg-violet-400/40 animate-float-slow" />
      <div className="absolute left-[60%] top-[20%] h-1.5 w-1.5 rounded-full bg-brand-300/50 animate-float" />
      <div className="absolute right-[40%] bottom-[25%] h-2.5 w-2.5 rounded-full bg-violet-300/30 animate-float-slow" />
    </div>
  );
}
