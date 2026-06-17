# STACK: Growth Club
**Last Updated:** 2026-06-16

> **AI CONTEXT:** This document is the authoritative source of truth for the project's scope, tech stack, and goals. DO NOT guess or hallucinate these details. Always refer to this document.

---

## 1. Objective & Scope

### Mission

Profissionalização da #1 comunidade de Growth multidisciplinar do Brasil (especialistas de marketing, vendas, sucesso de clientes, analytics, produtos e founders) com 11 anos de histórico orgânico. Materializa marca, site, modelo de receita e governança da Era S1 (a partir de 2026).

### Value Proposition

- **For:** Especialistas de Growth multidisciplinar (marketing, vendas, CS, analytics, produtos, founders) brasileiros que estão cansados de palco vazio, dashboard mentiroso e teatro de LinkedIn — querem trocar stack, número e ideia com gente de verdade.
- **Problem:** Falta um espaço sério, calibrado por evidência e curado por triagem de candidatura — em contraste com gurus de Instagram e comunidades genéricas.
- **Solution:** Comunidade multidisciplinar curada, com newsletter deep (Substack), meetups com tema técnico, livecast patrocinado, workshops high-ticket e (futuro) tier pago Master.

### In Scope (v1 — Era Pré-S1 e S1)

| Feature | Status | Description |
|---------|--------|-------------|
| Business Plan | ✅ DONE (AD-001) | v1.2 aprovado em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` |
| Brand book v1 | 🔄 PARTIAL (ADR-002) | Chunks 1, 3, 5-textual prontos; logo SVG final em produção (Figma) |
| Founder Crew | 🔄 OPEN (AD-002) | 3 vagas: Frontend, Designer+Vídeo, Community-GitHub. Recrutamento aberto. |
| **Site público v1** (`growthclub.pro`) | 📋 PLANNED (AD-006 spec) | **Este é o sub-projeto técnico ativo.** Stack travada em AD-007. |

### Out of Scope (v1 — adiado pra v2+ ou rejeitado)

- SaaS proprietário de qualquer natureza (newsletter, comunidade, plataforma de vídeo, etc.) — usar Substack, WhatsApp, Vimeo/Hotmart, etc.
- Login interno no site (`/minha-conta`, sessão, auth).
- Plataforma de aulas própria — usar externa (Vimeo Showcase, Hotmart, ou similar — TBD).
- Job board com feed dinâmico — v1 é só pitch comercial estático em `/empresas#vagas`.
- Multi-idioma — v1 só PT-BR.

---

## 2. Tech Stack

### Current Stack (Site v1 — AD-007)

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND                                │
│  HTML5 semântico + Modern CSS (nesting nativo) + JS vanilla │
│  Zero build step · Zero node_modules · Zero framework       │
└───────────────────────────┬─────────────────────────────────┘
                            │ Git push
┌───────────────────────────▼─────────────────────────────────┐
│                  HOSTING / DEPLOY                           │
│  Cloudflare Pages (CDN global · auto-deploy via Git)        │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  Substack     │   │  WhatsApp     │   │  YouTube/     │
│  (newsletter) │   │  (community)  │   │  LinkedIn     │
└───────────────┘   └───────────────┘   └───────────────┘
        │
        ▼
┌───────────────┐   ┌───────────────┐
│  Tally        │   │  Plausible    │
│  (forms)      │   │  (analytics — │
│               │   │   proposta)   │
└───────────────┘   └───────────────┘
```

### Key Technologies — Site v1

| Layer | Technology | Purpose |
|-------|------------|---------|
| Markup | HTML5 semântico | Estrutura de cada página, uma por arquivo `.html` |
| Styling | Modern CSS (nesting nativo, custom properties, grid, flex) | Identidade visual aplicada conforme brand book |
| Interactivity | JavaScript vanilla | Form redirect Substack, scrollspy de anchors, slot dinâmico |
| Hosting | Cloudflare Pages | Deploy via push pra branch `main`. Domínio `growthclub.pro` apontado. |
| Newsletter | Substack | Captura de email no site → redirect com email pré-preenchido. |
| Forms | Tally | Backup de captura (`/contato`, pedido de convite WhatsApp). Pode evoluir pra próprio. |
| Comunidade | WhatsApp Community | Convite controlado manual via Henrique na v1. |
| Conteúdo de vídeo | YouTube/LinkedIn embed | Livecast em `/recursos/livecast`. |
| Analytics | Plausible (proposta) | Privacy-first, cookieless. Decisão final aberta no spec (TBD-07). |
| Aulas (futuro) | TBD — Vimeo Showcase, Hotmart, Heartbeat | Gating fica na plataforma externa, não no site. |

### Sub-projetos paralelos com stacks próprias

O Growth Club tem sub-projetos operacionais com stacks independentes do site v1. **Cada sub-projeto tem repo próprio e ciclo de deploy independente** — o site v1 (HTML estático puro) é o hub central, mas sub-projetos podem evoluir sem coupling.

| Sub-projeto | Repo | Stack | Hospedagem | Função | ADR |
|-------------|------|-------|------------|--------|-----|
| Site v1 (hub) | `Growth-Club` (este) | HTML5 + Modern CSS + JS vanilla | Cloudflare Pages · `growthclub.pro` | Hub institucional, conversão e cross-promo | AD-006 / AD-007 |
| AI LIKE A PRO | `ai-like-a-pro` | HTML5 + Vanilla JS + Cloudflare Pages Functions + InfinitePay + Google Sheets + Resend | Cloudflare Pages · `growthclub.pro/ai-like-a-pro/` (sub-path via Workers Routes) | Workshop pago R$ 397/turma. Receita orgânica recorrente. | AD-009 |

**Princípios pra futuros sub-projetos:**
- Cada sub-projeto tem repo Git separado quando tem ciclo de deploy independente.
- Sub-projetos podem ter brand próprio se conversão validada existir (caso AI LIKE A PRO) — migração pro AD-008 é opcional, não obrigatória.
- Integração via cross-link explícito do site principal: footer + página `/recursos/*` correspondente.
- Receita de sub-projetos entra no DRE consolidado da Comunidade (AD-005 — transparência financeira radical com Founder Crew).

### Build & Run Commands

```bash
# Não há build step. O site é HTML/CSS/JS puro.
# Pra rodar localmente, qualquer servidor estático funciona:
python3 -m http.server 8080
# ou
npx serve .
# ou abrir o arquivo .html direto no browser.

# Deploy: push pra branch main do repositório.
# Cloudflare Pages detecta e republica automaticamente.
```

---

## 3. Stakeholders & Constraints

- **Owner:** Henrique Caner (Founder Growth Club + Level Tech)
- **Executor da v1 do site:** Henrique (AD-007)
- **Executores futuros:** Founder Crew (3 vagas em AD-002, recrutamento aberto)
- **Constraints:**
  - Hosting ≤ R$ 200/mês na Fase 1 (Cloudflare Pages free tier cobre)
  - Lighthouse ≥ 80 (Performance, Accessibility, Best Practices, SEO) — meta do spec do site
  - LGPD aderente desde dia 1 (opt-in explícito por canal, política de privacidade publicada)
  - Sem build step na v1 — coerência com tom-anchor "sem teatro"

## 4. Success Metrics

Específicas pro site v1 (estendidas em `docs/superpowers/specs/2026-05-17-growth-club-site-design.md` §2.3):

- Lighthouse mobile ≥ 80 em todas as 4 categorias
- TTI ≤ 3s em 4G
- Conversão home → form de `/membro` ≥ 8%
- Submissão de form em `/membro` ≥ 3% do tráfego total
- Bounce rate em `/sobre` ≤ 60% (página long-form)

Métricas de comunidade são tracked separadamente no business plan v1.2 §8 (WAU cross-canal etc.).
