// <gc-header current="home"> — canonical UI Kit nav
// Sticky com brand+tagline, 6 links, chip do próximo meetup, CTA "Tornar-se membro".
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
            <span class="nav-brand-tagline">#1 Growth Multidisciplinar</span>
          </a>
          <button class="nav-mobile-toggle" aria-label="Abrir menu" aria-expanded="false" type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <rect x="2" y="4" width="16" height="2"/>
              <rect x="2" y="9" width="16" height="2"/>
              <rect x="2" y="14" width="16" height="2"/>
            </svg>
          </button>
          <div class="nav-links">
            ${link('home',     '/',                    'Home')}
            ${link('sobre',    '/sobre',               'Sobre')}
            ${link('recursos', '/recursos/newsletter', 'Recursos')}
            ${link('meetups',  '/meetups',             'Meetups')}
            ${link('empresas', '/empresas',            'Empresas')}
            ${link('contato',  '/contato',             'Contato')}
          </div>
          <div class="nav-trailing">
            <a class="nav-meetup-chip" href="/meetups/sp-s1-e1" aria-label="Próximo meetup: 9 de julho de 2026">
              <span class="chip-dot" aria-hidden="true"></span>
              <span class="chip-label">Próximo</span>
              <span class="chip-sep" aria-hidden="true">·</span>
              <span class="chip-value">9 jul · CRMBonus</span>
            </a>
            <a class="nav-cta" href="/membro">
              Tornar-se membro
              <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg>
            </a>
          </div>
        </div>
      </nav>
    `;

    const toggle = this.querySelector('.nav-mobile-toggle');
    const navEl = this.querySelector('.nav');
    toggle?.addEventListener('click', () => {
      const open = navEl.getAttribute('data-mobile-open') === 'true';
      navEl.setAttribute('data-mobile-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
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
