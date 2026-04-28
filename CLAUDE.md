# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project at a glance

**Growth Club** — Brazilian community for B2B growth operators (founders, CROs, growth leads, devs doing growth, analysts, CS). Pre-existing organic assets since 2015; this repo is where it's being **professionalized** — not launched from zero.

- **Domain:** `growthclub.pro`
- **Relaunch event:** Meetup Growth SP · S1 · E1 · jun/2026 @ Barte (S1 = year 2026; E = edição)
- **Pre-existing assets:** Substack (~2.261 subs desde 2019), WhatsApp Community (~715), core group (~391), 10+ meetups realizados, workshops AI LIKE A PRO
- **Ton-anchor:** `"Franco, com número, sem palco, com cerveja."` (locked — see `brand/decisions/03-arquetipo-e-tom.md`)
- **Archetype:** Outlaw + Sage (locked)

**Current date context:** estamos em 2026-04-28. Barte S1E1 é em jun/2026 (~5-6 semanas).

## Repository status

This is **not** a greenfield scaffold. The project is mid-execution on the **Marca** phase, with **Founder Crew recruitment** open in paralelo. What exists:

- ✅ **Business Plan v1.2 approved** — `docs/superpowers/specs/2026-04-22-growth-club-business-plan-design.md` (AD-001 em `.specs/project/STATE.md`)
- ✅ **Brand Brief Plan v1.2 approved** — `docs/superpowers/plans/2026-04-22-growth-club-brand-brief.md` (5 chunks)
- ✅ **Chunks 1–3 of brand executed as drafts** (decisions, visual system, voice) — awaiting user polish, not final
- ✅ **Founder Crew category created (AD-002, 2026-04-28)** — 3 vagas abertas (Frontend / Designer+Vídeo / Community Manager-GitHub), 30% revshare dividido por igual, sem equity em Fase 1, sem perpetuidade. WhatsApp recruiting message drafted.
- ✅ **Founder Member tier parked (AD-003, 2026-04-28)** — gatilho de retomada definido (marca v1 + site no ar + ≥100 GH Master pagantes).
- ✅ **Hospedagem em Level Tech (AD-004, 2026-04-28)** — CNPJ existente (Level Tech, fundada recentemente pelo Henrique) é a Contratante dos contratos Crew. Spin-off futuro com Level Tech como holding.
- ✅ **Transparência financeira radical (AD-005, 2026-04-28)** — relatórios mensais (1º ano) e trimestrais (depois) pro Founder Crew com DRE da Comunidade, Pool Crew e fração individual.
- ⏳ **Acordo de Founder Crew** — draft v1 em `docs/contracts/acordo-founder-crew.md`. Aguarda revisão pelo agente Claude Revisa do Henrique. Assinatura via Google Docs (eSignature).
- ⏳ **Chunk 4** (templates) — pending, depends on logo completion in Figma.
- ⏳ **Chunk 5** (brand book consolidation) — pending; brand book ativo é onde Founder Crew terão crédito.
- ⏳ **Site** (capture form + thank-you at `growthclub.pro`) — specs not written yet; separate sub-project after Marca; agora com **executor designado** (Founder Crew nº 1, quando preenchido).
- ✅ **Risco R-11 mitigado por absorção consciente:** Henrique decidiu absorver pessoalmente o gap de R$ 51.975. Princípio "sem promessa de dinheiro no curto prazo" se estende à narrativa Crew e à comunicação pública. Não há mitigação ativa de receita upfront.
- ❌ **Application code** — zero. No `package.json`, no frameworks chosen. `.specs/project/STACK.md` is still placeholder.

**If a user request depends on stack/site/code details that aren't yet written, ask before coding instead of guessing.**

## Directory map

```
Growth-Club/
├── CLAUDE.md                              ← you are here
├── .agents/rules/                         ← operating contract (universal-agent-rules, engineering-laws)
├── .agents/skills/                        ← brain, code-review, debugging, testing, Humanizer + _template
├── .agents/workflows/                     ← global-workflow, post-execution-sync
├── .claude/settings.json                  ← frontend-design + superpowers plugins enabled
├── .specs/project/                        ← STACK/ARCHITECTURE/CONVENTIONS/STATE/ROADMAP (STATE is append-only)
├── README.md                              ← public showcase / vitrine
├── CHANGELOG.md                           ← build-in-public log (mirror filtered of STATE.md)
├── SECURITY.md                            ← security policy (Phase 1)
├── brand/                                 ← brand work in progress (see brand/README.md for map)
│   ├── decisions/                         ← 01 bandeira-pirata, 02 nome-canonico, 03 arquetipo+tom (LOCKED),
│   │                                       04 marcas-filhas (skeleton — pending user input)
│   ├── visual/                            ← paleta-primaria, tipografia, logo-moodboard (direction 3 recommended)
│   ├── voice/                             ← manifesto (3 versões), dos-and-donts, tom-por-canal, glossario
│   ├── templates/                         ← empty — Chunk 4 will populate (newsletter/linkedin/email/livecast)
│   └── assets/                            ← v0 placeholder — logo vectors, palette swatches, export pack
├── docs/                                  ← curated docs by audience (see docs/README.md for map)
│   ├── community/                         ← onboarding pra membros, régua editorial, visibility strategy
│   ├── crew/                              ← FAQ pra Founder Crew, template de subpágina autoral
│   ├── investors/                         ← founder letter, metrics, FAQ, team
│   ├── sponsors/                          ← media kit, audience breakdown, política de não-contaminação
│   ├── superpowers/                       ← specs/plans (Business Plan v1.2 APPROVED, Brand Brief v1.2)
│   └── legacy/                            ← archived: visao-original.md, design-original.md
├── .github/                               ← CODE_OF_CONDUCT, CONTRIBUTING, ISSUE_TEMPLATE, PR template, profile, workflows
└── website/                               ← em construção pela Founder Crew #1 (ver website/README.md)
    └── legacy/index-old.html              ← versão antiga do site (preservada)
```

## Locked (non-negotiable) decisions

Trespassing these requires an explicit new ADR in `STATE.md`:

1. **Canonical name:** `Growth Club` (informal), `The Growth Club` (formal). `BR Growth Club` aposentado. See `brand/decisions/02-nome-canonico.md`.
2. **Archetype + ton-anchor:** Outlaw + Sage; `"Franco, com número, sem palco, com cerveja."`. See `brand/decisions/03-arquetipo-e-tom.md`.
3. **Meetup naming:** `Meetup Growth [CIDADE] · S[ANO] · E[EDIÇÃO] · [TEMA]` (S1 = 2026). Primeiro evento oficial: `Meetup Growth SP · S1 · E1 · Revenue Operations com IA @ Barte (jun/2026)`.
4. **Cultural rule #1 (editorial):** `Se não tem número, não é Growth Club.` Todo case/claim vem com métrica; post sem número → redirecionamento cordial.
5. **Pricing (Fase 1):** `Growth Hacker` (free, 12 meses de lock inicial pros primeiros 1.000). `Growth Hacker Master` R$ 990/ano (com tier early de R$ 690 para primeiros 100-200 pagantes). **`Founder Member` (R$ 2.079, 100 vagas) — PARQUEADO em AD-003 (2026-04-28)** até gatilho de retomada (marca v1 publicada + site no ar com captação ativa + ≥100 GH Master pagantes); pode voltar com formato diferente.
6. **Founder Crew (AD-002, 2026-04-28):** 4ª categoria — operadores Era Pré-S1. **3 vagas fechadas** (Frontend / Designer+Vídeo / Community Manager-GitHub). **30% do líquido dividido por igual** entre preenchidos (10% cada com 3 vagas). Sem equity em Fase 1 (Caminho B — contrato de prestação de serviços com remuneração variável). Vínculo 3 anos condicional (90 dias entrega upfront + 6h/mês manutenção). **Sem perpetuidade:** Founder pode desligar por baixa performance ou problema cultural com 15 dias de cura por escrito. **Saída = perde tudo automaticamente** (revshare + crédito ativo). Termos completos em `STATE.md` AD-002.
7. **Hospedagem operacional (AD-004, 2026-04-28):** Comunidade roda dentro do **CNPJ da Level Tech** em Fase 1. Spin-off futuro em CNPJ dedicado Growth Club (com Level Tech como holding) é gatilhado por: receita anual ≥ R$ 500k OU ≥ 200 GH Master pagantes OU captação externa relevante. Acordo de Founder Crew tem cláusula de cessão automática pra Nova Sociedade, sem conversão automática em equity.
8. **Transparência financeira radical (AD-005, 2026-04-28):** Founder Crew recebe relatório financeiro **mensal** (12 primeiros meses) e depois **trimestral** com DRE simplificada da Comunidade, cálculo do líquido, Pool Crew e fração individual. Crew tem direito a contestar cálculos (right-to-audit-lite). Princípio editorial "Se não tem número, não é Growth Club" se estende internamente. Cláusula 7 e Anexo E do Acordo de Founder Crew.
9. **Sem promessa de dinheiro no curto prazo (R-11 mitigado por absorção):** Henrique absorve pessoalmente o gap de R$ 51.975 do Founder Member parqueado. Não haverá pre-sale forçado nem mitigação agressiva. Princípio aplicável tanto à narrativa Crew quanto à comunicação pública.
10. **Livecast patrocinado entra no MVP** (amigo com agência patrocina).

## Operating model: orchestrator + specs + skills

Work in this repo follows the orchestration pattern defined in `.agents/rules/universal-agent-rules.md`. Read that file when starting any non-trivial task. The key contracts:

**Source of truth — `.specs/project/`:**
- `STACK.md` — scope, goals, tech stack (**[CRITICAL]** — still placeholder; stack not chosen)
- `ARCHITECTURE.md` — authoritative technical reference (**[CRITICAL]** — still placeholder; there's no app yet)
- `CONVENTIONS.md` — file naming, module pattern, test/commit conventions (not yet populated)
- `STATE.md` — **append-only** log of ADRs, blockers, risks, lessons. Currently: **AD-001** (Business Plan v1.2) + **AD-002** (Founder Crew categoria nova) + **AD-003** (Founder Member tier parqueado) + **AD-004** (hospedagem em Level Tech CNPJ + plano de spin-off) + **AD-005** (transparência financeira radical com Crew) + **R-11** (cash flow Barte mitigado por absorção) + **L-001** (ativos orgânicos preexistentes) + **L-002** (categoria nova vs adaptar tier). Never overwrite past entries.
- `ROADMAP.md` — 3 phases (Consolidação → Crescimento → Lock), Sprint 0 DONE

Feature-level tasks live under `docs/superpowers/plans/...md` (this is where the brand brief plan lives). When chat conflicts with these documents, **documentation wins**.

**Socratic Gate (from `universal-agent-rules.md` §4):** classify every request before tool use:
- `CLARIFY` — explain/how-to → answer directly, no edits
- `SIMPLE FIX` — typo, one-line → execute + update tasks
- `COMPLEX` — build feature, refactor → load `brain` skill OR superpowers brainstorming/writing-plans, ask 1–3 targeted questions, plan, then execute
- `ORCHESTRATE` — plan project, map architecture → load `brain` skill, initialize/map

Do not skip the question step for COMPLEX/ORCHESTRATE requests.

**Skill dispatch — `.agents/skills/`:** When intent matches a domain, read that skill's `SKILL.md` before acting. Currently available:
- `brain` — planning/execution orchestrator (Specify → Design → Tasks → Execute). Has `references/` sub-library.
- `code-review` — review checklist & severity format (🔴/🟡/🟢/💡)
- `debugging` — systematic debugging workflow
- `testing` — test writing/coverage

**Superpowers plugin skills** are also active (see `.claude/settings.json`): `brainstorming`, `writing-plans`, `subagent-driven-development`, `executing-plans`. These were used to produce the current specs/plans and should be preferred for new COMPLEX design work (business plan, site spec, future sub-projects).

When a new domain emerges that no skill covers, create a skeleton from `.agents/skills/_template/SKILL.md` and add a routing row to `universal-agent-rules.md` §3 — do not inline the logic into this file or the spec docs.

**Non-negotiable engineering standards — `.agents/rules/engineering-laws.md`:** security isolation, async-first IO, module pattern (Router → Service → Repository, no business logic in routers), zero-swallow error handling, `.env`-only secrets, per-env database isolation. Apply these when the site/app is built.

## Post-execution sync (mandatory for COMPLEX/ORCHESTRATE)

After finishing any COMPLEX or ORCHESTRATE task, run the workflow in `.agents/workflows/post-execution-sync.md`:
1. Classify what changed (new files, module boundary shifts, new deps, API surface, architecture, locked decisions).
2. Update **only** affected `.specs/` docs — be surgical, not a rewrite. Always append to `STATE.md`, never overwrite.
3. Decide whether a new skill is warranted, or an existing one needs updating.
4. Report the sync summary to the user.

Skip this for SIMPLE FIX, CLARIFY, typo/copy/style-only edits.

## Portable context for other Claude UIs

If the user needs to continue this work in Claude.ai (Projects), Claude Cowork, or another instance without access to this repo, point them to `docs/superpowers/master-prompt-growth-club-cowork.md`. It's a self-contained ~2800-word briefing with locked decisions, archetype, visual system, voice rules, and a customizable task slot. Caveat: that file ages fast — verify against this repo's state before trusting it past ~2 weeks old.

## Build / test commands

There is no `package.json` or equivalent. None of the commands in `.agents/workflows/global-workflow.md` (`npm install`, `npm run dev`, `npm test`, etc.) work today. That workflow is a template for the eventual stack. Do not run those commands until a stack is committed. When the stack is chosen and wired (future Site sub-project), update `.specs/project/STACK.md` and `universal-agent-rules.md` §2 with the real commands before relying on them.

## Language & commits

- **Code and code comments:** English (when code exists).
- **Chat with the user:** Brazilian Portuguese (user's configured preference; enforced by env settings).
- **Brand/content artifacts** (`brand/**`, newsletters, copy): Brazilian Portuguese — coloquial, with the voice locked in `brand/voice/`. Do not translate to English on the v1.
- **Commits:** Conventional Commits — the existing history uses `chore:`, `docs:`, `docs(specs):`, `docs(plans):`, `brand(marca):`, `brand(visual):`, `brand(voice):`, `docs(cowork):`. Follow this pattern. Always include `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` on AI-assisted commits.
- **`CONVENTIONS.md` §6** not yet populated — if the user wants stricter rules, flag it as a gap instead of enforcing a guess.

## Plugins enabled in `.claude/settings.json`

`frontend-design` and `superpowers` (official Claude plugins) are enabled at the project level. Their skills become available via the Skill tool. **Heavy users in this repo so far:** `superpowers:brainstorming`, `superpowers:writing-plans` (produced both the business plan spec and the brand brief plan). Expect to use them again for the upcoming Site sub-project.

## What to do next — decision tree

Before picking up work, check the user's most recent explicit direction. Common current-state next steps in rough priority:

1. **Founder Crew recruitment (AD-002)** — WhatsApp message drafted, aguarda envio do Henrique. Após enviar, triagem de candidatos é manual (Henrique faz DMs). Quando a 1ª pessoa avançar, redigir/revisar o Acordo de Founder Crew (caminho B, sem equity) **antes** de assinar.
2. **Risk R-11 mitigation choice** — Henrique precisa decidir qual mitigação ativar pra cobrir o gap de R$ 51.975 do Founder Member parqueado: pre-sale GH Master, patrocínio livecast acelerado, ingressos pagos Barte, ou redução de escopo. Default: aguardar decisão; não forçar.
3. **User polishing Chunks 1–3 drafts** (decisions, visual, voice) — don't rewrite unless asked; collaborate on edits.
4. **Task 1.4 in plan** (marcas-filhas / sub-grupos WhatsApp) — blocked on user input about 4 sub-groups; don't invent.
5. **Chunk 2 logo steps 1c–1e** — user executes in Figma; Claude helps with sketches/feedback, not the vector.
6. **Chunk 4 (templates)** — depends on logo locked. **Executor designado:** Founder Crew nº 2 (designer + vídeo) quando preenchido.
7. **Chunk 5 (brand book)** — depends on Chunks 2–4 done. Founder Crew aparece em seção "Era Pré-S1" do brand book ativo.
8. **Legal/operational §11 of business plan** (CNPJ, regime tributário, revshare contracts) — critical antes do 1º Founder Crew assinar (urgência adicional).
9. **Site sub-project** — separate spec + plan. **Executor designado:** Founder Crew nº 1 (frontend, vibe coder) quando preenchido. Pode começar em paralelo à Marca.
10. **GitHub repo profissionalizado** — README de venda da comunidade. **Executor designado:** Founder Crew nº 3 (community manager) quando preenchido.

When in doubt about priority or scope, ask — do not assume the phase has advanced beyond what's in `.specs/project/STATE.md` + `ROADMAP.md`.
