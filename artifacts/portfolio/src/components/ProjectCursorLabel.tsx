import { useState, useEffect, useRef } from "react";

export function ProjectCursorLabel() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setVisible(!!el?.closest("[data-project-card]"));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: `translate3d(${pos.x + 20}px, ${pos.y - 14}px, 0)`,
        zIndex: 9998,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
        background: "#A8CC2C",
        color: "#2C2A1E",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        fontSize: 13,
        padding: "3px 10px 4px",
        borderRadius: 3,
        whiteSpace: "nowrap",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: 6,
        letterSpacing: "0.01em",
      }}
    >
      ver projeto
      <span style={{ fontSize: 11, opacity: 0.85 }}>✦</span>
    </div>
  );
}
