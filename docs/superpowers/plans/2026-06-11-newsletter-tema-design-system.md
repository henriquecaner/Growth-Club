# Tema Ghost com Growth Club Design System — Implementation Plan (Plano 2 da Fase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tema Handlebars custom (`gc-news`) aplicando o Design System AD-008 ao Ghost 6.44 em `growthclub.pro/content`, com bootstrap via entrypoint (disco do container é efêmero).

**Architecture:** O Ghost vive no **mesmo domínio** do site institucional (`growthclub.pro/content` via Workers Route; site no Pages serve `/assets/*`). O tema **não duplica** o Design System: linka `tokens.css`/`components.css`/`chrome.css`/fontes direto do Pages e reusa os web components `<gc-header>`/`<gc-footer>`. Só o `theme.css` (estilos Ghost-specific: feed, post, `.gh-content`, koenig cards) vive no tema. Como o disco do container zera a cada restart, o tema é empacotado em tar.gz, sobe pro R2 (`gc-news-images/_gc/theme/`), o Worker o serve em `/content/_gc/theme.tar.gz`, e o BOOT_SCRIPT baixa+extrai a cada cold start — mesmo padrão do adapter `ghos3`.

**Tech Stack:** Ghost 6 (Handlebars themes), gscan (validação), Cloudflare Worker + R2, Design System AD-008 (Satoshi/Roboto, Pub Cream light-first + dark sections).

**Repos:** código do tema e Worker em `~/Documents/GitHub/growth-club-newsletter`; este plano em `Growth-Club`.

---

## File Structure

```
growth-club-newsletter/
├── theme/gc-news/
│   ├── package.json            ← config do tema Ghost (posts_per_page, card_assets, image_sizes)
│   ├── default.hbs             ← shell HTML: CSS do Pages + theme.css, gc-header/footer, ghost_head/foot
│   ├── index.hbs               ← home do /content: hero dark + grid de posts + paginação
│   ├── post.hbs                ← artigo: meta, conteúdo, CTA de assinatura, JSON-LD NewsArticle (já serve o Plano 4)
│   ├── page.hbs                ← página estática
│   ├── tag.hbs                 ← listagem por tag
│   ├── partials/post-card.hbs  ← card do feed
│   └── assets/css/theme.css    ← estilos Ghost-specific com tokens AD-008
├── bin/deploy-theme.sh         ← gscan → tar.gz → R2 → restart
└── src/index.js                ← MODIFY: rota /_gc/theme.tar.gz + bootstrap do tema no BOOT_SCRIPT
```

---

### Task 1: Esqueleto do tema — `package.json` + `default.hbs`

**Files:**
- Create: `theme/gc-news/package.json`
- Create: `theme/gc-news/default.hbs`

- [ ] **Step 1: `package.json` do tema**

```json
{
  "name": "gc-news",
  "description": "Growth Club newsletter theme — Design System AD-008, same-origin assets do Pages",
  "version": "1.0.0",
  "engines": { "ghost": ">=5.0.0" },
  "license": "MIT",
  "keywords": ["ghost-theme"],
  "author": { "email": "caner@growthclub.pro" },
  "config": {
    "posts_per_page": 12,
    "card_assets": true,
    "image_sizes": {
      "s":  { "width": 320 },
      "m":  { "width": 640 },
      "l":  { "width": 1024 },
      "xl": { "width": 1920 }
    }
  }
}
```

- [ ] **Step 2: `default.hbs`** — shell. CSS/JS do site via path absoluto (mesma origem); só `theme.css` via `{{asset}}`.

```hbs
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{meta_title}}</title>
  <link rel="preload" href="/assets/fonts/Satoshi-Black.otf" as="font" type="font/otf" crossorigin>
  <link rel="preload" href="/assets/fonts/Satoshi-Regular.otf" as="font" type="font/otf" crossorigin>
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/chrome.css">
  <link rel="stylesheet" href="{{asset "css/theme.css"}}">
  {{ghost_head}}
</head>
<body class="{{body_class}}">
  <gc-header current="recursos"></gc-header>
  <main id="main" class="news-main">
    {{{body}}}
  </main>
  <gc-footer></gc-footer>
  <script src="/assets/js/header.js"></script>
  <script src="/assets/js/footer.js"></script>
  {{ghost_foot}}
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
cd ~/Documents/GitHub/growth-club-newsletter
git add theme/gc-news/package.json theme/gc-news/default.hbs
git commit -m "feat(theme): gc-news skeleton — package.json + default.hbs (same-origin DS assets)"
```

---

### Task 2: Feed — `partials/post-card.hbs` + `index.hbs` + `tag.hbs`

**Files:**
- Create: `theme/gc-news/partials/post-card.hbs`
- Create: `theme/gc-news/index.hbs`
- Create: `theme/gc-news/tag.hbs`

- [ ] **Step 1: `partials/post-card.hbs`**

```hbs
<article class="post-card">
  <a class="post-card-link" href="{{url}}">
    {{#if feature_image}}
      <img class="post-card-image"
           src="{{img_url feature_image size="m"}}"
           alt="{{#if feature_image_alt}}{{feature_image_alt}}{{else}}{{title}}{{/if}}"
           loading="lazy">
    {{/if}}
    <div class="post-card-body">
      {{#primary_tag}}<span class="t-eyebrow">{{name}}</span>{{/primary_tag}}
      <h2 class="t-h4">{{title}}</h2>
      <p class="t-body-sm">{{#if custom_excerpt}}{{custom_excerpt}}{{else}}{{excerpt words="28"}}{{/if}}</p>
      <div class="post-card-meta t-caption">
        <time datetime="{{date format="YYYY-MM-DD"}}">{{date format="DD MMM YYYY"}}</time>
        <span aria-hidden="true">·</span>
        <span>{{reading_time minute="1 min de leitura" minutes="% min de leitura"}}</span>
      </div>
    </div>
  </a>
</article>
```

- [ ] **Step 2: `index.hbs`** — hero dark compacto + grid + paginação.

```hbs
{{!< default}}
<section class="news-hero" data-theme="dark">
  <div class="wrap is-narrow">
    <p class="t-eyebrow">Newsletter</p>
    <h1 class="t-display-m">{{@site.title}}</h1>
    {{#if @site.description}}<p class="t-lead">{{@site.description}}</p>{{/if}}
    <div class="news-hero-cta">
      <a class="btn-primary" href="#/portal/signup">Assinar grátis</a>
    </div>
  </div>
</section>

<section class="news-feed">
  <div class="wrap">
    <div class="post-grid">
      {{#foreach posts}}
        {{> "post-card"}}
      {{/foreach}}
    </div>
    {{pagination}}
  </div>
</section>
```

- [ ] **Step 3: `tag.hbs`**

```hbs
{{!< default}}
{{#tag}}
<section class="news-hero is-compact" data-theme="dark">
  <div class="wrap is-narrow">
    <p class="t-eyebrow">Tag</p>
    <h1 class="t-display-s">{{name}}</h1>
    {{#if description}}<p class="t-lead">{{description}}</p>{{/if}}
  </div>
</section>
{{/tag}}

<section class="news-feed">
  <div class="wrap">
    <div class="post-grid">
      {{#foreach posts}}
        {{> "post-card"}}
      {{/foreach}}
    </div>
    {{pagination}}
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
git add theme/gc-news/partials/post-card.hbs theme/gc-news/index.hbs theme/gc-news/tag.hbs
git commit -m "feat(theme): feed — post-card partial, index e tag com grid + paginação"
```

---

### Task 3: Artigo — `post.hbs` (com JSON-LD NewsArticle) + `page.hbs`

**Files:**
- Create: `theme/gc-news/post.hbs`
- Create: `theme/gc-news/page.hbs`

O JSON-LD `NewsArticle` com `isAccessibleForFree: true` já atende o requisito semântico do RRM (spec §4.4) — o Plano 4 só precisa do Code Injection do snippet.

- [ ] **Step 1: `post.hbs`**

```hbs
{{!< default}}
{{#post}}
<article class="post-full {{post_class}}">
  <header class="post-header">
    <div class="wrap is-narrow">
      <div class="post-meta">
        {{#primary_tag}}<a class="t-eyebrow" href="{{url}}">{{name}}</a>{{/primary_tag}}
        <span class="t-caption">
          <time datetime="{{date format="YYYY-MM-DD"}}">{{date format="DD MMM YYYY"}}</time>
          <span aria-hidden="true">·</span>
          {{reading_time minute="1 min de leitura" minutes="% min de leitura"}}
        </span>
      </div>
      <h1 class="t-display-s">{{title}}</h1>
      {{#if custom_excerpt}}<p class="t-lead">{{custom_excerpt}}</p>{{/if}}
    </div>
    {{#if feature_image}}
      <figure class="wrap post-feature">
        <img src="{{img_url feature_image size="xl"}}"
             alt="{{#if feature_image_alt}}{{feature_image_alt}}{{else}}{{title}}{{/if}}">
        {{#if feature_image_caption}}<figcaption class="t-caption">{{{feature_image_caption}}}</figcaption>{{/if}}
      </figure>
    {{/if}}
  </header>

  <div class="wrap is-narrow">
    <div class="gh-content">
      {{content}}
    </div>
  </div>

  <footer class="post-footer">
    <div class="wrap is-narrow">
      <aside class="post-cta" data-theme="dark">
        <h2 class="t-h3">Receba a próxima edição no email</h2>
        <p class="t-body">Grátis. Casos de growth B2B com número, do jeito que se conta entre pares.</p>
        <a class="btn-primary" href="#/portal/signup">Assinar grátis</a>
      </aside>
    </div>
  </footer>
</article>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "{{title}}",
  "datePublished": "{{date format="YYYY-MM-DDTHH:mm:ssZ"}}",
  "dateModified": "{{updated_at format="YYYY-MM-DDTHH:mm:ssZ"}}",
  "mainEntityOfPage": "{{url absolute="true"}}",
  {{#if feature_image}}"image": ["{{img_url feature_image absolute="true"}}"],{{/if}}
  "author": {{#primary_author}}{ "@type": "Person", "name": "{{name}}" }{{/primary_author}},
  "publisher": {
    "@type": "Organization",
    "name": "Growth Club",
    "logo": { "@type": "ImageObject", "url": "https://growthclub.pro/assets/images/logo-white.svg" }
  },
  "isAccessibleForFree": true
}
</script>
{{/post}}
```

- [ ] **Step 2: `page.hbs`**

```hbs
{{!< default}}
{{#post}}
<article class="post-full page-full">
  <header class="post-header">
    <div class="wrap is-narrow">
      <h1 class="t-display-s">{{title}}</h1>
    </div>
  </header>
  <div class="wrap is-narrow">
    <div class="gh-content">
      {{content}}
    </div>
  </div>
</article>
{{/post}}
```

- [ ] **Step 3: Commit**

```bash
git add theme/gc-news/post.hbs theme/gc-news/page.hbs
git commit -m "feat(theme): post com NewsArticle JSON-LD + CTA de assinatura; page estática"
```

---

### Task 4: `assets/css/theme.css` — estilos Ghost-specific com tokens

**Files:**
- Create: `theme/gc-news/assets/css/theme.css`

- [ ] **Step 1: Escrever o CSS** (tokens AD-008; nada de cor/fonte hardcoded fora dos vars)

```css
/* =========================================================================
   gc-news — estilos Ghost-specific por cima do Design System (AD-008).
   tokens.css / components.css / chrome.css vêm do Pages (mesma origem).
   ========================================================================= */

/* ---- Hero do feed -------------------------------------------------- */
.news-hero {
  background: var(--gradient-hero);
  background-color: var(--bg-base);
  color: var(--fg-secondary);
  padding: var(--space-24) 0 var(--space-16);
  border-bottom: 1px solid var(--border-subtle);
}
.news-hero .t-lead { margin-top: var(--space-4); max-width: 56ch; }
.news-hero-cta { margin-top: var(--space-8); }
.news-hero.is-compact { padding: var(--space-16) 0 var(--space-12); }

/* ---- Grid de posts -------------------------------------------------- */
.news-feed { padding: var(--space-16) 0 var(--space-24); }
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-8);
}
.post-card {
  background: var(--bg-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.post-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-raised); }
.post-card-link { display: block; color: inherit; text-decoration: none; }
.post-card-image { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
.post-card-body { padding: var(--space-6); display: grid; gap: var(--space-3); }
.post-card-body h2 { margin: 0; }
.post-card-meta { display: flex; gap: var(--space-2); align-items: baseline; }

/* Paginação (helper {{pagination}} do Ghost) */
.pagination {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: var(--space-12);
  font-family: var(--font-mono); font-size: var(--fs-body-sm);
}
.pagination a { color: var(--accent-amber-dim); text-decoration: none; }
.pagination a:hover { color: var(--accent-amber); }
.page-number { color: var(--fg-tertiary); }

/* ---- Post ------------------------------------------------------------ */
.post-full { padding-bottom: var(--space-24); }
.post-header { padding: var(--space-20) 0 var(--space-10); }
.post-meta { display: grid; gap: var(--space-2); margin-bottom: var(--space-6); }
.post-meta .t-eyebrow { text-decoration: none; }
.post-feature { margin-top: var(--space-10); }
.post-feature img { width: 100%; border-radius: var(--radius-lg); display: block; }
.post-feature figcaption { margin-top: var(--space-2); text-align: center; }

/* ---- Conteúdo (koenig) ------------------------------------------------ */
.gh-content { display: grid; gap: var(--space-5); }
.gh-content > * { margin: 0; }
.gh-content h2 { margin-top: var(--space-8); }
.gh-content h3 { margin-top: var(--space-6); }
.gh-content a { color: var(--accent-amber-dim); text-underline-offset: 3px; }
.gh-content a:hover { color: var(--accent-amber); }
.gh-content img { max-width: 100%; border-radius: var(--radius-md); }
.gh-content hr { border: 0; border-top: 1px solid var(--border-default); margin: var(--space-8) 0; }
.gh-content blockquote {
  border-left: 3px solid var(--accent-amber);
  padding-left: var(--space-5);
  color: var(--fg-primary);
  font-weight: var(--fw-medium);
}
.gh-content pre, .gh-content code {
  font-family: var(--font-mono);
  font-size: var(--fs-body-sm);
}
.gh-content pre {
  background: var(--bg-sunken);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  overflow-x: auto;
}
.gh-content :not(pre) > code {
  background: var(--bg-sunken);
  border-radius: var(--radius-xs);
  padding: 2px 6px;
}
.gh-content ul, .gh-content ol { padding-left: var(--space-6); display: grid; gap: var(--space-2); }
.gh-content figcaption { font-size: var(--fs-caption); color: var(--fg-tertiary); text-align: center; margin-top: var(--space-2); }

/* Larguras koenig (wide/full saem do is-narrow) */
.gh-content .kg-width-wide { width: min(100%, var(--container-md)); justify-self: center; }
.gh-content .kg-width-full {
  width: 100vw; margin-left: 50%; transform: translateX(-50%);
}

/* ---- CTA pós-artigo ---------------------------------------------------- */
.post-footer { margin-top: var(--space-16); }
.post-cta {
  background: var(--bg-base);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  text-align: center;
  display: grid; gap: var(--space-4); justify-items: center;
}
.post-cta h2, .post-cta p { margin: 0; }

/* ---- Portal/forms do Ghost herdam a base ------------------------------- */
.news-main { min-height: 60vh; }
```

- [ ] **Step 2: Commit**

```bash
git add theme/gc-news/assets/css/theme.css
git commit -m "feat(theme): theme.css — feed, post, gh-content e CTA com tokens AD-008"
```

---

### Task 5: Validar com gscan

- [ ] **Step 1: Rodar o gscan**

```bash
cd ~/Documents/GitHub/growth-club-newsletter
npx gscan theme/gc-news
```

Expected: nenhum **error**. Warnings/recommendations aceitáveis (ex.: ausência de `error.hbs` custom). Se houver error, corrigir o template apontado e rodar de novo antes de seguir.

---

### Task 6: Worker — rota do tar.gz + bootstrap do tema no BOOT_SCRIPT

**Files:**
- Modify: `src/index.js`

- [ ] **Step 1: Servir o tema do R2.** No `fetch`, logo após o bloco do `/content/_gc/restart`, adicionar:

```js
    // Tema empacotado (tar.gz) — o BOOT_SCRIPT baixa daqui a cada cold start.
    if (url.pathname === '/content/_gc/theme.tar.gz' && request.method === 'GET') {
      const obj = await env.STORAGE.get('_gc/theme/gc-news.tar.gz');
      if (!obj) return new Response('theme not found\n', { status: 404 });
      return new Response(obj.body, {
        headers: { 'content-type': 'application/gzip', 'cache-control': 'no-store' },
      });
    }
```

- [ ] **Step 2: Bootstrap no BOOT_SCRIPT.** Depois do bloco do adapter ghos3 e antes do `exec`, adicionar (download via node — `wget` do busybox nem sempre tem TLS; falha de tema não derruba o boot):

```sh
T=/var/lib/ghost/content/themes/gc-news
if node -e 'fetch("https://growthclub.pro/content/_gc/theme.tar.gz").then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(b=>require("fs").writeFileSync("/tmp/theme.tgz",Buffer.from(b))).catch(()=>process.exit(1))'; then
  rm -rf "$T" && mkdir -p "$T" && tar -xzf /tmp/theme.tgz -C "$T" \
    && echo "[gc-news] tema gc-news instalado"
else
  echo "[gc-news] theme.tar.gz indisponível — seguindo com os temas existentes"
fi
```

(No template literal do JS, manter `\\` onde houver `\` se necessário — o BOOT_SCRIPT atual não usa escapes além do `${GHOS3_VERSION}`.)

- [ ] **Step 3: Commit**

```bash
git add src/index.js
git commit -m "feat(worker): rota /_gc/theme.tar.gz (R2) + bootstrap do tema gc-news no boot"
```

---

### Task 7: `bin/deploy-theme.sh` + GC_ADMIN_TOKEN local

**Files:**
- Create: `bin/deploy-theme.sh`

- [ ] **Step 1: Token de admin num arquivo local** (pra restart automatizado sem expor valor no chat/transcript):

```bash
mkdir -p ~/.config/growth-club
openssl rand -hex 24 > ~/.config/growth-club/gc-admin-token
chmod 600 ~/.config/growth-club/gc-admin-token
cd ~/Documents/GitHub/growth-club-newsletter
wrangler secret put GC_ADMIN_TOKEN < ~/.config/growth-club/gc-admin-token
```

- [ ] **Step 2: Script de deploy do tema**

```bash
#!/usr/bin/env bash
# Empacota o tema gc-news, sobe pro R2 e reinicia o container.
set -euo pipefail
cd "$(dirname "$0")/.."

npx gscan theme/gc-news

TMP=$(mktemp -d)
tar -czf "$TMP/gc-news.tar.gz" -C theme/gc-news .
wrangler r2 object put gc-news-images/_gc/theme/gc-news.tar.gz \
  --file="$TMP/gc-news.tar.gz" --remote
rm -rf "$TMP"

TOKEN_FILE="$HOME/.config/growth-club/gc-admin-token"
if [ -f "$TOKEN_FILE" ]; then
  curl -s -X POST -H "x-gc-admin: $(cat "$TOKEN_FILE")" \
    https://growthclub.pro/content/_gc/restart
  echo "Restart disparado — Ghost volta em ~2-3 min (npm install do adapter + tema + boot)."
else
  echo "Token ausente em $TOKEN_FILE — dispare o restart manualmente (README → Runbook)."
fi
```

```bash
chmod +x bin/deploy-theme.sh
```

- [ ] **Step 3: Commit**

```bash
git add bin/deploy-theme.sh
git commit -m "feat(deploy): bin/deploy-theme.sh — gscan + tar.gz + R2 + restart"
```

---

### Task 8: Deploy end-to-end + verificação

- [ ] **Step 1: Deploy do Worker** (nova rota + BOOT_SCRIPT novo)

```bash
cd ~/Documents/GitHub/growth-club-newsletter
wrangler deploy
```

- [ ] **Step 2: Subir o tema e reiniciar**

```bash
./bin/deploy-theme.sh
```

Expected: gscan sem errors, upload R2 ok, resposta `restarting`.

- [ ] **Step 3: Poll até voltar**

```bash
for i in $(seq 1 16); do
  code=$(curl -s -m 30 -o /dev/null -w "%{http_code}" "https://growthclub.pro/content/")
  echo "[$i] /content/ -> HTTP $code"; [ "$code" = "200" ] && break; sleep 15
done
```

- [ ] **Step 4: Conferir que o tar.gz é servido e o tema chegou no container**

```bash
curl -sI https://growthclub.pro/content/_gc/theme.tar.gz | head -3
wrangler tail --format pretty &  # procurar "[gc-news] tema gc-news instalado" num restart
```

- [ ] **Step 5 (manual — Henrique, 2 cliques no admin):**
  1. `https://growthclub.pro/content/ghost/` → **Settings → Design & branding → Change theme** → ativar **gc-news**.
  2. **Settings → General → Publication language** → `pt-br` (datas e helpers localizados).

- [ ] **Step 6: Smoke test visual** — home `/content/` com hero dark + grid, um post de teste com `.gh-content` estilizado, header/footer idênticos ao site. Verificar JSON-LD NewsArticle no view-source do post.

- [ ] **Step 7: Commit final + push**

```bash
git push origin main
```

---

## Self-review (feito na escrita)

- **Spec §4.2 coberta:** tokens ✓ (link same-origin), fontes self-hosted ✓ (via Pages), header/footer da marca ✓ (web components), gramática `.wrap.is-narrow`/`.section-h2` ✓.
- **Bônus §4.4:** JSON-LD `NewsArticle` + `isAccessibleForFree` já no tema (Plano 4 fica só com o Code Injection).
- **Risco conhecido:** título com aspas duplas quebra o JSON-LD do post.hbs (handlebars escapa HTML, não JSON). Mitigação: convenção editorial (aspas curvas “ ”) — revisitar se virar problema real.
- **Acoplamento consciente:** tema depende dos paths `/assets/css/*.css` e `/assets/js/{header,footer}.js` do Pages. Renomear assets do site quebra o tema — documentado no README do repo da newsletter (Task 8 pode adicionar nota).
