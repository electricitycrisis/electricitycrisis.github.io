import { useEffect, useState, useRef, useCallback } from "react";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(0);
  const activeRef = useRef("hero");

  const updateActive = useCallback(() => {
    const container = document.querySelector(
      ".scroll-container",
    ) as HTMLElement;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    setScrollProgress(progress);

    const viewportH = container.clientHeight;
    const threshold = viewportH * 0.3;

    let closest = "hero";
    let closestDist = Infinity;

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;
      const dist = Math.abs(relativeTop - threshold);
      if (relativeTop <= threshold + viewportH * 0.5 && dist < closestDist) {
        closestDist = dist;
        closest = id;
      }
    }

    if (closest !== activeRef.current) {
      activeRef.current = closest;
      setActive(closest);
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActive);
    };

    // Initial check
    updateActive();

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateActive]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = sections.findIndex((s) => s.id === active);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {sections.map(({ id, label }, i) => {
        const isPassed = i < activeIndex;
        const isActive = id === active;

        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className="group flex items-center gap-2 justify-end"
            aria-label={`Navigate to ${label}`}
          >
            <span className="font-mono-code text-[10px] text-primary/0 group-hover:text-primary/80 transition-all duration-300 whitespace-nowrap glass-panel px-2 py-0.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
              {label.toUpperCase()}
            </span>
            <div
              className={`relative w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-primary border-primary glow-blue scale-125 nav-dot-active"
                  : isPassed
                    ? "bg-primary/50 border-primary/60"
                    : "bg-transparent border-primary/40 group-hover:border-primary/80"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SectionNav;
