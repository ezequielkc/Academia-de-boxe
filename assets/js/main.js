/**
 * ===== ARQUIVO PRINCIPAL =====
 * Ponto de entrada principal do JavaScript
 * Inicializa todos os módulos
 */

/**
 * Classe principal da aplicação
 */
class AcademiaApp {
  constructor() {
    this.init();
  }

  /**
   * Inicializa a aplicação
   */
  init() {
    this.setupPerformanceOptimizations();
    this.setupAccessibility();
    this.setupAnalytics();
    console.log('🎯 Academia Ivanovitch - Aplicação inicializada com sucesso!');
  }

  /**
   * Configura otimizações de performance
   */
  setupPerformanceOptimizations() {
    // Lazy loading para imagens
    this.setupLazyLoading();
    
    // Preload de recursos críticos
    this.preloadCriticalResources();
  }

  /**
   * Configura lazy loading para imagens
   */
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Preload de recursos críticos
   */
  preloadCriticalResources() {
    // Preload da fonte principal
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  }

  /**
   * Configura melhorias de acessibilidade
   */
  setupAccessibility() {
    // Adiciona skip links
    this.addSkipLinks();
    
    // Melhora navegação por teclado
    this.improveKeyboardNavigation();
  }

  /**
   * Adiciona skip links para acessibilidade
   */
  addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--cor-principal);
      color: var(--cor-fundo);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Melhora a navegação por teclado
   */
  improveKeyboardNavigation() {
    // Adiciona foco visual melhorado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  /**
   * Configura analytics básico (se necessário)
   */
  setupAnalytics() {
    // Aqui você pode adicionar Google Analytics, Facebook Pixel, etc.
    // Por enquanto, apenas logs básicos
    this.trackPageView();
  }

  /**
   * Rastreia visualização da página
   */
  trackPageView() {
    const pageData = {
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    console.log('📊 Page View:', pageData);
  }

  /**
   * Utilitário para debounce
   * @param {Function} func - Função a ser debounced
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function} - Função debounced
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utilitário para throttle
   * @param {Function} func - Função a ser throttled
   * @param {number} limit - Limite de tempo em ms
   * @returns {Function} - Função throttled
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new AcademiaApp();
});

// Exporta para uso em outros módulos (se necessário)
window.AcademiaApp = AcademiaApp; 