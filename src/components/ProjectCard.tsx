import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import { ArrowRight } from "lucide-react";
import { ProjectModal } from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleClick = () => {
    if (project.showInModal) {
      setIsModalOpen(true);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  // Get current time for status bar
  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ":" + 
           now.getMinutes().toString().padStart(2, '0');
  };

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          "group relative bg-card rounded-2xl overflow-hidden shadow-md transition-all duration-200 h-[350px] cursor-pointer",
          project.featured ? "md:col-span-2" : ""
        )}
        style={{ 
          transitionDelay: `${index * 50}ms`, 
          transform: "perspective(1000px)" 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
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
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-[28px] bg-[#1E1E2E] flex items-center justify-between px-6 z-30">
                        <span className="text-white text-xs font-medium">{getCurrentTime()}</span>
                        <div className="flex items-center space-x-1.5">
                          <div className="w-4 h-3 flex items-end justify-end space-x-px">
                            <div className="w-0.5 h-1.5 bg-white"></div>
                            <div className="w-0.5 h-2 bg-white"></div>
                            <div className="w-0.5 h-2.5 bg-white"></div>
                            <div className="w-0.5 h-3 bg-white"></div>
                          </div>
                          <div className="w-4 h-3 relative">
                            <div className="absolute right-0 top-0 h-3 w-3">
                              <div className="absolute inset-0 border border-white rounded-full"></div>
                              <div className="absolute inset-[3px] border border-white rounded-full"></div>
                            </div>
                          </div>
                          <div className="w-6 h-3 relative">
                            <div className="absolute inset-0 border border-white rounded-sm"></div>
                            <div className="absolute inset-y-0 right-0 w-3 bg-white rounded-r-sm"></div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 pt-[28px] pb-[80px]">
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
                      
                      {/* Safari URL Bar */}
                      <div className="absolute bottom-[44px] left-2 right-2 h-[36px] bg-white rounded-lg flex items-center justify-between px-3 z-30">
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#999999" strokeWidth="2" />
                            </svg>
                          </div>
                          <span className="text-gray-600 text-xs ml-2">localhost</span>
                        </div>
                        <div className="w-5 h-5 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="#999999" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Safari Bottom Navigation */}
                      <div className="absolute bottom-0 left-0 right-0 h-[44px] bg-[#f2f2f7] border-t border-gray-200 flex items-center justify-between px-6 z-30">
                        <div className="flex items-center space-x-10">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex items-center space-x-10">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.077 19.692 7.8 19.142L3 20L4.056 16.448C3.384 15.122 3 13.65 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z" stroke="#5D59FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M20 12H4" stroke="#5D59FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
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
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-[30%] h-[4px] bg-white rounded-full z-30" />
                  
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
            
            {!project.showInModal && project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center text-white font-medium transform transition-all duration-200",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Ver projeto <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            )}
            
            {project.showInModal && !project.link && (
              <button
                className={cn(
                  "inline-flex items-center text-white font-medium transform transition-all duration-200",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Ver detalhes <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            )}
            
            {project.showInModal && project.link && (
              <div className={cn(
                "flex flex-col gap-2 transform transition-all duration-200",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                <button
                  className="inline-flex items-center text-white font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  Ver detalhes <ArrowRight className="ml-1 h-4 w-4" />
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visitar site <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
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

      {project.showInModal && (
        <ProjectModal
          project={project}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
