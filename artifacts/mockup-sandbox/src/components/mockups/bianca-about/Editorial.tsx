import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Editorial() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-12 overflow-hidden relative" 
      style={{ backgroundColor: '#F5F0E8', color: '#2C2A1E', fontFamily: "'DM Sans', sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />
      
      <div className="relative w-full max-w-5xl mx-auto mt-16 mb-16">
        
        {/* Postcard background peeking */}
        <div className="absolute -bottom-24 -right-12 w-full max-w-2xl z-0 transform rotate-3 opacity-90 hidden md:block">
          <img src="/__mockup/images/bianca-postcard.png" alt="Postcard" className="w-full h-auto drop-shadow-2xl" />
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row shadow-2xl" style={{ backgroundColor: '#FAF7F0', border: '1.5px dashed rgba(61,74,30,0.2)' }}>
          
          {/* Left Column - Photo */}
          <div className="md:w-5/12 relative min-h-[350px] md:min-h-0">
             <div className="absolute inset-4 md:-left-12 md:-top-12 md:-bottom-12 md:right-4 z-20 transform md:-rotate-3 shadow-2xl bg-white p-3 md:p-4 transition-transform duration-700 hover:rotate-0">
                <img src="/__mockup/images/bianca-photo.png" alt="Bianca Mesquita" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:w-7/12 p-8 pt-12 md:p-16 flex flex-col justify-center relative z-10 bg-[#FAF7F0] overflow-hidden">
            <h1 className="text-5xl md:text-7xl mb-4 font-normal italic tracking-tight" style={{ fontFamily: "'Libre Baskerville', serif", color: '#3D4A1E' }}>
              Bianca Mesquita
            </h1>
            
            <h2 className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-10" style={{ color: '#D4713A' }}>
              Product Designer ✦ UX/UI Designer
            </h2>
            
            <div className="space-y-6 text-base md:text-lg leading-[1.8] max-w-lg mb-10" style={{ color: '#2C2A1E' }}>
              <p>
                Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
              </p>
              <p>
                Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega. Acredito que bons produtos nascem do entendimento real de quem usa.
              </p>
            </div>

            <div className="mb-10">
              <span className="text-4xl md:text-5xl" style={{ fontFamily: "'Caveat', cursive", color: '#4A5E28' }}>
                Bianca Mesquita
              </span>
            </div>

            {/* Tools - scattered pills */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-16 max-w-lg">
              {['Notion', 'Framer', 'Maze ◎', 'Figma', 'Ps'].map((tool) => (
                <div key={tool} className="px-4 py-2 rounded-full text-xs md:text-sm font-medium border" style={{ borderColor: 'rgba(61,74,30,0.2)', color: '#3D4A1E', backgroundColor: 'rgba(255,255,255,0.5)' }}>
                  {tool}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button 
              className="-mx-8 md:-mx-16 -mb-8 md:-mb-16 mt-auto flex items-center justify-between p-6 md:p-8 text-lg md:text-xl font-bold uppercase tracking-widest group transition-colors duration-300" 
              style={{ backgroundColor: '#A8CC2C', color: '#2C2A1E' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C8E870'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A8CC2C'}
            >
              <span>Mais sobre mim</span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 transform group-hover:translate-x-4 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
