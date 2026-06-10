# STATE: Growth Club
**Last Updated:** 2026-05-25

> **AI CONTEXT:** Append-only log of decisions, blockers, risks, and lessons learned. Never overwrite past entries.

---

## Recent Decisions (ADR)

### AD-022: Termo canonical da audiência é "especialista" — proibido "operador"
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Voz Growth Club desde refino AD-011 usava "operador B2B" pra descrever audiência/membros (newsletter, Community, meetups). Funcional, mas mecânico — não conecta com arquétipo Hero+Magician (AD-014) nem com posicionamento multidisciplinar (AD-015). A home já usava "44 especialistas convidados" no grid de meetups passados, criando inconsistência interna (especialista no grid, operador no resto).

**Decision:** Termo canonical pra qualquer descrição de membro, audiência ou convidado é **"especialista"**. "Operador" só permanece em contextos jurídicos ("operados por Level Tech", "operacional"). Aplicada substituição site-wide via Python regex `\boperador(es)?\b` → "especialista(s)": 28 substituições em 13 arquivos HTML.

**Consequences:**
- Coerência interna: home, sobre, meetups, recursos, código de conduta usam "especialista" uniformemente.
- Falsos positivos preservados: "operadora" (Level Tech), "operacional" (logística), "operação" (processo) — `\b` regex preserva.
- ~120 ocorrências de "operador" em `docs/`, `brand/`, `.specs/` ficam pendentes — B-001 cobre.

---

### AD-021: "Mesa de canto" removido como metáfora editorial
**Date:** 2026-05-25
**Status:** Accepted

**Context:** O termo "mesa de canto" aparecia em 10 lugares no site (H1 membro, H1 historico, kicker meetups, H2 do meetup S1E1, OG descriptions). Foi cunhado como pitch editorial mas tem problema semântico: "ficar de canto" é experiência negativa, oposto de troca ativa. Henrique flagou: "INGUEM GOSTA DE FICAR DE CANTO NUMA MESA DE CANTO."

**Decision:** Remoção integral. Substituído por linguagem do pitch padrão da home:
- "comunidade" / "comunidade Growth Club"
- "especialista com especialista"
- "conversa entre pares"

10 substituições em 7 arquivos. Memory file [[feedback-mesa-de-canto-proibida]] criada com a regra.

**Consequences:** Pitch fica coerente com o resto da home. Sem mais metáfora confusa de "ficar de canto". Próxima reescrita de prosa deve usar exclusivamente o vocabulário canonical.

---

### AD-020: Tier pago Master removido do site público
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Site referenciava em vários lugares o futuro tier Growth Hacker Master (R$ 690 early / R$ 990 regular, gatilho 2027). Em estágio orgânico atual (newsletter grátis, Community grátis, AMAs grátis), expor preço futuro de tier de membership cria fricção na conversão pra newsletter. Henrique: "isso pode assustar as pessoas".

**Decision:** Remoção de todas as menções a tier pago Master da copy pública. Reescrita de FAQ "Quanto custa fazer parte?" pra "Nada. Newsletter/Community/AMAs grátis." Removido tier-card de `/membro`, FAQ "Quando abre o Master?", roadmap card "Master + escala", AMAs reference de preço, OG description, meta-row "TIER ATUAL · MASTER 2027". Renomeada seção de Termos "Quando tier pago abrir" → "Produtos pagos avulsos".

**Consequences:**
- Site só mostra: newsletter grátis + Community grátis + AMAs grátis + workshops pagos avulsos (AI LIKE A PRO) + ingressos pagos de meetup (lotes anunciados antes de cada edição).
- AD-003 (Founder Member parqueado) e dados internos do Master continuam em STATE.md como histórico, mas não viram copy pública.
- Memory file [[feedback-tier-pago-nao-aparece]] criada com a regra.

---

### AD-019: Meetup S1·E1 reset — Barte parqueado, CRMBonus em 9 jul 2026
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Edição original prevista (Meetup Growth SP · S1 · E1 · Revenue Operations com IA @ Barte, jun/2026) foi adiada sine die por mudança de hospedagem. CRMBonus cedeu o espaço pra primeira edição da Era S1 acontecer.

**Decision:** Reset completo da página `/meetups/sp-s1-e1`:
- **Data:** 9 de julho de 2026, 17:30 às 22:00
- **Local:** CRMBonus · Rua Minas Gerais, 316 — 3º Andar, Conj. 12 · São Paulo/SP
- **Formato:** 2 painéis (1h cada) com especialistas convidados + happy hour
- **Tema:** sem tema técnico específico (genérico multidisciplinar, "case com número aberto") — Barte tinha tema "RevOps com IA" que ficou parqueado junto
- **URL:** `/meetups/sp-s1-e1` (canonical, sem sufixo de venue)
- **Redirect 301:** `/meetups/sp-s1e1-barte → /meetups/sp-s1-e1` em `_redirects`
- **Página refatorada no wireframe 7-sessões** (hero · sobre o meetup · sobre a comunidade · convidados · conteúdo · CTA · realização e parceiros · time de realização + FAQ + closer)
- **OG image event-specific:** `og-meetup-s1e1.png` (1200×630)
- **JSON-LD Event schema** publicado

**Consequences:** "Barte" não aparece em copy pública. Quando voltar, vira S1·E2 ou S1·E3 com nova edição. Memory file [[project-meetup-s1e1-crmbonus]] criada.

---

### AD-018: Páginas legais enriquecidas + CNPJ Level Tech canonical
**Date:** 2026-05-25
**Status:** Accepted

**Context:** As 4 páginas legais (Privacidade, Termos, LGPD, Código de Conduta) estavam em "versão preliminar — em revisão jurídica" com conteúdo mínimo (~500 palavras cada). Falta de CNPJ específico (placeholder "CNPJ em registro") gerava ruído em LGPD/Termos. Necessário enriquecer pra cobrir cenários operacionais reais (compra de ingresso, retenção fiscal, cookies, ANPD).

**Decision:**
- **CNPJ canonical:** Level Tecnologia da Informação Ltda · CNPJ 64.685.768/0001-29. Aplicado em footer global, author-strip das 4 páginas legais, página do meetup, seção "Definições" dos Termos.
- **Privacidade:** 7 → 11 sessões. Controlador + DPO; categorias detalhadas; finalidades com bases legais; compartilhamento (Substack, Cloudflare, Notion, GA4, Meta, Tally, WhatsApp, gateway); cookies (`_ga`, `_fbp` com vida útil); retenção tabular; segurança (TLS 1.3, HSTS, SLA incidente 2d/5d); transferência internacional art. 33 LGPD; mudanças versionadas.
- **Termos:** 8 → 12 sessões. Definições (6 termos-chave); aceitação com regime empresa/PJ; oferta (5 produtos); PI com licença não-exclusiva do conteúdo de membro; cancelamento com prazos detalhados + direito de arrependimento CDC art. 49; indenização com 4 hipóteses; resolução amigável.
- **LGPD:** 4 → 7 sessões. Bases legais com art. citado; todos os 9 incisos do art. 18; decisão automatizada (declaramos que não usamos); crianças/adolescentes; ANPD com link gov.br/anpd.
- **Código de Conduta:** 5 → 9 sessões. Eventos presenciais (consentimento foto, gravação, álcool, anti-assédio); inclusão multidisciplinar; convidados/speakers; contestar decisão em 15d.

**Consequences:** Páginas legais saem de "preliminar" pra vigente. Site fica defensável legalmente sem virar lawyerese. Memory file [[reference-cnpj-canonical]] criada.

---

### AD-017: Site polish 2026-05-25 — omnibus de melhorias visuais e estruturais
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Pós-deploy do site v1 + refino técnico (AD-013), bateria de polish em 1 dia de execução autônoma com check-ins pontuais do Henrique.

**Decision (omnibus):**
- **Meetup S1E1 cascade** Barte → CRMBonus (ver AD-019).
- **OG images PNG novas** 1200×630 (default + meetup-specific) substituindo SVG (mau suporte FB/LinkedIn). Geradas via Chrome headless renderizando HTML com fontes Satoshi self-hosted.
- **Meta tags consistentes** em todas 21 páginas: og:image:width/height/alt + twitter:image + canonical em todas indexáveis. 3 thank-you pages que estavam sem meta description ganharam.
- **Substack URL normalizada** `growthclub.substack.com` → `brgrowthclub.substack.com` em index.html JSON-LD + recursos/newsletter + assets/js/newsletter-form.js.
- **A11y — heading hierarchy** corrigida em 8 páginas: TOC sidebar `<aside class="toc"> <h4>` promovido pra `<h2>` (CSS `.toc h4` renomeada pra `.toc h2`, mesmo styling visual). 2 cards do membro promovidos `h3.card-h3` → `h2.card-h3`. ai-like-a-pro h3 → h2 da seção "Lista da próxima turma".
- **A11y — tracking pixels** 21 noscript imgs (Meta Pixel beacon 1×1) ganharam `alt=""` explícito.
- **Testimonials reais** no home: Huxley Dias (Loft) · Kalina Renno (Configr) · Giovanni Lucas (Zup Innovation) com fotos profissionais. Quotes extraídos via yt-dlp + ffmpeg do vídeo recap meetup SESSION 2 EP 2 (lower-thirds identificaram 5 speakers; 3 escolhidos cobrindo 3 ângulos: comunidade/networking/emocional). CSS `.home-testimonial-avatar img` adicionada. `.home-testimonial figcaption { margin-top: auto }` pra ancorar attribution no rodapé do card.
- **CTA final H1 fix** "Junte-se à comunidade…" quebrava em 4 linhas → 2 linhas via `<br>` explícito + font-size redução + max-width 30ch + `text-wrap: balance`.
- **FAQ home expandida** 5 → 12 perguntas.
- **Página meetup S1E1 refatorada** no wireframe 7-sessões (Topo · Hero · Sobre o meetup · Sobre a comunidade · Convidados · Conteúdo · CTA · Realização e parceiros · Time de realização + FAQ + Closer). Estrutura mais comercial — comunidade entra como Sessão 2 antes do CTA.
- **Forms Tally removidos** de `/contato` e `/lgpd` (loading copy desatualizada da Barte; redundante com canais diretos).
- **Footer dark theme aplicado** via `data-theme="dark"` no `<footer>` (era cream por bug de cascade); `color: var(--fg-secondary)` no elemento footer pra resolver `color: inherit` da `.foot-col a`; `.foot-bottom`/`.foot-legal` migrados pra `--fg-tertiary` (legível) em vez de `--fg-muted` (invisível).
- **Navbar** com underline amber animado no hover/active dos links + hover lift no CTA + glassmorphism subtle no scroll (`data-scrolled="true"` adiciona shadow). Tagline e chip de meetup tentados e removidos (info demais).
- **Footer "épico" tentado e revertido** — hero CTA, stats, manifesto pull, social row, build in public adicionados depois removidos a pedido do Henrique. CSS dos elementos ficou inerte em chrome.css.
- **Bugs L-003 latentes não-encontrados:** nenhum (Phase 3 do AD-013 tinha sido limpa).

**Consequences:** Site pública agora cobre os principais gaps de fundo (a11y, meta, performance), com posicionamento atualizado (CRMBonus) e voz limpa (sem mesa de canto, sem operador, sem tier pago). Próximos passos: alinhar docs internas (B-001).

---

### AD-016: Voz padrão sem regionalismo geográfico — mineiro tentado e rejeitado
**Date:** 2026-05-25
**Status:** Accepted

**Context:** Em meio ao polish (AD-017), tentei "tempero mineiro moderado" via Python regex (cê / tá / tão / vamo / pra) em 14 páginas, 41 substituições. Após visualizar o resultado, Henrique pediu reverter "urgente". Reversão via `git checkout 9ecc178 -- <files>` preservando os fixes posteriores (footer dark, CNPJ).

**Decision:** Voz Growth Club é editorial nacional/multidisciplinar — sem marcadores regionais (mineiro/paulista/carioca/nordestino). Mantém contrações coloquiais comuns ("pra", "tá", "tô" em diálogo) mas evita gíria/sotaque que mapeia pra uma região.

**Consequences:** Memory file [[feedback-voz-sem-regionalismo]] criada. Tentativas futuras de "humanizar" copy não usam regionalismo. Voz default já é humanizada (CLAUDE.md global manda usar humanizer skill) — adicionar regionalismo é overshoot.

**Lessons learned:** L-004 abaixo.

---

### AD-013: Refino técnico do site v2 — sprite, fonts prune, native details, scroll-driven, view transitions, Phase 4 criativo
**Date:** 2026-05-20
**Status:** Accepted

**Context:** Site v1 (AD-006/007) entrou no ar 2026-05-17 com refino de copy v2 (AD-011, 2026-05-18). Auditoria técnica pós-deploy expôs gaps que não eram visíveis na revisão de copy: (i) Lucide carregado síncrono via CDN `unpkg.com` em todas as 22 páginas (~190KB JS bloqueante por página, dependência externa terceira), (ii) 28 arquivos de fonte (~3.2MB) servidos no deploy quando o CSS efetivamente usa só 6 pesos (4 Satoshi static + 2 Roboto static — Satoshi não é variable apesar de o tokens.css declarar `font-variation-settings`, que é dead code), (iii) ~210 atributos `style="..."` inline espalhados por 17 páginas — anti-pattern que erode o Design System AD-008 como single source of truth, especialmente concentrado em meetup LP (73), membro (40), workshops/AI LIKE A PRO/contato/newsletter/comunidade (10-16 cada), (iv) FAQs implementadas como `<div><h3><p>` em vez de `<details>` (sem acessibilidade nativa, sem accordion exclusivo), (v) scroll-reveal via JavaScript IntersectionObserver (60 linhas) quando CSS `animation-timeline: view()` já é Newly Available, (vi) `onclick="..."` inline em `recursos/newsletter.html`, (vii) sem skip-link, (viii) sem cross-document view transitions apesar de o site ser multi-page estático, alvo ideal pra `@view-transition { navigation: auto }`. Modern Web Guidance (AD-012) instalado em paralelo virou régua técnica externa pra evitar repetir esses gaps na evolução.

**Decision:** Refino técnico em 4 fases, sprint único Phases 1-3 + check-in antes da Phase 4 (preferência Henrique, 2026-05-20):

**Phase 1 — Render path + native swaps:**
- **Lucide CDN → sprite SVG local.** `website/assets/icons.svg` (9.3KB, 28 `<symbol>`) gerado via curl de `unpkg.com/lucide-static@0.460.0` + parser Python. Consumo via `<svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#NAME"/></svg>`. Removidos 22 `<script src="https://unpkg.com/lucide@0.460.0">` + 20 blocos inline `window.lucide.createIcons()` + `ensureLucide()`/`hydrateAllLucideIcons()` em `header.js`. CSS `.icon` em `components.css` define `width: 1em; height: 1em; stroke: currentColor; fill: none; stroke-width: 2`. Resultado: zero request externo, zero JS hydration, -190KB bloqueante por página.
- **Fonts pruned 28 → 6.** Auditoria via `grep font-weight` mostrou só 4 pesos Satoshi (400/500/700/900) + 2 Roboto (400/500) usados. Italic: `.t-emph` declarado mas nunca referenciado em HTML — dead code. `fonts.css` rewritten. 22 arquivos movidos pra `brand/legacy-fonts/` (fora do deploy). 3.2MB → 503KB (-84%). Preload `<link rel="preload" as="font" type="font/otf" crossorigin>` de `Satoshi-Regular.otf` + `Satoshi-Black.otf` em 21 páginas.
- **Native HTML upgrades.** Skip-link `<a href="#main" class="skip-link">` no `<gc-header>` template + CSS slide-down on focus em `chrome.css`. `id="main"` em `<main>` de todas as 21 páginas. FAQs em membro (4) + meetup LP (6) → `<details name="faq-membro/faq-meetup">` (accordion exclusivo nativo, zero JS). `onclick` inline em `recursos/newsletter.html` → âncora `#inscricao` + `scroll-margin-top`. `.t-emph` removido de `tokens.css`.

**Phase 2 — CSS consolidation:**
- **Utility layer** (~20 classes no fim de `components.css`): `.section-h2[.is-large]`, `.eye-label.is-block`, `.eye-label.is-center`, `.p-lead-lg/.p-lead-md/.p-lead-sm`, `.wrap.is-narrow` (880px), `.wrap.is-prose` (720px), `.bare-list`, `.stack-md/.stack-lg-2`, `.highlight-box`, `.info-card[.is-large]`, `.bg-orb[.is-top-right/.is-large/.is-med/.is-small]` (CSS vars `--orb-color`, `--orb-opacity`), `.z-content`, `.badge-soon`, `.price-row`, `.price-block[.is-muted]`, `.footnote`, `.form-placeholder`, `.em-amber`/`.em-teal`, `.card-h3[.is-teal/.is-amber]`, `.section.is-alt`.
- **`pages.css` cresceu** com componentes page-specific: `.countdown` (meetup LP), `.tl-grid.is-five`, `.sponsor-mark`, `.card.is-price`, `.tier-card` (membro Master teaser), `.embedded-form` (Tally iframe), `.member-form` + `dialog.gc-dialog`, `.memo` (AI LIKE A PRO leaked aesthetic), `.page-404-*`.
- **Refator das 7 páginas pesadas** (ordem por payback): meetup LP 73→12, membro 40→10, workshops 16→12, ai-like-a-pro 13→5, newsletter 13→6, contato 10→4, comunidade 11→5. Site total: ~210 → 101 inline-styles (-52%). Refator via `Write` (reescrita completa), não Edits incrementais — mais rápido e auditável.

**Phase 3 — Modern CSS upgrades:**
- **Cross-document view transitions.** `@view-transition { navigation: auto }` em `tokens.css` + `view-transition-name: site-header/site-footer` em `.nav`/`footer.gc-footer` no `chrome.css`. Chrome/Safari fazem cross-fade nativo entre páginas; Firefox degrada graciosamente para hard navigation. `prefers-reduced-motion` honrado via `@media` wrapper na duração customizada.
- **Scroll-driven animations.** `animation-timeline: view()` aplicado a `.problem, .layers, .timeline, .manifesto-big, .quote-section, .cta-final, .cta-inline, .article, .section` dentro de `@media (prefers-reduced-motion: no-preference) { @supports (animation-timeline: view()) }`. Substitui `scroll-reveal.js` (60 linhas + IntersectionObserver). Arquivo `scroll-reveal.js` **deletado**, auto-load no `header.js` removido. **L-003:** versão inicial usou `from { opacity: 0; transform: ... }` + `animation-fill-mode: both`, que deixou seções abaixo do viewport invisíveis em snapshots/screenshots/print/crawlers (porque `both` aplica o `from` state antes do range entrar). Smoke test via Chrome DevTools MCP pegou o bug imediatamente. **Correção locked:** animar **apenas `transform`**, manter `opacity: 1` sempre — efeito slide-up preservado, conteúdo sempre visível pra contextos não-scrollados.
- **`text-wrap: pretty`** global em `p, .t-body, .t-body-lg`; `text-wrap: balance` já existia em headings. `interpolate-size: allow-keywords` opcional em `<details>` pra animar abertura.

**Phase 4 — Refator criativo (3 páginas com check-in Henrique 2026-05-20):**
- **`404.html` — viewport-locked mini-manifesto.** `<html data-theme="dark">`, `body.page-404` com `min-block-size: 100dvh; display: grid; place-items: center`. Header/footer omitidos (CTAs centralizados + footer mono fallback com `/sobre`, `/newsletter`, `/meetups`). Numeral "404" em Satoshi Black `clamp(140px, 28vw, 320px)` com `text-shadow: 0 0 80px var(--accent-amber-glow)`. Eyebrow teal "Erro 404 · esse número não bate" reforça régua editorial #1 ("Se não tem número, não é Growth Club") como linguagem visual.
- **`membro.html` — `<form>` HTML nativo com validação semântica.** Substituiu o `form-placeholder` por `<form class="member-form" novalidate>` com 3 `<fieldset>` (Você / Operação / Contexto) cobrindo 7 campos: nome, email, LinkedIn (URL com `pattern`), role (`<select>`), empresa, setor (`<select>`), problema (`<textarea minlength=20>`), LGPD checkbox. `:user-valid`/`:user-invalid` pintam border teal/danger **só depois de interação** (não polui o estado inicial). `accent-color: var(--accent-amber)` no checkbox. Submit via JS leve (15 linhas) abre `<dialog id="member-confirm" class="gc-dialog">` com `@starting-style` pra animação de open + `transition-behavior: allow-discrete` em `display`/`overlay`. **Backend stub:** dados persistem em `localStorage['gc-membro-inbox']` + `console.info`. Fallback link `tally.so/r/BzLJO4` no footer do form pra quem prefere o Tally hospedado.
- **`ai-like-a-pro/index.html` — estética "memo leaked".** Mantém `<html data-theme="dark">`. `<article class="memo">` com classification banner vermelho pulsante ("CONFIDENTIAL · INTERNAL · DO NOT FORWARD"), badge "// LEAKED" amarelo rotacionado -2° no canto, FROM/TO/DATE/RE meta em mono teal, título "AI LIKE A PRO." em Satoshi Black `clamp(44px, 7vw, 88px)`, body em Roboto Mono com `<s>` strikethrough vermelho redacted ("Cursor", "Bolt", "Lovable" risados), lista com border-left teal + setas "→", `<details class="memo-agenda">` "// AGENDA COMPLETA [+ expandir]" com timestamps redacted, margin-note em Satoshi com border-left amber + assinatura "H.C., founder · Growth Club", footer "// next batch · pending approval" + 2 CTAs. Voz "franco, com número, sem palco" virou linguagem visual.

**Smoke test visual** via Chrome DevTools MCP (`python3 -m http.server 8765 -d website`): 5 páginas-chave (home, membro, ai-like-a-pro, meetup LP, 404) screenshoteadas em viewport 1280x900, **zero erros no console em todas**. Bug L-003 pego no 1º screenshot.

**Consequences:**
- 53 arquivos modificados, ~700 linhas adicionadas / ~700 removidas (refator líquido balanceado). 22 fontes deletadas do deploy (preservadas em `brand/legacy-fonts/`). `website/assets/` total: **3.9MB → 672KB (-83%)**.
- **Zero dependência runtime externa** no critical path do site (Lucide era a única, agora local).
- **Native-first**: `<details name>` substitui FAQ JS, `animation-timeline: view()` substitui `scroll-reveal.js`, `<dialog>` substitui modal custom, `:user-valid` substitui validação JS no membro form, `view-transition` substitui SPA-like navigation.
- **Design System AD-008 reforçado:** utility layer extraída elimina 100+ duplicações de inline-style. Founder Crew #1 herda gramática consistente — qualquer página nova começa com `.wrap.is-narrow > .section-h2 > .p-lead-lg` em vez de inventar inline.
- **Backend do form de membro continua TBD.** Spec L-001 de AD-011 ainda vale — dados ficam em `localStorage` + console enquanto a integração Tally/Google Sheets/backend custom não for decidida. Trocar pra `fetch(...)` quando o backend landar.
- **Phase 4 abriu vocabulário visual novo** que pode ser reaproveitado: `.page-404-*` no 404, `.member-form` + `dialog.gc-dialog` no membro (`<dialog>` virou primitivo do DS), `.memo` no AI LIKE A PRO (pode virar layout para "vazamento interno" futuro tipo "memo do livecast" se a estética colar).
- Browser support **escolhido como Baseline Newly Available implícito**: View Transitions (Chrome 126+, Safari 18+), `animation-timeline: view()` (Chrome 115+, Safari TP, Firefox 144+), `<details name>` (Chrome 120+, Safari 17.2+, Firefox 109+), `:user-valid` (Chrome 119+, Safari 16.5+, Firefox 88+), `interpolate-size` (Chrome 129+), `@starting-style` (Chrome 117+). Firefox degrada graciosamente em todas. **Sem polyfills** — não compensam o custo de bundle e adicionam complexidade.

**Alternatives considered:**
- **Manter Lucide CDN com `<link rel="preload" as="script">`** — descartado. Mesmo preload, é dependência terceira no critical path + 190KB JS pra usar 28 ícones. Sprite local zera o trade-off.
- **Replicar fontes em WOFF2** (compressão melhor que OTF/TTF) — descartado pra esta sprint. Brand source só forneceu OTF estático; conversão WOFF2 é candidato pra próxima passagem se Founder Crew #2 (designer) quiser otimizar mais.
- **Container queries em `.cards-grid` e `.tl-grid`** — descartado. Componentes sempre usados full-width dentro de `.wrap`, sem casos de uso em sidebar. ROI baixo, complexidade extra sem ganho real.
- **Manter `scroll-reveal.js` como fallback pra Firefox** — descartado. Site já honra `prefers-reduced-motion` desativando entrance — comportamento "sem animar" já estava codificado como aceitável. Reaproveitar o degrade existente é grátis.
- **Form do membro como SPA mini com framework** (Alpine/Stimulus) — descartado. Stack AD-007 proíbe build step e a validação nativa + `<dialog>` cobre 100% do caso sem framework.
- **Replicar dialog stack via biblioteca** (a11y-dialog, microdialog) — descartado. `<dialog>` nativo + `@starting-style` cobre a11y (focus trap, ESC, backdrop click via `closedby="any"` futuramente).
- **Refator pesado em todas as 17 páginas em Phase 2** — descartado em favor de "ordem por payback". As 4 páginas "Grupo C" (legais, obrigados) já estavam com < 5 inline-styles e ROI marginal — deixadas pra polimento orgânico em PRs futuros.

**Lessons learned (registradas separadamente em L-003 abaixo).**

---

### AD-012: Modern Web Guidance (Google Chrome) habilitado como plugin de skills
**Date:** 2026-05-20
**Status:** Accepted

**Context:** Site v1 (AD-006/007) e refinos pós-deploy (AD-011) rodam em HTML5 + Modern CSS + JS vanilla, sem framework, deployado em Cloudflare Pages. Founder Crew #1 (frontend, vibe coder) herdará a evolução do `website/` quando preenchida (AD-002). Esse setup tem dois riscos editoriais que motivam a decisão: (i) o modelo coding agent tem training cutoff de janeiro/2026 e pode tratar como experimental APIs que já entraram em Baseline Widely Available (View Transitions, container queries, `:has()`, anchor positioning, Popover API, content-visibility, Fetch Priority); (ii) sem régua técnica externa, decisões de frontend ficam refém da preferência ad-hoc de cada sessão, sem fonte vetada de plataforma. Em maio/2026 o time DevRel do Chrome publicou o **Modern Web Guidance** — pacote oficial de skills cobrindo 12 silos (accessibility, built-in-ai, css, css-layout, forms, html, passkeys, performance, privacy, security, user-experience, webmcp).

**Decision:** Plugin `modern-web-guidance@googlechrome` v0.0.169 (commit `1dee00c2ae94d2e0c26d4a0c9fecb87c52bd82f9`) instalado em 2026-05-20 via slash commands nativos do Claude Code:
1. `/plugin marketplace add GoogleChrome/modern-web-guidance` — registrou o marketplace `googlechrome` em `~/.claude/plugins/marketplaces/googlechrome` (sem `autoUpdate`).
2. `/plugin install modern-web-guidance@googlechrome` — instalou em `~/.claude/plugins/cache/googlechrome/modern-web-guidance/0.0.169` com scope `local` no `~/.claude/plugins/installed_plugins.json`, vinculado a `projectPath: /Users/henriquecaner/Documents/GitHub/Growth-Club`.
3. `/reload-plugins` — ativou.

Duas skills ficam disponíveis via Skill tool:
- `modern-web-guidance:modern-web-guidance` — search engine de guias vetados. Gatilho automático em qualquer task HTML/CSS/JS-cliente. Executa `npx -y modern-web-guidance@latest search "<query>"` em runtime, requer network na 1ª chamada; depois usa cache do npm.
- `modern-web-guidance:chrome-extensions` — Manifest V3 best practices. Não dispara no Growth Club no curto prazo (não há extensão planejada), mas fica disponível.

**Consequences:**
- Antes de tocar `website/**`, o Claude consulta o catálogo Modern Web Guidance — reduz risco de patterns obsoletos, dependências desnecessárias, soluções ad-hoc.
- Plugin **não** escreveu em `.claude/settings.json` do projeto. O Claude Code novo registra plugins de marketplace externo no `installed_plugins.json` global com `scope: local`. Convive sem conflito com `enabledPlugins` legacy do `.claude/settings.json` (onde estão `frontend-design`, `superpowers`, `chrome-devtools-mcp`).
- Domínio complementar ao `frontend-design` (estética/UX) e `chrome-devtools-mcp` (debug/Lighthouse runtime) — sem sobreposição.
- A skill sugere documentar política de browser support em CLAUDE.md se detectar sinais (alvo Safari, restrição Electron, etc.). Default atual = Baseline Widely Available implícito (web pública moderna). Política explícita pode virar update do CLAUDE.md se Founder Crew #1 levantar requisito.
- Founder Crew #1 (quando preencher vaga frontend) herda a régua sem aprendizado adicional — basta abrir o repo em Claude Code que as skills disparam sozinhas.

**Alternatives considered:**
- **CLI npx isolada** (`npx modern-web-guidance@latest install`) — descartada em favor do plugin Claude Code nativo (`/plugin install`). Plugin é mais coerente com o ecossistema atual e atualiza junto com `frontend-design`+`superpowers`+`chrome-devtools-mcp` via slash commands.
- **Escopo `user` (global a todos os projetos)** — descartado. Outros repos do Henrique (Fast-Alarm Shopify, JEM-TFAS catalog) não são HTML/CSS/JS frontend puro; carregar essas skills lá só polui contexto. Scope `local` com `projectPath` é cirúrgico.
- **Não instalar (manter status quo)** — descartado. O gap entre training cutoff e Baseline real cresce em ritmo trimestral; régua técnica externa vetada compensa o custo de network/latência mínimo da 1ª chamada `npx`.

---

### AD-011: Refino de copy home/membro/empresas v2 — cluster analysis aplicado
**Date:** 2026-05-18
**Status:** Accepted

**Context:** Site v1 foi pro ar em 2026-05-17 (AD-006/007) com Design System AD-008 aplicado. Em revisão pelo Henrique, três páginas centrais — home, membro, empresas — falharam no teste de leitura por 3 failure modes: (a) jargão interno indecifrável (régua editorial #1, ton-anchor, mesa de canto, Era Pré-S1, Outlaw+Sage), (b) Outlaw sem Sage — bashing sem número comparativo que sustente, (c) value prop fraco — CTA da home levava ao Substack sem nunca explicar por que dar o email.

Durante a execução do refino (Bloco B do plan), entrou input adicional via relatório `docs/research/private/2026-05-18-cluster-analysis-whatsapp-cadastros.md` (cluster analysis de 551 cadastros WhatsApp). 8 descobertas mudaram a forma de aplicar os refinos, especialmente: (i) ICP não é único, são 3 sobrepostos (Marketing/Growth 55% + Vendas/RevOps 30% + Founders 8%); (ii) léxico nativo dominante é diferente de jargão growth ("geração de demanda" 26x, "máquina de vendas" 6x, "previsibilidade" 3x, "vendas consultivas" 10x); (iii) 35,6% (196 pessoas) é Master-likely heurístico; (iv) 31,6% (174 pessoas) marcou "Oferecer Serviços" — risco infomercial latente que precisa de Code of Conduct visível.

**Decision:** Refino editorial cirúrgico aplicado nas 3 páginas seguindo:
- Spec `2026-05-18-copy-refino-home-membro-empresas-design.md` v1.1 (commit `d45c78e`) com 4 decisões do Henrique consolidadas no review;
- Plan v2 `2026-05-18-copy-refino-home-membro-empresas.md` (commit `0584a0c`) que incorporou os achados do cluster analysis (Task 5.5 nova + reescrita das Tasks 6, 7, 8, 10, 13, 16, 17).

4 decisões consolidadas no review da spec (decisão Henrique 2026-05-18):
1. Hero da home: CTA primário **mantém "Tornar-se membro"**.
2. Form Substack signup **removido de todas as páginas**. Captação acontece exclusivamente em `/membro` via form de entrevista (campos/handler em sub-projeto separado). Hero da home sem form embutido.
3. Bloco "Edição típica" da home **cortado**.
4. `/empresas` **mantém os 5 blocos** originais; refino bloco a bloco, sem colapsar.

Mudanças materiais sobrepostas pelo cluster analysis:
- Hero da home reconhece **3 ICPs sobrepostos** (marketing + vendas consultivas + RevOps/geração de demanda) em vez de só growth.
- Bullets de benefício de `/membro` **mapeados por persona** (não features genéricas).
- Master 2027 ganha **argumento de preço** comparando com R$ 200-500/mês de ferramenta SaaS.
- Hunting de `/empresas` ganha **tese-frase pra founders** ("Você é founder e precisa de senior+ B2B?").
- Mentoria B2B usa **léxico vibe-coder** ("agentes, automação, fluxos").
- Frame editorial de `/membro` reposicionado de "cadastro grátis 1-clique" pra "candidatura com triagem leve" — tier continua free (Growth Hacker), triagem é qualitativa.

**Consequences:**
- 18 commits de copy/JS/validação aplicados em sequência granular (revert por bloco possível).
- Handler `assets/js/newsletter-form.js` desativado (tag comentada em ambas as páginas). Arquivo mantido no disco pra possível reutilização no sub-projeto futuro.
- Site live em `growthclub.pro` via Cloudflare Pages (`wrangler pages deploy`, preview URL `361d139a.growth-club.pages.dev`).
- **Sub-projeto separado pendente:** form de entrevista em `/membro` — Henrique vai passar campos, perguntas, handler de submit e destino dos dados em sessão futura. Placeholder "FORM ABRE EM BREVE" comunica o estágio.
- **Implicações do cluster analysis pra outras frentes (registradas como follow-up, não escopo desta ADR):**
  - Business Plan v1.2 §3 ICP, §5 sizing, §6 pricing, §10 R-11, §11 Code of Conduct (todas tem novas evidências do dataset);
  - 95% dos cadastros vieram em junho/2025 via LinkedIn do Henrique — canal único de aquisição comprovado, sem cadência sustentada;
  - Métrica de sucesso primária: candidaturas/semana via /membro nas 4 semanas pós-deploy vs baseline pré-refino (alvo ≥20% de subida).

**Alternatives considered:**
- Manter form Substack signup direto em `/membro` (descartado em decisão #2 do review — frame de candidatura é mais coerente com Outlaw+Sage + filtro cultural anti-infomercial).
- Colapsar `/empresas` de 5 pra 3 blocos (descartado em decisão #4 — sinaliza ambição/escopo total).
- Adicionar bloco "Edição típica" na home com case representativo (descartado em decisão #3 — evita risco de case fabricado).
- Trocar CTA primário pra "Receber a próxima edição" (descartado em decisão #1 — com form de triagem, "Tornar-se membro" volta a fazer sentido literal).
- Re-spec formal v1.2 incorporando cluster analysis antes de executar plan (descartado em favor de Caminho 2: input incremental ao plan v1 via Task 5.5 + reescrita de new_strings, sem reverter Bloco A).

---

### AD-010: Pivô do AI LIKE A PRO — página de interesse in-site + LP de checkout em repo separado
**Date:** 2026-05-18
**Status:** Accepted (refina AD-009)

**Context:** AD-009 (2026-05-17) determinou que o AI LIKE A PRO viraria projeto independente, com a pasta `website/ai-like-a-pro/` movida pra fora do site principal e a hospedagem em sub-path resolvida via Workers Routes / multi-deploy no Cloudflare. Ao longo do mesmo dia, ficou claro que essa arquitetura tinha dois custos: (i) configuração operacional no dashboard do Cloudflare ainda pendente, e (ii) ausência completa de uma página de captação dentro do site principal, deixando o footer link `/ai-like-a-pro/` apontando pra um endereço sem fallback até o multi-deploy ficar de pé.

A alternativa surgiu naturalmente: criar uma **página de interesse in-site** no domínio principal usando o Growth Club Design System (AD-008), com form Tally pra lista da próxima turma, e manter a **LP de checkout pago** (com InfinitePay, brand própria, R$ 397) no repo separado, em URL distinta. Os dois ativos passam a coexistir com papéis diferentes.

**Decision:**

1. **`website/ai-like-a-pro/index.html` permanece no site principal** como página de captação de interesse pra próxima turma. Brand alinhada ao AD-008 (gc-header, gc-footer, tokens canônicos). Form: Tally (`tally.so/r/BzLJO4`). Sem checkout — função é encher a lista da próxima turma.

2. **A LP de checkout pago em `~/Documents/GitHub/ai-like-a-pro/`** (repo separado) continua sendo a fonte da venda real (R$ 397, InfinitePay). Deploy continua independente. Quando turma estiver aberta, a página de interesse no site principal aponta pra ela.

3. **Workers Routes / multi-deploy desnecessário em Fase 1.** O footer link `/ai-like-a-pro/` resolve direto pela página in-site. A LP de checkout pode ficar em sub-path do repo separado (ex.: `growthclub.pro/turmas/ai-like-a-pro/` via deploy futuro) ou em URL temporária do próprio Pages do repo separado.

4. **Cross-promo permanece:** interest page in-site → LP de checkout quando turma abre; LP de checkout → WhatsApp Community pós-compra. Dois ativos, um funil.

**Consequences:**
- Footer link do site principal nunca fica quebrado, mesmo sem config extra de Cloudflare.
- AI LIKE A PRO ganha presença permanente dentro do site principal (SEO + descoberta orgânica), independente de turma aberta.
- A pasta `website/ai-like-a-pro/` no repo principal NÃO é nested git repo — é só uma rota a mais, com 1 arquivo HTML, sem subprojeto.
- Pendência operacional do AD-009 ("configurar Workers Routes") deixa de existir nessa forma; vira "decidir URL futura da LP de checkout pública" — tarefa adiada pra quando próxima turma abrir.
- AD-009 §3 (pasta movida pra fora) está parcialmente revisada: a pasta separada continua existindo pra LP de checkout, mas a presença no repo principal foi reintroduzida com propósito diferente.

**Alternatives considered:**
- **Manter AD-009 literalmente e configurar Workers Routes agora** — descartado: trabalho operacional pra resolver um problema (footer link quebrado) que tem solução mais simples in-site, e Workers Routes força acoplamento entre os dois deploys.
- **Embed do form Tally direto em `/recursos/workshops.html`** — descartado: workshops é hub de múltiplos formatos; AI LIKE A PRO merece página dedicada com seu próprio SEO (`growthclub.pro/ai-like-a-pro/`) pra SERP.
- **Subdomínio dedicado `ailikeapro.growthclub.pro`** — descartado em AD-009 e mantém-se descartado: fragmenta SEO sem ganho.

---

### AD-009: AI LIKE A PRO formalizado como produto pago independente
**Date:** 2026-05-17
**Status:** Accepted

**Context:** Henrique já vendeu R$ 3 mil (~7 alunos × R$ 397) em duas turmas do workshop "AI LIKE A PRO" (Antigravity + Claude para não-devs). Existe LP completa em produção em repo separado (`github.com/henriquecaner/ai-like-a-pro`) com stack própria (HTML5 + Vanilla JS + Cloudflare Pages Functions + InfinitePay + Google Sheets + Resend), checkout integrado, success page, LGPD modals e SEO próprio. A LP estava clonada como pasta nested em `website/ai-like-a-pro/` dentro do site principal — fonte de confusão (repo git dentro de repo git) e risco operacional.

**Decision:**

1. **AI LIKE A PRO permanece como projeto independente.** Repo `github.com/henriquecaner/ai-like-a-pro` continua source-of-truth do produto. Stack própria (Vite + Functions + InfinitePay) preservada. Brand independente — **não migrado** pro Growth Club Design System AD-008 na v1, pra preservar conversão validada de R$ 397/aluno.

2. **Hospedagem em sub-path `growthclub.pro/ai-like-a-pro/`.** Configuração Cloudflare via Workers Routes ou multi-deploy (a ser configurada pelo Henrique no dashboard). SEO consolida no domínio principal, brand do AI LIKE A PRO mantém visual próprio.

3. **Pasta movida pra `~/Documents/GitHub/ai-like-a-pro/`** (fora do site principal) pra eliminar nested git repo. Site principal já não tem mais a pasta — versionamento limpo.

4. **Integração no site principal:**
   - `<gc-footer>` ganha link "AI LIKE A PRO" na coluna Recursos apontando pra `/ai-like-a-pro/`.
   - `website/recursos/workshops.html` substitui placeholder `[PITCH_AILIKEAPRO]` por copy real com validação numérica (R$ 397 · Turma 2 · R$ 3 mil vendidos) + CTA pra LP.

5. **Posicionamento no business plan v1.2:** AI LIKE A PRO se encaixa como **Workshop high-ticket** (§6.1 — receita orgânica recorrente). Próximo passo: registrar receita real nos relatórios de transparência financeira (AD-005) quando relatório DRE da Comunidade entrar em ciclo regular.

**Consequences:**
- Site principal e AI LIKE A PRO ficam visualmente desalinhados (brand v1 do workshop ≠ AD-008 do site). Aceito como trade-off pra preservar tração.
- Quando o Henrique tiver banda, migração visual pro AD-008 fica como item futuro (não bloqueia operação).
- Cross-promo direta entre os dois canais: site principal envia tráfego pra LP, LP envia confirmados pra Community WhatsApp (via post-checkout email).
- Repo separado mantém disciplina de deploy independente: AI LIKE A PRO pode ter Turma N+1 sem mexer no site principal.
- Workers Routes ou multi-deploy precisa ser configurado antes do `/ai-like-a-pro/` resolver em produção. Até lá, link do site principal pode quebrar — flag como pendência operacional.

**Alternatives considered:**
- **Migrar tudo pro design system AD-008 agora** — descartado: risco de quebrar conversão validada + custo de refactor sem ganho operacional.
- **Subdomínio `ailikeapro.growthclub.pro`** — descartado pelo user em favor de sub-path (SEO consolidado no domínio principal).
- **Domínio próprio (`ailikeapro.com.br`)** — descartado: custo + fragmentação SEO sem benefício claro em Fase 1.
- **Adicionar como git submodule do Growth-Club** — descartado: overhead de manutenção, complica deploys do site principal.

---

### AD-008: Adoção do Growth Club Design System (adaptado do Level) + migração tipográfica Archivo Black → Satoshi
**Date:** 2026-05-17
**Status:** Accepted

**Context:** Henrique trouxe o **Level Design System** (sistema de design completo da outra empresa dele, Level Tech) em `brand-adapt/Level Design System - new/` solicitando adaptação pra Growth Club. O sistema é robusto: tokens CSS dual-theme (light-first + dark sections opt-in), fontes self-hosted (Satoshi + Roboto), 30+ preview cards, 5 templates IG/LinkedIn prontos, ui_kit de site institucional, e uma skill agent (`level-design`) pra Claude Code. Reutilizar a engenharia evita reinventar a roda e economiza ~2 semanas de trabalho de design system from-scratch.

Conflito identificado: o Level usa **Satoshi** como display+body, mas o Growth Club tinha decidido **Archivo Black + Inter + JetBrains Mono** em `brand/visual/tipografia.md` (decisão 2.2 do brand brief plan). Manter Archivo Black exigiria recalibrar todos os tokens de letter-spacing e line-height (Archivo Black tem métrica condensada muito diferente de Satoshi), refazer todos os 30+ preview cards, e perder a flexibilidade de variable font.

**Decision:**

1. **Adotar o Growth Club Design System** em `brand-adapt/Growth Club Design System/` como fonte canônica de tokens visuais, adaptado do Level Design System mantendo: filosofia light-first + dark section opt-in, scale tipográfica, motion, radii, spacing, semantic type roles, OpenType features (`tnum`, `cv01`, `ss01`).

2. **Substituições aplicadas (Level → Growth Club):**
   - `--accent-violet #5522FA` → `--accent-amber #D4A24C` (Amber Beer, primário/CTA — locked em paleta-primaria.md)
   - `--accent-mint #00B470/#00F59B` → `--accent-teal #4FB3A5` (Pirate Teal, secundário — locked em decisão 01-B bandeira pirata)
   - `--bg-base #F5F5F5` (cinza frio) → `#F5F1E8` (Pub Cream — "luz de pub", locked)
   - `--fg-primary #1A1A1A` → `#0A0A0A` (Growth Black — locked)
   - `--color-danger` mantido em Brick Red `#B84A3E` (locked)
   - Logos: placeholders SVG textuais "growth club." com ponto Amber até logo final do Figma sair (Task 2.3 do brand brief plan pending).

3. **Migração tipográfica:** Satoshi (variable, eixo 300-900) **substitui** Archivo Black como display + body do Growth Club. Roboto continua como mono. Decisão `brand/visual/tipografia.md` (Task 2.2 do brand brief) marcada parcialmente **SUPERSEDED por AD-008** no que tange à fonte display escolhida.

4. **Aliases legados preservados** no CSS (`--accent-violet*` → `--accent-amber*`, `--accent-mint*` → `--accent-teal*`) pra que os 30+ preview cards herdados do Level renderizem sem refactor imediato. Código novo deve usar nomes diretos.

5. **Filosofia "Dark = section, não tema" mantida.** Pub Cream em 95% do conteúdo, Growth Black só em hero/CTA-final/depoimento/capa de slide.

**Consequences:**
- Destrava produção imediata de assets (newsletter covers, IG/LinkedIn posts, pôster de meetup) sem esperar Founder Crew #2 (designer).
- Sistema instalável como skill Claude Code (`growth-club-design`) — qualquer agente futuro pode invocar e gerar peças on-brand.
- `brand/visual/tipografia.md` precisa de update marcando AD-008 como superseder (a fazer manualmente fora do escopo desta ADR).
- Decisão 2.2 do brand brief plan vai ser referenciada como "parcialmente revisada" no próximo update do plan.
- Inter continua válida como fallback em emails (Outlook quebra com Satoshi self-hosted, conforme nota em `tipografia.md`).
- Logo final ainda pendente do Figma — `assets/logo-*.svg` são placeholders e devem ser substituídos zero-touch quando o vetor sair.
- Trade-off aceito: variable font self-hosted (~280KB) é maior que Google Fonts CDN, mas dá controle total e elimina dependência externa.

**Alternatives considered:**
- **Manter Archivo Black + Inter + JetBrains Mono e recalibrar todos os tokens do Level** — descartado: ~1 semana de trabalho de recalibração, perde variable font flexibility, sem ganho prático.
- **Construir design system do zero pra GC** — descartado: ~2 semanas adicionais, sem reutilizar engenharia já testada do Level.
- **Adotar Tailwind ou design system pronto (Vercel Geist, Catalyst)** — descartado: Level já tem identidade alinhada (light-first, no-line, brutalist-tonal, voz operador) que casa filosoficamente com GC, e adaptação foi viável.
- **Esperar Founder Crew #2 (designer) chegar** — descartado: bloqueia produção de assets indefinidamente; Henrique optou por destravar agora.

---

### AD-007: Stack escolhida pro site v1 — HTML5 semântico + Modern CSS, sem framework
**Date:** 2026-05-17
**Status:** Accepted

**Context:** O spec do site (AD-006) deferiu deliberadamente a escolha de stack ao Founder Crew #1 (TBD-04 em §9 do spec). Ao avançar pra etapa de writing-plans, ficou claro que sem stack o plan ficaria sem caminhos de arquivo exatos e sem código exato — violando regras do skill. Henrique optou por destravar a decisão pessoalmente em vez de aguardar o Crew, dado que o Crew #1 ainda não foi preenchido (AD-002 recrutamento aberto desde 2026-04-28).

**Decision:** Stack v1 do site:

1. **HTML5 semântico** — sem framework JS (Next/Astro/SvelteKit/etc.). Arquivos `.html` estáticos por página, sem build step.
2. **Modern CSS** com nesting nativo (suportado em todos os majores browsers desde 2023). Sem PostCSS, sem Sass, sem TailwindCSS na v1. CSS custom em arquivo único `styles.css` (ou modular por página se ficar grande).
3. **JavaScript vanilla** quando necessário (form do newsletter com redirect pré-preenchido pro Substack, scrollspy de anchors em `/sobre` e `/empresas`, etc.). Sem framework JS, sem build.
4. **Hospedagem: Cloudflare Pages.** Substitui Vercel/Netlify mencionados em `website/README.md`. Push pra Git = deploy automático. CDN global, free tier confortável, melhor latência LATAM.
5. **Executor da v1: Henrique.** Crew #1 (frontend, vibe coder) entra depois pra evoluir/manter, não pra fazer a v1 do zero.

**Consequences:**
- Destrava a etapa de writing-plans imediatamente.
- TBD-04 do spec do site marcada como RESOLVIDA.
- `.specs/project/STACK.md` (atualmente placeholder) precisa ser atualizada com decisão real.
- `website/README.md` precisa ser atualizado (Vercel/Netlify → Cloudflare Pages).
- Trade-off aceito: sem template engine = header/footer duplicados em cada arquivo HTML. Pra ~20 páginas é gerenciável; se virar 50+ vale considerar Eleventy ou similar (uma dependência só, opcional).
- CSS nesting nativo pode quebrar em browsers muito velhos (pré-2023) — alinhado com tom-anchor "Franco" (não otimizar pra long tail de IE/Safari velho).
- Quando Crew #1 entrar e quiser migrar pra framework (Astro/Next/SvelteKit), abre nova ADR — não é decisão perpétua.
- Henrique como executor: plan vai ser escrito em segunda pessoa direta ("você cria o arquivo X com este código"), não "Crew #1 deve…".

**Alternatives considered:**
- **Astro** (SSG com MDX nativo) — descartado: Henrique optou por simplicidade radical (sem build step) e quer aprender CSS moderno na prática.
- **Next.js / SvelteKit** — descartado: overkill pra site estático, complexidade desnecessária pra v1.
- **Eleventy** (SSG sem framework, 1 dependência) — descartado pra v1, considerado pra v2 se duplicação de header/footer pesar.
- **Esperar Crew #1 preencher** — descartado: bloqueia a etapa de writing-plans indefinidamente; Henrique pode entregar v1 enquanto recrutamento corre.

---

### AD-006: Spec do site v1 aprovado — `growthclub.pro`
**Date:** 2026-05-17
**Status:** Accepted

**Context:** Após Marca v1 (parcial) entregue em ADR-002 (2026-04-27), próxima fase do roadmap (Site `growthclub.pro`) precisava de design doc antes de qualquer linha de código. Sessão de brainstorming estruturado com skill `superpowers:brainstorming` foi conduzida em 2026-05-17 (Henrique + Claude) cobrindo: escopo (visão final, sem timeline v1), arquitetura de informação, login interno (rejeitado), CTA primário do hero, conteúdo da home, fusão de sub-páginas em single-page com anchors (Sobre e Empresas).

**Decision:** Spec aprovado em `docs/superpowers/specs/2026-05-17-growth-club-site-design.md` (v1.0). Pontos travados:

1. **Site público, vitrine, sem login interno.** Redirects pra plataformas externas (Substack, plataforma de aulas TBD, WhatsApp, YouTube/LinkedIn).
2. **Top-nav (7 itens):** Home · Sobre · Recursos ▾ · Meetups ▾ · Empresas · Tornar-se Membro · Contato.
3. **19+ rotas/anchors** no inventário (Home + Sobre single-page + 5 sub-Recursos + Meetups hub + LP `[slug]` + Histórico + Empresas single-page + Membro + Contato + 4 legais + 404).
4. **`/sobre` fundida em single-page:** história + manifesto + Founder Crew + imprensa com anchors `#manifesto`, `#crew`, `#imprensa`.
5. **`/empresas` fundida em single-page:** 4 ofertas B2B com anchors `#patrocinio`, `#vagas`, `#hunting`, `#mentoria`. Substitui ideia anterior de `/patrocinadores` solo.
6. **Hero estático com CTA único** "Tornar-se Membro" → `/membro` + ganchos distribuídos em 9 seções na home. Slot dinâmico na seção 7 resolve sazonalidade do meetup.
7. **`/membro` é caminho único free** (Growth Hacker). Master "em breve 2027" como bloco discreto. Founder Member parqueado (AD-003) não aparece.
8. **Stack livre escolha do Crew #1** dentro dos guardrails de `website/README.md` (Vercel/Netlify, ≤ R$ 200/mês hosting).
9. **Analytics proposta:** Plausible (privacy-first, cookieless).
10. **6 bloqueadores de go-live** catalogados na §8.1 do spec; **13 decisões TBD** na §9 (suas propostas pra depois).

**Consequences:**
- Destrava handoff pra etapa de plan (próxima invocação: `superpowers:writing-plans`).
- Cria novo bloqueador formal **B-01: ADR-007 pendente** — Mentorias quinzenais, Desafios mensais, Job board, Hunting, Mentoria B2B foram aceitos como compromissos no spec mas precisam de ADR formalizando dono operacional, cadência, mecânica antes do go-live.
- `ROADMAP.md` Fase 1 atualizado refletindo spec como entregável pré-build.
- Site só vai ao ar quando Founder Crew #1 preenchido + ADR-007 registrada + conteúdo concreto §6.4 do spec produzido + logo SVG final entregue + páginas legais juridicamente revistas.

**Alternatives considered:**
- Decompor em múltiplos specs (Home + Membro + Empresas separados) — descartado: site é v1 coeso, não vale fragmentar.
- Definir stack agora — descartado: respeita autoridade do Crew #1 + guardrails em `website/README.md`.
- Manter `/sobre/manifesto`, `/sobre/crew`, `/sobre/imprensa` separadas — descartado pelo Henrique durante a sessão (preferência por single-page consolidada).

---

### AD-005: Transparência financeira radical com Founder Crew
**Date:** 2026-04-28
**Status:** Accepted

**Context:** Founder Crew (AD-002) recebe 30% do lucro líquido da Comunidade dividido por igual. Sem garantia de remuneração mínima e sem promessa de dinheiro no curto prazo — o Crew está apostando que a Comunidade vai gerar líquido relevante. Sem visibilidade total sobre receitas, despesas e cálculo do líquido, o vínculo vira "confia em mim" — assimetria que corrói a relação.

**Decision:** Henrique se compromete a fornecer ao Founder Crew, em cadência regular (proposta: mensal nos primeiros 12 meses, depois trimestral), relatório financeiro completo da operação da Comunidade contendo:

1. **DRE simplificada** — todas as receitas (com origem identificada: ingressos meetup, patrocínio livecast, GH Master, workshops, etc.) e despesas operacionais (venue, produção, marketing, ferramentas, fees, etc.).
2. **Cálculo do líquido** — receitas menos despesas operacionais diretas + indiretas atribuíveis à Comunidade.
3. **Pool Crew** — 30% do líquido = valor a distribuir.
4. **Fração individual** — quanto cada Crew Ativo recebe (Pool dividido pelo nº de Ativos no período).
5. **Repasse efetuado** — comprovante de transferência ao Crew member, com data e valor.

**Princípio:** "Se não tem número, não é Growth Club" se aplica internamente também. Crew member tem direito a contestar cálculos por escrito (right to audit lite) — Henrique responde em até 15 dias com documentação suplementar.

**Consequences:**
- Vai virar **Cláusula 7 e Anexo E** do Acordo de Founder Crew.
- Cria obrigação operacional contínua (preparar relatório mensal/trimestral) — pode demandar sistema simples de gestão financeira (planilha estruturada ou ferramenta SaaS leve).
- Reduz fricção de relação (Crew confia em dado, não em palavra).
- Expõe Henrique a escrutínio interno — vale internalizar que isso é parte da cultura, não defeito.

**Alternatives considered:**
- Transparência só sob demanda (descartado: cria assimetria de quem pergunta vs quem não pergunta).
- Apenas DRE anual (descartado: 12 meses sem visibilidade fragiliza a relação no início, justo quando confiança ainda está sendo construída).

---

### AD-004: Hospedagem operacional da Comunidade dentro da Level Tech (CNPJ existente)
**Date:** 2026-04-28
**Status:** Accepted

**Context:** §11 do Business Plan v1.2 listava como pendente a definição de CNPJ + regime tributário pra operar a Comunidade formalmente. Henrique fundou recentemente a **Level Tech** (CNPJ próprio, formato a confirmar — provavelmente Ltda ou EPP), e a Comunidade pode rodar dentro dessa estrutura existente sem precisar criar PJ nova hoje.

**Decision:** Em **Fase 1**, todas as operações financeiras da Comunidade (receitas e despesas, contratos, emissão de notas, recebimento de patrocínio, pagamentos a fornecedores, repasses de revshare a Founder Crew) **rodam dentro do CNPJ da Level Tech**. O Acordo de Founder Crew (AD-002) é assinado tendo a Level Tech como Contratante.

**Em fase futura (gatilho — validar com Henrique):** quando a Comunidade atingir maturidade financeira/operacional, **spin-off em CNPJ dedicado ao Growth Club**, com Level Tech atuando como **holding controladora** do novo CNPJ. Gatilho proposto:
- (i) Receita anual da Comunidade ≥ R$ 500k OU
- (ii) ≥ 200 Growth Hacker Master pagantes OU
- (iii) Captação externa relevante (anjo, fundo) que exija cap-table dedicada

Quando o spin-off ocorrer, **AD-006 será aberta** desenhando os termos (cap-table inicial, possível conversão de revshare Founder Crew em equity, governança).

**Consequences:**
- Destrava a urgência de §11 (Business Plan) parcialmente — Comunidade pode operar legalmente já como "produto/iniciativa" da Level Tech.
- Acordo de Founder Crew tem cláusula de **reorganização societária** (Cláusula 28) que prevê cessão automática do contrato pra Nova Sociedade quando spin-off ocorrer, **sem conversão automática em equity** (renegociação obrigatória).
- Receitas/despesas da Comunidade precisam ser **segregadas contabilmente** dentro da Level Tech (centro de custo "Growth Club" ou similar) pra viabilizar a transparência financeira da AD-005 e o cálculo correto do Pool Crew.
- Não substitui a necessidade futura de revisar §11 quando spin-off for ativado (regime tributário, contratos comerciais, governança societária).

**Alternatives considered:**
- Criar CNPJ Growth Club agora (descartado: custo + tempo + complexidade desnecessária pra Fase 1, sem revenue confirmada).
- Operar como pessoa física do Henrique (descartado: passivo jurídico de revshare e impossibilidade de emitir NF, conforme §11 do Business Plan).
- Spin-off antes de Barte S1E1 (descartado: sem ganho operacional comparado a usar Level Tech como guarda-chuva).

---

### AD-003: Founder Member tier parqueado
**Date:** 2026-04-28
**Status:** Accepted

**Context:** Founder Member (R$ 2.079, 100 vagas) era a principal fonte de receita upfront prevista no Business Plan v1.2 (AD-001) para Barte S1E1 — 25 vagas × R$ 2.079 = R$ 51.975. Ao avaliar o estado atual da operação (marca em construção, site não publicado, identidade visual em finalização, brand book em redação), o autor concluiu que vender ticket prêmio antes do produto estar minimamente maduro cria expectativa não atendida e arrisca queimar a categoria pra sempre.

**Decision:** Founder Member tier suspenso temporariamente. Não será ofertado em Barte S1E1. Tier será redefinido (formato pode mudar) na retomada — pode voltar como R$ 2.079 × 100 vagas, ou estrutura diferente.

**Gatilho de retomada (default — validar com Henrique):**
- (i) Marca v1 publicada (Chunks 1-5 do brand brief fechados, brand book consolidado);
- (ii) Site `growthclub.pro` no ar com captação ativa funcionando;
- (iii) ≥100 Growth Hacker Master pagantes confirmando demanda pelo modelo premium.

Quando os 3 critérios estiverem verdes, reavaliar formato e relançar (ou descartar definitivamente em nova ADR).

**Consequences:**
- Receita upfront prevista de R$ 51.975 não materializa em Barte S1E1 — gera risco R-11 (cash flow Fase 1).
- Founder Crew (AD-002) preenche o vácuo operacional, mas não o financeiro.
- Locked decision #5 do `CLAUDE.md` editada pra refletir parking.
- ROADMAP.md Fase 1 atualizado: meta de "25 Founder Members (cota parcial)" removida.

**Alternatives considered:**
- Manter venda de Founder Member com produto incompleto: descartado (risco de queima de categoria).
- Cancelar Founder Member definitivamente: descartado (autor quer manter opção pra retomar quando produto maduro).
- Reduzir ticket pra R$ 990 ou similar: descartado (descaracteriza tier prêmio).

---

### AD-002: Founder Crew — categoria de operadores Era Pré-S1
**Date:** 2026-04-28
**Status:** Accepted

**Context:** Profissionalização do Growth Club exige 3 entregas técnicas críticas até Barte S1E1 (jun/2026): (i) site `growthclub.pro` no ar; (ii) identidade visual aplicada em templates de newsletter/LinkedIn/email + corte de livecast; (iii) repositório público no GitHub com README de venda da comunidade. Founder solo não tem banda pra executar as 3 em 8 semanas. Caixa Fase 1 não comporta contratação de fornecedor pago (sem CNPJ ainda, sem revenue confirmada). Founder Member tier (que poderia financiar fornecedores) foi parqueado em AD-003.

**Decision:** Cria-se 4ª categoria — **Founder Crew** — paralela aos tiers de membership (Growth Hacker, Growth Hacker Master, Founder Member). Founder Crew remunera operadores que entregam as 3 cadeiras críticas via revshare, sem custo de caixa upfront e sem participação societária (Caminho B, sem equity).

**Termos do Acordo de Founder Crew:**

1. **Quota:** 3 vagas, fechadas. Sem vagas reservadas.
   - Cadeira 1: Frontend (vibe coder) — site `growthclub.pro`.
   - Cadeira 2: Designer + edição de vídeo — identidade aplicada + corte livecast.
   - Cadeira 3: Community Manager / GitHub — repositório público, README de venda da comunidade.

2. **Revshare:** 30% do lucro líquido da comunidade, dividido **por igual** entre Founder Crew preenchidos. Cap rígido em 30%.
   - 3 vagas preenchidas → 10% por pessoa.
   - Revshare é condicional à manutenção do vínculo. Não há vesting tradicional.

3. **Vínculo operacional:** 3 anos. Inclui:
   - **Entrega upfront em 90 dias** (escopo registrado em anexo do contrato por cadeira).
   - **Manutenção leve de 6 horas/mês** durante os 36 meses (ajustes, refresh, atualizações no escopo original).

4. **Mecanismo legal (Caminho B):** Acordo de Founder Crew como contrato de prestação de serviços com remuneração variável (revshare) + cláusulas de exposição, saída e first-pass. Sem equity, sem mútuo conversível na Fase 1.
   - Sub-cláusula opcional: pode incluir "direito de revisão" se Growth Club constituir CNPJ formal e captar — Crew tem janela de renegociação, sem direito automático de conversão em quotas.

5. **First-pass em vaga paga:** quando Growth Club tiver caixa pra contratar pessoa fixa no escopo do Crew, vaga é oferecida primeiro ao Founder Crew correspondente. **Salário publicado upfront** (faixa de mercado pesquisada e divulgada). Crew tem **30 dias corridos** pra responder sim/não. Se "sim", assume vaga paga + mantém revshare ativo. Se "não" ou silêncio, vaga abre publicamente, Crew mantém revshare condicional enquanto seguir Crew.

6. **Sem perpetuidade — desligamento por baixa performance ou problema cultural:** Founder pode desligar Crew unilateralmente em dois cenários objetivos:

   **(a) Baixa performance:**
   - Não cumprir entregas combinadas no anexo de escopo dentro do prazo de 90 dias upfront + 30 dias de tolerância em boa-fé;
   - Não cumprir o compromisso de 6h/mês de manutenção por 3 meses consecutivos sem justificativa formal aceita pelo Founder.

   **(b) Problema cultural:**
   - Violar pacto editorial registrado em `brand/voice/dos-and-donts.md` ("Se não tem número, não é Growth Club"; sem self-promo vazio; sem teatro);
   - Conduta incompatível com ton-anchor "Franco, com número, sem palco, com cerveja";
   - Quebra de confidencialidade (revelar dados financeiros internos, listas de membros, etc.);
   - Atacar pessoas individuais pelo nome (atacar padrões é OK; atacar pessoas, não).

7. **Procedimento de desligamento:** Founder envia comunicação por escrito ao Crew descrevendo o motivo objetivo e as evidências. Crew tem **15 dias corridos** de cura — pode contestar por escrito ou apresentar plano de remediação. Founder analisa e decide. Decisão final é do Founder, sem arbitragem externa em Fase 1.

8. **Saída = perde tudo automaticamente:** uma vez que o vínculo termina (por desligamento, saída voluntária, ou fim natural dos 36 meses sem renovação):
   - **Revshare cessa imediatamente** — sem vesting residual, sem pro-rata, sem direito futuro a fluxo de caixa.
   - **Crédito ativo removido** das listagens vivas: brand book ativo, `growthclub.pro/sobre`, página `/crew` (se existir), apresentações públicas futuras.
   - **Artefatos históricos publicados não são redatados** — newsletters, posts, edições do livecast que já mencionaram o Crew member permanecem como estão (impraticável retroagir publicações).

9. **Saída amigável voluntária antes dos 36 meses:** Crew pode sair voluntariamente a qualquer momento mediante comunicação por escrito com 30 dias de antecedência. Aplica-se §8 (perde tudo automaticamente). Sem ônus financeiro pra Crew.

10. **Compensação não-monetária (exposição):** lista de alavancas de exposição (brand book, palco no Meetup S1E1, post no LinkedIn do Henrique, edição da newsletter, subpáginas autorais) **fica em aberto e será definida no anexo do contrato individual** com cada Crew member, antes da assinatura. Default mínimo: crédito no brand book ativo da Era Pré-S1 enquanto vínculo ativo.

**Consequences:**
- Destrava capacidade técnica de entregar marca v1 + site + repo público até Barte S1E1 sem custo de caixa.
- Cria narrativa "Era Pré-S1 = Founder Crew" (quando Founder Member tier voltar — AD-003 retomada — narrativa pode evoluir).
- Compromete 30% do lucro líquido por até 36 meses, em troca de entregas que destravam a operação.
- Estende §11 do Business Plan (legal/operacional pendente) — agora há urgência adicional de redigir o Acordo de Founder Crew com revisão jurídica antes da 1ª assinatura.
- Locked decision #5 do `CLAUDE.md` editada pra refletir Founder Crew como categoria nova ativa Era Pré-S1.

**Alternatives considered:**
- Consumir 3 das 25 vagas Founder Member pagas (descartado: corrói receita Barte e mistura modelo de negócio de membership consumidor com trabalhador trocando labor por upside).
- Mútuo conversível com equity (Caminho A — descartado: exige CNPJ + cap table primeiro, atrasa WhatsApp 30-60 dias, custo legal R$ 9-40k).
- Bônus único por milestone sem revshare contínuo (descartado: não cria vínculo de 3 anos, não alinha com narrativa Era Pré-S1).
- Pool unificado de 30% pra Founder Member + Crew (Cenário C da deliberação — descartado em favor de Cenário A: 30% só pro Crew, com Founder Member parqueado em AD-003).

**Métricas de sucesso (validar com Henrique):**
- 3 vagas Founder Crew preenchidas até 2026-05-15.
- Acordo de Founder Crew redigido e revisado juridicamente até 2026-05-10.
- Site `growthclub.pro` no ar até 2026-05-31.
- Identidade aplicada em ≥3 templates de canal até 2026-06-15.
- README do repositório público publicado com ≥10 stars até Barte S1E1 (jun/2026).

---

### AD-001: Business Plan v1.2 aprovado
**Date:** 2026-04-22
**Status:** Accepted
**Context:** Growth Club é uma comunidade brasileira de Growth com 10+ anos de histórico informal (Substack desde 2019 com 2.261 assinantes, meetups desde 2015 com 10+ edições, Community WhatsApp com 715 membros em 7 grupos). Henrique iniciou a profissionalização formal do ativo. Decomposição do pedido original ("plano de negócios + marca + site") em 3 projetos sequenciais: Business Plan → Marca → Site.

**Decision:** Design do business plan em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` aprovado pela revisão independente (2 iterações) e pelo autor humano. Versão congelada: v1.2 (commit `1e374bf`).

**Consequences:**
- Estrutura em 3 tiers: **Growth Hacker** (free) / **Founder Member** (100 cap) / **Growth Hacker Master** (R$ 990/ano na Fase 3)
- Relançamento público atrelado ao **Meetup Growth SP · S1E1 · Barte** (1ª ou 2ª semana de junho/2026)
- Ingresso do meetup = membership Growth Hacker automático (automação CRÍTICA da Fase 1)
- Modelo de receita: Meetups + Workshops high-ticket (estilo AI LIKE A PRO) + Patrocínio Livecast + Founder Members (upfront) + Master (Fase 3)
- Posicionamento: **"Growth de verdade. Stack de verdade. Sem teatro."** — execução, ponte entre silos, tech-first (IA/automação) atrelado a outcome
- Destrava as próximas fases: **Marca** → **Site**

**Alternatives considered:**
- Tier premium "Inner Circle" pra líderes — arquivado para v2+
- Lançamento do zero vs profissionalização — descartado após mapear ativos existentes
- SaaS proprietário — descartado em favor de ferramentas de mercado (Substack, WhatsApp/Circle/Slack, plataforma de site a definir)

---

### ADR-002: Marca v1 — entrega parcial (Chunks 1, 3, 5-textual)
**Date:** 2026-04-27
**Status:** Accepted
**Context:** Após validação profunda dos arquivos da marca, ficou claro que (a) Voice (Chunk 3) já estava 100% pronto — `manifesto.md`, `dos-and-donts.md`, `tom-por-canal.md`, `glossario.md` completos; (b) Decisão 04 (arquitetura de marcas-filhas) foi aceita pragmaticamente sem decompor todos os sub-grupos — `AI LIKE A PRO` é a única marca-filha v1, demais grupos seguem arquivados de fato; (c) Chunk 2 (visual) tem propostas escritas + paleta, tipografia e direção do logo travadas, mas o logo SVG final ainda precisa ser executado em Figma (Steps 1c-1e, ~2 semanas solo).

Henrique optou por destravar o handoff de marca **agora** sem esperar o logo SVG final, gerando assets v0 (placeholder) a partir da bandeira pirata atual (`brand/decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png`).

**Decision:** Marca v1 entregue parcialmente. Brand book consolidado em md + pdf publicáveis; export pack v0 com 9 PNGs + favicon.ico marcados como placeholder; CONVENTIONS.md criado com Brand naming + Voice glossário operacionais. Logo SVG final permanece em produção; templates do Chunk 4 não iniciados.

**Status real por Chunk da marca:**
- Chunk 1 (decisões): ✅ travado (decisões 01–04, com 04 aceita em skeleton)
- Chunk 2 (visual): 🔄 propostas + decisões locked; logo SVG final em produção (Figma solo)
- Chunk 3 (voice): ✅ completo (4 arquivos)
- Chunk 4 (templates): 📋 não iniciado (meetup, newsletter, site handoff kit)
- Chunk 5 (brand book): ✅ textual + PDF + export pack v0 entregues; assets finais aguardam logo SVG

**Consequences:**
- Destrava handoff de marca pra patrocinadores, parceiros e Fase 1 (Site) sem aguardar o logo SVG final.
- Quando o logo final sair, será sessão de follow-up curta: substituir os 10 arquivos em `brand/assets/exports/` + regenerar PDF + remover marca `v0-placeholder` do README. Será registrado em **ADR-003**.
- Fase 1 do `ROADMAP.md` permanece **aberta** — `Brand brief entregue` não foi marcado como `[x]` porque templates Chunk 4 + logo SVG seguem pendentes.
- `CONVENTIONS.md` agora é fonte de verdade pra naming + glossário em fases futuras (Site, conteúdo, marketing) — não reinventar.

**Artefatos entregues nesta sessão (commits):**
- `brand(book): consolidated brand book v1 (markdown)` — `brand/brand-book.md`
- `docs(specs): propagate brand naming + voice rules to CONVENTIONS.md` — `.specs/project/CONVENTIONS.md`
- `brand(assets): export pack v0 placeholder (favicons + OG + PNG fallbacks)` — `brand/assets/exports/`
- `brand(book): PDF export of brand book v1 (placeholder logo)` — `brand/brand-book-v1.pdf` + `.html` + `.css`

**Alternatives considered:**
- Esperar logo SVG final antes de empacotar brand book — descartado: atrasa handoff pra Fase 1 sem ganho real, já que substituir os 10 PNGs depois é trivial.
- Não gerar PDF até logo final — descartado: o PDF textual com tipografia + paleta aplicadas tem valor independente do logo (aplicação visual do sistema decidido em peça real).
- Decompor marcas-filhas formalmente (Decisão 04 completa) — descartado: única marca-filha de fato é AI LIKE A PRO; trabalho cerimonial nos demais sub-grupos.

---

### AD-014: Reset de archetype — Outlaw+Sage → Hero+Magician aspiracional
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-003 in part)

**Context:** Sessão de brainstorming em 2026-05-24 redirecionou posicionamento e voz da marca após o founder concluir que a régua "Franco, com número, sem palco, com cerveja." e o archetype Outlaw+Sage não capturavam a comunidade que ele quer construir. Nova referência adotada: `growth-brazil.webflow.io` (estrutura/copy) + `henriques-amazing-site-a39ead.webflow.io` (elementos visuais Awake-style). Decisão completa documentada em `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`.

**Decision:** Archetype primário passa a ser **Hero + Magician** (aspiracional, inclusivo, "elite do mercado", "transformando o mercado"). Ton-anchor velho ("Franco, com número, sem palco, com cerveja.") aposentado — substituído pelo bloco sub-headline da nova copy ("Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."). `brand/decisions/03-arquetipo-e-tom.md` movido pra `brand/legacy/2026-05-24-archetype-outlaw-sage.md` via `git mv`. Novo arquivo `brand/decisions/05-archetype-multidisciplinar.md` captura a nova decisão. `brand/voice/` (manifesto, dos-and-donts, tom-por-canal, glossario) movido pra `brand/legacy/voice-2026-04/`; `brand/voice/manifesto.md` recriado com voz nova.

**Reversibility:** `brand/legacy/` mantém os artefatos antigos intactos. Reverter = `git mv` de volta + append "revert AD-014" entry neste STATE.md. Custo: 1 commit.

---

### AD-015: Reset de posicionamento — B2B curado → Comunidade multidisciplinar
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-001 §3-§5 in part)

**Context:** AD-001 (Business Plan v1.2) posicionava o Growth Club como "comunidade brasileira de operadores B2B de growth" com cluster analysis (AD-011) reforçando o foco em founders, CROs, growth/RevOps leads, vendedores consultivos B2B. Decisão de reset (2026-05-24) substitui esse posicionamento por "comunidade de Growth multidisciplinar do Brasil" — marketing + vendas + sucesso de clientes + analytics + produtos + founders, sem o filtro B2B-only.

**Decision:** Headline oficial passa a ser "A #1 Comunidade de Growth Multidisciplinar do Brasil". Sub-headline oficial passa a ser "Somos uma comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders". Audiência alvo se expande pra todo profissional de growth, não só operadores B2B. Sections §3-§5 do business plan (audiência, posicionamento, ângulo) ficam parcialmente desatualizadas — Phase 4 da implementação do reset atualiza CLAUDE.md e memory pra refletir isso, mas o spec do business plan original fica intacto como artefato histórico.

**Reversibility:** Reverter exige editar headline em `website/index.html` + reescrever CLAUDE.md "Project at a glance". Custo: 2 commits.

---

### AD-016: Reset de régua editorial — "Se não tem número, não é Growth Club" → retirada
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-001 cultural rule #1)

**Context:** A régua editorial "Se não tem número, não é Growth Club." era o filtro #1 da marca (AD-001 §3.3, brand/decisions/01-bandeira-pirata.md, voice manifesto). Funcionava como porta de entrada cultural — case sem número virava redirecionamento cordial. Decisão de reset (2026-05-24) retira a régua porque a copy literal Growth Brazil adotada como nova verdade não comporta o filtro: "#1 comunidade" não tem número, "elite do mercado" não tem número, "os melhores do mundo" não tem número. Manter a régua junto da nova copy seria contradição interna.

**Decision:** Régua "Se não tem número, não é Growth Club." aposentada. Nenhuma régua editorial substitui no curto prazo — comunidade passa a operar sem filtro editorial explícito (a curadoria continua existindo via triagem de candidatura, mas sem rótulo de regra). Posts/newsletter/WhatsApp/livecast continuam editados pelo founder; só não há mais uma régua nominal pública.

**Reversibility:** Reverter exige reintroduzir a régua em CLAUDE.md, brand/decisions/, voice/manifesto. Custo: 3 commits.

---

### AD-017: Reativação de AD-008 paleta — Tonal Warm puro → AD-008 estendido com soft tints
**Date:** 2026-05-24
**Status:** Accepted (supersedes the 2026-05-24 brainstorming-internal Tonal Warm pure approval)

**Context:** Durante a sessão de brainstorming de 2026-05-24, o founder aprovou momentaneamente uma paleta "Tonal Warm sem accent" (Paper #F7F5F0 + Charcoal #1C1B18 + Ash #6B6862 only, sem Amber/Teal/Brick). Essa aprovação foi superada pela escolha posterior do estilo Awake-inspired, que requer cor de accent — sem cor, cards pastel, retratos com círculos coloridos e pricing destacado não funcionam visualmente.

**Decision:** AD-008 (Growth Club Design System) é reativado com extensão. Paleta volta a ter: Paper `#F7F5F0`, Paper deep `#ECE7D6`, Charcoal `#1C1B18`, Ash `#6B6862`, Amber Beer `#D4A24C`, Pirate Teal `#4FB3A5`, Brick Red `#B84A3E`. Adicionados novos tokens de soft tint pra suportar o estilo Awake: `--amber-soft #F2E2C0`, `--teal-soft #CDEDE7`, `--brick-soft #F4D5CF`, `--warm-neutral #E8E2D0`, `--sage-soft #DDE6E2`. Fontes Satoshi + Roboto Mono mantidas (AD-008 → keep). Componentes web (`<gc-header>`, `<gc-footer>`) mantidos com ajustes de markup pro nav pill da Phase 3.

**Reversibility:** Reverter exige editar `tokens.css` e remover os soft tints. Custo: 1 commit.

---

### AD-018: 3 pilares → 4 pilares — adicionar "Ferramentas" ao lado dos 3 existentes
**Date:** 2026-05-24
**Status:** Accepted (supersedes Decisão 05 §3 pilares — locked passa a ser 4 pilares)

**Context:** Visual review da home em localhost durante Phase 3 (2026-05-24) revelou que a página estava com gap de conteúdo comparada à referência `growth-brazil.webflow.io`. A referência usa 4 pilares (Encontre Talentos / Resolva Problemas / Conheça Pessoas / Ferramentas) enquanto Decisão 05 (commit cdeca07) tinha lockado 3 pilares (Encontre Talentos / Conteúdo Denso / Vibe Única). User aprovou expandir pra 4 mantendo os 3 existentes + adicionando "Ferramentas".

**Decision:** A locked decision §3 pilares da Decisão 05 muda de 3 pra 4. Os 4 pilares oficiais passam a ser:

1. **Encontre Talentos** (preservado) — "Alcance pessoas em nosso canal de contratação. Seja para um consultor pontual ou um funcionário full-time, a elite do mercado está aqui."
2. **Conteúdo Denso** (preservado) — "Curadoria diária e compartilhamento de conhecimento replicável. Newsletters, Lives Semanais e AMAs com os melhores do mundo."
3. **Vibe Única** (preservado) — "Novo ou avançado, tímido ou extrovertido. Nossos membros possuem ideias semelhantes e diferentes. Somos uma comunidade agnóstica onde a troca é real."
4. **Ferramentas** (novo) — "Templates, checklists e frameworks compartilhados pela comunidade. Materiais práticos editáveis para acelerar o seu dia a dia em Growth."

Grid da home muda de 3-col pra 4-col em desktop (responsivo: 2-col em tablet, 1-col em mobile). `brand/decisions/05-archetype-multidisciplinar.md` é editado pra adicionar o 4o pilar (em vez de abrir Decisão 06 separada — mantém Decisão 05 como source of truth dos pilares atualizado).

**Reversibility:** Reverter exige editar STATE + Decisão 05 (remover 4o pilar) + index.html (remover card) + CSS (volta 3-col). Custo: 3 commits.

---

### AD-019: Usability/delight pass no site — chrome épico + camada de animação progressiva
**Date:** 2026-06-10
**Status:** Accepted

**Context:** Deep review de usabilidade solicitado pelo Henrique ("site 6/10, quero 9/10 — faltam animações, ícones épicos, hero memorável, nav e footer épicos"). O review revelou que `chrome.css` já continha estilos completos pra um footer rico (footer-hero CTA, footer-stats, orbs, manifesto pull-quote, social, build-in-public) e pro chip de meetup na nav, mas `header.js`/`footer.js` renderizavam só a versão mínima. O sistema de scroll-reveal nativo (components.css §14) cobria apenas classes legadas (`.problem`, `.layers`...) — nenhuma seção `.home-*` animava. O menu mobile usava hack frágil (`top: calc(100% + 280px)`).

**Decision:** Pass de usabilidade em 6 frentes, tudo progressivo (sem JS ou com `prefers-reduced-motion` o conteúdo fica 100% visível e estático — coerente com L-003):

1. **Nav épica** (`header.js` + `chrome.css`): chip do próximo meetup (S1·E1 · 9 JUL · SP, pulse dot, some <1160px), barra de progresso de scroll amber→teal (CSS scroll-driven, degrada invisível), hamburger animado (3 barras → X), painel mobile reconstruído (links + chip + CTA num dropdown animado, fecha com Esc/clique).
2. **Footer épico** (`footer.js`): footer-hero CTA ("Cresça com quem já passou pela curva."), footer-stats (5 números com count-up), orbs decorativos, manifesto pull-quote com o ton-anchor verbatim, social row (Substack/LinkedIn/GitHub), link build-in-public. Opt-outs: `data-cta="off"` (home + páginas de conversão/obrigado), `data-stats="off"` (home, que já tem os números no hero).
3. **Hero memorável** (`pages.css` + `index.html`): badge com pulse dot ("Desde 2015 · Meetup S1·E1 em 9 jul"), orbs flutuantes amber/teal, entrada em stagger, sublinhado animado no *Multidisciplinar*, focus ring no form.
4. **Scroll reveal** (`enhance.js` novo): IntersectionObserver marca heads/grids da home + footer com `[data-reveal]` e stagger; estado escondido gated em `html.gc-js`.
5. **Count-up** (`enhance.js`): stats da home/meetup/footer sobem de 0 com formatação pt-BR ao entrar no viewport.
6. **Micro-interações** (`components.css`): ícones dos pilares viram squircles 56px com gradiente por tinta + hover scale/rotate, feature icons 48px com inversão amber no hover, marquee infinito na régua de logos (pausa no hover, mask fade), aspas decorativas nos testimonials, lifts em cards, sheen sweep nos botões primary, FAQ com expansão suave (`interpolate-size`, Chrome 129+).

`enhance.js` foi adicionado a todas as 20 páginas (defer). Cache CSS bumped pra `v=20260610`. Smoke test Playwright (desktop+mobile) verde.

**Reversibility:** Reverter = git revert do commit; nenhum dado/contrato externo afetado.

---

## Active Blockers

### B-001 (URGENTE): Revisar TODA documentação oficial pro novo padrão 2026-05-25
**Date opened:** 2026-05-25
**Owner:** Henrique (revisão) + agente Claude (execução)
**Status:** Open — bloqueia consistência editorial cross-channel

**Context:** O site público (`website/`) foi alinhado em 2026-05-25 a um conjunto de regras editoriais novas (AD-016 a AD-022). A documentação interna em `docs/`, `brand/`, `.specs/` continua reflexo do estado anterior (~120 ocorrências de "operador" só nos MDs, várias menções a "Barte" como evento ativo, descrições antigas de tier pago Master como ativo, "mesa de canto" como pitch).

**Scope da revisão:** todos os arquivos `*.md` em:
- `docs/community/`, `docs/crew/`, `docs/investors/`, `docs/sponsors/`, `docs/superpowers/`, `docs/legacy/`
- `brand/decisions/`, `brand/visual/`, `brand/voice/`, `brand/legacy/`
- `.specs/project/` (exceto este STATE.md, que é append-only)
- `README.md`, `CHANGELOG.md`, `SECURITY.md` na raiz

**Regras a aplicar (referência canonical = memory files):**
1. **Termo `operador` → `especialista`** (ver [[feedback-termo-especialista]]). Preservar "operacional", "operadora", "operação".
2. **Remover "mesa de canto"** (ver [[feedback-mesa-de-canto-proibida]]). Substituir por "comunidade", "especialista com especialista", "conversa entre pares".
3. **Meetup S1·E1 = CRMBonus 9 jul 2026** (ver [[project-meetup-s1e1-crmbonus]]). Barte parqueado, sem data. Não usar como evento ativo.
4. **CNPJ canonical: Level Tecnologia da Informação Ltda · 64.685.768/0001-29** (ver [[reference-cnpj-canonical]]). Substituir placeholders "CNPJ em registro", "CNPJ TBD", "Hospedado por Level Tech" sem detalhe.
5. **Tier pago Master parqueado** (ver [[feedback-tier-pago-nao-aparece]]). Em docs internas pode mencionar como histórico/planejado, mas não como produto ativo. Atualizar Business Plan, Brand Brief, Founder Crew docs.
6. **Voz sem regionalismo** (ver [[feedback-voz-sem-regionalismo]]). Editorial neutro, sem mineiro/paulista/carioca.
7. **Páginas legais atualizadas** (ver AD-018). Se brand book ou docs referenciam termos/privacidade antigos, sincronizar.

**Approach sugerido:**
- Fase 1 (quick wins via script): `\boperador(es)?\b → especialista(s)` site-wide em MD. Estimativa 120 substituições.
- Fase 2 (curadoria manual): caçar "mesa de canto", "Barte", "Master tier", "CNPJ em registro" — substituir caso a caso preservando contexto.
- Fase 3 (revisão estrutural): Business Plan v1.2 (`docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md`), Brand Brief Plan, brand decisions/voice files — verificar coerência ampla.

**Quando atacar:** próxima sessão dedicada (não meter no meio de outras tasks). Estimativa: 2-3 horas focadas. Dependência: nenhuma. Bloqueia: nada técnico, mas bloqueia coerência editorial cross-channel se docs vazarem pra investidor/imprensa/crew sem alinhamento.

---

---

## Active Risks

Catalogados em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` §9.2 (R1 a R10) com mitigação registrada:
- R1 Sobrecarga operacional · R2 Engajamento free ≠ conversão paga · R3 Contaminação editorial por patrocínio · R4 Passivo jurídico de revshare · R5 Dor de arrependimento no "trancar" · R6 Fragmentação dos sub-grupos · R7 Automação ingresso→membership crítica · R8 Inflação não-engajada · R9 Dependência de plataformas de terceiros (Substack/Meta) · R10 Compliance LGPD

### R-11: Cash flow Barte S1E1 sem fonte de receita upfront identificada
**Origem:** AD-003 (Founder Member tier parqueado) — receita prevista de R$ 51.975 (25 × R$ 2.079) não materializa.
**Probabilidade:** Alta — a decisão de parking é voluntária e aceita pelo founder.
**Impacto:** Médio — founder absorve déficit operacional pessoalmente.
**Decisão de mitigação (2026-04-28):** **Henrique absorve o gap pessoalmente.** Não haverá pre-sale GH Master forçado nem ingressos pagos comerciais agressivos com objetivo de cobrir o gap em curto prazo. Princípio explicitado pelo founder: **"Não tem promessa de dinheiro no curto prazo"** — princípio que se estende tanto à comunicação interna com Founder Crew (AD-005, transparência radical) quanto à narrativa pública do Barte S1E1.
**Mitigações passivas (não-forçadas, podem materializar oportunisticamente):**
- (a) Patrocínio livecast (amigo da agência mencionado em AD-001) — segue como meta orgânica de fechamento.
- (b) Ingressos do Barte S1E1 podem ser pagos por razões estratégicas (filtro de qualidade), não como mitigação de R-11.
- (c) Workshops AI LIKE A PRO em formato pago seguem como receita orgânica recorrente.
**Owner:** Henrique
**Status:** Mitigado por absorção consciente — risco aceito.

---

## Lessons Learned

### L-004: Regionalismo geográfico em copy editorial multidisciplinar é caro
**Context:** Em 2026-05-25, tentei "tempero mineiro" (cê / tá / vamo / pra) em ~14 páginas a pedido do Henrique. Após visualizar, Henrique pediu reverter urgente.
**Problem:** A voz Growth Club já é coloquial e franca (não institucional/corporativa). Adicionar marcadores regionais cria 2 problemas: (a) limita o alcance percebido — comunidade de 33 cidades e 7 estados não é "mineira", (b) parece artificial em copy que precisa funcionar pra leitor em qualquer região do Brasil. A voz default já é humanizada (CLAUDE.md global manda usar humanizer skill que remove AI-isms) — adicionar regionalismo é overshoot. Tentativa de "humanizar mais" via sotaque foi confundida com "tornar mais natural", mas o resultado prático foi parecer caricatura.
**Solution:** Voz padrão = editorial neutra brasileira, sem marcadores regionais. Quando um usuário pede "mais natural", verificar se a copy atual já passou pelo humanizer skill antes de inventar nova camada de tempero. Regionalismo só entra se houver decisão explícita de targeting regional (que não é o caso do Growth Club — escopo nacional).
**Aplicável a:** futuras tentativas de "humanizar" / "deixar mais natural" prosa do site. Memory file [[feedback-voz-sem-regionalismo]] sintetiza a regra.

### L-003: Scroll-driven CSS com `opacity: 0` no `from` quebra snapshots e bots
**Context:** Phase 3 do refino técnico (AD-013) substituiu `scroll-reveal.js` por CSS `animation-timeline: view()` aplicado às seções `.problem`, `.layers`, `.timeline`, `.section`, etc. Keyframe original animava `opacity: 0 → 1` + `transform: translateY(28px) → 0` com `animation-fill-mode: both`.
**Problem:** `animation-fill-mode: both` aplica o estado `from` da animação **antes** do range entrar. Pra elementos abaixo do viewport (que ainda não entraram no scrollport), isso significava `opacity: 0` permanente até que o scroll trigerasse o range. Comportamento invisível pro usuário scrollando normalmente, mas catastrófico pra: (a) screenshots full-page (Chrome DevTools, Puppeteer, Playwright), (b) print-to-PDF, (c) crawlers de SEO/redes sociais com link preview, (d) screen readers que pulam por estrutura, (e) browsers sem suporte a `animation-timeline: view()` (Firefox até ~2025). Smoke test visual no Chrome DevTools MCP pegou o bug imediatamente — a home renderizava só hero + footer com vazio massivo no meio.
**Solution:** Animar **apenas `transform`**, manter `opacity: 1` sempre. Efeito slide-up preservado, mas conteúdo sempre visível em qualquer contexto não-scrollado. Regra geral: **scroll-driven CSS que altera visibilidade exige fallback estático garantido**. Se o efeito precisar de fade-in real, alternativa é usar `@scroll-timeline` JS-driven com observer que adiciona class explícita — mas o custo de manutenção volta a empatar com `IntersectionObserver` puro. Trade-off resolvido: animar só transforms baratos, dispensar opacity em scroll-driven.
**Aplicável a:** qualquer animação CSS aplicada via `animation-timeline` (view/scroll/custom). Especialmente perigoso em sites multi-page estáticos onde crawlers/snapshots representam % significativa do tráfego.

### L-002: Categoria nova vs. adaptar tier existente
**Context:** Ao desenhar remuneração pra operadores que vão entregar site/identidade/repo, considerou-se incluir essas pessoas dentro do tier Founder Member existente (R$ 2.079 pago) com algum desconto/exceção.
**Problem:** Misturar consumidor pagante (paga acesso + recebe revshare proporcional a referral) com trabalhador trocando labor por upside (ganha revshare por entrega) corrompe a narrativa de ambos. Founder Member que pagou R$ 2.079 olharia o "Founder Member que não pagou" e reclamaria — corrosão da percepção de valor do tier prêmio.
**Solution:** Criar categoria paralela com nome distinto (Founder Crew), regra distinta (revshare por entrega, não por referral), e narrativa distinta (tripulação que faz o barco andar, não passageiro fundador). Aplicável a futuras decisões de tiering — quando dois grupos têm naturezas jurídicas/comerciais diferentes, separe nomenclatura mesmo que o cap-table fique mais complexo.

### L-001: Ativos orgânicos preexistentes mudam a natureza do design
**Context:** No meio do brainstorming, o autor revelou que o Growth Club já tem 2.261 assinantes Substack + 715 Community WhatsApp + 10+ meetups realizados desde 2015.
**Problem:** As 10 primeiras decisões do brainstorming assumiam greenfield; ficaram parcialmente descalibradas quando o contexto real apareceu.
**Solution:** Imediatamente redirecionar o framing de "lançamento do zero" para "profissionalização de ativo vivo". Antes de perguntar "como construir X", perguntar "existe algo parecido já rodando?". Incorporar ativos preexistentes como pilares do design (marca, tom, cadência) em vez de descartá-los.

---

## Deferred Ideas

Decisões conscientemente deferidas com gatilho de retomada estão registradas em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` §9.1 e §11 (Estrutura Legal e Operacional).
