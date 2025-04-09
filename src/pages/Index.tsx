
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DeveloperSection from "@/components/DeveloperSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading to show animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center">
          <span className="loader"></span>
          <span className="mt-4 text-lg font-medium text-gradient animate-pulse">
            Carregando...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid />
        <DeveloperSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
