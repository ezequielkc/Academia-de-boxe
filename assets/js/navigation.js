/**
 * ===== NAVEGAÇÃO MOBILE OTIMIZADA =====
 * Funcionalidades relacionadas ao menu e navegação com foco em mobile
 */

class Navigation {
  constructor() {
    this.menuToggle = document.getElementById('mobile-menu');
    this.navLinks = document.querySelector('.nav-links');
    this.header = document.querySelector('header');
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupMenuClose();
    this.setupTouchGestures();
    this.setupScrollBehavior();
    this.setupAccessibility();
  }

  /**
   * Configura o menu mobile com melhor UX
   */
  setupMobileMenu() {
    if (!this.menuToggle) return;

    this.menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !this.menuToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Fecha menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  /**
   * Alterna o estado do menu mobile com animação
   */
  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Abre o menu mobile
   */
  openMenu() {
    this.navLinks.classList.add('active');
    this.menuToggle.classList.add('active');
    this.isMenuOpen = true;
    
    // Previne scroll do body
    document.body.style.overflow = 'hidden';
    
    // Foca no primeiro link para acessibilidade
    const firstLink = this.navLinks.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  /**
   * Fecha o menu mobile
   */
  closeMenu() {
    this.navLinks.classList.remove('active');
    this.menuToggle.classList.remove('active');
    this.isMenuOpen = false;
    
    // Restaura scroll do body
    document.body.style.overflow = '';
    
    // Foca no toggle para acessibilidade
    this.menuToggle.focus();
  }

  /**
   * Fecha o menu ao clicar em um link
   */
  setupMenuClose() {
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Pequeno delay para permitir que o usuário veja o clique
        setTimeout(() => {
          this.closeMenu();
        }, 100);
      });
    });
  }

  /**
   * Configura scroll suave otimizado para mobile
   */
  setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        this.scrollToSection(targetId);
      });
    });
  }

  /**
   * Faz scroll suave para uma seção com offset mobile
   */
  scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = this.header.offsetHeight;
      const isMobile = window.innerWidth <= 600;
      const offset = isMobile ? headerHeight + 10 : headerHeight + 20;
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Configura gestos de toque para mobile
   */
  setupTouchGestures() {
    let startY = 0;
    let currentY = 0;
    let isSwiping = false;

    // Detecta início do swipe
    this.navLinks.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    // Detecta movimento do swipe
    this.navLinks.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      
      currentY = e.touches[0].clientY;
      const diffY = startY - currentY;
      
      // Se o usuário fizer swipe para baixo, fecha o menu
      if (diffY < -50) {
        this.closeMenu();
        isSwiping = false;
      }
    }, { passive: true });

    // Finaliza o swipe
    this.navLinks.addEventListener('touchend', () => {
      isSwiping = false;
    }, { passive: true });
  }

  /**
   * Configura comportamento de scroll para mobile
   */
  setupScrollBehavior() {
    let lastScrollTop = 0;
    const scrollThreshold = 10;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Esconde/mostra header baseado na direção do scroll
      if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scroll para baixo - esconde header
          this.header.style.transform = 'translateY(-100%)';
        } else {
          // Scroll para cima - mostra header
          this.header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
      }
    }, { passive: true });
  }

  /**
   * Configura melhorias de acessibilidade
   */
  setupAccessibility() {
    // Adiciona atributos ARIA
    this.menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.setAttribute('aria-controls', 'nav-links');
    
    this.navLinks.setAttribute('id', 'nav-links');
    this.navLinks.setAttribute('role', 'navigation');
    this.navLinks.setAttribute('aria-label', 'Menu principal');

    // Atualiza aria-expanded quando o menu é aberto/fechado
    const updateAriaExpanded = (expanded) => {
      this.menuToggle.setAttribute('aria-expanded', expanded.toString());
    };

    // Observa mudanças na classe active
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isActive = this.navLinks.classList.contains('active');
          updateAriaExpanded(isActive);
        }
      });
    });

    observer.observe(this.navLinks, { attributes: true });
  }
}

// Inicializa a navegação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
}); 