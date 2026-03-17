import { useMemo } from 'react';

interface HeroDOMOverlayProps {
  scrollProgress: number;
}

function HeroDOMOverlay({ scrollProgress }: HeroDOMOverlayProps) {
  // Phase 1: Hero title (0 - 0.20)
  const heroOpacity = useMemo(() => {
    if (scrollProgress < 0.12) return 1;
    if (scrollProgress > 0.25) return 0;
    return 1 - (scrollProgress - 0.12) / 0.13;
  }, [scrollProgress]);

  // Phase 2: "Opening vault" text (0.20 - 0.45)
  const unlockOpacity = useMemo(() => {
    if (scrollProgress < 0.22) return 0;
    if (scrollProgress < 0.30) return (scrollProgress - 0.22) / 0.08;
    if (scrollProgress > 0.45) return 0;
    if (scrollProgress > 0.38) return 1 - (scrollProgress - 0.38) / 0.07;
    return 1;
  }, [scrollProgress]);

  // Phase 3: Card labels appear alongside arranged cards (0.70 - 1.0)
  const featureOpacity = useMemo(() => {
    if (scrollProgress < 0.72) return 0;
    if (scrollProgress < 0.85) return (scrollProgress - 0.72) / 0.13;
    return 1;
  }, [scrollProgress]);

  // Final CTA
  const ctaOpacity = useMemo(() => {
    if (scrollProgress < 0.88) return 0;
    return Math.min(1, (scrollProgress - 0.88) / 0.10);
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* ─── Hero Phase ─── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${scrollProgress * -80}px)`,
        }}
      >
        <h1
          className="font-display text-7xl sm:text-8xl md:text-9xl font-bold text-foreground select-none"
          style={{ letterSpacing: '0.25em' }}
        >
          VAULTED
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground font-light tracking-widest">
          The AI desire engine.
        </p>
        <button className="mt-10 pointer-events-auto px-8 py-3 rounded-full border border-border bg-secondary/50 text-foreground text-sm font-medium tracking-wider backdrop-blur-sm transition-all duration-500 hover:bg-secondary hover:border-muted-foreground hover:shadow-[0_0_30px_hsl(var(--vault-glow)/0.15)]">
          Open Your Vault
        </button>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-background bg-muted"
                style={{ background: `hsl(${210 + i * 30}, 30%, ${25 + i * 5}%)` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground tracking-wider uppercase">
            Join 50,000+ smart shoppers
          </span>
        </div>
      </div>

      {/* ─── Unlock Phase ─── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: unlockOpacity }}
      >
        <div className="text-center">
          <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground">
            Unlocking
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-wide">
            Your digital vault
          </h2>
        </div>
      </div>

      {/* ─── Feature Labels (alongside 3D cards) ─── */}
      <div
        className="absolute inset-0 flex items-start justify-center"
        style={{ opacity: featureOpacity }}
      >
        <div className="mt-[8vh] max-w-md text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-wide">
            Everything you need
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            AI-powered curation, bank-grade security, and exclusive access — all in one place.
          </p>
        </div>
      </div>

      {/* ─── Final CTA ─── */}
      <div
        className="absolute bottom-16 left-0 right-0 flex justify-center"
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${(1 - ctaOpacity) * 20}px)`,
        }}
      >
        <button className="pointer-events-auto px-10 py-4 rounded-full bg-foreground text-background font-display text-sm font-semibold tracking-wider transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--vault-glow)/0.3)]">
          Get Early Access
        </button>
      </div>
    </div>
  );
}

export { HeroDOMOverlay };
