import { motion } from "framer-motion";
import { useState, memo } from "react";

const members = [
  {
    name: "MUHAMMAD USMAN KHAN",
    topic:
      "Impact of government policies on energy provision and distribution in Karachi",
    detail:
      "Analysing how subsidies, K-Electric's privatisation, and regulatory gaps shape Karachi's energy landscape.",
    voltage: "220.4V",
  },
  {
    name: "ABDUL NAFAY",
    topic: "Flaws in Karachi's power generation and transmission",
    detail:
      "Investigating K-Electric's ageing grid infrastructure, fossil-fuel dependency, and 30–35% transmission losses.",
    voltage: "187.2V",
  },
  {
    name: "ABDULLAH IBNE ALI",
    topic:
      "Impact of inadequate energy supply on Karachi's economy and living standards",
    detail:
      "Measuring business closures, industrial flight, and the household burden of rising tariffs in Karachi.",
    voltage: "195.8V",
  },
  {
    name: "MUHAMMAD HASAN HYDARI",
    topic: "Effects of load-shedding on communities in Karachi",
    detail:
      "Documenting health risks, educational disruption, and daily survival during 6–12 hour outages across Karachi.",
    voltage: "203.1V",
  },
];

const InvestigationCard = memo(
  ({ m, i }: { m: (typeof members)[0]; i: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`glass-panel clip-industrial p-6 relative cursor-pointer transition-all duration-500 ${
          isHovered ? "glow-blue" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="scanlines absolute inset-0 pointer-events-none" />

        <div className="flex justify-between items-start mb-4">
          <span className="font-mono-code text-xs text-accent">
            {m.voltage}
          </span>
          <span className="font-mono-code text-xs text-primary/40">
            NODE_{String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-mono-code text-xs sm:text-sm text-primary/80 mb-2 tracking-wider">
          {m.name}
        </h3>

        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-2">
          {m.topic}
        </p>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {m.detail}
        </p>

        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    );
  },
);

const InvestigationStage = () => {
  return (
    <section
      id="investigation"
      className="snap-section min-h-screen flex flex-col items-center justify-center px-4 py-20 relative"
    >
      <motion.p
        className="font-mono-code text-xs tracking-[0.5em] text-primary/50 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
      >
        // STAGE_01: INVESTIGATION
      </motion.p>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-4 tracking-wider text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.1 }}
      >
        THE INVESTIGATION
      </motion.h2>

      <motion.p
        className="text-sm text-muted-foreground max-w-2xl text-center mb-12 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.2 }}
      >
        Each team member investigated a critical dimension of Karachi's
        electricity crisis — from policy failures to community impact — building
        a comprehensive research portfolio.
      </motion.p>

      <div
        data-gsap="stagger"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full"
      >
        {members.map((m, i) => (
          <InvestigationCard key={m.name} m={m} i={i} />
        ))}
      </div>
    </section>
  );
};

export default InvestigationStage;
