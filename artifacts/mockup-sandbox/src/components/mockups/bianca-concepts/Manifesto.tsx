import React, { useEffect } from 'react';

export default function Manifesto() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-8 md:p-16 lg:p-24 selection:bg-[#A8CC2C] selection:text-[#2C2A1E]"
      style={{ backgroundColor: '#F5F0E8', color: '#2C2A1E' }}
    >
      <article className="max-w-4xl w-full mx-auto relative">
        <header className="mb-12 md:mb-16">
          <h2 
            className="text-sm tracking-[0.2em] uppercase mb-8 opacity-70"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Para você
          </h2>
          <h1 
            className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.2] md:leading-[1.1] text-balance"
            style={{ fontFamily: "'Libre Baskerville', serif", color: '#2C2A1E' }}
          >
            <span className="italic">"Acredito que bons produtos nascem do entendimento real de quem usa."</span>
          </h1>
        </header>

        <hr className="w-full border-t border-[#3D4A1E]/30 mb-12 md:mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
          <p 
            className="text-lg md:text-xl leading-[1.8] opacity-90"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
          </p>
          <p 
            className="text-lg md:text-xl leading-[1.8] opacity-90"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega.
          </p>
        </div>

        <div className="mb-16 md:mb-24 relative">
          <p 
            className="text-sm md:text-base italic opacity-70"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ferramentas que uso: Figma · FigJam · Framer · Notion · Photoshop · Ai · Maze · Hotjar
          </p>
          
          <div className="absolute right-0 -bottom-8 md:-right-8 md:-bottom-12 z-10 hidden sm:block">
            <img 
              src="/__mockup/images/bianca-photo.png" 
              alt="Bianca Mesquita" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#F5F0E8] shadow-sm transform rotate-6 transition-transform hover:rotate-12 duration-500 grayscale hover:grayscale-0"
            />
          </div>
        </div>

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-[#3D4A1E]/10">
          <div 
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Caveat', cursive", color: '#3D4A1E' }}
          >
            Bianca Mesquita
          </div>
          
          <a 
            href="#" 
            className="group relative text-sm uppercase tracking-wider overflow-hidden inline-flex items-center gap-2"
            style={{ fontFamily: "'DM Sans', sans-serif", color: '#D4713A' }}
          >
            <span>Mais sobre mim</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4713A] transform origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300"></span>
          </a>
        </footer>
      </article>
    </div>
  );
}
