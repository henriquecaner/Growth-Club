# Master prompt — Logo Growth Club no Nano Banana Pro (Gemini Image)

**Uso:** Nano Banana Pro = modelo de geração de imagem do Google (Gemini 2.5/3 Image, "Pro" tier).
**Onde rodar:** `gemini.google.com` (toggle "Imagine") OU `aistudio.google.com` (modelo Nano Banana / Imagen Pro).
**Decisão de fluxo:** rodada anterior no Canva IA 1.0 falhou em 6+ critérios de aceite — ver `STATE.md` L-002 (a logar). Nano Banana Pro é tentativa 2.

**Ancoragem:**
- Decisão 01 (`brand/decisions/01-bandeira-pirata.md`) — caveira + 2 ossos + tapa-olho + fundo preto
- Decisão 03 (`brand/decisions/03-arquetipo-e-tom.md`) — Outlaw 60% + Sage 30-40%
- Visual: `brand/visual/logo-moodboard.md` (Direção 3 — Editorial / Emblem ⭐), `paleta-primaria.md`, `tipografia.md`

---

## 1. Contexto (briefing pra você — não cola no prompt)

| Atributo | Valor |
|---|---|
| Ferramenta | Nano Banana Pro / Gemini Image Pro |
| Modo | Texto-para-imagem **+ imagem de referência opcional** (anexar `pirate-flag-3.png`) |
| Limite de chars | ~5.000 (não é problema) |
| Aspect ratio recomendado | **1:1** (square) para o emblema isolado |
| Pontos fortes | Coerência visual, ilustração editorial, world knowledge (referências culturais) |
| Pontos fracos | Tipografia em curva ainda imperfeita, logos "limpos" minimalistas |
| **Estratégia recomendada** | **Gerar EMBLEMA SEM wordmark.** Fazer wordmark manualmente em Figma com Archivo Black depois |

---

## 2. Master prompt — Versão V1 (emblema isolado, sem wordmark) ⭐ RECOMENDADA

> **Por que sem wordmark:** todos modelos de difusão (incluindo Nano Banana) ainda erram tipografia específica. É 5x mais rápido tu compor wordmark manual em Figma do que esperar o modelo acertar `Archivo Black, tracking -1%`.
>
> **Como usar:** anexa `pirate-flag-3.png` como imagem de referência (botão de upload no Gemini/AI Studio), depois cola o prompt abaixo, depois define aspect ratio **1:1**.

```
Generate an editorial emblem logo for "Growth Club", a Brazilian B2B community
of senior growth operators. The brand archetype is Outlaw + Sage — contrarian,
anti-stage, evidence-based. Visual reference attached (pirate flag).

COMPOSITION: A circular emblem badge, centered, occupying ~80% of a square
canvas. Inside the emblem: a confidently drawn human skull wearing a black
eye-patch over the LEFT eye, with two crossbones forming an X behind the
skull. The skull is frontal, slightly stylized, NOT cartoon, NOT hyper-realistic.

STYLE: Bold woodcut linework meets editorial magazine emblem. Confident strokes
with controlled imperfection — like a high-end craft beer label or a Monocle
magazine sectional emblem. Inspiration: Dogma craft beer (Brazil), third-wave
coffee branding (Onyx, Heart Coffee), Stevenson "Treasure Island" book cover
woodcuts, vintage whiskey bottle crests. NOT generic tech minimalism, NOT
sports team mascot, NOT cartoon pirate.

EMBLEM FRAME: Circular outer ring, thin double-line border, with subtle dot
or tick-mark detailing around the inner perimeter (like a beer coaster).
NO text on the ring — keep the ring clean.

COLORS: Strict 3-color palette only:
- Primary silhouette (skull + bones + frame): solid black, exactly #0A0A0A
- Background fill of the emblem badge: warm teal green, exactly #4FB3A5
- Outer canvas background: warm cream, exactly #F5F1E8 (NOT pure white)

DETAILING: The eye-patch is THE distinctive asset — make it slightly tilted
at a diagonal angle, with a visible thin strap crossing the skull. Bones
behind the skull are slightly oversized and confidently rendered.

CONSTRAINTS — STRICTLY AVOID:
- No text, no letters, no numerals, no wordmark
- No gradients, no drop shadows, no glow, no chrome, no metallic effects
- No 3D rendering, no photorealism, no rendered lighting
- No neon, no pink, no pastel, no purple
- No grunge texture overload, no excessive distress
- No cartoon style, no children-friendly aesthetic
- No generic skull-and-crossbones clip-art look

FINAL VIBE: A logo a 35-year-old senior growth operator in São Paulo would
tattoo on their forearm. Confident, contrarian, editorial, never cute.

Output: 1:1 square, high resolution, isolated emblem on cream background,
ready for use as a brand mark.
```

**Caracteres:** ~2.300 (cabe folgado).

---

## 2.5. Master prompt — Versão V2 (correção pós-output #1, 2026-04-27)

> **Por que V2:** primeiro output do V1 errou em 5 critérios — verde dominante (deveria ser acento), skull cute (não editorial), tapa-olho genérico (não distintivo), borda pontilhada com leitura "NFT/moeda cripto", ossos sem hierarquia. Ver imagem em `brand/visual/iteracao-2-nano-banana/output-01-rejected.png` (a salvar).
>
> **Mudanças críticas vs V1:**
> 1. **Paleta invertida** — fundo PRETO domina, skull em CREAM, teal vira acento de 5-10% (era 80%)
> 2. **Skull editorial obrigatório** — bone structure visível, expressão lateral, nunca frontal cute
> 3. **Tapa-olho integrado aos ossos** — um dos ossos atravessa o tapa-olho diagonalmente (Variante B do §3.2 promovida a default)
> 4. **Borda continua, não pontilhada** — evita leitura coin/NFT/medallion
> 5. **Banimentos novos explícitos** — coin aesthetic, NFT PFP, crypto token, medallion logo

```
Generate an editorial emblem logo for "Growth Club", a Brazilian B2B community
of senior growth operators. Brand archetype: Outlaw + Sage — contrarian,
anti-stage, evidence-based. Tone-anchor: "Frank, with numbers, no stage, with
beer." This is NOT a cute pirate, NOT a tech startup, NOT a crypto project.

COMPOSITION: A circular emblem badge centered on canvas. Inside the emblem:
a confidently illustrated human skull, slightly tilted 5-10 degrees to the
viewer's right, wearing a black eye-patch over the LEFT eye. Two crossbones
form an X behind the skull. CRITICAL: one of the bones diagonally crosses
THROUGH the eye-patch — the eye-patch and bones are visually integrated,
not separate elements. The strap of the eye-patch is visible across the
skull's brow.

STYLE: Bold woodcut linework — like a 1920s letterpress print, a craft beer
label from Brazilian breweries Dogma or 2Cabeças, or a chapter heading
woodcut from a 19th-century Stevenson novel. Confident chisel-like strokes,
controlled imperfection, visible texture in linework but NOT noisy. Skull
must show clear bone structure (cheekbones, brow ridge, jaw definition) —
NOT cartoon, NOT smiling, NOT cute, NOT children's book pirate.

EMBLEM FRAME: Circular outer frame, double thin continuous lines (NOT dotted,
NOT pointillated, NOT tick-marked). Between the two lines: a thin band of
flat color. NO dots, NO ticks, NO coin-like edge detailing. The frame should
read as "editorial magazine emblem" or "vintage book seal", NEVER as "coin"
or "medallion" or "token".

COLORS: Strict 3-color palette, in this exact distribution:
- BACKGROUND of the emblem (inside the frame): solid black, exactly #0A0A0A
  — this dominates ~70% of the emblem area
- SKULL + BONES + FRAME LINES: warm cream, exactly #F5F1E8 — appears as
  cream-on-black, like chalk on a blackboard
- ACCENT (use sparingly, only ONE of these targets): teal green #4FB3A5 ONLY
  inside the eye-patch as a single highlight detail, OR as the inner band
  between the double frame lines — pick ONE, not both. Teal occupies max 8%
  of the emblem.
- Outer canvas (outside the circular emblem): warm cream #F5F1E8

DETAILING: The eye-patch is THE distinctive asset of this brand. Make it
slightly oversized, tilted at a 15-20 degree diagonal, with a visible strap
crossing the skull. The bone passing through the patch should clearly
overlap it (one bone in front, one behind). Bones are confidently rendered,
slightly thicker than the skull outline, with visible joint detail.

CONSTRAINTS — STRICTLY AVOID:
- NO coin appearance, NO medallion look, NO crypto token aesthetic, NO NFT
  profile-picture style — this is a brand emblem, not a collectible
- NO dotted borders, NO tick-mark borders, NO pointillated frames
- NO text, no letters, no numerals, no wordmark anywhere
- NO gradients, NO drop shadows, NO glow, NO chrome, NO metallic effects
- NO 3D rendering, NO photorealism, NO rendered lighting
- NO neon, NO pink, NO pastel, NO purple, NO mint green, NO teal-dominant
  background (teal is ACCENT only, max 8%)
- NO grunge texture overload, NO excessive distress
- NO cartoon style, NO smiling skull, NO Disney pirate, NO children-book
  aesthetic, NO sports team mascot
- NO frontal symmetric skull pose — must have slight tilt for character
- NO generic skull-and-crossbones clip-art look

FINAL VIBE: A logo a 35-year-old senior growth operator in São Paulo would
tattoo on their forearm. Confident, contrarian, editorial, weighty, never
cute. Imagine it embossed on a leather notebook cover, or printed on a
craft beer can label.

Output: 1:1 square, high resolution, isolated emblem on cream background,
ready for use as a brand mark.
```

**Caracteres:** ~3.350 (cabe folgado no limite de ~5.000).

### Critérios de aceite específicos do V2

Antes de levar pro Figma, este output precisa passar:

- [ ] **Fundo do emblema é PRETO** (não teal, não cream)
- [ ] **Skull aparece em cream/off-white sobre preto** (efeito "giz na lousa")
- [ ] **Teal aparece em ≤ 10% da área**, idealmente só no tapa-olho ou na borda dupla
- [ ] **Borda é contínua dupla**, sem pontos/ticks/perfurações
- [ ] **Um osso visivelmente atravessa o tapa-olho**, não são elementos separados
- [ ] Skull tem **estrutura óssea visível** (maçã do rosto, arcada superciliar, mandíbula)
- [ ] Skull **não está sorrindo** e **não está totalmente frontal** (5-10° de inclinação)
- [ ] Não parece moeda, NFT, token, escudo de time, mascote

Se 7+ passarem → Figma pra vetorização.
Se 4-6 → ajustar 1 dos parâmetros (geralmente paleta) e regerar.
Se ≤3 → ir direto pro Caminho C (Figma + Iconify), abandonar IA generativa.

### Refinos conversacionais sugeridos pós-V2

Em vez de regerar, refinar via chat:

1. `Make the skull tilt slightly more — closer to 15 degrees right`
2. `The bone crossing through the eye-patch needs to overlap it more clearly — make the overlap obvious`
3. `Reduce the teal accent to only the inner band of the double frame, remove from the eye-patch`
4. `Make the woodcut texture more visible in the bones — add subtle chisel lines`
5. `Skull cheekbones need more definition — add subtle shading lines`

---

## 3. Variações pra rodar em série (1 por vez, 4 outputs cada)

Depois da V1 base, modifique apenas o trecho indicado e regere para gerar variações **comparáveis**. Mantém o resto do prompt intacto.

### 3.1 Variação de MOLDURA — substitua o §EMBLEM FRAME

**Variante A — clássica (default)**
> `Circular outer ring, thin double-line border, with subtle dot or tick-mark detailing around the inner perimeter`

**Variante B — escudo / crest**
> `Heraldic shield-shaped frame replacing the circle, slightly pointed at the bottom, the bones extending just past the shield outline. More vertical proportion.`

**Variante C — hexagonal moderno**
> `Hexagonal outer frame replacing the circle, oriented flat-top, slight 3-degree counter-clockwise tilt for energy. Modern craft brand feel.`

**Variante D — sem moldura (símbolo solto)**
> `NO frame at all. Free-standing skull with crossbones and eye-patch, isolated on the cream background, ready to drop into any container later.`

### 3.2 Variação de TAPA-OLHO (asset distintivo) — substitua o §DETAILING

**Variante A — diagonal (default)**
> `eye-patch slightly tilted at a diagonal angle, thin visible strap crossing the skull`

**Variante B — bones-cross-the-patch**
> `the X of the crossbones passes diagonally THROUGH the eye-patch, integrating the two iconic elements into one visual`

**Variante C — X-stitched patch**
> `eye-patch with a small visible X stitched onto its surface, like a hand-mended sail`

**Variante D — patch-as-shape**
> `the eye-patch is exaggeratedly large, almost dominating half the skull, abstract shape rather than realistic`

### 3.3 Variação de ESTILO (intensidade do woodcut)

**Variante A — refined (default)**
> `Bold woodcut linework meets editorial magazine emblem. Confident strokes with controlled imperfection`

**Variante B — heavier woodcut (mais Outlaw)**
> `Aggressive woodcut, visible chisel marks, slightly rough edges, like a 1920s punk concert poster or a craft beer label printed on textured paper`

**Variante C — cleaner editorial (mais Sage)**
> `Refined editorial linework, clean confident strokes, very subtle imperfection, more Monocle magazine emblem than punk poster`

---

## 4. Fluxo conversacional — vantagem do Nano Banana Pro

> **Não regere do zero quando 1 output está 70% bom.** Use o chat pra refinar:

Após receber 1 output decente:

1. `Refine: keep everything but make the eye-patch larger and tilted 20 degrees more`
2. `Now darken the teal background — closer to deep ocean teal, less mint`
3. `Replace the dot detailing on the inner ring with tiny stars`
4. `Make the bones thicker and more confidently drawn`
5. `Final: render in higher resolution, keep all design choices identical`

Cada iteração é mais barata e mais previsível que regerar do zero. **Use o chat como editor de polígono em camadas.**

---

## 5. Versão V2 — com wordmark (OPCIONAL, alta probabilidade de falhar)

> ⚠️ **Use APENAS depois de já ter um emblema bom da V1.** Se tentar V2 do zero, provavelmente o wordmark sai com fonte errada ou texto distorcido.

Adicione ao final do prompt V1:

```
INCLUDE WORDMARK: Below the emblem, centered, in a heavy condensed
sans-serif font (similar to Archivo Black or Helvetica Inserat), the
exact text "GROWTH CLUB" in all caps, tight letter spacing, color
matching the emblem silhouette (#0A0A0A). The wordmark width should
match approximately 90% of the emblem diameter. Spacing between
emblem and wordmark equals half the height of the wordmark letters.
The text "GROWTH CLUB" must be spelled exactly correctly with no
typos, no letter substitution, no curved baseline.
```

**Probabilidade honesta de o wordmark sair correto:** ~40%.
**Plano B se sair errado:** salva o emblema, joga no Figma, escreve "Growth Club" manualmente em Archivo Black.

---

## 6. Critérios de aceite (mesmos do `canva-logo-prompt.md` §7)

Antes de declarar "vou levar pro Figma":

- [ ] Tapa-olho claramente visível, posicionado distintivamente
- [ ] Pirate Teal `#4FB3A5` aparece (mesmo que tom próximo, não exato)
- [ ] Cream background `#F5F1E8` (warm, não branco puro)
- [ ] Caveira tem **caráter editorial** (não cartoon, não foto, não stock)
- [ ] Linework consistente — bones, skull e frame na mesma "espessura conceitual"
- [ ] Sem texto curvo no anel
- [ ] Sem 3D, gradiente, glow, chrome
- [ ] Output em resolução ≥ 1024×1024
- [ ] Funciona quando reduzido a 64×64 (teste mental: ainda dá pra reconhecer?)
- [ ] **Nem um pouco** parece logo de equipe esportiva ou clip-art genérico

Se 7+ checks passarem → leva pro Figma pra refinamento de vetor.
Se 4-6 → tenta variação de prompt mais 1 rodada.
Se ≤3 → abandonar Nano Banana e ir direto pro Caminho C (Figma + Iconify).

---

## 7. Próximos passos pós-output

Quando tiver 2-3 outputs aceitáveis:

1. **Não exporte como SVG do Nano Banana** — ele entrega PNG raster. SVG dele é traçamento automático grosseiro.
2. **Salve PNG @4x** (3000×3000+) → `brand/visual/iteracao-2-nano-banana/output-N.png`
3. **Levar pro Figma** — usar o PNG como camada de referência (50% opacidade) e redesenhar em vetor por cima com Pen tool. Iconify plugin acelera o skull base.
4. **Ou alternativa:** se o output Nano Banana é muito bom, tentar tracejar com **Vectorizer.AI** ou **Adobe Illustrator Image Trace** — mas review manual é obrigatório
5. **Lockup final** (emblema + wordmark Archivo Black) montado em Figma, não no Nano Banana

---

## 8. Quando ficar de olho

- Nano Banana Pro tende a **adicionar textura fotográfica** se não negar explicitamente — checar se o output tem "ruído" indesejado
- Tende a **desviar do HEX exato** em ~10-15% — ajustar manualmente no editor depois
- Tende a colocar **palavras "growth" ou "club" pequenas** mesmo quando você diz "no text" — checar cantos/anel pra texto fantasma
- Quando acerta, **tende a acertar muito bem** — a primeira rodada já dá indicação clara

---

## 9. Referência cruzada

- Se Nano Banana Pro também falhar → Caminho C (Figma + Iconify) do diagnóstico anterior
- Próxima alternativa de modelo IA, em ordem: **Ideogram 2.0** (melhor pra texto/typography) → **DALL-E 3** (via ChatGPT Plus) → **Midjourney v6** (melhor estética craft, pior controle de paleta)
- Logar em `STATE.md`:
  - **L-002** se Canva IA 1.0 entregou outputs ruins (já confirmado em 2026-04-27)
  - **L-003** se Nano Banana Pro também entregar abaixo do critério → reforça pivot pro Figma
