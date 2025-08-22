import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  // Configuração das estatísticas - FÁCIL DE ALTERAR!
  const stats = [
    {
      icon: <TrendingUp className="text-green-600" size={24} />,
      value: "200%",
      label: "ROI Médio",
      description: "Retorno médio sobre investimento"
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      value: "10+",
      label: "Clientes Ativos",
      description: "Empresas que confiam em nós"
    },
    {
      icon: <Zap className="text-green-600" size={24} />,
      value: "50",
      label: "Leads Gerados",
      description: "Oportunidades de negócio criadas"
    }
  ];



  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6 border border-green-200">
            <Zap size={16} className="mr-2" />
            Startup de Tecnologia & Marketing Digital + Desenvolvimento
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transforme seu
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Negócio </span>
            com Marketing Digital
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Especialistas em marketing digital, desenvolvimento web, SaaS e ferramentas de gestão para acelerar o crescimento da sua empresa
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300">
              Nossos Serviços
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 border border-green-200 group-hover:bg-green-200 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground group-hover:text-green-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1 text-center max-w-24">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-600 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;