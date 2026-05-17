// <gc-footer> — canonical UI Kit footer
// 4 colunas (Brand · Comunidade · Sobre · Empresas) + foot-bottom mono
// + linha legal secundária. Logo white, amber period no copyright.
class GcFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="gc-footer">
        <div class="wrap">
          <div class="foot-top">
            <div class="foot-brand">
              <img src="/assets/images/logo-white.svg" alt="Growth Club" height="24">
              <p>Comunidade brasileira de operadores B2B de growth. Hospedada na Level Tech, profissionalizando 11 anos de operação orgânica.</p>
            </div>

            <div class="foot-col">
              <h4>Comunidade</h4>
              <ul>
                <li><a href="/recursos/newsletter">Newsletter Substack</a></li>
                <li><a href="/recursos/comunidade">WhatsApp Community</a></li>
                <li><a href="/meetups">Próximo meetup</a></li>
                <li><a href="/recursos/livecast">Livecast</a></li>
                <li><a href="/recursos/workshops">Workshops</a></li>
              </ul>
            </div>

            <div class="foot-col">
              <h4>Sobre</h4>
              <ul>
                <li><a href="/sobre">Manifesto</a></li>
                <li><a href="/sobre#crew">Founder Crew</a></li>
                <li><a href="/sobre#imprensa">Imprensa</a></li>
                <li><a href="/contato">Contato</a></li>
              </ul>
            </div>

            <div class="foot-col">
              <h4>Empresas</h4>
              <ul>
                <li><a href="/empresas#patrocinio">Patrocinar</a></li>
                <li><a href="/empresas#vagas">Vagas</a></li>
                <li><a href="/empresas#hunting">Hunting</a></li>
                <li><a href="/empresas#mentoria">Mentoria</a></li>
              </ul>
            </div>
          </div>

          <div class="foot-bottom">
            <span>© ${year} Growth Club<span class="amber">.</span> Hospedado na Level Tech · CNPJ TBD.</span>
            <span>SÃO PAULO · BR</span>
          </div>

          <div class="foot-legal">
            <a href="/privacidade">Privacidade</a>
            <span class="sep">·</span>
            <a href="/termos">Termos</a>
            <span class="sep">·</span>
            <a href="/lgpd">LGPD</a>
            <span class="sep">·</span>
            <a href="/codigo-de-conduta">Código de Conduta</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('gc-footer', GcFooter);
