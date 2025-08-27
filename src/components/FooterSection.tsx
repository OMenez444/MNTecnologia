import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre", href: "#about" },
    { name: "Contato", href: "#contact" }
  ];

  const services = [
    "Tráfego Pago",
    "SEO Orgânico", 
    "Desenvolvimento Web",
    "Desenvolvimento SaaS",
    "Ferramentas de Gestão",
    "Analytics & Dados"
  ];

  // Configuração das redes sociais com URLs reais
  const socialLinks = [
    { 
      icon: <Facebook size={20} />, 
      href: "https://facebook.com/mntecnologia", 
      name: "Facebook",
      color: "hover:bg-blue-600",
      tooltip: "Siga-nos no Facebook"
    },
    { 
      icon: <Instagram size={20} />, 
      href: "https://www.instagram.com/mn.tecnologia_iub", 
      name: "Instagram",
      color: "hover:bg-pink-600",
      tooltip: "Siga-nos no Instagram"
    },
    { 
      icon: <Linkedin size={20} />, 
      href: "https://linkedin.com/company/mntecnologia", 
      name: "LinkedIn",
      color: "hover:bg-blue-700",
      tooltip: "Conecte-se no LinkedIn"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para tracking de cliques nas redes sociais
  const handleSocialClick = (socialName: string, socialUrl: string) => {
    // Google Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        social_network: socialName,
        link_url: socialUrl,
        event_category: 'social_media'
      });
    }
    
    // Console log para desenvolvimento
    console.log(`Clique na rede social: ${socialName}`);
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/favicon-32x32.png?v=7" 
                alt="M&N Tecnologia Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold">M&N Tecnologia</span>
            </div>
            
            <p className="text-background/80 leading-relaxed">
              Transformando negócios através de marketing digital, desenvolvimento web, 
              SaaS e ferramentas de gestão inovadoras.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-green-400" />
                <a href="mailto:mntecnologia@outlook.com.br" className="text-background/80 hover:text-background transition-smooth">
                  mntecnologia@outlook.com.br
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-green-400" />
                                  <a href="tel:+5564992780424" className="text-background/80 hover:text-background transition-smooth">
                  +55 (64) 99278-0424
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-green-400" />
                <span className="text-background/80">Itumbiara - GO</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-background transition-smooth"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Nossos Serviços</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-background/80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Fique por Dentro</h3>
            <p className="text-background/80">
              Receba dicas exclusivas de marketing digital direto no seu email.
            </p>
            
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-2 rounded-lg bg-background/10 text-background placeholder:text-background/60 border border-background/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <Button 
                variant="hero" 
                className="w-full bg-green-600 hover:bg-green-700 text-white border-0 shadow-green-glow hover:shadow-green-glow/80 transition-all duration-300"
              >
                Inscrever-se
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Redes Sociais</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick(social.name, social.href)}
                    className={`w-12 h-12 bg-background/10 rounded-xl flex items-center justify-center text-background/80 hover:text-white transition-all duration-300 transform hover:scale-110 ${social.color} group relative`}
                    aria-label={social.name}
                    title={social.tooltip}
                  >
                    {social.icon}
                    
                    {/* Tooltip personalizado */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                      {social.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Texto explicativo */}
              <p className="text-background/60 text-sm mt-3">
                Siga-nos para ficar por dentro das novidades e dicas de marketing digital!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/80 text-sm">
              © {currentYear} M&N Tecnologia. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-background transition-smooth">
                Política de Privacidade
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-smooth">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;