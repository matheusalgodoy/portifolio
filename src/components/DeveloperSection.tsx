import { Code, Briefcase, User, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { calculateMousePosition } from "@/utils/animation";
import { cn } from "@/lib/utils";

const DeveloperSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        setMousePosition(calculateMousePosition(e, 0.02));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    console.error('Failed to load profile image');
  };

  return (
    <section 
      id="developer" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background blobs */}
      <div 
        className="blob w-[400px] h-[400px] bg-ocean-blue/10 right-[-150px] top-[20%]"
        style={{ 
          transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)` 
        }}
      />
      <div 
        className="blob w-[300px] h-[300px] bg-vibrant-red/10 left-[-100px] bottom-[10%]"
        style={{ 
          transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` 
        }}
      />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Desenvolvedor</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça um pouco mais sobre quem está por trás desses projetos
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass-card p-1">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-card animate-pulse rounded-full" />
                  )}
                  <img 
                    src="/images/matheus.jpeg" 
                    alt="Matheus Godoy" 
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={cn(
                      "w-full h-full object-cover transition-opacity duration-300",
                      !imageLoaded && "opacity-0"
                    )}
                  />
                </div>
              </div>
              
              {/* Floating skill icons */}
              <div className="absolute top-0 -right-4 glass-card p-3 rounded-full animate-float">
                <Code className="text-primary h-6 w-6" />
              </div>
              <div className="absolute -bottom-2 -left-4 glass-card p-3 rounded-full animate-float" style={{ animationDelay: "1s" }}>
                <Briefcase className="text-ocean-blue h-6 w-6" />
              </div>
              <div className="absolute top-1/2 -left-6 glass-card p-3 rounded-full animate-float" style={{ animationDelay: "2s" }}>
                <Github className="text-magenta-pink h-6 w-6" />
              </div>
            </div>
          </div>
          
          {/* Bio Content */}
          <div className="lg:text-left text-center">
            <div className="inline-flex items-center mb-4 glass-card px-4 py-2 rounded-full">
              <User className="mr-2 h-5 w-5 text-primary" />
              <span className="text-gradient font-medium">Sobre mim</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Olá, sou <span className="text-gradient">Matheus Godoy</span>
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Desenvolvedor Full Stack apaixonado por criar experiências digitais 
              inovadoras e interativas. Utilizando tecnologias modernas e inteligência artificial, 
              trabalho para transformar ideias em soluções tecnológicas impactantes, 
              combinando criatividade humana com as capacidades da IA para entregar 
              resultados excepcionais.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-medium min-w-24">Experiência:</span>
                <span className="text-muted-foreground">1 ano em desenvolvimento web</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-medium min-w-24">Especialidades:</span>
                <span className="text-muted-foreground">React, Next.js, TypeScript, Desenvolvimento Full Stack, Integração com IA</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-medium min-w-24">Formação:</span>
                <span className="text-muted-foreground">Análise e Desenvolvimento de Sistemas e Pós-graduando em Inteligência Artificial</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a 
                href="/documents/curriculo.pdf" 
                download
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-105"
              >
                Currículo Completo
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all hover:scale-105"
              >
                Entre em Contato
              </a>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">
            Habilidades <span className="text-gradient">Técnicas</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {["React/Next.js", "TypeScript", "Full Stack", "UI/UX", "IA"].map((skill, index) => (
              <div 
                key={skill} 
                className="glass-card rounded-xl p-6 text-center card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-xl font-medium mb-2">{skill}</h4>
                <p className="text-sm text-muted-foreground">
                  {getSkillDescription(skill)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get skill descriptions
const getSkillDescription = (skill: string): string => {
  switch (skill) {
    case "React/Next.js":
      return "Desenvolvimento de interfaces modernas e responsivas";
    case "TypeScript":
      return "Código tipado e seguro para aplicações robustas";
    case "Full Stack":
      return "Desenvolvimento completo front-end e back-end";
    case "UI/UX":
      return "Design intuitivo com Tailwind CSS";
    case "IA":
      return "Integração com IA para desenvolvimento ágil";
    default:
      return "";
  }
};

export default DeveloperSection;
