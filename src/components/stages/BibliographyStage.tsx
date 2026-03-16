import { motion } from "framer-motion"

const references = [
  'K-Electric (2024) Annual Report 2023–2024. Karachi: K-Electric Limited.',
  'National Electric Power Regulatory Authority (NEPRA) (2024) State of Industry Report 2023. Islamabad: NEPRA.',
  'World Bank (2023) Pakistan — Power Sector Overview. Washington, D.C.: World Bank Group. Available at: https://www.worldbank.org/en/country/pakistan (Accessed: 10 January 2026).',
  'Dawn News (2024) \'Karachi faces worst power outages amid K-Electric capacity shortfall\', Dawn, 15 June. Available at: https://www.dawn.com (Accessed: 12 January 2026).',
  'Pakistan Bureau of Statistics (2024) Household Integrated Economic Survey 2023–24. Islamabad: PBS.',
  'Geo News (2024) \'Circular debt crosses Rs 2.4 trillion mark\', Geo News, 3 March. Available at: https://www.geo.tv (Accessed: 14 January 2026).',
  'Haque, I. ul (2023) \'The IPP crisis: How capacity payments are crippling Pakistan\', The News International, 22 September.',
  'Asian Development Bank (2023) Pakistan Energy Sector Assessment, Strategy, and Road Map. Manila: ADB.',
  'Express Tribune (2024) \'K-Electric T&D losses remain above 30%\', The Express Tribune, 8 August.',
  'Sustainable Development Policy Institute (SDPI) (2023) Energy Security and Governance in Pakistan. Islamabad: SDPI.',
  'International Energy Agency (IEA) (2023) Pakistan — Country Profile. Paris: IEA. Available at: https://www.iea.org/countries/pakistan (Accessed: 15 January 2026).',
  'Karachi Chamber of Commerce and Industry (KCCI) (2024) Impact of Electricity Tariffs on Small Businesses in Karachi. Karachi: KCCI.',
]

const BibliographyStage = () => {
  return (
    <motion.section
      id="bibliography"
      className="snap-section min-h-screen flex flex-col items-center px-4 py-20"
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
        // REFERENCES
      </motion.p>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-10 tracking-wider text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        BIBLIOGRAPHY
      </motion.h2>

      <div className="max-w-3xl w-full space-y-3">
        {references.map((ref, i) => (
          <motion.div
            key={i}
            className="glass-panel p-4 text-xs sm:text-sm text-muted-foreground leading-relaxed font-mono-code"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            {ref}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default BibliographyStage
