// <gc-header current="home"> — canonical UI Kit nav
// Renderiza nav sticky com logo, 6 links (home/sobre/recursos/meetups/empresas/contato)
// e CTA "Tornar-se membro" amber. Atributo `current` marca o link ativo.
class GcHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    const link = (id, href, label) => {
      const active = current === id ? ' class="active" aria-current="page"' : '';
      return `<a href="${href}"${active}>${label}</a>`;
    };

    this.innerHTML = `
      <nav class="nav" aria-label="Principal">
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
            <i data-lucide="arrow-up-right"></i>
          </a>
        </div>
      </nav>
    `;

    // Mobile toggle
    const toggle = this.querySelector('.nav-mobile-toggle');
    const navEl = this.querySelector('.nav');
    toggle?.addEventListener('click', () => {
      const open = navEl.getAttribute('data-mobile-open') === 'true';
      navEl.setAttribute('data-mobile-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    });

    // Hydrate Lucide icons. If the CDN isn't loaded (sub-pages without
    // the inline <script> in <head>), inject it now so the CTA icon
    // renders on every page that uses <gc-header>.
    ensureLucide(() => window.lucide && window.lucide.createIcons());
  }
}

// Idempotent Lucide loader — safe to call from header + footer + page.
function ensureLucide(onReady) {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    onReady();
    return;
  }
  const existing = document.querySelector('script[data-lucide-cdn]');
  if (existing) {
    existing.addEventListener('load', onReady, { once: true });
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js';
  s.dataset.lucideCdn = '1';
  s.async = true;
  s.addEventListener('load', onReady, { once: true });
  document.head.appendChild(s);
}

// Expose for other components / inline scripts
window.gcEnsureLucide = ensureLucide;

customElements.define('gc-header', GcHeader);
