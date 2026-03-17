import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PowerNexus from "@/components/PowerNexus";

// Add image URLs here
const images: string[] = [];

const Assembly = () => {
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
          className="text-3xl sm:text-4xl font-bold text-foreground text-glow mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CLASS ASSEMBLY
        </motion.h1>

        <motion.p
          className="font-mono-code text-xs text-primary/50 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          // AWARENESS_EVENT
        </motion.p>

        {images.length === 0 ? (
          <motion.div
            className="glass-panel clip-industrial p-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-mono-code text-sm text-muted-foreground">
              // NO_IMAGES_LOADED
            </p>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Images will appear here once added to the array.
            </p>
          </motion.div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="glass-panel overflow-hidden break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <img
                  src={src}
                  alt={`Assembly image ${i + 1}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assembly;
