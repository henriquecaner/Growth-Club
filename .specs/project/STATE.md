# STATE: Growth Club
**Last Updated:** 2026-04-27

> **AI CONTEXT:** Append-only log of decisions, blockers, risks, and lessons learned. Never overwrite past entries.

---

## Recent Decisions (ADR)

### AD-001: Business Plan v1.2 aprovado
**Date:** 2026-04-22
**Status:** Accepted
**Context:** Growth Club é uma comunidade brasileira de Growth com 10+ anos de histórico informal (Substack desde 2019 com 2.261 assinantes, meetups desde 2015 com 10+ edições, Community WhatsApp com 715 membros em 7 grupos). Henrique iniciou a profissionalização formal do ativo. Decomposição do pedido original ("plano de negócios + marca + site") em 3 projetos sequenciais: Business Plan → Marca → Site.

**Decision:** Design do business plan em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` aprovado pela revisão independente (2 iterações) e pelo autor humano. Versão congelada: v1.2 (commit `1e374bf`).

**Consequences:**
- Estrutura em 3 tiers: **Growth Hacker** (free) / **Founder Member** (100 cap) / **Growth Hacker Master** (R$ 990/ano na Fase 3)
- Relançamento público atrelado ao **Meetup Growth SP · S1E1 · Barte** (1ª ou 2ª semana de junho/2026)
- Ingresso do meetup = membership Growth Hacker automático (automação CRÍTICA da Fase 1)
- Modelo de receita: Meetups + Workshops high-ticket (estilo AI LIKE A PRO) + Patrocínio Livecast + Founder Members (upfront) + Master (Fase 3)
- Posicionamento: **"Growth de verdade. Stack de verdade. Sem teatro."** — execução, ponte entre silos, tech-first (IA/automação) atrelado a outcome
- Destrava as próximas fases: **Marca** → **Site**

**Alternatives considered:**
- Tier premium "Inner Circle" pra líderes — arquivado para v2+
- Lançamento do zero vs profissionalização — descartado após mapear ativos existentes
- SaaS proprietário — descartado em favor de ferramentas de mercado (Substack, WhatsApp/Circle/Slack, plataforma de site a definir)

---

### ADR-002: Marca v1 — entrega parcial (Chunks 1, 3, 5-textual)
**Date:** 2026-04-27
**Status:** Accepted
**Context:** Após validação profunda dos arquivos da marca, ficou claro que (a) Voice (Chunk 3) já estava 100% pronto — `manifesto.md`, `dos-and-donts.md`, `tom-por-canal.md`, `glossario.md` completos; (b) Decisão 04 (arquitetura de marcas-filhas) foi aceita pragmaticamente sem decompor todos os sub-grupos — `AI LIKE A PRO` é a única marca-filha v1, demais grupos seguem arquivados de fato; (c) Chunk 2 (visual) tem propostas escritas + paleta, tipografia e direção do logo travadas, mas o logo SVG final ainda precisa ser executado em Figma (Steps 1c-1e, ~2 semanas solo).

Henrique optou por destravar o handoff de marca **agora** sem esperar o logo SVG final, gerando assets v0 (placeholder) a partir da bandeira pirata atual (`brand/decisions/01-bandeira-pirata-evidencia/pirate-flag-3.png`).

**Decision:** Marca v1 entregue parcialmente. Brand book consolidado em md + pdf publicáveis; export pack v0 com 9 PNGs + favicon.ico marcados como placeholder; CONVENTIONS.md criado com Brand naming + Voice glossário operacionais. Logo SVG final permanece em produção; templates do Chunk 4 não iniciados.

**Status real por Chunk da marca:**
- Chunk 1 (decisões): ✅ travado (decisões 01–04, com 04 aceita em skeleton)
- Chunk 2 (visual): 🔄 propostas + decisões locked; logo SVG final em produção (Figma solo)
- Chunk 3 (voice): ✅ completo (4 arquivos)
- Chunk 4 (templates): 📋 não iniciado (meetup, newsletter, site handoff kit)
- Chunk 5 (brand book): ✅ textual + PDF + export pack v0 entregues; assets finais aguardam logo SVG

**Consequences:**
- Destrava handoff de marca pra patrocinadores, parceiros e Fase 1 (Site) sem aguardar o logo SVG final.
- Quando o logo final sair, será sessão de follow-up curta: substituir os 10 arquivos em `brand/assets/exports/` + regenerar PDF + remover marca `v0-placeholder` do README. Será registrado em **ADR-003**.
- Fase 1 do `ROADMAP.md` permanece **aberta** — `Brand brief entregue` não foi marcado como `[x]` porque templates Chunk 4 + logo SVG seguem pendentes.
- `CONVENTIONS.md` agora é fonte de verdade pra naming + glossário em fases futuras (Site, conteúdo, marketing) — não reinventar.

**Artefatos entregues nesta sessão (commits):**
- `brand(book): consolidated brand book v1 (markdown)` — `brand/brand-book.md`
- `docs(specs): propagate brand naming + voice rules to CONVENTIONS.md` — `.specs/project/CONVENTIONS.md`
- `brand(assets): export pack v0 placeholder (favicons + OG + PNG fallbacks)` — `brand/assets/exports/`
- `brand(book): PDF export of brand book v1 (placeholder logo)` — `brand/brand-book-v1.pdf` + `.html` + `.css`

**Alternatives considered:**
- Esperar logo SVG final antes de empacotar brand book — descartado: atrasa handoff pra Fase 1 sem ganho real, já que substituir os 10 PNGs depois é trivial.
- Não gerar PDF até logo final — descartado: o PDF textual com tipografia + paleta aplicadas tem valor independente do logo (aplicação visual do sistema decidido em peça real).
- Decompor marcas-filhas formalmente (Decisão 04 completa) — descartado: única marca-filha de fato é AI LIKE A PRO; trabalho cerimonial nos demais sub-grupos.

---

## Active Blockers

Nenhum.

---

## Active Risks

Catalogados em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` §9.2 (R1 a R10) com mitigação registrada:
- R1 Sobrecarga operacional · R2 Engajamento free ≠ conversão paga · R3 Contaminação editorial por patrocínio · R4 Passivo jurídico de revshare · R5 Dor de arrependimento no "trancar" · R6 Fragmentação dos sub-grupos · R7 Automação ingresso→membership crítica · R8 Inflação não-engajada · R9 Dependência de plataformas de terceiros (Substack/Meta) · R10 Compliance LGPD

---

## Lessons Learned

### L-001: Ativos orgânicos preexistentes mudam a natureza do design
**Context:** No meio do brainstorming, o autor revelou que o Growth Club já tem 2.261 assinantes Substack + 715 Community WhatsApp + 10+ meetups realizados desde 2015.
**Problem:** As 10 primeiras decisões do brainstorming assumiam greenfield; ficaram parcialmente descalibradas quando o contexto real apareceu.
**Solution:** Imediatamente redirecionar o framing de "lançamento do zero" para "profissionalização de ativo vivo". Antes de perguntar "como construir X", perguntar "existe algo parecido já rodando?". Incorporar ativos preexistentes como pilares do design (marca, tom, cadência) em vez de descartá-los.

---

## Deferred Ideas

Decisões conscientemente deferidas com gatilho de retomada estão registradas em `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` §9.1 e §11 (Estrutura Legal e Operacional).
