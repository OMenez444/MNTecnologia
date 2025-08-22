import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Lightbulb, ArrowRight } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { number: "2+", label: "Anos de Experiência" },
    { number: "20+", label: "Projetos Entregues" },
    { number: "99%", label: "Satisfação do Cliente" },
    { number: "24/7", label: "Suporte Disponível" }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-green-600" />,
      title: "Inovação",
      description: "Utilizamos as tecnologias e estratégias mais avançadas do mercado"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Transparência",
      description: "Relatórios claros e comunicação aberta com nossos clientes"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Resultados",
      description: "Foco total em métricas que realmente impactam seu negócio"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre a <span className="bg-gradient-primary bg-clip-text text-transparent">M&N Tecnologia</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Somos uma startup especializada em marketing digital, desenvolvimento web e soluções SaaS, 
              fundada por especialistas apaixonados por transformar negócios através de estratégias inovadoras.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nossa missão é democratizar o acesso a soluções tecnológicas e de marketing digital de alta qualidade, 
              criando ferramentas e estratégias que ajudam empresas de todos os tamanhos a alcançarem seus objetivos de crescimento.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Equipe especializada em desenvolvimento e marketing",
                "Soluções SaaS personalizadas e escaláveis",
                "Suporte técnico completo e consultoria estratégica",
                "Foco em ROI e crescimento sustentável"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToContact}
              className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-green-glow hover:shadow-green-glow/80 transition-all duration-300"
            >
              Conhecer Nossa Equipe
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 border-green-100 hover:border-green-200 transition-colors">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Values */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Nossos Valores</h3>
              {values.map((value, index) => (
                <Card key={index} className="p-6 border-green-100 hover:border-green-200 transition-colors">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-green-200">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;