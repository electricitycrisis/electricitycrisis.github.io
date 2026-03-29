import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import PowerNexus from "@/components/PowerNexus";
import SectionNav from "@/components/SectionNav";
import DramaticIntro from "@/components/DramaticIntro";
import useScrollAnimations from "@/hooks/useScrollAnimations";

const HeroStage = lazy(() => import("@/components/stages/HeroStage"));
const CrisisStage = lazy(() => import("@/components/stages/CrisisStage"));
const InvestigationStage = lazy(
  () => import("@/components/stages/InvestigationStage"),
);
const LogisticsStage = lazy(() => import("@/components/stages/LogisticsStage"));
const PlanStage = lazy(() => import("@/components/stages/PlanStage"));
const BibliographyStage = lazy(
  () => import("@/components/stages/BibliographyStage"),
);

const MemoizedPowerNexus = memo(PowerNexus);
const MemoizedSectionNav = memo(SectionNav);

const Preloader = () => (
  <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background gap-4">
    <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    <p className="font-mono-code text-[10px] tracking-[0.5em] text-primary/40 animate-pulse-opacity">
      LOADING
    </p>
  </div>
);

const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center bg-background snap-section">
    <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem("intro_shown") === "true",
  );
  useScrollAnimations();

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  if (!fontsReady) return <Preloader />;

  return (
    <>
      {!introComplete && (
        <DramaticIntro onComplete={() => setIntroComplete(true)} />
      )}

      <div
        ref={scrollRef}
        className="relative min-h-screen bg-background scroll-container"
        style={{
          scrollBehavior: "smooth",
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.3s ease-in",
        }}
      >
        <MemoizedPowerNexus />
        <MemoizedSectionNav />

        <main className="relative" style={{ zIndex: 2 }}>
          <article aria-label="Karachi Electricity Crisis — GP Research Project">
            <Suspense fallback={<LoadingFallback />}>
              <HeroStage />

              <div
                data-gsap="parallax"
                className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              />

              <CrisisStage />

              <div
                data-gsap="parallax"
                className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              />

              <InvestigationStage />

              <div
                data-gsap="parallax"
                className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              />

              <LogisticsStage />

              <div
                data-gsap="parallax"
                className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              />

              <PlanStage />

              <div
                data-gsap="parallax"
                className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              />

              <BibliographyStage />

              <footer className="snap-section text-center py-20 sm:py-28 font-mono-code text-xs text-muted-foreground relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div data-gsap="stagger" className="flex flex-col items-center">
                  <img
                    src="/logo-no-bg.png"
                    alt="GP Research Team Logo"
                    className="w-10 h-10 mx-auto mb-4 opacity-40"
                    loading="lazy"
                  />
                  <div className="mb-2 text-primary/40">
                    // END_TRANSMISSION
                  </div>
                  <div className="tracking-wider">
                    GP — KARACHI'S ELECTRICITY CRISIS — 2026
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground/60 tracking-wide leading-relaxed">
                    MUHAMMAD USMAN KHAN • ABDUL NAFAY • ABDULLAH IBNE ALI •
                    MUHAMMAD HASAN HYDARI
                  </div>
                  <button
                    onClick={() => {
                      const container =
                        document.querySelector(".scroll-container");
                      container?.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-8 px-5 py-2.5 border border-primary/30 text-primary/60 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 clip-industrial text-[10px] tracking-widest"
                  >
                    ▲ BACK TO TOP
                  </button>
                </div>
              </footer>
            </Suspense>
          </article>
        </main>
      </div>
    </>
  );
};

export default Index;
