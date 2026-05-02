import { useState, useEffect } from "react";
import { SiBehance, SiDribbble } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { PostcardSection } from "@/components/PostcardSection";

const skills = ["UX Research", "UX Design", "Product Design", "Interaction Design", "Design System", "Prototipação", "Visual Design"];

export default function MaisSobre() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
        background: scrolled ? "hsla(var(--background)/0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "none",
        transition: "all 0.35s ease",
      }}>
        <a href="/" style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 20, color: "#A8CC2C", fontWeight: 700, textDecoration: "none", letterSpacing: "-0.02em" }}>bia.design</a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[
            { label: "Início",   href: "/" },
            { label: "Projetos", href: "/projetos" },
            { label: "Sobre",    href: "/#sobre" },
            { label: "Contato",  href: "/#contato" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "hsl(var(--foreground))",
                textDecoration: "none",
                cursor: "pointer",
                opacity: 0.75,
                transition: "color 0.3s, opacity 0.3s",
                position: "relative",
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75"; }}
            >
              {label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginLeft: 8 }}>
            <a href="https://linkedin.com/in/biancames" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}><Linkedin size={16} /></a>
            <a href="https://behance.net/biadesigns" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}><SiBehance size={16} /></a>
            <a href="#" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}><SiDribbble size={16} /></a>
          </div>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <main style={{ paddingTop: 80 }}>

        {/* ── HEADER ── */}
        <section style={{ padding: "80px 40px 64px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <a
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                color: "hsl(var(--foreground))", opacity: 0.6,
                textDecoration: "none", marginBottom: 32,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              ← Voltar
            </a>
            <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "hsl(var(--foreground))", margin: "0 0 8px" }}>
              [Mais sobre mim]
            </h1>
            <div style={{ width: 48, height: 4, background: "#A8CC2C", borderRadius: 4 }} />
          </div>
        </section>

        {/* ── POSTCARD ── */}
        <section style={{ padding: "0 40px 100px", background: "hsl(var(--muted)/0.25)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", paddingTop: 64 }}>
            <PostcardSection hideCta />
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", color: "hsl(var(--foreground))", margin: 0 }}>
                [Skills]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {skills.map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "1.5px dashed #3D4A1E",
                    color: "#3D4A1E",
                    background: "transparent",
                    transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
                    display: "inline-block",
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,204,44,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #A8CC2C;
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after { width: 100%; }
        @media (max-width: 768px) {
          nav { padding: 12px 20px !important; }
          section { padding: 60px 20px !important; }
        }
      `}</style>
    </div>
  );
}
