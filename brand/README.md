# Brand · Growth Club

> Mapa do brand book vivo. Estratégia (Markdown) + implementação (CSS/HTML/SVG) sob uma raiz só.

A pasta `brand/` é a **fonte de verdade única** sobre a marca Growth Club. Strategy fica em Markdown nas pastas `decisions/`, `visual/`, `voice/`. Implementação técnica vive em `system/`. Quando há conflito de tokens (cor, tipografia), **o código em `system/colors_and_type.css` vence o Markdown** — os specs visuais (`visual/paleta-primaria.md`, `visual/tipografia.md`) carregam banners de SUPERSEDED quando aplicável.

---

## Estrutura

| Pasta ou arquivo | O que tem | Status |
|---|---|---|
| [`decisions/`](decisions/) | Decisões locked: bandeira pirata (histórica), nome canônico, **arquétipo + voz (Decisão 05 — Hero+Magician, 2026-05-24)**, arquitetura de marcas-filhas. Decisão 03 (Outlaw+Sage) arquivada em `legacy/`. | Travadas |
| [`visual/`](visual/) | Paleta primária (com banner de rebalanceamento AD-008), tipografia (com banner SUPERSEDED AD-008), logo direction (moodboard + prompts Canva/Nano-Banana). | Em iteração; logo SVG final pending Figma |
| [`voice/`](voice/) | Manifesto (3 versões), do's and don'ts, tom por canal, glossário. Pacto editorial. | Travado |
| [`system/`](system/) | **Growth Club Design System** — implementação técnica. Tokens CSS, fontes Satoshi+Roboto self-hosted, 35+ preview cards, 5 templates IG/LinkedIn, ui_kit do site institucional, skill `growth-club-design` invocável via Claude Code. | Adotado em AD-008 (2026-05-17), base adaptada do Level Design System |
| [`legacy/`](legacy/) | Brand book v1 textual (HTML+PDF+MD+CSS) — Chunk 5 do brand brief plan, arquivado quando `system/` se tornou fonte canônica. | Arquivado em 2026-05-17 |
| [`assets/`](assets/) | Slot pra exports finais de canais externos (favicon, OG image, logo PNG). `exports/` tem v0 placeholders gerados da bandeira pirata; dirs vazias `logo/` e `palette/` foram removidas em 2026-05-17. Função distinta de `system/assets/` (placeholders SVG do design system). Ver `assets/README.md`. | v0 placeholders, regenerar quando logo final sair |

---

## Source-of-truth — quando algo conflita

| Tópico | Vence |
|---|---|
| Tokens de cor (HEX, RGB, distribuição) | `system/colors_and_type.css` |
| Tipografia (família, pesos, tracking, line-height) | `system/colors_and_type.css` + `system/fonts/` |
| Componentes visuais (cards, botões, gradientes) | `system/preview/*` + `system/ui_kits/*` |
| Voz e tom (DO/DON'T, manifesto, glossário) | `voice/*` (Markdown ainda é fonte canônica — o card `system/preview/voice-tone.html` é showcase derivado) |
| Decisões estratégicas (arquétipo, nome, bandeira pirata) | `decisions/*` |
| Logo (arte vetorial) | **TBD** — `system/assets/*.svg` são placeholders até vetor final do Figma sair |

---

## Por onde começar conforme intenção

| Intenção | Vai pra |
|---|---|
| "Quero gerar uma peça (post, capa, slide, landing)" | `system/SKILL.md` ou `system/README.md` — invoca a skill `growth-club-design` ou abre os preview cards |
| "Quero ver o manifesto" | [`voice/manifesto.md`](voice/manifesto.md) |
| "Quero entender o tom" | [`voice/dos-and-donts.md`](voice/dos-and-donts.md) e [`voice/tom-por-canal.md`](voice/tom-por-canal.md) |
| "Quero ver paleta e tipografia" | `system/colors_and_type.css` (canônica) + [`visual/paleta-primaria.md`](visual/paleta-primaria.md) e [`visual/tipografia.md`](visual/tipografia.md) (strategy) |
| "Quero entender por que tem bandeira pirata" | [`decisions/01-bandeira-pirata.md`](decisions/01-bandeira-pirata.md) |
| "Quero entender o nome canônico" | [`decisions/02-nome-canonico.md`](decisions/02-nome-canonico.md) |
| "Quero entender arquétipo e tom" | [`decisions/05-archetype-multidisciplinar.md`](decisions/05-archetype-multidisciplinar.md) (Decisão 03 antiga, Outlaw+Sage, em [`legacy/`](legacy/)) |
| "Quero entender marcas-filhas (AI LIKE A PRO)" | [`decisions/04-arquitetura-de-marcas.md`](decisions/04-arquitetura-de-marcas.md) |
| "Quero rodar o design system local" | `cd brand/system && npm run dev` |
| "Quero ler o brand book antigo (v1 textual)" | [`legacy/`](legacy/) — só por curiosidade histórica, está superseder |

---

## Decisões travadas (não-negociáveis)

1. **Nome canônico:** `Growth Club` (informal), `The Growth Club` (formal). `BR Growth Club` aposentado.
2. **Arquétipo (Decisão 05 / AD-014, 2026-05-24):** **Hero + Magician** — aspiracional, inclusivo ("elite do mercado", "transformando o mercado"). Outlaw + Sage **aposentado**.
3. **Ton-anchor:** *"Somos remotos, criativos, gentis e engajados. Invista energia no seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."* O antigo *"Franco, com número, sem palco, com cerveja."* foi **aposentado** (AD-014).
4. **Posicionamento (AD-015):** *"A #1 comunidade de Growth multidisciplinar do Brasil"* — marketing, vendas, CS, analytics, produtos e founders. A régua *"Se não tem número, não é Growth Club"* foi **aposentada** (AD-016); sem régua nominal pública.
5. **Princípio fundacional:** queremos a maior comunidade, não o maior evento. A palavra "evento" não aparece sozinha.
6. **Paleta + tipografia em produção:** Pub Cream `#F5F1E8` + Growth Black `#0A0A0A` + Amber Beer `#D4A24C` (CTA primário) + Pirate Teal `#4FB3A5` (acento secundário) + Smoke Gray `#8B847E` (metadados) + Brick Red `#B84A3E` (alerts). Tipografia: Satoshi + Roboto Mono. Adotado via AD-008.

Trespassar essas decisões exige ADR explícita em [`../.specs/project/STATE.md`](../.specs/project/STATE.md).

---

## Convenções de naming

Convenções completas (incluindo meetup naming, marcas-filhas, tiers de membro) em [`../.specs/project/CONVENTIONS.md`](../.specs/project/CONVENTIONS.md).

---

## Histórico de unificação

- **2026-04-22:** Brand brief plan v1.2 aprovado. Chunks 1–3 produzidos como drafts em `brand/decisions/`, `brand/visual/`, `brand/voice/`.
- **2026-04-28:** Brand book v1 textual produzido como `brand-book-v1.html/pdf/md/css` na raiz do `brand/`.
- **2026-05-17:** Growth Club Design System (adaptado do Level Design System) introduzido. AD-008 documenta migração tipográfica e rebalanceamento de paleta. Pasta `brand-adapt/` removida; conteúdo promovido para `brand/system/`. Brand book v1 textual movido para `brand/legacy/`. Esta consolidação encerra a duplicidade de fontes de verdade entre `brand-adapt/` e `brand/`.

---

> *Marca séria começa pelo manifesto. Fim do palco.*

Mantenedor: Henrique Caner. Última atualização: 2026-06-16.
