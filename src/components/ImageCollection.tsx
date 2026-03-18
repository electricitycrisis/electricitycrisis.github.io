import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface ImageCollectionProps {
  title: string;
  subtitle?: string;
  images: string[];
}

const ImageCollection = ({ title, subtitle, images }: ImageCollectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goNext, goPrev, close]);

  if (images.length === 0) {
    return (
      <motion.div
        className="glass-panel clip-industrial p-8 flex items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="shrink-0 w-48">
          <h3 className="text-sm font-bold text-foreground tracking-wider">
            {title}
          </h3>
          {subtitle && (
            <p className="font-mono-code text-[10px] text-primary/40 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <p className="font-mono-code text-xs text-muted-foreground">
          // NO_DATA_LOADED
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="glass-panel clip-industrial p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Label */}
          <div className="shrink-0 sm:w-48 sm:pt-4">
            <h3 className="text-sm font-bold text-foreground tracking-wider">
              {title}
            </h3>
            {subtitle && (
              <p className="font-mono-code text-[10px] text-primary/40 mt-1">
                {subtitle}
              </p>
            )}
            <p className="font-mono-code text-[10px] text-muted-foreground/50 mt-2">
              {images.length} {images.length === 1 ? "FILE" : "FILES"}
            </p>
          </div>

          {/* Fanned images */}
          <div className="flex items-center overflow-x-auto pb-2 -space-x-12 sm:-space-x-16">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="relative shrink-0 w-36 sm:w-44 rounded border border-border overflow-hidden cursor-pointer"
                style={{
                  zIndex: i,
                  rotate: `${(i - Math.floor(images.length / 2)) * 2}deg`,
                }}
                whileHover={{
                  scale: 1.25,
                  zIndex: 50,
                  rotate: 0,
                  boxShadow: "0 0 30px hsl(200 80% 73% / 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={src}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={close}
            />

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground border border-border/50 bg-background/50 backdrop-blur-sm transition-colors font-mono-code text-lg"
            >
              ×
            </button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-4 sm:left-8 z-10 w-12 h-12 flex items-center justify-center text-foreground/70 hover:text-foreground border border-border/50 bg-background/50 backdrop-blur-sm transition-colors font-mono-code text-xl clip-industrial"
              >
                ←
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={goNext}
                className="absolute right-4 sm:right-8 z-10 w-12 h-12 flex items-center justify-center text-foreground/70 hover:text-foreground border border-border/50 bg-background/50 backdrop-blur-sm transition-colors font-mono-code text-xl clip-industrial"
              >
                →
              </button>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              className="relative z-10 max-w-[85vw] max-h-[85vh] glass-panel p-2 glow-blue"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <img
                src={images[selectedIndex]}
                alt={`${title} ${selectedIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain block"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono-code text-xs text-primary/60">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCollection;
