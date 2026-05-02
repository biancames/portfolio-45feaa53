import React, { useEffect } from "react";

export function Grid() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        backgroundColor: "#F5F0E8",
        fontFamily: "'DM Sans', sans-serif",
        color: "#2C2A1E",
      }}
    >
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Postcard Back */}
        <div className="absolute -bottom-8 -right-8 w-full max-w-2xl transform rotate-3 opacity-80 z-0">
          <img
            src="/__mockup/images/bianca-postcard.png"
            alt="Postcard back"
            className="w-full h-auto object-cover rounded-xl shadow-lg border border-dashed border-[#3D4A1E]/30"
          />
        </div>

        {/* Main Card */}
        <div
          className="relative z-10 w-full max-w-4xl rounded-2xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6"
          style={{
            backgroundColor: "#FAF7F0",
            border: "1.5px dashed rgba(61,74,30,0.2)",
          }}
        >
          {/* Column 1: Photo & Tools (~30%) */}
          <div className="col-span-1 md:col-span-4 flex flex-col h-full gap-4">
            <div className="flex-1 w-full relative rounded-xl overflow-hidden shadow-inner bg-[#F5F0E8] border border-[#3D4A1E]/10" style={{ minHeight: '300px' }}>
              <img
                src="/__mockup/images/bianca-photo.png"
                alt="Bianca Mesquita"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-3 pt-2 border-t border-dashed border-[#3D4A1E]/20">
              <span className="text-[#3D4A1E] font-medium text-sm">Notion</span>
              <span className="text-[#3D4A1E] font-medium text-sm">Framer</span>
              <span className="text-[#3D4A1E] font-medium text-sm">Maze ◎</span>
              <span className="text-[#3D4A1E] font-medium text-sm">Figma</span>
              <span className="text-[#3D4A1E] font-medium text-sm">Ps</span>
            </div>
          </div>

          {/* Column 2: Name & Skills (~35%) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6 py-2">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-2"
                style={{ fontFamily: "'Libre Baskerville', serif", color: "#3D4A1E" }}
              >
                Bianca <br />
                Mesquita
              </h1>
              <p className="text-sm font-semibold tracking-wider uppercase text-[#D4713A]">
                Product Designer <span className="text-[#A8CC2C]">✦</span> UX/UI Designer
              </p>
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold uppercase text-[#3D4A1E]/60 mb-3 tracking-widest">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {["UX Research", "Product Design", "Visual Design", "Prototipação", "Design Systems", "Logistics UX", "Public Sector"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[#3D4A1E]/5 text-[#3D4A1E] border border-[#3D4A1E]/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full h-16 rounded-lg bg-[#3D4A1E] flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #A8CC2C 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
               <span className="relative z-10 text-[#A8CC2C] font-serif italic text-xl">Criatividade & Dados</span>
            </div>
          </div>

          {/* Column 3: Bio, Signature, CTA (~35%) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6 py-2">
            <div className="flex-1 space-y-4 text-sm leading-relaxed text-[#2C2A1E]/80">
              <p>
                Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
              </p>
              <p>
                Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega. Acredito que bons produtos nascem do entendimento real de quem usa.
              </p>
            </div>

            <div className="flex items-center justify-start py-4">
              <span
                className="text-4xl text-[#3D4A1E]"
                style={{ fontFamily: "'Caveat', cursive", transform: 'rotate(-5deg)' }}
              >
                Bianca Mesquita
              </span>
            </div>

            <div className="mt-auto">
              <button
                className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl overflow-hidden"
                style={{ backgroundColor: "#D4713A" }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10">Mais sobre mim</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;
