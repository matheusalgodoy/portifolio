import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { calculateMousePosition } from "@/utils/animation";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        setMousePosition(calculateMousePosition(e, 0.03));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Abstract background blobs */}
      <div 
        className="blob w-[500px] h-[500px] bg-vibrant-red/30 left-[-200px] top-[-100px]"
        style={{ 
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` 
        }}
      />
      <div 
        className="blob w-[400px] h-[400px] bg-ocean-blue/20 right-[-100px] bottom-[-50px]"
        style={{ 
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` 
        }}
      />
      <div 
        className="blob w-[300px] h-[300px] bg-magenta-pink/20 top-[30%] right-[20%]"
        style={{ 
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` 
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
            Criando experiências <span className="text-gradient">digitais</span>{" "}
            que impressionam
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor Full Stack especializado em criar projetos dinâmicos, 
            interativos e exclusivos que deixam uma marca duradoura. Combinando expertise técnica 
            com o poder da Inteligência Artificial para desenvolver soluções inovadoras.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-105"
            >
              Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all hover:scale-105"
            >
              Entre em Contato
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-24">
          <div className="scroll-indicator">
            {/* The indicator dot is added via CSS */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
