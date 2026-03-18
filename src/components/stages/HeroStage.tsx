import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const HeroStage = () => {
  return (
    <motion.section
      id="hero"
      className="snap-section flex flex-col justify-center items-center min-h-screen relative px-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      {/* Main content */}
      <div className="flex flex-col items-center text-center">
        <motion.p
          className="font-mono-code text-xs sm:text-sm tracking-[0.5em] text-primary/60 mb-8"
          variants={fadeIn}
        >
          // GP_RESEARCH — GLOBAL PERSPECTIVES
        </motion.p>

        <motion.h1
          className="text-[8vw] sm:text-[10vw] leading-[0.85] font-bold text-foreground text-glow"
          style={{ mixBlendMode: "difference" }}
          variants={fadeIn}
        >
          KARACHI
          <br />
          <span className="text-primary">ELECTRICITY</span>
          <br />
          CRISIS
        </motion.h1>

        <motion.p
          className="font-mono-code text-sm sm:text-base tracking-[0.3em] text-primary/80 mt-6"
          variants={fadeIn}
        >
          A RESEARCH PROJECT
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 font-mono-code text-xs text-muted-foreground"
          variants={fadeIn}
        >
          <span className="glass-panel px-4 py-2 clip-industrial">
            PEAK: 3,563 MW DEMAND
          </span>
          <span className="glass-panel px-4 py-2 clip-industrial">
            PKR 32.37/kWh TARIFF
          </span>
          <span className="glass-panel px-4 py-2 clip-industrial">
            16M+ IMPACTED
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator stays at bottom without moving the main content */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40 font-mono-code text-xs tracking-widest text-center"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL TO ENGAGE
        <br />
        <span className="inline-block mt-2 animate-bounce">▼</span>
      </motion.div>
    </motion.section>
  );
};

export default HeroStage;
