import { lazy, Suspense, memo } from "react";
import PowerNexus from "@/components/PowerNexus";
import SectionNav from "@/components/SectionNav";
import { motion } from "framer-motion";

// Lazy load stages
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

// Memoize components to prevent unnecessary re-renders
const MemoizedPowerNexus = memo(PowerNexus);
const MemoizedSectionNav = memo(SectionNav);

const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background scroll-container">
      <MemoizedPowerNexus />
      <MemoizedSectionNav />

      <div className="relative" style={{ zIndex: 2 }}>
        <Suspense fallback={<LoadingFallback />}>
          <HeroStage />

          <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <CrisisStage />

          <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <InvestigationStage />

          <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <LogisticsStage />

          <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <PlanStage />

          <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <BibliographyStage />
        </Suspense>

        {/* Footer */}
        <motion.footer
          className="snap-section text-center py-16 font-mono-code text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="/logo.svg"
            alt="GP Logo"
            className="w-10 h-10 mx-auto mb-4 opacity-40"
          />
          <div className="mb-2 text-primary/40">// END_TRANSMISSION</div>
          <div>GP — KARACHI'S ELECTRICITY CRISIS — 2026</div>
          <div className="mt-1 text-[10px] text-muted-foreground/50">
            USMAN • ABDUL NAFAY • ABDULLAH • HASAN
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
