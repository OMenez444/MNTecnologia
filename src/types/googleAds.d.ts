declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    trackGoogleAdsConversion: (conversionValue?: number) => void;
    trackGoogleAdsButtonClick: (buttonName: string, conversionValue?: number) => void;
    trackGoogleAdsFormSubmit: (formName: string, conversionValue?: number) => void;
    trackGoogleAdsPageView: (pageName: string) => void;
  }
}

export interface GoogleAdsConfig {
  conversionId: string;
  conversionLabel?: string;
  enableConversionTracking?: boolean;
  enableButtonTracking?: boolean;
  enableFormTracking?: boolean;
  enablePageViewTracking?: boolean;
}

export interface ConversionEvent {
  send_to: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
}

export interface ButtonClickEvent {
  event_category: string;
  event_label: string;
  value?: number;
}

export interface FormSubmitEvent {
  event_category: string;
  event_label: string;
  value?: number;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
}
