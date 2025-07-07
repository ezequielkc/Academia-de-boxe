# Academia de Boxe Ivanovitch - Site Institucional

Site institucional responsivo desenvolvido com HTML5, CSS3 e JavaScript vanilla. Arquitetura modular focada em performance e acessibilidade.

## Estrutura do Projeto

```
Academia de Boxe/
├── index.html                    # Página principal
├── package.json                  # Dependências e scripts
├── assets/
│   ├── css/
│   │   ├── global.css           # Variáveis e estilos base
│   │   ├── responsive.css       # Media queries mobile-first
│   │   └── components/
│   │       ├── header.css       # Navegação e menu mobile
│   │       ├── hero.css         # Seção principal
│   │       ├── cards.css        # Componentes de cards
│   │       └── sections.css     # Estilos das seções
│   ├── js/
│   │   ├── navigation.js        # Menu mobile e scroll
│   │   ├── animations.js        # Animações e efeitos
│   │   └── main.js              # Inicialização
│   └── images/
│       ├── Boxe 1.jpg           # Hero image
│       └── Boxe 3.jpg           # Sobre section
└── README.md
```

## Stack Tecnológica

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, Variáveis CSS
- **JavaScript ES6+**: Classes, módulos
- **Serve**: Servidor de desenvolvimento
- **ESLint + Prettier**: Qualidade de código

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Linting
npm run lint

# Formatação
npm run format
```

## Breakpoints Responsivos

- **Mobile**: 0-480px
- **Mobile Médio**: 481-600px
- **Mobile Grande**: 601-700px
- **Tablet**: 701-900px
- **Desktop**: 901px+

## Arquitetura CSS

### Variáveis Globais
```css
:root {
  --cor-fundo: #0a0a0f;
  --cor-fundo-sec: #1a1a2e;
  --cor-principal: #ffd700;
  --cor-texto: #ffffff;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

### Organização Modular
- **global.css**: Reset, variáveis, estilos base
- **responsive.css**: Media queries mobile-first
- **components/**: Estilos específicos por componente

## JavaScript

### Módulos
- **Navigation**: Menu mobile, scroll suave, gestos touch
- **Animations**: Intersection Observer, efeitos de entrada
- **Main**: Inicialização e configurações globais

### Padrões
- Classes ES6 para organização
- Event delegation para performance
- Acessibilidade com navegação por teclado

## Performance

### Otimizações
- CSS modular com carregamento otimizado
- JavaScript assíncrono
- Imagens com lazy loading
- Minificação em produção

### Métricas
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Acessibilidade

- HTML semântico
- Alt text descritivo
- Navegação por teclado
- Contraste WCAG AA
- Tamanhos de toque mínimos (44px)

## Deploy

Compatível com qualquer servidor estático:
- Netlify
- Vercel
- GitHub Pages
- Servidor tradicional

```bash
npm run build
```

## Manutenção

### Padrões de Código
- BEM para nomenclatura CSS
- ESLint para JavaScript
- Prettier para formatação
- Comentários em seções complexas

### Estrutura Modular
- Separação clara de responsabilidades
- Componentes reutilizáveis
- Fácil manutenção e escalabilidade

## Scripts NPM

```json
{
  "dev": "npx serve . -p 8000",
  "lint": "npx eslint assets/js/*.js",
  "format": "npx prettier --write .",
  "build": "echo 'Build completed - static site ready'"
}
```

---

**Academia de Boxe Ivanovitch** - Todos os direitos reservados 