import { ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gradient mb-4">Portfolio</h3>
            <p className="text-muted-foreground max-w-md">
              Desenvolvedor Full Stack especializado em criar experiências digitais únicas e interativas.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-accent transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Conecte-se</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.linkedin.com/in/matheus-alves-de-azevedo-godoy-487204221/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center"
                >
                  LinkedIn <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/matheusalgodoy"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center"
                >
                  GitHub <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/DaN1ke_2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center"
                >
                  Twitter <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/matheusalgodoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center"
                >
                  Instagram <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Portfolio. Todos os direitos reservados.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Projetado e desenvolvido com ❤️
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
