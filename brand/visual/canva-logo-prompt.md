# Master prompt — Logo Growth Club no Canva

**Uso:** colar no Canva Magic Media / Magic Studio para gerar referências do emblema; e usar as especificações manuais para construir o wordmark no editor.
**Fluxo recomendado:** Magic Media gera o **emblema** → você compõe o **wordmark** manualmente no editor com Archivo Black → exporta PNG alta-res. SVG final limpo idealmente é refeito no Figma (ver §8 — Tensão honesta).

**Ancoragem:**
- Decisão 01 (`brand/decisions/01-bandeira-pirata.md`) — bandeira pirata evoluída: caveira + 2 ossos + tapa-olho + fundo preto
- Decisão 03 (`brand/decisions/03-arquetipo-e-tom.md`) — Outlaw 60% + Sage 30-40%, ton-anchor `"Franco, com número, sem palco, com cerveja."`
- Visual: `brand/visual/logo-moodboard.md` (Direção 3 — Editorial / Emblem ⭐), `paleta-primaria.md`, `tipografia.md`

---

## 1. Contexto que o gerador precisa saber (não cole no prompt — é briefing pra você)

| Atributo | Valor |
|---|---|
| Marca | Growth Club (nome canônico — não usar "BR Growth Club" nem "The Growth Club" no logo padrão) |
| Categoria | Comunidade brasileira de operadores B2B de Growth |
| Arquétipo primário | Outlaw / Rebel — pirata, anti-teatro, contrarian |
| Arquétipo secundário | Sage — curadoria, número, peso editorial |
| Estética alvo | "Pirata Editorial / Emblem" — craft beer premium + revista editorial + pôster punk de boa qualidade |
| Referências válidas | Cervejarias craft (Dogma, Ale do Rock, 2Cabeças), revistas (The Economist, Monocle), whisky/bourbon labels, cafés "third wave" |
| Referências a EVITAR | Logos tech genéricos (Linear-like minimalismo), pirata cartoon, skull metaleiro 80s, brasão de futebol, gradiente chrome, ícone de app de finanças |

---

## 2. Master prompt — Magic Media (gerador de imagem do Canva)

> **Como usar:** abra Canva → Apps → Magic Media → Image. Cole o prompt em **inglês** (modelos de difusão respondem melhor em inglês). Estilo: **Drawing** ou **Illustration** — nunca Photo / 3D. Gere 4 variações por rodada e pegue 2-3 como referência pro Figma depois.
>
> ⚠️ **Limite de caracteres do Canva Magic Media é ~400.** Use Versão A (180 chars) ou Versão B (280 chars) pra ter folga. Versão C (400) só se o campo aceitar.
>
> 💡 **Por que keywords vírgula-separadas funcionam tanto quanto frases:** o text encoder (CLIP) lê conceitos como vetores, não como gramática. Ordem importa — primeiras palavras pesam mais.

### 2.1 Versão A — ultra-compacta (~180 chars) ✅ cabe sempre

```
editorial emblem logo, skull with black eye-patch, two crossed bones behind, circular frame, woodcut style, craft beer label, solid black silhouette, teal green accent, cream background, no text
```

### 2.2 Versão B — média (~280 chars) ✅ recomendada

```
editorial emblem logo, hand-drawn skull with black eye-patch over left eye, two crossed bones in X shape behind, circular emblem frame like a craft beer label, bold woodcut linework, solid black silhouette, teal green accent on eye-patch, cream background, monocle magazine style, no text, no 3D
```

### 2.3 Versão C — completa (~400 chars) ⚠️ só se o campo aceitar

```
editorial emblem logo for brazilian growth community, hand-drawn skull with black eye-patch over left eye, two crossed bones behind in X shape, inside circular emblem frame, craft beer label aesthetic, bold woodcut linework, solid black silhouette with teal green accent on eye-patch, cream background, references monocle magazine and dogma craft beer, no text no letters no 3D no gradients no cartoon
```

> 💡 **HEX exato (`#4FB3A5`) no prompt é placebo no Magic Media** — modelos de difusão não respeitam HEX precisos. Pedi só `teal green` e `cream`. Você ajusta a cor exata depois no editor do Canva (color picker → "+" → digite HEX). **Exceção: no Canva IA 1.0 conversacional (Versão D abaixo), o HEX funciona melhor** — o modelo é mais sofisticado e tenta respeitar.

### 2.4 Versão D — Canva IA 1.0 conversacional com bandeira anexada (~1.300 chars) ⭐ RECOMENDADA pra esse setup

> **Quando usar:** Canva IA → modo "Logotipo" + "Design" ativados → bandeira `pirate-flag-3.png` anexada como referência via botão "+" do chat.
>
> **Por que funcionar melhor que A/B/C:** o Canva IA conversacional vê a imagem anexada e copia o símbolo dela. Descrever a caveira/eye-patch/bones em palavras seria redundante. Esta versão **assume a referência visual** e investe os chars no que a imagem NÃO mostra: emblema, paleta, wordmark, lockups.

```
Use the attached pirate flag as the visual base for the central symbol of a brand logo for "Growth Club", a Brazilian B2B growth community for senior operators.

SYMBOL: Take the skull, eye-patch, and crossed bones from the reference. Place inside a circular emblem frame (craft beer label aesthetic, editorial magazine vibe — think Monocle, Dogma craft beer, third-wave coffee branding). Refine the linework to bold confident woodcut style — keep slight imperfection, but professional.

WORDMARK: "Growth Club" in heavy condensed sans-serif (Archivo Black or Arial Black fallback), tight tracking, all caps optional.

COLORS — strict palette, max 2 per variation:
- Silhouette and wordmark: solid black #0A0A0A
- Background: warm cream #F5F1E8 (not pure white)
- Accent on eye-patch and inner emblem ring only: teal green #4FB3A5

DELIVERABLES: 3 lockup variations
1. Horizontal — emblem left, wordmark right, baseline aligned
2. Vertical — emblem top, wordmark centered below
3. Icon-only — emblem alone, favicon-ready, must work at 32x32

AVOID: gradients, drop-shadow, glow, chrome, neon, pink, pastel, cartoon style, generic tech minimalism, hand-lettering scripts, serif decorative fonts.

VIBE: outlaw meets editorial — confident, contrarian, never cute.
```

### 2.5 Variações de moldura (substitua a parte do `frame` em A/B/C/D)

| Variação | Substituir por |
|---|---|
| **A — circular clássico** | `circular frame with double ring border` |
| **B — escudo / crest** | `shield-shaped crest frame, heraldic` |
| **C — hexagonal moderno** | `hexagonal frame, slightly tilted, modern craft` |
| **D — sem moldura (símbolo solto)** | `no frame, free-standing skull and bones isolated` |

### 2.6 Variações de tapa-olho (asset distintivo — testar em rodadas separadas)

Esse é **o** elemento que diferencia o logo do Growth Club de qualquer caveira pirata genérica.

Substituir `black eye-patch over left eye` por:
- `eye-patch tilted at diagonal angle`
- `eye-patch with X stitched on it`
- `eye-patch crossed by the bones diagonally`
- `eye-patch over right eye, strap visible`

### 2.7 Apêndice — versão longa para Midjourney / DALL-E / outros (sem limite de chars)

Se rodar fora do Canva (ChatGPT image, Midjourney, DALL-E 3), use a versão completa em frases — eles têm limite muito maior e geram com mais detalhe:

```
Editorial emblem logo for "Growth Club", a Brazilian B2B growth community.
Central element: a hand-drawn skull wearing a black eye-patch over the left eye,
two bones crossed in an X shape behind the skull. The whole composition sits
inside a circular emblem frame, like a craft beer label or a third-wave coffee
brand. Style: bold woodcut-meets-editorial, confident clean linework, slightly
imperfect but never amateur. Color treatment: solid black silhouette with
teal-green accent (#4FB3A5) on the eye-patch and inner emblem ring; cream
background (#F5F1E8). Visual references: Dogma craft beer labels, Monocle
magazine emblems, vintage pirate flag refined for editorial use, third-wave
coffee branding. Negative: avoid cartoon style, avoid 3D rendering, avoid
gradients, avoid chrome metallic effects, avoid hyper-realistic, avoid
generic minimalism, avoid neon colors, avoid pink, avoid pastel, no text,
no letters, symbol only.
```

Para Midjourney, adicionar parâmetros no final: ` --ar 1:1 --v 6 --style raw --no text`

---

## 3. Wordmark — construir manualmente no editor do Canva

Magic Media não escreve "Growth Club" de forma legível e consistente. **Construa o wordmark manualmente** com Text element.

### 3.1 Tipografia (do `brand/visual/tipografia.md`)

| Elemento | Fonte | Peso | Tracking |
|---|---|---|---|
| `Growth Club` (wordmark) | **Archivo Black** | 900 (única) | -1% (kerning negativo apertado) |
| `Comunidade · 2015 →` (tagline opcional, abaixo do wordmark) | **Inter** | 500 | +1% (uppercase, espaçado) |

> ⚠️ Se Archivo Black não estiver no Canva, fallback: **Arial Black**. Nunca use cursiva, serif decorativa, nem display gratuita aleatória.

### 3.2 Lockup (composição do emblema + wordmark)

Três variantes obrigatórias (Task 2.3 Step 2 do plano):

1. **Lockup horizontal** — emblema à esquerda, wordmark à direita, alinhados pelo centro vertical. Espaço entre = altura da letra "G". Use em headers de site, assinatura de email.
2. **Lockup vertical** — emblema acima, wordmark abaixo (centralizado). Espaço entre = ½ altura do emblema. Use em pôsteres, stories de Instagram, ingressos.
3. **Icon-only** — só o emblema, sem wordmark. Use em favicon, avatar de redes, watermark.

Tagline `"Franco, com número, sem palco, com cerveja."` **não entra no logo** — fica em peças onde sobre espaço editorial. Logo é símbolo + nome, só.

---

## 4. Paleta — valores HEX exatos para o Canva

> Cole estes HEX direto no color picker do Canva (clique no elemento → cor → "+" → digite HEX).

| Token | HEX | Onde aplicar no logo |
|---|---|---|
| Growth Black | `#0A0A0A` | Silhueta da caveira, ossos, contorno do emblema, wordmark em fundo light |
| Pub Cream | `#F5F1E8` | Fundo do logo em peças light, wordmark em fundo dark |
| Pirate Teal | `#4FB3A5` | **Acento dentro do emblema** — tapa-olho, anel interno do emblema, ou highlight pontual. Nunca cobrir mais de 15% da peça |
| Amber Beer | `#D4A24C` | Reserva — só usar em variantes especiais (ex: Founder Member badge, lockup S1E1 da Barte) |

**Combinações canônicas (default):**
- Logo padrão: silhueta `#0A0A0A` + acento `#4FB3A5` sobre fundo `#F5F1E8`
- Logo dark: silhueta `#F5F1E8` (cream) + acento `#4FB3A5` sobre fundo `#0A0A0A`
- Logo monocromático: tudo `#0A0A0A` ou tudo `#F5F1E8` (sem teal — para fax, impressão 1 cor, gravação a laser)

**Proibido na v1:**
- ❌ Pirate Teal como fundo de área grande (satura)
- ❌ Mais de 2 cores no logo (preto + teal, ou cream + teal — nunca os 3 com amber simultaneamente)
- ❌ Gradientes, sombras drop-shadow, glow, bevel/emboss, chrome

---

## 5. Especificações técnicas

| Spec | Valor |
|---|---|
| Aspect ratio do icon-only | 1:1 (quadrado, emblema circular cabe dentro) |
| Aspect ratio do lockup horizontal | ~3:1 a 4:1 |
| Aspect ratio do lockup vertical | ~2:3 |
| Stroke width | Consistente em todas as bordas. No emblema circular: ring externo ~4px (em 1024×1024), bones e contorno do skull ~6px |
| Clear space (área de respiro) | Mínimo = altura da letra "G" do wordmark, em todos os lados |
| Tamanho mínimo legível | 32px (icon) — abaixo disso simplificar (talvez só skull + tapa-olho, sem ossos) |
| Tamanho máximo testado | A0 (84×119cm) — verificar se o emblema não pixeliza |

---

## 6. Variações de export obrigatórias (Task 2.3 Step 6 do plano)

Para cada lockup (horizontal, vertical, icon-only), exportar:

| Formato | Resolução | Uso |
|---|---|---|
| PNG | 1024×1024 (icon), 3000×750 (horizontal), 2000×3000 (vertical) | Apresentações, redes sociais, email |
| PNG transparente | mesmas resoluções, fundo transparente | Aplicações sobre fundos custom |
| PNG monocromático preto | mesmas resoluções | Backups, impressão 1-cor |
| PNG monocromático cream | mesmas resoluções | Fundos pretos, dark mode |
| PDF vetor (Canva Pro) | vetor escalonável | Print profissional |
| Favicon 32×32 + 16×16 | versão ultra-simplificada do icon-only | Site / browser tab |

> ⚠️ Canva Free não exporta SVG. Canva Pro exporta SVG mas com paths complexos. Para o vetor final limpo, **refaça no Figma** (ver §8).

---

## 7. Critérios de aceite (do plano + decisões 01 e 03)

Antes de declarar "logo travado":

- [ ] O **tapa-olho** é claramente visível e funciona como o elemento distintivo
- [ ] **Pirate Teal `#4FB3A5`** aparece como acento dentro do emblema (não como cor dominante)
- [ ] Funciona em **16×16** (favicon) sem virar mancha — testar antes de aprovar
- [ ] Funciona em **A3 impresso** (pôster do meetup) sem pixelizar
- [ ] **Silhueta** funciona em monocromático (teste: imprimir só preto sobre branco — ainda dá pra reconhecer?)
- [ ] **Não é confundível** com logos de cervejaria, banda de rock, brasão de time, app de cripto, ou outro Growth do mercado (G4, Cactus, Gaveler, Growth Leaders)
- [ ] Wordmark `Growth Club` em **Archivo Black**, tracking -1%
- [ ] Lockup horizontal + vertical + icon-only — todos prontos
- [ ] Versão **dark** (sobre `#0A0A0A`) e versão **light** (sobre `#F5F1E8`) — ambas validadas
- [ ] Brief de teste blind passou (Task 2.1 Step 5.2): mostrar 5 logos não rotulados a 5 membros core e Growth Club ser identificado por ≥3

---

## 8. Tensão honesta — Canva vs. Figma

**O que Canva entrega bem:**
- ✅ Magic Media gera referências visuais do emblema rapidamente (10x mais rápido que sketch manual)
- ✅ Editor é fácil para compor lockups (emblema + wordmark) e exportar PNG alta-res
- ✅ Preview imediato em mockups (cartão de visita, post de rede, impresso)

**O que Canva entrega mal:**
- ❌ **SVG limpo (< 5KB)** — Canva exporta paths muitas vezes redundantes; favicon SVG fica grande
- ❌ **Path simplification** — não tem `Path > Simplify` (Figma tem)
- ❌ **Stroke consistente** — quando exporta de uma imagem gerada por IA, os contornos têm espessuras inconsistentes que precisam ser refeitas em vetor
- ❌ **Edição precisa de pontos de Bezier** — interface é simplificada demais

**Fluxo recomendado:**
1. **Exploração rápida no Canva** (este prompt) → escolher 2-3 referências
2. **Refinar no Figma solo** (Steps 1c-1e do plano `logo-moodboard.md` linha 124-156) — Iconify plugin acelera
3. **Export final do Figma** — SVG minificado, PNG @1x/@2x/@3x, favicon 16×16

Se você decidir que **só Canva é suficiente** (ex: pra v1 da pré-inscrição da Barte rodar até maio/2026), está ok — mas marca um débito técnico em `STATE.md` pra refazer o vetor antes da Fase 2 (Crescimento).

---

## 9. Don'ts (régua final)

- ❌ **Sem texto dentro do emblema** — texto vai no wordmark fora do emblema
- ❌ **Sem ano "2015" ou "Est. 2015" no logo** — é tentador (data legítima), mas polui a v1. Tagline temporal vai em peças longas, não no logo
- ❌ **Sem "BR" em lugar nenhum** — `BR Growth Club` foi aposentado (decisão 02)
- ❌ **Sem palavra "evento"** — não-negociável #1 do business plan §3.3
- ❌ **Sem rosa, neon, pastel, gradiente metálico** — incompatível com Outlaw (decisão 03)
- ❌ **Sem caveira sorridente cartoon** — emblema editorial, não decoração de festa pirata infantil
- ❌ **Sem confiar 100% no que a IA gerou** — Magic Media é referência, não final. Sempre revisar pixel a pixel

---

## 10. Após execução — sync obrigatório

Quando o logo estiver travado:

1. Salvar exports em `brand/assets/logo/` (criar pasta — está vazia hoje)
2. Marcar Task 2.3 do plano `docs/superpowers/plans/2026-04-22-growth-club-brand-brief.md` como done
3. Logar **ADR-002** em `.specs/project/STATE.md`: "Logo Growth Club v1 travado — direção [Editorial/Emblem], emblema [shape], tapa-olho [posição]"
4. Atualizar `brand/visual/logo-moodboard.md` Step 1b com a direção escolhida
5. Atualizar `brand/decisions/04-arquitetura-de-marcas.md` (skeleton) com regra de herança do emblema para marcas-filhas (AI LIKE A PRO)
