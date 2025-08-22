import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
}

export const usePerformance = () => {
  const sendMetric = useCallback((name: string, value: number) => {
    // Envia métrica para Google Analytics se disponível
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        event_category: 'performance'
      });
    }
    
    // Log local para desenvolvimento
    console.log(`Performance Metric - ${name}:`, value);
  }, []);

  useEffect(() => {
    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        sendMetric('FCP', fcpEntry.startTime);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        sendMetric('LCP', lastEntry.startTime);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        sendMetric('FID', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as PerformanceEntry & { value?: number }).value || 0;
        }
      }
      sendMetric('CLS', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Cleanup
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [sendMetric]);

  // Função para medir tempo de carregamento de componentes
  const measureComponentLoad = useCallback((componentName: string) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const loadTime = end - start;
      sendMetric(`${componentName}_load_time`, loadTime);
    };
  }, [sendMetric]);

  return { measureComponentLoad };
};
