import { useEffect, useRef, useState } from "react";
import { HOME_PROJECTS } from "@/data/projects";
import { SiBehance, SiDribbble, SiFigma, SiFramer, SiHotjar, SiNotion } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { PostcardSection } from "@/components/PostcardSection";
import figmaIllustra from "@assets/figma_1_1777756222620.png";
import cafeIllustra from "@assets/IlustraCafe_1777742604142.png";
import pcIllustra from "@assets/ilustraPC_1777742604142.png";
import beachIllus from "@assets/Prancheta1_1777750622927.png";

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
      el.style.cursor = "grabbing";
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
      el.style.cursor = "grab";
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
      <text x="10" y="25" fontSize="24" fill="#A8CC2C" fontFamily="serif">✦</text>
      <text x="70" y="18" fontSize="16" fill="#3D4A1E" fontFamily="serif">✧</text>
      <text x="90" y="65" fontSize="28" fill="#A8CC2C" fontFamily="serif">✦</text>
      <text x="20" y="90" fontSize="12" fill="#3D4A1E" fontFamily="serif">✦</text>
      <text x="55" y="110" fontSize="20" fill="#A8CC2C" fontFamily="serif">✧</text>
      <text x="100" y="100" fontSize="12" fill="#3D4A1E" fontFamily="serif">✦</text>
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
        borderRadius: 16,
        borderLeft: `4px solid ${hovered ? "#A8CC2C" : "hsl(var(--border))"}`,
        background: hovered ? "rgba(168,204,44,0.07)" : "transparent",
        cursor: "default",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, border-color 0.25s, background 0.25s`,
      }}
    >
      {/* Large italic number */}
      <div style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
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
          fontSize: 16,
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
        fontSize: 12,
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
      data-project-card={project.placeholder ? undefined : "true"}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "hsl(var(--card))",
        boxShadow: "0 4px 24px rgba(61,74,30,0.10)",
        cursor: project.placeholder ? "default" : "none",
        userSelect: "none",
        transform: undefined,
        border: project.placeholder ? "2px dashed hsl(var(--border))" : "1px solid hsl(var(--border))",
        flex: 1,
        minWidth: 0,
      }}
    >
      {project.placeholder ? (
        <div style={{ padding: 40, textAlign: "center", minHeight: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ fontSize: 32, opacity: 0.3 }}>✦</div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, opacity: 0.4 }}>Em breve</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, opacity: 0.3 }}>Próximo projeto chegando...</div>
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
          <div style={{ padding: featured ? "24px 28px" : "16px 20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
              {project.tags[0]}
            </div>
            <div className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: featured ? 28 : 20, fontWeight: 700, marginBottom: 8 }}>
              {project.title}
            </div>
            {featured && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, opacity: 0.7, marginBottom: 12, lineHeight: 1.5 }}>{project.desc}</div>}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {project.tags.map((t) => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  padding: "4px 12px",
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

/* ─── Ver Todos Button ─── */
function VerTodosButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/projetos"
      data-testid="button-ver-todos"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginTop: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 16px 16px 28px",
        borderRadius: 999,
        background: hovered ? "#3D4A1E" : "#C8E870",
        cursor: "pointer",
        transition: "background 0.3s ease",
        userSelect: "none",
        textDecoration: "none",
      }}
    >
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: 16,
        color: hovered ? "#C8E870" : "#2C2A1E",
        transition: "color 0.3s ease",
      }}>
        Ver todos
      </span>
      <span style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: hovered ? "#C8E870" : "#3D4A1E",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "transform 0.35s ease, background 0.3s ease",
        transform: hovered ? "rotate(0deg)" : "rotate(-45deg)",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3.5 9H14.5M14.5 9L9.5 4M14.5 9L9.5 14" stroke={hovered ? "#3D4A1E" : "#C8E870"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </a>
  );
}

/* ─── Footer Name (appear on scroll) ─── */
function FooterName() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .project-card:hover .card-overlay { opacity: 1 !important; }
        .footer-name { color: #3D4A1E; }
        .dark .footer-name { color: #A8CC2C; }
      `}</style>
      {/* Line 1: Bia (normal) + nca (italic) */}
      <span className="footer-name" style={lineStyle("0s")}>
        <span style={{ fontStyle: "normal" }}>Bia</span><span style={{ fontStyle: "italic" }}>nca</span>
      </span>
      {/* Line 2: Mes (normal) + quita (italic) */}
      <span className="footer-name" style={lineStyle("0.25s")}>
        <span style={{ fontStyle: "normal" }}>Mes</span><span style={{ fontStyle: "italic" }}>quita</span>
      </span>
    </div>
  );
}

/* ─── Main Home Page ─── */
const ROLES = ["product_designer", "ux/ui_designer", "graphic_designer"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("início");
  const [typedText, setTypedText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["início", "projetos", "sobre", "processo", "contato"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.25 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let delay: number;
    if (!isDeleting && typedText === current) {
      delay = 1800;
      const t = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(t);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
      return;
    } else if (isDeleting) {
      delay = 60;
      const t = setTimeout(() => setTypedText(s => s.slice(0, -1)), delay);
      return () => clearTimeout(t);
    } else {
      delay = 110;
      const t = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), delay);
      return () => clearTimeout(t);
    }
  }, [typedText, isDeleting, roleIdx]);

  const projects = HOME_PROJECTS;

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
        <a href="#início" style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 20, color: "#A8CC2C", fontWeight: 700, textDecoration: "none", letterSpacing: "-0.02em" }}>bia.design</a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[
            { label: "Início",   id: "início" },
            { label: "Projetos", id: "projetos" },
            { label: "Sobre",    id: "sobre" },
            { label: "Contato",  id: "contato" },
          ].map(({ label, id }) => {
            const isActive = activeSection === id || (id === "projetos" && ["processo", "skills"].includes(activeSection));
            return (
              <a
                key={label}
                href={`#${id}`}
                data-testid={`link-nav-${label.toLowerCase()}`}
                className="nav-link"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  color: isActive ? "#A8CC2C" : "hsl(var(--foreground))",
                  textDecoration: "none",
                  cursor: "pointer",
                  opacity: isActive ? 1 : 0.75,
                  transition: "color 0.3s, opacity 0.3s",
                  position: "relative",
                  paddingBottom: 2,
                }}
                data-active={isActive ? "true" : "false"}
              >
                {label}
              </a>
            );
          })}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginLeft: 8 }}>
            <a data-testid="link-linkedin" href="https://linkedin.com/in/biancames" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e)=>(e.currentTarget.style.opacity="1")} onMouseLeave={(e)=>(e.currentTarget.style.opacity="0.6")}><Linkedin size={16}/></a>
            <a data-testid="link-behance" href="https://behance.net/biadesigns" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e)=>(e.currentTarget.style.opacity="1")} onMouseLeave={(e)=>(e.currentTarget.style.opacity="0.6")}><SiBehance size={16}/></a>
            <a data-testid="link-dribbble" href="#" style={{ color: "hsl(var(--foreground))", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e)=>(e.currentTarget.style.opacity="1")} onMouseLeave={(e)=>(e.currentTarget.style.opacity="0.6")}><SiDribbble size={16}/></a>
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
            padding: "8px 16px", borderRadius: 999,
            border: "1.5px dashed #A8CC2C",
            marginBottom: 32,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8A8878",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#A8CC2C", display: "inline-block", animation: "pulse 2s infinite" }} />
            Disponível para trabalho
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", lineHeight: 1.1, margin: 0 }}>
            <span style={{ display: "block", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontStyle: "italic", fontWeight: 400, color: "hsl(var(--foreground))", marginBottom: 4 }}>
              Oi, eu sou a <span style={{ fontWeight: 700 }}>Bia,</span>
            </span>
            <span style={{ display: "block", fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)", fontStyle: "normal", fontWeight: 700, color: "#A8CC2C", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.03em", lineHeight: 1.05, minHeight: "1.1em", whiteSpace: "nowrap" }}>
              {typedText}<span style={{ opacity: 1, animation: "cursorBlink 0.75s step-end infinite", color: "#A8CC2C" }}>|</span>
            </span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.65, marginTop: 32, opacity: 0.75, maxWidth: 440 }}>
            que transforma necessidades dos usuários em experiências digitais claras e funcionais.
          </p>
          <div style={{ marginTop: 48, display: "flex", gap: 16 }}>
            <a
              href="#projetos"
              data-testid="link-ver-projetos"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#A8CC2C", color: "#2C2A1E",
                padding: "12px 28px", borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 16,
                textDecoration: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(168,204,44,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
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
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 16,
                textDecoration: "none", cursor: "pointer",
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
          {/* Draggable illustrations — all 88px tall, clustered */}
          <DraggableIllustration style={{ top: "22%", right: "32%", pointerEvents: "all" }}>
            <img src={cafeIllustra} alt="Cafeteira" style={{ display: "block", height: 108, width: "auto", transform: "rotate(-8deg)" }} draggable={false} />
          </DraggableIllustration>
          <DraggableIllustration style={{ top: "44%", right: "14%", pointerEvents: "all" }}>
            <img src={figmaIllustra} alt="Figma" style={{ display: "block", height: 88, width: "auto", transform: "rotate(6deg)" }} draggable={false} />
          </DraggableIllustration>
          <DraggableIllustration style={{ top: "56%", right: "36%", pointerEvents: "all" }}>
            <img src={pcIllustra} alt="Laptop" style={{ display: "block", height: 88, width: "auto", transform: "rotate(3deg)" }} draggable={false} />
          </DraggableIllustration>
          {/* Non-draggable floating sparkles — kept in lower half */}
          <div style={{ position: "absolute", top: "32%", right: "22%", animation: "floatA 3.2s ease-in-out infinite", pointerEvents: "none" }}>
            <span style={{ fontSize: 24, color: "#A8CC2C", fontFamily: "serif" }}>✦</span>
          </div>
          <div style={{ position: "absolute", top: "40%", right: "48%", animation: "floatB 2.8s ease-in-out infinite", pointerEvents: "none" }}>
            <span style={{ fontSize: 16, color: "#3D4A1E", fontFamily: "serif" }}>✧</span>
          </div>
          <div style={{ position: "absolute", top: "50%", right: "8%", animation: "floatB 2.5s ease-in-out infinite 0.8s", pointerEvents: "none" }}>
            <span style={{ fontSize: 12, color: "#3D4A1E", fontFamily: "serif" }}>✦</span>
          </div>
          <div style={{ position: "absolute", top: "65%", right: "34%", animation: "floatA 3.6s ease-in-out infinite 0.4s", pointerEvents: "none" }}>
            <span style={{ fontSize: 20, color: "#A8CC2C", fontFamily: "serif" }}>✦</span>
          </div>
          <div style={{ position: "absolute", top: "75%", right: "50%", animation: "floatA 3s ease-in-out infinite 1.2s", pointerEvents: "none" }}>
            <span style={{ fontSize: 20, color: "#A8CC2C", fontFamily: "serif" }}>✧</span>
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
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.45 }}>scroll</div>
          {/* Mouse shape */}
          <div style={{
            width: 24, height: 32, borderRadius: 12,
            border: "1.5px solid hsl(var(--foreground))",
            opacity: 0.45,
            position: "relative",
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              width: 4, height: 8, borderRadius: 4,
              background: "hsl(var(--foreground))",
              marginTop: 4,
              animation: "scrollDot 1.6s ease-in-out infinite",
            }} />
          </div>
        </div>
      </section>

      {/* ── PROJETOS ── */}
      <section id="projetos" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h2 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic" }}>
            [Projetos]
          </h2>
          <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <ProjectCard project={projects[0]} featured />
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {projects.slice(1).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
        <VerTodosButton />
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" style={{ padding: "100px 40px", position: "relative", background: "hsl(var(--muted)/0.25)", isolation: "isolate" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <h2 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic" }}>[Sobre mim]</h2>
            <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
          </div>
          <div style={{ position: "relative" }}>
            <PostcardSection />
            {/* ── Doodle annotation ── */}
            <div style={{
              position: "absolute",
              left: "calc(100% + 24px)",
              top: "28%",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 20,
                color: "#A35C1C",
                transform: "rotate(-10deg)",
                display: "block",
                whiteSpace: "nowrap",
                lineHeight: 1.3,
              }}>
                click to flip
              </span>
              <svg width="48" height="64" viewBox="0 0 48 64" fill="none" style={{ marginTop: 4 }}>
                <path d="M38 4 C46 22, 34 48, 8 58" stroke="#A35C1C" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M8 58 L4 46 M8 58 L20 54" stroke="#A35C1C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESSO ── */}
      <section id="processo" style={{ padding: "100px 40px", background: "hsl(var(--muted)/0.3)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <h2 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic" }}>[Processo]</h2>
            <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
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


      {/* ── FOOTER ── */}
      <footer id="contato" style={{ background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border))", padding: "80px 40px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: 20, color: "#3D4A1E" }}>
            Chegou até aqui e quer deixar um oi?
          </div>
          <a
            href="mailto:biadesign.contate@gmail.com"
            data-testid="link-email"
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
              { label: "LinkedIn", href: "https://linkedin.com/in/biancames", testId: "link-footer-linkedin" },
              { label: "Behance", href: "https://behance.net/biadesigns", testId: "link-footer-behance" },
              { label: "Currículo ↓", href: "#", testId: "link-footer-cv" },
              { label: "Email", href: "mailto:biadesign.contate@gmail.com", testId: "link-footer-email" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-testid={l.testId}
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

        {/* Banner with beach illustration + name */}
        <div style={{ marginTop: 80, position: "relative", overflow: "hidden" }}>
          <style>{`
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(12px); opacity: 0; }
          61% { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
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
        .nav-link:hover::before,
        .nav-link[data-active="true"]::before {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        .nav-link:hover::after,
        .nav-link[data-active="true"]::after {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
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
