import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PowerNexus from "@/components/PowerNexus";
import ImageCollection from "@/components/ImageCollection";

const collections = [
  {
    title: "KUNDA SYSTEM",
    subtitle: "// POWER_THEFT_DOCUMENTATION",
    images: [
      "/action-images/kunda-system/1.png",
      "/action-images/kunda-system/2.png",
      "/action-images/kunda-system/3.png",
      "/action-images/kunda-system/4.png",
      "/action-images/kunda-system/5.png",
    ],
  },
  {
    title: "SURVEY RESULTS",
    subtitle: "// FIELD_DATA",
    images: [
      "/action-images/survey-results/1.png",
      "/action-images/survey-results/2.png",
      "/action-images/survey-results/3.png",
      "/action-images/survey-results/4.png",
    ],
  },
  {
    title: "ELECTRICITY CRISIS POSTER",
    subtitle: "// AWARENESS_MATERIAL",
    images: ["/action-images/posters/Electricity crisis poster.png"],
  },
];

const Posters = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <PowerNexus />
      <div className="relative z-10 px-4 py-16 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-block font-mono-code text-xs text-primary hover:text-primary/80 border border-primary/30 px-3 py-1.5 clip-industrial transition-colors hover:bg-primary/10 mb-10"
        >
          ← BACK TO HOME
        </Link>

        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-foreground text-glow mb-4 tracking-wider text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          POSTER CAMPAIGN
        </motion.h1>

        <motion.p
          className="font-mono-code text-xs text-primary/50 mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          // CAMPUS_ACTION
        </motion.p>

        <div className="space-y-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <ImageCollection
                title={col.title}
                subtitle={col.subtitle}
                images={col.images}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posters;
