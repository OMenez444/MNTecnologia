import { GoogleAdsConfig } from '@/types/googleAds';

// Configuração do Google Ads
export const googleAdsConfig: GoogleAdsConfig = {
  // ID da conta do Google Ads (substitua pelo seu ID real)
  conversionId: '17502414849',
  
  // Label de conversão (opcional - configure no Google Ads)
  conversionLabel: 'lead_form',
  
  // Habilitar rastreamento de conversões
  enableConversionTracking: true,
  
  // Habilitar rastreamento de cliques em botões
  enableButtonTracking: true,
  
  // Habilitar rastreamento de envio de formulários
  enableFormTracking: true,
  
  // Habilitar rastreamento de visualizações de página
  enablePageViewTracking: true,
};

// Configurações específicas para diferentes tipos de conversão
export const conversionLabels = {
  // Formulário de contato
  contactForm: 'contact_form_submit',
  
  // Botão "Fale Conosco"
  contactButton: 'contact_button_click',
  
  // Botão "Começar Agora"
  startNowButton: 'start_now_button_click',
  
  // Formulário de orçamento
  quoteForm: 'quote_form_submit',
  
  // Download de material
  download: 'material_download',
  
  // Agendamento de reunião
  meetingSchedule: 'meeting_scheduled',
};

// Valores de conversão sugeridos (em centavos)
export const conversionValues = {
  contactForm: 1000, // R$ 10,00
  contactButton: 500, // R$ 5,00
  startNowButton: 2000, // R$ 20,00
  quoteForm: 1500, // R$ 15,00
  download: 300, // R$ 3,00
  meetingSchedule: 5000, // R$ 50,00
};

// Configurações de eventos personalizados
export const customEvents = {
  // Rastreamento de tempo na página
  timeOnPage: 'time_on_page',
  
  // Rastreamento de scroll
  scrollDepth: 'scroll_depth',
  
  // Rastreamento de interação com elementos
  elementInteraction: 'element_interaction',
  
  // Rastreamento de saída da página
  pageExit: 'page_exit',
};
