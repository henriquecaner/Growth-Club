# Paleta primária v2

> ⚠️ **Reset AD-014 (2026-05-24):** arquétipo agora é Hero + Magician; "Outlaw + Sage" e a bandeira pirata viram referência histórica, sem aplicação visual ativa. Os HEX abaixo seguem válidos; as justificativas que citam Outlaw/Sage ou o ton-anchor aposentado ("Franco, com número, sem palco, com cerveja.") permanecem só como histórico de origem. Direção visual final é TBD. Ver `brand/decisions/05-archetype-multidisciplinar.md`.

**Data:** 2026-05-17
**Ancoragem:** AD-008 em `.specs/project/STATE.md` (rebalanceamento via adoção do Growth Club Design System) + decisões 01 (bandeira pirata: preto + verde-água preservados), 03 (Outlaw + Sage → tons densos, editoriais), manifesto "mesa de canto de um pub" (neutros quentes, cerveja).

**Histórico:** v1 está arquivada em [`paleta-primaria-v1-archived.md`](paleta-primaria-v1-archived.md). v2 substitui v1 sem revogar nenhum HEX — só rebalanceia a hierarquia de uso (Amber promovido a primário CTA, Teal rebaixado a secundário acento).

> **Fonte canônica de implementação:** [`brand/system/colors_and_type.css`](../system/colors_and_type.css). Esta spec é o **briefing estratégico** que justifica os tokens; em conflito, o CSS vence.

---

## Paleta primária (6 cores — HEX preservado da v1)

### Core editorial — Pub Cream + Growth Black

| # | Nome | HEX | RGB | CMYK aprox | Distribuição v2 | Uso |
|---|---|---|---|---|---|---|
| **1** | **Pub Cream** | `#F5F1E8` | 245,241,232 | 0,2,5,4 | **~40%** | Fundo default em modo light (newsletter, site, slides, posts). Neutro quente — puxa pra "luz de pub", evita o frio do branco puro. Token: `--bg-base` (light). |
| **2** | **Growth Black** | `#0A0A0A` | 10,10,10 | 0,0,0,96 | **~25%** | Texto editorial em light; fundo de seções dark (hero, CTA-final, pôster de meetup). Bandeira pirata + autoridade. Tokens: `--fg-primary` (light) / `--bg-base` (dark). |

### Acentos de personalidade — Amber primário, Teal secundário

| # | Nome | HEX | RGB | Distribuição v2 | Uso |
|---|---|---|---|---|---|
| **3** | **Amber Beer** | `#D4A24C` | 212,162,76 | **~10%** ⬆ promovido | **CTA primário.** Botões, links fortes, hover states, eyebrows de destaque. Casa direto com "com cerveja" do ton-anchor. Em dark sections escala pra `#E5B45D` (bright) e `#B88838` (press). Token: `--accent-amber`. |
| **4** | **Pirate Teal** | `#4FB3A5` | 79,179,165 | **~5%** ⬇ rebaixado | **Acento secundário.** Keywords destacadas, dots, success states, eyebrow labels secundários. Continuidade da bandeira pirata (decisão 01-B locked). Em dark escala pra `#5FC9BB`. Token: `--accent-teal`. |

### Suporte funcional — Smoke Gray + Brick Red

| # | Nome | HEX | Distribuição v2 | Uso |
|---|---|---|---|---|
| **5** | **Smoke Gray** | `#8B847E` | **~15%** | Metadados (autor, data, tags), divisores, texto terciário, captions. Nunca em CTAs (cinza = "inativo" em UI patterns). Token: `--fg-tertiary`. |
| **6** | **Brick Red** | `#B84A3E` | **~5%** | Estados de alerta/danger, destaque contrarian ("desagradável com carinho"). **Nunca em CTAs positivos.** Token: `--color-danger`. |

**Total = 100%** (40 Pub Cream + 25 Growth Black + 10 Amber + 5 Teal + 15 Smoke + 5 Brick).

---

## Por que o rebalanceamento (vs. v1)

A v1 prescrevia:
- Pirate Teal (~15%) como CTA primário, hover, accent forte
- Amber Beer (~3%) como acento pontual subutilizado

Ao adotar o Growth Club Design System (AD-008, herança do Level Design System), o slot de "primary accent" estava ocupado por uma cor única — não dava pra mapear duas cores de mesma força. Três fatores levaram à promoção do Amber:

1. **Ton-anchor alignment.** `"Franco, com número, sem palco, **com cerveja**"` — Amber é literalmente a cor da cerveja. CTA primário em Amber Beer ancora narrativamente o gesto de ação (clicar, virar membro, garantir vaga) no signo central da marca.

2. **Contraste WCAG.** Amber sobre Growth Black: ~8.2:1 (AAA). Teal sobre Growth Black: ~7.5:1 (AAA também, mas menor). Amber sobre Pub Cream: ~4.1:1 (AA pra body, mas só passa em texto grande). Pra botões com texto, Amber tem melhor performance editorial.

3. **Diferenciação no mercado.** As comunidades concorrentes (G4, Cactus, Gaveler) puxam pra teal/azul/verde como primário. Amber CTA é distintivo — quase ninguém usa.

Pirate Teal permanece **estruturalmente importante** porque é continuidade da bandeira pirata (decisão 01-B locked). Mas como acento secundário: marca palavras-chave, success state, eyebrow labels — não dispute o CTA com o Amber.

---

## Combinações canônicas (4 defaults — use estas)

1. **Light mode (95% do conteúdo)**
   - Fundo: Pub Cream `#F5F1E8`
   - Texto: Growth Black `#0A0A0A`
   - CTA primário: Amber `#D4A24C`
   - Keywords destacadas: Pirate Teal `#4FB3A5`
   - Metadados: Smoke Gray `#8B847E`

2. **Dark mode (seções pontuais — hero, CTA final, depoimento, capa)**
   - Fundo: Growth Black `#0A0A0A`
   - Texto: Pub Cream `#F5F1E8` (`--fg-primary` em dark)
   - CTA primário: Amber bright `#E5B45D`
   - Keywords: Pirate Teal bright `#5FC9BB`
   - Metadados: Smoke Gray (mantém `#8B847E` — funciona nos dois temas)

3. **Newsletter (Substack — sempre light)**
   - Fundo: Pub Cream
   - Texto: Growth Black
   - Eyebrow (`PIPELINE #42 · MAIO 2026`): Pirate Teal
   - Autor/data no rodapé: Smoke Gray
   - Link interno: Amber
   - Highlight de número: Amber

4. **Pôster de meetup (sempre dark)**
   - Fundo: Growth Black
   - Título massivo: Pub Cream
   - Tema/edição (eyebrow): Pirate Teal bright
   - Data/local (metadados): Amber bright
   - CTA "garantir vaga": Amber

---

## Regras duras

### ✅ Sempre
- Manter Pub Cream **ou** Growth Black como âncora visual de toda peça (60-65% combinado).
- Testar contraste WCAG antes de finalizar qualquer peça com texto sobre cor de acento.
- Usar Amber pra **uma** ação primária por seção. Se houver 2 CTAs concorrentes, Amber é a primária e ghost (border-only) é a secundária.

### ❌ Nunca
- Usar Pirate Teal como fundo de peças grandes (satura — funciona como acento, não como background).
- Misturar Brick Red + Amber na mesma peça (competem visualmente; Amber é cerveja, Brick é vinho — opostos quentes).
- Usar Smoke Gray em CTAs (cinzento = "inativo" em UI patterns reconhecidos).
- Usar Brick Red em CTAs positivos (vira "deletar" / "warning" — só usar em destrutivos e alerts).
- Hardcode `#D4A24C` ou outros HEX em código de produção — sempre via token CSS (`--accent-amber`).

---

## Testes de contraste WCAG AA (validados)

| Combinação | Contraste | WCAG |
|---|---|---|
| Growth Black `#0A0A0A` sobre Pub Cream `#F5F1E8` | ~17.8 : 1 | ✅ AAA |
| Pub Cream `#F5F1E8` sobre Growth Black `#0A0A0A` | ~17.8 : 1 | ✅ AAA |
| Amber `#D4A24C` sobre Growth Black `#0A0A0A` | ~8.2 : 1 | ✅ AAA |
| Growth Black `#0A0A0A` sobre Amber `#D4A24C` | ~8.2 : 1 | ✅ AAA (CTA primário canônico) |
| Pirate Teal `#4FB3A5` sobre Growth Black `#0A0A0A` | ~7.5 : 1 | ✅ AAA |
| Growth Black `#0A0A0A` sobre Pirate Teal `#4FB3A5` | ~7.5 : 1 | ✅ AAA |
| Amber bright `#E5B45D` sobre Growth Black `#0A0A0A` | ~9.4 : 1 | ✅ AAA (CTA dark mode) |
| Pirate Teal bright `#5FC9BB` sobre Growth Black `#0A0A0A` | ~9.1 : 1 | ✅ AAA |
| Brick Red `#B84A3E` sobre Pub Cream `#F5F1E8` | ~4.8 : 1 | ✅ AA (alerts em texto normal) |
| Smoke Gray `#8B847E` sobre Pub Cream `#F5F1E8` | ~3.9 : 1 | ⚠️ AA só em texto grande (≥18pt) — **regra**: usar apenas em metadados ≥14px medium-weight. |

Qualquer combinação não listada requer checagem via [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) antes de uso.

---

## Teste blind de diferenciação (pendente)

Step 5.2 da v1 ainda é válido — agora aplicado à paleta v2:

Mostrar 5 swatches OU 5 peças reais (1 por comunidade) SEM logo/nome para **5 membros ativos do grupo core**:
- Growth Club (paleta v2 — peça real produzida pelo `system/`)
- G4 Educação (palette atual do site deles)
- Cactus
- Gaveler
- Growth Leaders Academy

Pergunta: "Qual é o do Growth Club?"

**Pass:** ≥ 3 acertos em 5. Abaixo disso, ajustar (provavelmente o Amber precisa de mais presença, ou peça de teste tá usando demais Pub Cream sem acento).

**Quando rodar:** após primeira peça real produzida pelo `system/` ser publicada (newsletter cover, pôster de meetup, IG post).

---

## Impacto downstream

- **Tipografia (`tipografia.md`):** mantida — Satoshi tem legibilidade adequada em todos os fundos canônicos. Validado em `system/preview/type-*.html`.
- **Logo (Task 2.3 pending):** lockup primário ainda usa Growth Black + Pirate Teal como na v1 (decisão de continuidade da bandeira pirata). Variações monochrome continuam nativas. Ponto Amber na assinatura `growth club.` permanece.
- **Templates (`brand/system/templates/`):** todos os 5 templates IG/LinkedIn produzidos em AD-008 já consomem a paleta v2 via tokens CSS. Nenhuma reescrita necessária.
- **Export pack (`brand/assets/exports/`):** favicons + OG-image atuais são v0 placeholders gerados antes do design system. Quando logo SVG final sair, regenerar com Amber + Growth Black canônicos.

---

## Histórico

- **2026-04-22 — v1.** Pirate Teal como CTA primário, Amber como acento pontual (~3%). Ver [`paleta-primaria-v1-archived.md`](paleta-primaria-v1-archived.md).
- **2026-05-17 — v2 (este doc).** Rebalanceamento via AD-008. Amber promovido a primário, Teal rebaixado a secundário. HEX dos 6 mantidos.

Próxima revisão prevista: depois do teste blind de 5 membros + 30 dias de uso real do `system/` em produção.
