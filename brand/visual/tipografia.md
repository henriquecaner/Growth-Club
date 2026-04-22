# Tipografia v1

**Task:** 2.2 do plano `docs/superpowers/plans/2026-04-22-growth-club-brand-brief.md`
**Ancoragem:** decisão 03 (Outlaw primário → tipografia pesada com atitude; Sage secundário → legibilidade editorial no body)

> **Status:** proposta v1 pronta pra revisão no Figma.

---

## Decisão

### Heading: **Archivo Black** (Google Fonts, gratuita)

Por quê:
- Sans-serif condensada, peso 900 — Outlaw puro
- Altura de x grande, boa em tamanhos gigantes (pôster A3+, hero de site)
- Compatível web + print
- Grátis (SIL Open Font License)
- Fallback web-safe óbvio: `'Archivo Black', 'Arial Black', sans-serif`

**Variantes em uso:**
- Heading 1 (hero): 56-80px desktop / 40-48px mobile, tracking -1%, line-height 1.0
- Heading 2 (sections): 36-48px desktop / 28-32px mobile, tracking -0.5%, line-height 1.1
- Heading 3 (sub-sections): 24-32px desktop / 20-24px mobile, tracking -0.25%, line-height 1.2

### Body: **Inter** (Google Fonts, gratuita)

Por quê:
- Sans-serif neutra, desenhada por Rasmus Andersson especificamente para UI
- Altíssima legibilidade em 14-18px
- Tem numerais tabulares — importante para tabelas de benchmark (§3.2 Sage)
- Peso variável completo (100-900)
- Complementa Archivo Black sem competir
- Fallback: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Variantes em uso:**
- Body base: 16px desktop / 15px mobile, weight 400, line-height 1.6
- Body large (intros): 18-20px, weight 400, line-height 1.5
- Small / meta (autor, data, tags): 13-14px, weight 500, color Smoke Gray, letter-spacing +0.5%
- Caption: 12px, weight 500, uppercase, letter-spacing +1%

### Tipografia de ênfase opcional: **JetBrains Mono** (Google Fonts, gratuita)

Quando usar: códigos, stacks, menções de ferramentas (n8n, Clay, Cursor), valores numéricos que merecem destaque técnico. **Tech-first atrelado a outcome** — evitar abuso.

Ex: `CAC caiu de R$ 420 para R$ 180` com os valores em JetBrains Mono.

---

## Escala modular (1.250 — ratio "major third")

Base: 16px. Cada step multiplica/divide por 1.25.

| Token | Tamanho | Uso |
|---|---|---|
| `text-xs` | 12px | Caption, labels |
| `text-sm` | 14px | Meta, metadados |
| `text-base` | 16px | Body padrão |
| `text-lg` | 20px | Body em intros, body large |
| `text-xl` | 25px | H4 |
| `text-2xl` | 32px | H3 |
| `text-3xl` | 40px | H2 |
| `text-4xl` | 50px | H1 mobile |
| `text-5xl` | 63px | H1 desktop |
| `text-6xl` | 80px | Hero grande, pôster de meetup |

Mesmos tokens entram em `brand/templates/site/design-tokens.md` (Task 4.3) pra passagem direta pra fase Site.

---

## Regras de aplicação

### Regras duras

- ❌ **Nunca** usar Archivo Black em body text (ilegível abaixo de 18px)
- ❌ **Nunca** usar Inter peso 900 (Archivo Black ocupa essa hierarquia)
- ❌ **Nunca** mais de 3 tamanhos de tipografia numa única peça (hero + 1 sub + 1 body)
- ❌ **Nunca** misturar serif de terceiros (ex: Georgia) — Archivo Black + Inter cobrem 100% dos casos v1
- ✅ **Sempre** usar Inter weight 500 para metadados (autor, data, tags) — nunca 400
- ✅ **Sempre** tracking negativo em Archivo Black (≥ -0.25%) — sem isso fica amontoado

### Letter-spacing (kerning)

| Contexto | Tracking |
|---|---|
| Archivo Black em hero | -1% |
| Archivo Black em sections | -0.5% |
| Inter body | 0 (default) |
| Caption uppercase | +1% |

### Regra "hierarquia clara" (do Sage)

Em qualquer peça, o leitor deve entender em < 3 segundos:
1. Sobre o quê é? (heading)
2. Por quê me interessa? (sub/intro)
3. O que eu faço? (CTA)

Se essa hierarquia não estiver óbvia, reescala a tipografia antes de mudar qualquer outra coisa.

---

## Como instalar / usar

### Web (site + newsletter)

Google Fonts → incluir no `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Design (Figma, Keynote, Illustrator)

Instalar localmente via https://fonts.google.com → Download → adicionar ao Font Book (macOS) / Windows Font Manager.

### Email marketing

Archivo Black frequentemente falha em clientes de email (Outlook especialmente). **Usar Arial Black como fallback** declarado:

```css
font-family: 'Archivo Black', 'Arial Black', Impact, sans-serif;
```

---

## Testes de legibilidade obrigatórios

Antes de travar:

1. **Body em mobile:** abrir em iPhone SE (telas pequenas). Inter 15px + line-height 1.6 precisa ser confortável.
2. **Hero em pôster impresso:** exportar mockup de pôster A3. Archivo Black 80px precisa legível a 2m de distância.
3. **Meta em light mode:** Inter 13px + cor Smoke Gray sobre Pub Cream — testar em laptop + mobile.
4. **Combinação heading + body:** fazer 1 parágrafo de exemplo e pedir pra 3 pessoas lerem. Se pararam pra decifrar hierarquia, ajustar.

---

## Impacto downstream

- **Task 2.3 (logo):** wordmark do Growth Club usa Archivo Black (ou variante custom derivada). Lockup assinala a tipografia.
- **Task 4.1-4.3 (templates):** todos templates consomem esta escala. Design tokens de Task 4.3 exportam esta escala como CSS/Figma variables.
- **Task 3.1 (manifesto):** manifesto publicado usa Inter body large (20px) — não Archivo Black no corpo. Hero do manifesto pode usar Archivo Black.
- **Fase Site:** tipografia escolhida aqui é **locked**. Site consome, não reopen decision.
