const roles = [
  { name: "MUHAMMAD USMAN KHAN", role: "Videography", icon: "▶" },
  { name: "ABDUL NAFAY", role: "File Organisation", icon: "◆" },
  { name: "ABDULLAH IBNE ALI", role: "Video Editor & Design", icon: "◈" },
  { name: "MUHAMMAD HASAN HYDARI", role: "Team Coordinator", icon: "◉" },
];

const LogisticsStage = () => {
  return (
    <section
      id="logistics"
      className="snap-section min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-28"
    >
      <div data-gsap="stagger">
        <p className="font-mono-code text-xs tracking-[0.5em] text-primary/50 mb-4 text-center">
          // STAGE_02: LOGISTICS
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-4 tracking-wider text-center">
          METHODOLOGY & ROLES
        </h2>
      </div>

      <div
        data-gsap="blur-in"
        className="text-sm text-muted-foreground max-w-2xl text-center mb-6 leading-relaxed"
      >
        Our research encompassed <span className="text-primary">political</span>
        , <span className="text-primary">economical</span>,{" "}
        <span className="text-primary">social</span>, and{" "}
        <span className="text-primary">technological</span> lenses — conducting
        primary research surveys, personal testimonies, and interviews alongside
        secondary research for professional perspectives.
      </div>

      <p
        data-gsap="fade-up"
        className="text-xs text-muted-foreground/70 max-w-xl text-center mb-12 leading-relaxed font-mono-code"
      >
        Sources include NEPRA reports, World Bank energy data, and first-hand
        community interviews in Karachi.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
        {roles.map((r, i) => (
          <div
            key={r.name}
            data-gsap="rotate-in"
            className="glass-panel clip-industrial p-5 relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-primary/5"
          >
            <div className="scanlines absolute inset-0 pointer-events-none opacity-50" />

            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary text-lg">{r.icon}</span>
              <span className="font-mono-code text-[10px] text-accent tracking-wider">
                TERMINAL_{String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="font-mono-code text-xs text-primary/70 mb-1">
              {r.name}
            </div>
            <div className="text-foreground text-sm font-medium">{r.role}</div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogisticsStage;
