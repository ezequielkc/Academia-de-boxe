/**
 * ===== NAVEGAÇÃO MOBILE OTIMIZADA =====
 * Funcionalidades relacionadas ao menu e navegação com foco em mobile
 * Otimizado para performance
 */

class Navigation {
  constructor() {
    this.menuToggle = document.getElementById('mobile-menu');
    this.navLinks = document.querySelector('.nav-links');
    this.header = document.querySelector('header');
    this.isMenuOpen = false;
    this.isMobile = window.innerWidth <= 600;
    this.scrollTimer = null;
    this.lastScrollTop = 0;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupMenuClose();
    if (this.isMobile) {
      this.setupTouchGestures();
    }
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
    }, { passive: false });

    // Fecha menu ao clicar fora (otimizado)
    const handleOutsideClick = (e) => {
      if (this.isMenuOpen && !this.menuToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
        this.closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick, { passive: true });

    // Fecha menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    }, { passive: true });
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
      }, { passive: true });
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
      }, { passive: false });
    });
  }

  /**
   * Faz scroll suave para uma seção com offset para header fixo
   */
  scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = this.header.offsetHeight;
      const offset = headerHeight + 20; // Offset para header fixo
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Configura gestos de toque para mobile (otimizado)
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

    // Detecta movimento do swipe (otimizado)
    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      
      currentY = e.touches[0].clientY;
      const diffY = startY - currentY;
      
      // Se o usuário fizer swipe para baixo, fecha o menu
      if (diffY < -50) {
        this.closeMenu();
        isSwiping = false;
      }
    };

    // Usa throttle para melhor performance
    let touchTimer;
    const throttledTouchMove = (e) => {
      if (touchTimer) return;
      touchTimer = setTimeout(() => {
        handleTouchMove(e);
        touchTimer = null;
      }, 16);
    };

    this.navLinks.addEventListener('touchmove', throttledTouchMove, { passive: true });

    // Finaliza o swipe
    this.navLinks.addEventListener('touchend', () => {
      isSwiping = false;
    }, { passive: true });
  }

  /**
   * Configura comportamento de scroll para mobile (otimizado)
   * Header agora é sempre fixo, não precisa esconder/mostrar
   */
  setupScrollBehavior() {
    // Header fixo - não precisa de lógica de scroll
    // Mantém apenas para futuras funcionalidades se necessário
  }

  /**
   * Configura melhorias de acessibilidade
   */
  setupAccessibility() {
    // Adiciona atributos ARIA
    if (this.menuToggle) {
      this.menuToggle.setAttribute('aria-expanded', 'false');
      this.menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    }

    const updateAriaExpanded = (expanded) => {
      if (this.menuToggle) {
        this.menuToggle.setAttribute('aria-expanded', expanded.toString());
        this.menuToggle.setAttribute('aria-label', 
          expanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
        );
      }
    };

    // Atualiza ARIA quando o menu é aberto/fechado
    const originalOpenMenu = this.openMenu.bind(this);
    const originalCloseMenu = this.closeMenu.bind(this);

    this.openMenu = () => {
      originalOpenMenu();
      updateAriaExpanded(true);
    };

    this.closeMenu = () => {
      originalCloseMenu();
      updateAriaExpanded(false);
    };
  }

  /**
   * Limpa recursos para melhor performance
   */
  destroy() {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  }
}

// Inicializa a navegação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
}); 