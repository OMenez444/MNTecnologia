import { googleAdsConfig } from './googleAds';

// Configurações avançadas para otimização do Google Ads
export const googleAdsAdvancedConfig = {
  // Configurações de rastreamento de conversão
  conversionTracking: {
    // Rastrear conversões em tempo real
    realTime: true,
    
    // Rastrear conversões cross-device
    crossDevice: true,
    
    // Rastrear conversões offline
    offline: false,
    
    // Configurações de valor de conversão dinâmico
    dynamicValue: {
      enabled: true,
      currency: 'BRL',
      decimalPlaces: 2
    }
  },

  // Configurações de remarketing
  remarketing: {
    enabled: true,
    // Listas de remarketing personalizadas
    customAudiences: [
      'page_visitors',
      'form_submitters',
      'button_clickers',
      'whatsapp_users'
    ]
  },

  // Configurações de otimização de campanhas
  campaignOptimization: {
    // Otimização automática de lances
    autoBidding: true,
    
    // Otimização de horários
    timeOptimization: true,
    
    // Otimização de dispositivos
    deviceOptimization: true
  },

  // Configurações de rastreamento de qualidade
  qualityTracking: {
    // Rastrear tempo na página
    timeOnPage: true,
    
    // Rastrear profundidade de scroll
    scrollDepth: true,
    
    // Rastrear interações com elementos
    elementInteractions: true,
    
    // Rastrear saída da página
    pageExit: true,
    
    // Rastrear cliques em links externos
    externalLinks: true
  },

  // Configurações de eventos personalizados
  customEvents: {
    // Eventos de engajamento
    engagement: [
      'video_play',
      'download_start',
      'form_focus',
      'button_hover'
    ],
    
    // Eventos de conversão
    conversion: [
      'lead_generated',
      'appointment_scheduled',
      'quote_requested',
      'contact_initiated'
    ],
    
    // Eventos de navegação
    navigation: [
      'section_view',
      'menu_click',
      'search_performed',
      'filter_applied'
    ]
  },

  // Configurações de segmentação
  segmentation: {
    // Segmentar por dispositivo
    device: true,
    
    // Segmentar por localização
    location: true,
    
    // Segmentar por comportamento
    behavior: true,
    
    // Segmentar por fonte de tráfego
    trafficSource: true
  },

  // Configurações de relatórios
  reporting: {
    // Relatórios automáticos
    automated: true,
    
    // Frequência de relatórios
    frequency: 'daily',
    
    // Métricas principais
    keyMetrics: [
      'conversions',
      'conversion_rate',
      'cost_per_conversion',
      'roas',
      'click_through_rate'
    ]
  }
};

// Configurações específicas para diferentes tipos de conversão
export const conversionConfigs = {
  // Formulário de contato
  contactForm: {
    label: 'contact_form_submit',
    value: 1000, // R$ 10,00
    category: 'lead_generation',
    priority: 'high',
    count: 'once_per_session'
  },

  // Botão de contato
  contactButton: {
    label: 'contact_button_click',
    value: 500, // R$ 5,00
    category: 'engagement',
    priority: 'medium',
    count: 'multiple_per_session'
  },

  // Botão principal
  startNowButton: {
    label: 'start_now_button_click',
    value: 2000, // R$ 20,00
    category: 'conversion',
    priority: 'high',
    count: 'once_per_session'
  },

  // WhatsApp
  whatsappClick: {
    label: 'whatsapp_click',
    value: 300, // R$ 3,00
    category: 'contact',
    priority: 'medium',
    count: 'multiple_per_session'
  },

  // Formulário de orçamento
  quoteForm: {
    label: 'quote_form_submit',
    value: 1500, // R$ 15,00
    category: 'lead_generation',
    priority: 'high',
    count: 'once_per_session'
  }
};

// Configurações de rastreamento de qualidade de leads
export const leadQualityConfig = {
  // Critérios de qualidade
  criteria: {
    // Tempo mínimo na página
    minTimeOnPage: 30, // segundos
    
    // Número mínimo de interações
    minInteractions: 2,
    
    // Profundidade mínima de scroll
    minScrollDepth: 50, // porcentagem
    
    // Páginas mínimas visitadas
    minPagesViewed: 1
  },

  // Pontuação de qualidade
  scoring: {
    // Peso do tempo na página
    timeOnPageWeight: 0.3,
    
    // Peso das interações
    interactionsWeight: 0.4,
    
    // Peso da profundidade de scroll
    scrollDepthWeight: 0.2,
    
    // Peso das páginas visitadas
    pagesViewedWeight: 0.1
  },

  // Segmentação por qualidade
  segments: {
    high: { minScore: 0.8, label: 'high_quality_lead' },
    medium: { minScore: 0.5, label: 'medium_quality_lead' },
    low: { minScore: 0.0, label: 'low_quality_lead' }
  }
};

// Configurações de otimização de campanhas
export const campaignOptimizationConfig = {
  // Otimização de lances
  bidding: {
    // Estratégia de lance
    strategy: 'target_cpa',
    
    // CPA alvo
    targetCPA: 25.00, // R$ 25,00
    
    // Ajuste de lance por dispositivo
    deviceAdjustments: {
      mobile: 1.2, // 20% mais alto
      desktop: 1.0, // padrão
      tablet: 1.1 // 10% mais alto
    },
    
    // Ajuste de lance por horário
    timeAdjustments: {
      businessHours: 1.3, // 30% mais alto
      afterHours: 0.8, // 20% mais baixo
      weekends: 0.9 // 10% mais baixo
    }
  },

  // Otimização de público
  audience: {
    // Públicos similares
    lookalike: true,
    
    // Públicos personalizados
    custom: true,
    
    // Públicos in-market
    inMarket: true,
    
    // Públicos afins
    affinity: true
  }
};
