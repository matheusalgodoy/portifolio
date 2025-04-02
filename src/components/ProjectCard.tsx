import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    if (project.isMobileApp) {
      // Less dramatic effect for mobile apps
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX/2}deg) rotateY(${rotateY/2}deg) scale3d(1.03, 1.03, 1.03)`;
    } else {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    console.error(`Failed to load image for project: ${project.title}`);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden shadow-md transition-all duration-200 h-[350px]",
        project.featured ? "md:col-span-2" : ""
      )}
      style={{ 
        transitionDelay: `${index * 50}ms`, 
        transform: "perspective(1000px)" 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project Image */}
      <div className="absolute inset-0 z-0 transition-all duration-300">
        <div className={cn(
          "absolute inset-0 z-10",
          project.isMobileApp 
            ? "bg-gradient-to-t from-black/70 to-black/30" 
            : "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        )} />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-card animate-pulse" />
        )}
        
        {project.isMobileApp ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className={cn(
              "relative mx-auto transition-all duration-300 w-[220px] h-[440px]",
              isHovered ? "scale-105" : "scale-100"
            )}>
              {/* iPhone frame */}
              <div className="absolute inset-0 bg-[#1A1A1C] rounded-[40px] shadow-xl overflow-hidden">
                {/* Bezels */}
                <div className="absolute inset-2 rounded-[32px] border-[3px] border-[#121214] overflow-hidden">
                  {/* Screen content */}
                  <div className="absolute inset-0 overflow-hidden bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-300",
                        !imageLoaded && "opacity-0"
                      )}
                    />
                  </div>
                </div>
                
                {/* Dynamic Island */}
                <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20" />
                
                {/* Side buttons */}
                <div className="absolute top-[90px] -right-[4px] w-[4px] h-[60px] bg-[#2A2A2C] rounded-l-md" /> {/* Volume up */}
                <div className="absolute top-[160px] -right-[4px] w-[4px] h-[60px] bg-[#2A2A2C] rounded-l-md" /> {/* Volume down */}
                <div className="absolute top-[120px] -left-[4px] w-[4px] h-[80px] bg-[#2A2A2C] rounded-r-md" /> {/* Power */}
                
                {/* Bottom speaker and port */}
                <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-[40%] h-[4px] bg-[#2A2A2C] rounded-full" />
                
                {/* Reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[40px] opacity-50" />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              isHovered ? "scale-105 blur-[1px]" : "scale-100",
              !imageLoaded && "opacity-0"
            )}
          />
        )}
      </div>
      
      {/* Project Content */}
      <div className={cn(
        "relative z-20 h-full flex flex-col transition-all duration-200",
        project.isMobileApp 
          ? "justify-end p-6" 
          : "justify-end p-6"
      )}>
        <div className="transform transition-all duration-200">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>
          
          <p className={cn(
            "text-white/80 text-sm mb-4 line-clamp-2 transform transition-all duration-200",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {project.description}
          </p>
          
          <a
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center text-white font-medium transform transition-all duration-200",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Ver projeto <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
      
      {/* Shine effect */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-200",
          isHovered ? "opacity-100" : ""
        )}
        style={{
          transform: isHovered ? "rotate(45deg) translateX(100%)" : "rotate(45deg) translateX(-100%)",
          transition: "transform 450ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />
    </div>
  );
};

export default ProjectCard;
