import { useMemo } from 'react';

interface HeroDOMOverlayProps {
  scrollProgress: number;
}

function HeroDOMOverlay({ scrollProgress }: HeroDOMOverlayProps) {
  const heroOpacity = useMemo(() => {
    if (scrollProgress < 0.15) return 1;
    if (scrollProgress > 0.35) return 0;
    return 1 - (scrollProgress - 0.15) / 0.2;
  }, [scrollProgress]);

  const revealOpacity = useMemo(() => {
    if (scrollProgress < 0.3) return 0;
    if (scrollProgress < 0.45) return (scrollProgress - 0.3) / 0.15;
    if (scrollProgress > 0.6) return 0;
    return 1 - (scrollProgress - 0.55) / 0.05;
  }, [scrollProgress]);

  const featureOpacity = useMemo(() => {
    if (scrollProgress < 0.55) return 0;
    if (scrollProgress < 0.7) return (scrollProgress - 0.55) / 0.15;
    return 1;
  }, [scrollProgress]);

  const ctaScale = useMemo(() => {
    if (scrollProgress < 0.8) return 0;
    return Math.min(1, (scrollProgress - 0.8) / 0.15);
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Hero Phase — Title + Subtitle + CTA */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${scrollProgress * -60}px)`,
        }}
      >
        <h1
          className="font-display text-7xl sm:text-8xl md:text-9xl font-bold tracking-[0.2em] text-foreground select-none"
          style={{ letterSpacing: '0.25em' }}
        >
          VAULTED
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground font-light tracking-widest">
          The AI desire engine.
        </p>
        <button
          className="mt-10 pointer-events-auto px-8 py-3 rounded-full border border-border bg-secondary/50 text-foreground text-sm font-medium tracking-wider backdrop-blur-sm transition-all duration-500 hover:bg-secondary hover:border-muted-foreground hover:shadow-[0_0_30px_hsl(var(--vault-glow)/0.15)]"
        >
          Open Your Vault
        </button>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-background bg-muted"
                style={{
                  background: `hsl(${210 + i * 30}, 30%, ${25 + i * 5}%)`,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground tracking-wider uppercase">
            Join 50,000+ smart shoppers
          </span>
        </div>
      </div>

      {/* Reveal Phase — "Unlocking" text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: revealOpacity }}
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

      {/* Feature Phase */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: featureOpacity }}
      >
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {[
            { title: 'AI-Powered', desc: 'Intelligent curation that learns your style.' },
            { title: 'Secure', desc: 'Bank-grade encryption for every transaction.' },
            { title: 'Exclusive', desc: 'Access drops before anyone else.' },
          ].map((feature, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                opacity: featureOpacity,
                transform: `translateY(${(1 - featureOpacity) * 30}px)`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <h3 className="font-display text-lg font-semibold text-foreground tracking-wider">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Phase */}
      <div
        className="absolute bottom-16 left-0 right-0 flex justify-center"
        style={{
          opacity: ctaScale,
          transform: `scale(${0.9 + ctaScale * 0.1})`,
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
