export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  link?: string;
  featured?: boolean;
  isMobileApp?: boolean;
  showInModal?: boolean;
}

const BASE_IMAGE_PATH = "";

export const projects: Project[] = [
  {
    id: "1",
    title: "SensooMotel - Sistema de Gestão",
    description: "Sistema Inteligente de Reservas e Gestão para Motéis. Focado em agilidade, automação e eficiência para transformar a experiência dos seus clientes e otimizar seus resultados.",
    image: `${BASE_IMAGE_PATH}/images/sensoo-motel.png`,
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Sistema de Reservas"],
    featured: true,
    link: "https://sensoomotel.vercel.app"
  },
  {
    id: "2",
    title: "Gestor de Barbearias",
    description: "Sistema de agendamento online para barbearia, permitindo que clientes agendem seus horários de forma fácil e rápida. Interface moderna e intuitiva para uma experiência de usuário excepcional.",
    image: `${BASE_IMAGE_PATH}/images/barbearia-ganso.png`,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sistema de Agendamento"],
    featured: true,
    link: "https://barbeariaatualizada.vercel.app"
  },
  {
    id: "3",
    title: "SafeVault - Em Desenvolvimento",
    description: "Gerenciador de senhas seguro que permite organizar credenciais pessoais e profissionais em áreas distintas. Interface intuitiva para adicionar, categorizar e acessar suas informações de forma segura e eficiente.",
    image: `${BASE_IMAGE_PATH}/images/safevault.png`,
    tags: ["React Native", "TypeScript", "Criptografia", "Mobile App", "Segurança"],
    featured: false,
    isMobileApp: true
  },
  {
    id: "4",
    title: "Business Finder - Em Desenvolvimento",
    description: "Sistema de busca inteligente de empresas que permite filtrar por localização (região, cidade, capital) e características como porte (pequeno, médio, grande). Facilita a descoberta e análise de empresas em diferentes regiões do Brasil.",
    image: `${BASE_IMAGE_PATH}/images/business-finder.png`,
    tags: ["React", "API REST", "Geolocalização", "Filtros Avançados", "Base de Dados Empresarial"],
    featured: false
  },
  {
    id: "5",
    title: "Tarefas Diárias - App iOS",
    description: "Aplicativo mobile para gerenciamento de tarefas diárias desenvolvido para iOS. Interface clean e minimalista com tema escuro, permitindo adicionar, gerenciar e concluir tarefas de forma intuitiva.",
    image: `${BASE_IMAGE_PATH}/images/tarefas-diarias.png`,
    tags: ["Swift", "iOS", "UIKit", "Mobile App", "Task Management"],
    featured: true,
    isMobileApp: true,
    link: "https://cybertasks.vercel.app"
  },
  {
    id: "6",
    title: "Portfólio Lucas Godoy - Arquiteto e Urbanista",
    description: "Portfólio de um arquiteto e urbanista, com informações sobre projetos, serviços e contato. Interface moderna e responsiva para uma experiência de usuário excepcional. O projeto inclui uma galeria de imagens que demonstra diversos trabalhos realizados, desde projetos residenciais até comerciais, destacando a versatilidade e qualidade do profissional.",
    image: `${BASE_IMAGE_PATH}/images/lucasgodoy.jpg`,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Portfólio"],
    featured: true,
    link: "https://estudio-whis.vercel.app"
  },
  {
    id: "7",
    title: "Modelo Portfólio Europeu - Arquiteto e Urbanista",
    description: "Modelo de portfólio de um arquiteto e urbanista, com informações sobre projetos, serviços e contato. Interface moderna e responsiva para uma experiência de usuário excepcional. O projeto inclui uma galeria de imagens que demonstra diversos trabalhos realizados, desde projetos residenciais até comerciais, destacando a versatilidade e qualidade do profissional.",
    image: `${BASE_IMAGE_PATH}/images/europortfolio.png`,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Portfólio"],
    featured: true,
    link: "https://model-europortfolio.vercel.app"
  },
  {
    id: "8",
    title: "Portfólio Internacional - Arquiteto e Urbanista AR-CONCEPT",
    description: "Portfólio de um arquiteto e urbanista, com informações sobre projetos, serviços e contato. Interface moderna e responsiva para uma experiência de usuário excepcional. O projeto inclui uma galeria de imagens que demonstra diversos trabalhos realizados, desde projetos residenciais até comerciais, destacando a versatilidade e qualidade do profissional.",
    image: `${BASE_IMAGE_PATH}/images/arconcept.png`,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Portfólio"],
    featured: true,
    link: "https://arconcept.vercel.app"
  },
  {
    id: "9",
    title: "Comércio Online - No-Espeto",
    description: "Facilitador de vendas de alimento para a cidade",
    image: `${BASE_IMAGE_PATH}/images/noespeto.png`,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Portfólio"],
    featured: true,
    link: "https://noespeto.vercel.app"
  }






];













