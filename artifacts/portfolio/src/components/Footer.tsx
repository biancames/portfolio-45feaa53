import { useRef, useState, useEffect } from "react";
import beachIllus from "@assets/Prancheta1_1777750622927.png";

function FooterName() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lineStyle = (delay: string): React.CSSProperties => ({
    fontFamily: "'Libre Baskerville', serif",
    fontSize: "clamp(4rem,11vw,10rem)",
    fontWeight: 700,
    lineHeight: 0.95,
    display: "block",
    whiteSpace: "nowrap",
    clipPath: visible
      ? "inset(-15% -2% -15% -2%)"
      : "inset(-15% 102% -15% -2%)",
    transition: `clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`,
  });

  return (
    <div ref={ref} style={{ paddingBottom: 8 }}>
      <span className="footer-name" style={lineStyle("0s")}>
        <span style={{ fontStyle: "normal" }}>Bia</span><span style={{ fontStyle: "italic" }}>nca</span>
      </span>
      <span className="footer-name" style={lineStyle("0.25s")}>
        <span style={{ fontStyle: "normal" }}>Mes</span><span style={{ fontStyle: "italic" }}>quita</span>
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border))", padding: "80px 40px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: 20, color: "#3D4A1E" }}>
          Chegou até aqui e quer deixar um oi?
        </div>
        <a
          href="mailto:biadesign.contate@gmail.com"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            color: "#A8CC2C",
            textDecoration: "underline",
            textDecorationColor: "transparent",
            transition: "text-decoration-color 0.3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecorationColor = "#A8CC2C"; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecorationColor = "transparent"; }}
        >
          biadesign.contate@gmail.com
        </a>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/biancames" },
            { label: "Behance",  href: "https://behance.net/biadesigns" },
            { label: "Currículo ↓", href: "#" },
            { label: "Email",    href: "mailto:biadesign.contate@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 600,
                color: "hsl(var(--foreground))",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 80, position: "relative", overflow: "hidden" }}>
        <style>{`
          .footer-name { color: #3D4A1E; }
          .dark .footer-name { color: #A8CC2C; }
          .beach-illus { transition: filter 0.4s ease; }
          .dark .beach-illus { filter: sepia(1) saturate(4) hue-rotate(30deg) brightness(1.1); }
        `}</style>
        <div style={{ display: "flex", alignItems: "stretch", gap: 40, paddingLeft: 40 }}>
          <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-end" }}>
            <img
              src={beachIllus}
              alt="Out of office"
              className="beach-illus"
              draggable={false}
              style={{ height: "100%", width: "auto", display: "block", maxHeight: "100%" }}
            />
          </div>
          <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
            <FooterName />
          </div>
        </div>
        <div style={{ height: 24, background: "#3D4A1E", marginTop: 0 }} />
      </div>
    </footer>
  );
}
