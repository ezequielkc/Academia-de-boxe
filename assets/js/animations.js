/**
 * ===== ANIMAÇÕES OTIMIZADAS =====
 * Funcionalidades relacionadas a animações e efeitos visuais
 * Otimizado para performance mobile
 */

class Animations {
  constructor() {
    this.observer = null;
    this.isMobile = window.innerWidth <= 600;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    // Remove animações de scroll pesadas no mobile
    if (!this.isMobile) {
      this.setupScrollAnimations();
    }
  }

  /**
   * Configura o Intersection Observer otimizado para mobile
   */
  setupIntersectionObserver() {
    const options = {
      threshold: this.isMobile ? 0.1 : 0.15, // Threshold menor no mobile
      rootMargin: this.isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          // Para de observar após animar (melhora performance)
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observa apenas cards visíveis inicialmente
    this.observeVisibleCards();
  }

  /**
   * Observa apenas cards que estão próximos da viewport
   */
  observeVisibleCards() {
    const cards = document.querySelectorAll('.treino-card, .equipe-card, .plano-card, .depoimento-card');
    
    cards.forEach((card, index) => {
      // Adiciona delay escalonado para evitar sobrecarga
      setTimeout(() => {
        this.observer.observe(card);
      }, index * 50); // 50ms entre cada observador
    });
  }

  /**
   * Anima um elemento quando ele entra na viewport
   * @param {HTMLElement} element - Elemento a ser animado
   */
  animateElement(element) {
    // Usa CSS classes em vez de manipulação direta do DOM
    element.classList.add('show');
    
    // Remove delay escalonado no mobile para melhor performance
    if (!this.isMobile) {
      const siblings = element.parentElement.children;
      const index = Array.from(siblings).indexOf(element);
      
      if (index > 0) {
        element.style.transitionDelay = `${index * 0.05}s`; // Reduzido de 0.1s para 0.05s
      }
    }
  }

  /**
   * Configura animações baseadas no scroll (apenas desktop)
   */
  setupScrollAnimations() {
    let ticking = false;
    let lastScrollY = 0;

    const updateOnScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      // Só atualiza se houve mudança significativa
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        this.updateParallax(currentScrollY);
        lastScrollY = currentScrollY;
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    // Usa throttle para melhor performance
    let throttleTimer;
    const throttledScroll = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        requestTick();
        throttleTimer = null;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
  }

  /**
   * Atualiza efeitos parallax (otimizado)
   */
  updateParallax(scrollY) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      
      // Usa transform3d para forçar aceleração de hardware
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  /**
   * Adiciona efeito de hover suave aos cards (otimizado)
   */
  setupHoverEffects() {
    // Remove efeitos de hover no mobile para melhor performance
    if (this.isMobile) return;

    const cards = document.querySelectorAll('.card, .treino-card, .equipe-card, .plano-card, .depoimento-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addHoverEffect(card);
      }, { passive: true });
      
      card.addEventListener('mouseleave', () => {
        this.removeHoverEffect(card);
      }, { passive: true });
    });
  }

  /**
   * Adiciona efeito de hover a um elemento (otimizado)
   * @param {HTMLElement} element - Elemento a receber o efeito
   */
  addHoverEffect(element) {
    // Usa transform3d para aceleração de hardware
    element.style.transform = 'translate3d(0, -5px, 0) scale(1.02)';
    element.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
  }

  /**
   * Remove efeito de hover de um elemento
   * @param {HTMLElement} element - Elemento a ter o efeito removido
   */
  removeHoverEffect(element) {
    element.style.transform = '';
    element.style.boxShadow = '';
  }

  /**
   * Anima números em contadores (otimizado)
   */
  animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.counter);
      const duration = this.isMobile ? 1500 : 2000; // Mais rápido no mobile
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }

  /**
   * Limpa recursos para melhor performance
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Animations();
}); 