# Plano B — Tema `gc-site` (Ghost sobre Source + DS AD-008 + 3 motores)

> Sub-plano de AD-032. Spec: `docs/superpowers/specs/2026-06-11-ghost-apex-pma-benchmark-design.md`. Pré-requisito de deploy: Plano A (infra). O tema é agnóstico ao prefixo — construído e testável em `/content` antes do cutover do apex (Plano C).

**Goal:** Tema Ghost próprio, suportado (gscan), que espelha a **usabilidade** do Product Marketing Alliance vestida no Growth Club Design System.

**Status:** v0 construído e **gscan-clean (✓ Ghost 6.x, 0 erro/0 warning)**. Falta validação em runtime (deploy) + migração de conteúdo + páginas que dependem de decisão.

---

## Usabilidade do PMA adotada (de-para de UX, não de código)

Henrique: "aproveite toda a usabilidade do PMA". Padrões funcionais espelhados:

| Padrão de UX do PMA | Onde no `gc-site` | Status |
|---|---|---|
| Mega-menu "Explore" (painel com cards de seção) | `partials/gc-nav.hbs` → `.gc-mega` "Explorar" (Meetups/Conteúdo/Empresas/Planos) | ✅ |
| Listagem filtrável de eventos (Events) | `meetups.hbs` + `meetup-card` + filtro client-side | ✅ |
| Biblioteca filtrável (Content Hub) | `recursos.hbs` + `resource-card` | ✅ |
| Barra de filtro multi-faceta (tipo/local) | `.gc-filter-chips` — chips gerados dinamicamente das tags dos cards (JS) | ✅ |
| Busca por palavra-chave | `[data-filter-search]` (filtra por título, live) | ✅ |
| Sort (recentes / antigos / A–Z) | `[data-filter-sort]` | ✅ |
| Toggle grid ↔ lista | `.gc-viewtoggle` + `[data-view]` no grid | ✅ |
| "Include past events" | `[data-filter-past]` (esconde meetups com data < hoje por padrão) | ✅ |
| Empty-state / "no results" amigável | `[data-filter-noresults]` + `.gc-empty` | ✅ |
| Cards com metadados + ícone (data, local, tipo) | `meetup-card` / `resource-card` (ícones SVG inline) | ✅ |
| Pills de tipo + lock "Membros" | `.gc-pill` / `.gc-pill-lock` (usa `{{access}}`) | ✅ |
| Stats band na home (números grandes) | `home.hbs` → `.gc-stats` (números reais GC) | ✅ |
| Footer multi-coluna denso + signup | `partials/gc-footer.hbs` | ✅ |
| Página de membership comparativa | `page-planos.hbs` — **adaptado:** sem tabela de 4 tiers (Master/Founder parqueados, fora do site) | ✅ |
| Quiz "where are you on your journey" | trilha estática `.gc-steps` na home (sem o quiz interativo) | ⏳ simplificado |
| Periodic table de competências | — | ❌ fora do v1 |

UX própria do GC (não copia visual): paleta Pub Cream/Amber/Teal, Satoshi/Roboto, `data-theme="dark"` pontual em hero/footer, ton-anchor no rodapé.

---

## Arquitetura do tema

- **Base:** Source (tema oficial Ghost, MIT) clonado, depois reescrito. `default.hbs`, partials de chrome e templates são nossos; mantidos do Source: `locales/pt-BR.json`, `partials/icons/*`, `partials/typography/*`, `lightbox`, `email-subscription`.
- **DS self-hosted (crítico no apex):** `assets/built/screen.css` = `tokens.css` + `components.css` do site (AD-008) concatenados; fontes Satoshi+Roboto copiadas pra `assets/fonts/`. `assets/css/gc-theme.css` = chrome + motores + post/page + koenig. **Sem etapa de build no boot** (pré-compilado), compatível com o disco efêmero do container.
- **Motores = collections do `routes.yaml`** (sobe no Ghost Admin → Labs → Routes, não vai no zip): `/meetups/` (filter `tag:hash-meetup`) e `/recursos/` (filter `tag:-hash-meetup`, pega o resto) — mutuamente exclusivas. Front page `/` → template `home`. Taxonomias em pt (`/tag/`, `/autor/`).
- **Filtro = client-side** (`assets/js/source.js`): lê `data-tags`/`data-date`/`data-title` dos cards, monta chips únicos, aplica busca/sort/view/passados. Zero dependência.

### Inventário de arquivos (construídos)
```
theme/gc-site/
├── package.json            # gc-site 0.1.0, card_assets, posts_per_page 12
├── default.hbs             # shell: DS + gc-theme.css + nav/footer + source.js
├── home.hbs                # hero + stats + preview meetups + preview conteúdo + trilha
├── meetups.hbs             # MOTOR #1 (collection template)
├── recursos.hbs            # MOTOR #2 (collection template)
├── page-planos.hbs         # planos (free + avulsos, sem tiers)
├── page.hbs                # páginas institucionais (respeita show_title_and_feature_image)
├── post.hbs                # artigo/edição/meetup + paywall + relacionados
├── index.hbs               # fallback de listagem
├── tag.hbs                 # arquivo de tag
├── partials/gc-nav.hbs     # header + mega-menu
├── partials/gc-footer.hbs  # footer multi-coluna + signup
├── partials/meetup-card.hbs
├── partials/resource-card.hbs
├── assets/built/screen.css # DS (AD-008) self-hosted
├── assets/css/gc-theme.css # estilos do tema
├── assets/js/source.js     # nav + motor de filtros
└── assets/fonts/*          # Satoshi + Roboto + fonts.css
+ routes.yaml (no repo, raiz) # collections — upload manual no Ghost
```

---

## Pendente (não bloqueante pra revisar a v0)

1. **Validação runtime** — deploy do tema + `routes.yaml` num Ghost com posts de teste (tag `#meetup` em alguns, conteúdo em outros) pra ver os motores filtrarem de verdade. Só após Plano A.
2. **Migração das 21 páginas** (Plano C) — criar as Ghost pages (sobre/empresas/contato/legais) com o conteúdo atual do Pages; marcar meetups com `#meetup`.
3. **AI LIKE A PRO** — decisão pendente (Ghost page vs externo).
4. **`error.hbs`** custom (hoje cai no default do Ghost) — opcional.
5. **Portal de membro** (`#/portal`) — textos/CTA já cabeados; conferir signup form do footer com `data-members-form`.
6. **Refino visual** — espaçamentos, mega-menu hover-intent, animações; pós-review do Henrique.

## Como testar (quando deployar, pós-Plano A)
1. `./bin/deploy-theme.sh` adaptado pra `gc-site` (tar.gz → R2 → restart) **ou** subir o zip no Ghost Admin → Design.
2. Ghost Admin → Settings → Design → ativar **gc-site**; Publication language `pt-br`.
3. Ghost Admin → Settings → Labs → Routes → upload do `routes.yaml`.
4. Criar 2-3 posts com tag interna `#meetup` (com data futura/passada pra testar o filtro) + 2-3 posts de conteúdo.
5. Conferir: `/` (home), `/meetups/` (filtra/sort/grid-lista/passados), `/recursos/`, `/planos/`.
