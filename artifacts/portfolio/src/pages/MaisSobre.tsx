import { useState, useEffect, useCallback } from "react";
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

const SLIDES = [
  { label: "livro favorito", content: "Um Estudo em Vermelho", sub: "Arthur Conan Doyle", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=700&fit=crop" },
  { label: "música do momento", content: "Vienna", sub: "Billy Joel", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=700&fit=crop" },
  { label: "viagem favorita", content: "Destino", sub: "troque pela sua foto", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=700&fit=crop" },
  { label: "drink favorito", content: "Moscow Mule", sub: "", img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1200&h=700&fit=crop" },
  { label: "meu pet", content: "Nome do pet", sub: "troque pela sua foto", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=700&fit=crop" },
];

function ImageCarousel() {
  const [active, setActive] = useState(0);
  const prev = useCallback(() => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % SLIDES.length), []);

  return (
    <>
      {/* carousel track */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 480, background: "#2C2A1E" }}>
        <div style={{
          display: "flex", height: "100%",
          transform: `translateX(-${active * 100}%)`,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {SLIDES.map((s, i) => (
            <div key={i} style={{ minWidth: "100%", height: "100%", position: "relative", flexShrink: 0 }}>
              <img src={s.img} alt={s.label} draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "sepia(0.1) contrast(1.05) saturate(0.88)" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(44,42,30,0.82) 0%, transparent 100%)",
                padding: "48px 32px 28px",
              }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A8CC2C", marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 32, fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1 }}>
                  {s.content}
                </div>
                {s.sub && (
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#F5F0E8", opacity: 0.6, marginTop: 4 }}>
                    {s.sub}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* arrow left */}
        <button onClick={prev} aria-label="anterior" style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(245,240,232,0.15)", backdropFilter: "blur(6px)",
          border: "1px solid rgba(245,240,232,0.25)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#F5F0E8", fontSize: 20, transition: "background 0.2s ease", zIndex: 4,
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(168,204,44,0.35)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,232,0.15)"; }}
        >←</button>

        {/* arrow right */}
        <button onClick={next} aria-label="próximo" style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(245,240,232,0.15)", backdropFilter: "blur(6px)",
          border: "1px solid rgba(245,240,232,0.25)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#F5F0E8", fontSize: 20, transition: "background 0.2s ease", zIndex: 4,
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(168,204,44,0.35)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,232,0.15)"; }}
        >→</button>

        {/* counter */}
        <div style={{
          position: "absolute", top: 20, right: 20, zIndex: 4,
          fontFamily: "'DM Mono', monospace", fontSize: 11,
          color: "rgba(245,240,232,0.7)", letterSpacing: "0.1em",
        }}>
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>

      {/* dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`slide ${i + 1}`} style={{
            width: i === active ? 24 : 8, height: 8, borderRadius: 4,
            background: i === active ? "#A8CC2C" : "hsl(var(--border))",
            border: "none", cursor: "pointer", padding: 0,
            transition: "width 0.3s ease, background 0.3s ease",
          }} />
        ))}
      </div>
    </>
  );
}

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
        <section style={{ padding: "80px 40px 64px", position: "relative", overflow: "hidden", minHeight: 180 }}>
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
            <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "hsl(var(--foreground))", margin: "0 0 8px" }}>[Por trás dos pixels]</h1>
            <div style={{ width: 48, height: 4, background: "#A8CC2C", borderRadius: 4 }} />
          </div>
        </section>

        {/* ── POSTCARD ── */}
        <section style={{ padding: "0 40px 100px", background: "hsl(var(--muted)/0.25)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", paddingTop: 64 }}>

            {/* Illustrations overlaid on top of the postcard photo area */}
            <div style={{ position: "absolute", top: 64, left: 0, width: "44%", height: 200, pointerEvents: "none", zIndex: 20 }}>
              <img src={cafeteiraIllustra} alt="" draggable={false}
                style={{ position: "absolute", top: 16, left: "4%", height: 88, width: "auto",
                  transform: "rotate(-8deg)", animation: "msFloatA 3.4s ease-in-out infinite" }} />
              <img src={pcIllustra} alt="" draggable={false}
                style={{ position: "absolute", top: 60, left: "26%", height: 72, width: "auto",
                  transform: "rotate(5deg)", animation: "msFloatB 2.7s ease-in-out infinite 0.5s" }} />
              <img src={caipiriIllustra} alt="" draggable={false}
                style={{ position: "absolute", top: 8, left: "48%", height: 80, width: "auto",
                  transform: "rotate(-5deg)", animation: "msFloatA 3.1s ease-in-out infinite 0.7s" }} />
              <img src={passportIllustra} alt="" draggable={false}
                style={{ position: "absolute", top: 44, left: "68%", height: 100, width: "auto",
                  transform: "rotate(8deg)", animation: "msFloatB 3.6s ease-in-out infinite 1s" }} />
              <img src={librosIllustra} alt="" draggable={false}
                style={{ position: "absolute", top: 12, left: "82%", height: 76, width: "auto",
                  transform: "rotate(-6deg)", animation: "msFloatA 2.9s ease-in-out infinite 0.3s" }} />
              <span style={{ position: "absolute", top: 8, left: "38%", fontSize: 16, color: "#A8CC2C", animation: "msFloatB 3s ease-in-out infinite" }}>✦</span>
              <span style={{ position: "absolute", top: 80, left: "14%", fontSize: 12, color: "#C8E870", animation: "msFloatA 2.8s ease-in-out infinite 0.6s" }}>✧</span>
            </div>

            <PostcardSection hideCta noFlip />
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(284px, 1fr))", gap: 24 }}>
              {[
                { role: "Product Designer", company: "Empresa atual", period: "2024 — presente", desc: "Descrição breve do trabalho, impactos e contexto.", current: true },
                { role: "UX/UI Designer", company: "Empresa anterior", period: "2022 — 2024", desc: "Descrição breve do trabalho, impactos e contexto.", current: false },
                { role: "Designer Jr.", company: "Primeira empresa", period: "2021 — 2022", desc: "Descrição breve do trabalho, impactos e contexto.", current: false },
              ].map((exp, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: exp.current
                      ? "0 8px 32px rgba(61,74,30,0.14)"
                      : "0 4px 16px rgba(61,74,30,0.07)",
                    transform: `rotate(${[-0.6, 0.5, -0.4][i]}deg)`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(61,74,30,0.16)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${[-0.6, 0.5, -0.4][i]}deg)`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = exp.current
                      ? "0 8px 32px rgba(61,74,30,0.14)"
                      : "0 4px 16px rgba(61,74,30,0.07)";
                  }}
                >
                  {/* ── header block (olive) ── */}
                  <div style={{
                    background: exp.current ? "#3D4A1E" : "#4A5E28",
                    padding: "20px 24px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#A8CC2C",
                      }}>
                        {exp.period}
                      </div>
                      {exp.current && (
                        <div style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#3D4A1E",
                          background: "#A8CC2C",
                          padding: "3px 8px",
                          borderRadius: 2,
                        }}>agora</div>
                      )}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#F5F0E8",
                      letterSpacing: "0.01em",
                    }}>
                      {exp.company}
                    </div>
                  </div>

                  {/* ── body ── */}
                  <div style={{ background: "hsl(var(--card))", padding: "20px 24px 24px" }}>
                    <div style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontStyle: "italic",
                      fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
                      fontWeight: 700,
                      color: "hsl(var(--foreground))",
                      lineHeight: 1.25,
                      marginBottom: 12,
                    }}>
                      {exp.role}
                    </div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: "hsl(var(--foreground))",
                      opacity: 0.6,
                      margin: 0,
                    }}>
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PESSOAL ── */}
        <section style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ marginBottom: 40 }}>
              <h2 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", margin: 0 }}>
                [Além do trabalho]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>
            <ImageCarousel />
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
