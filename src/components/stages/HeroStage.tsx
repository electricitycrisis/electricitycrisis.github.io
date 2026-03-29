const HeroStage = () => {
  return (
    <section
      id="hero"
      className="snap-section flex flex-col justify-center items-center min-h-screen relative px-4"
    >
      {/* Main content */}
      <div
        data-gsap="stagger"
        className="flex flex-col items-center text-center"
      >
        <p
          className="font-mono-code text-xs sm:text-sm tracking-[0.5em] text-primary/60 mb-8 hero-fade-item"
          style={{ animationDelay: "0s" }}
        >
          // GP_RESEARCH — GLOBAL PERSPECTIVES
        </p>

        <h1
          data-gsap="split-reveal"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] font-bold text-foreground text-glow animate-glow-pulse hero-fade-item tracking-tight"
          style={{ mixBlendMode: "difference", animationDelay: "0.12s" }}
        >
          KARACHI
          <br />
          <span className="text-primary">ELECTRICITY</span>
          <br />
          CRISIS
        </h1>

        <p
          className="font-mono-code text-sm sm:text-base tracking-[0.5em] text-primary/70 mt-8 hero-fade-item"
          style={{ animationDelay: "0.24s" }}
        >
          A RESEARCH PROJECT
        </p>

        <div
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 font-mono-code text-xs text-muted-foreground hero-fade-item"
          style={{ animationDelay: "0.36s" }}
        >
          <span className="glass-panel-elevated px-4 py-2 clip-industrial animate-shimmer">
            PEAK: 3,563 MW DEMAND
          </span>
          <span
            className="glass-panel-elevated px-4 py-2 clip-industrial animate-shimmer"
            style={{ animationDelay: "0.5s" }}
          >
            PKR 32.37/kWh TARIFF
          </span>
          <span
            className="glass-panel-elevated px-4 py-2 clip-industrial animate-shimmer"
            style={{ animationDelay: "1s" }}
          >
            16M+ IMPACTED
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40 font-mono-code text-xs tracking-widest text-center animate-pulse-opacity">
        SCROLL TO ENGAGE
        <br />
        <span className="inline-block mt-2 animate-bounce">▼</span>
      </div>
    </section>
  );
};

export default HeroStage;
