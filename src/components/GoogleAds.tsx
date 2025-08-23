import { useEffect } from 'react';

interface GoogleAdsProps {
  conversionId: string;
  conversionLabel?: string;
}

const GoogleAds = ({ conversionId, conversionLabel }: GoogleAdsProps) => {
  useEffect(() => {
    // Carrega o script do Google Ads
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=AW-${conversionId}`;
    document.head.appendChild(script);

    // Inicializa o gtag para Google Ads
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', `AW-${conversionId}`);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [conversionId]);

  // Função para rastrear conversões
  const trackConversion = (conversionValue?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `AW-${conversionId}/${conversionLabel}`,
        value: conversionValue,
        currency: 'BRL'
      });
    }
  };

  // Função para rastrear cliques em botões
  const trackButtonClick = (buttonName: string, conversionValue?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'button',
        event_label: buttonName,
        value: conversionValue
      });
      
      // Rastreia conversão se houver label
      if (conversionLabel) {
        trackConversion(conversionValue);
      }
    }
  };

  // Função para rastrear envio de formulário
  const trackFormSubmit = (formName: string, conversionValue?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'form',
        event_label: formName,
        value: conversionValue
      });
      
      // Rastreia conversão se houver label
      if (conversionLabel) {
        trackConversion(conversionValue);
      }
    }
  };

  // Função para rastrear visualizações de página
  const trackPageView = (pageName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
  };

  // Expõe as funções de rastreamento globalmente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackGoogleAdsConversion = trackConversion;
      (window as any).trackGoogleAdsButtonClick = trackButtonClick;
      (window as any).trackGoogleAdsFormSubmit = trackFormSubmit;
      (window as any).trackGoogleAdsPageView = trackPageView;
    }
  }, [conversionId, conversionLabel]);

  return null;
};

export default GoogleAds;
