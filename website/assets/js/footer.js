class GcFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="gc-footer">
        <div class="container gc-footer-grid">

          <div class="gc-footer-col">
            <h4>Clube</h4>
            <ul>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/sobre#crew">Founder Crew</a></li>
              <li><a href="/sobre#imprensa">Imprensa</a></li>
            </ul>
          </div>

          <div class="gc-footer-col">
            <h4>Recursos</h4>
            <ul>
              <li><a href="/recursos/newsletter">Newsletter</a></li>
              <li><a href="/recursos/aulas">Aulas</a></li>
              <li><a href="/recursos/livecast">Livecast</a></li>
              <li><a href="/recursos/workshops">Workshops</a></li>
              <li><a href="/recursos/comunidade">Comunidade</a></li>
            </ul>
          </div>

          <div class="gc-footer-col">
            <h4>Empresas</h4>
            <ul>
              <li><a href="/empresas">Visão geral</a></li>
              <li><a href="/empresas#patrocinio">Patrocinar</a></li>
              <li><a href="/empresas#vagas">Vagas</a></li>
              <li><a href="/empresas#hunting">Hunting</a></li>
              <li><a href="/empresas#mentoria">Mentoria</a></li>
            </ul>
          </div>

          <div class="gc-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacidade">Privacidade</a></li>
              <li><a href="/termos">Termos</a></li>
              <li><a href="/lgpd">LGPD</a></li>
              <li><a href="/codigo-de-conduta">Código de Conduta</a></li>
            </ul>
          </div>

          <div class="gc-footer-col">
            <h4>Contato</h4>
            <ul>
              <li><a href="mailto:parceiros@growthclub.pro">parceiros@</a></li>
              <li><a href="mailto:contato@growthclub.pro">contato@</a></li>
              <li><a href="https://growthclub.substack.com" target="_blank" rel="noopener">Substack</a></li>
              <li><a href="https://github.com/henriquecaner/Growth-Club" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>

        </div>
        <div class="container">
          <div class="gc-footer-bottom">
            © 2015–${year} Growth Club · CNPJ Level Tech · Manifesto vivo desde 2015.
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('gc-footer', GcFooter);
