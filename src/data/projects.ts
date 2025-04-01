export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "SensooMotel - Sistema de Gestão",
    description: "Sistema Inteligente de Reservas e Gestão para Motéis. Focado em agilidade, automação e eficiência para transformar a experiência dos seus clientes e otimizar seus resultados.",
    image: "/src/assets/projects/sensoo-motel.png",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Sistema de Reservas"],
    featured: true,
    link: "https://sensoomotel.vercel.app"
  },
  {
    id: "2",
    title: "Gestor de Barbearias",
    description: "Sistema de agendamento online para barbearia, permitindo que clientes agendem seus horários de forma fácil e rápida. Interface moderna e intuitiva para uma experiência de usuário excepcional.",
    image: "/src/assets/projects/barbearia-ganso.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sistema de Agendamento"],
    featured: true,
    link: "https://barbeariaatualizada.vercel.app/"
  },
  {
    id: "3",
    title: "SafeVault - Em Desenvolvimento",
    description: "Gerenciador de senhas seguro que permite organizar credenciais pessoais e profissionais em áreas distintas. Interface intuitiva para adicionar, categorizar e acessar suas informações de forma segura e eficiente.",
    image: "/src/assets/projects/safevault.png",
    tags: ["React Native", "TypeScript", "Criptografia", "Mobile App", "Segurança"],
    featured: false
  },
  {
    id: "4",
    title: "Business Finder - Em Desenvolvimento",
    description: "Sistema de busca inteligente de empresas que permite filtrar por localização (região, cidade, capital) e características como porte (pequeno, médio, grande). Facilita a descoberta e análise de empresas em diferentes regiões do Brasil.",
    image: "/src/assets/projects/business-finder.png",
    tags: ["React", "API REST", "Geolocalização", "Filtros Avançados", "Base de Dados Empresarial"],
    featured: false
  }
];
