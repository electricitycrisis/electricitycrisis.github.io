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
      className="snap-section flex flex-col items-center justify-center min-h-screen relative px-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <motion.img
        src="/logo-no-bg.png"
        alt="GPR Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 mb-6 drop-shadow-[0_0_30px_hsl(200,80%,73%,0.6)]"
        variants={fadeIn}
      />

      <motion.p
        className="font-mono-code text-xs sm:text-sm tracking-[0.5em] text-primary/60 mb-4"
        variants={fadeIn}
      >
        // GPR_INVESTIGATION
      </motion.p>

      <motion.h1
        className="text-[8vw] sm:text-[10vw] leading-[0.85] font-bold text-foreground text-glow text-center"
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
        A SYSTEMIC AUDIT
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 font-mono-code text-xs text-muted-foreground"
        variants={fadeIn}
      >
        <span className="glass-panel px-4 py-2 clip-industrial">
          Rs 2.4T CIRCULAR DEBT
        </span>
        <span className="glass-panel px-4 py-2 clip-industrial">
          17–38% T&D LOSSES
        </span>
        <span className="glass-panel px-4 py-2 clip-industrial">
          220M+ IMPACTED
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-primary/40 font-mono-code text-xs tracking-widest"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL TO ENGAGE ▼
      </motion.div>
    </motion.section>
  );
};

export default HeroStage;
