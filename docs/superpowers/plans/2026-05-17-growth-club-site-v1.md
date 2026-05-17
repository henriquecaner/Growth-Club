# Site Growth Club v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) ou `superpowers:executing-plans` pra implementar este plan task-by-task. Steps usam checkbox (`- [ ]`) syntax pra tracking.

**Goal:** Implementar o site `growthclub.pro` v1 em HTML5 semântico + Modern CSS + JS vanilla, com deploy automático no Cloudflare Pages, materializando o spec aprovado em `docs/superpowers/specs/2026-05-17-growth-club-site-design.md` (AD-006) na stack definida em AD-007.

**Architecture:** Static-first sem build step. Cada página é um arquivo `.html` na pasta `website/`. Header e footer são **Custom Elements (web components nativos)** pra evitar duplicação em 20+ páginas. CSS modular: tokens · chrome · components · pages. JavaScript vanilla pra forms, scrollspy e slot dinâmico. Hospedagem no Cloudflare Pages com auto-deploy via push pra `main`.

**Tech Stack:**
- HTML5 semântico
- Modern CSS (nesting nativo, custom properties, grid, flex, container queries)
- JavaScript vanilla + Web Components (Custom Elements API)
- Cloudflare Pages (hosting + CDN + auto-deploy via Git)
- Substack (newsletter, redirect com email pré-preenchido via URL params)
- Tally (form backend pra contato, WhatsApp invite, anuncio de vaga)
- YouTube/LinkedIn (livecast embed)
- Plausible (analytics — opcional, proposta)
- Fontes self-hosted (Archivo Black + Inter)

---

## Pre-flight — Conteúdo concreto a coletar

Cada item abaixo vai ser inserido no HTML correspondente. Você pode (a) escrever upfront em arquivos markdown na pasta `website/content/` antes de codar, ou (b) escrever direto no HTML à medida que cada página é construída — **recomendado (b) pela simplicidade**.

**Críticos (página fica com placeholder se faltar):**

- [ ] Hero copy curto (versão hero do manifesto, 2-3 frases) — usado em `index.html`
- [ ] Manifesto long-form expandido (escolher 1 das 3 versões em `brand/voice/manifesto.md`, ajustar pra ~1200-2000 palavras) — usado em `sobre.html#manifesto`
- [ ] História do Growth Club (2-3 parágrafos: 2015→2019→2026) — usado em `sobre.html`
- [ ] Bio oficial do Henrique + foto profissional (~1MB max) — usado em `sobre.html#imprensa`
- [ ] Fact sheet de imprensa (números atualizados, fundação, marcos) — `sobre.html#imprensa`
- [ ] Press kit ZIP (logos SVG/PNG + fotos) — em `website/assets/press-kit/growth-club-press-kit.zip`
- [ ] Bios + fotos do Founder Crew (3 vagas) — `sobre.html#crew` (pode ir ao ar com lista provisória)
- [ ] 2-3 depoimentos do core (nome + role + empresa + quote curto) — `index.html` seção 8
- [ ] FAQ de `/membro` (4-6 perguntas com resposta curta) — `membro.html`
- [ ] Copy de cada anchor `/empresas`: `#patrocinio` (media kit resumo), `#vagas` (pitch anunciar vaga), `#hunting` (pitch consultivo), `#mentoria` (pitch + mentores)
- [ ] Política de não-contaminação editorial (~3 parágrafos) — `empresas.html`
- [ ] Conteúdo do meetup `sp-s1e1-barte`: nome canônico, data, local, agenda, palestrantes, preços, patrocinadores, FAQ — `meetups/sp-s1e1-barte.html`
- [ ] Histórico das 10+ edições passadas (data · cidade · tema · estimativa de participantes) — `meetups/historico.html`
- [ ] Histórico de episódios do livecast (export do YouTube/LinkedIn, ~5-10 últimos) — `recursos/livecast.html`
- [ ] Pitch de cada `/recursos/*` (5 páginas curtas, ~150-300 palavras cada)
- [ ] Logos + 1 número marcante de patrocinadores B2B (com autorização) — `index.html` seção 4-6 + `empresas.html`
- [ ] Política de privacidade, Termos de uso, LGPD (escritas e juridicamente revistas) — 3 arquivos legais
- [ ] Logo SVG final (Chunk 2 da marca em produção Figma)

**Não-críticos (página vai ao ar mesmo se faltar):**

- [ ] OG images personalizadas por página (default `og-default.png` cobre v1)
- [ ] Favicon completo (16, 32, apple-touch-icon, maskable)
- [ ] Mapa embed em `meetups/sp-s1e1-barte.html` (precisa endereço final do Barte)

---

## File Structure

Mapa de arquivos que esse plan vai criar:

```
website/
├── README.md                   [MODIFY — atualizar com Cloudflare Pages instructions]
├── index.html                  [CREATE — Home, 9 seções]
├── sobre.html                  [CREATE — single-page com anchors]
├── membro.html                 [CREATE — caminho único free]
├── membro/
│   └── obrigado.html           [CREATE — TY page]
├── empresas.html               [CREATE — single-page com anchors B2B]
├── contato.html                [CREATE]
├── contato/
│   └── obrigado.html           [CREATE — TY page]
├── recursos/
│   ├── newsletter.html         [CREATE]
│   ├── aulas.html              [CREATE — placeholder "em breve"]
│   ├── livecast.html           [CREATE]
│   ├── workshops.html          [CREATE]
│   └── comunidade.html         [CREATE]
├── meetups/
│   ├── index.html              [CREATE — hub]
│   ├── historico.html          [CREATE]
│   └── sp-s1e1-barte.html      [CREATE — 1ª LP, template para próximas]
├── privacidade.html            [CREATE]
├── termos.html                 [CREATE]
├── lgpd.html                   [CREATE]
├── codigo-de-conduta.html      [CREATE]
├── 404.html                    [CREATE]
├── sitemap.xml                 [CREATE]
├── robots.txt                  [CREATE]
├── _redirects                  [CREATE — Cloudflare Pages]
├── _headers                    [CREATE — Cloudflare Pages security]
└── assets/
    ├── css/
    │   ├── tokens.css          [CREATE — paleta, tipografia, spacing]
    │   ├── chrome.css          [CREATE — header e footer]
    │   ├── components.css      [CREATE — cards, buttons, forms]
    │   └── pages.css           [CREATE — específico por página]
    ├── js/
    │   ├── header.js           [CREATE — <gc-header> custom element]
    │   ├── footer.js           [CREATE — <gc-footer> custom element]
    │   ├── newsletter-form.js  [CREATE — redirect Substack pré-preenchido]
    │   ├── scrollspy.js        [CREATE — anchors em /sobre e /empresas]
    │   └── slot-dinamico.js    [CREATE — Home seção 7]
    ├── data/
    │   └── slot-dinamico.json  [CREATE — config do slot dinâmico]
    ├── fonts/
    │   ├── ArchivoBlack-Regular.woff2  [ADD — Google Fonts download]
    │   └── Inter-Variable.woff2        [ADD — Google Fonts download]
    ├── images/
    │   ├── og-default.png      [CREATE — OG 1200x630 padrão]
    │   ├── logo.svg            [CREATE — placeholder v0 até logo final]
    │   ├── favicon.ico         [CREATE]
    │   └── apple-touch-icon.png[CREATE]
    └── press-kit/
        └── growth-club-press-kit.zip
```

---

## Task 1: Setup repositório + Cloudflare Pages

**Goal:** Repositório preparado pra deploy automático no Cloudflare Pages. Domínio apontado.

**Files:**
- Create: `website/robots.txt`
- Create: `website/_redirects`
- Create: `website/_headers`
- Modify: `website/README.md`

- [ ] **Step 1.1: Criar pastas básicas dentro de `website/`**

```bash
cd website
mkdir -p assets/{css,js,data,fonts,images,press-kit}
mkdir -p meetups membro/obrigado contato/obrigado recursos
ls -la
```

Expected: pastas criadas vazias (a `legacy/` continua presente do estado anterior).

- [ ] **Step 1.2: Criar `website/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://growthclub.pro/sitemap.xml
```

- [ ] **Step 1.3: Criar `website/_redirects`**

```
# Cloudflare Pages — redirects/rewrites
# Formato: source destination status

# Subpastas que servem o arquivo único equivalente
/membro/         /membro.html        200
/empresas/       /empresas.html      200
/sobre/          /sobre.html         200
/contato/        /contato.html       200

# Trailing slash normalization é automático no Cloudflare Pages
```

- [ ] **Step 1.4: Criar `website/_headers`**

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/css/*
  Cache-Control: public, max-age=86400
```

- [ ] **Step 1.5: Modificar `website/README.md`**

Adicione (no final) a seção:

```markdown
## Stack e Deploy (AD-007, 2026-05-17)

- **Stack:** HTML5 semântico + Modern CSS + JavaScript vanilla. Sem build step. Sem `node_modules`.
- **Hosting:** Cloudflare Pages.
- **Deploy:** push pra branch `main` dispara rebuild automático em ~30s.
- **Domínio:** `growthclub.pro`.

### Rodar localmente

```bash
python3 -m http.server 8080
# ou
npx serve .
```

Abra `http://localhost:8080` no browser.

### Adicionar nova edição de meetup

1. Copie `meetups/sp-s1e1-barte.html` pra `meetups/<slug-nova-edicao>.html`.
2. Substitua todos os campos marcados com `[CAMPO]` pelos dados da nova edição.
3. Adicione um card no `meetups/index.html` linkando pra nova edição.
4. Commit + push.
```

- [ ] **Step 1.6: Conectar repositório no Cloudflare Pages**

No browser, vá em https://dash.cloudflare.com → **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git** → escolha o repo `Growth-Club`.

Build settings:
- Framework preset: **None**
- Build command: *(vazio)*
- Build output directory: `website`
- Root directory: `/` (raiz do repo)

Clique **Save and Deploy**. Primeiro deploy roda em ~1min.

- [ ] **Step 1.7: Apontar domínio `growthclub.pro`**

Cloudflare Pages → seu projeto → **Custom domains** → **Set up a custom domain** → `growthclub.pro` → **Add**.

Se DNS já está na Cloudflare, apontamento é automático. Senão, configurar CNAME no registrar:
```
CNAME @ growth-club.pages.dev
CNAME www growth-club.pages.dev
```

SSL é provisionado automaticamente em ~5min.

- [ ] **Step 1.8: Commit + verificar deploy**

```bash
git add website/robots.txt website/_redirects website/_headers website/README.md
git commit -m "feat(site): setup Cloudflare Pages config + base structure"
git push origin main
```

Aguarde ~30s e visite `https://growthclub.pro/robots.txt`. Expected: arquivo servido.

---

## Task 2: Design tokens + base CSS

**Goal:** CSS modular com design tokens (paleta, tipografia, spacing), reset, typography base e utilities.

**Files:**
- Create: `website/assets/css/tokens.css`
- Create: `website/assets/css/components.css`
- Create: `website/assets/css/pages.css` (vazio por enquanto)
- Add: `website/assets/fonts/ArchivoBlack-Regular.woff2`
- Add: `website/assets/fonts/Inter-Variable.woff2`

- [ ] **Step 2.1: Baixar fontes self-hosted**

```bash
cd website/assets/fonts/

# Archivo Black (Google Fonts via google-webfonts-helper)
curl -sL "https://gwfh.mranftl.com/api/fonts/archivo-black?download=zip&subsets=latin,latin-ext&variants=regular&formats=woff2" -o archivo.zip
unzip -j archivo.zip "*.woff2" -d .
mv archivo-black-v* ArchivoBlack-Regular.woff2  # ajustar nome se variar
rm archivo.zip

# Inter Variable
curl -sL "https://github.com/rsms/inter/releases/latest/download/Inter.zip" -o inter.zip
unzip -j inter.zip "*.var.woff2" -d .
mv InterVariable.woff2 Inter-Variable.woff2
rm inter.zip

ls -la
```

Expected: `ArchivoBlack-Regular.woff2` e `Inter-Variable.woff2` na pasta.

- [ ] **Step 2.2: Criar `website/assets/css/tokens.css`**

```css
/* Design tokens — Growth Club v1 */
/* Source of truth: brand/visual/paleta-primaria.md + brand/visual/tipografia.md */

@font-face {
  font-family: 'Archivo Black';
  src: url('/assets/fonts/ArchivoBlack-Regular.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/assets/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

:root {
  /* Cores — placeholder até paleta final do brand book ser confirmada */
  --color-bg: #0a0a0a;
  --color-bg-alt: #141414;
  --color-fg: #f5f5f5;
  --color-fg-muted: #a8a8a8;
  --color-accent: #4ad97f;       /* verde-pirata da bandeira atual */
  --color-accent-dark: #2d5a3d;
  --color-warning: #f3dcb9;
  --color-border: rgba(255,255,255,0.12);

  /* Tipografia */
  --font-display: 'Archivo Black', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, monospace;

  --fs-xs:   0.78rem;
  --fs-sm:   0.88rem;
  --fs-base: 1rem;
  --fs-md:   1.125rem;
  --fs-lg:   1.375rem;
  --fs-xl:   1.875rem;
  --fs-2xl:  2.5rem;
  --fs-3xl:  3.75rem;
  --fs-hero: clamp(2.5rem, 6vw, 5rem);

  --lh-tight: 1.1;
  --lh-snug: 1.3;
  --lh-base: 1.55;
  --lh-loose: 1.75;

  /* Spacing (8pt grid) */
  --sp-1: 0.25rem;
  --sp-2: 0.5rem;
  --sp-3: 0.75rem;
  --sp-4: 1rem;
  --sp-5: 1.5rem;
  --sp-6: 2rem;
  --sp-8: 3rem;
  --sp-10: 4rem;
  --sp-12: 6rem;
  --sp-16: 8rem;

  /* Layout */
  --container-max: 72rem;
  --container-narrow: 56rem;
  --container-prose: 42rem;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Transitions */
  --t-fast: 120ms ease;
  --t-base: 240ms ease;

  /* Z-layers */
  --z-header: 100;
  --z-modal: 200;
}

/* Reset minimal */
*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* compensa header sticky */
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--fs-base);
  line-height: var(--lh-base);
  color: var(--color-fg);
  background: var(--color-bg);
  font-feature-settings: "kern", "liga", "calt", "ss01";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, svg, video { display: block; max-width: 100%; height: auto; }

a {
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;

  &:hover { text-decoration-thickness: 2px; }
  &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
}

button, input, textarea, select { font: inherit; color: inherit; }

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 900;
  line-height: var(--lh-tight);
  margin: 0;
}

h1 { font-size: var(--fs-3xl); }
h2 { font-size: var(--fs-2xl); }
h3 { font-size: var(--fs-xl); }
h4 { font-size: var(--fs-lg); }

p, li { margin: 0; }

/* Utility: container */
.container { width: 100%; max-width: var(--container-max); margin-inline: auto; padding-inline: var(--sp-5); }
.container-narrow { max-width: var(--container-narrow); }
.container-prose { max-width: var(--container-prose); }

/* Utility: stack (vertical rhythm) */
.stack > * + * { margin-top: var(--space, var(--sp-5)); }
.stack-sm > * + * { margin-top: var(--sp-3); }
.stack-lg > * + * { margin-top: var(--sp-8); }

/* Utility: cluster (horizontal flex wrap) */
.cluster { display: flex; flex-wrap: wrap; gap: var(--gap, var(--sp-4)); align-items: center; }

/* Utility: visually hidden but accessible */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* Section spacing */
.section { padding-block: var(--sp-12); }
.section-sm { padding-block: var(--sp-8); }
.section-lg { padding-block: var(--sp-16); }

@media (max-width: 768px) {
  h1 { font-size: var(--fs-2xl); }
  h2 { font-size: var(--fs-xl); }
  .section, .section-lg { padding-block: var(--sp-8); }
}
```

- [ ] **Step 2.3: Criar `website/assets/css/components.css`**

```css
/* Reusable components — Growth Club v1 */

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-5);
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-size: var(--fs-base);
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform var(--t-fast), background var(--t-fast), border-color var(--t-fast);

  &:hover { transform: translateY(-1px); text-decoration: none; }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
}

.btn-primary {
  background: var(--color-accent);
  color: #0a0a0a;

  &:hover { background: color-mix(in oklab, var(--color-accent) 90%, white); }
}

.btn-secondary {
  background: transparent;
  color: var(--color-fg);
  border-color: var(--color-border);

  &:hover { border-color: var(--color-fg); }
}

.btn-lg { padding: var(--sp-4) var(--sp-6); font-size: var(--fs-md); }

/* Card */
.card {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--sp-5);
  transition: border-color var(--t-fast), transform var(--t-fast);

  &:hover { border-color: var(--color-fg-muted); transform: translateY(-2px); }

  & h3 { font-size: var(--fs-md); margin-bottom: var(--sp-2); }
  & p { color: var(--color-fg-muted); font-size: var(--fs-sm); }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--sp-4);
}

/* Pill / badge */
.pill {
  display: inline-block;
  padding: var(--sp-1) var(--sp-3);
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 999px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
}

.pill-warning { background: rgba(243,220,185,0.1); border-color: var(--color-warning); color: var(--color-warning); }

/* Form */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.field label { font-size: var(--fs-sm); color: var(--color-fg-muted); font-weight: 600; }

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-fg);
  font-size: var(--fs-base);
  transition: border-color var(--t-fast);

  &:focus { outline: none; border-color: var(--color-accent); }
}

.field textarea { resize: vertical; min-height: 8rem; }

.field-checkbox {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  font-size: var(--fs-sm);
  color: var(--color-fg-muted);

  & input { width: auto; margin-top: 0.2em; }
}

.form-newsletter {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
  align-items: stretch;

  & input { flex: 1 1 14rem; min-width: 0; }
  & button { flex: 0 0 auto; }
}

/* Pra-quem-é / pra-quem-não-é (split) */
.split-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-6);

  @media (max-width: 640px) { grid-template-columns: 1fr; }

  & > * {
    padding: var(--sp-5);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }

  & h3 { color: var(--color-accent); margin-bottom: var(--sp-3); }

  & ul { list-style: none; padding: 0; }
  & li {
    padding: var(--sp-2) 0;
    border-bottom: 1px solid var(--color-border);

    &:last-child { border-bottom: 0; }
  }
}

/* Proof bar (números) */
.proof-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-6);
  justify-content: center;
  padding-block: var(--sp-6);
  border-block: 1px solid var(--color-border);

  & .proof-item {
    text-align: center;

    & strong {
      display: block;
      font-family: var(--font-display);
      font-size: var(--fs-2xl);
      line-height: 1;
      color: var(--color-accent);
    }

    & span {
      display: block;
      margin-top: var(--sp-1);
      font-size: var(--fs-sm);
      color: var(--color-fg-muted);
    }
  }
}

/* Sub-group label */
.subgroup-label {
  font-size: var(--fs-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: var(--sp-3);
}

/* Hero */
.hero {
  padding-block: clamp(4rem, 12vw, 8rem);
  text-align: center;

  & h1 {
    font-size: var(--fs-hero);
    line-height: 1;
    max-width: 16ch;
    margin-inline: auto;
  }

  & p { color: var(--color-fg-muted); font-size: var(--fs-md); margin-top: var(--sp-5); }

  & .btn { margin-top: var(--sp-6); }
}

/* Anchor section title */
.anchor-section {
  scroll-margin-top: 5rem;
  padding-block: var(--sp-10);
  border-top: 1px solid var(--color-border);

  &:first-of-type { border-top: 0; }
}
```

- [ ] **Step 2.4: Criar `website/assets/css/pages.css` (vazio inicial)**

```css
/* Page-specific styles. Adicionado conforme cada página é construída. */
```

- [ ] **Step 2.5: Testar carregamento local**

```bash
cd website
python3 -m http.server 8080
```

Crie um arquivo de teste em `website/index.html` temporariamente:

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
</head>
<body>
  <main class="container section">
    <h1>Growth Club — teste</h1>
    <p>Se você está vendo isso com Archivo Black e Inter aplicados, CSS funciona.</p>
    <a href="#" class="btn btn-primary">CTA Test</a>
  </main>
</body>
</html>
```

Abra `http://localhost:8080`. Expected: fontes renderizadas corretamente, botão verde, cores escuras.

- [ ] **Step 2.6: Commit**

```bash
git add website/assets/css/ website/assets/fonts/
git commit -m "feat(site): design tokens + components CSS + self-hosted fonts"
```

---

## Task 3: Web Components — header e footer compartilhados

**Goal:** Eliminar duplicação de header/footer em 20+ páginas usando Custom Elements nativos. Sem framework, sem build.

**Files:**
- Create: `website/assets/css/chrome.css`
- Create: `website/assets/js/header.js`
- Create: `website/assets/js/footer.js`

- [ ] **Step 3.1: Criar `website/assets/css/chrome.css`**

```css
/* Header e footer — shared chrome */

.gc-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: color-mix(in oklab, var(--color-bg) 92%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);

  & .gc-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-5);
    padding-block: var(--sp-3);
  }

  & .gc-logo {
    font-family: var(--font-display);
    font-size: var(--fs-md);
    text-decoration: none;
    color: var(--color-fg);

    & svg, & img { height: 1.5rem; vertical-align: middle; }
  }

  & nav {
    display: flex;
    align-items: center;
    gap: var(--sp-5);

    & a {
      text-decoration: none;
      font-size: var(--fs-sm);
      color: var(--color-fg-muted);
      transition: color var(--t-fast);

      &:hover, &[aria-current="page"] { color: var(--color-fg); }
    }
  }

  & .gc-nav-cta {
    background: var(--color-accent);
    color: #0a0a0a;
    padding: var(--sp-2) var(--sp-4);
    border-radius: var(--radius-sm);
    font-weight: 700;
    font-family: var(--font-display);

    &:hover { background: color-mix(in oklab, var(--color-accent) 90%, white); }
  }

  & .gc-mobile-toggle {
    display: none;
    background: transparent;
    border: 1px solid var(--color-border);
    padding: var(--sp-2);
    border-radius: var(--radius-sm);
    cursor: pointer;
  }

  @media (max-width: 880px) {
    & nav { display: none; }
    & .gc-mobile-toggle { display: inline-flex; }

    &[data-mobile-open="true"] nav {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--color-bg);
      border-bottom: 1px solid var(--color-border);
      padding: var(--sp-5);
      align-items: flex-start;
    }
  }
}

.gc-footer {
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
  padding-block: var(--sp-10) var(--sp-6);
  margin-top: var(--sp-16);

  & .gc-footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    gap: var(--sp-6);
  }

  & .gc-footer-col {
    & h4 {
      font-size: var(--fs-sm);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-fg-muted);
      margin-bottom: var(--sp-3);
    }

    & ul { list-style: none; padding: 0; }
    & li { margin-block: var(--sp-1); }
    & a {
      text-decoration: none;
      color: var(--color-fg-muted);
      font-size: var(--fs-sm);
      transition: color var(--t-fast);

      &:hover { color: var(--color-fg); }
    }
  }

  & .gc-footer-bottom {
    margin-top: var(--sp-8);
    padding-top: var(--sp-5);
    border-top: 1px solid var(--color-border);
    font-size: var(--fs-xs);
    color: var(--color-fg-muted);
    text-align: center;
  }
}
```

- [ ] **Step 3.2: Criar `website/assets/js/header.js` (Custom Element `<gc-header>`)**

```js
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
```

- [ ] **Step 3.3: Criar `website/assets/js/footer.js` (Custom Element `<gc-footer>`)**

```js
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
```

- [ ] **Step 3.4: Testar no browser**

Crie `website/test-chrome.html` temporariamente:

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
</head>
<body>
  <gc-header current="home"></gc-header>
  <main class="container section">
    <h1>Teste chrome</h1>
    <p>Header e footer devem renderizar via custom elements.</p>
  </main>
  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

Servir `python3 -m http.server 8080` e abrir `http://localhost:8080/test-chrome.html`. Expected: header sticky no topo, nav com 7 items + CTA "Tornar-se Membro" destacado, footer com 5 colunas.

Apagar `test-chrome.html` depois de validar.

- [ ] **Step 3.5: Commit**

```bash
git add website/assets/css/chrome.css website/assets/js/header.js website/assets/js/footer.js
rm website/test-chrome.html
git commit -m "feat(site): web components <gc-header> e <gc-footer> com CSS"
```

---

## Task 4: Home (/) — 9 seções

**Goal:** Construir `index.html` com 9 seções verticais conforme spec §4.1.

**Files:**
- Create: `website/index.html`
- Create: `website/assets/js/newsletter-form.js`
- Create: `website/assets/js/slot-dinamico.js`
- Create: `website/assets/data/slot-dinamico.json`
- Modify: `website/assets/css/pages.css` (adicionar estilos da home)

- [ ] **Step 4.1: Criar `website/assets/js/newsletter-form.js`**

```js
// Captura email do form .form-newsletter e redireciona pro Substack com email pré-preenchido.
// Uso: <form class="form-newsletter" data-substack-url="https://growthclub.substack.com/subscribe">

document.addEventListener('submit', (e) => {
  const form = e.target.closest('.form-newsletter');
  if (!form) return;
  e.preventDefault();

  const emailInput = form.querySelector('input[type="email"]');
  const optIn = form.querySelector('input[type="checkbox"][name="lgpd-opt-in"]');
  const subUrl = form.dataset.substackUrl || 'https://growthclub.substack.com/subscribe';

  const email = (emailInput?.value || '').trim();
  if (!email) { emailInput?.focus(); return; }
  if (optIn && !optIn.checked) {
    alert('Marca o opt-in pra continuar — sem permissão, não te mandamos email.');
    return;
  }

  const url = new URL(subUrl);
  url.searchParams.set('email', email);
  url.searchParams.set('utm_source', 'site');
  url.searchParams.set('utm_medium', 'form');
  window.location.href = url.toString();
});
```

- [ ] **Step 4.2: Criar `website/assets/data/slot-dinamico.json`**

```json
{
  "mode": "meetup",
  "meetup": {
    "slug": "sp-s1e1-barte",
    "nome_canonico": "Meetup Growth SP · S1 · E1 · Revenue Operations com IA",
    "data_iso": "2026-06-15",
    "data_display": "15 de junho de 2026",
    "local": "Barte HQ · São Paulo · SP",
    "cta_url": "/meetups/sp-s1e1-barte",
    "cta_label": "Quero ir"
  },
  "livecast_fallback": {
    "titulo": "Como dobrar SQL em 60 dias sem aumentar CAC — episódio piloto",
    "url": "https://youtube.com/watch?v=PLACEHOLDER",
    "thumb": "/assets/images/livecast-thumb-placeholder.jpg",
    "duracao": "47 min"
  }
}
```

- [ ] **Step 4.3: Criar `website/assets/js/slot-dinamico.js`**

```js
// Renderiza a seção 7 da home com base em slot-dinamico.json
// Se há meetup com data ≤60 dias do hoje, mostra meetup. Senão, mostra livecast.

(async () => {
  const slot = document.querySelector('#slot-dinamico');
  if (!slot) return;

  try {
    const res = await fetch('/assets/data/slot-dinamico.json');
    const data = await res.json();

    const hoje = new Date();
    const meetupData = new Date(data.meetup.data_iso);
    const diffDias = Math.ceil((meetupData - hoje) / (1000 * 60 * 60 * 24));

    if (data.mode === 'meetup' && diffDias >= 0 && diffDias <= 60) {
      slot.innerHTML = `
        <div class="container">
          <p class="subgroup-label">Próximo meetup</p>
          <h2>${data.meetup.nome_canonico}</h2>
          <p><strong>${data.meetup.data_display}</strong> · ${data.meetup.local}</p>
          <a href="${data.meetup.cta_url}" class="btn btn-primary btn-lg">${data.meetup.cta_label}</a>
        </div>
      `;
    } else {
      slot.innerHTML = `
        <div class="container">
          <p class="subgroup-label">Último livecast</p>
          <h2>${data.livecast_fallback.titulo}</h2>
          <p>${data.livecast_fallback.duracao}</p>
          <a href="${data.livecast_fallback.url}" class="btn btn-secondary" target="_blank" rel="noopener">Assistir</a>
        </div>
      `;
    }
  } catch (err) {
    slot.style.display = 'none';
    console.warn('Slot dinâmico falhou:', err);
  }
})();
```

- [ ] **Step 4.4: Criar `website/index.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Growth Club — Growth de verdade. Stack de verdade. Sem teatro.</title>
  <meta name="description" content="Comunidade brasileira de operadores de growth B2B. 2.261 leitores · 715 membros · 10+ meetups desde 2015. Franco, com número, sem palco, com cerveja.">

  <link rel="canonical" href="https://growthclub.pro/">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Growth Club — Growth de verdade. Stack de verdade. Sem teatro.">
  <meta property="og:description" content="Comunidade brasileira de operadores de growth B2B desde 2015.">
  <meta property="og:url" content="https://growthclub.pro/">
  <meta property="og:image" content="https://growthclub.pro/assets/images/og-default.png">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="home"></gc-header>

  <main>

    <!-- 1. HERO -->
    <section class="hero">
      <div class="container">
        <h1>Growth de verdade.<br>Stack de verdade.<br>Sem teatro.</h1>
        <p>Comunidade brasileira de operadores de growth B2B desde 2015.</p>
        <a href="/membro" class="btn btn-primary btn-lg">Tornar-se Membro</a>
      </div>
    </section>

    <!-- 2. PROVA SOCIAL NUMÉRICA -->
    <section class="section-sm">
      <div class="container">
        <div class="proof-bar">
          <div class="proof-item"><strong>2.261</strong><span>leitores na Substack</span></div>
          <div class="proof-item"><strong>715</strong><span>membros na Community</span></div>
          <div class="proof-item"><strong>10+</strong><span>meetups desde 2015</span></div>
        </div>
      </div>
    </section>

    <!-- 3. PRA QUEM É / PRA QUEM NÃO É -->
    <section class="section">
      <div class="container container-narrow">
        <div class="split-two">
          <div>
            <h3>Pra quem é</h3>
            <ul>
              <li>Founders B2B operando growth direto</li>
              <li>CROs e growth leads que viraram a chave</li>
              <li>Devs e analistas que fazem growth</li>
              <li>CS e RevOps com mentalidade de funil</li>
              <li>Quem mostra número antes de mostrar palco</li>
            </ul>
          </div>
          <div>
            <h3>Pra quem não é</h3>
            <ul>
              <li>Agência genérica de marketing 360°</li>
              <li>"Guru de Instagram" com curso de mídia paga</li>
              <li>Quem busca template mágico sem operação</li>
              <li>Quem trata growth como growth hack isolado</li>
              <li>Quem prefere palco a planilha</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CONTEÚDOS QUE PRODUZIMOS -->
    <section class="section">
      <div class="container">
        <h2>Conteúdos que produzimos</h2>

        <p class="subgroup-label" style="margin-top: var(--sp-6)">Eventos ao vivo</p>
        <div class="cards-grid">
          <div class="card"><h3>Meetups</h3><p>Encontros presenciais por cidade. 10+ edições desde 2015.</p></div>
          <div class="card"><h3>Q&amp;A · AMAs</h3><p>Sessões síncronas e async com especialistas globais de growth, vendas, produto e CS.</p></div>
          <div class="card"><h3>Livecast</h3><p>Semanal, patrocinado, sem roteiro, com convidado abrindo operação.</p></div>
        </div>

        <p class="subgroup-label" style="margin-top: var(--sp-8)">Programas de membros</p>
        <div class="cards-grid">
          <div class="card"><h3>Mentorias quinzenais <span class="pill pill-warning">em breve</span></h3><p>Mentor do core resolve desafio real da comunidade. Pende AD-008.</p></div>
          <div class="card"><h3>Desafios mensais <span class="pill pill-warning">em breve</span></h3><p>Destrava habilidade com premiação. Pende AD-008.</p></div>
          <div class="card"><h3>Grupos WhatsApp</h3><p>Comunidade ativa segmentada por interesse — 715 operadores.</p></div>
        </div>

        <p class="subgroup-label" style="margin-top: var(--sp-8)">Conteúdo editorial</p>
        <div class="cards-grid">
          <div class="card"><h3>Newsletter deep</h3><p>Semanal pública + quinzenal paga no Substack.</p></div>
          <div class="card"><h3>Breakdowns públicos</h3><p>Análises de operações reais com número.</p></div>
          <div class="card"><h3>Benchmark anual</h3><p>Pesquisa anual de stack, CAC e LTV da comunidade.</p></div>
        </div>
      </div>
    </section>

    <!-- 5. COMO AJUDAMOS PROFISSIONAIS -->
    <section class="section section-alt">
      <div class="container">
        <h2>Como ajudamos profissionais</h2>
        <div class="cards-grid">
          <div class="card"><h3>Reposicionamento de carreira</h3><p>Mentoria pra mudar de função, indústria ou senioridade.</p></div>
          <div class="card"><h3>Encontrar novo trabalho</h3><p>Sinal direto pras vagas que rolam dentro da comunidade.</p></div>
          <div class="card"><h3>Networking + mentoria</h3><p>Acesso aos melhores profissionais de growth do Brasil e fora.</p></div>
        </div>
      </div>
    </section>

    <!-- 6. COMO AJUDAMOS EMPRESAS -->
    <section class="section">
      <div class="container">
        <h2>Como ajudamos empresas</h2>
        <div class="cards-grid">
          <div class="card"><h3>Divulgação de vagas <span class="pill pill-warning">em breve</span></h3><p>Anuncie pra audiência ultra-qualificada de operadores.</p></div>
          <div class="card"><h3>Hunting qualificado <span class="pill pill-warning">em breve</span></h3><p>Busca dirigida de senior+ pra função de growth.</p></div>
          <div class="card"><h3>Mentoria dedicada <span class="pill pill-warning">em breve</span></h3><p>Mentor do core resolve desafio específico.</p></div>
        </div>
        <p style="margin-top: var(--sp-5)"><a href="/empresas" class="btn btn-secondary">Ver todas as ofertas B2B</a></p>
      </div>
    </section>

    <!-- 7. SLOT DINÂMICO -->
    <section class="section section-alt" id="slot-dinamico">
      <!-- Conteúdo renderizado por slot-dinamico.js -->
    </section>

    <!-- 8. DEPOIMENTOS -->
    <section class="section">
      <div class="container">
        <h2>O que membros falam</h2>
        <div class="cards-grid">
          <!-- TODO: substituir por 2-3 depoimentos reais coletados -->
          <div class="card"><p>"[QUOTE_1]"</p><p style="margin-top: var(--sp-3); font-weight: 700;">[NOME_1]</p><p>[ROLE_1] · [EMPRESA_1]</p></div>
          <div class="card"><p>"[QUOTE_2]"</p><p style="margin-top: var(--sp-3); font-weight: 700;">[NOME_2]</p><p>[ROLE_2] · [EMPRESA_2]</p></div>
          <div class="card"><p>"[QUOTE_3]"</p><p style="margin-top: var(--sp-3); font-weight: 700;">[NOME_3]</p><p>[ROLE_3] · [EMPRESA_3]</p></div>
        </div>
      </div>
    </section>

    <!-- 9. CTA FINAL -->
    <section class="section section-lg hero">
      <div class="container">
        <h2>Entra no clube.</h2>
        <p>Sem promessa de revolução. Só número, stack e cerveja.</p>
        <a href="/membro" class="btn btn-primary btn-lg">Tornar-se Membro</a>
      </div>
    </section>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
  <script src="/assets/js/newsletter-form.js"></script>
  <script src="/assets/js/slot-dinamico.js"></script>
</body>
</html>
```

- [ ] **Step 4.5: Adicionar estilos específicos da home em `website/assets/css/pages.css`**

```css
/* Home */
.section-alt { background: var(--color-bg-alt); }

#slot-dinamico {
  text-align: center;

  & h2 { margin-top: var(--sp-3); margin-bottom: var(--sp-3); }
  & p { color: var(--color-fg-muted); }
  & .btn { margin-top: var(--sp-5); }
}
```

- [ ] **Step 4.6: Verificar localmente**

```bash
cd website && python3 -m http.server 8080
```

Abrir `http://localhost:8080`. Verificar:
- Hero centralizado com 3 linhas + CTA verde
- Faixa de prova social com 3 números
- Pra-quem-é-não-é em 2 colunas (1 coluna em mobile)
- 3 sub-grupos de Conteúdos com 9 cards
- "Como ajudamos profissionais/empresas" — 6 cards
- Slot dinâmico renderiza (com placeholder do meetup)
- Depoimentos placeholders
- CTA final
- Header sticky funcionando
- Footer com 5 colunas

- [ ] **Step 4.7: Commit**

```bash
git add website/index.html website/assets/js/newsletter-form.js website/assets/js/slot-dinamico.js website/assets/data/slot-dinamico.json website/assets/css/pages.css
git commit -m "feat(site): home com 9 seções + slot dinâmico + newsletter redirect"
```

---

## Task 5: /sobre — single-page com anchors

**Goal:** Construir `sobre.html` com história + manifesto + crew + imprensa numa página só, com scrollspy nos anchors.

**Files:**
- Create: `website/sobre.html`
- Create: `website/assets/js/scrollspy.js`

- [ ] **Step 5.1: Criar `website/assets/js/scrollspy.js`**

```js
// Scrollspy genérico: destaca anchor item ativo no <nav> interno baseado em scroll position.
// Uso: <nav class="anchor-nav"><a href="#manifesto">Manifesto</a>...</nav>
//      <section id="manifesto">...</section>

(() => {
  const nav = document.querySelector('.anchor-nav');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach((a) => {
          a.toggleAttribute('aria-current', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -50% 0px', threshold: 0 });

  sections.forEach((s) => observer.observe(s));
})();
```

- [ ] **Step 5.2: Criar `website/sobre.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sobre — Growth Club</title>
  <meta name="description" content="Manifesto, história e Founder Crew do Growth Club. Comunidade brasileira de operadores de growth B2B desde 2015.">

  <link rel="canonical" href="https://growthclub.pro/sobre">
  <link rel="icon" href="/assets/images/favicon.ico">

  <meta property="og:type" content="article">
  <meta property="og:title" content="Sobre — Growth Club">
  <meta property="og:description" content="Manifesto vivo desde 2015. Cada palavra paga em meetup, reunião perdida e pitch quebrado.">
  <meta property="og:url" content="https://growthclub.pro/sobre">
  <meta property="og:image" content="https://growthclub.pro/assets/images/og-default.png">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="sobre"></gc-header>

  <main class="container container-prose section">

    <header class="hero" style="text-align: left; padding-block: var(--sp-8);">
      <h1>Sobre o Growth Club</h1>
      <p>O clube tem 11 anos. Cada palavra foi paga em meetup, em reunião perdida, em pitch quebrado.</p>
    </header>

    <nav class="anchor-nav" aria-label="Navegação interna">
      <a href="#historia">História</a>
      <a href="#manifesto">Manifesto</a>
      <a href="#crew">Founder Crew</a>
      <a href="#imprensa">Imprensa</a>
    </nav>

    <section id="historia" class="anchor-section">
      <h2>História</h2>
      <p>[HISTORIA_PARAGRAFO_1 — origem 2015: o que era, quem juntava, qual era a queixa coletiva]</p>
      <p>[HISTORIA_PARAGRAFO_2 — Substack desde 2019: porque o canal editorial. Crescimento orgânico de 2.261 assinantes em ~7 anos.]</p>
      <p>[HISTORIA_PARAGRAFO_3 — 2026 profissionalização: por que agora. Era S1. Founder Crew. Meetup Growth SP S1E1 Barte.]</p>
    </section>

    <section id="manifesto" class="anchor-section">
      <h2>Manifesto</h2>
      <p>[MANIFESTO_LONG_FORM — colar a versão expandida escolhida do brand/voice/manifesto.md, ~1200-2000 palavras. Sub-headings em h3.]</p>
    </section>

    <section id="crew" class="anchor-section">
      <h2>Founder Crew — Era Pré-S1</h2>
      <p>Três operadores assumiram entregas críticas pra destravar a Era S1. Crédito vitalício enquanto vínculo ativo (AD-002).</p>

      <div class="cards-grid">
        <div class="card">
          <h3>[NOME_CREW_1]</h3>
          <p style="color: var(--color-accent); font-weight: 700;">Frontend · Site growthclub.pro</p>
          <p>[BIO_CURTA_1]</p>
        </div>
        <div class="card">
          <h3>[NOME_CREW_2]</h3>
          <p style="color: var(--color-accent); font-weight: 700;">Designer + edição de vídeo · Identidade aplicada</p>
          <p>[BIO_CURTA_2]</p>
        </div>
        <div class="card">
          <h3>[NOME_CREW_3]</h3>
          <p style="color: var(--color-accent); font-weight: 700;">Community Manager · GitHub público</p>
          <p>[BIO_CURTA_3]</p>
        </div>
      </div>
    </section>

    <section id="imprensa" class="anchor-section">
      <h2>Imprensa</h2>

      <h3>Bio oficial</h3>
      <p>[BIO_HENRIQUE_PARAGRAFO — bio em terceira pessoa, 1-2 parágrafos]</p>

      <h3>Fact sheet</h3>
      <ul>
        <li>Fundação: 2015 (primeiros meetups)</li>
        <li>Substack: desde 2019 — 2.261 assinantes</li>
        <li>Community WhatsApp: 715 membros</li>
        <li>Meetups realizados: 10+</li>
        <li>Relançamento oficial: Meetup Growth SP · S1E1 · Barte · jun/2026</li>
      </ul>

      <h3>Contato pra imprensa</h3>
      <p><a href="mailto:imprensa@growthclub.pro">imprensa@growthclub.pro</a></p>

      <h3>Press kit</h3>
      <p><a href="/assets/press-kit/growth-club-press-kit.zip" class="btn btn-secondary" download>Baixar press kit (ZIP)</a></p>
    </section>

    <section class="section" style="text-align: center; border-top: 1px solid var(--color-border); margin-top: var(--sp-10); padding-top: var(--sp-10);">
      <p>— Henrique Caner · Comunidade desde 2015</p>
      <a href="/membro" class="btn btn-primary btn-lg" style="margin-top: var(--sp-5);">Entra no clube</a>
    </section>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
  <script src="/assets/js/scrollspy.js"></script>
</body>
</html>
```

- [ ] **Step 5.3: Adicionar estilos do anchor-nav em `website/assets/css/pages.css`**

```css
/* /sobre + /empresas anchor nav */
.anchor-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  padding-block: var(--sp-4);
  border-block: 1px solid var(--color-border);
  margin-bottom: var(--sp-6);
  position: sticky;
  top: 4rem;
  z-index: 50;
  background: color-mix(in oklab, var(--color-bg) 95%, transparent);
  backdrop-filter: blur(8px);

  & a {
    text-decoration: none;
    font-size: var(--fs-sm);
    color: var(--color-fg-muted);
    padding: var(--sp-1) var(--sp-3);
    border-radius: var(--radius-sm);
    transition: color var(--t-fast), background var(--t-fast);

    &:hover, &[aria-current] {
      color: var(--color-fg);
      background: var(--color-bg-alt);
    }
  }
}
```

- [ ] **Step 5.4: Testar localmente**

`http://localhost:8080/sobre` — verificar:
- Anchor-nav sticky abaixo do header principal
- 4 sections com scroll-margin (não escondem atrás do header)
- Scrollspy: ao rolar, o link ativo muda no anchor-nav

- [ ] **Step 5.5: Commit**

```bash
git add website/sobre.html website/assets/js/scrollspy.js website/assets/css/pages.css
git commit -m "feat(site): /sobre single-page com história + manifesto + crew + imprensa"
```

---

## Task 6: /membro + /membro/obrigado

**Goal:** Página de caminho único pra Growth Hacker free. Form captura email → Substack.

**Files:**
- Create: `website/membro.html`
- Create: `website/membro/obrigado.html`

- [ ] **Step 6.1: Criar `website/membro.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tornar-se Membro — Growth Club</title>
  <meta name="description" content="Entra no Growth Club. Newsletter Substack, Community WhatsApp e meetups com membership automático. Free hoje, Master em 2027.">

  <link rel="canonical" href="https://growthclub.pro/membro">
  <link rel="icon" href="/assets/images/favicon.ico">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Tornar-se Membro — Growth Club">
  <meta property="og:description" content="Operadores de growth B2B trocando stack, número e cerveja desde 2015.">
  <meta property="og:url" content="https://growthclub.pro/membro">
  <meta property="og:image" content="https://growthclub.pro/assets/images/og-default.png">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="membro"></gc-header>

  <main>

    <section class="hero">
      <div class="container">
        <h1>Faça parte do Growth Club</h1>
        <p>Operadores de growth B2B trocando stack, número e cerveja desde 2015.</p>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <div class="split-two">
          <div>
            <h3>Pra quem é</h3>
            <ul>
              <li>Founders B2B operando growth direto</li>
              <li>CROs e growth leads que viraram a chave</li>
              <li>Devs e analistas que fazem growth</li>
              <li>CS e RevOps com mentalidade de funil</li>
              <li>Quem mostra número antes de mostrar palco</li>
            </ul>
          </div>
          <div>
            <h3>Pra quem não é</h3>
            <ul>
              <li>Agência genérica de marketing 360°</li>
              <li>Guru de Instagram com curso de mídia paga</li>
              <li>Quem busca template mágico sem operação</li>
              <li>Quem prefere palco a planilha</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <h2>O que você ganha</h2>
        <ul class="stack stack-sm" style="--space: var(--sp-3); margin-top: var(--sp-5); list-style: '✓  '; padding-left: var(--sp-5);">
          <li><strong>Newsletter Substack</strong> — semanal pública, ~2.261 leitores</li>
          <li><strong>Convite Community WhatsApp</strong> — 715 operadores ativos, segmentada por interesse</li>
          <li><strong>Membership automático em meetups</strong> — ingresso = entrada no clube</li>
          <li><strong>Q&amp;A, AMAs e Livecast aberto</strong> — conteúdo deep com especialistas</li>
          <li><strong>Conteúdo editorial deep</strong> — newsletter quinzenal paga em 2027</li>
        </ul>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow">
        <h2>Entra no clube</h2>
        <p>Coloca seu email aqui. Você vai pro Substack pra confirmar (newsletter) e recebe convite separado pro WhatsApp.</p>

        <form class="form-newsletter" data-substack-url="https://growthclub.substack.com/subscribe" style="margin-top: var(--sp-5);">
          <input type="email" name="email" placeholder="seu@email.com" required aria-label="Seu email">
          <button type="submit" class="btn btn-primary">Entrar no clube</button>
        </form>

        <label class="field-checkbox" style="margin-top: var(--sp-4);">
          <input type="checkbox" name="lgpd-opt-in" required>
          <span>Concordo em receber comunicações do Growth Club (você pode sair quando quiser). <a href="/privacidade">Política de Privacidade</a>.</span>
        </label>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <h2>E o tier pago?</h2>
        <p>O <strong>Growth Hacker Master</strong> abre em 2027 com newsletter quinzenal paga, acesso a aulas gravadas e benefícios exclusivos. Quando rolar, te avisamos por email. Sem promessa de dinheiro no curto prazo.</p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow">
        <h2>FAQ</h2>
        <div class="stack" style="--space: var(--sp-5);">
          <div>
            <h3>Quanto custa?</h3>
            <p>Growth Hacker é free. Master abre pago em 2027 (~R$ 990/ano, valor exato a confirmar).</p>
          </div>
          <div>
            <h3>Posso sair quando quiser?</h3>
            <p>Sim. Unsubscribe da newsletter Substack a qualquer momento. WhatsApp: sai do grupo. Sem pegadinha.</p>
          </div>
          <div>
            <h3>Como funciona a moderação na Community?</h3>
            <p>Régua editorial S1: post sem número vira redirecionamento cordial. Sem self-promo vazio, sem ataque pessoal. Detalhe em <a href="/codigo-de-conduta">Código de Conduta</a>.</p>
          </div>
          <div>
            <h3>Ingresso de meetup vira o quê?</h3>
            <p>Membership Growth Hacker automático. Você compra ingresso, entra na newsletter e no WhatsApp na mesma transação.</p>
          </div>
        </div>
      </div>
    </section>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
  <script src="/assets/js/newsletter-form.js"></script>
</body>
</html>
```

- [ ] **Step 6.2: Criar `website/membro/obrigado.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bem-vindo ao Clube — Growth Club</title>
  <meta name="description" content="Você está no Growth Club. Próximos passos abaixo.">
  <meta name="robots" content="noindex">

  <link rel="icon" href="/assets/images/favicon.ico">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
</head>
<body>

  <gc-header current="membro"></gc-header>

  <main class="container container-narrow section section-lg" style="text-align: center;">
    <h1>Você está no clube.</h1>
    <p style="font-size: var(--fs-md); color: var(--color-fg-muted); margin-top: var(--sp-5);">Recebemos seu email. Próximos passos:</p>

    <ol style="text-align: left; max-width: 28rem; margin: var(--sp-8) auto; padding-left: var(--sp-5); line-height: 2;">
      <li>Confirma a inscrição no email do Substack (caixa de spam às vezes pega).</li>
      <li>Em até 48h, te mandamos convite separado pro Community WhatsApp.</li>
      <li>Próximo meetup é o <a href="/meetups/sp-s1e1-barte">Meetup Growth SP S1E1 Barte</a> em jun/2026 — vem.</li>
    </ol>

    <div class="cluster" style="justify-content: center; margin-top: var(--sp-8);">
      <a href="/" class="btn btn-secondary">Voltar pra home</a>
      <a href="/meetups" class="btn btn-primary">Ver próximos meetups</a>
    </div>
  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 6.3: Testar localmente**

Abrir `http://localhost:8080/membro`. Verificar:
- Hero + filtros + benefícios + form
- Submit do form com email válido + opt-in marcado → redirect pra `growthclub.substack.com/subscribe?email=…`
- Submit sem opt-in → alert
- FAQ funcional

Abrir `http://localhost:8080/membro/obrigado` direto pra verificar layout.

- [ ] **Step 6.4: Commit**

```bash
git add website/membro.html website/membro/obrigado.html
git commit -m "feat(site): /membro caminho único free + thank-you page"
```

---

## Task 7: /empresas — single-page B2B com anchors

**Goal:** Hub comercial B2B em single-page com 4 anchors (`#patrocinio`, `#vagas`, `#hunting`, `#mentoria`).

**Files:**
- Create: `website/empresas.html`

- [ ] **Step 7.1: Criar `website/empresas.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Para empresas — Growth Club</title>
  <meta name="description" content="Patrocínio, vagas, hunting e mentoria com a comunidade de operadores de growth B2B mais qualificada do Brasil.">

  <link rel="canonical" href="https://growthclub.pro/empresas">
  <link rel="icon" href="/assets/images/favicon.ico">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Para empresas — Growth Club">
  <meta property="og:description" content="Encontrar, contratar e patrocinar quem faz growth de verdade.">
  <meta property="og:url" content="https://growthclub.pro/empresas">
  <meta property="og:image" content="https://growthclub.pro/assets/images/og-default.png">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="empresas"></gc-header>

  <main>

    <section class="hero">
      <div class="container">
        <h1>Comunidade pra empresas que querem encontrar, contratar e patrocinar growth de verdade.</h1>
        <p>Sem teatro. Audiência ultra-qualificada de operadores B2B.</p>
      </div>
    </section>

    <section class="section-sm">
      <div class="container">
        <div class="proof-bar">
          <div class="proof-item"><strong>[N]</strong><span>empresas patrocinaram nos últimos 24 meses</span></div>
          <div class="proof-item"><strong>2.261</strong><span>operadores alcançados via newsletter</span></div>
          <div class="proof-item"><strong>715</strong><span>na Community WhatsApp</span></div>
        </div>
        <!-- TODO: substituir [N] e adicionar logos de patrocinadores anteriores aqui -->
      </div>
    </section>

    <div class="container container-narrow">
      <nav class="anchor-nav" aria-label="Ofertas B2B">
        <a href="#patrocinio">Patrocinar</a>
        <a href="#vagas">Vagas</a>
        <a href="#hunting">Hunting</a>
        <a href="#mentoria">Mentoria</a>
      </nav>
    </div>

    <main class="container container-narrow">

      <section id="patrocinio" class="anchor-section">
        <h2>Patrocinar</h2>
        <p>[PITCH_PATROCINIO — 2-3 parágrafos: formatos disponíveis (livecast, meetup, newsletter, eventos), audience breakdown, preços indicativos. Política de não-contaminação editorial.]</p>
        <ul>
          <li><strong>Livecast patrocinado</strong> — semanal, ~[N] views, audiência de senior+</li>
          <li><strong>Meetup S1E1 Barte</strong> — patrocínio de evento presencial</li>
          <li><strong>Newsletter</strong> — placement contextual (não publi disfarçado)</li>
        </ul>
        <a href="mailto:parceiros@growthclub.pro" class="btn btn-primary">Falar com a gente sobre patrocínio</a>
      </section>

      <section id="vagas" class="anchor-section">
        <h2>Vagas <span class="pill pill-warning">em breve</span></h2>
        <p>[PITCH_VAGAS — anuncie sua vaga pra audiência ultra-qualificada. Modelo classificado pago, sem feed dinâmico na v1.]</p>
        <p>Pende AD-008 — formalização do modelo operacional, preço, mecânica de submissão.</p>
        <a href="mailto:parceiros@growthclub.pro?subject=Anunciar vaga" class="btn btn-secondary">Quero anunciar uma vaga</a>
      </section>

      <section id="hunting" class="anchor-section">
        <h2>Hunting qualificado <span class="pill pill-warning">em breve</span></h2>
        <p>[PITCH_HUNTING — serviço consultivo de busca dirigida pra senior+. Diferença pra recruiter genérico.]</p>
        <p>Pende AD-008 — definição de mentor responsável, formato de engagement, escopo.</p>
        <a href="mailto:parceiros@growthclub.pro?subject=Hunting" class="btn btn-secondary">Agendar diagnóstico</a>
      </section>

      <section id="mentoria" class="anchor-section">
        <h2>Mentoria dedicada <span class="pill pill-warning">em breve</span></h2>
        <p>[PITCH_MENTORIA — formatos: sprint de 1 mês, advisory contínuo. Mentores do core.]</p>
        <p>Pende AD-008 — portfolio de mentores, formatos comerciais, contratos.</p>
        <a href="mailto:parceiros@growthclub.pro?subject=Mentoria" class="btn btn-secondary">Conversar com mentor</a>
      </section>

      <section class="anchor-section">
        <h2>Política de não-contaminação editorial</h2>
        <p>[POLITICA_NAO_CONTAMINACAO — 3 parágrafos explicando que editorial não negocia com patrocínio. Patrocinador não influencia agenda, palestrante, conteúdo de newsletter, opinião pública do clube. R3 do business plan trava isso.]</p>
      </section>

      <section class="anchor-section" style="text-align: center; border-top: 1px solid var(--color-border); padding-top: var(--sp-10);">
        <h2>Vamos conversar?</h2>
        <p>Todas as conversas comerciais passam por <a href="mailto:parceiros@growthclub.pro">parceiros@growthclub.pro</a>.</p>
      </section>

    </main>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
  <script src="/assets/js/scrollspy.js"></script>
</body>
</html>
```

- [ ] **Step 7.2: Testar localmente**

`http://localhost:8080/empresas` — verificar:
- Hero + proof bar
- Anchor-nav sticky com 4 items
- 4 sections + 1 política + 1 CTA final
- Scrollspy ativo no anchor-nav

- [ ] **Step 7.3: Commit**

```bash
git add website/empresas.html
git commit -m "feat(site): /empresas single-page B2B com 4 anchors (patrocinio/vagas/hunting/mentoria)"
```

---

## Task 8: /meetups — hub + LP da primeira edição + histórico

**Goal:** 3 páginas que materializam o conteúdo de eventos. Template `/meetups/[slug]` reutilizável.

**Files:**
- Create: `website/meetups/index.html`
- Create: `website/meetups/historico.html`
- Create: `website/meetups/sp-s1e1-barte.html`

- [ ] **Step 8.1: Criar `website/meetups/index.html` (hub)**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meetups — Growth Club</title>
  <meta name="description" content="Próximos meetups do Growth Club e histórico de 10+ edições desde 2015.">

  <link rel="canonical" href="https://growthclub.pro/meetups">
  <link rel="icon" href="/assets/images/favicon.ico">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="meetups"></gc-header>

  <main>

    <section class="hero">
      <div class="container">
        <h1>Onde a comunidade se encontra.</h1>
        <p>Meetups presenciais. Sem palco vazio. Com cerveja.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Próximo</h2>
        <article class="card" style="margin-top: var(--sp-5);">
          <p class="subgroup-label">15 de junho de 2026 · São Paulo</p>
          <h3 style="font-size: var(--fs-xl); margin-top: var(--sp-2);">Meetup Growth SP · S1 · E1 · Revenue Operations com IA</h3>
          <p>Patrocinado por Barte. Tema técnico: RevOps com IA aplicada — stack, número, casos.</p>
          <a href="/meetups/sp-s1e1-barte" class="btn btn-primary" style="margin-top: var(--sp-4);">Ver detalhes e inscrição</a>
        </article>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2>Histórico</h2>
        <p>10+ edições desde 2015 em SP, RJ e outras cidades.</p>
        <a href="/meetups/historico" class="btn btn-secondary" style="margin-top: var(--sp-4);">Ver histórico completo</a>
      </div>
    </section>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 8.2: Criar `website/meetups/historico.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Histórico de Meetups — Growth Club</title>
  <meta name="description" content="10+ meetups do Growth Club desde 2015 em SP, RJ e outras cidades.">

  <link rel="canonical" href="https://growthclub.pro/meetups/historico">
  <link rel="icon" href="/assets/images/favicon.ico">

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="meetups"></gc-header>

  <main class="container container-narrow section">

    <header class="hero" style="text-align: left; padding-block: var(--sp-6);">
      <h1>Histórico de meetups</h1>
      <p>10+ edições. Lista incompleta — alguns registros se perderam ao longo dos 11 anos. Se você tem fotos ou agenda de alguma edição faltando, manda em <a href="mailto:contato@growthclub.pro">contato@growthclub.pro</a>.</p>
    </header>

    <div class="cards-grid" style="margin-top: var(--sp-8);">
      <!-- TODO: substituir pelo histórico real. Template de card abaixo. -->

      <div class="card">
        <p class="subgroup-label">[DATA_1]</p>
        <h3>[TEMA_1]</h3>
        <p>[CIDADE_1] · ~[N_1] participantes</p>
      </div>

      <div class="card">
        <p class="subgroup-label">[DATA_2]</p>
        <h3>[TEMA_2]</h3>
        <p>[CIDADE_2] · ~[N_2] participantes</p>
      </div>

      <!-- repetir por edição -->

    </div>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 8.3: Criar `website/meetups/sp-s1e1-barte.html` (LP da 1ª edição — template pras próximas)**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meetup Growth SP · S1 · E1 · Revenue Operations com IA · Barte</title>
  <meta name="description" content="15 de junho de 2026 em São Paulo. RevOps com IA aplicada. Patrocinado por Barte.">

  <link rel="canonical" href="https://growthclub.pro/meetups/sp-s1e1-barte">
  <link rel="icon" href="/assets/images/favicon.ico">

  <meta property="og:type" content="event">
  <meta property="og:title" content="Meetup Growth SP · S1E1 · Barte">
  <meta property="og:description" content="15 de junho de 2026. Revenue Operations com IA. São Paulo.">
  <meta property="og:url" content="https://growthclub.pro/meetups/sp-s1e1-barte">
  <meta property="og:image" content="https://growthclub.pro/assets/images/og-default.png">

  <!-- Schema.org Event markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Meetup Growth SP · S1 · E1 · Revenue Operations com IA",
    "startDate": "2026-06-15T19:00:00-03:00",
    "endDate": "2026-06-15T23:00:00-03:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Barte HQ",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Growth Club",
      "url": "https://growthclub.pro"
    }
  }
  </script>

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>

  <gc-header current="meetups"></gc-header>

  <main>

    <section class="hero">
      <div class="container container-narrow">
        <p class="subgroup-label">15 de junho de 2026 · São Paulo</p>
        <h1>Meetup Growth SP · S1 · E1<br>Revenue Operations com IA</h1>
        <p>Patrocinado por Barte. Tema técnico: RevOps com IA aplicada — stack, número, casos reais.</p>
        <a href="#inscricao" class="btn btn-primary btn-lg" style="margin-top: var(--sp-5);">Quero ir</a>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <h2>O que vai rolar</h2>
        <p>[PITCH_DETALHADO — 2-3 parágrafos sobre porque essa edição importa, o que vai ser destrinchado, qual é o convite editorial.]</p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow">
        <h2>Agenda</h2>
        <ul class="stack" style="--space: var(--sp-3); margin-top: var(--sp-5); list-style: none; padding: 0;">
          <li><strong>19:00</strong> · Recepção + cerveja</li>
          <li><strong>19:30</strong> · [TALK_1 — palestrante + tema]</li>
          <li><strong>20:15</strong> · [TALK_2 — palestrante + tema]</li>
          <li><strong>21:00</strong> · Mesa-redonda + Q&amp;A</li>
          <li><strong>22:00</strong> · Continua em mesa de pub</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <h2>Palestrantes</h2>
        <div class="cards-grid">
          <div class="card">
            <h3>[NOME_PALESTRANTE_1]</h3>
            <p style="color: var(--color-accent); font-weight: 700;">[ROLE_1] · [EMPRESA_1]</p>
            <p>[BIO_1]</p>
          </div>
          <div class="card">
            <h3>[NOME_PALESTRANTE_2]</h3>
            <p style="color: var(--color-accent); font-weight: 700;">[ROLE_2] · [EMPRESA_2]</p>
            <p>[BIO_2]</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow">
        <h2>Local + como chegar</h2>
        <p><strong>Barte HQ</strong></p>
        <p>[ENDERECO_COMPLETO]</p>
        <p>[COMO_CHEGAR — transporte público, estacionamento]</p>
        <!-- Iframe do Google Maps (substituir src com URL real) -->
        <iframe
          src="[GOOGLE_MAPS_EMBED_URL]"
          width="100%" height="320"
          style="border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-top: var(--sp-5);"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Mapa do local"></iframe>
      </div>
    </section>

    <section id="inscricao" class="section">
      <div class="container container-narrow">
        <h2>Inscrição</h2>
        <p>Ingresso = membership Growth Hacker automático. Você compra, entra na newsletter e no WhatsApp na mesma transação.</p>

        <div class="cards-grid" style="margin-top: var(--sp-5);">
          <div class="card">
            <p class="subgroup-label">Early bird</p>
            <h3>[PRECO_EARLY]</h3>
            <p>Até [DATA_EARLY]</p>
          </div>
          <div class="card">
            <p class="subgroup-label">Regular</p>
            <h3>[PRECO_REGULAR]</h3>
            <p>Após [DATA_EARLY] até esgotar</p>
          </div>
        </div>

        <!-- Tally embed pra checkout ou link direto pra plataforma de ingresso -->
        <a href="[URL_INGRESSO_TALLY_OU_PLATAFORMA]" class="btn btn-primary btn-lg" style="margin-top: var(--sp-6);">Garantir meu ingresso</a>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow">
        <h2>Patrocinadores</h2>
        <div class="cluster" style="justify-content: center; --gap: var(--sp-6);">
          <img src="[LOGO_BARTE]" alt="Barte" style="height: 2.5rem;">
          <!-- mais logos se houver -->
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow">
        <h2>Perguntas frequentes</h2>
        <div class="stack" style="--space: var(--sp-5);">
          <div>
            <h3>Posso cancelar?</h3>
            <p>[FAQ_CANCELAMENTO]</p>
          </div>
          <div>
            <h3>Tem recibo / nota fiscal?</h3>
            <p>[FAQ_NOTA_FISCAL]</p>
          </div>
          <div>
            <h3>Dress code?</h3>
            <p>Roupa que você usa pra trabalhar. Sem terno, sem moletom de unicórnio.</p>
          </div>
          <div>
            <h3>O lugar é acessível?</h3>
            <p>[FAQ_ACESSIBILIDADE]</p>
          </div>
          <div>
            <h3>Vai ter gravação?</h3>
            <p>[FAQ_GRAVACAO]</p>
          </div>
        </div>
      </div>
    </section>

  </main>

  <gc-footer></gc-footer>

  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 8.4: Testar localmente**

Abrir cada URL:
- `http://localhost:8080/meetups`
- `http://localhost:8080/meetups/historico`
- `http://localhost:8080/meetups/sp-s1e1-barte`

Verificar layouts, links, e que o template `/meetups/[slug]` (sp-s1e1-barte) tem todas as 8 seções.

- [ ] **Step 8.5: Commit**

```bash
git add website/meetups/
git commit -m "feat(site): /meetups hub + histórico + LP S1E1 Barte (template parametrizado)"
```

---

## Task 9: /recursos/* — 5 sub-páginas via template

**Goal:** 5 páginas curtas seguindo template comum. Cada uma com pitch + CTA específico.

**Files:**
- Create: `website/recursos/newsletter.html`
- Create: `website/recursos/aulas.html`
- Create: `website/recursos/livecast.html`
- Create: `website/recursos/workshops.html`
- Create: `website/recursos/comunidade.html`

- [ ] **Step 9.1: Criar `website/recursos/newsletter.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Newsletter — Growth Club</title>
  <meta name="description" content="Newsletter Growth Club no Substack. Semanal pública + quinzenal paga em 2027.">
  <link rel="canonical" href="https://growthclub.pro/recursos/newsletter">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>
  <gc-header current="recursos"></gc-header>
  <main class="container container-narrow section">
    <header class="hero" style="text-align: left;">
      <h1>Newsletter Growth Club</h1>
      <p>Semanal pública. Quinzenal paga em 2027. ~2.261 operadores lêem.</p>
    </header>

    <p>[PITCH_NEWSLETTER — 2-3 parágrafos. O que é, qual é a régua, como nasceu, o que a pessoa ganha. Cita exemplos de issues anteriores.]</p>

    <form class="form-newsletter" data-substack-url="https://growthclub.substack.com/subscribe" style="margin-top: var(--sp-6);">
      <input type="email" name="email" placeholder="seu@email.com" required aria-label="Seu email">
      <button type="submit" class="btn btn-primary">Assinar grátis</button>
    </form>

    <label class="field-checkbox" style="margin-top: var(--sp-4);">
      <input type="checkbox" name="lgpd-opt-in" required>
      <span>Concordo em receber a newsletter. Você pode sair quando quiser. <a href="/privacidade">Política de Privacidade</a>.</span>
    </label>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
  <script src="/assets/js/newsletter-form.js"></script>
</body>
</html>
```

- [ ] **Step 9.2: Criar `website/recursos/aulas.html` (placeholder "em breve")**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Aulas — Growth Club</title>
  <meta name="description" content="Aulas gravadas pra membros do Growth Club. Em breve.">
  <link rel="canonical" href="https://growthclub.pro/recursos/aulas">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>
  <gc-header current="recursos"></gc-header>
  <main class="container container-narrow section">
    <header class="hero" style="text-align: left;">
      <h1>Aulas <span class="pill pill-warning">em breve</span></h1>
      <p>Catálogo de aulas gravadas pra membros. Ainda não publicado.</p>
    </header>

    <p>[PITCH_AULAS — quando rolar, plataforma externa (TBD), acesso controlado por tier. Hoje, lista os recursos disponíveis sem aulas.]</p>

    <p>Enquanto isso:</p>
    <ul style="list-style: '→ '; padding-left: var(--sp-5);">
      <li><a href="/recursos/livecast">Livecast aberto semanal</a></li>
      <li><a href="/recursos/workshops">Workshops AI LIKE A PRO</a> (pago, high-ticket)</li>
      <li><a href="/recursos/newsletter">Newsletter</a> (free)</li>
    </ul>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 9.3: Criar `website/recursos/livecast.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Livecast — Growth Club</title>
  <meta name="description" content="Livecast semanal patrocinado com convidados abrindo operação. Sem roteiro, com número.">
  <link rel="canonical" href="https://growthclub.pro/recursos/livecast">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>
  <gc-header current="recursos"></gc-header>
  <main class="container container-narrow section">
    <header class="hero" style="text-align: left;">
      <h1>Livecast</h1>
      <p>Semanal. Patrocinado. Sem roteiro. Convidado abre operação.</p>
    </header>

    <p>[PITCH_LIVECAST — formato, cadência, regra "sem roteiro", como funciona o patrocínio sem contaminação editorial.]</p>

    <h2 style="margin-top: var(--sp-8);">Últimos episódios</h2>
    <!-- TODO: substituir por embeds YouTube/LinkedIn dos últimos 5-10 episódios -->
    <div class="cards-grid" style="margin-top: var(--sp-5);">
      <div class="card">
        <p class="subgroup-label">[DATA_EP_1]</p>
        <h3>[TITULO_EP_1]</h3>
        <p>com [CONVIDADO_1]</p>
        <a href="[URL_EP_1]" target="_blank" rel="noopener" class="btn btn-secondary" style="margin-top: var(--sp-3);">Assistir</a>
      </div>
      <div class="card">
        <p class="subgroup-label">[DATA_EP_2]</p>
        <h3>[TITULO_EP_2]</h3>
        <p>com [CONVIDADO_2]</p>
        <a href="[URL_EP_2]" target="_blank" rel="noopener" class="btn btn-secondary" style="margin-top: var(--sp-3);">Assistir</a>
      </div>
    </div>

    <section style="margin-top: var(--sp-10); padding-top: var(--sp-8); border-top: 1px solid var(--color-border);">
      <h2>Patrocinar o livecast</h2>
      <p>Formato comercial sem contaminação editorial. Detalhes em <a href="/empresas#patrocinio">Empresas → Patrocinar</a>.</p>
    </section>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 9.4: Criar `website/recursos/workshops.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Workshops — Growth Club</title>
  <meta name="description" content="Workshops high-ticket do Growth Club, incluindo AI LIKE A PRO. Formato intensivo com aplicação real.">
  <link rel="canonical" href="https://growthclub.pro/recursos/workshops">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>
  <gc-header current="recursos"></gc-header>
  <main class="container container-narrow section">
    <header class="hero" style="text-align: left;">
      <h1>Workshops</h1>
      <p>Formato intensivo. High-ticket. Aplicação real, não slide.</p>
    </header>

    <h2>AI LIKE A PRO</h2>
    <p>[PITCH_AILIKEAPRO — formato, duração, conteúdo, preço indicativo, ICP do participante.]</p>

    <h2 style="margin-top: var(--sp-8);">Próximas turmas</h2>
    <p>[PROXIMAS_TURMAS — listagem ou "fora de ciclo, deixa o email pra te avisar"]</p>

    <a href="mailto:workshops@growthclub.pro" class="btn btn-primary" style="margin-top: var(--sp-5);">Quero participar</a>

    <h2 style="margin-top: var(--sp-10);">Edições anteriores</h2>
    <p>[HISTORICO_WORKSHOPS — listagem curta de edições anteriores com fotos/depoimentos se houver.]</p>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 9.5: Criar `website/recursos/comunidade.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Comunidade WhatsApp — Growth Club</title>
  <meta name="description" content="Community WhatsApp do Growth Club. 715 operadores. Convite controlado.">
  <link rel="canonical" href="https://growthclub.pro/recursos/comunidade">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body>
  <gc-header current="recursos"></gc-header>
  <main class="container container-narrow section">
    <header class="hero" style="text-align: left;">
      <h1>Community WhatsApp</h1>
      <p>715 operadores ativos. Segmentada por interesse. Convite controlado.</p>
    </header>

    <p>[PITCH_COMUNIDADE — como funciona, qual é a régua editorial, por que o convite é controlado e não link aberto.]</p>

    <h2 style="margin-top: var(--sp-6);">Régua editorial S1</h2>
    <ul>
      <li><strong>Se não tem número, não é Growth Club.</strong> Post sem dado vira redirecionamento cordial.</li>
      <li>Sem self-promo vazio.</li>
      <li>Sem atacar pessoas pelo nome (atacar padrões é OK).</li>
      <li>Detalhe completo em <a href="/codigo-de-conduta">Código de Conduta</a>.</li>
    </ul>

    <h2 style="margin-top: var(--sp-8);">Pedir convite</h2>
    <p>Coloca seu email + uma linha sobre você. A gente avalia e te chama.</p>

    <!-- Tally form embed pra captura de pedido de convite -->
    <iframe
      src="https://tally.so/embed/[TALLY_FORM_ID_COMUNIDADE]?hideTitle=1"
      width="100%" height="400"
      frameborder="0"
      style="margin-top: var(--sp-5); border: 1px solid var(--color-border); border-radius: var(--radius-md);"
      title="Pedido de convite Comunidade"></iframe>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 9.6: Testar e commit**

```bash
cd website && python3 -m http.server 8080
```

Visitar cada `/recursos/*` e validar.

```bash
git add website/recursos/
git commit -m "feat(site): /recursos/* 5 sub-páginas (newsletter, aulas, livecast, workshops, comunidade)"
```

---

## Task 10: /contato + /contato/obrigado

**Goal:** Form de contato com canais alternativos + thank-you page.

**Files:**
- Create: `website/contato.html`
- Create: `website/contato/obrigado.html`

- [ ] **Step 10.1: Criar `website/contato.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contato — Growth Club</title>
  <meta name="description" content="Fale com o Growth Club. Imprensa, parcerias, candidatos a Founder Crew, dúvidas.">
  <link rel="canonical" href="https://growthclub.pro/contato">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
</head>
<body>
  <gc-header current="contato"></gc-header>
  <main class="container container-narrow section">
    <header class="hero" style="text-align: left;">
      <h1>Contato</h1>
      <p>Pra qualquer coisa que não cabe em formulário: usa um dos canais abaixo.</p>
    </header>

    <section class="section-sm">
      <h2>Canais diretos</h2>
      <ul style="list-style: '→ '; padding-left: var(--sp-5);">
        <li><strong>Imprensa:</strong> <a href="mailto:imprensa@growthclub.pro">imprensa@growthclub.pro</a></li>
        <li><strong>Parcerias / patrocínio:</strong> <a href="mailto:parceiros@growthclub.pro">parceiros@growthclub.pro</a></li>
        <li><strong>Geral:</strong> <a href="mailto:contato@growthclub.pro">contato@growthclub.pro</a></li>
        <li><strong>LinkedIn Henrique:</strong> <a href="https://www.linkedin.com/in/henriquecaner/" target="_blank" rel="noopener">linkedin.com/in/henriquecaner</a></li>
      </ul>
    </section>

    <section class="section-sm">
      <h2>Ou usa o form</h2>
      <!-- Tally form embed -->
      <iframe
        src="https://tally.so/embed/[TALLY_FORM_ID_CONTATO]?hideTitle=1"
        width="100%" height="540"
        frameborder="0"
        style="margin-top: var(--sp-4); border: 1px solid var(--color-border); border-radius: var(--radius-md);"
        title="Formulário de contato"></iframe>
    </section>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 10.2: Criar `website/contato/obrigado.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recebemos — Growth Club</title>
  <meta name="description" content="Recebemos seu contato. Te chamamos.">
  <meta name="robots" content="noindex">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
</head>
<body>
  <gc-header current="contato"></gc-header>
  <main class="container container-narrow section section-lg" style="text-align: center;">
    <h1>Recebemos.</h1>
    <p style="font-size: var(--fs-md); color: var(--color-fg-muted); margin-top: var(--sp-5);">Te chamamos em até 3 dias úteis.</p>

    <div class="cluster" style="justify-content: center; margin-top: var(--sp-8);">
      <a href="/" class="btn btn-secondary">Voltar pra home</a>
      <a href="/recursos/newsletter" class="btn btn-primary">Enquanto isso, lê a newsletter</a>
    </div>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 10.3: Commit**

```bash
git add website/contato.html website/contato/obrigado.html
git commit -m "feat(site): /contato + /contato/obrigado com Tally embed"
```

---

## Task 11: Páginas legais + /404

**Goal:** 4 páginas legais (privacidade, termos, LGPD, código de conduta) + página 404 humorada.

**Files:**
- Create: `website/privacidade.html`
- Create: `website/termos.html`
- Create: `website/lgpd.html`
- Create: `website/codigo-de-conduta.html`
- Create: `website/404.html`

- [ ] **Step 11.1: Template base legal — criar `website/privacidade.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Política de Privacidade — Growth Club</title>
  <meta name="description" content="Como o Growth Club coleta, usa e protege seus dados.">
  <link rel="canonical" href="https://growthclub.pro/privacidade">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
</head>
<body>
  <gc-header></gc-header>
  <main class="container container-prose section">
    <h1>Política de Privacidade</h1>
    <p class="subgroup-label">Última atualização: [DATA]</p>

    <p>[PRIVACIDADE_INTRO — quem é o controlador (Level Tech CNPJ + Growth Club), contato do DPO.]</p>

    <h2>1. Dados que coletamos</h2>
    <p>[DADOS_COLETADOS — email, IP, comportamento de navegação se Plausible, dados de form opcionais.]</p>

    <h2>2. Finalidades</h2>
    <p>[FINALIDADES — comunicação editorial, análise agregada de uso do site, contato comercial.]</p>

    <h2>3. Compartilhamento</h2>
    <p>[COMPARTILHAMENTO — Substack, Cloudflare, Plausible (se habilitado), Tally. Sem venda a terceiros.]</p>

    <h2>4. Direitos do titular</h2>
    <p>[DIREITOS_TITULAR — acesso, correção, exclusão. Como exercer — formulário em /lgpd.]</p>

    <h2>5. Cookies</h2>
    <p>O site não usa cookies próprios. Analytics usa <a href="https://plausible.io/data-policy" target="_blank" rel="noopener">Plausible</a> (cookieless).</p>

    <h2>6. Retenção</h2>
    <p>[RETENCAO — quanto tempo cada tipo de dado fica armazenado.]</p>

    <h2>7. Contato</h2>
    <p><a href="mailto:dpo@growthclub.pro">dpo@growthclub.pro</a></p>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 11.2: Criar `website/termos.html`**

Replicar template de `privacidade.html` com adaptações:
- `<title>` → "Termos de Uso — Growth Club"
- `<link rel="canonical">` → "https://growthclub.pro/termos"
- `<h1>` → "Termos de Uso"
- Substituir corpo por seções: 1. Aceitação · 2. Uso aceitável · 3. Conta de usuário · 4. Propriedade intelectual · 5. Pagamentos (se aplicável) · 6. Limitação de responsabilidade · 7. Modificações · 8. Foro

Todo o conteúdo legal precisa ser escrito com revisão jurídica antes do go-live.

- [ ] **Step 11.3: Criar `website/lgpd.html`**

Replicar template com:
- `<title>` → "LGPD — Growth Club"
- `<h1>` → "LGPD — Lei Geral de Proteção de Dados"
- Seções: 1. Bases legais · 2. Categorias de dados · 3. Direitos do titular · 4. Como exercer (form Tally embed)
- Embed do Tally pra formalização de pedidos LGPD: `<iframe src="https://tally.so/embed/[TALLY_FORM_ID_LGPD]"...>`

- [ ] **Step 11.4: Criar `website/codigo-de-conduta.html`**

Replicar template. Pegar conteúdo de `.github/CODE_OF_CONDUCT.md` e renderizar como HTML.

```html
<main class="container container-prose section">
  <h1>Código de Conduta</h1>
  <p class="subgroup-label">Aplica-se a meetups, Community WhatsApp, livecasts, newsletters e qualquer espaço do clube.</p>

  <h2>Régua editorial</h2>
  <p>Se não tem número, não é Growth Club. Post sem dado vira redirecionamento cordial — não banimento.</p>

  <h2>Comportamento esperado</h2>
  <ul>
    <li>Falar do trabalho com evidência</li>
    <li>Discordar sem atacar pessoas</li>
    <li>Atacar padrões, não indivíduos</li>
    <li>Self-promo só com permissão e contexto</li>
  </ul>

  <h2>O que não toleramos</h2>
  <ul>
    <li>Spam, link drop sem contexto</li>
    <li>Ataques pessoais</li>
    <li>Discriminação de qualquer natureza</li>
    <li>Quebra de confidencialidade</li>
  </ul>

  <h2>Consequências</h2>
  <p>[CONSEQUENCIAS — moderação cordial, advertência, remoção temporária, banimento definitivo.]</p>

  <h2>Reportar</h2>
  <p><a href="mailto:contato@growthclub.pro">contato@growthclub.pro</a></p>
</main>
```

- [ ] **Step 11.5: Criar `website/404.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 — Growth Club</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
</head>
<body>
  <gc-header></gc-header>
  <main class="container container-narrow section section-lg" style="text-align: center;">
    <h1 style="font-size: var(--fs-hero);">Esse link saiu do clube.</h1>
    <p style="font-size: var(--fs-md); color: var(--color-fg-muted); margin-top: var(--sp-5);">Ou nunca esteve aqui.</p>

    <div class="cluster" style="justify-content: center; margin-top: var(--sp-10);">
      <a href="/" class="btn btn-secondary">Voltar pra home</a>
      <a href="/membro" class="btn btn-primary">Entrar no clube</a>
    </div>
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
</body>
</html>
```

- [ ] **Step 11.6: Commit**

```bash
git add website/privacidade.html website/termos.html website/lgpd.html website/codigo-de-conduta.html website/404.html
git commit -m "feat(site): páginas legais (privacidade/termos/lgpd/coc) + 404"
```

---

## Task 12: SEO — sitemap + robots + OG + schema.org

**Goal:** SEO tecnicamente sólido. Sitemap dinâmico, meta tags por página, schema.org markup.

**Files:**
- Create: `website/sitemap.xml`
- Create: `website/assets/images/og-default.png` (1200x630, placeholder OK)
- Modify: cada página HTML existente (adicionar canonical/OG se não tiver)

- [ ] **Step 12.1: Criar `website/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://growthclub.pro/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://growthclub.pro/sobre</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://growthclub.pro/membro</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://growthclub.pro/empresas</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://growthclub.pro/meetups</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://growthclub.pro/meetups/historico</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://growthclub.pro/meetups/sp-s1e1-barte</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://growthclub.pro/recursos/newsletter</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://growthclub.pro/recursos/aulas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://growthclub.pro/recursos/livecast</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://growthclub.pro/recursos/workshops</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://growthclub.pro/recursos/comunidade</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://growthclub.pro/contato</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://growthclub.pro/privacidade</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://growthclub.pro/termos</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://growthclub.pro/lgpd</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://growthclub.pro/codigo-de-conduta</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
</urlset>
```

- [ ] **Step 12.2: Criar OG image padrão**

Use uma ferramenta de design (Figma, Canva, ou similar) pra criar `og-default.png`:
- 1200 × 630 pixels
- Fundo: paleta do brand book (preto/verde-pirata)
- Texto principal: "Growth Club"
- Tagline: "Franco, com número, sem palco, com cerveja."
- Logo placeholder v0 (até logo SVG final sair)

Salve em `website/assets/images/og-default.png`.

- [ ] **Step 12.3: Adicionar schema.org Organization no `index.html`**

Adicione antes do `</head>` em `website/index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Growth Club",
  "alternateName": "The Growth Club",
  "url": "https://growthclub.pro",
  "logo": "https://growthclub.pro/assets/images/logo.svg",
  "description": "Comunidade brasileira de operadores de growth B2B desde 2015.",
  "foundingDate": "2015",
  "sameAs": [
    "https://growthclub.substack.com",
    "https://www.linkedin.com/in/henriquecaner/",
    "https://github.com/henriquecaner/Growth-Club"
  ]
}
</script>
```

- [ ] **Step 12.4: Verificar que todas as páginas têm:**

```bash
cd website
grep -L 'rel="canonical"' *.html meetups/*.html recursos/*.html membro/*.html contato/*.html
```

Expected: lista vazia. Se algum arquivo aparecer, adicionar a tag canonical apontando pra URL correta.

```bash
grep -L 'property="og:title"' *.html meetups/*.html recursos/*.html
```

Expected: lista vazia (ou só páginas auxiliares como `/obrigado` e `/404`, onde OG não é crítico).

- [ ] **Step 12.5: Commit**

```bash
git add website/sitemap.xml website/assets/images/og-default.png website/index.html
git commit -m "feat(site): sitemap + OG image padrão + schema.org Organization"
```

---

## Task 13: Analytics — Plausible (opcional)

**Goal:** Privacy-first analytics sem cookie banner. Opcional na v1.

**Files:**
- Modify: todas as páginas HTML (adicionar script no `<head>`)

- [ ] **Step 13.1: Criar conta Plausible**

Acessar https://plausible.io → criar conta → adicionar site `growthclub.pro`. Custo: $9/mês plano "growth" (cobre Lighthouse + custom events).

Skipar se quer adiar — site funciona sem analytics na v1.

- [ ] **Step 13.2: Adicionar script Plausible em cada página**

Adicione antes do `</head>` em **todas** as páginas HTML:

```html
<script defer data-domain="growthclub.pro" src="https://plausible.io/js/script.js"></script>
```

Lista de arquivos a editar:
- `website/index.html`
- `website/sobre.html`
- `website/membro.html`
- `website/empresas.html`
- `website/contato.html`
- `website/meetups/index.html`
- `website/meetups/historico.html`
- `website/meetups/sp-s1e1-barte.html`
- `website/recursos/newsletter.html`
- `website/recursos/aulas.html`
- `website/recursos/livecast.html`
- `website/recursos/workshops.html`
- `website/recursos/comunidade.html`
- `website/privacidade.html`
- `website/termos.html`
- `website/lgpd.html`
- `website/codigo-de-conduta.html`
- `website/404.html`
- `website/membro/obrigado.html`
- `website/contato/obrigado.html`

- [ ] **Step 13.3: Testar evento custom de form submit**

Adicione no `newsletter-form.js` antes do `window.location.href`:

```js
if (window.plausible) {
  window.plausible('NewsletterSubmit', { props: { source: window.location.pathname } });
}
```

- [ ] **Step 13.4: Commit**

```bash
git add website/
git commit -m "feat(site): analytics Plausible + custom event NewsletterSubmit"
```

---

## Task 14: Lighthouse polish + accessibility

**Goal:** Lighthouse mobile ≥ 80 em Performance, A11y, BP, SEO em todas as páginas críticas.

**Files:**
- Modify: páginas conforme necessário (preload hints, lazy load, alt text)

- [ ] **Step 14.1: Rodar Lighthouse local em `/index.html`**

```bash
# Instalar lighthouse cli se ainda não tiver
npm install -g lighthouse

# Rodar
cd website && python3 -m http.server 8080 &
sleep 2
lighthouse http://localhost:8080 --output html --output-path /tmp/lh-home.html --view --form-factor=mobile

# Após inspecionar, mata o servidor
killall python3
```

Expected: pontuações ≥ 80 nas 4 categorias. Se alguma estiver abaixo, ajustar.

- [ ] **Step 14.2: Ajustes comuns**

**Performance:**
- Preload fontes: adicionar em `<head>` antes do `<link rel="stylesheet">`:

```html
<link rel="preload" href="/assets/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/ArchivoBlack-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

- Lazy load em iframes (já feito no Tally e Google Maps).
- `loading="lazy"` em imagens abaixo do fold.

**Accessibility:**
- Alt text em todas as imagens.
- `aria-label` em links sem texto (ícones).
- Contraste mínimo AA (verde-pirata sobre preto pode falhar em alguns elementos — ajustar `--color-fg-muted` se necessário).
- Heading hierarchy: h1 único por página, h2 dentro de seções, etc.

**Best Practices:**
- HTTPS forçado (Cloudflare Pages faz automático).
- Sem console errors.

**SEO:**
- Meta description em todas as páginas (verificar com grep).
- Canonical URLs (já feito Task 12).

- [ ] **Step 14.3: Rodar Lighthouse em cada página crítica**

```bash
for page in / /sobre /membro /empresas /meetups /meetups/sp-s1e1-barte; do
  echo "=== $page ==="
  lighthouse "http://localhost:8080$page" --output json --output-path "/tmp/lh-${page//\//-}.json" --form-factor=mobile --quiet --chrome-flags="--headless"
  cat "/tmp/lh-${page//\//-}.json" | python3 -c "import sys,json; d=json.load(sys.stdin); c=d['categories']; print(f\"  perf={c['performance']['score']*100:.0f} a11y={c['accessibility']['score']*100:.0f} bp={c['best-practices']['score']*100:.0f} seo={c['seo']['score']*100:.0f}\")"
done
```

Expected: cada página ≥ 80 nas 4 categorias.

- [ ] **Step 14.4: Validar HTML**

```bash
# Use validator.w3.org localmente via npm tool ou online
npx -y vnu --skip-non-html website/
```

Expected: zero erros críticos. Warnings podem ser ignorados se forem cosméticos.

- [ ] **Step 14.5: Commit**

```bash
git add website/
git commit -m "perf(site): preload fonts + accessibility fixes + Lighthouse ≥80"
```

---

## Task 15: Deploy production + DNS apontado

**Goal:** Site no ar em `https://growthclub.pro` com Cloudflare Pages.

- [ ] **Step 15.1: Push final pra `main`**

```bash
git status
git log --oneline -20
git push origin main
```

Cloudflare Pages detecta push e dispara deploy em ~30s.

- [ ] **Step 15.2: Verificar build no Cloudflare dashboard**

https://dash.cloudflare.com → Workers & Pages → seu projeto → **Deployments**.

Expected: último deploy "Success". Se falhou, ler logs.

- [ ] **Step 15.3: Validar URLs em produção**

```bash
# Smoke test das URLs principais
for url in "/" "/sobre" "/membro" "/empresas" "/meetups" "/meetups/sp-s1e1-barte" "/recursos/newsletter" "/contato" "/sitemap.xml" "/robots.txt"; do
  code=$(curl -o /dev/null -s -w "%{http_code}" "https://growthclub.pro$url")
  echo "$code  $url"
done
```

Expected: todas 200, exceto 404.html que retorna 200 quando acessado direto mas 404 quando rota inexistente.

```bash
# Validar 404
curl -o /dev/null -s -w "%{http_code}" "https://growthclub.pro/rota-que-nao-existe"
```

Expected: 404.

- [ ] **Step 15.4: Submeter sitemap ao Google Search Console**

1. https://search.google.com/search-console → adicionar property `growthclub.pro` (DNS verification)
2. Sitemaps → submeter `https://growthclub.pro/sitemap.xml`
3. Inspecionar URL `/` pra forçar indexação inicial

- [ ] **Step 15.5: Verificar TLS + headers de segurança**

```bash
curl -I https://growthclub.pro
```

Expected:
- `HTTP/2 200`
- `strict-transport-security: max-age=31536000; includeSubDomains`
- `x-content-type-options: nosniff`
- `x-frame-options: SAMEORIGIN`

- [ ] **Step 15.6: Atualizar `STATE.md` com AD-009 — Site v1 no ar**

Editar `.specs/project/STATE.md` adicionando uma nova ADR no topo:

```markdown
### AD-009: Site v1 no ar em growthclub.pro
**Date:** [DATA_DEPLOY]
**Status:** Accepted

**Context:** Implementação do site v1 conforme spec AD-006 e stack AD-007 finalizada.

**Decision:** Site no ar em https://growthclub.pro hospedado em Cloudflare Pages. Bloqueadores de §8.1 do spec resolvidos: [listar quais foram resolvidos e quais permanecem em aberto].

**Consequences:**
- Tally `tally.so/r/BzLJO4` deprecado (substituído pela LP `/meetups/sp-s1e1-barte`)
- Régua editorial S1 ativada com publicação do código de conduta
- ROADMAP Fase 1 progride

**Alternatives considered:** (descrever se houver decisões adicionais aqui)
```

- [ ] **Step 15.7: Commit final**

```bash
git add .specs/project/STATE.md
git commit -m "docs(specs): AD-009 — site v1 no ar em growthclub.pro"
git push origin main
```

🎉 **Site v1 está em produção.**

---

## Self-Review Checklist (preencher após conclusão)

- [ ] Todas as 17 rotas do inventário no spec §3.2 estão criadas e respondem 200
- [ ] Todos os 6 bloqueadores de go-live no spec §8.1 estão resolvidos OU justificados como deferidos
- [ ] Lighthouse mobile ≥ 80 nas 4 categorias em todas as páginas críticas
- [ ] LGPD compliance: forms têm opt-in explícito; política publicada
- [ ] Brand book aplicado: paleta, tipografia (Archivo Black + Inter), tom de voz
- [ ] Conteúdo concreto §6.4 do spec preenchido (sem `[CAMPO]` placeholders no HTML final)
- [ ] Cloudflare Pages com DNS apontado; SSL ativo
- [ ] Sitemap submetido ao Google Search Console
- [ ] Analytics rodando (Plausible ou alternativa)
- [ ] Tally `tally.so/r/BzLJO4` deprecado (link removido do `website/README.md` antigo)

---

## Notas finais

**Próximos sprints pós-v1:**
1. Coletar e publicar depoimentos reais (substituir placeholders na home seção 8)
2. Coletar conteúdo do meetup S1E1 Barte e atualizar `meetups/sp-s1e1-barte.html`
3. Abrir AD-008 — formalização operacional de Mentorias, Desafios, Job board, Hunting, Mentoria B2B (removendo as 7 pills `em breve`)
4. Logo SVG final (substituir placeholder em `assets/images/logo.svg`)
5. Founder Crew preenchido — atualizar `sobre.html#crew` com bios reais

**Quando Crew #1 entrar:**
- Considerar migração pra Eleventy ou Astro se duplicação de header/footer crescer demais
- Implementar páginas autorais individuais do Crew (subpáginas dentro de `/sobre/crew/[slug]`)
- Avaliar job board dinâmico em `/empresas/vagas` quando volume justificar

**Métricas a acompanhar pós-launch** (do spec §2.3):
- Lighthouse mobile ≥ 80
- TTI ≤ 3s em 4G
- Conversão home → form /membro ≥ 8%
- Submissão de form em /membro ≥ 3% do tráfego total
- Bounce rate em /sobre ≤ 60%
