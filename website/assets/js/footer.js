// <gc-footer> — canonical UI Kit footer, versão épica.
// Orbs decorativos + hero CTA ("última chamada") + stats da comunidade +
// 4 colunas (Brand+social · Comunidade · Sobre · Empresas) + manifesto
// pull-quote (ton-anchor) + foot-bottom mono + linha legal com link
// build-in-public. Logo white, amber period no copyright.
// Opt-out do hero CTA: <gc-footer data-cta="off"> (home e páginas de
// conversão/obrigado, pra não duplicar o closer da própria página).
// Opt-out dos stats: <gc-footer data-stats="off"> (home, que já mostra os
// mesmos números no hero).
class GcFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const showCta = this.getAttribute('data-cta') !== 'off';
    const showStats = this.getAttribute('data-stats') !== 'off';

    const heroCta = showCta ? `
          <div class="footer-hero">
            <span class="footer-hero-eye">/ Faça parte</span>
            <h2 class="footer-hero-h2">Cresça com quem <em>já passou pela curva.</em></h2>
            <p class="footer-hero-sub">Aprovação por triagem editorial. A newsletter chega antes mesmo da decisão — sem spam, sem cadência forçada.</p>
            <div class="footer-hero-actions">
              <a class="btn primary" href="/membro">Tornar-se membro <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a>
              <a class="btn ghost" href="/meetups/sp-s1-e1">Próximo meetup · 9 jul</a>
            </div>
          </div>` : '';

    const stats = showStats ? `
          <ul class="footer-stats" aria-label="Comunidade em números">
            <li><span class="footer-stat-num">2.261</span><span class="footer-stat-label">Subs Substack</span></li>
            <li><span class="footer-stat-num">715</span><span class="footer-stat-label">Ativos WhatsApp</span></li>
            <li><span class="footer-stat-num">10<small>+</small></span><span class="footer-stat-label">Meetups realizados</span></li>
            <li><span class="footer-stat-num">391</span><span class="footer-stat-label">Core group</span></li>
            <li><span class="footer-stat-num">11<small>a</small></span><span class="footer-stat-label">Desde 2015</span></li>
          </ul>` : '';

    this.innerHTML = `
      <footer class="gc-footer" data-theme="dark">
        <div class="footer-orb footer-orb-amber" aria-hidden="true"></div>
        <div class="footer-orb footer-orb-teal" aria-hidden="true"></div>
        <div class="wrap">
          ${heroCta}
          ${stats}

          <div class="foot-top">
            <div class="foot-brand">
              <img src="/assets/images/logo-white.svg" alt="Growth Club" height="24">
              <p>Comunidade brasileira de operadores B2B de growth. Hospedada na <a class="foot-inline-link" href="https://thelevel.com.br" target="_blank" rel="noopener">Level Tech</a>, profissionalizando 11 anos de operação orgânica.</p>
              <ul class="footer-social" aria-label="Redes do Growth Club">
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

          <div class="footer-manifesto">
            <span class="footer-manifesto-q" aria-hidden="true">“</span>
            <p>Franco, com número, <em>sem palco</em>, com cerveja.</p>
            <cite>Manifesto Growth Club · desde 2015</cite>
          </div>

          <div class="foot-bottom">
            <span>© ${year} Growth Club<span class="amber">.</span> Operado por Level Tecnologia da Informação Ltda · CNPJ 64.685.768/0001-29.</span>
            <span class="foot-bottom-meta">SÃO PAULO · BR</span>
          </div>

          <div class="foot-legal">
            <a href="/privacidade">Privacidade</a>
            <span class="sep">·</span>
            <a href="/termos">Termos</a>
            <span class="sep">·</span>
            <a href="/lgpd">LGPD</a>
            <span class="sep">·</span>
            <a href="/codigo-de-conduta">Código de Conduta</a>
            <a class="foot-legal-bip" href="https://github.com/henriquecaner/Growth-Club" target="_blank" rel="noopener">Build in public <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('gc-footer', GcFooter);
