import { motion } from "framer-motion";
import { useState, memo } from "react";

const stats = [
  {
    value: "3,563 MW",
    label: "Peak Demand (June 2025)",
    detail:
      "Karachi's peak electricity demand nearly equals available supply (3,545 MW), leaving virtually no safety margin.",
    source: "K-Electric Reports",
    icon: "◈",
  },
  {
    value: "PKR 32.37",
    label: "Average Tariff (per kWh)",
    detail:
      "NEPRA's approved multi-year tariff for FY2024–30 reflects Karachi's heavy reliance on expensive imported fuels like LNG and furnace oil.",
    source: "NEPRA MYT FY2024-30",
    icon: "◆",
  },
  {
    value: "~15%",
    label: "T&D Losses (FY22)",
    detail:
      "K-Electric has reduced transmission and distribution losses from 34% in 2005 to approximately 15% in FY22 — significant progress, though further improvement is needed.",
    source: "The News International",
    icon: "▶",
  },
  {
    value: "18–20 hrs",
    label: "Load-Shedding (Industrial Areas)",
    detail:
      "A PILER study found that Karachi's poorest industrial-area workers endure up to 18–20 hours of daily blackouts, severely impacting livelihoods.",
    source: "PILER/Business Recorder",
    icon: "◉",
  },
  {
    value: "~4,000 MW",
    label: "Total System Capacity",
    detail:
      "K-Electric owns ~2,397 MW of generation capacity and draws up to 1,600 MW from the national grid via NTDC interconnections.",
    source: "K-Electric",
    icon: "◇",
  },
  {
    value: "PKR 174 bn",
    label: "Government Subsidy (FY25)",
    detail:
      "The federal government allocated PKR 174 billion in subsidies for Karachi's power sector in FY25, later reduced to PKR 125 billion for FY26.",
    source: "Business Recorder",
    icon: "◎",
  },
];

const pestelFactors = [
  {
    key: "P",
    title: "Political",
    summary:
      "Federal and Sindh governments have publicly clashed over Karachi's power crisis. Sindh's new SEPRA regulator aims to bypass NEPRA to set lower tariffs, creating regulatory uncertainty. NEPRA has fined K-Electric for forced outages, while political disputes delayed fuel supply to Karachi's generators.",
  },
  {
    key: "E",
    title: "Economic",
    summary:
      "Karachi faces among the highest tariffs in Pakistan (PKR 32.37/kWh) due to expensive imported fuels. Government subsidies reached PKR 174 bn in FY25 but were cut 28% for FY26. Chronic outages shave an estimated 3–4% off Pakistan's GDP, with Karachi disproportionately affected as an industrial hub.",
  },
  {
    key: "S",
    title: "Social",
    summary:
      "Disadvantaged neighbourhoods suffer the most — up to 18–20 hours daily without power. Load-shedding disrupts education, endangers public health (dengue/malaria risk), and has been linked to rising domestic violence. Affluent areas face fewer cuts, underscoring inequality in supply.",
  },
  {
    key: "T",
    title: "Technological",
    summary:
      "K-Electric has modernised steadily: losses cut from 34% to 15%, smart metering (AMI/AMR) deployed, and grid interconnections expanded to ~2,000 MW. Solar capacity is growing — 640 MW competitively bid in 2025 — targeting 30% renewable energy by 2030.",
  },
  {
    key: "En",
    title: "Environmental",
    summary:
      "Karachi's power generation is largely fossil-based (~90% gas/RLNG). Climate change poses risks: heatwaves drive up peak loads, and coastal stations face sea-level rise threats. New solar bids at record-low tariffs (PKR 8.9–11.6/kWh) signal a gradual transition.",
  },
  {
    key: "L",
    title: "Legal",
    summary:
      "The sector operates under overlapping authorities — NEPRA, SEPRA, Power Division, and provincial government. K-Electric's multi-year tariff decisions are frequently disputed. Payment conflicts (PKR 7.43 bn overpayment to CPPA-G) and gas supply contract issues illustrate the complexity.",
  },
];

const supplyDemandData = [
  {
    area: "Karachi (Jun 2025)",
    demand: "3,563 MW (peak)",
    supply: "3,545 MW (peak)",
    shedding: "Minimal at peak",
    source: "K-Electric",
  },
  {
    area: "Karachi (2025 avg)",
    demand: "~2,353 MW",
    supply: "—",
    shedding: "18–20 hrs in worst zones",
    source: "PILER",
  },
];

const paragraphs = [
  "Karachi's electricity crisis is defined by a single private monopoly — K-Electric — serving over 16 million people with ageing infrastructure, chronic underinvestment, and massive transmission losses. Consumers have no alternative provider, leaving them captive to rising tariffs and unreliable supply.",
  "Electricity theft, outdated grid infrastructure, and governance failures compound K-Electric's distribution losses. Meanwhile, Karachi's industrial base — once the engine of Pakistan's economy — is haemorrhaging businesses to cities with cheaper, more reliable power, deepening the city's economic decline.",
];

const StatCard = memo(({ s, i }: { s: (typeof stats)[0]; i: number }) => (
  <motion.div
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

    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
      {s.detail}
    </p>

    <span className="font-mono-code text-[9px] text-primary/30">
      SRC: {s.source}
    </span>
  </motion.div>
));

const PestelCard = memo(
  ({ f, i }: { f: (typeof pestelFactors)[0]; i: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <motion.div
        className={`glass-panel clip-industrial p-5 cursor-pointer transition-all duration-300 ${isExpanded ? "glow-blue" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono-code text-lg text-primary font-bold">
            {f.key}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {f.title}
          </span>
        </div>
        <motion.p
          className="text-xs text-muted-foreground leading-relaxed"
          initial={false}
          animate={{
            height: isExpanded ? "auto" : "3.6em",
            opacity: 1,
          }}
          style={{ overflow: "hidden" }}
        >
          {f.summary}
        </motion.p>
        <span className="font-mono-code text-[9px] text-primary/30 mt-2 block">
          {isExpanded ? "▲ COLLAPSE" : "▼ EXPAND"}
        </span>
      </motion.div>
    );
  },
);

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full mt-10">
        {stats.map((s, i) => (
          <StatCard key={s.label} s={s} i={i} />
        ))}
      </div>

      {/* Supply vs Demand Table */}
      <motion.div
        className="mt-16 max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-mono-code text-xs tracking-[0.3em] text-primary/60 mb-4 text-center">
          // SUPPLY_VS_DEMAND
        </h3>
        <div className="glass-panel overflow-hidden">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-mono-code text-primary/70">
                  Area
                </th>
                <th className="text-left p-3 font-mono-code text-primary/70">
                  Demand
                </th>
                <th className="text-left p-3 font-mono-code text-primary/70">
                  Supply
                </th>
                <th className="text-left p-3 font-mono-code text-primary/70">
                  Load-Shedding
                </th>
                <th className="text-left p-3 font-mono-code text-primary/70">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {supplyDemandData.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="p-3 text-foreground">{row.area}</td>
                  <td className="p-3 text-muted-foreground">{row.demand}</td>
                  <td className="p-3 text-muted-foreground">{row.supply}</td>
                  <td className="p-3 text-muted-foreground">{row.shedding}</td>
                  <td className="p-3 font-mono-code text-primary/40 text-[10px]">
                    {row.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* PESTEL Analysis */}
      <motion.div
        className="mt-16 max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-mono-code text-xs tracking-[0.3em] text-primary/60 mb-6 text-center">
          // PESTEL_ANALYSIS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pestelFactors.map((f, i) => (
            <PestelCard key={f.key} f={f} i={i} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CrisisStage;
