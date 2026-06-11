// <gc-header current="home"> — canonical UI Kit nav
// Sticky com brand, 6 links, chip do próximo meetup (pulse dot), CTA
// "Tornar-se membro" e barra de progresso de leitura (CSS scroll-driven).
// Mobile: painel dropdown animado com links + chip + CTA, fecha com Esc.
// Adiciona data-scrolled="true" depois do primeiro scroll pra glassmorphism subtle.
class GcHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    const link = (id, href, label) => {
      const active = current === id ? ' class="active" aria-current="page"' : '';
      return `<a href="${href}"${active}>${label}</a>`;
    };

    this.innerHTML = `
      <a class="skip-link" href="#main">Pular para o conteúdo</a>
      <nav class="nav" aria-label="Principal" data-theme="dark">
        <div class="wrap nav-inner">
          <a class="nav-brand" href="/" aria-label="Growth Club — Home">
            <img src="/assets/images/logo-white.svg" alt="Growth Club" height="22">
          </a>
          <button class="nav-mobile-toggle" aria-label="Abrir menu" aria-expanded="false" type="button">
            <span class="nav-toggle-bar" aria-hidden="true"></span>
            <span class="nav-toggle-bar" aria-hidden="true"></span>
            <span class="nav-toggle-bar" aria-hidden="true"></span>
          </button>
          <div class="nav-menu">
            <div class="nav-links">
              ${link('home',     '/',                    'Home')}
              ${link('sobre',    '/sobre',               'Sobre')}
              ${link('recursos', '/recursos/newsletter', 'Recursos')}
              ${link('meetups',  '/meetups',             'Meetups')}
              ${link('empresas', '/empresas',            'Empresas')}
              ${link('contato',  '/contato',             'Contato')}
            </div>
            <div class="nav-trailing">
              <a class="nav-meetup-chip" href="/meetups/sp-s1-e1" aria-label="Próximo meetup: S1 E1, 9 de julho, São Paulo">
                <span class="chip-dot" aria-hidden="true"></span>
                <span class="chip-label">S1·E1</span>
                <span class="chip-sep" aria-hidden="true">/</span>
                <span class="chip-value">9 JUL · SP</span>
              </a>
              <a class="nav-cta" href="/membro">
                Tornar-se membro
                <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg>
              </a>
            </div>
          </div>
        </div>
        <span class="nav-progress" aria-hidden="true"></span>
      </nav>
    `;

    const toggle = this.querySelector('.nav-mobile-toggle');
    const navEl = this.querySelector('.nav');

    const setOpen = (open) => {
      navEl.setAttribute('data-mobile-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle?.addEventListener('click', () => {
      setOpen(navEl.getAttribute('data-mobile-open') !== 'true');
    });
    // Fecha no Esc e ao navegar por um link do painel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navEl.getAttribute('data-mobile-open') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    this.querySelectorAll('.nav-menu a').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });

    let lastScrolled = false;
    const onScroll = () => {
      const scrolled = window.scrollY > 12;
      if (scrolled !== lastScrolled) {
        navEl.setAttribute('data-scrolled', String(scrolled));
        lastScrolled = scrolled;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

customElements.define('gc-header', GcHeader);
