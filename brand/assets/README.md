# brand/assets/ — exports finais de produção

Slot pra **assets exportados em formato final** consumidos por canais externos (Substack, OG cards, favicons do site, ícones PWA). Difere de `brand/system/assets/` — que tem placeholders SVG do design system, ainda em construção.

| Pasta | Conteúdo | Quando usar |
|---|---|---|
| `brand/assets/exports/` | Favicons (ico, png 16/32/180/192/512), OG-image 1200×630, logo@1x/2x/3x PNG. **v0 placeholders** gerados a partir da bandeira pirata atual (`brand/decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png`). | Site `growthclub.pro` v1 (favicon, OG meta tags) + email marketing onde SVG falha. |
| `brand/system/assets/` | Logos SVG vetoriais usados pelo design system (`logo-black.svg`, `logo-white.svg`, `logo-mark.svg`, `logo-mark-white.svg`). **Placeholders textuais** "growth club." em Satoshi Black com ponto Amber, até logo final do Figma sair. | Implementação dos HTMLs em `system/preview/`, `system/templates/`, `system/ui_kits/`. |

## Quando substituir os exports atuais

Quando o logo SVG final for produzido (Task 2.3 do brand brief plan, executor: Founder Crew #2 no Figma), regenerar **ambas as pastas** a partir do mesmo vetor:

1. `brand/system/assets/logo-*.svg` — substituir placeholders SVG mantendo os 4 nomes de arquivo (zero refactor nos HTMLs do design system).
2. `brand/assets/exports/` — regenerar favicons + OG-image + logo PNG raster a partir do SVG final. Comandos documentados em `brand/assets/exports/README.md`.

Ambas as substituições são zero-touch — os paths que referenciam esses arquivos nos HTMLs e nas configs do site v1 não mudam.

## Por que duas pastas (e não uma só)

- `system/assets/` é parte do **design system** (sandbox de desenvolvimento, preview cards, templates editáveis). SVGs vetoriais themability-aware.
- `assets/exports/` é o **export pack** consumido por canais externos que não falam SVG/CSS (favicon do browser, preview do LinkedIn, email do Substack). Formatos raster específicos por uso.

Separação preserva clareza: SVG editável = ativo de design; PNG/ICO final = export de canal.
