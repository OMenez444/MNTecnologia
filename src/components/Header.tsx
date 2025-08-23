import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useGoogleAds } from "@/hooks/useGoogleAds";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trackContactButton, trackStartNowButton } = useGoogleAds();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-green-100 dark:border-green-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/favicon-32x32.png?v=7" 
            alt="M&N Tecnologia Logo" 
            className="w-10 h-10 rounded-lg"
          />
          <span className="text-xl font-bold text-foreground">M&N Tecnologia</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-foreground hover:text-green-600 transition-smooth"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-foreground hover:text-green-600 transition-smooth"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-green-600 transition-smooth"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-green-600 transition-smooth"
          >
            Contato
          </button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          <Button 
            variant="outline" 
            onClick={() => {
              trackContactButton();
              scrollToSection('contact');
            }}
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Fale Conosco
          </Button>
          <Button 
            variant="hero" 
            onClick={() => {
              trackStartNowButton();
              scrollToSection('contact');
            }}
            className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-green-glow hover:shadow-green-glow/80 transition-all duration-300"
          >
            Começar Agora
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-green-600 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-green-100 dark:border-green-800 md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-foreground hover:text-green-600 transition-smooth"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-foreground hover:text-green-600 transition-smooth"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-green-600 transition-smooth"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-green-600 transition-smooth"
              >
                Contato
              </button>
              
              {/* Theme Toggle Mobile */}
              <div className="flex items-center justify-between py-2">
                <span className="text-foreground">Tema:</span>
                <ThemeToggle />
              </div>
              
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    trackContactButton();
                    scrollToSection('contact');
                  }}
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Fale Conosco
                </Button>
                <Button 
                  variant="hero" 
                  onClick={() => {
                    trackStartNowButton();
                    scrollToSection('contact');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-green-glow hover:shadow-green-glow/80 transition-all duration-300"
                >
                  Começar Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
