import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "CLASS ASSEMBLY",
    description:
      "Educating peers about the causes and consequences of the electricity crisis in Karachi, and what can be done to mitigate them.",
    success: "Reviews of students who attended",
    tag: "AWARENESS",
    link: "/assembly",
    linkLabel: "View Assembly →",
  },
  {
    title: "POSTER CAMPAIGN",
    description:
      "Visual reminders deployed across the campus to encourage electricity conservation habits.",
    success: "If appliances are being turned off after use or not",
    tag: "ACTION",
    link: "/posters",
    linkLabel: "View Posters →",
  },
  {
    title: "INSTAGRAM AWARENESS",
    description:
      "Raising awareness online through Instagram — reaching wider audiences beyond the campus.",
    success: "Follower and view count of our page",
    tag: "DIGITAL",
    link: "https://www.instagram.com/electricitycrisis/",
    linkLabel: "Visit Instagram →",
    external: true,
  },
];

const PlanStage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineHeight = useRef("0%");

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const scroller = document.querySelector(".scroll-container") as HTMLElement;

    // Animate the timeline line with GSAP scrub
    const tl = gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scroller || undefined,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (lineRef.current) {
              lineRef.current.style.height = `${self.progress * 100}%`;
            }
          },
        },
      },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="plan"
      ref={containerRef}
      className="snap-section min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-28"
    >
      <div data-gsap="stagger">
        <p className="font-mono-code text-xs tracking-[0.5em] text-primary/50 mb-4 text-center">
          // STAGE_03: PLAN_OF_ACTION
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-glow mb-4 tracking-wider text-center">
          PLAN OF ACTION
        </h2>
      </div>

      <p
        data-gsap="blur-in"
        className="text-sm text-muted-foreground max-w-xl text-center mb-16"
      >
        Our plan of action was based on how we as individuals can minimise
        electricity misuse in our and others' lives.
      </p>

      <div className="relative max-w-2xl w-full">
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-border">
          <div
            ref={lineRef}
            className="w-full bg-primary relative"
            style={{ height: "0%" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-primary animate-timeline-glow" />
          </div>
        </div>

        <div className="space-y-16">
          {milestones.map((m, i) => (
            <div
              key={m.title}
              data-gsap="slide-right"
              className="relative pl-16 sm:pl-20"
            >
              <div
                data-gsap="elastic-scale"
                className="absolute left-4 sm:left-6 w-4 h-4 rounded-full border-2 border-accent bg-background"
                style={{
                  boxShadow: "0 0 8px hsl(148 50% 55% / 0.5)",
                  animation: "pulse-green 2s infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              />

              <div className="glass-panel clip-industrial p-6">
                <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono-code text-[10px] px-2 py-1 bg-accent/10 text-accent border border-accent/20">
                    {m.tag}
                  </span>
                  <span className="font-mono-code text-[10px] text-primary/40">
                    MILESTONE_{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 tracking-wide">
                  {m.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {m.description}
                </p>

                <div className="flex items-center gap-2 text-xs mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent glow-green" />
                  <span className="font-mono-code text-accent/80">
                    SUCCESS METRIC: {m.success}
                  </span>
                </div>

                <a
                  href={m.link}
                  target={m.external ? "_blank" : undefined}
                  rel={m.external ? "noopener noreferrer" : undefined}
                  className="inline-block font-mono-code text-xs text-primary hover:text-primary/80 border border-primary/30 px-3 py-1.5 clip-industrial transition-all hover:bg-primary/10 hover:border-primary/50 duration-300"
                >
                  {m.linkLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanStage;
