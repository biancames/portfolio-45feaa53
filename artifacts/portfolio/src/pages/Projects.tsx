import { useState } from "react";
import { SiBehance, SiDribbble } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { ALL_PROJECTS, type Category } from "@/data/projects";

type FilterOption = "Todos" | Category;
const FILTERS: FilterOption[] = ["Todos", "Product Design", "UX/UI Design", "Graphic Design"];

function ProjectCard({ project }: { project: (typeof ALL_PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);

  if (project.placeholder) {
    return (
      <div style={{
        borderRadius: 16, overflow: "hidden",
        background: "hsl(var(--card))",
        border: "2px dashed hsl(var(--border))",
        flex: "1 1 300px", minWidth: 280, maxWidth: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 12,
        minHeight: 240,
      }}>
        <div style={{ fontSize: 32, opacity: 0.3 }}>✦</div>
        <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, opacity: 0.4 }}>Em breve</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, opacity: 0.3 }}>Próximo projeto chegando...</div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: "hidden",
        background: "hsl(var(--card))",
        boxShadow: hovered ? "0 8px 32px rgba(61,74,30,0.18)" : "0 4px 24px rgba(61,74,30,0.10)",
        border: "1px solid hsl(var(--border))",
        flex: "1 1 300px", minWidth: 280, maxWidth: "100%",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, rgba(61,74,30,0.35))",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
          {project.categories.join(" · ")}
        </div>
        <div className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          {project.title}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.6, opacity: 0.7, margin: "0 0 16px" }}>
          {project.desc}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, padding: "4px 12px",
              borderRadius: 999,
              border: "1.5px dashed hsl(var(--border))",
              color: "hsl(var(--muted-foreground))",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<FilterOption>("Todos");

  const filtered = active === "Todos"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.categories.includes(active as Category));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "hsl(var(--background))", color: "hsl(var(--foreground))", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
        background: "hsla(var(--background)/0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid hsl(var(--border))",
      }}>
        <a href="/" style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: "#A8CC2C", fontWeight: 600, textDecoration: "none" }}>
          bia.design
        </a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[
            { label: "Início", href: "/" },
            { label: "Projetos", href: "/projetos" },
            { label: "Sobre", href: "/#sobre" },
            { label: "Contato", href: "/#contato" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: label === "Projetos" ? "#A8CC2C" : "hsl(var(--foreground))",
                textDecoration: "none",
                opacity: label === "Projetos" ? 1 : 0.8,
                fontWeight: label === "Projetos" ? 600 : 400,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = label === "Projetos" ? "1" : "0.8")}
            >
              {label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginLeft: 8 }}>
            <a href="https://linkedin.com/in/biancamesquita" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}><Linkedin size={16} /></a>
            <a href="https://behance.net/biancamesquita" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}><SiBehance size={16} /></a>
            <a href="#" style={{ color: "hsl(var(--foreground))", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}><SiDribbble size={16} /></a>
          </div>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main style={{ padding: "140px 40px 120px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <a
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              color: "hsl(var(--foreground))", opacity: 0.55,
              textDecoration: "none", marginBottom: 24,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Início
          </a>
          <h1 className="section-heading" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic", margin: 0 }}>
            [Projetos]
          </h1>
          <div style={{ width: 48, height: 3, background: "#A8CC2C", marginTop: 8, borderRadius: 2 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.65, marginTop: 16, opacity: 0.65, maxWidth: 560 }}>
            Uma seleção de trabalhos em product design, UX/UI e design gráfico.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
          {FILTERS.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  padding: "10px 24px",
                  borderRadius: 999,
                  border: isActive ? "none" : "1.5px dashed #5A8A20",
                  background: isActive ? "#A8CC2C" : "transparent",
                  color: isActive ? "#2C2A1E" : "#5A8A20",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
              >
                {f}
              </button>
            );
          })}
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            opacity: 0.4,
            alignSelf: "center",
            marginLeft: 4,
          }}>
            {filtered.length} projeto{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {filtered.map((p, i) => (
            <ProjectCard key={`${p.title}-${i}`} project={p} />
          ))}
        </div>

      </main>

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 12px 20px !important; }
          main { padding: 100px 20px 80px !important; }
        }
      `}</style>
    </div>
  );
}
