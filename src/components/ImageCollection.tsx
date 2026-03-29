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
      <div className="glass-panel clip-industrial p-8 flex items-center gap-6 animate-fade-in-up">
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
      </div>
    );
  }

  return (
    <>
      <div className="glass-panel clip-industrial p-6 sm:p-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row items-start gap-6">
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

          <div className="flex items-center overflow-x-auto pb-2 -space-x-12 sm:-space-x-16">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 w-36 sm:w-44 rounded border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.25] hover:z-50 hover:rotate-0 hover:shadow-[0_0_30px_hsl(200_80%_73%/0.3)]"
                style={{
                  zIndex: i,
                  transform: `rotate(${(i - Math.floor(images.length / 2)) * 2}deg)`,
                }}
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={src}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={close}
          />

          <button
            onClick={close}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground border border-border/50 bg-background/50 backdrop-blur-sm transition-colors font-mono-code text-lg"
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-4 sm:left-8 z-10 w-12 h-12 flex items-center justify-center text-foreground/70 hover:text-foreground border border-border/50 bg-background/50 backdrop-blur-sm transition-colors font-mono-code text-xl clip-industrial"
            >
              ←
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-4 sm:right-8 z-10 w-12 h-12 flex items-center justify-center text-foreground/70 hover:text-foreground border border-border/50 bg-background/50 backdrop-blur-sm transition-colors font-mono-code text-xl clip-industrial"
            >
              →
            </button>
          )}

          <div className="relative z-10 max-w-[85vw] max-h-[85vh] glass-panel p-2 glow-blue animate-scale-in">
            <img
              src={images[selectedIndex]}
              alt={`${title} ${selectedIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain block"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono-code text-xs text-primary/60">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCollection;
