export type SiteSettings = {
  id: number;
  heroName: string;
  heroText: string;
  availabilityStatus: string;
  email: string;
  linkedinUrl: string;
  behanceUrl: string;
  bio: string;
  bioSecondary: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
  href: string;
  filterCategories: string[];
  featured: boolean;
  sortOrder: number;
  comingSoon: boolean;
};

export type FilterCategory = { id: number; label: string; sortOrder: number };
export type Experience = { id: number; role: string; company: string; period: string; current: boolean; sortOrder: number };
export type Skill = { id: number; label: string; sortOrder: number };
export type ProcessStep = { id: number; number: string; title: string; description: string; sortOrder: number };
export type CarouselSlide = { id: number; category: string; title: string; subtitle: string; imageUrl: string | null; sortOrder: number };

export type ContentData = {
  settings: SiteSettings | null;
  projects: Project[];
  filterCategories: FilterCategory[];
  experience: Experience[];
  skills: Skill[];
  processSteps: ProcessStep[];
  carouselSlides: CarouselSlide[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 0,
  heroName: "Bia",
  heroText: "que transforma necessidades dos usuários em experiências digitais claras e funcionais.",
  availabilityStatus: "Disponível para trabalho",
  email: "biadesign.contate@gmail.com",
  linkedinUrl: "https://linkedin.com/in/biancames",
  behanceUrl: "https://behance.net/biadesigns",
  bio: "Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks.",
  bioSecondary: "Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega. Acredito que bons produtos nascem do entendimento real de quem usa.",
};

export const DEFAULT_PROJECTS: Project[] = [
  { id: 1, title: "SisPat", description: "Sistema público de patrimônio imobiliário. Redesign completo com foco em acessibilidade e eficiência para servidores públicos.", tags: ["Redesign", "UX Research", "UX Design"], imageUrl: "https://picsum.photos/seed/sispatbig/1200/700", href: "#", filterCategories: ["Product Design", "UX/UI Design"], featured: true, sortOrder: 0, comingSoon: false },
  { id: 2, title: "SGTran", description: "Sistema de gestão de transporte. Fluxos complexos simplificados com foco no operador logístico.", tags: ["Logística", "UX Design", "Sistema"], imageUrl: "https://picsum.photos/seed/sgtran/800/500", href: "#", filterCategories: ["Product Design", "UX/UI Design"], featured: true, sortOrder: 1, comingSoon: false },
  { id: 3, title: "MundoLingo App", description: "App mobile de eventos e idiomas para comunidades de aprendizado ao redor do mundo.", tags: ["Mobile App", "Product Design", "Eventos"], imageUrl: "https://picsum.photos/seed/mundolingo/800/500", href: "#", filterCategories: ["Product Design", "UX/UI Design"], featured: true, sortOrder: 2, comingSoon: false },
  { id: 4, title: "SisPat Visual Identity", description: "Identidade visual do sistema SisPat: logotipo, paleta de cores e guia de estilo.", tags: ["Branding", "Visual Identity", "Identidade"], imageUrl: "https://picsum.photos/seed/sispatbrand/800/500", href: "#", filterCategories: ["Graphic Design"], featured: false, sortOrder: 3, comingSoon: false },
  { id: 5, title: "Cartazes Culturais", description: "Série de cartazes para eventos culturais do litoral paulista.", tags: ["Poster Design", "Tipografia", "Editorial"], imageUrl: "https://picsum.photos/seed/posters/800/500", href: "#", filterCategories: ["Graphic Design"], featured: false, sortOrder: 4, comingSoon: false },
  { id: 6, title: "Em breve", description: "", tags: [], imageUrl: null, href: "#", filterCategories: ["Product Design", "UX/UI Design", "Graphic Design"], featured: false, sortOrder: 5, comingSoon: true },
];

export const DEFAULT_FILTER_CATEGORIES: FilterCategory[] = [
  { id: 1, label: "Todos", sortOrder: 0 },
  { id: 2, label: "Product Design", sortOrder: 1 },
  { id: 3, label: "UX/UI Design", sortOrder: 2 },
  { id: 4, label: "Graphic Design", sortOrder: 3 },
];

export const DEFAULT_EXPERIENCE: Experience[] = [
  { id: 1, role: "Product Designer", company: "Empresa atual", period: "2024 — presente", current: true, sortOrder: 0 },
  { id: 2, role: "UX/UI Designer", company: "Empresa anterior", period: "2022 — 2024", current: false, sortOrder: 1 },
  { id: 3, role: "Designer Jr.", company: "Primeira empresa", period: "2021 — 2022", current: false, sortOrder: 2 },
];

export const DEFAULT_SKILLS: Skill[] = [
  { id: 1, label: "UX Research", sortOrder: 0 },
  { id: 2, label: "UX Design", sortOrder: 1 },
  { id: 3, label: "Product Design", sortOrder: 2 },
  { id: 4, label: "Interaction Design", sortOrder: 3 },
  { id: 5, label: "Design System", sortOrder: 4 },
  { id: 6, label: "Prototipação", sortOrder: 5 },
  { id: 7, label: "Visual Design", sortOrder: 6 },
];

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  { id: 1, number: "01", title: "Descoberta", description: "Entender o problema, os usuários e o contexto antes de qualquer solução.", sortOrder: 0 },
  { id: 2, number: "02", title: "Definição", description: "Sintetizar insights e alinhar os objetivos do produto com as necessidades reais.", sortOrder: 1 },
  { id: 3, number: "03", title: "Ideação", description: "Explorar soluções diversas com criatividade antes de escolher o caminho.", sortOrder: 2 },
  { id: 4, number: "04", title: "Prototipação", description: "Dar forma às melhores ideias com rapidez e testar hipóteses antes de construir.", sortOrder: 3 },
  { id: 5, number: "05", title: "Entrega", description: "Testar, refinar e lançar com impacto real. Acompanhar e iterar continuamente.", sortOrder: 4 },
];

export const DEFAULT_CAROUSEL_SLIDES: CarouselSlide[] = [
  { id: 1, category: "livro favorito", title: "Um Estudo em Vermelho", subtitle: "Arthur Conan Doyle", imageUrl: null, sortOrder: 0 },
  { id: 2, category: "música do momento", title: "Vienna", subtitle: "Billy Joel", imageUrl: null, sortOrder: 1 },
  { id: 3, category: "viagem favorita", title: "Destino", subtitle: "troque pela sua foto", imageUrl: null, sortOrder: 2 },
  { id: 4, category: "drink favorito", title: "Moscow Mule", subtitle: "", imageUrl: null, sortOrder: 3 },
  { id: 5, category: "meu pet", title: "Nome do pet", subtitle: "troque pela sua foto", imageUrl: null, sortOrder: 4 },
];
