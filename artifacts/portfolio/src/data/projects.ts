export type Category = "Product Design" | "UX/UI Design" | "Graphic Design";

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  img?: string;
  placeholder?: boolean;
  categories: Category[];
};

export const ALL_PROJECTS: Project[] = [
  {
    title: "SisPat",
    desc: "Sistema público de patrimônio imobiliário. Redesign completo com foco em acessibilidade e eficiência para servidores públicos.",
    tags: ["Redesign", "UX Research", "UX Design"],
    categories: ["Product Design", "UX/UI Design"],
    img: "https://picsum.photos/seed/sispatbig/1200/700",
  },
  {
    title: "SGTran",
    desc: "Sistema de gestão de transporte. Fluxos complexos simplificados com foco no operador logístico.",
    tags: ["Logística", "UX Design", "Sistema"],
    categories: ["Product Design", "UX/UI Design"],
    img: "https://picsum.photos/seed/sgtran/800/500",
  },
  {
    title: "MundoLingo App",
    desc: "App mobile de eventos e idiomas para comunidades de aprendizado ao redor do mundo.",
    tags: ["Mobile App", "Product Design", "Eventos"],
    categories: ["Product Design", "UX/UI Design"],
    img: "https://picsum.photos/seed/mundolingo/800/500",
  },
  {
    title: "SisPat Visual Identity",
    desc: "Identidade visual do sistema SisPat: logotipo, paleta de cores e guia de estilo para o produto público.",
    tags: ["Branding", "Visual Identity", "Identidade"],
    categories: ["Graphic Design"],
    img: "https://picsum.photos/seed/sispatbrand/800/500",
  },
  {
    title: "Cartazes Culturais",
    desc: "Série de cartazes para eventos culturais do litoral paulista. Mistura de tipografia editorial e fotografia.",
    tags: ["Poster Design", "Tipografia", "Editorial"],
    categories: ["Graphic Design"],
    img: "https://picsum.photos/seed/posters/800/500",
  },
  {
    title: "Em breve",
    desc: "",
    tags: [],
    categories: ["Product Design", "UX/UI Design", "Graphic Design"],
    placeholder: true,
  },
];

export const HOME_PROJECTS: Project[] = ALL_PROJECTS.filter((p) => !p.placeholder).slice(0, 3);
