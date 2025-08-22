import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Target, 
  BarChart3, 
  Code, 
  Cloud, 
  Settings,
  ArrowRight
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Tráfego Pago",
      description: "Google Ads, Facebook Ads, Instagram Ads e outras plataformas para maximizar seu ROI",
      features: ["Campanhas Otimizadas", "Análise de Concorrência", "Relatórios Detalhados"]
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: "SEO Orgânico",
      description: "Posicionamento no Google para aumentar sua visibilidade de forma sustentável",
      features: ["Auditoria Completa", "Otimização On-Page", "Link Building"]
    },
    {
      icon: <Code className="w-8 h-8 text-green-600" />,
      title: "Desenvolvimento Web",
      description: "Sites modernos, responsivos e otimizados para conversão e performance",
      features: ["React & Next.js", "E-commerce", "Landing Pages"]
    },
    {
      icon: <Cloud className="w-8 h-8 text-green-600" />,
      title: "Desenvolvimento SaaS",
      description: "Plataformas completas de software como serviço para seu negócio",
      features: ["MVP Development", "Escalabilidade", "Integração APIs"]
    },
    {
      icon: <Settings className="w-8 h-8 text-green-600" />,
      title: "Ferramentas de Gestão",
      description: "Sistemas personalizados para otimizar processos e aumentar produtividade",
      features: ["CRM Personalizado", "Automação", "Dashboards"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Analytics & Dados",
      description: "Análise profunda de dados para decisões estratégicas baseadas em métricas reais",
      features: ["Dashboard Personalizado", "KPIs Relevantes", "Insights Acionáveis"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos <span className="bg-gradient-primary bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em marketing digital, desenvolvimento web e ferramentas de gestão para impulsionar seu negócio ao próximo nível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-green-card transition-smooth cursor-pointer border-green-100 hover:border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-smooth border border-green-200">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToContact}
            className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-green-glow hover:shadow-green-glow/80 transition-all duration-300"
          >
            Solicitar Proposta
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;