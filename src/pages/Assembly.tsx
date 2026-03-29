import { Link } from "react-router-dom";
import PowerNexus from "@/components/PowerNexus";
import ImageCollection from "@/components/ImageCollection";

const collections = [
  {
    title: "ASSEMBLY PHOTOS",
    subtitle: "// AWARENESS_EVENT",
    images: [] as string[],
  },
];

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

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-glow mb-4 tracking-wider text-center animate-fade-in-up">
          CLASS ASSEMBLY
        </h1>

        <p
          className="font-mono-code text-xs text-primary/50 mb-12 text-center animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          // AWARENESS_EVENT
        </p>

        <div className="space-y-6">
          {collections.map((col, i) => (
            <div
              key={col.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <ImageCollection
                title={col.title}
                subtitle={col.subtitle}
                images={col.images}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assembly;
