import { useEffect, useState, useCallback, useRef } from 'react';
import { leadQualityConfig } from '@/config/googleAdsAdvanced';
import { useGoogleAds } from './useGoogleAds';

interface LeadQualityMetrics {
  timeOnPage: number;
  interactions: number;
  scrollDepth: number;
  pagesViewed: number;
  score: number;
  segment: 'high' | 'medium' | 'low';
}

export const useLeadQuality = () => {
  const [metrics, setMetrics] = useState<LeadQualityMetrics>({
    timeOnPage: 0,
    interactions: 0,
    scrollDepth: 0,
    pagesViewed: 1,
    score: 0,
    segment: 'low'
  });

  const [isTracking, setIsTracking] = useState(false);
  const startTime = useRef<number>(Date.now());
  const interactionCount = useRef<number>(0);
  const maxScrollDepth = useRef<number>(0);
  const { trackCustomEvent } = useGoogleAds();

  // Rastrear tempo na página
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeOnPage = Math.floor((currentTime - startTime.current) / 1000);
      
      setMetrics(prev => ({
        ...prev,
        timeOnPage
      }));

      // Rastrear marcos de tempo importantes
      if (timeOnPage === 30) {
        trackCustomEvent('time_milestone', { milestone: '30_seconds', value: 30 });
      }
      if (timeOnPage === 60) {
        trackCustomEvent('time_milestone', { milestone: '1_minute', value: 60 });
      }
      if (timeOnPage === 120) {
        trackCustomEvent('time_milestone', { milestone: '2_minutes', value: 120 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, trackCustomEvent]);

  // Rastrear profundidade de scroll
  const trackScrollDepth = useCallback(() => {
    if (!isTracking) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercent;
      
      setMetrics(prev => ({
        ...prev,
        scrollDepth: scrollPercent
      }));

      // Rastrear marcos de scroll importantes
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackCustomEvent('scroll_milestone', { milestone: '25_percent', value: 25 });
      }
      if (scrollPercent >= 50 && scrollPercent < 75) {
        trackCustomEvent('scroll_milestone', { milestone: '50_percent', value: 50 });
      }
      if (scrollPercent >= 75) {
        trackCustomEvent('scroll_milestone', { milestone: '75_percent', value: 75 });
      }
    }
  }, [isTracking, trackCustomEvent]);

  // Rastrear interações
  const trackInteraction = useCallback((type: string, element?: string) => {
    if (!isTracking) return;

    interactionCount.current += 1;
    
    setMetrics(prev => ({
      ...prev,
      interactions: interactionCount.current
    }));

    // Rastrear tipo de interação
    trackCustomEvent('user_interaction', {
      interaction_type: type,
      element: element || 'unknown',
      interaction_count: interactionCount.current
    });
  }, [isTracking, trackCustomEvent]);

  // Calcular pontuação de qualidade
  const calculateQualityScore = useCallback((currentMetrics: LeadQualityMetrics) => {
    const { criteria, scoring } = leadQualityConfig;
    
    let score = 0;
    
    // Pontuação por tempo na página
    if (currentMetrics.timeOnPage >= criteria.minTimeOnPage) {
      score += scoring.timeOnPageWeight;
    }
    
    // Pontuação por interações
    if (currentMetrics.interactions >= criteria.minInteractions) {
      score += scoring.interactionsWeight;
    }
    
    // Pontuação por profundidade de scroll
    if (currentMetrics.scrollDepth >= criteria.minScrollDepth) {
      score += scoring.scrollDepthWeight;
    }
    
    // Pontuação por páginas visitadas
    if (currentMetrics.pagesViewed >= criteria.minPagesViewed) {
      score += scoring.pagesViewedWeight;
    }
    
    return Math.min(score, 1); // Máximo de 1.0
  }, []);

  // Determinar segmento de qualidade
  const determineSegment = useCallback((score: number) => {
    const { segments } = leadQualityConfig;
    
    if (score >= segments.high.minScore) return 'high';
    if (score >= segments.medium.minScore) return 'medium';
    return 'low';
  }, []);

  // Atualizar métricas e calcular pontuação
  useEffect(() => {
    const score = calculateQualityScore(metrics);
    const segment = determineSegment(score);
    
    setMetrics(prev => ({
      ...prev,
      score,
      segment
    }));

    // Rastrear mudança de segmento
    if (metrics.segment !== segment) {
      trackCustomEvent('quality_segment_change', {
        previous_segment: metrics.segment,
        new_segment: segment,
        score: score
      });
    }
  }, [metrics.timeOnPage, metrics.interactions, metrics.scrollDepth, metrics.pagesViewed, calculateQualityScore, determineSegment, trackCustomEvent, metrics.segment]);

  // Iniciar rastreamento
  const startTracking = useCallback(() => {
    setIsTracking(true);
    startTime.current = Date.now();
    interactionCount.current = 0;
    maxScrollDepth.current = 0;
    
    // Rastrear início do rastreamento
    trackCustomEvent('lead_quality_tracking_started', {
      timestamp: new Date().toISOString(),
      page_url: window.location.href
    });
  }, [trackCustomEvent]);

  // Parar rastreamento
  const stopTracking = useCallback(() => {
    setIsTracking(false);
    
    // Rastrear final do rastreamento
    trackCustomEvent('lead_quality_tracking_stopped', {
      final_metrics: metrics,
      total_time: metrics.timeOnPage,
      final_score: metrics.score,
      final_segment: metrics.segment
    });
  }, [trackCustomEvent, metrics]);

  // Rastrear visualização de seção
  const trackSectionView = useCallback((sectionName: string) => {
    if (!isTracking) return;

    setMetrics(prev => ({
      ...prev,
      pagesViewed: prev.pagesViewed + 1
    }));

    trackCustomEvent('section_viewed', {
      section_name: sectionName,
      total_sections: metrics.pagesViewed + 1
    });
  }, [isTracking, trackCustomEvent, metrics.pagesViewed]);

  // Rastrear foco em formulário
  const trackFormFocus = useCallback((formName: string) => {
    trackInteraction('form_focus', formName);
  }, [trackInteraction]);

  // Rastrear clique em botão
  const trackButtonClick = useCallback((buttonName: string) => {
    trackInteraction('button_click', buttonName);
  }, [trackInteraction]);

  // Rastrear hover em elementos
  const trackElementHover = useCallback((elementName: string) => {
    trackInteraction('element_hover', elementName);
  }, [trackInteraction]);

  // Rastrear saída da página
  const trackPageExit = useCallback(() => {
    if (!isTracking) return;

    trackCustomEvent('page_exit', {
      final_metrics: metrics,
      total_time: metrics.timeOnPage,
      final_score: metrics.score,
      final_segment: metrics.segment,
      exit_url: document.referrer || 'direct'
    });
  }, [isTracking, trackCustomEvent, metrics]);

  // Configurar listeners de eventos
  useEffect(() => {
    if (!isTracking) return;

    // Listener de scroll
    const handleScroll = () => trackScrollDepth();
    window.addEventListener('scroll', handleScroll);

    // Listener de saída da página
    const handleBeforeUnload = () => trackPageExit();
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Listener de mudança de página
    const handlePageHide = () => trackPageExit();
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [isTracking, trackScrollDepth, trackPageExit]);

  return {
    // Estado
    metrics,
    isTracking,
    
    // Controles
    startTracking,
    stopTracking,
    
    // Rastreamento de eventos
    trackSectionView,
    trackFormFocus,
    trackButtonClick,
    trackElementHover,
    trackInteraction,
    
    // Utilitários
    getQualityScore: () => metrics.score,
    getQualitySegment: () => metrics.segment,
    isHighQualityLead: () => metrics.segment === 'high'
  };
};
