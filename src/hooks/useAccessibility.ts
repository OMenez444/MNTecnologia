import { useEffect, useCallback, useRef } from 'react';

export const useAccessibility = () => {
  const focusableElements = useRef<HTMLElement[]>([]);

  // Função para obter todos os elementos focáveis
  const getFocusableElements = useCallback(() => {
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  }, []);

  // Função para focar no primeiro elemento
  const focusFirstElement = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  }, [getFocusableElements]);

  // Função para focar no último elemento
  const focusLastElement = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  }, [getFocusableElements]);

  // Função para navegação por teclado
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent) => {
    const elements = getFocusableElements();
    const currentIndex = elements.findIndex(el => el === document.activeElement);

    switch (event.key) {
      case 'Tab': {
        // Tab já é gerenciado pelo navegador
        break;
      }
      case 'Escape': {
        // Fecha modais ou menus abertos
        const escapeEvent = new CustomEvent('escape-pressed');
        document.dispatchEvent(escapeEvent);
        break;
      }
      case 'Enter':
      case ' ': {
        // Ativa elementos focados
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.click();
        }
        break;
      }
    }
  }, [getFocusableElements]);

  // Função para anunciar mudanças para leitores de tela
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove após um tempo
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // Função para verificar contraste de cores
  const checkColorContrast = useCallback((backgroundColor: string, textColor: string) => {
    // Implementação simplificada - em produção, use uma biblioteca como tinycolor2
    const getLuminance = (color: string) => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const [rs, gs, bs] = [r, g, b].map(c => {
        if (c <= 0.03928) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const bgLuminance = getLuminance(backgroundColor);
    const textLuminance = getLuminance(textColor);
    
    const ratio = (Math.max(bgLuminance, textLuminance) + 0.05) / 
                  (Math.min(bgLuminance, textLuminance) + 0.05);
    
    return ratio >= 4.5; // WCAG AA standard
  }, []);

  // Função para adicionar skip links
  const addSkipLinks = useCallback(() => {
    const skipLinks = [
      { href: '#main-content', text: 'Ir para o conteúdo principal' },
      { href: '#services', text: 'Ir para serviços' },
      { href: '#contact', text: 'Ir para contato' }
    ];

    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links';
    skipLinksContainer.setAttribute('role', 'navigation');
    skipLinksContainer.setAttribute('aria-label', 'Links de navegação rápida');

    skipLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      a.className = 'skip-link';
      skipLinksContainer.appendChild(a);
    });

    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }, []);

  useEffect(() => {
    // Adiciona event listeners
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Adiciona skip links
    addSkipLinks();

    // Foca no primeiro elemento quando a página carrega
    focusFirstElement();

    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, [handleKeyboardNavigation, addSkipLinks, focusFirstElement]);

  return {
    focusFirstElement,
    focusLastElement,
    announceToScreenReader,
    checkColorContrast,
    getFocusableElements
  };
};
