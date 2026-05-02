import React, { useEffect } from 'react';

export function Stacked() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="relative w-full max-w-md">
        {/* Postcard background peeking */}
        <div className="absolute -bottom-8 -right-6 md:-right-8 md:-bottom-10 w-4/5 z-0 transform rotate-6 transition-transform hover:rotate-12 duration-500">
          <img 
            src="/__mockup/images/bianca-postcard.png" 
            alt="Vintage Postcard" 
            className="w-full h-auto object-cover opacity-90 rounded shadow-lg"
          />
        </div>

        {/* Main Card */}
        <div 
          className="relative z-10 w-full overflow-hidden flex flex-col shadow-2xl transition-all duration-300"
          style={{ 
            backgroundColor: '#FAF7F0', 
            borderRadius: '20px',
            border: '1.5px dashed rgba(61,74,30,0.25)'
          }}
        >
          {/* Photo */}
          <div className="w-full h-64 overflow-hidden bg-[#E2DAC8] relative">
            <img 
              src="/__mockup/images/bianca-photo.png" 
              alt="Bianca Mesquita" 
              className="w-full h-full object-cover object-[center_20%] mix-blend-multiply opacity-90 grayscale-[20%] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col gap-6" style={{ color: '#2C2A1E' }}>
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-1.5 -mt-4">
              <h1 className="text-4xl md:text-[2.75rem] font-bold tracking-tight" style={{ fontFamily: '"Libre Baskerville", serif', color: '#2C2A1E' }}>
                Bianca Mesquita
              </h1>
              <p className="text-[0.8rem] uppercase tracking-[0.25em] font-bold mt-2" style={{ fontFamily: '"DM Sans", sans-serif', color: '#D4713A' }}>
                Product Designer <span className="mx-2 opacity-50">✦</span> UX/UI
              </p>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-5 text-[1.05rem] leading-[1.7] mt-4" style={{ fontFamily: '"DM Sans", sans-serif', color: '#3D4A1E' }}>
              <p>
                Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.
              </p>
              <p>
                Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega. Acredito que bons produtos nascem do entendimento real de quem usa.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-2 flex justify-end">
              <span className="text-4xl transform -rotate-2 opacity-90" style={{ fontFamily: '"Caveat", cursive', color: '#4A5E28' }}>
                Bianca Mesquita
              </span>
            </div>

            <hr className="my-2" style={{ borderColor: 'rgba(61,74,30,0.1)' }} />

            {/* Tools */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-2 text-[0.85rem] font-medium" style={{ fontFamily: '"DM Sans", sans-serif', color: '#4A5E28' }}>
                <span className="px-4 py-1.5 rounded-full border border-dashed transition-colors hover:bg-[rgba(61,74,30,0.05)] cursor-default" style={{ borderColor: 'rgba(61,74,30,0.2)' }}>Notion</span>
                <span className="px-4 py-1.5 rounded-full border border-dashed transition-colors hover:bg-[rgba(61,74,30,0.05)] cursor-default" style={{ borderColor: 'rgba(61,74,30,0.2)' }}>Framer</span>
                <span className="px-4 py-1.5 rounded-full border border-dashed flex items-center gap-1.5 transition-colors hover:bg-[rgba(61,74,30,0.05)] cursor-default" style={{ borderColor: 'rgba(61,74,30,0.2)' }}>
                  Maze <span className="text-[10px] opacity-70">◎</span>
                </span>
                <span className="px-4 py-1.5 rounded-full border border-dashed transition-colors hover:bg-[rgba(61,74,30,0.05)] cursor-default" style={{ borderColor: 'rgba(61,74,30,0.2)' }}>Figma</span>
                <span className="px-4 py-1.5 rounded-full border border-dashed transition-colors hover:bg-[rgba(61,74,30,0.05)] cursor-default" style={{ borderColor: 'rgba(61,74,30,0.2)' }}>Ps</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex justify-center">
              <button 
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-[0.85rem] font-bold uppercase tracking-[0.15em] transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                style={{ 
                  backgroundColor: '#A8CC2C', 
                  color: '#2C2A1E',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Mais sobre mim
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
