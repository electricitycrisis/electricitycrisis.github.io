import PowerNexus from "@/components/PowerNexus"
import SectionNav from "@/components/SectionNav"
import HeroStage from "@/components/stages/HeroStage"
import CrisisStage from "@/components/stages/CrisisStage"
import InvestigationStage from "@/components/stages/InvestigationStage"
import LogisticsStage from "@/components/stages/LogisticsStage"
import PlanStage from "@/components/stages/PlanStage"
import BibliographyStage from "@/components/stages/BibliographyStage"
import { motion } from "framer-motion"

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background scroll-container">
      <PowerNexus />
      <SectionNav />

      <div className="relative" style={{ zIndex: 2 }}>
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

        {/* Footer */}
        <motion.footer
          className="snap-section text-center py-16 font-mono-code text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <img src="/logo.svg" alt="GP Logo" className="w-10 h-10 mx-auto mb-4 opacity-40" />
          <div className="mb-2 text-primary/40">// END_TRANSMISSION</div>
          <div>GP — KARACHI'S ELECTRICITY CRISIS — 2026</div>
          <div className="mt-1 text-[10px] text-muted-foreground/50">
            USMAN • NAFAY • ABDULLAH • HASAN
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default Index
