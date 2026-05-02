import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "project" | "postcard" | "grab";

declare global {
  interface Window {
    setCursorMode: (mode: CursorMode) => void;
  }
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pillLabel, setPillLabel] = useState("ver projeto ✦");

  useEffect(() => {
    window.setCursorMode = (m: CursorMode) => setMode(m);
  }, []);

  useEffect(() => {
    let raf = 0;
    let mx = 0, my = 0;
    let px = 0, py = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      px += (mx - px) * 0.15;
      py += (my - py) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (pillRef.current) {
        pillRef.current.style.transform = `translate(${px}px, ${py}px) rotate(-3deg)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (mode === "postcard") setPillLabel("puxa aqui ✦");
    else setPillLabel("ver projeto ✦");
  }, [mode]);

  const showPill = mode === "project" || mode === "postcard";
  const showGrab = mode === "grab";

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: showPill || showGrab ? 0 : 10,
          height: showPill || showGrab ? 0 : 10,
          borderRadius: "50%",
          background: "#3D4A1E",
          pointerEvents: "none",
          zIndex: 99999,
          marginLeft: -5,
          marginTop: -5,
          transition: "width 0.15s, height 0.15s",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={pillRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: showPill ? 1 : 0,
          transition: "opacity 0.2s",
          transform: "translate(-100px, -100px) rotate(-3deg)",
        }}
      >
        <div
          style={{
            background: "#A8CC2C",
            color: "#2C2A1E",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            padding: "6px 16px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(168,204,44,0.3)",
            marginLeft: -60,
            marginTop: -20,
          }}
        >
          {pillLabel}
        </div>
      </div>
      {showGrab && (
        <div
          ref={undefined}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 99999,
            fontSize: 22,
            marginLeft: -11,
            marginTop: -11,
            transform: dotRef.current?.style.transform,
          }}
        >
          ✋
        </div>
      )}
    </>
  );
}
