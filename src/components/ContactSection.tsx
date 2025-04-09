import { useState } from "react";
import { cn } from "@/lib/utils";
import { Send, Mail, MessageSquare, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { emailConfig } from "@/config/email";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    isSubmitting: false
  });
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "5522999048103";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    
    try {
      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message
        },
        emailConfig.publicKey
      );

      if (result.status === 200) {
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo seu contato. Responderei em breve.",
        });
        
        setFormState({
          name: "",
          email: "",
          message: "",
          isSubmitting: false
        });
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="blob w-[400px] h-[400px] bg-vibrant-purple/10 right-[-200px] top-[0]" />
      <div className="blob w-[350px] h-[350px] bg-ocean-blue/10 left-[-150px] bottom-[10%]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente? Entre em contato e vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-lg p-6 md:p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User size={16} /> Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail size={16} /> Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare size={16} /> Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Conte-me sobre seu projeto..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className={cn(
                  "flex-1 py-3 rounded-lg font-medium flex items-center justify-center transition-all",
                  formState.isSubmitting
                    ? "bg-primary/70 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {formState.isSubmitting ? (
                  <span className="loader block w-5 h-5 border-2 border-white/20 border-b-white"></span>
                ) : (
                  <>
                    Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 py-3 rounded-lg font-medium flex items-center justify-center transition-all bg-green-600 text-white hover:bg-green-700"
              >
                WhatsApp <Phone className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
