import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "crisis", label: "Crisis" },
  { id: "investigation", label: "Investigation" },
  { id: "logistics", label: "Logistics" },
  { id: "plan", label: "Plan" },
  { id: "bibliography", label: "Bibliography" },
];

const SectionNav = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: scrollContainer, threshold: 0.4 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className="group flex items-center gap-2 justify-end"
          aria-label={`Navigate to ${label}`}
        >
          <span className="font-mono-code text-[10px] text-primary/0 group-hover:text-primary/80 transition-all duration-300 whitespace-nowrap glass-panel px-2 py-0.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
            {label.toUpperCase()}
          </span>
          <motion.div
            className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              active === id
                ? "bg-primary border-primary glow-blue scale-125"
                : "bg-transparent border-primary/40 group-hover:border-primary/80"
            }`}
            layout
          />
        </button>
      ))}
    </div>
  );
};

export default SectionNav;
