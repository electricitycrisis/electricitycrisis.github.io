import { motion } from "framer-motion"

const references = [
  'The Friday Times (2026) \'Year In Review: K-Electric Shows Steady Progress During 2025\', The Friday Times, 3 January. Available at: https://www.thefridaytimes.com/03-Jan-2026/year-review-k-electric-shows-steady-progress-2025 (Accessed: 15 March 2026).',
  'Business Recorder (2026) \'Karachi\'s industrial areas badly hit by load-shedding: study\', Business Recorder. Available at: https://www.brecorder.com/news/40410150 (Accessed: 15 March 2026).',
  'The Standard (2025) \'NEPRA Reduces Tariff Determination for KE\', The Standard. Available at: https://thestandard.com.pk/nepra-reduces-tariff-determination-for-ke/ (Accessed: 15 March 2026).',
  'Business Recorder (2025) \'Payment dispute between CPPA-G, KE remains unresolved\', Business Recorder. Available at: https://www.brecorder.com/news/40368721 (Accessed: 14 March 2026).',
  'The News International (2022) \'KE says transmission, distribution losses reduced to 15pc in FY22\', The News International. Available at: https://www.thenews.com.pk/print/1012680 (Accessed: 14 March 2026).',
  'K-Electric (2025) \'NEPRA Concludes Hearing on K-Electric\'s Power Acquisition Programme\'. Available at: https://ke.com.pk/nepra-concludes-hearing-on-k-electrics-ke-power-acquisition-programme/ (Accessed: 14 March 2026).',
  'Dawn (2018) \'Federal, Sindh govts spar over Karachi power crisis\', Dawn, 12 April. Available at: https://www.dawn.com/news/1402893 (Accessed: 12 January 2026).',
  'Profit by Pakistan Today (2025) \'Sindh launches SEPRA to cut Karachi\'s power costs, bypassing NEPRA tariffs\', Pakistan Today, 12 August. Available at: https://profit.pakistantoday.com.pk/2025/08/12/sindh-launches-sepra-to-cut-karachis-power-costs-bypassing-nepra-tariffs/ (Accessed: 15 March 2026).',
  'Business Recorder (2025) \'Forced load-shedding: Nepra issues show-cause notice to KE\', Business Recorder. Available at: https://www.brecorder.com/news/40369502 (Accessed: 14 March 2026).',
  'Afghan Diaspora Network (2025) \'Pakistan\'s Power and Energy Crisis: Chronic Outages, Rising Costs, and a Dark Future\', ADN, 29 July. Available at: https://afghandiaspora.org/2025/07/29/pakistans-power-and-energy-crisis/ (Accessed: 15 March 2026).',
  'Al Jazeera (2019) \'Lights out: Circular debt cripples Pakistan\'s power sector\', Al Jazeera, 24 May. Available at: https://www.aljazeera.com/economy/2019/5/24/ (Accessed: 14 January 2026).',
  'K-Electric (2025) Generation. Available at: https://ke.com.pk/generation/ (Accessed: 14 March 2026).',
  'Carbon Brief (2023) \'The Carbon Brief Profile: Pakistan\'. Available at: https://interactive.carbonbrief.org/the-carbon-brief-profile-pakistan/ (Accessed: 15 January 2026).',
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
