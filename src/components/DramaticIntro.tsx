import { useState, useEffect, useRef, useCallback } from "react";

interface DramaticIntroProps {
  onComplete: () => void;
}

const QUESTION = "Why is there an electricity crisis in Karachi?";
const TYPING_SPEED = 60;
const PAUSE_AFTER_TYPE = 1200;
const FADE_DURATION = 800;

const DramaticIntro = ({ onComplete }: DramaticIntroProps) => {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "fadeout" | "done">(
    "typing",
  );
  const indexRef = useRef(0);
  const timerRef = useRef<number>(0);

  const type = useCallback(() => {
    if (indexRef.current < QUESTION.length) {
      indexRef.current++;
      setDisplayed(QUESTION.slice(0, indexRef.current));
      timerRef.current = window.setTimeout(type, TYPING_SPEED);
    } else {
      setPhase("pause");
      timerRef.current = window.setTimeout(() => {
        setPhase("fadeout");
        timerRef.current = window.setTimeout(() => {
          setPhase("done");
          sessionStorage.setItem("intro_shown", "true");
          onComplete();
        }, FADE_DURATION);
      }, PAUSE_AFTER_TYPE);
    }
  }, [onComplete]);

  useEffect(() => {
    timerRef.current = window.setTimeout(type, 400);
    return () => clearTimeout(timerRef.current);
  }, [type]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      <div className="max-w-5xl px-6 text-center">
        <h2
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-glow leading-tight"
          style={{
            transform: phase === "fadeout" ? "scale(1.05)" : "scale(1)",
            opacity: phase === "fadeout" ? 0 : 1,
            transition: `all ${FADE_DURATION}ms ease-in-out`,
          }}
        >
          {displayed}
          <span
            className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
            style={{
              animation:
                phase === "typing"
                  ? "blink-cursor 0.7s step-end infinite"
                  : "none",
              opacity: phase === "pause" ? 1 : undefined,
            }}
          />
        </h2>
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DramaticIntro;
