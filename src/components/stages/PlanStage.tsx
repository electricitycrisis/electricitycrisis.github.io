import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    title: "CLASS ASSEMBLY",
    description:
      "Educating peers about the causes and consequences of the electricity crisis in Karachi, and what can be done to mitigate them.",
    success: "Reviews of students who attended",
    tag: "AWARENESS",
    link: "/assembly",
    linkLabel: "View Assembly →",
  },
  {
    title: "POSTER CAMPAIGN",
    description:
      "Visual reminders deployed across the campus to encourage electricity conservation habits.",
    success: "If appliances are being turned off after use or not",
    tag: "ACTION",
    link: "/posters",
    linkLabel: "View Posters →",
  },
  {
    title: "INSTAGRAM AWARENESS",
    description:
      "Raising awareness online through Instagram — reaching wider audiences beyond the campus.",
    success: "Follower and view count of our page",
    tag: "DIGITAL",
    link: "https://www.instagram.com/electricitycrisis/",
    linkLabel: "Visit Instagram →",
    external: true,
  },
];

const PlanStage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.section
      id="plan"
      ref={containerRef}
      className="snap-section min-h-screen flex flex-col items-center px-4 py-20"
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
        // STAGE_03: PLAN_OF_ACTION
      </motion.p>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-4 tracking-wider text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        PLAN OF ACTION
      </motion.h2>

      <motion.p
        className="text-sm text-muted-foreground max-w-xl text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Our plan of action was based on how we as individuals can minimise
        electricity misuse in our and others' lives.
      </motion.p>

      <div className="relative max-w-2xl w-full">
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-border">
          <motion.div
            className="w-full bg-primary"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-16">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              className="relative pl-16 sm:pl-20"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
            >
              <div
                className="absolute left-4 sm:left-6 w-4 h-4 rounded-full border-2 border-accent bg-background"
                style={{
                  animation: "pulse-green 2s infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              />

              <div className="glass-panel clip-industrial p-6">
                <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono-code text-[10px] px-2 py-1 bg-accent/10 text-accent border border-accent/20">
                    {m.tag}
                  </span>
                  <span className="font-mono-code text-[10px] text-primary/40">
                    MILESTONE_{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 tracking-wide">
                  {m.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {m.description}
                </p>

                <div className="flex items-center gap-2 text-xs mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent glow-green" />
                  <span className="font-mono-code text-accent/80">
                    SUCCESS METRIC: {m.success}
                  </span>
                </div>

                <a
                  href={m.link}
                  target={m.external ? "_blank" : undefined}
                  rel={m.external ? "noopener noreferrer" : undefined}
                  className="inline-block font-mono-code text-xs text-primary hover:text-primary/80 border border-primary/30 px-3 py-1.5 clip-industrial transition-colors hover:bg-primary/10"
                >
                  {m.linkLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PlanStage;
