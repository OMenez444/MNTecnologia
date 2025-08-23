import { useCallback } from 'react';
import { conversionLabels, conversionValues } from '@/config/googleAds';

export const useGoogleAds = () => {
  // Rastrear conversão genérica
  const trackConversion = useCallback((label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.trackGoogleAdsConversion) {
      window.trackGoogleAdsConversion(value);
    }
  }, []);

  // Rastrear clique em botão
  const trackButtonClick = useCallback((buttonName: string, value?: number) => {
    if (typeof window !== 'undefined' && window.trackGoogleAdsButtonClick) {
      window.trackGoogleAdsButtonClick(buttonName, value);
    }
  }, []);

  // Rastrear envio de formulário
  const trackFormSubmit = useCallback((formName: string, value?: number) => {
    if (typeof window !== 'undefined' && window.trackGoogleAdsFormSubmit) {
      window.trackGoogleAdsFormSubmit(formName, value);
    }
  }, []);

  // Rastrear visualização de página
  const trackPageView = useCallback((pageName: string) => {
    if (typeof window !== 'undefined' && window.trackGoogleAdsPageView) {
      window.trackGoogleAdsPageView(pageName);
    }
  }, []);

  // Rastrear conversões específicas pré-configuradas
  const trackContactForm = useCallback(() => {
    trackFormSubmit('contact_form', conversionValues.contactForm);
  }, [trackFormSubmit]);

  const trackContactButton = useCallback(() => {
    trackButtonClick('contact_button', conversionValues.contactButton);
  }, [trackButtonClick]);

  const trackStartNowButton = useCallback(() => {
    trackButtonClick('start_now_button', conversionValues.startNowButton);
  }, [trackButtonClick]);

  const trackQuoteForm = useCallback(() => {
    trackFormSubmit('quote_form', conversionValues.quoteForm);
  }, [trackFormSubmit]);

  const trackDownload = useCallback(() => {
    trackConversion(conversionLabels.download, conversionValues.download);
  }, [trackConversion]);

  const trackMeetingSchedule = useCallback(() => {
    trackConversion(conversionLabels.meetingSchedule, conversionValues.meetingSchedule);
  }, [trackConversion]);

  // Rastrear eventos personalizados
  const trackCustomEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }, []);

  // Rastrear tempo na página
  const trackTimeOnPage = useCallback((timeInSeconds: number) => {
    trackCustomEvent('time_on_page', {
      value: timeInSeconds,
      custom_parameter: 'engagement_time'
    });
  }, [trackCustomEvent]);

  // Rastrear profundidade de scroll
  const trackScrollDepth = useCallback((depth: number) => {
    trackCustomEvent('scroll_depth', {
      value: depth,
      custom_parameter: 'engagement_depth'
    });
  }, [trackCustomEvent]);

  return {
    // Funções básicas
    trackConversion,
    trackButtonClick,
    trackFormSubmit,
    trackPageView,
    
    // Funções específicas
    trackContactForm,
    trackContactButton,
    trackStartNowButton,
    trackQuoteForm,
    trackDownload,
    trackMeetingSchedule,
    
    // Funções personalizadas
    trackCustomEvent,
    trackTimeOnPage,
    trackScrollDepth,
  };
};
