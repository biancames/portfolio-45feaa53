import React, { useEffect } from "react";

export default function Timeline() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const tools = [
    "Notion",
    "Framer",
    "Maze",
    "Figma",
    "Photoshop (Ps)",
    "Illustrator (Ai)",
    "Hotjar",
    "FigJam",
  ];

  const milestones = [
    {
      year: "Origem",
      title: "Nascida no litoral de SP",
      desc: "Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.",
    },
    {
      year: "Descoberta",
      title: "Descobriu design",
      desc: "O começo da jornada no mundo criativo.",
    },
    {
      year: "Início",
      title: "Primeiros projetos — logística & transporte",
      desc: "Lidando com sistemas digitais complexos desde cedo.",
    },
    {
      year: "Evolução",
      title: "Setor público — SisPat, SGTran",
      desc: "Experiência em plataformas de grande escala.",
    },
    {
      year: "Hoje",
      title: "UX de ponta a ponta",
      desc: "Atuo de ponta a ponta — da pesquisa à entrega. Acredito que bons produtos nascem do entendimento real de quem usa.",
    },
  ];

  return (
    <div
      className="min-h-screen py-16 px-4 md:px-8 w-full flex flex-col items-center"
      style={{
        backgroundColor: "#F5F0E8",
        color: "#2C2A1E",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header Strip */}
      <div className="flex flex-col items-center mb-16 text-center max-w-lg">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 p-1" style={{ borderColor: "#3D4A1E" }}>
          <img
            src="/__mockup/images/bianca-photo.png"
            alt="Bianca Mesquita"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: "'Libre Baskerville', serif", color: "#2C2A1E" }}
        >
          Bianca Mesquita
        </h1>
        <p className="uppercase tracking-widest text-xs font-semibold mb-4" style={{ color: "#D4713A" }}>
          Product Designer ✦ UX/UI Designer
        </p>
        <p className="text-sm italic" style={{ color: "#4A5E28" }}>
          25 anos, caiçara do litoral de SP
        </p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-2xl mx-auto mb-20">
        {/* Spine */}
        <div
          className="absolute top-0 bottom-0 left-[28px] sm:left-1/2 w-0.5 border-l-2 border-dashed"
          style={{ borderColor: "#3D4A1E", transform: "translateX(-50%)" }}
        ></div>

        <div className="flex flex-col space-y-12">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center w-full ${
                idx % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Marker */}
              <div
                className="absolute left-[28px] sm:left-1/2 w-4 h-4 rounded-full border-[3px] bg-[#F5F0E8] z-10"
                style={{ borderColor: "#A8CC2C", transform: "translate(-50%, 0)", marginTop: "4px" }}
              ></div>

              {/* Content */}
              <div className="ml-16 sm:ml-0 w-full sm:w-1/2 px-0 sm:px-8">
                <div className={`flex flex-col ${idx % 2 === 0 ? "sm:items-start" : "sm:items-end"} text-left ${idx % 2 === 0 ? "sm:text-left" : "sm:text-right"}`}>
                  <span
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "#D4713A" }}
                  >
                    {m.year}
                  </span>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-80 max-w-[280px]">
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote & Signature */}
      <div className="max-w-xl mx-auto text-center mb-16 relative px-6 py-8">
        <div className="absolute inset-0 opacity-10 bg-[url('/__mockup/images/bianca-postcard.png')] bg-cover bg-center rounded-2xl" />
        <div className="relative z-10">
          <p
            className="text-2xl md:text-3xl italic mb-6 leading-relaxed"
            style={{ fontFamily: "'Libre Baskerville', serif", color: "#3D4A1E" }}
          >
            "Acredito que bons produtos nascem do entendimento real de quem usa."
          </p>
          <p
            className="text-4xl"
            style={{ fontFamily: "'Caveat', cursive", color: "#D4713A" }}
          >
            Bianca Mesquita
          </p>
        </div>
      </div>

      {/* Tools */}
      <div className="w-full max-w-3xl flex flex-wrap justify-center gap-3 mb-16 px-4">
        {tools.map((t) => (
          <span
            key={t}
            className="px-4 py-2 text-sm font-medium rounded-full border shadow-sm"
            style={{
              backgroundColor: "#FAF7F0",
              borderColor: "#C8E870",
              color: "#3D4A1E",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="w-full mt-auto">
        <button
          className="w-full py-6 text-xl font-bold uppercase tracking-widest transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#A8CC2C",
            color: "#2C2A1E",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Mais sobre mim
        </button>
      </div>
    </div>
  );
}
