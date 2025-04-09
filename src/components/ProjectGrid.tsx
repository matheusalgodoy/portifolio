import { useState, useEffect, useRef } from "react";
import { projects as allProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { isInViewport } from "@/utils/animation";

const ProjectGrid = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const allTags = Array.from(
    new Set(allProjects.flatMap((project) => project.tags))
  ).sort();
  
  useEffect(() => {
    setFilteredProjects(
      activeTag
        ? allProjects.filter((project) => project.tags.includes(activeTag))
        : allProjects
    );
  }, [activeTag]);
  
  useEffect(() => {
    const checkVisibility = () => {
      if (sectionRef.current && isInViewport(sectionRef.current)) {
        setIsVisible(true);
        window.removeEventListener('scroll', checkVisibility);
      }
    };
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on mount
    
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  return (
    <section id="projects" className="py-20" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore meus trabalhos mais recentes, demonstrando criatividade, inovação e excelência técnica.
          </p>
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            onClick={() => setActiveTag(null)}
          >
            Todos
          </button>
          
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`transform transition-all duration-300 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-20"
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms` 
              }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
