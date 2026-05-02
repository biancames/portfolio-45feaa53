import React, { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const theme = {
    parchment: '#F5F0E8',
    darkText: '#2C2A1E',
    olive: '#3D4A1E',
    darkOlive: '#4A5E28',
    lime: '#A8CC2C',
    lightLime: '#C8E870',
    orange: '#D4713A',
    cardBg: '#FAF7F0',
  };

  const skills = [
    { name: 'Figma', value: 95 },
    { name: 'FigJam', value: 90 },
    { name: 'Notion', value: 85 },
    { name: 'Framer', value: 80 },
    { name: 'Maze', value: 75 },
    { name: 'Photoshop', value: 70 },
    { name: 'Hotjar', value: 65 },
    { name: 'Illustrator', value: 60 },
  ];

  return (
    <div 
      className="min-h-screen p-4 md:p-8 flex items-center justify-center"
      style={{ 
        backgroundColor: theme.parchment, 
        color: theme.darkText,
        fontFamily: '"DM Sans", sans-serif'
      }}
    >
      <div 
        className="w-full max-w-4xl rounded-2xl p-6 md:p-10 shadow-xl"
        style={{ 
          backgroundColor: theme.cardBg,
          border: `1px dashed ${theme.olive}`
        }}
      >
        {/* Header Row */}
        <header className="flex items-center gap-6 mb-12 border-b pb-8" style={{ borderColor: theme.olive }}>
          <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2" style={{ borderColor: theme.lime }}>
            <img 
              src="/__mockup/images/bianca-photo.png" 
              alt="Bianca Mesquita"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: '"Libre Baskerville", serif', color: theme.darkOlive }}
            >
              Bianca Mesquita
            </h1>
            <p className="text-lg md:text-xl font-medium" style={{ color: theme.olive }}>
              Product Designer ✦ UX/UI Designer
            </p>
            <p className="text-sm mt-1 opacity-80 font-medium uppercase tracking-wider">
              25 anos, caiçara do litoral de SP
            </p>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: '25', label: 'anos de idade' },
            { value: '5+', label: 'anos em UX/UI' },
            { value: '3', label: 'setores de atuação' },
            { value: '10+', label: 'projetos entregues' }
          ].map((metric, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center p-6 text-center rounded-xl"
              style={{ 
                border: `1px dashed ${theme.olive}`,
                backgroundColor: 'rgba(61, 74, 30, 0.03)'
              }}
            >
              <div 
                className="text-5xl md:text-6xl font-bold mb-2"
                style={{ fontFamily: '"Libre Baskerville", serif', color: theme.orange }}
              >
                {metric.value}
              </div>
              <div className="text-sm font-semibold uppercase tracking-widest text-balance" style={{ color: theme.darkOlive }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pull Quote */}
        <div className="mb-12 relative">
          <span 
            className="absolute -top-10 -left-6 text-8xl opacity-10"
            style={{ fontFamily: '"Libre Baskerville", serif', color: theme.olive }}
          >
            "
          </span>
          <p 
            className="text-2xl md:text-3xl text-center leading-relaxed italic z-10 relative px-4 md:px-12"
            style={{ fontFamily: '"Libre Baskerville", serif', color: theme.darkText }}
          >
            Acredito que bons produtos nascem do entendimento real de quem usa.
          </p>
        </div>

        {/* Skills & Bio Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12 border-t pt-12" style={{ borderColor: theme.olive }}>
          
          {/* Bio Side */}
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
            </p>
            <p>
              Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega.
            </p>
            
            <div className="pt-8">
              <button 
                className="px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-3"
                style={{ 
                  backgroundColor: theme.lime, 
                  color: theme.darkText,
                  boxShadow: `4px 4px 0px ${theme.darkOlive}`
                }}
              >
                Mais sobre mim
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Skills Side */}
          <div className="space-y-4 bg-white/40 p-6 rounded-xl" style={{ border: `1px solid rgba(61, 74, 30, 0.1)` }}>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: theme.olive }}>Toolkit</h3>
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 text-sm font-bold" style={{ color: theme.darkOlive }}>{skill.name}</div>
                <div className="flex-1 h-3 rounded-full overflow-hidden bg-black/5" style={{ backgroundColor: theme.parchment }}>
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${skill.value}%`, 
                      backgroundColor: theme.olive,
                      opacity: 0.5 + (skill.value / 200)
                    }}
                  />
                </div>
                <div className="w-10 text-right text-xs font-semibold opacity-60">{skill.value}%</div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Signature */}
        <div className="text-right mt-8 pt-8 border-t" style={{ borderColor: 'rgba(61, 74, 30, 0.2)' }}>
          <div 
            className="text-4xl"
            style={{ fontFamily: '"Caveat", cursive', color: theme.orange }}
          >
            Bianca Mesquita
          </div>
        </div>

      </div>
    </div>
  );
}
