import { useState, useEffect } from "react";
import { SiBehance, SiDribbble } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { PostcardSection } from "@/components/PostcardSection";
import { Footer } from "@/components/Footer";
import librosIllustra   from "@assets/libros_1_1777757144289.png";
import passportIllustra from "@assets/passport_1_1777757144289.png";
import caipiriIllustra  from "@assets/caipiri_1777757144289.png";
import cafeteiraIllustra from "@assets/Group_1777757144289.png";
import pcIllustra       from "@assets/pcc_1_1777757144289.png";

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
        <section style={{ padding: "80px 40px 64px", position: "relative", overflow: "hidden", minHeight: 260 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
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

          {/* Floating illustrations — right side */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "44%", pointerEvents: "none", zIndex: 1 }}>
            <img src={cafeteiraIllustra} alt="" draggable={false}
              style={{ position: "absolute", top: "8%", right: "30%", height: 88, width: "auto",
                transform: "rotate(-6deg)", animation: "msFloatA 3.4s ease-in-out infinite" }} />
            <img src={librosIllustra} alt="" draggable={false}
              style={{ position: "absolute", top: "38%", right: "8%", height: 88, width: "auto",
                transform: "rotate(5deg)", animation: "msFloatB 2.9s ease-in-out infinite 0.3s" }} />
            <img src={caipiriIllustra} alt="" draggable={false}
              style={{ position: "absolute", top: "60%", right: "36%", height: 88, width: "auto",
                transform: "rotate(-4deg)", animation: "msFloatA 3.1s ease-in-out infinite 0.7s" }} />
            <img src={passportIllustra} alt="" draggable={false}
              style={{ position: "absolute", top: "18%", right: "4%", height: 80, width: "auto",
                transform: "rotate(10deg)", animation: "msFloatB 3.6s ease-in-out infinite 1s" }} />
            <img src={pcIllustra} alt="" draggable={false}
              style={{ position: "absolute", top: "72%", right: "10%", height: 80, width: "auto",
                transform: "rotate(-3deg)", animation: "msFloatA 2.7s ease-in-out infinite 0.5s" }} />
            {/* sparkles */}
            <span style={{ position: "absolute", top: "30%", right: "24%", fontSize: 20, color: "#A8CC2C", animation: "msFloatB 3s ease-in-out infinite" }}>✦</span>
            <span style={{ position: "absolute", top: "55%", right: "52%", fontSize: 14, color: "#3D4A1E", animation: "msFloatA 2.8s ease-in-out infinite 0.6s" }}>✧</span>
            <span style={{ position: "absolute", top: "80%", right: "30%", fontSize: 16, color: "#A8CC2C", animation: "msFloatB 3.3s ease-in-out infinite 1.1s" }}>✦</span>
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

        {/* ── POR ONDE ESTIVE ── */}
        <section style={{ padding: "100px 40px", background: "hsl(var(--muted)/0.25)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ marginBottom: 56 }}>
              <h2 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", margin: 0 }}>
                [Por onde estive]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>

            <div style={{ position: "relative", paddingLeft: 32 }}>
              {/* vertical line */}
              <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "hsl(var(--border))", borderRadius: 2 }} />

              {[
                { role: "Product Designer", company: "Empresa atual", period: "2024 — presente", desc: "Descrição breve do trabalho, impactos e contexto." },
                { role: "UX/UI Designer", company: "Empresa anterior", period: "2022 — 2024", desc: "Descrição breve do trabalho, impactos e contexto." },
                { role: "Designer Jr.", company: "Primeira empresa", period: "2021 — 2022", desc: "Descrição breve do trabalho, impactos e contexto." },
              ].map((exp, i) => (
                <div key={i} style={{ position: "relative", marginBottom: i < 2 ? 48 : 0, paddingLeft: 28 }}>
                  {/* dot */}
                  <div style={{
                    position: "absolute",
                    left: -32,
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: i === 0 ? "#A8CC2C" : "hsl(var(--background))",
                    border: `2px solid ${i === 0 ? "#A8CC2C" : "hsl(var(--border))"}`,
                    zIndex: 1,
                  }} />

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 20, fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: 2 }}>
                        {exp.role}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>
                        {exp.company}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      letterSpacing: "0.08em",
                      color: i === 0 ? "#A8CC2C" : "hsl(var(--muted-foreground))",
                      background: i === 0 ? "rgba(168,204,44,0.12)" : "hsl(var(--muted)/0.5)",
                      padding: "4px 12px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      alignSelf: "flex-start",
                    }}>
                      {exp.period}
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: "hsl(var(--foreground))", opacity: 0.65, margin: 0 }}>
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PESSOAL ── */}
        <section style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ marginBottom: 56 }}>
              <h2 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", margin: 0 }}>
                [Além do trabalho]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 32 }}>
              {[
                {
                  label: "livro favorito",
                  content: "Título do livro favorito aqui",
                  sub: "Autor",
                  img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=280&fit=crop",
                },
                {
                  label: "música do momento",
                  content: "Nome da música",
                  sub: "Artista",
                  img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=280&fit=crop",
                },
                {
                  label: "viagem favorita",
                  content: "Destino",
                  sub: "troque pela sua foto",
                  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=280&fit=crop",
                },
                {
                  label: "meu pet",
                  content: "Nome do pet",
                  sub: "troque pela sua foto",
                  img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=280&fit=crop",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "hsl(var(--card))",
                    border: "1.5px solid hsl(var(--border))",
                    borderRadius: 4,
                    padding: "12px 12px 20px",
                    transform: `rotate(${[1.2, -0.8, 1.5, -1.2][i]}deg)`,
                    boxShadow: "0 6px 24px rgba(61,74,30,0.12)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translateY(-6px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(61,74,30,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${[1.2, -0.8, 1.5, -1.2][i]}deg)`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(61,74,30,0.12)";
                  }}
                >
                  {/* photo area */}
                  <div style={{ borderRadius: 2, overflow: "hidden", marginBottom: 16, height: 160, background: "hsl(var(--muted))" }}>
                    <img
                      src={card.img}
                      alt={card.label}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "sepia(0.08) contrast(1.02)" }}
                    />
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A8CC2C", marginBottom: 6 }}>
                    {card.label}
                  </div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 15, color: "hsl(var(--foreground))", marginBottom: 4, lineHeight: 1.35 }}>
                    {card.content}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "hsl(var(--muted-foreground))", opacity: 0.65 }}>
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes msFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes msFloatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(10px); }
        }
        .nav-link::before,
        .nav-link::after {
          font-family: 'Libre Baskerville', serif;
          font-style: italic;
          font-size: 1em;
          color: #A8CC2C;
          position: absolute;
          top: 50%;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }
        .nav-link::before {
          content: '[';
          right: calc(100% + 2px);
          transform: translateY(-50%) translateX(6px);
        }
        .nav-link::after {
          content: ']';
          left: calc(100% + 2px);
          transform: translateY(-50%) translateX(-6px);
        }
        .nav-link:hover::before {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        .nav-link:hover::after {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        @media (max-width: 768px) {
          nav { padding: 12px 20px !important; }
          section { padding: 60px 20px !important; }
        }
      `}</style>
    </div>
  );
}
