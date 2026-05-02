import { useEffect, useRef, useState } from "react";
import { SiBehance, SiDribbble, SiFigma, SiNotion, SiFramer, SiHotjar, SiMiro } from "react-icons/si";
import postcardImg from "@assets/postc_1777742914935.png";
import bioPhoto from "@assets/Perfil_1777746393399.jpeg";
import figmaIllustra from "@assets/Figma_1777742554578.png";
import caipirinhaIllustra from "@assets/ilustras_1777742559195.png";
import cafeIllustra from "@assets/IlustraCafe_1777742604142.png";
import pcIllustra from "@assets/ilustraPC_1777742604142.png";

/* ─── helpers ─── */
function setCursor(mode: "default" | "project" | "postcard" | "grab") {
  if (typeof window !== "undefined" && window.setCursorMode) {
    window.setCursorMode(mode);
  }
}

function useDragBack(
  ref: React.RefObject<HTMLElement | null>,
  origX: number,
  origY: number
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dragging = false;
    let startX = 0, startY = 0;
    let elStartX = origX, elStartY = origY;
    let curX = origX, curY = origY;

    const onDown = (e: MouseEvent) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      elStartX = curX;
      elStartY = curY;
      el.style.transition = "none";
      el.style.filter = "drop-shadow(0 8px 24px rgba(0,0,0,0.25))";
      setCursor("grab");
      e.preventDefault();
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      curX = elStartX + (e.clientX - startX);
      curY = elStartY + (e.clientY - startY);
      el.style.transform = `translate(${curX}px, ${curY}px)`;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      curX = origX;
      curY = origY;
      el.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s";
      el.style.transform = `translate(${origX}px, ${origY}px)`;
      el.style.filter = "none";
      setCursor("default");
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [ref, origX, origY]);
}

/* ─── Sparkles (kept as SVG) ─── */
function SparklesSVG() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="25" fontSize="22" fill="#A8CC2C" fontFamily="serif">✦</text>
      <text x="70" y="18" fontSize="14" fill="#3D4A1E" fontFamily="serif">✧</text>
      <text x="90" y="65" fontSize="28" fill="#A8CC2C" fontFamily="serif">✦</text>
      <text x="20" y="90" fontSize="12" fill="#3D4A1E" fontFamily="serif">✦</text>
      <text x="55" y="110" fontSize="18" fill="#A8CC2C" fontFamily="serif">✧</text>
      <text x="100" y="100" fontSize="10" fill="#3D4A1E" fontFamily="serif">✦</text>
    </svg>
  );
}

/* ─── Draggable illustration wrapper ─── */
function DraggableIllustration({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDragBack(ref as React.RefObject<HTMLElement | null>, 0, 0);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        cursor: "grab",
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Postcard: flip card — front = info card, back = postcard cover ─── */
function PostcardSection() {
  const [flipped, setFlipped] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const tools = [
    { name: "Figma",      icon: <SiFigma size={18} /> },
    { name: "Framer",     icon: <SiFramer size={18} /> },
    { name: "Photoshop",  icon: <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, letterSpacing: "-0.5px" }}>Ps</span> },
    { name: "Affinity",   icon: <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700 }}>Ad</span> },
    { name: "Notion",     icon: <SiNotion size={18} /> },
    { name: "Maze",       icon: <span style={{ fontSize: 17, lineHeight: 1 }}>◎</span> },
    { name: "Miro",       icon: <SiMiro size={18} /> },
  ];
  const loopTools = [...tools, ...tools];

  return (
    <div style={{ perspective: "1400px" }}>
      {/* ── Flip wrapper ── */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          position: "relative",
          height: 460,
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          borderRadius: 20,
        }}
      >

        {/* ── FRONT FACE ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
          border: "1.5px dashed hsl(var(--border))",
          borderRadius: 20,
          background: "hsl(var(--background))",
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 8px 40px rgba(61,74,30,0.08)",
        }}>

          {/* ── Left: photo + marquee strip ── */}
          <div style={{ flex: "0 0 44%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <img
              src={bioPhoto}
              alt="Bianca Mesquita"
              style={{ flex: 1, width: "100%", objectFit: "cover", objectPosition: "center top", display: "block", minHeight: 0 }}
              draggable={false}
            />
            {/* Infinite marquee tool strip */}
            <div style={{
              overflow: "hidden",
              background: "hsl(var(--background))",
              borderTop: "1px solid hsl(var(--border))",
              padding: "10px 0",
            }}>
              <div style={{
                display: "flex",
                gap: 10,
                width: "max-content",
                animation: "toolsScroll 20s linear infinite",
              }}>
                {loopTools.map((t, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 9,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#3D4A1E", flexShrink: 0,
                  }}>
                    {t.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: name block + bio block + CTA button ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, padding: "20px 20px 16px" }}>

            {/* Name block — dark olive */}
            <div style={{
              background: "#4A5E28", borderRadius: 14,
              padding: "18px 20px", color: "#F5F0E8",
            }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 21, fontWeight: 700, marginBottom: 6 }}>
                Bianca Mesquita
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#C8E870" }}>
                Product Designer ✦ UX/UI Designer
              </div>
            </div>

            {/* Bio block — light card */}
            <div style={{
              flex: 1,
              background: "hsl(var(--card))", borderRadius: 14,
              border: "1px solid hsl(var(--border))", padding: "18px 20px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              overflow: "hidden",
            }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.75, color: "hsl(var(--foreground))", margin: "0 0 10px" }}>
                  Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.75, color: "hsl(var(--foreground))", margin: 0 }}>
                  Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega.
                  Acredito que bons produtos nascem do entendimento real de quem usa.
                </p>
              </div>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: "#D4713A", marginTop: 10, textAlign: "right", fontStyle: "italic" }}>
                Bianca Mesquita
              </div>
            </div>

            {/* CTA button — hover swaps colors, arrow rotates */}
            <div
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: btnHover ? "#3D4A1E" : "#C8E870",
                borderRadius: 14,
                padding: "13px 18px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "background 0.25s ease",
                cursor: "pointer",
              }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                color: btnHover ? "#C8E870" : "#2C2A1E",
                transition: "color 0.25s ease",
              }}>
                Mais sobre mim
              </span>
              <span style={{
                width: 34, height: 34, borderRadius: "50%",
                background: btnHover ? "#C8E870" : "#3D4A1E",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                color: btnHover ? "#2C2A1E" : "#F5F0E8",
                fontSize: 17,
                transition: "background 0.25s ease, color 0.25s ease, transform 0.35s ease",
                transform: btnHover ? "rotate(-45deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}>
                ↓
              </span>
            </div>
          </div>

        </div>

        {/* ── BACK FACE — postcard cover ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
          transform: "rotateY(180deg)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(61,74,30,0.15)",
        }}>
          <img
            src={postcardImg}
            alt="postcard cover"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            draggable={false}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
            style={{
              position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
              background: "rgba(245,240,232,0.92)", border: "none", borderRadius: 999,
              padding: "8px 24px", fontFamily: "Caveat, cursive", fontSize: 16,
              color: "#2C2A1E", cursor: "pointer", backdropFilter: "blur(4px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            ✦ voltar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes toolsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ─── Process Step ─── */
function ProcessStep({ num, title, desc, delay, total }: { num: string; title: string; desc: string; delay: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "20px 28px",
        borderRadius: 14,
        borderLeft: `4px solid ${hovered ? "#A8CC2C" : "hsl(var(--border))"}`,
        background: hovered ? "rgba(168,204,44,0.07)" : "transparent",
        cursor: "default",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, border-color 0.25s, background 0.25s`,
      }}
    >
      {/* Large italic number */}
      <div style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
        fontStyle: "italic",
        fontWeight: 700,
        color: hovered ? "#A8CC2C" : "#3D4A1E",
        opacity: hovered ? 1 : 0.25,
        lineHeight: 1,
        minWidth: 64,
        transition: "color 0.25s, opacity 0.25s",
        userSelect: "none",
      }}>
        {num}
      </div>

      {/* Title + expandable description */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 20,
          fontWeight: 700,
          color: "hsl(var(--foreground))",
          marginBottom: hovered ? 8 : 0,
          transition: "margin 0.25s",
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "hsl(var(--foreground))",
          opacity: hovered ? 0.75 : 0,
          maxHeight: hovered ? 48 : 0,
          overflow: "hidden",
          lineHeight: 1.6,
          transition: "opacity 0.3s, max-height 0.3s ease",
        }}>
          {desc}
        </div>
      </div>

      {/* Counter */}
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        opacity: hovered ? 0.5 : 0.2,
        color: "hsl(var(--foreground))",
        transition: "opacity 0.25s",
        whiteSpace: "nowrap",
      }}>
        {num}/{String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, featured }: {
  project: { title: string; subtitle?: string; desc: string; tags: string[]; img?: string; placeholder?: boolean };
  featured?: boolean;
}) {
  return (
    <div
      data-testid={`card-project-${project.title}`}
      onMouseEnter={() => setCursor("project")}
      onMouseLeave={() => setCursor("default")}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "hsl(var(--card))",
        boxShadow: "0 4px 24px rgba(61,74,30,0.10)",
        cursor: "none",
        transform: featured ? "rotate(-0.5deg)" : undefined,
        border: project.placeholder ? "2px dashed hsl(var(--border))" : "1px solid hsl(var(--border))",
        flex: 1,
        minWidth: 0,
      }}
    >
      {project.placeholder ? (
        <div style={{ padding: 40, textAlign: "center", minHeight: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ fontSize: 32, opacity: 0.3 }}>✦</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, opacity: 0.4 }}>Em breve</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, opacity: 0.3 }}>Próximo projeto chegando...</div>
        </div>
      ) : (
        <>
          <div style={{ position: "relative", overflow: "hidden", height: featured ? 340 : 200 }}>
            <img
              src={project.img}
              alt={project.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", display: "block" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(168,204,44,0.15)",
              opacity: 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }} className="card-overlay" />
          </div>
          <div style={{ padding: featured ? "24px 28px" : "18px 20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: 6 }}>
              {project.tags[0]}
            </div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: featured ? 28 : 20, fontWeight: 700, marginBottom: 6 }}>
              {project.title}
            </div>
            {featured && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, opacity: 0.7, marginBottom: 12, lineHeight: 1.5 }}>{project.desc}</div>}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {project.tags.map((t) => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: "1.5px dashed hsl(var(--border))",
                  color: "hsl(var(--muted-foreground))",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Beach SVG illustration ─── */
function BeachScene() {
  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <ellipse cx="45" cy="32" rx="28" ry="28" stroke="#D4713A" strokeWidth="2" fill="#D4713A" fillOpacity="0.18"/>
      <line x1="45" y1="0" x2="45" y2="8" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="45" y1="56" x2="45" y2="64" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="13" y1="32" x2="5" y2="32" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="77" y1="32" x2="85" y2="32" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="21" y1="8" x2="15" y2="2" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="69" y1="8" x2="75" y2="2" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="21" y1="56" x2="15" y2="62" stroke="#D4713A" strokeWidth="1.5"/>
      <line x1="69" y1="56" x2="75" y2="62" stroke="#D4713A" strokeWidth="1.5"/>
      <rect x="100" y="130" width="140" height="60" rx="6" stroke="#3D4A1E" strokeWidth="2" fill="none"/>
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={i} x1={100} y1={130 + i*8 + 4} x2={240} y2={130 + i*8 + 4} stroke="#3D4A1E" strokeWidth={i%2===0 ? 3 : 0} strokeOpacity="0.5"/>
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={104 + i*20} y={130} width={16} height={60} fill={i%2===0 ? "#3D4A1E" : "transparent"} fillOpacity="0.12"/>
      ))}
      <line x1="170" y1="60" x2="170" y2="130" stroke="#3D4A1E" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M170 60 Q120 70 110 100 Q150 90 170 85" stroke="#3D4A1E" strokeWidth="2" fill="#3D4A1E" fillOpacity="0.15"/>
      <path d="M170 60 Q220 68 230 95 Q190 88 170 85" stroke="#3D4A1E" strokeWidth="2" fill="#3D4A1E" fillOpacity="0.15"/>
      <path d="M108 100 Q115 108 122 103" stroke="#3D4A1E" strokeWidth="1.5" fill="none"/>
      <path d="M228 95 Q224 104 218 100" stroke="#3D4A1E" strokeWidth="1.5" fill="none"/>
      <ellipse cx="65" cy="176" rx="12" ry="5" stroke="#3D4A1E" strokeWidth="1.5" transform="rotate(-20 65 176)"/>
      <ellipse cx="65" cy="176" rx="5" ry="3" fill="#D4713A" fillOpacity="0.3" stroke="#D4713A" strokeWidth="1" transform="rotate(-20 65 176)"/>
      <ellipse cx="82" cy="180" rx="12" ry="5" stroke="#3D4A1E" strokeWidth="1.5" transform="rotate(15 82 180)"/>
      <ellipse cx="82" cy="180" rx="5" ry="3" fill="#D4713A" fillOpacity="0.3" stroke="#D4713A" strokeWidth="1" transform="rotate(15 82 180)"/>
      <rect x="245" y="155" width="14" height="28" rx="4" stroke="#3D4A1E" strokeWidth="1.5"/>
      <ellipse cx="252" cy="155" rx="7" ry="4" stroke="#A8CC2C" strokeWidth="1.5"/>
      <line x1="252" y1="151" x2="252" y2="148" stroke="#3D4A1E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M100 195 Q170 185 280 192" stroke="#3D4A1E" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

/* ─── Marquee ─── */
function Marquee({ text }: { text: string }) {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
        @keyframes bounce-btn {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-4px); }
        }
        .project-card:hover .card-overlay { opacity: 1 !important; }
        @keyframes stagger-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ display: "inline-flex", animation: "marquee 18s linear infinite", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: "clamp(4rem,11vw,10rem)", fontWeight: 700, color: "hsl(var(--foreground))", opacity: 0.08, paddingRight: "4rem" }}>{text} &nbsp; {text} &nbsp;</span>
        <span style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: "clamp(4rem,11vw,10rem)", fontWeight: 700, color: "hsl(var(--foreground))", opacity: 0.08, paddingRight: "4rem" }}>{text} &nbsp; {text} &nbsp;</span>
      </div>
    </div>
  );
}

/* ─── Main Home Page ─── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = [
    { title: "SisPat", desc: "Sistema público de patrimônio imobiliário. Redesign completo com foco em acessibilidade e eficiência para servidores públicos.", tags: ["Redesign", "UX Research", "UX Design"], img: "https://picsum.photos/seed/sispatbig/1200/700" },
    { title: "SGTran", desc: "Sistema de gestão de transporte.", tags: ["Logística", "UX Design"], img: "https://picsum.photos/seed/sgtran/800/500" },
    { title: "MundoLingo App", desc: "App mobile de eventos e idiomas.", tags: ["Eventos", "Product Design", "Mobile App"], img: "https://picsum.photos/seed/mundolingo/800/500" },
    { title: "Em breve", desc: "", tags: [], placeholder: true },
  ];

  const tools = [
    { name: "Figma", icon: <SiFigma /> },
    { name: "FigJam", icon: <SiFigma /> },
    { name: "Framer", icon: <SiFramer /> },
    { name: "Notion", icon: <SiNotion /> },
    { name: "Photoshop", icon: <span style={{fontSize:16, fontWeight:700}}>Ps</span> },
    { name: "Illustrator", icon: <span style={{fontSize:16, fontWeight:700}}>Ai</span> },
    { name: "Maze", icon: <span style={{fontSize:16}}>◎</span> },
    { name: "Hotjar", icon: <SiHotjar /> },
  ];

  const skills = ["UX Research", "UX Design", "Product Design", "Interaction Design", "Design System", "Prototipação", "Visual Design"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
        background: scrolled ? "hsla(var(--background)/0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "none",
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: "#A8CC2C", fontWeight: 600 }}>bia.design</span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Início", "Projetos", "Sobre", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-testid={`link-nav-${item.toLowerCase()}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "hsl(var(--foreground))",
                textDecoration: "none",
                cursor: "none",
                opacity: 0.8,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
            >
              {item}
            </a>
          ))}
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginLeft: 8 }}>
            <a data-testid="link-linkedin" href="https://linkedin.com/in/biancamesquita" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "none", transition: "opacity 0.2s", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={(e)=>(e.currentTarget.style.opacity="1")} onMouseLeave={(e)=>(e.currentTarget.style.opacity="0.6")}>in</a>
            <a data-testid="link-behance" href="https://behance.net/biancamesquita" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "none", transition: "opacity 0.2s" }} onMouseEnter={(e)=>(e.currentTarget.style.opacity="1")} onMouseLeave={(e)=>(e.currentTarget.style.opacity="0.6")}><SiBehance size={16}/></a>
            <a data-testid="link-dribbble" href="#" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "none", transition: "opacity 0.2s" }} onMouseEnter={(e)=>(e.currentTarget.style.opacity="1")} onMouseLeave={(e)=>(e.currentTarget.style.opacity="0.6")}><SiDribbble size={16}/></a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="início" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 40px",
        paddingTop: 80,
      }}>
        <div style={{ flex: 1, maxWidth: 560, position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999,
            border: "1.5px dashed #A8CC2C",
            marginBottom: 32,
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "#3D4A1E",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#A8CC2C", display: "inline-block", animation: "pulse 2s infinite" }} />
            Disponível para trabalho
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", lineHeight: 1.05, margin: 0 }}>
            <span style={{ display: "block", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontStyle: "italic", fontWeight: 400, color: "hsl(var(--foreground))" }}>Oi, eu sou a</span>
            <span style={{ display: "block", fontSize: "clamp(5rem, 11vw, 9rem)", fontStyle: "italic", fontWeight: 700, color: "#3D4A1E", lineHeight: 0.9 }}>Bia,</span>
            <span style={{ display: "block", fontSize: "clamp(1.5rem, 4vw, 3rem)", fontStyle: "normal", fontWeight: 700, color: "#A8CC2C", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>product_designer</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.65, marginTop: 28, opacity: 0.75, maxWidth: 440 }}>
            que transforma necessidades dos usuários em experiências digitais claras e funcionais.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
            <a
              href="#projetos"
              data-testid="link-ver-projetos"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#A8CC2C", color: "#2C2A1E",
                padding: "12px 28px", borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                textDecoration: "none", cursor: "none",
                transform: "rotate(-1.5deg)",
                boxShadow: "0 4px 20px rgba(168,204,44,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(-1.5deg) scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(-1.5deg)"; }}
            >
              Ver projetos ✦
            </a>
            <a
              href="mailto:biadesign.contate@gmail.com"
              data-testid="link-contato-hero"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))",
                padding: "12px 28px", borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14,
                textDecoration: "none", cursor: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--muted))"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Contato
            </a>
          </div>
        </div>

        {/* Illustrations */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50%", pointerEvents: "none" }}>
          {/* Draggable illustrations — all 120px */}
          <DraggableIllustration style={{ top: "12%", right: "30%", pointerEvents: "all" }}>
            <img src={figmaIllustra} alt="Figma" width={120} style={{ display: "block", transform: "rotate(6deg)" }} draggable={false} />
          </DraggableIllustration>
          <DraggableIllustration style={{ top: "42%", right: "6%", pointerEvents: "all" }}>
            <img src={cafeIllustra} alt="Cafeteira" width={120} style={{ display: "block", transform: "rotate(-8deg)" }} draggable={false} />
          </DraggableIllustration>
          <DraggableIllustration style={{ top: "60%", right: "28%", pointerEvents: "all" }}>
            <img src={pcIllustra} alt="Laptop" width={120} style={{ display: "block", transform: "rotate(3deg)" }} draggable={false} />
          </DraggableIllustration>
          <DraggableIllustration style={{ top: "20%", right: "4%", pointerEvents: "all" }}>
            <img src={caipirinhaIllustra} alt="Caipirinha" width={120} style={{ display: "block", transform: "rotate(-5deg)" }} draggable={false} />
          </DraggableIllustration>
          {/* Non-draggable floating sparkles scattered among illustrations */}
          <div style={{ position: "absolute", top: "6%", right: "22%", animation: "floatA 3.2s ease-in-out infinite", pointerEvents: "none" }}>
            <span style={{ fontSize: 22, color: "#A8CC2C", fontFamily: "serif" }}>✦</span>
          </div>
          <div style={{ position: "absolute", top: "18%", right: "48%", animation: "floatB 2.8s ease-in-out infinite", pointerEvents: "none" }}>
            <span style={{ fontSize: 14, color: "#3D4A1E", fontFamily: "serif" }}>✧</span>
          </div>
          <div style={{ position: "absolute", top: "36%", right: "26%", animation: "floatA 3.6s ease-in-out infinite 0.4s", pointerEvents: "none" }}>
            <span style={{ fontSize: 28, color: "#A8CC2C", fontFamily: "serif" }}>✦</span>
          </div>
          <div style={{ position: "absolute", top: "55%", right: "6%", animation: "floatB 2.5s ease-in-out infinite 0.8s", pointerEvents: "none" }}>
            <span style={{ fontSize: 12, color: "#3D4A1E", fontFamily: "serif" }}>✦</span>
          </div>
          <div style={{ position: "absolute", top: "72%", right: "50%", animation: "floatA 3s ease-in-out infinite 1.2s", pointerEvents: "none" }}>
            <span style={{ fontSize: 18, color: "#A8CC2C", fontFamily: "serif" }}>✧</span>
          </div>
          <div style={{ position: "absolute", top: "82%", right: "10%", animation: "floatB 3.4s ease-in-out infinite 0.2s", pointerEvents: "none" }}>
            <span style={{ fontSize: 10, color: "#3D4A1E", fontFamily: "serif" }}>✦</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: scrolled ? 0 : 1,
          pointerEvents: "none",
          transition: "opacity 0.5s ease",
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.45 }}>scroll</div>
          {/* Mouse shape */}
          <div style={{
            width: 22, height: 34, borderRadius: 11,
            border: "1.5px solid hsl(var(--foreground))",
            opacity: 0.45,
            position: "relative",
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              width: 3, height: 7, borderRadius: 2,
              background: "hsl(var(--foreground))",
              marginTop: 5,
              animation: "scrollDot 1.6s ease-in-out infinite",
            }} />
          </div>
        </div>
      </section>

      {/* ── PROJETOS ── */}
      <section id="projetos" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic" }}>
            [Projetos]
          </h2>
          <div style={{ width: 48, height: 3, background: "#A8CC2C", marginTop: 8, borderRadius: 2 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <ProjectCard project={projects[0]} featured />
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {projects.slice(1).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <button
            data-testid="button-ver-todos"
            style={{
              background: "#A8CC2C", color: "#2C2A1E",
              border: "none", padding: "14px 36px", borderRadius: 999,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15,
              cursor: "none", transform: "rotate(-2deg)",
              boxShadow: "0 4px 20px rgba(168,204,44,0.3)",
              animation: "bounce-btn 2s ease-in-out infinite",
            }}
          >
            Ver todos →
          </button>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" style={{ padding: "100px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic" }}>[Sobre mim]</h2>
            <div style={{ width: 48, height: 3, background: "#A8CC2C", marginTop: 8, borderRadius: 2 }} />
          </div>
          <div style={{ position: "relative" }}>
            <PostcardSection />
            {/* ── Doodle annotation ── */}
            <div style={{
              position: "absolute",
              left: "calc(100% + 22px)",
              top: "28%",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 19,
                color: "#D4713A",
                transform: "rotate(-10deg)",
                display: "block",
                whiteSpace: "nowrap",
                lineHeight: 1.3,
              }}>
                click to flip
              </span>
              <svg width="64" height="58" viewBox="0 0 64 58" fill="none" style={{ marginTop: 2, transform: "rotate(-4deg)" }}>
                <path d="M52 6 C58 20, 52 40, 12 52" stroke="#D4713A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                <path d="M12 52 L6 42 M12 52 L22 46" stroke="#D4713A" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESSO ── */}
      <section id="processo" style={{ padding: "100px 40px", background: "hsl(var(--muted)/0.3)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic" }}>[Processo]</h2>
            <div style={{ width: 48, height: 3, background: "#A8CC2C", marginTop: 8, borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { num: "01", title: "Descoberta", desc: "Entender o problema, os usuários e o contexto antes de qualquer solução." },
              { num: "02", title: "Definição", desc: "Sintetizar insights e alinhar os objetivos com clareza e intenção." },
              { num: "03", title: "Ideação", desc: "Explorar soluções diversas com criatividade, método e colaboração." },
              { num: "04", title: "Prototipação", desc: "Dar forma às melhores ideias com rapidez e fidelidade ao contexto." },
              { num: "05", title: "Entrega", desc: "Testar, refinar e lançar com impacto real para quem usa." },
            ].map((s, i, arr) => (
              <ProcessStep key={s.num} num={s.num} title={s.title} desc={s.desc} delay={i * 100} total={arr.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic" }}>[Skills]</h2>
            <div style={{ width: 48, height: 3, background: "#A8CC2C", marginTop: 8, borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {skills.map((s, i) => (
              <span
                key={s}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  padding: "10px 22px",
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

      {/* ── FOOTER ── */}
      <footer id="contato" style={{ background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border))", padding: "80px 40px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", marginBottom: 20, color: "#3D4A1E" }}>
            Chegou até aqui e quer deixar um oi?
          </div>
          <a
            href="mailto:biadesign.contate@gmail.com"
            data-testid="link-email"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
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
              { label: "LinkedIn", href: "https://linkedin.com/in/biancamesquita", testId: "link-footer-linkedin" },
              { label: "Behance", href: "https://behance.net/biancamesquita", testId: "link-footer-behance" },
              { label: "Currículo ↓", href: "#", testId: "link-footer-cv" },
              { label: "Email", href: "mailto:biadesign.contate@gmail.com", testId: "link-footer-email" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-testid={l.testId}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 600,
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

        {/* Banner with beach + marquee */}
        <div style={{ marginTop: 80, position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40, paddingLeft: 40 }}>
            <div style={{ animation: "float 3s ease-in-out infinite", flexShrink: 0 }}>
              <BeachScene />
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Marquee text="Bianca Mesquita" />
            </div>
          </div>
          <div style={{ height: 24, background: "#3D4A1E", marginTop: -2 }} />
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(12px); opacity: 0; }
          61% { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          nav { padding: 12px 20px !important; }
          section { padding: 60px 20px !important; }
          footer { padding: 60px 20px 0 !important; }
          h1 span:nth-child(2) { font-size: 4.5rem !important; }
          .hero-illustrations { display: none; }
        }
      `}</style>
    </div>
  );
}
