import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimations = () => {
  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (!scrollContainer) return;

    // Fade-up elements
    const fadeUpEls = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeUpEls.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainer,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    // Scale-in elements
    const scaleEls = document.querySelectorAll('[data-gsap="scale-in"]');
    scaleEls.forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainer,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    // Fade-left elements
    const fadeLeftEls = document.querySelectorAll('[data-gsap="fade-left"]');
    fadeLeftEls.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainer,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    // Fade-right elements
    const fadeRightEls = document.querySelectorAll('[data-gsap="fade-right"]');
    fadeRightEls.forEach((el) => {
      gsap.fromTo(
        el,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainer,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

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
            scroller: scrollContainer,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
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
            scroller: scrollContainer,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
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
