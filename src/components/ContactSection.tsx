import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  MessageSquare,
  Zap,
  CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGoogleAds } from "@/hooks/useGoogleAds";
import { useLeadQuality } from "@/hooks/useLeadQuality";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackContactForm, trackCustomEvent } = useGoogleAds();
  const { 
    startTracking, 
    trackFormFocus, 
    trackButtonClick: trackQualityButtonClick,
    trackSectionView 
  } = useLeadQuality();

  // Iniciar rastreamento de qualidade quando o componente for montado
  useEffect(() => {
    startTracking();
    trackSectionView('contact_section');
  }, [startTracking, trackSectionView]);

  // Configurações do WhatsApp
  const whatsappConfig = {
    phone: "5564996666165", // Número do WhatsApp (formato internacional)
    defaultMessage: "Olá! Gostaria de saber mais sobre os serviços de marketing digital e desenvolvimento web.",
    businessHours: {
      start: 9,
      end: 18,
      timezone: "America/Sao_Paulo"
    }
  };

  // Verifica se está dentro do horário comercial
  const isBusinessHours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= whatsappConfig.businessHours.start && 
           currentHour < whatsappConfig.businessHours.end;
  };

  // Função para abrir WhatsApp com mensagem personalizada
  const openWhatsApp = (customMessage?: string, fromForm: boolean = false) => {
    const message = customMessage || whatsappConfig.defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappConfig.phone}?text=${encodedMessage}`;
    
    // Tracking para Google Ads
    trackCustomEvent('whatsapp_click', {
      event_category: 'contact',
      event_label: fromForm ? 'form_whatsapp' : 'floating_whatsapp',
      value: 1
    });

    // Abre WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
    
    // Toast de confirmação
    toast({
      title: "WhatsApp aberto!",
      description: "Inicie uma conversa conosco para atendimento rápido.",
    });
  };

  // Função para abrir WhatsApp com dados do formulário
  const openWhatsAppWithFormData = () => {
    if (!formData.name || !formData.message) {
      toast({
        title: "Preencha os campos obrigatórios",
        description: "Nome e mensagem são necessários para continuar.",
        variant: "destructive"
      });
      return;
    }

    const message = `Olá! Meu nome é ${formData.name}${formData.company ? ` da empresa ${formData.company}` : ''}.

${formData.message}

${formData.email ? `Email: ${formData.email}` : ''}${formData.phone ? `\nTelefone: ${formData.phone}` : ''}

Gostaria de receber uma proposta personalizada.`;

    openWhatsApp(message, true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Rastrear foco nos campos do formulário
  const handleInputFocus = (fieldName: string) => {
    trackFormFocus(fieldName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula envio do formulário
    setTimeout(() => {
      // Tracking para Google Ads
      trackContactForm();
      
      // Tracking adicional para eventos personalizados
      trackCustomEvent('contact_form_submitted', {
        event_category: 'contact',
        event_label: 'contact_form',
        value: 1,
        form_fields: Object.keys(formData).filter(key => formData[key as keyof typeof formData]).length
      });

      // Rastrear qualidade do lead
      trackCustomEvent('lead_quality_contact_form', {
        form_type: 'contact',
        form_completion: '100%',
        lead_quality: 'high'
      });

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado!",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      content: "mntecnologia@outlook.com.br",
      link: "mailto:mntecnologia@outlook.com.br"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telefone",
      content: "(64) 9 9666-6165",
      link: "tel:+5564996666165"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Localização",
      content: "Itumbiara - GO",
      link: null
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Horário",
      content: "Seg - Sex: 9h às 18h",
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background relative">
      {/* Botão flutuante do WhatsApp */}
      <div className="whatsapp-float group">
        <Button
          onClick={() => openWhatsApp()}
          className="whatsapp-green hover:whatsapp-green-hover text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 whatsapp-shadow"
          aria-label="Contatar via WhatsApp"
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
        
        {/* Indicador de status */}
        <div className={`whatsapp-status ${isBusinessHours() ? 'online' : 'offline'}`} />
        
        {/* Tooltip */}
        <div className="whatsapp-tooltip">
          {isBusinessHours() ? '🟢 Online agora!' : '⚫ Fora do horário comercial'}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Vamos <span className="bg-gradient-primary bg-clip-text text-transparent">Conversar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pronto para transformar seu negócio? Entre em contato conosco e descubra como podemos ajudar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-card contact-form-enter contact-form-enter-active">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <MessageCircle className="w-6 h-6 text-primary mr-3" />
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('name')}
                      placeholder="Seu nome completo"
                      required
                      className="focus-ring form-input-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('email')}
                      placeholder="seu@email.com"
                      required
                      className="focus-ring form-input-focus"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('phone')}
                      placeholder="(64) 9 9666-6165"
                      className="focus-ring form-input-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('company')}
                      placeholder="Nome da sua empresa"
                      className="focus-ring form-input-focus"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleInputFocus('message')}
                    placeholder="Conte-nos sobre seu projeto e seus objetivos..."
                    rows={5}
                    required
                    className="focus-ring form-input-focus"
                  />
                </div>

                {/* Botões de ação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full transition-all duration-300 hover:scale-105"
                    disabled={isSubmitting}
                    onClick={() => trackQualityButtonClick('submit_button')}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send size={20} />
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    size="lg" 
                    className="w-full whatsapp-border whatsapp-text hover:whatsapp-green hover:text-white transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      trackQualityButtonClick('whatsapp_button');
                      openWhatsAppWithFormData();
                    }}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-smooth focus-ring"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Card de WhatsApp */}
            <Card className="shadow-card bg-green-600 text-white whatsapp-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-bold">WhatsApp Rápido</h3>
                </div>
                <p className="mb-6 opacity-90">
                  {isBusinessHours() 
                    ? "Estamos online agora! Clique para conversar diretamente no WhatsApp."
                    : "Fora do horário comercial. Deixe sua mensagem, responderemos assim que possível."
                  }
                </p>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white text-green-600 hover:bg-gray-100 border-white transition-all duration-300 hover:scale-105"
                    onClick={() => openWhatsApp()}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    {isBusinessHours() ? 'Conversar Agora' : 'Enviar Mensagem'}
                  </Button>
                  
                  {isBusinessHours() && (
                    <div className="flex items-center text-sm opacity-90">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      🟢 Online • Resposta em até 5 minutos
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-bold">Consultoria Gratuita</h3>
                </div>
                <p className="mb-6 opacity-90">
                  Oferecemos uma análise inicial gratuita do seu negócio e sugestões 
                  personalizadas para melhorar seus resultados.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all duration-300 hover:scale-105"
                  onClick={() => openWhatsApp("Olá! Gostaria de agendar uma consultoria gratuita para meu negócio.")}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Agendar Consultoria
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;