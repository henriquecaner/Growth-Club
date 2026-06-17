# GROWTH CLUB — Design System

> **A #1 comunidade de Growth multidisciplinar do Brasil.**

Sistema de design **light-first** com dark mode **para seções estratégicas**. Adaptado a partir do Level Design System (mai/2026), com paleta e voz da Growth Club locked nas decisões de marca.

---

## A comunidade

**Growth Club** é a **#1 comunidade de Growth multidisciplinar do Brasil** — profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders (AD-015). Ativos orgânicos desde 2015 (Substack ~2.261 subs, WhatsApp Community ~715, 10+ meetups realizados). Estamos profissionalizando a operação rumo ao relançamento via **Meetup Growth SP · S1 · E1 · 9 jul 2026 @ CRMBonus**.

**Posicionamento (reset AD-014/015, 2026-05-24):** aspiracional e inclusivo — a elite multidisciplinar do mercado, "transformando o mercado". Comunidade-first (não newsletter-first). Arquétipo **Hero + Magician** (Outlaw + Sage aposentado).

**Ton-anchor (locked, AD-014):** `"Somos remotos, criativos, gentis e engajados. Invista energia no seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."` (O antigo `"Franco, com número, sem palco, com cerveja."` foi aposentado.)

**Curadoria:** triagem de candidatura mantém o nível da comunidade, sem régua nominal pública (a régua "Se não tem número, não é Growth Club." foi aposentada em AD-016).

---

## 🌓 Filosofia de Tema: Light-first, Dark para Impacto

**LIGHT MODE = 95% do conteúdo.**
Background **Pub Cream** (`#F5F1E8` — neutro quente, puxa pra "luz de pub"), texto **Growth Black** (`#0A0A0A`). É o tema padrão. Corpo de newsletter, posts editoriais, site institucional, grids, listas — tudo vive aqui.

**DARK MODE = seções pontuais de destaque.**
Aplica `[data-theme="dark"]` em `<section>` ou `<div>` específicas para criar **momentos épicos**:
- Hero cover com gradient amber/teal
- CTA final de conversão (assinar newsletter, virar GH Master)
- Depoimento/quote em destaque
- Capa de pôster de meetup (preto editorial, tipografia massiva)
- Slide cover

### ⚠️ Regra de ouro
**Dark mode NUNCA vive sozinho.** Ele só existe como **contraste visual** dentro de um fluxo light. Se você está pensando em fazer uma página inteira dark, repensa — o impacto vem da alternância, não da unanimidade.

### ✅ Exemplos corretos

```html
<!-- Site institucional: hero dark → corpo light → CTA dark -->
<section data-theme="dark" class="hero">
  <h1>A #1 comunidade de Growth multidisciplinar do Brasil.</h1>
  <p>Especialista com especialista. Conversa entre pares. Sem teatro.</p>
</section>

<section class="manifesto">
  <!-- light por default -->
  <h2>O que a gente faz</h2>
  <p>...</p>
</section>

<section class="cta-final" data-theme="dark">
  <h2>Faça parte da comunidade.</h2>
  <button>Tornar-se membro</button>
</section>
```

```html
<!-- Newsletter: cover dark → corpo light -->
<header data-theme="dark">
  <h1>Pipeline #42</h1>
  <p class="eyebrow">Maio 2026 · Growth Club Substack</p>
</header>

<article>
  <!-- light -->
  <p>Essa semana...</p>
</article>
```

### ❌ Anti-padrão

```html
<!-- Site inteiro dark — perde contraste, cansa, sem punch -->
<html data-theme="dark">
  <body>
    <nav>...</nav>
    <main>...</main>
    <footer>...</footer>
  </body>
</html>
```

---

## Sources / inputs que alimentaram este sistema

**Base estrutural:** Level Design System (outra marca do Henrique, na Level Tech). Reutilizamos a engenharia de tokens, scale tipográfica, motion, radii e a filosofia light-first opt-in dark. **Substituímos** paleta de cor e narrativa de voz pelas decisões locked do Growth Club:

| Decisão GC | Documento de origem |
|---|---|
| Paleta (Growth Black, Pirate Teal, Pub Cream, Smoke Gray, Amber Beer, Brick Red) | `brand/visual/paleta-primaria.md` |
| Tipografia (display) | `brand/visual/tipografia.md` (Archivo Black SUPERSEDED por Satoshi em AD-006) |
| Arquétipo + voz (Hero + Magician — AD-014) | `brand/decisions/05-archetype-multidisciplinar.md` |
| Bandeira pirata / verde-água | `brand/decisions/01-bandeira-pirata.md` |
| Nome canônico (Growth Club / The Growth Club) | `brand/decisions/02-nome-canonico.md` |

**Logos atuais (placeholder):** `assets/logo-*.svg` — wordmarks textuais provisórios em Satoshi Black com ponto Amber. **A logo final do Growth Club ainda está em construção no Figma** (Task 2.3 do brand brief plan, com prompts em `brand/visual/canva-logo-prompt.md` e `nano-banana-prompt.md`). Quando o vetor oficial sair, substituir os arquivos aqui mantendo os mesmos nomes.

**Tipografia:**
- **Satoshi** — display + body. Self-hosted em `fonts/Satoshi-Variable.ttf` (variable, eixo wght 300–900) + 10 estáticos por peso. `fonts/fonts.css` declara um `@font-face` por peso.
- **Roboto** — mono, para IDs, métricas tabulares, eyebrow labels. 18 TTFs em `fonts/`.

---

## Running locally

```bash
cd "Growth Club Design System"
npm run dev
# → http://127.0.0.1:8000
# Browse preview/ para auditar os cards lado a lado (LIGHT | DARK · SECTION).
# O split dual é automático via preview/_split.js, exceto onde o card
# declara <html data-no-split>.
```

---

## Output formats — O que este design system produz

Este sistema é **light-first** e otimizado para os artefatos que o Growth Club efetivamente produz:

### 1. **Social Media (Instagram, LinkedIn)**
- **IG 1:1 (1080×1080)** — quotes, statements editoriais
  → `preview/social-ig-square.html`
- **IG 4:5 (1080×1350)** — dados, stats, carrosséis de conteúdo
  → `preview/social-ig-portrait.html` + `templates/ig-*.html`
- **LinkedIn banner (1584×396)** — header de página/perfil
  → `preview/social-linkedin-banner.html`
- **LinkedIn carrossel** — 6 páginas stackadas
  → `templates/linkedin-carrossel.html`

**Pattern:** fundos light (`--bg-base` `#F5F1E8`), headlines grandes (76-88px), logo + URL no rodapé. Acento Amber pra emphasis, Teal pra keywords e dots.

### 2. **Newsletter Covers (Substack)**
- **OG image (1200×630)** — capa de post, preview social
  → `preview/newsletter-cover.html`

**Pattern:** eyebrow ("Pipeline #42 · Maio 2026") + headline + sub, logo no footer. Gradient backdrop sutil (opacity 0.3).

### 3. **Site institucional & Landing**
- **Hero sections** — light (default) + dark (alternativo para hero épico)
  → `preview/lp-hero-light.html` / `preview/lp-hero-dark.html`
- **Full website kit** — nav, manifesto, sections, forms, footer
  → `ui_kits/website/`

**Pattern:** Light como padrão. Dark só em **seções pontuais** (hero alternativo, capa, depoimento). Nunca dark standalone.

### 4. **Pôsteres de Meetup & Slides**
- **Slide cover template** — 1920×1080, dark hero com tipografia massiva
  → `preview/slide-template.html`

**Pattern:** Deck light-mode, capa/seções dark via `[data-theme="dark"]`. Headlines em Satoshi Black, mínimo 48-64px. Pôster de meetup segue mesma régua — Growth Black de fundo, título em Pub Cream ou Pirate Teal, metadados (data/local/edição) em Amber.

---

## Dark mode: seção, não tema

Dark não é um tema standalone — é um **treatment pontual** dentro de contextos light:
- Hero de site (1 de 5 sections)
- Capa de slide deck (slide 1 de 20)
- Background de foto/depoimento

**Regra:** Se o artefato tem navegação ou UI chrome (nav, breadcrumbs, tabs), é light. Dark vive apenas em **full-bleed sections** sem chrome.

---

## Índice do repositório

```
.
├── README.md                    ← Guia completo (você está aqui)
├── SKILL.md                     ← Agent skill (Claude Code compatible)
├── colors_and_type.css          ← 🎨 Todos os tokens (cores, type, spacing, radii, motion)
├── fonts/
│   ├── fonts.css                ← @font-face declarations (Satoshi + Roboto self-hosted)
│   ├── Satoshi-*.otf            ← 10 arquivos (Light/Regular/Medium/Bold/Black + itálicos)
│   └── Roboto-*.ttf             ← 18 arquivos (pesos 100-900)
├── assets/
│   ├── logo-white.svg           ← Wordmark placeholder pra fundos escuros
│   ├── logo-black.svg           ← Wordmark placeholder pra fundos claros
│   ├── logo-mark.svg            ← Monogram placeholder (favicons/avatars)
│   ├── logo-mark-white.svg      ← Monogram invertido
│   └── README.md                ← Notas: logos finais pending Figma
├── preview/                     ← 🎴 Cards do Design System
│   ├── _base.css                ← Estilos base pra split view (LIGHT | DARK)
│   ├── _split.js                ← Script que clona cards em 2 panes
│   ├── colors-*.html            ← Paletas (accent, bg, fg, semantic, light-theme)
│   ├── type-*.html              ← Display, scale, weights, mono, labels
│   ├── copy-library.html        ← Voz, tom, casing, exemplos GC
│   ├── voice-tone.html          ← DO / DON'T da voz Hero+Magician
│   ├── elevation*.html          ← Shadows + glows
│   ├── gradients*.html          ← Amber fade, Teal fade, architect (warm)
│   ├── iconography*.html        ← 20 ícones Lucide
│   ├── logo-usage.html          ← Quando usar white vs black
│   ├── lp-hero-*.html           ← Templates de hero (light + dark)
│   ├── motion*.html             ← Easing, durations
│   ├── newsletter-cover.html    ← Header de newsletter (600px width)
│   ├── og-card.html             ← Social share 1200×630
│   ├── photo-overlay.html       ← Treatment pra fotos (amber/teal overlay)
│   ├── radii.html               ← Border-radius scale
│   ├── slide-template.html      ← Deck 16:9 (5 slides de exemplo)
│   ├── social-ig-*.html         ← Instagram square + portrait
│   ├── social-linkedin-banner.html
│   ├── spacing-scale.html
│   └── satoshi-practices.html   ← Boas práticas de tipografia
├── templates/                   ← 📐 Templates prontos para produção
│   ├── ig-capa-narrativa.html   ← IG 1080×1350 (hero dark + texto)
│   ├── ig-dado-insight.html     ← IG 1080×1350 (stat grande + caption)
│   ├── ig-framework.html        ← IG 1080×1350 (diagrama 4 nós)
│   ├── ig-lista-howto.html      ← IG 1080×1350 (lista numerada)
│   └── linkedin-carrossel.html  ← LinkedIn 1080×1080 (6 páginas)
└── ui_kits/
    └── website/
        ├── index.html           ← Site institucional (landing manifesto)
        ├── sub-page.html        ← Template de sub-página (Sobre / Manifesto)
        └── README.md            ← Notas sobre o site kit
```

---

## 🚀 Quick Start

### 1. Download e setup
```bash
cd "Growth Club Design System"
```

### 2. Navegue os cards do Design System
Abra qualquer arquivo `.html` em `preview/` no navegador. Cada card renderiza automaticamente em **split view** (LIGHT | DARK · SECTION) via `_split.js`.

**Principais cards pra começar:**
- `preview/colors-accent.html` — Paleta Amber/Teal
- `preview/colors-light-theme.html` — Pub Cream + neutros warm
- `preview/type-display.html` — Hierarquia tipográfica
- `preview/voice-tone.html` — DO / DON'T da voz GC

### 3. Use os templates prontos
Arquivos em `templates/` são **prontos pra produção** — abra, edite copy/imagens, exporte PNG/PDF.

### 4. Construa landing pages
Use `ui_kits/website/index.html` como base — hero dark épico, seções light, CTA dark final.

---

## CONTENT FUNDAMENTALS

### Voz e tom

**Especialista, não palestrante.** O Growth Club fala como quem opera: número primeiro, narrativa depois. Sem promessa, sem teatro, sem fórmula mágica.

**Princípios:**
- Afirma com número, não promete. (`De 2.261 subs orgânicos em 7 anos, 715 ativos no WhatsApp.` ✓ — `A maior comunidade de growth do Brasil!` ✗)
- Nomeia o problema antes de propor solução.
- Português BR coloquial, ironia leve. (`A rataria com nome pomposo continua.` ✓ — `Insights game-changers!` ✗)
- Usa palavras de operação: *operar, número, mesa, rolou, entregou, cabou, real, no copo, sem palco*.
- Rejeita palavras de palco: *growth hack, fórmula, escalar 10x, hustle, guru, transformação, jornada*.
- Sem emoji em copy de marca. Em texto editorial casual interno, ok com parcimônia.

### Pessoa gramatical

- **Segunda pessoa** quando fala com membro/leitor: *"você vai entrar"*, *"o teu número"*, *"se tu trouxer um caso"*.
- **Primeira pessoa do plural** quando fala da Growth Club: *"a gente fez 10 meetups"*, *"a régua editorial é..."*.
- Tu/você ambos aceitáveis dependendo do tom (mais "tu" no WhatsApp, mais "você" na newsletter).

### Casing

- **Nome da comunidade em texto:** `Growth Club` (informal) ou `The Growth Club` (formal). Sempre capitalização normal — **não usar GROWTH CLUB caixa-alta** em prosa. O wordmark (logo) é minúsculo `growth club.` quando finalizado em vetor — distinção rígida: arte = minúscula, prosa = `Growth Club`.
- **Meetups:** `Meetup Growth [CIDADE] · S[ANO] · E[EDIÇÃO] · [TEMA]`. S1 = 2026. Ex.: `Meetup Growth SP · S1 · E1 · 9 jul 2026 @ CRMBonus`.
- **Headlines:** sentence case. `A #1 comunidade de Growth multidisciplinar do Brasil.` — não `A #1 Comunidade De Growth Multidisciplinar Do Brasil`.
- **Labels de UI:** UPPERCASE com letter-spacing `0.08em`. Apenas em eyebrows, chips, table headers. Usar com moderação.
- **Botões:** sentence case. `Assinar a newsletter`, `Entrar no WhatsApp` — não `ASSINAR A NEWSLETTER`.

### Punctuação de marca

- O **ponto final** depois do wordmark `growth club.` é parte da assinatura (renderizado em Amber Beer no design final). Em UI/copy de texto, escrever `Growth Club` sem ponto especial.
- Em manifestos e headlines, travessão longo (`—`) é preferido a parênteses. Sinaliza pausa de raciocínio de especialista. **Não abusar** — o humanizer skill regula.
- Frases curtas. Ritmo de mensagem de WhatsApp, não de copywriter.

### Exemplos (cross-check com o ton-anchor)

| ✓ Growth Club | ✗ Não Growth Club |
|---|---|
| "Especialista com especialista. Conversa entre pares. Sem teatro." | "Insights game-changers pro próximo nível!" 🚀 |
| "Quem entrega senta na mesa — quem desfila fica no palco." | "Pense fora da caixa, seja disruptivo" |
| "De 2 reuniões semanais pra 8 em 60 dias. Sem contratar SDR." | "Resultados incríveis garantidos!" |
| "A #1 comunidade de Growth multidisciplinar do Brasil." | "Únase à nossa jornada de transformação." |
| "A rataria com nome pomposo continua." | "Conteúdo de altíssimo valor pros nossos members." |

---

## VISUAL FOUNDATIONS

### Paleta (locked em `brand/visual/paleta-primaria.md`)

| Token | HEX | Nome | Uso |
|---|---|---|---|
| `--bg-base` (light) | `#F5F1E8` | **Pub Cream** | Fundo default de tudo. Neutro quente, puxa pra "luz de pub". |
| `--fg-primary` (light) | `#0A0A0A` | **Growth Black** | Headlines + body em light. Bandeira pirata + autoridade editorial. |
| `--accent-amber` | `#D4A24C` | **Amber Beer** | CTA primário. "Cerveja" do ton-anchor. |
| `--accent-teal` | `#4FB3A5` | **Pirate Teal** | Acento secundário. Keywords, dots, success states. Continuidade da bandeira pirata. |
| `--fg-tertiary` | `#8B847E` | **Smoke Gray** | Metadados, divisores, autor/data. Não usar em CTAs. |
| `--color-danger` | `#B84A3E` | **Brick Red** | Alertas, warnings, destaque contrarian. **Nunca em CTAs positivos.** |

**Distribuição 60/30/10:**
- 60% neutros (Pub Cream em light, Growth Black em dark)
- 30% peso estrutural (Growth Black em texto, Pub Cream em texto de dark sections)
- 10% cor (Amber dominante em CTA + Teal pontual + Brick Red em alerts)

**Combinações canônicas (defaults):**
1. **Light mode:** fundo Pub Cream + texto Growth Black + CTA Amber + keywords Teal
2. **Dark mode (section):** fundo Growth Black + texto Pub Cream + CTA Amber bright + keywords Teal bright
3. **Newsletter:** fundo Pub Cream + texto Growth Black + autor/data em Smoke Gray + eyebrow em Teal
4. **Pôster de meetup:** fundo Growth Black + título em Pub Cream ou Teal + metadados em Amber

### Tipografia

- **Satoshi** (variable, self-hosted em `fonts/Satoshi-Variable.ttf`). Pesos 300, 400, 500, 700, 900 + itálicos.
  - **Weights em uso:**
    - **Black 900** — display (60px+), `letter-spacing -0.04 a -0.05em`, `line-height 0.92`
    - **Bold 700** — h1–h3, `letter-spacing -0.02 a -0.025em`, `line-height 1.15`
    - **Medium 500** — h5/h6, lead, buttons, labels
    - **Regular 400** — body, captions
    - **Light 300** — uso isolado em callouts; nunca em pares com Black
- **Display:** stack apertado em tamanho grande. Em 100px+, `-0.05em`. Em 28-48px, `-0.025em`. Em body, sempre `0`.
- **Body:** Regular, `line-height 1.6`. Respiração pra leitura longa de newsletter.
- **Mono:** Roboto pra IDs, dados tabulares, métricas. Eyebrows (`Pipeline #42 · MAIO 2026`).

### Satoshi — OpenType features

- **`tnum` (tabular nums)** — colunas alinham. Aplicar via `.t-num` ou `[data-num]`. Obrigatório em métricas, tabelas de benchmark do Sage.
- **`cv01` (slashed zero)** — diferencia 0 de O em IDs e códigos.
- **`ss01` (alt 'a' single-story)** — versão geométrica do 'a'. Liga em display 60px+. Aplicado automaticamente em `.t-display-*`.
- **`kern` + `liga`** — sempre on (global em `fonts.css`).

### Italic

Apenas via Satoshi Italic real. Use em:
- Títulos de livros/álbuns/obras
- Palavras estrangeiras (*growth*, *outbound*, *pipeline*)
- Ênfase mid-sentence em texto editorial

**Nunca** em UI: labels, buttons, chips, tabs.

### Espaçamento e ritmo

Base **4px**. Escala: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`. Seções grandes respiram em 80–128px no desktop. Cards internos em 24px. Sem espaçamentos irregulares (23px, 17px) — regra rígida.

### Cantos (radii)

Baixos e estruturais. Editorial, não chiclete.
- `2px` — chips densos, tags
- `4px` — inputs, chips padrão
- `6px` — botões, cards pequenos
- `10px` — cards, painéis
- `16px` — modais, hero cards
- `999px` — somente avatares, dots, pills intencionais

Nunca misturar muitos raios numa mesma tela. Uma interface tem 1–2 raios dominantes.

### Bordas

Sempre sutis.
- No light: `rgba(10,10,10,0.06 / 0.12 / 0.24)` — hairlines warm.
- No dark: `rgba(245,241,232,0.06 / 0.10 / 0.22)` — hairlines Pub Cream.
- `var(--accent-amber)` — borda de estado ativo/selecionado. 1px.

### Sombras e elevação

- **Light:** soft drops. `0 1px 2px rgba(10,10,10,0.04)` em cards, `0 8px 24px rgba(10,10,10,0.08)` em raised. Nunca glows neon em light bg.
- **Dark:** inset highlight (`inset 0 1px 0 rgba(245,241,232,0.06)`) + glow ocasional em accent (`0 0 32px rgba(229,180,93,0.45)`). Nunca drop shadows fofinhos.

### Gradientes — motif de marca

Gradientes são estruturais, não decorativos.

1. **Hero radial** — amber + teal nos cantos, fade pro fundo. Suave em light, intenso em dark.
2. **Amber fade** — `linear-gradient(135deg, #D4A24C 0%, <bg> 100%)`. Seções de destaque.
3. **Teal fade** — `linear-gradient(135deg, #4FB3A5 0%, <bg> 100%)`. Acentos editoriais.
4. **Architect (warm)** — diagonais sutis em três tons de Pub Cream.

Nunca pastel ou rainbow. Máximo 2 cores + fade.

### Backgrounds / imagery

- **Dominante:** cor chapada ou gradientes sutis.
- **Imagery:** quando aparece, é editorial — fotos de mesa de pub, copo de cerveja, mãos digitando, mapa físico, eventos reais. Tom cinematográfico contrastado. Nunca stock photos de gente sorrindo em reunião corporativa.
- **Textura:** ocasional noise/grain sutil sobre gradientes (3-5% opacidade).
- Não usar: mascotes, ilustrações fofas, gradientes aquarela, blobs.

### Animação

Precisa e rápida. Especialista, não bailarino.
- **Easing padrão:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (saída rápida, chegada suave)
- **Durações:** 80ms (instant), 160ms (padrão), 240ms (médio), 400ms (transições de página)
- **Sem bounces, overshoot, elastic.** Nada que pareça "fofo".
- **Hover:** fade rápido (160ms), mudança de bg/border. Evitar scale > 1.02.
- **Entrada:** fade + translateY pequeno (8–16px). Nunca deslizes dramáticos.
- **Amber glow** como micro-interação em CTA hover (pulse 240ms).

### Estados de interação

- **Hover (botão primário Amber):** Amber → Amber Bright (`#E5B45D`), + glow de 32px.
- **Hover (botão secundário):** border `rgba(10,10,10,0.20)`, fundo `bg-raised` → `bg-overlay`.
- **Press:** escurece (Amber → Amber Dim `#B88838`). Sem shrink.
- **Focus:** outline `2px` Amber, offset `2px`. Sempre visível — acessibilidade é parte da régua.
- **Disabled:** opacidade 40%, sem mudança de cor.

### Cards — padrão canônico

```css
background: var(--bg-raised);          /* #FBF7EE em light */
border: 1px solid var(--border-default); /* rgba(10,10,10,0.12) */
border-radius: var(--radius-lg);       /* 10px */
padding: var(--space-6);               /* 24px */
box-shadow: var(--shadow-flat);
```

Hover adiciona: `border: var(--border-strong)` + `transform: translateY(-1px)` + `transition: 160ms`.

---

## ICONOGRAPHY

Nenhum icon set proprietário definido pelo Growth Club. Padrão adotado:

### Biblioteca

**[Lucide Icons](https://lucide.dev/)** — via CDN. Motivo:
- Stroke fino (1.5–2px), geométrico, casa com o tom editorial da marca.
- Open source (ISC).
- Cobertura ampla (1400+ ícones).

**⚠ Flag:** isto é stand-in até decisão própria do GC. Se a comunidade quiser iconografia proprietária (provável fase 2), substituir mantendo stroke `1.5–1.75px`, cantos suaves, grade 24×24.

### Uso

- **Tamanho padrão:** 20px (inline com body) ou 24px (sozinho).
- **Stroke:** `1.75px` em ≤20px; `2px` em ≥24px.
- **Cor:** herda `currentColor`. Em botões primários: `var(--fg-inverse)`. Em cards: `var(--fg-tertiary)` por padrão, `var(--accent-teal)` em estados ativos.

### Emoji e unicode

**Não usar emoji em copy de marca.** Em UI/headlines, glifos textuais ok:
- `→` `↗` `↘` — setas (ex: "de 4 reuniões → 25 em 90 dias")
- `—` — travessão longo
- `×` — close buttons
- `·` — separador inline

### A marca como ícone

O **mark** (placeholder atual: monogram `g.` em Amber sobre Growth Black) pode ser usado isolado como:
- Favicon (`assets/logo-mark.svg`)
- Avatar de Substack/WhatsApp
- Marca d'água em slides

**Logo final pending Figma.** Quando o vetor oficial (bandeira pirata evoluída) sair, substituir os 4 SVGs em `assets/`.

---

## Aliases legados (compatibilidade)

Este sistema descende do Level Design System. Tokens antigos foram **preservados como aliases**:

```css
--accent-violet → --accent-amber
--accent-mint   → --accent-teal
--gradient-purple-fade → --gradient-amber-fade
--gradient-mint-fade   → --gradient-teal-fade
.t-accent-violet { color: var(--accent-amber); }
```

**Não usar nomes legados em código novo.** Use `--accent-amber` e `--accent-teal` diretos.

---

## Próximos passos recomendados

1. **Logo oficial em vetor** — escada de bandeira pirata evoluída, prompts em `brand/visual/`. Substituir `assets/logo-*.svg` quando o Figma exportar.
2. **Confirmar iconografia** — aceitar Lucide ou fornecer set proprietário em fase 2.
3. **Tirar fotos reais** — meetups, pessoas trocando ideia, copo de cerveja, hands-on em laptop. Substituir stock placeholders no `ui_kits/website/`.
4. **Ampliar voz em microcopy** — empty states, tooltips, confirmações — quando o site for ao ar.
5. **Migrar tipografia produção** — atualizar `brand/visual/tipografia.md` documentando AD-006 (Satoshi substitui Archivo Black em display). Inter pode permanecer como backup web-safe em emails se houver fallback issues com Satoshi.

---

## Mudanças vs. Level Design System (base)

| Item | Level | Growth Club | Motivo |
|---|---|---|---|
| Accent primary | Violet `#5522FA` | Amber `#D4A24C` | "Com cerveja" do ton-anchor; casa com paleta GC locked |
| Accent secondary | Mint `#00B470/#00F59B` | Pirate Teal `#4FB3A5` | Continuidade da bandeira pirata (decisão 01-B) |
| `--bg-base` light | `#F5F5F5` (cinza neutro) | `#F5F1E8` (Pub Cream) | "Luz de pub", neutro warm, locked em paleta-primaria.md |
| `--fg-primary` light | `#1A1A1A` (soft-black) | `#0A0A0A` (Growth Black) | Locked. Mais autoridade editorial. |
| Tipografia display | Satoshi (mantida) | Satoshi (migrado) | AD-006 substitui Archivo Black por Satoshi (variable, melhor flexibilidade) |
| Mono | Roboto (mantida) | Roboto (mantida) | — |
| Filosofia light-first | sim | sim | mantida |
| Dark = section, não tema | sim | sim | mantida |
| Voz | Builder, não vendedor (LEVEL B2B SaaS) | Especialista, não palestrante (Hero+Magician, #1 comunidade de Growth multidisciplinar) | locked em decisão 05 (AD-014) |
