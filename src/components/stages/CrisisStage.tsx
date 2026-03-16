import { motion } from "framer-motion"

const stats = [
  {
    value: "Rs 60B+",
    label: "K-Electric Circular Debt",
    detail: "Accumulated receivables owed to K-Electric, compounded by government and consumer non-payment.",
    icon: "◈",
  },
  {
    value: "30–35%",
    label: "T&D Losses",
    detail: "K-Electric's transmission and distribution losses remain among the highest for any major utility in Pakistan.",
    icon: "◆",
  },
  {
    value: "Rs 55–65",
    label: "Effective Tariff (per unit)",
    detail: "Karachi consumers face some of the highest effective electricity rates when surcharges and taxes are included.",
    icon: "▶",
  },
  {
    value: "16M+",
    label: "Population Served",
    detail: "K-Electric is the sole power provider for over 16 million people — a monopoly with no alternative for consumers.",
    icon: "◉",
  },
  {
    value: "6–12 hrs",
    label: "Daily Load-Shedding",
    detail: "Peripheral areas of Karachi endure 6–12 hours of outages daily; even 'exempt' areas face unscheduled cuts.",
    icon: "◇",
  },
  {
    value: "12–18%",
    label: "Business Closures",
    detail: "Surveys indicate 12–18% of small businesses in Karachi have shut down or relocated due to power costs and unreliability.",
    icon: "◎",
  },
]

const paragraphs = [
  "Karachi's electricity crisis is defined by a single private monopoly — K-Electric — serving over 16 million people with ageing infrastructure, chronic underinvestment, and massive transmission losses. Consumers have no alternative provider, leaving them captive to rising tariffs and unreliable supply.",
  "Electricity theft, outdated grid infrastructure, and governance failures compound K-Electric's distribution losses. Meanwhile, Karachi's industrial base — once the engine of Pakistan's economy — is haemorrhaging businesses to cities with cheaper, more reliable power, deepening the city's economic decline.",
]

const CrisisStage = () => {
  return (
    <motion.section
      id="crisis"
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
