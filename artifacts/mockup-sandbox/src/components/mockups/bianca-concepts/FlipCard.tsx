import React, { useState, useEffect } from 'react';

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const tools = ['Notion', 'Framer', 'Maze', 'Figma', 'Photoshop (Ps)', 'Illustrator (Ai)', 'Hotjar', 'FigJam'];

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ 
        backgroundColor: '#F5F0E8',
        fontFamily: "'DM Sans', sans-serif" 
      }}
    >
      {/* Card Container */}
      <div 
        className="relative w-[320px] h-[480px] cursor-pointer group perspective-1000"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Inner */}
        <div 
          className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col shadow-xl"
            style={{ 
              backfaceVisibility: 'hidden',
              backgroundColor: '#FAF7F0',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: '0 20px 40px -10px rgba(44, 42, 30, 0.15), inset 0 0 0 1px rgba(0,0,0,0.05)'
            }}
          >
            {/* Top Half: Photo */}
            <div className="h-[55%] w-full relative bg-[#e0dcd3]">
              <img 
                src="/__mockup/images/bianca-photo.png" 
                alt="Bianca Mesquita" 
                className="w-full h-full object-cover grayscale-[20%] contrast-125"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=320&h=320';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] via-transparent to-transparent opacity-50" />
            </div>

            {/* Bottom Half: Info */}
            <div className="h-[45%] p-6 flex flex-col justify-between relative bg-[#FAF7F0]">
              <div className="space-y-1">
                <h2 
                  className="text-2xl text-[#2C2A1E] leading-tight"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  Bianca Mesquita
                </h2>
                <p className="text-[#3D4A1E] text-sm font-medium tracking-wide">
                  Product Designer ✦ UX/UI Designer
                </p>
              </div>

              <div className="w-full text-center mt-auto pb-2">
                <span className="text-[#A8CC2C] text-xs font-semibold uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
                  <span>✦</span> Virar
                </span>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-xl"
            style={{ 
              backfaceVisibility: 'hidden',
              backgroundColor: '#4A5E28',
              transform: 'rotateY(180deg)',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: '0 20px 40px -10px rgba(44, 42, 30, 0.25), inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            <div className="relative z-10 space-y-4">
              <p className="text-[#C8E870] text-xs font-semibold tracking-wider uppercase">
                25 anos, caiçara do litoral de SP
              </p>
              
              <div className="space-y-3 text-[#FAF7F0] text-sm leading-relaxed opacity-90">
                <p>
                  Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
                </p>
                <p>
                  Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega.
                </p>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {tools.map(tool => (
                  <span 
                    key={tool} 
                    className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-full text-[10px] text-white whitespace-nowrap"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-6 flex flex-col items-center gap-4">
              <p 
                className="text-[#D4713A] text-3xl transform -rotate-3"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Bianca Mesquita
              </p>
              
              <button 
                className="w-full py-2.5 bg-[#C8E870] hover:bg-[#A8CC2C] transition-colors rounded-lg text-[#2C2A1E] text-sm font-semibold flex items-center justify-center gap-2 group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                Mais sobre mim
                <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
