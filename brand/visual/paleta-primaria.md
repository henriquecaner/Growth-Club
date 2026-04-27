# Paleta primária v1

**Task:** 2.1 do plano `docs/superpowers/plans/2026-04-22-growth-club-brand-brief.md`
**Ancoragem:** decisões 01 (bandeira pirata: preto + verde-água preservados), 03 (Outlaw + Sage → tons densos, editoriais, evitar pastel/neon/pink), manifesto "mesa de canto do pub" (neutros quentes, cerveja)

> **Status:** proposta v1 pronta pra você revisar no Figma e passar no teste blind de 5 membros (Task 2.1 Step 5.2). Valores HEX são pontos de partida — ajustar fino é esperado.

---

## Paleta primária (6 cores)

### Core — Preto + Verde-água (continuidade com bandeira pirata)

| # | Nome | HEX | RGB | CMYK aprox | Uso |
|---|---|---|---|---|---|
| **1** | **Growth Black** | `#0A0A0A` | 10,10,10 | 0,0,0,96 | Fundo autoridade. Bandeira pirata. Textos em peças dark. Peso editorial. Usar em ~30% das peças. |
| **2** | **Pirate Teal** | `#4FB3A5` | 79,179,165 | 66,0,36,12 | Continuidade da bandeira atual. Call-to-actions primários, acentos de destaque, hover states. Usar em ~15%. |

> ⚠️ **Ação do Henrique:** confirmar `#4FB3A5` samplando o verde-água exato da bandeira pirata atual via eyedropper. Ajustar se o valor real diferir mais que 5%.

### Neutros quentes — "mesa do pub"

| # | Nome | HEX | RGB | CMYK aprox | Uso |
|---|---|---|---|---|---|
| **3** | **Pub Cream** | `#F5F1E8` | 245,241,232 | 0,2,5,4 | Fundo default de peças light (site, newsletter, slides). Evita o frio do branco puro — puxa pra "luz de pub". Usar em ~40%. |
| **4** | **Smoke Gray** | `#8B847E` | 139,132,126 | 0,5,9,45 | Textos secundários, divisores, metadados (data, autor, tags). Usar em ~10%. |

### Acentos — personalidade

| # | Nome | HEX | RGB | CMYK aprox | Uso |
|---|---|---|---|---|---|
| **5** | **Amber Beer** | `#D4A24C` | 212,162,76 | 0,24,64,17 | Acento de cerveja/calor. Highlight pontual, badges (ex: "Founder Member"), ícones de destaque. Usar em ~3%. |
| **6** | **Brick Red** | `#B84A3E` | 184,74,62 | 0,60,66,28 | Estados de alerta, warning, destaque contrarian ("desagradável com carinho"). Nunca em CTAs positivos. Usar em ~2%. |

---

## Testes de contraste WCAG AA (obrigatório)

| Combinação | Contraste | WCAG |
|---|---|---|
| Growth Black `#0A0A0A` sobre Pub Cream `#F5F1E8` | ~17.8 : 1 | ✅ AAA (texto normal + grande) |
| Pub Cream `#F5F1E8` sobre Growth Black `#0A0A0A` | ~17.8 : 1 | ✅ AAA |
| Pirate Teal `#4FB3A5` sobre Growth Black `#0A0A0A` | ~7.5 : 1 | ✅ AAA (texto normal) |
| Growth Black `#0A0A0A` sobre Pirate Teal `#4FB3A5` | ~7.5 : 1 | ✅ AAA |
| Smoke Gray `#8B847E` sobre Pub Cream `#F5F1E8` | ~3.9 : 1 | ✅ AA (texto grande) / ⚠️ falha em texto normal — usar apenas em ≥18pt |
| Amber Beer `#D4A24C` sobre Growth Black `#0A0A0A` | ~8.2 : 1 | ✅ AAA |
| Brick Red `#B84A3E` sobre Pub Cream `#F5F1E8` | ~4.8 : 1 | ✅ AA |

**Regra:** qualquer combinação texto/fundo não listada aqui requer checagem antes de usar. Ferramenta: WebAIM Contrast Checker ou plugin Figma "Stark".

---

## Regras de aplicação

### Distribuição 60/30/10

- **60% neutros** (Pub Cream em peças light, Growth Black em peças dark)
- **30% peso estrutural** (Growth Black ou Pub Cream — o "oposto" do fundo)
- **10% cor** (Pirate Teal dominante + Amber Beer/Brick Red pontuais)

### Regras duras

- ❌ **Nunca** usar Pirate Teal como fundo de peças grandes (satura)
- ❌ **Nunca** misturar Brick Red + Amber Beer na mesma peça (competem visualmente)
- ❌ **Nunca** usar Smoke Gray em CTAs (cinzento = "inativo" em UI patterns)
- ✅ **Sempre** testar contraste antes de finalizar qualquer peça com texto
- ✅ **Sempre** manter Growth Black ou Pub Cream como âncora visual de toda peça

### Combinações canônicas (use essas 4 como default)

1. **Dark mode:** fundo Growth Black + texto Pub Cream + acento Pirate Teal
2. **Light mode:** fundo Pub Cream + texto Growth Black + acento Pirate Teal
3. **Newsletter:** fundo Pub Cream + texto Growth Black + autor/data em Smoke Gray
4. **Pôster de meetup:** fundo Growth Black + título em Pirate Teal ou Pub Cream + metadados em Amber Beer

---

## Teste obrigatório (Task 2.1 Step 5.2)

**Teste blind de diferenciação** — antes de travar esta paleta:

Mostrar 5 swatches SEM logo/nome para **5 membros ativos do grupo core**:
- Growth Club (esta paleta)
- G4 Educação (palette atual do site deles)
- Cactus (palette atual)
- Gaveler (palette atual)
- Growth Leaders Academy (palette atual)

Pedir pra identificarem qual é o do Growth Club.

**Pass:** ≥ 3 acertos em 5. Abaixo disso, ajustar (provavelmente o Pirate Teal precisa ficar mais saturado ou o Amber Beer precisa ter mais presença na peça de teste).

---

## Impacto downstream

- **Task 2.2 (tipografia):** tipografia escolhida precisa manter legibilidade em Pub Cream (~17:1) E Growth Black. Pesos pesados ok em ambos.
- **Task 2.3 (logo):** lockup primário usa Growth Black + Pirate Teal. Variações monochrome já estão nativas.
- **Task 4.x (templates):** cada template deve usar uma das 4 combinações canônicas (sem inventar novas na v1).
- **Task 5.3 (export pack):** favicons em 2 versões — dark (Growth Black) e light (Pub Cream).
