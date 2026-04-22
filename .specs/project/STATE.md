# STATE: Growth Club
**Last Updated:** 2026-04-22

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
