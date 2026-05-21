// <gc-header current="home"> — canonical UI Kit nav
// Renderiza nav sticky com logo, 6 links e CTA "Tornar-se membro".
// Ícones consumidos do sprite estático em /assets/icons.svg (sem CDN runtime).
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
          <a class="nav-logo" href="/" aria-label="Growth Club — Home">
            <img src="/assets/images/logo-white.svg" alt="Growth Club" height="22">
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
          <a class="nav-cta" href="/membro">
            Tornar-se membro
            <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg>
          </a>
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
  }
}

customElements.define('gc-header', GcHeader);
