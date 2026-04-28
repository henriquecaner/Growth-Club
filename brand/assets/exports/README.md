---
title: Export pack — Growth Club
status: v0-placeholder
source: ../decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png
last_updated: 2026-04-27
---

# Export pack v0 (placeholder)

> ⚠️ **Status:** todos os arquivos deste diretório são **placeholders v0** derivados da bandeira pirata atual ([../decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png](../decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png)). Serão substituídos quando o logo SVG final sair (Steps 1c-1e do Chunk 2 da marca, executados em Figma).

## Por que existem antes do logo final

O brand book v1 + o site `growthclub.pro` (Fase 1) precisam de favicons, OG-image e logos raster para funcionar. Esperar o logo SVG final atrasaria o handoff. Decisão: gerar os 10 assets agora a partir da bandeira atual, marcar como `v0-placeholder`, substituir depois.

## Conteúdo (10 arquivos)

| Arquivo | Dimensão | Uso |
|---|---|---|
| `favicon.ico` | multi-resolução (16+32) | Tab do browser |
| `favicon-16x16.png` | 16×16 | Tab pequeno |
| `favicon-32x32.png` | 32×32 | Tab padrão |
| `apple-touch-icon.png` | 180×180 | Tela inicial iOS |
| `android-chrome-192x192.png` | 192×192 | Tela inicial Android |
| `android-chrome-512x512.png` | 512×512 | PWA Android |
| `og-image.png` | 1200×630 | Open Graph (preview LinkedIn/Twitter/Facebook) |
| `logo@1x.png` | 256×256 | Email marketing onde SVG falha |
| `logo@2x.png` | 512×512 | Retina fallback |
| `logo@3x.png` | 768×768 | Hi-DPI fallback (upscale da fonte 512px — leve perda) |

## Como foram gerados

```bash
SRC=brand/decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png
OUT=brand/assets/exports

# Resizes quadrados via sips (built-in macOS)
sips -z 16 16    "$SRC" --out "$OUT/favicon-16x16.png"
sips -z 32 32    "$SRC" --out "$OUT/favicon-32x32.png"
sips -z 180 180  "$SRC" --out "$OUT/apple-touch-icon.png"
sips -z 192 192  "$SRC" --out "$OUT/android-chrome-192x192.png"
sips -z 512 512  "$SRC" --out "$OUT/android-chrome-512x512.png"
sips -z 256 256  "$SRC" --out "$OUT/logo@1x.png"
sips -z 512 512  "$SRC" --out "$OUT/logo@2x.png"
sips -z 768 768  "$SRC" --out "$OUT/logo@3x.png"

# OG-image: canvas 1200x630 Growth Black + bandeira centralizada
magick -size 1200x630 canvas:'#0A0A0A' \
       \( "$SRC" -resize 420x420 \) \
       -gravity center -composite \
       "$OUT/og-image.png"

# Favicon multi-resolução
magick "$OUT/favicon-16x16.png" "$OUT/favicon-32x32.png" "$OUT/favicon.ico"
```

## Limitações conhecidas (placeholder)

1. **`favicon-16x16.png` perde nitidez do tapa-olho.** Em 16px a bandeira atual fica como mancha. Quando o logo SVG final sair, gerar uma versão *simplificada* (só skull + eye-patch, sem ossos) específica pra esse tamanho.
2. **`logo@3x.png` (768px) é upscale.** A fonte é 512×512 — vai pixelizar levemente. O logo final em SVG vai escalar perfeito.
3. **OG-image é minimalista.** Só bandeira centralizada em fundo preto. Quando o logo final sair, considerar incluir a tagline "Growth de verdade. Stack de verdade. Sem teatro." em Archivo Black, ou variantes específicas (meetup, founder members).

## Quando substituir

Quando o logo SVG final estiver pronto:

1. Gerar SVG primário em `brand/assets/logo/growth-club-primary.svg`
2. Re-rodar os comandos acima trocando `$SRC` pelo SVG (via `magick` ou exportando do Figma)
3. Gerar variações: horizontal, vertical, icon-only, monochrome black, monochrome white
4. Atualizar o `brand-book.md` removendo o aviso de placeholder
5. Atualizar este README marcando `status: v1-final`
6. Registrar **ADR-003** em `.specs/project/STATE.md`: "logo final substituiu placeholder; assets atualizados"

## Verificação rápida

- [ ] Abrir `favicon-32x32.png` no Preview → bandeira identificável
- [ ] Abrir `og-image.png` → bandeira centralizada em fundo preto, padding ok
- [ ] Testar OG no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) quando o site estiver no ar
- [ ] Testar favicon no browser quando o site estiver no ar
