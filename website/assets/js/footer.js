// <gc-footer> — canonical UI Kit footer
// Hero CTA · Stats · 4 colunas · Manifesto pull · Social · Meta legal
class GcFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="gc-footer" data-theme="dark">
        <div aria-hidden="true" class="footer-orb footer-orb-amber"></div>
        <div aria-hidden="true" class="footer-orb footer-orb-teal"></div>

        <div class="wrap">

          <section class="footer-hero">
            <span class="footer-hero-eye">/ Candidatura por triagem · sem palco · sem hype</span>
            <h2 class="footer-hero-h2">Entra pra <em>mesa de canto.</em></h2>
            <p class="footer-hero-sub">Newsletter quinzenal, WhatsApp Community com 715 ativos, meetups com case aberto. A elite do mercado opera aqui, em conversa direta com a sua.</p>
            <div class="footer-hero-actions">
              <a class="btn primary" href="/membro">
                Faça parte
                <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg>
              </a>
              <a class="btn ghost" href="/meetups/sp-s1-e1">Próximo meetup · 9 jul · CRMBonus</a>
            </div>
          </section>

          <ul class="footer-stats" aria-label="Comunidade em números">
            <li><span class="footer-stat-num">2.261</span><span class="footer-stat-label">Subs Substack</span></li>
            <li><span class="footer-stat-num">715</span><span class="footer-stat-label">WhatsApp Community</span></li>
            <li><span class="footer-stat-num">391</span><span class="footer-stat-label">Core group</span></li>
            <li><span class="footer-stat-num">10<small>+</small></span><span class="footer-stat-label">Meetups realizados</span></li>
            <li><span class="footer-stat-num">11<small>a</small></span><span class="footer-stat-label">Desde 2015</span></li>
          </ul>

          <div class="foot-top">
            <div class="foot-brand">
              <img src="/assets/images/logo-white.svg" alt="Growth Club" height="28">
              <p>Comunidade brasileira de operadores B2B de growth. Operada por <a href="/sobre#crew" class="foot-inline-link">Level Tech</a> em Fase 1, profissionalizando 11 anos de operação orgânica.</p>
              <ul class="footer-social" aria-label="Redes sociais">
                <li><a href="https://brgrowthclub.substack.com" target="_blank" rel="noopener">Substack <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a></li>
                <li><a href="https://www.linkedin.com/in/henriquecaner/" target="_blank" rel="noopener">LinkedIn <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a></li>
                <li><a href="https://github.com/henriquecaner/Growth-Club" target="_blank" rel="noopener">GitHub <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a></li>
              </ul>
            </div>

            <div class="foot-col">
              <h4>Comunidade</h4>
              <ul>
                <li><a href="/recursos/newsletter">Newsletter Substack</a></li>
                <li><a href="/recursos/comunidade">WhatsApp Community</a></li>
                <li><a href="/meetups">Próximo meetup</a></li>
                <li><a href="/recursos/livecast">Livecast</a></li>
                <li><a href="/recursos/workshops">Workshops</a></li>
                <li><a href="/ai-like-a-pro/">AI LIKE A PRO</a></li>
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

          <blockquote class="footer-manifesto">
            <span class="footer-manifesto-q" aria-hidden="true">"</span>
            <p>Se não tem número, <em>não é Growth Club.</em></p>
            <cite>— régua editorial #1, desde 2015</cite>
          </blockquote>

          <div class="foot-bottom">
            <span class="foot-bottom-legal">© ${year} Growth Club<span class="amber">.</span> Operado por Level Tecnologia da Informação Ltda · CNPJ 64.685.768/0001-29.</span>
            <span class="foot-bottom-meta">S1 · 2026 · SÃO PAULO · BR</span>
          </div>

          <div class="foot-legal">
            <a href="/privacidade">Privacidade</a>
            <span class="sep">·</span>
            <a href="/termos">Termos</a>
            <span class="sep">·</span>
            <a href="/lgpd">LGPD</a>
            <span class="sep">·</span>
            <a href="/codigo-de-conduta">Código de Conduta</a>
            <span class="sep">·</span>
            <a href="https://github.com/henriquecaner/Growth-Club" target="_blank" rel="noopener" class="foot-legal-bip">Build in public <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a>
          </div>

        </div>
      </footer>
    `;
  }
}

customElements.define('gc-footer', GcFooter);
