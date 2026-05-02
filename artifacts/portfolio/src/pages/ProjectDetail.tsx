import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { SiBehance, SiDribbble } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import type { Project, CaseStudy } from "@/data/defaults";

async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`/api/content/projects/slug/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function MetadataRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid hsl(var(--border))" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A8CC2C", marginBottom: 4 }}>
        [{label}]
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "hsl(var(--foreground))", lineHeight: 1.5 }}>
        {value}
      </div>
    </div>
  );
}

function ProcessBlock({ step, index }: { step: NonNullable<CaseStudy["process"]>[0]; index: number }) {
  const isRight = step.imagePosition !== "left";
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: step.imageUrl ? "1fr 1fr" : "1fr",
      gap: 48,
      alignItems: "start",
      padding: "48px 0",
      borderBottom: "1px solid hsl(var(--border))",
    }}>
      <div style={{ order: isRight ? 0 : 1 }}>
        <div style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "clamp(2rem,3vw,2.8rem)",
          fontStyle: "italic",
          fontWeight: 700,
          color: "#A8CC2C",
          opacity: 0.25,
          lineHeight: 1,
          marginBottom: 8,
        }}>
          [{step.number}]
        </div>
        <h3 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "clamp(1.1rem,2vw,1.4rem)",
          fontWeight: 700,
          margin: "0 0 16px",
          color: "hsl(var(--foreground))",
        }}>
          {step.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          lineHeight: 1.75,
          color: "hsl(var(--foreground))",
          opacity: 0.75,
          margin: 0,
          whiteSpace: "pre-line",
        }}>
          {step.content}
        </p>
      </div>
      {step.imageUrl && (
        <div style={{ order: isRight ? 1 : 0, borderRadius: 16, overflow: "hidden", background: "hsl(var(--muted))" }}>
          <img
            src={step.imageUrl}
            alt={step.title}
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}

function OutcomeCard({ outcome }: { outcome: NonNullable<CaseStudy["outcomes"]>[0] }) {
  return (
    <div style={{
      flex: "1 1 200px",
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: 20,
      padding: "32px 28px",
      textAlign: "center",
    }}>
      {outcome.icon && (
        <div style={{ fontSize: 32, marginBottom: 12 }}>{outcome.icon}</div>
      )}
      <div style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(1.5rem,3vw,2.2rem)",
        fontWeight: 700,
        fontStyle: "italic",
        color: "#A8CC2C",
        lineHeight: 1.1,
        marginBottom: 8,
      }}>
        {outcome.value}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "hsl(var(--foreground))",
        opacity: 0.65,
        lineHeight: 1.5,
      }}>
        {outcome.label}
      </div>
    </div>
  );
}

function LearningCard({ learning, index }: { learning: NonNullable<CaseStudy["learnings"]>[0]; index: number }) {
  const colors = ["#3D4A1E", "#A35C1C", "#4A5E28", "#6B4A1E"];
  const bg = learning.color ?? colors[index % colors.length];
  return (
    <div style={{
      background: bg,
      borderRadius: 16,
      padding: "28px 32px",
    }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 16,
        lineHeight: 1.7,
        color: "#F5F0E8",
        margin: 0,
      }}>
        {learning.text}
      </p>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { projects } = useContent();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProjectBySlug(slug).then((p) => {
      if (p) {
        setProject(p);
      } else {
        const local = projects.find(pr => pr.slug === slug);
        if (local) setProject(local);
        else setProject(null);
      }
      setLoading(false);
    });
  }, [slug, projects]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--background))" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#A8CC2C", letterSpacing: "0.1em" }}>Carregando...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, background: "hsl(var(--background))" }}>
        <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 48, fontStyle: "italic", color: "#A8CC2C" }}>404</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, color: "hsl(var(--foreground))" }}>Projeto não encontrado.</div>
        <a href="/projetos" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#A8CC2C", textDecoration: "none" }}>← Ver todos os projetos</a>
      </div>
    );
  }

  const cs: CaseStudy = (project.caseStudy as CaseStudy) ?? {};
  const meta = cs.metadata ?? {};

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>

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
        <a
          href="/projetos"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: "hsl(var(--foreground))", opacity: 0.65,
            textDecoration: "none", transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar
        </a>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="https://linkedin.com/in/biancames" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.55, transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}><Linkedin size={16} /></a>
          <a href="https://behance.net/biadesigns" target="_blank" rel="noreferrer" style={{ color: "hsl(var(--foreground))", opacity: 0.55, transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}><SiBehance size={16} /></a>
          <a href="#" style={{ color: "hsl(var(--foreground))", opacity: 0.55, transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}><SiDribbble size={16} /></a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "min(70vh, 600px)", overflow: "hidden", background: "#2C2A1E" }}>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.65 }}
          />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(44,42,30,0.3) 0%, rgba(44,42,30,0.85) 100%)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "64px 80px 56px",
        }}>
          {cs.caseNumber && (
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#A8CC2C", marginBottom: 16,
            }}>
              [{cs.caseNumber}]
            </div>
          )}
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.8rem,4vw,3.2rem)",
            fontWeight: 700,
            color: "#F5F0E8",
            margin: "0 0 12px",
            maxWidth: 720,
            lineHeight: 1.15,
          }}>
            {project.title}
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "rgba(245,240,232,0.75)",
            margin: 0,
            maxWidth: 560,
          }}>
            {project.description}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, padding: "4px 12px",
                borderRadius: 999,
                border: "1px solid rgba(168,204,44,0.5)",
                color: "#A8CC2C",
                letterSpacing: "0.06em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>

        {/* Two-col: headline + meta sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 64, alignItems: "start" }}>

          {/* Left: headline + overview + problem */}
          <div>
            {cs.headline && (
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.6rem,3vw,2.4rem)",
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                lineHeight: 1.25,
                margin: "0 0 40px",
              }}>
                {cs.headline}
              </h2>
            )}
            {cs.overview && (
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A8CC2C", marginBottom: 12 }}>
                  [Project Overview]
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "hsl(var(--foreground))", opacity: 0.8, margin: 0, whiteSpace: "pre-line" }}>
                  {cs.overview}
                </p>
              </div>
            )}
            {cs.problemStatement && (
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A8CC2C", marginBottom: 12 }}>
                  [Problem Statement]
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "hsl(var(--foreground))", opacity: 0.8, margin: 0, whiteSpace: "pre-line" }}>
                  {cs.problemStatement}
                </p>
              </div>
            )}
          </div>

          {/* Right: metadata sidebar */}
          {(meta.setor || meta.papel || meta.plataforma || meta.tipo || meta.timeline) && (
            <div style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 20,
              padding: "28px 24px",
              position: "sticky",
              top: 100,
            }}>
              <MetadataRow label="Setor" value={meta.setor} />
              <MetadataRow label="Papel" value={meta.papel} />
              <MetadataRow label="Plataforma" value={meta.plataforma} />
              <MetadataRow label="Tipo" value={meta.tipo} />
              <MetadataRow label="Timeline" value={meta.timeline} />
              {meta.prototypeUrl && (
                <a
                  href={meta.prototypeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    width: "100%", padding: "12px 20px",
                    background: "#A8CC2C", borderRadius: 999,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                    color: "#2C2A1E", textDecoration: "none", marginTop: 4,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#C8E870")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#A8CC2C")}
                >
                  Ver protótipo ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── PROCESS ── */}
        {cs.process && cs.process.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", margin: 0 }}>
                [Process]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>
            {cs.process.map((step, i) => (
              <ProcessBlock key={i} step={step} index={i} />
            ))}
          </div>
        )}

        {/* ── OUTCOMES ── */}
        {cs.outcomes && cs.outcomes.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", margin: 0 }}>
                [Outcomes]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {cs.outcomes.map((o, i) => (
                <OutcomeCard key={i} outcome={o} />
              ))}
            </div>
          </div>
        )}

        {/* ── KEY LEARNINGS ── */}
        {cs.learnings && cs.learnings.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontStyle: "italic", margin: 0 }}>
                [Key Learnings]
              </h2>
              <div style={{ width: 48, height: 4, background: "#A8CC2C", marginTop: 8, borderRadius: 4 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cs.learnings.map((l, i) => (
                <LearningCard key={i} learning={l} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── NEXT PROJECT ── */}
        {cs.nextProjectSlug && (
          <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid hsl(var(--border))" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "hsl(var(--foreground))", opacity: 0.45, marginBottom: 16 }}>
              Próximo projeto
            </div>
            <a
              href={`/${cs.nextProjectSlug}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.2rem,3vw,1.8rem)",
                fontWeight: 700, fontStyle: "italic",
                color: "#A8CC2C", textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {cs.nextProjectLabel ?? cs.nextProjectSlug}
              <span style={{ fontSize: "0.75em" }}>→</span>
            </a>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 12px 20px !important; }
        }
      `}</style>
    </div>
  );
}
