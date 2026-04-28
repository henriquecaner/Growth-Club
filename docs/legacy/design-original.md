---
version: "alpha"
name: Growth Club
description: >
  Editorial-emblem identity for a Brazilian community of B2B growth
  operators (founders, CROs, growth leads, analysts, CS). Archetype:
  Outlaw (primary) + Sage (secondary). Ton-anchor:
  "Franco, com número, sem palco, com cerveja." The visual system is
  weight-over-shadow — contrast comes from dense black, warm cream,
  and heavy sans-serif, not from elevation or gloss. Craft-beer label
  meets third-wave coffee meets pirate flag, built for posters,
  newsletter, and a founder-led site.
colors:
  growth-black: "#0A0A0A"
  pirate-teal: "#4FB3A5"
  pirate-teal-hover: "#64C6B8"
  pirate-teal-pressed: "#3C9387"
  pub-cream: "#F5F1E8"
  pub-cream-dim: "#ECE6D6"
  smoke-gray: "#8B847E"
  amber-beer: "#D4A24C"
  amber-beer-dim: "#B8893E"
  brick-red: "#B84A3E"
  background: "#F5F1E8"
  on-background: "#0A0A0A"
  surface: "#F5F1E8"
  on-surface: "#0A0A0A"
  surface-variant: "#ECE6D6"
  on-surface-variant: "#8B847E"
  inverse-surface: "#0A0A0A"
  inverse-on-surface: "#F5F1E8"
  inverse-primary: "#4FB3A5"
  primary: "#4FB3A5"
  on-primary: "#0A0A0A"
  primary-container: "#14302B"
  on-primary-container: "#4FB3A5"
  secondary: "#D4A24C"
  on-secondary: "#0A0A0A"
  secondary-container: "#3B2F14"
  on-secondary-container: "#D4A24C"
  tertiary: "#F5F1E8"
  on-tertiary: "#0A0A0A"
  error: "#B84A3E"
  on-error: "#F5F1E8"
  error-container: "#3F1713"
  on-error-container: "#E49A91"
  outline: "#8B847E"
  outline-variant: "#D9D2C0"
  outline-inverse: "#4A4642"
  focus-ring: "#4FB3A5"
typography:
  display-xl:
    fontFamily: "Archivo Black"
    fontSize: 80px
    fontWeight: "900"
    lineHeight: 80px
    letterSpacing: -0.01em
    textTransform: none
  display-lg:
    fontFamily: "Archivo Black"
    fontSize: 63px
    fontWeight: "900"
    lineHeight: 66px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Archivo Black"
    fontSize: 50px
    fontWeight: "900"
    lineHeight: 54px
    letterSpacing: -0.0075em
  headline-md:
    fontFamily: "Archivo Black"
    fontSize: 40px
    fontWeight: "900"
    lineHeight: 44px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: "Archivo Black"
    fontSize: 32px
    fontWeight: "900"
    lineHeight: 38px
    letterSpacing: -0.005em
  title-lg:
    fontFamily: "Archivo Black"
    fontSize: 25px
    fontWeight: "900"
    lineHeight: 30px
    letterSpacing: -0.0025em
  title-md:
    fontFamily: "Inter"
    fontSize: 20px
    fontWeight: "700"
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: "Inter"
    fontSize: 20px
    fontWeight: "400"
    lineHeight: 30px
  body-md:
    fontFamily: "Inter"
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  body-sm:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
  label-md:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: "700"
    lineHeight: 18px
    letterSpacing: 0.005em
    textTransform: uppercase
  label-sm:
    fontFamily: "Inter"
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 18px
    letterSpacing: 0.005em
  caption:
    fontFamily: "Inter"
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.01em
    textTransform: uppercase
  mono-emphasis:
    fontFamily: "JetBrains Mono"
    fontSize: 16px
    fontWeight: "500"
    lineHeight: 24px
    fontFeature: "'tnum' on"
  mono-number:
    fontFamily: "JetBrains Mono"
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
    fontFeature: "'tnum' on"
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  "2xl": 64px
  "3xl": 96px
  "4xl": 128px
  container-padding-mobile: 16px
  container-padding-desktop: 24px
  section-margin: 64px
  stack-tight: 8px
  stack-default: 16px
  stack-loose: 32px
  inline-tight: 8px
  inline-default: 12px
rounded:
  none: 0px
  sm: 2px
  DEFAULT: 4px
  md: 6px
  lg: 10px
  pill: 9999px
elevation:
  level-0: "none"
  level-1: "0 1px 2px rgba(10, 10, 10, 0.12)"
  level-2: "0 2px 6px rgba(10, 10, 10, 0.14), 0 1px 2px rgba(10, 10, 10, 0.08)"
  level-3: "0 4px 14px rgba(10, 10, 10, 0.18)"
  level-4: "0 10px 28px rgba(10, 10, 10, 0.22)"
  focus-ring: "0 0 0 3px rgba(79, 179, 165, 0.4)"
  inset-hairline: "inset 0 -1px 0 rgba(10, 10, 10, 0.08)"
motion:
  duration-instant: 80ms
  duration-fast: 120ms
  duration-default: 200ms
  duration-slow: 320ms
  duration-reveal: 480ms
  easing-standard: "cubic-bezier(0.2, 0, 0, 1)"
  easing-emphasized: "cubic-bezier(0.3, 0, 0, 1)"
  easing-decelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)"
  easing-accelerate: "cubic-bezier(0.3, 0, 1, 1)"
breakpoints:
  mobile: 0px
  tablet: 640px
  laptop: 1024px
  desktop: 1280px
  wide: 1440px
grid:
  columns-mobile: 4
  columns-tablet: 8
  columns-desktop: 12
  gutter-mobile: 16px
  gutter-desktop: 24px
  max-width: 1200px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 20px"
    borderWidth: 0
  button-primary-hover:
    backgroundColor: "{colors.pirate-teal-hover}"
    elevation: "{elevation.level-1}"
  button-primary-pressed:
    backgroundColor: "{colors.pirate-teal-pressed}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 20px"
    borderWidth: "1px"
    borderColor: "{colors.on-surface}"
  button-secondary-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: "0 16px"
    borderWidth: "1px"
    borderColor: "{colors.inverse-on-surface}"
  card-editorial-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "24px"
    borderWidth: "1px"
    borderColor: "{colors.outline-variant}"
    elevation: "{elevation.level-1}"
  card-editorial-dark:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    rounded: "{rounded.md}"
    padding: "24px"
    borderWidth: "1px"
    borderColor: "{colors.pirate-teal}"
  card-poster:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.pirate-teal}"
    rounded: "{rounded.none}"
    padding: "40px"
    aspectRatio: "3 / 4"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    placeholderColor: "{colors.smoke-gray}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 16px"
    borderWidth: "1px"
    borderColor: "{colors.outline}"
  input-field-focus:
    borderColor: "{colors.primary}"
    elevation: "{elevation.focus-ring}"
  input-field-error:
    borderColor: "{colors.error}"
  badge-founder:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  badge-alert:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  badge-neutral:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
    borderWidth: "1px"
    borderColor: "{colors.on-surface}"
  metadata-label:
    textColor: "{colors.smoke-gray}"
    typography: "{typography.caption}"
  number-callout:
    textColor: "{colors.secondary}"
    typography: "{typography.mono-number}"
  divider:
    backgroundColor: "{colors.outline-variant}"
    height: "1px"
  divider-dark:
    backgroundColor: "{colors.outline-inverse}"
    height: "1px"
  emblem-container:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    aspectRatio: "1 / 1"
    padding: "16px"
  hero-dark:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.display-lg}"
    padding: "96px 24px"
  hero-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.display-lg}"
    padding: "96px 24px"
  nav-link:
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    padding: "8px 12px"
    borderWidth: "0 0 2px 0"
    borderColor: "transparent"
  nav-link-active:
    borderColor: "{colors.primary}"
  tag-tech:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.mono-emphasis}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
    borderWidth: "1px"
    borderColor: "{colors.outline-variant}"
---

# Growth Club — Design System

## Visão geral

Growth Club é uma comunidade brasileira de operadores de growth B2B — founders, CROs, growth leads, devs que fazem growth, analistas e pessoas de CS. A marca nasce de dez anos de ativos orgânicos (Substack, WhatsApp Community, meetups presenciais) sendo profissionalizada, não lançada do zero. A identidade visual traduz a postura "**execução > teatro**": conteúdo com número, sem palco, temperado com a calma de uma mesa de canto de pub.

O sistema opera em dois arquétipos combinados:

- **Outlaw (60%)** — contrarian, anti-LinkedIn, anti-teatro. Materializa-se em preto denso, tipografia pesada e peças com "cheiro de xilogravura editorial".
- **Sage (30–40%)** — curadoria com dado, editorial, legível. Materializa-se em Inter com numerais tabulares, hierarquia tipográfica clara e metadados sóbrios.

O regular guy entra como tempero (~5–10%) em momentos de acolhimento — mensagem de boas-vindas, onboarding, FAQ. Nunca como estrutura primária.

**Ton-anchor da marca (travado):** `"Franco, com número, sem palco, com cerveja."`

**Regra editorial inegociável:** se não tem número, não é Growth Club. Claim sem métrica vira redirecionamento cordial, não conteúdo publicado.

Esteticamente, o sistema se parece com:

- **Sim:** rótulo de cervejaria craft, brasão de whisky, capa de revista editorial (Monocle, The Economist), pôster de banda punk impresso em letterpress.
- **Não:** SaaS genérico com gradiente, glassmorphism, neon, hustle-bro motivacional, ícone flat-3D de conferência de growth.

O sistema é intencionalmente **weight-over-shadow**: contraste e hierarquia vêm de peso tipográfico, blocos de cor sólida e metadados uppercase — não de sombras suaves ou blur. Espere usar `elevation.level-0` e `level-1` em 90% dos casos.

## Cores

A paleta tem seis cores ancoradas em dois pares:

| Papel | Cor | HEX | Observação |
|---|---|---|---|
| Core escuro | Growth Black | `#0A0A0A` | Fundo de autoridade, bandeira pirata, textos em peças dark. ~30% das peças. |
| Core acento | Pirate Teal | `#4FB3A5` | Herança da bandeira pirata original. CTAs primários, hovers, acentos. ~15%. |
| Neutro quente | Pub Cream | `#F5F1E8` | Fundo default de peças light. Puxa pra "luz de pub", nunca branco puro. ~40%. |
| Neutro meta | Smoke Gray | `#8B847E` | Metadados, divisores, autor/data/tags. Nunca em CTAs. ~10%. |
| Acento calor | Amber Beer | `#D4A24C` | Highlight, badge Founder, número callout. ~3%. |
| Acento alerta | Brick Red | `#B84A3E` | Warnings, estados de erro, "desagradável com carinho". Nunca em CTA positivo. ~2%. |

### Distribuição 60/30/10

- **60% neutros:** Pub Cream em peças light, Growth Black em peças dark.
- **30% peso estrutural:** o oposto do fundo (texto + elementos densos).
- **10% cor:** Pirate Teal dominante + Amber Beer/Brick Red pontuais.

### Quatro combinações canônicas

Qualquer peça v1 deve cair em uma destas quatro; não inventar nova combinação sem revisão.

1. **Dark mode** — fundo Growth Black, texto Pub Cream, acento Pirate Teal.
2. **Light mode** — fundo Pub Cream, texto Growth Black, acento Pirate Teal.
3. **Newsletter** — fundo Pub Cream, texto Growth Black, metadados em Smoke Gray.
4. **Pôster de meetup** — fundo Growth Black, título em Pirate Teal ou Pub Cream, metadados em Amber Beer.

### Contraste (WCAG validado)

| Par | Contraste | WCAG |
|---|---|---|
| Growth Black sobre Pub Cream | 17.8 : 1 | AAA |
| Pirate Teal sobre Growth Black | 7.5 : 1 | AAA |
| Amber Beer sobre Growth Black | 8.2 : 1 | AAA |
| Brick Red sobre Pub Cream | 4.8 : 1 | AA |
| Smoke Gray sobre Pub Cream | 3.9 : 1 | AA apenas em ≥18pt — falha em texto normal |

Qualquer combinação não listada requer checagem antes de ir pra produção.

### Tokens semânticos

O YAML expõe aliases (`surface`, `primary`, `error`, etc.) apontando para os seis HEX acima. Priorize os semânticos no código; os nomes crus (`growth-black`, `pirate-teal`) ficam reservados para documentação de marca e peças impressas onde o racional editorial da paleta precisa estar visível.

## Tipografia

Três famílias, hierarquia dura:

- **Archivo Black (peso 900)** — todos os headings. Outlaw puro: condensada, grande altura de x, funciona de favicon a pôster A0. Sempre com tracking negativo (`-0.25%` mínimo) — sem isso fica amontoado.
- **Inter (pesos 400/500/700)** — todo o body, labels, meta, caption. Sage: legível em 14–20px, tem numerais tabulares pra tabelas de benchmark, combina com Archivo sem competir.
- **JetBrains Mono (pesos 500/600)** — ênfase técnica: ferramentas (`n8n`, `Clay`, `Cursor`), stacks, valores numéricos de destaque (`CAC caiu de R$ 420 para R$ 180`). Tech-first atrelado a outcome — nunca decorativo.

### Escala modular (razão 1.25 "major third")

Base `16px`. Cada step multiplica por 1.25.

| Token | Size | Uso |
|---|---|---|
| `caption` | 12px | Labels uppercase, metadados |
| `body-sm` / `label-sm` | 13–14px | Meta, tags, navegação secundária |
| `body-md` | 16px | Body padrão |
| `body-lg` / `title-md` | 20px | Intros, intertítulos, citações |
| `title-lg` | 25px | H4 |
| `headline-sm` | 32px | H3 |
| `headline-md` | 40px | H2 / H1 mobile |
| `headline-lg` | 50px | H1 mobile grande |
| `display-lg` | 63px | H1 desktop |
| `display-xl` | 80px | Hero, pôster de meetup |

### Regra "hierarquia em 3 segundos"

Em qualquer peça, o leitor deve entender em menos de 3 segundos:

1. Sobre o quê é? (heading)
2. Por quê me interessa? (sub/intro)
3. O que eu faço? (CTA)

Se essa hierarquia não é óbvia, ajuste a tipografia antes de mexer em qualquer outra coisa.

### Letter-spacing

| Contexto | Tracking |
|---|---|
| Archivo Black em hero (`display-xl`, `display-lg`) | -1% |
| Archivo Black em seções (`headline-*`) | -0.5% a -0.75% |
| Archivo Black em títulos (`title-lg`) | -0.25% |
| Inter body | 0 (default) |
| Caption uppercase, labels uppercase | +0.5% a +1% |

### Numerais tabulares

Sempre que houver números alinhados em tabela, callout ou comparativo, ativar `font-feature-settings: 'tnum' on`. Inter e JetBrains Mono suportam nativamente.

## Layout

Baseline de **8px**. Toda medida do sistema é múltiplo de 8 (ou 4 em exceções `xs`). Isso dá ritmo editorial — alinha com a postura "número em tudo, inclusive no espaçamento".

### Grid

| Breakpoint | Colunas | Gutter | Container padding |
|---|---|---|---|
| Mobile (0–639px) | 4 | 16px | 16px |
| Tablet (640–1023px) | 8 | 24px | 24px |
| Laptop (1024–1279px) | 12 | 24px | 24px |
| Desktop (≥1280px) | 12 | 24px | 24px |
| Wide (≥1440px) | 12 (max-width 1200px) | 24px | 24px + margem auto |

Max-width canônico do conteúdo: `1200px`. Blocos editoriais (texto longo de newsletter, manifesto) ficam em coluna única de 640–720px mesmo no desktop — legibilidade ganha de densidade.

### Escala de espaçamento

| Token | Valor | Uso típico |
|---|---|---|
| `xs` | 4px | Gap interno de chip/badge |
| `sm` | 8px | Stack tight (label → input), gap de ícone |
| `md` | 16px | Stack default entre elementos de card |
| `lg` | 24px | Padding de card, stack entre seções pequenas |
| `xl` | 40px | Stack loose entre blocos de landing |
| `2xl` | 64px | Margem entre seções grandes |
| `3xl` | 96px | Padding vertical de hero |
| `4xl` | 128px | Respiro máximo (página Sobre, manifesto) |

### Hero e seções

- Hero light/dark: `96px` de padding vertical no desktop, `64px` mobile.
- Seção de conteúdo: `64px` entre seções, `24px` de padding lateral.
- Cards em grade: `24px` de gutter, sem exceção.

### Regra de ar

Quando estiver em dúvida entre mais ou menos ar, **mais**. A marca valoriza o vazio como parte da autoridade editorial — peça apertada passa "desespero de deck de pitch".

## Elevação e profundidade

Sistema de elevação **ralo de propósito**. Em vez de criar hierarquia com blur e opacidade, criamos com peso tipográfico, blocos sólidos de cor e bordas de 1px em `outline-variant`. A consequência prática:

| Nível | Quando usar |
|---|---|
| `level-0` (none) | Default absoluto. Headings, seções de texto, heros, pôsteres. |
| `level-1` (1px) | Cards em light mode, botões primários em hover. Sombra quase imperceptível — só evita que o card "grude" no fundo. |
| `level-2` (2–6px) | Dropdowns, tooltips abertos, popovers. |
| `level-3` (4–14px) | Modais, sheets mobile, overlays de captura. |
| `level-4` (10–28px) | Uso reservado — dialog de confirmação crítica, export pack. |
| `focus-ring` | Obrigatório em todo elemento interativo ao foco via teclado — anel de 3px na cor `primary` com 40% opacidade. Acessibilidade não é opcional. |
| `inset-hairline` | Divisor sutil na base de um header sticky, quando uma borda explícita passaria pesada. |

**Não** usar glass/blur/neon glow em nenhum nível. A cada vez que uma peça "pedir" gradiente ou sombra colorida para funcionar, a resposta é reforçar tipografia ou cor sólida — não adicionar elevação.

## Formas

Radii **pequenos e sóbrios**. A estética de emblema editorial + letterpress rejeita cantos arredondados grandes — eles puxam o sistema pra o território "friendly SaaS", que não é a marca.

| Token | Valor | Uso |
|---|---|---|
| `none` | 0px | Pôsteres, heros, containers de emblema, divisores, imagens editoriais. |
| `sm` | 2px | Botões, inputs, tags — a maior parte dos controles. |
| `DEFAULT` | 4px | Alternativa sutil para elementos que pedem um toque de respiro. |
| `md` | 6px | Cards. |
| `lg` | 10px | Máximo permitido — modais, sheets. Nunca acima. |
| `pill` | 9999px | Exclusivo para badges (Founder, alerta) e chips redondos. |

### Emblema

O símbolo da marca (caveira + tapa-olho + dois ossos + fundo preto, direção "editorial / emblem") funciona como emblema circular/shield em composições principais (pôster, assinatura de newsletter, favicon). O emblema **não** recebe radius no container — fica em quadrado ou círculo puro, com a silhueta fazendo o trabalho.

### Bordas

- Borda default: `1px` em `outline-variant` sobre light, `outline-inverse` sobre dark.
- Borda de destaque: `1px` em `primary` (Pirate Teal) — só em estados ativos (input focus, card selecionado, aba ativa).
- **Nunca** bordas ≥ 2px em elementos pequenos — fica "impresso em matriz de ponto", não editorial.

## Componentes

Os tokens de componente no frontmatter cobrem o conjunto v1. Regras de uso além do YAML:

### Botões

- **Primary** — Pirate Teal sobre texto preto, uppercase Archivo/Inter label-md. Único CTA que fecha venda, abre formulário ou leva pra meetup. Um por tela sempre que possível.
- **Secondary** — outline preto sobre Pub Cream (ou outline creme sobre Growth Black). Ações secundárias: "saiba mais", "leia o manifesto".
- **Ghost-dark** — transparente com outline creme. Só em heros/pôsteres escuros.
- **Nunca** usar Smoke Gray em botão — cinzento = inativo em padrão de UI, não queremos confundir.

### Cards

- **Editorial light/dark** — card padrão de post, newsletter, bio. 24px de padding, borda 1px, radius `md`.
- **Poster** — card de evento (meetup, livecast). Fundo preto, texto Pirate Teal, radius `none`, padding generoso (40px), proporção 3/4.

### Inputs

- Altura 48px fixa, radius `sm`, borda 1px em `outline`.
- Estado focado: borda `primary` + `focus-ring`.
- Estado erro: borda `error` + mensagem em caption `error-container` abaixo.
- Placeholder em Smoke Gray — nunca em Pub Cream sobre Pub Cream.

### Badges e tags

- `badge-founder` (Amber Beer + preto) — reservado para Founder Members. Não reutilizar para promoções genéricas.
- `badge-alert` (Brick Red + creme) — estados críticos (vaga esgotada, deadline expirado).
- `badge-neutral` (outline preto) — categoria, capítulo ("Meetup SP", "Newsletter", "Livecast").
- `tag-tech` (JetBrains Mono + outline) — para menções a ferramentas e stacks em linha com o texto.

### Número callout

Valores de destaque (métricas do negócio, claims de case) usam JetBrains Mono + Amber Beer sobre fundo neutro. Exemplo visual:

> CAC caiu de `R$ 420` para **`R$ 180`** em 6 semanas.

Os dois monetários em mono, o segundo em Amber Beer, o restante em Inter body. Isso é o "ritmo Sage" — número com peso visual específico.

### Navegação

- Links com `label-md` uppercase, 8px de padding vertical.
- Item ativo: borda inferior 2px em `primary`.
- Hover: subir levemente o text-color para `on-surface` (se já não estiver) — sem animação de cor na fonte, só na borda.

### Emblem container

O emblema da marca nunca recebe fundo adaptativo. Em light mode, sempre entra em um container preto com padding 16px; em dark mode, o container preto se funde ao fundo (aceitável). A razão: o emblema foi desenhado em preto + Pirate Teal, e não deve ser redesenhado em runtime.

### Motion

- Micro-interações (hover, press): `duration-fast` com `easing-standard`.
- Transições padrão (accordion, tab): `duration-default` com `easing-standard`.
- Revelações (sheet abrindo, modal entrando): `duration-reveal` com `easing-emphasized`.
- **Nunca** parallax, nunca scroll-jacking, nunca transição de ≥500ms em elemento que o usuário precisa clicar rapidamente.
- Respeitar `prefers-reduced-motion` — colapsar todas as transições para `duration-instant`.

## Do's e Don'ts

Os princípios editoriais e visuais que consolidam a marca. Um Do ou Don't do time de conteúdo também é Do/Don't do sistema visual — não existe descolamento entre copy e layout.

### DO

- ✅ **Abrir a peça com número.** "CAC caiu de R$ 420 pra R$ 180 em 6 semanas." O número é o hook — hierarquia visual deve destacá-lo (JetBrains Mono + Amber Beer ou Archivo Black grande).
- ✅ **Usar português brasileiro coloquial** em copy: "Bora", "beleza", "fechou", "aí". Tipografia acompanha — sem CAPSLOCK vazio, sem exclamação.
- ✅ **Ironia com carinho.** Ataca padrões (print de Cursor sem outcome, teatro de IA), nunca pessoas nomeadas.
- ✅ **Metáforas de pub/mesa/cerveja** pontuais. "Se fosse numa cerveja, eu diria..." Um ou dois por peça, não em cada parágrafo.
- ✅ **Chamar ferramentas pelo nome** em JetBrains Mono: `Clay`, `n8n`, `Cursor`, `Apollo`, `Make`, `Gong`.
- ✅ **Hierarquia clara em 3 segundos.** Se o leitor não entende tema > proposta > ação em 3s, ajustar tipografia antes de qualquer outra coisa.
- ✅ **60/30/10 sempre.** Neutro domina, peso estrutura, cor pontua.
- ✅ **Growth Black ou Pub Cream como âncora** em toda peça — uma delas sempre presente como fundo ou peso dominante.
- ✅ **Numerais tabulares** em qualquer tabela, comparativo ou lista de métricas.
- ✅ **Respeitar `prefers-reduced-motion` e contraste AA/AAA** — acessibilidade é parte do rigor editorial, não um extra.

### DON'T

- ❌ **Listas decorativas sem número.** "10 prompts que mudaram minha vida" é banido — qualquer lista precisa carregar dado ou case atrás.
- ❌ **Palavras de deck de VC iniciante:** "revolucionar", "disruptar", "escalar exponencialmente", "alavancar". Cortar toda vez.
- ❌ **Motivacional raso.** "Vamo que vamo", "grind", "hustle culture". Não existe na marca.
- ❌ **Formalidade corporativa.** "Prezados", "Conforme alinhado". Exceto em contratos e documentos legais.
- ❌ **Self-promo vazio.** "Estou muito feliz em anunciar" sem dizer o que o anúncio entrega em resultado.
- ❌ **Archivo Black em body text** (ilegível abaixo de 18px).
- ❌ **Inter em peso 900** — Archivo Black já ocupa essa hierarquia.
- ❌ **Pirate Teal como fundo de peças grandes** (satura e perde a função de acento).
- ❌ **Smoke Gray em CTA** — o cinzento comunica "inativo".
- ❌ **Amber Beer + Brick Red na mesma peça** (competem visualmente).
- ❌ **Glass/blur/neon glow/gradiente decorativo.** A marca é weight-over-shadow.
- ❌ **Cantos arredondados > 10px** em qualquer elemento. Puxa pra território "friendly SaaS".
- ❌ **Mais de 3 tamanhos de tipografia numa peça** (hero + 1 sub + 1 body).
- ❌ **Atacar nome próprio.** Atacar padrão, nunca pessoa — "desagradável com carinho" é com ideia, não com gente.
- ❌ **Scroll-jacking, parallax, transição > 500ms** em elemento clicável. O sistema respeita o tempo de quem lê.
