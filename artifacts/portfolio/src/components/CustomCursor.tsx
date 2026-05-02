import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    let mx = -200;
    let my = -200;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      if (el) {
        const computed = window.getComputedStyle(el).cursor;
        setHidden(
          computed === "pointer" ||
          computed === "grab" ||
          computed === "grabbing" ||
          computed === "text"
        );
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const loop = () => {
      if (ref.current) {
        ref.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes sparkPulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          50%       { transform: scale(1.25) rotate(22deg); opacity: 1; }
        }
      `}</style>
      <div
        ref={ref}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.12s ease",
          transform: "translate(-200px, -200px)",
          userSelect: "none",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 22,
            lineHeight: 1,
            color: "#3D4A1E",
            marginLeft: -11,
            marginTop: -11,
            animation: "sparkPulse 2.4s ease-in-out infinite",
          }}
        >
          ✦
        </span>
      </div>
    </>
  );
}
