import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Project } from "@/data/projects";
import { useState, useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoadedImages({});
      setErrorImages({});
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
    setErrorImages(prev => ({ ...prev, [imagePath]: false }));
  };

  const handleImageError = (imagePath: string) => {
    setErrorImages(prev => ({ ...prev, [imagePath]: true }));
    setLoadedImages(prev => ({ ...prev, [imagePath]: false }));
    console.error(`Failed to load image: ${imagePath}`);
  };

  const retryImage = (imagePath: string) => {
    setErrorImages(prev => ({ ...prev, [imagePath]: false }));
    setLoadedImages(prev => ({ ...prev, [imagePath]: false }));
    
    // Force reload by appending timestamp
    const img = new Image();
    img.src = `${imagePath}?t=${Date.now()}`;
    img.onload = () => handleImageLoad(imagePath);
    img.onerror = () => handleImageError(imagePath);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <p className="text-muted-foreground">{project.description}</p>
          
          {project.images && project.images.length > 0 && (
            <div className="relative w-full aspect-video bg-card rounded-lg overflow-hidden">
              <Carousel 
                className="w-full" 
                currentIndex={currentImageIndex}
                onSelect={setCurrentImageIndex}
              >
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video bg-card">
                        {/* Loading state */}
                        {!loadedImages[image] && !errorImages[image] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-card">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                          </div>
                        )}
                        
                        {/* Image */}
                        <img
                          src={image}
                          alt={`${project.title} - Imagem ${index + 1}`}
                          className={`w-full h-full object-contain transition-opacity duration-300 ${
                            loadedImages[image] ? "opacity-100" : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                          onLoad={() => handleImageLoad(image)}
                          onError={() => handleImageError(image)}
                        />
                        
                        {/* Error state */}
                        {errorImages[image] && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/80 backdrop-blur-sm">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                            <p className="text-destructive font-medium">Erro ao carregar imagem</p>
                            <button
                              onClick={() => retryImage(image)}
                              className="px-3 py-1 text-sm bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                            >
                              Tentar novamente
                            </button>
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              {/* Image counter */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {project.link && (
            <div className="mt-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Visitar site do projeto
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 