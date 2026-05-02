import { useState } from "react";
import { SiFigma, SiNotion, SiFramer, SiMiro } from "react-icons/si";
import postcardImg from "@assets/postc_1777742914935.png";
import bioPhoto from "@assets/Perfil_1777746393399.jpeg";
import affinityIcon from "@assets/affinity_1777749697475.png";
import lovableIcon from "@assets/lovable_1777749697475.png";
import claudeIcon from "@assets/claude_1777749697475.png";

export function PostcardSection({ hideCta }: { hideCta?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const tools = [
    { name: "Miro",       icon: <SiMiro size={16} /> },
    { name: "Figma",      icon: <SiFigma size={16} /> },
    { name: "Photoshop",  icon: <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, letterSpacing: "-0.5px" }}>Ps</span> },
    { name: "Notion",     icon: <SiNotion size={16} /> },
    { name: "Framer",     icon: <SiFramer size={16} /> },
    { name: "Affinity",   icon: <img src={affinityIcon} alt="Affinity" style={{ width: 16, height: 16, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(22%) sepia(19%) saturate(700%) hue-rotate(55deg)" }} /> },
    { name: "Lovable",    icon: <img src={lovableIcon}  alt="Lovable"  style={{ width: 16, height: 16, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(22%) sepia(19%) saturate(700%) hue-rotate(55deg)" }} /> },
    { name: "Claude",     icon: <img src={claudeIcon}   alt="Claude"   style={{ width: 16, height: 16, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(22%) sepia(19%) saturate(700%) hue-rotate(55deg)" }} /> },
  ];
  const loopTools = [...tools, ...tools];

  return (
    <div style={{ perspective: "1400px", isolation: "isolate", transform: "translateZ(0)" }}>
      <div style={{
        transformStyle: "preserve-3d",
        animation: "hintFlip 1.4s ease-in-out 1.8s 1 both",
        willChange: "transform",
      }}>
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
          boxShadow: "0 12px 48px rgba(61,74,30,0.18)",
        }}>

          {/* Left: photo + scrolling tools strip */}
          <div style={{ flex: "0 0 44%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <img
              src={bioPhoto}
              alt="Bianca Mesquita"
              style={{ flex: 1, minHeight: 0, width: "100%", objectFit: "cover", objectPosition: "center top", display: "block", willChange: "transform", transform: "translateZ(0.01px)" }}
              draggable={false}
            />
            <div style={{
              overflow: "hidden",
              background: "hsl(var(--background))",
              borderTop: "1px solid hsl(var(--border))",
              padding: "8px 0",
              flexShrink: 0,
            }}>
              <div style={{
                display: "flex",
                gap: 8,
                width: "max-content",
                animation: "toolsScroll 22s linear infinite",
              }}>
                {loopTools.map((t, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: "1px solid rgba(61,74,30,0.15)",
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

          {/* Right: name block + bio block + CTA button */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, padding: "20px 20px 16px" }}>

            {/* Name block */}
            <div style={{
              background: "#4A5E28", borderRadius: 16,
              padding: "16px 20px", color: "#F5F0E8",
            }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                Bianca Mesquita
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#C8E870" }}>
                Product Designer ✦ UX/UI Designer
              </div>
            </div>

            {/* Bio block */}
            <div style={{
              flex: 1,
              background: "hsl(var(--card))", borderRadius: 16,
              border: "1px solid hsl(var(--border))", padding: "16px 20px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              overflow: "hidden",
            }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.75, color: "hsl(var(--foreground))", margin: "0 0 8px" }}>
                  Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.75, color: "hsl(var(--foreground))", margin: 0 }}>
                  Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega.
                  Acredito que bons produtos nascem do entendimento real de quem usa.
                </p>
              </div>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 24, color: "#A35C1C", marginTop: 8, textAlign: "right", fontStyle: "italic" }}>
                Bianca Mesquita
              </div>
            </div>

            {/* CTA button */}
            {!hideCta && (
              <div
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                onClick={(e) => { e.stopPropagation(); window.location.href = "/maissobre"; }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px 12px 24px",
                  borderRadius: 999,
                  background: btnHover ? "#3D4A1E" : "#C8E870",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  userSelect: "none",
                }}
              >
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  color: btnHover ? "#C8E870" : "#2C2A1E",
                  transition: "color 0.3s ease",
                }}>
                  Mais sobre mim
                </span>
                <span style={{
                  width: 40, height: 40,
                  borderRadius: "50%",
                  background: btnHover ? "#C8E870" : "#3D4A1E",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "transform 0.35s ease, background 0.3s ease",
                  transform: btnHover ? "rotate(0deg)" : "rotate(-45deg)",
                }}>
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M3.5 9H14.5M14.5 9L9.5 4M14.5 9L9.5 14" stroke={btnHover ? "#3D4A1E" : "#C8E870"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            )}
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
      </div>

      <style>{`
        @keyframes toolsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hintFlip {
          0%   { transform: rotateY(0deg); }
          30%  { transform: rotateY(-18deg); }
          58%  { transform: rotateY(0deg); }
          76%  { transform: rotateY(-8deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
}
