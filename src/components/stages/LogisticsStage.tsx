import { motion } from "framer-motion";

const roles = [
  { name: "MUHAMMAD USMAN KHAN", role: "Videography", icon: "▶" },
  { name: "ABDUL NAFAY", role: "File Organisation", icon: "◆" },
  { name: "ABDULLAH IBNE ALI", role: "Video Editor & Design", icon: "◈" },
  { name: "MUHAMMAD HASAN HYDARI", role: "Team Coordinator", icon: "◉" },
];

const LogisticsStage = () => {
  return (
    <motion.section
      id="logistics"
      className="snap-section min-h-screen flex flex-col items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="font-mono-code text-xs tracking-[0.5em] text-primary/50 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        // STAGE_02: LOGISTICS
      </motion.p>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-4 tracking-wider text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        METHODOLOGY & ROLES
      </motion.h2>

      <motion.p
        className="text-sm text-muted-foreground max-w-2xl text-center mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Our research encompassed <span className="text-primary">political</span>
        , <span className="text-primary">economical</span>,{" "}
        <span className="text-primary">social</span>, and{" "}
        <span className="text-primary">technological</span> lenses — conducting
        primary research surveys, personal testimonies, and interviews alongside
        secondary research for professional perspectives.
      </motion.p>

      <motion.p
        className="text-xs text-muted-foreground/70 max-w-xl text-center mb-12 leading-relaxed font-mono-code"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Sources include NEPRA reports, World Bank energy data, and first-hand
        community interviews in Karachi.
      </motion.p>

      <div data-gsap="stagger" className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
        {roles.map((r, i) => (
          <motion.div
            key={r.name}
            className="glass-panel clip-industrial p-5 relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
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

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default LogisticsStage;
