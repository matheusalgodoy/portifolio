import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Project } from "@/data/projects";
import { useState } from "react";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
    setErrorImages(prev => ({ ...prev, [imagePath]: false }));
  };

  const handleImageError = (imagePath: string) => {
    setErrorImages(prev => ({ ...prev, [imagePath]: true }));
    setLoadedImages(prev => ({ ...prev, [imagePath]: false }));
    console.error(`Failed to load image: ${imagePath}`);
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
            <div className="relative w-full aspect-video bg-card">
              <Carousel className="w-full">
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video bg-card">
                        {!loadedImages[image] && !errorImages[image] && (
                          <div className="absolute inset-0 bg-card animate-pulse" />
                        )}
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
                        {errorImages[image] && (
                          <div className="absolute inset-0 flex items-center justify-center text-destructive">
                            Erro ao carregar imagem
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
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
        </div>
      </DialogContent>
    </Dialog>
  );
} 