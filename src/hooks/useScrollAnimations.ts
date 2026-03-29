import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimations = () => {
  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    function waitForElements(callback: () => void) {
      const scrollContainer = document.querySelector(".scroll-container");
      if (!scrollContainer) return;

      // Check immediately
      const elements = scrollContainer.querySelectorAll("[data-gsap]");
      if (elements.length > 0) {
        callback();
        return;
      }

      // Watch for elements to appear (lazy-loaded Suspense children)
      observer = new MutationObserver(() => {
        const els = scrollContainer.querySelectorAll("[data-gsap]");
        if (els.length > 0) {
          observer?.disconnect();
          observer = null;
          clearTimeout(timeoutId);
          callback();
        }
      });

      observer.observe(scrollContainer, { childList: true, subtree: true });

      // Fallback timeout — run anyway after 2s
      timeoutId = setTimeout(() => {
        observer?.disconnect();
        observer = null;
        callback();
      }, 2000);
    }

    waitForElements(() => {
      if (cancelled) return;
      // One more RAF to let layout settle
      requestAnimationFrame(() => {
        if (cancelled) return;
        setupAnimations();
      });
    });

    function setupAnimations() {
      const scrollContainer = document.querySelector(
        ".scroll-container",
      ) as HTMLElement | null;
      if (!scrollContainer) return;

      const isMobile = window.innerWidth < 768;
      const dur = isMobile ? 0.3 : 0.6;
      const yOffset = isMobile ? 15 : 40;

      const triggerBase = {
        scroller: scrollContainer,
        start: isMobile ? "top 92%" : "top 85%",
        toggleActions: "play reverse play reverse" as const,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        lazy: true,
      };

      // ─── Batch: collect all [data-gsap] elements in one pass ───
      const allGsapElements = scrollContainer.querySelectorAll("[data-gsap]");
      const grouped: Record<string, Element[]> = {};
      allGsapElements.forEach((el) => {
        const type = el.getAttribute("data-gsap")!;
        (grouped[type] ??= []).push(el);
      });

      const animate = (type: string, fn: (el: Element) => void) => {
        (grouped[type] || []).forEach(fn);
      };

      // ─── Stagger children ───
      animate("stagger", (el) => {
        gsap.fromTo(
          el.children,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: dur,
            stagger: isMobile ? 0.06 : 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: el, ...triggerBase },
          },
        );
      });

      animate("fade-up", (el) => {
        gsap.fromTo(
          el,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: dur,
            ease: "power2.out",
            scrollTrigger: { trigger: el, ...triggerBase },
          },
        );
      });

      animate("slide-left", (el) => {
        gsap.fromTo(
          el,
          {
            x: isMobile ? -20 : -80,
            opacity: 0,
            ...(isMobile ? {} : { rotation: -2 }),
          },
          {
            x: 0,
            opacity: 1,
            ...(isMobile ? {} : { rotation: 0 }),
            duration: dur,
            ease: "power2.out",
            scrollTrigger: { trigger: el, ...triggerBase },
          },
        );
      });

      animate("slide-right", (el) => {
        gsap.fromTo(
          el,
          {
            x: isMobile ? 20 : 80,
            opacity: 0,
            ...(isMobile ? {} : { rotation: 2 }),
          },
          {
            x: 0,
            opacity: 1,
            ...(isMobile ? {} : { rotation: 0 }),
            duration: dur,
            ease: "power2.out",
            scrollTrigger: { trigger: el, ...triggerBase },
          },
        );
      });

      animate("scale-in", (el) => {
        if (isMobile) {
          gsap.fromTo(
            el,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: dur,
              ease: "back.out(1.4)",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        }
      });

      animate("blur-in", (el) => {
        if (isMobile) {
          gsap.fromTo(
            el,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        }
      });

      animate("clip-reveal", (el) => {
        if (isMobile) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.8,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        }
      });

      animate("rotate-in", (el) => {
        if (isMobile) {
          gsap.fromTo(
            el,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        } else {
          gsap.set(el, { transformPerspective: 800 });
          gsap.fromTo(
            el,
            { rotateY: 90, opacity: 0, transformOrigin: "left center" },
            {
              rotateY: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        }
      });

      animate("elastic-scale", (el) => {
        if (isMobile) {
          gsap.fromTo(
            el,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        }
      });

      animate("split-reveal", (el) => {
        if (isMobile) {
          gsap.fromTo(
            el,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.92, filter: "blur(12px)", y: 30 },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, ...triggerBase },
            },
          );
        }
      });

      // ─── Parallax dividers ───
      animate("parallax", (el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scroller: scrollContainer,
              start: "top 90%",
              end: "top 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // ─── Desktop-only: header parallax drift ───
      if (!isMobile) {
        animate("header-parallax", (el) => {
          gsap.fromTo(
            el,
            { y: 0 },
            {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                scroller: scrollContainer,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        // ─── Desktop-only: counter animation for stat values ───
        scrollContainer.querySelectorAll("[data-counter]").forEach((el) => {
          const raw = el.getAttribute("data-counter") || "";
          const numMatch = raw.match(/([\d,]+)/);
          if (!numMatch) return;
          const target = parseFloat(numMatch[1].replace(/,/g, ""));
          const prefix = raw.slice(0, raw.indexOf(numMatch[1]));
          const suffix = raw.slice(
            raw.indexOf(numMatch[1]) + numMatch[1].length,
          );
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: { trigger: el, ...triggerBase },
            onUpdate: () => {
              const formatted =
                target >= 100
                  ? Math.round(obj.val).toLocaleString()
                  : obj.val.toFixed(target % 1 !== 0 ? 2 : 0);
              (el as HTMLElement).textContent =
                `${prefix}${formatted}${suffix}`;
            },
          });
        });

        // ─── Desktop-only: investigation card parallax drift ───
        scrollContainer
          .querySelectorAll("#investigation .glass-panel")
          .forEach((el) => {
            gsap.fromTo(
              el,
              { y: 0 },
              {
                y: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  scroller: scrollContainer,
                  start: "top 90%",
                  end: "top 30%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
      }

      // Force recalculation after all triggers are created
      ScrollTrigger.refresh();
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      observer?.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};

export default useScrollAnimations;
