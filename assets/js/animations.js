/**
 * ===== ANIMAÇÕES =====
 * Funcionalidades relacionadas a animações e efeitos visuais
 */

class Animations {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
  }

  /**
   * Configura o Intersection Observer para animações de entrada
   */
  setupIntersectionObserver() {
    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);

    // Observa todos os cards
    const cards = document.querySelectorAll('.treino-card, .equipe-card, .plano-card, .depoimento-card');
    cards.forEach(card => {
      this.observer.observe(card);
    });
  }

  /**
   * Anima um elemento quando ele entra na viewport
   * @param {HTMLElement} element - Elemento a ser animado
   */
  animateElement(element) {
    element.classList.add('show');
    
    // Adiciona delay escalonado para elementos em grid
    const siblings = element.parentElement.children;
    const index = Array.from(siblings).indexOf(element);
    
    if (index > 0) {
      element.style.transitionDelay = `${index * 0.1}s`;
    }
  }

  /**
   * Configura animações baseadas no scroll
   */
  setupScrollAnimations() {
    let ticking = false;

    const updateOnScroll = () => {
      this.updateParallax();
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  /**
   * Atualiza efeitos parallax (se houver)
   */
  updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  /**
   * Adiciona efeito de hover suave aos cards
   */
  setupHoverEffects() {
    const cards = document.querySelectorAll('.card, .treino-card, .equipe-card, .plano-card, .depoimento-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addHoverEffect(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeHoverEffect(card);
      });
    });
  }

  /**
   * Adiciona efeito de hover a um elemento
   * @param {HTMLElement} element - Elemento a receber o efeito
   */
  addHoverEffect(element) {
    element.style.transform = 'translateY(-5px) scale(1.02)';
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
   * Anima números em contadores (se houver)
   */
  animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.counter);
      const duration = 2000; // 2 segundos
      const step = target / (duration / 16); // 60fps
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
}

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Animations();
}); 