import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const useScrollAnimations = () => {
  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    // On mobile, don't use custom scroller — let ScrollTrigger use the native scroll
    const scroller = isMobile ? undefined : scrollContainer;
    if (!isMobile && !scrollContainer) return;

    const triggerBase = {
      scroller,
      start: isMobile ? "top 95%" : "top 85%",
      toggleActions: "play reverse play reverse" as const,
      invalidateOnRefresh: true,
    };

    // Stagger children
    const staggerEls = document.querySelectorAll('[data-gsap="stagger"]');
    staggerEls.forEach((el) => {
      gsap.fromTo(
        el.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            ...triggerBase,
          },
        },
      );
    });

    // Parallax dividers
    const dividers = document.querySelectorAll('[data-gsap="parallax"]');
    dividers.forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};

export default useScrollAnimations;
