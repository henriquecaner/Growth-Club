// <gc-header current="home">  — uso: define qual nav item está ativo
class GcHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    this.innerHTML = `
      <header class="gc-header">
        <div class="container gc-header-inner">
          <a href="/" class="gc-logo" aria-label="Growth Club">
            <img src="/assets/images/logo.svg" alt="Growth Club" width="120" height="24">
          </a>
          <button class="gc-mobile-toggle" aria-label="Abrir menu" type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <rect x="2" y="4" width="16" height="2"/>
              <rect x="2" y="9" width="16" height="2"/>
              <rect x="2" y="14" width="16" height="2"/>
            </svg>
          </button>
          <nav aria-label="Principal">
            <a href="/" ${current === 'home' ? 'aria-current="page"' : ''}>Home</a>
            <a href="/sobre" ${current === 'sobre' ? 'aria-current="page"' : ''}>Sobre</a>
            <a href="/recursos/newsletter" ${current === 'recursos' ? 'aria-current="page"' : ''}>Recursos</a>
            <a href="/meetups" ${current === 'meetups' ? 'aria-current="page"' : ''}>Meetups</a>
            <a href="/empresas" ${current === 'empresas' ? 'aria-current="page"' : ''}>Empresas</a>
            <a href="/contato" ${current === 'contato' ? 'aria-current="page"' : ''}>Contato</a>
            <a href="/membro" class="gc-nav-cta" ${current === 'membro' ? 'aria-current="page"' : ''}>Tornar-se Membro</a>
          </nav>
        </div>
      </header>
    `;

    const toggle = this.querySelector('.gc-mobile-toggle');
    const headerEl = this.querySelector('.gc-header');
    toggle?.addEventListener('click', () => {
      const open = headerEl.getAttribute('data-mobile-open') === 'true';
      headerEl.setAttribute('data-mobile-open', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    });
  }
}

customElements.define('gc-header', GcHeader);
