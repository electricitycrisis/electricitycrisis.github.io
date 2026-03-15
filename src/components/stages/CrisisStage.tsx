import { motion } from "framer-motion"

const stats = [
  {
    value: "Rs 2.4T",
    label: "Circular Debt",
    detail: "Accumulated government liability owed to power producers, rising ~Rs 900B annually.",
    icon: "◈",
  },
  {
    value: "17–38%",
    label: "Transmission & Distribution Losses",
    detail: "National average ~17%, but some DISCOs like SEPCO & HESCO lose up to 38% of electricity.",
    icon: "◆",
  },
  {
    value: "Rs 1.9T",
    label: "Annual Capacity Payments",
    detail: "Paid to IPPs for idle power plants under take-or-pay contracts — even when no electricity is generated.",
    icon: "▶",
  },
  {
    value: "Rs 54/unit",
    label: "Consumer Tariff (2024)",
    detail: "Electricity price more than doubled from Rs 25/unit in 2021, squeezing households and businesses.",
    icon: "◉",
  },
  {
    value: "8–12 hrs",
    label: "Daily Load-Shedding (Rural)",
    detail: "Rural Pakistan endures 8–12 hours of outages daily; urban areas face 4–6 hours in summer peaks.",
    icon: "◇",
  },
  {
    value: "2–4%",
    label: "Annual GDP Loss",
    detail: "Unreliable power costs Pakistan an estimated 2–4% of GDP through lost productivity and business closures.",
    icon: "◎",
  },
]

const paragraphs = [
  "Pakistan's electricity sector is trapped in a vicious cycle: excess installed capacity coexists with chronic load-shedding because the system cannot afford to run or deliver the power it generates. Over 40% of electricity still comes from imported fossil fuels, exposing consumers to volatile global prices.",
  "Independent Power Producers (IPPs) hold contracts guaranteeing capacity payments in US dollars regardless of dispatch, draining foreign reserves while consumers bear escalating tariffs. Theft, outdated infrastructure, and governance failures compound the losses — turning a solvable engineering problem into a systemic crisis.",
]

const CrisisStage = () => {
  return (
    <motion.section
      className="snap-section min-h-screen flex flex-col items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="font-mono-code text-xs tracking-[0.5em] text-primary/50 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        // CRISIS_OVERVIEW
      </motion.p>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-6 tracking-wider text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        THE SCALE OF THE CRISIS
      </motion.h2>

      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          className="text-sm sm:text-base text-muted-foreground max-w-3xl text-center mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15 }}
        >
          {p}
        </motion.p>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full mt-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-panel clip-industrial p-6 relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />

            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-lg">{s.icon}</span>
              <span className="font-mono-code text-[10px] text-primary/40">
                STAT_{String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-bold text-primary text-glow mb-1 font-mono-code">
              {s.value}
            </div>

            <div className="text-sm font-semibold text-foreground mb-2">{s.label}</div>

            <p className="text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default CrisisStage