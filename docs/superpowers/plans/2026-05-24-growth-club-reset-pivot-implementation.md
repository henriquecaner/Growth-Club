# Growth Club Reset/Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the brand reset captured in `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md` — invalidate Outlaw+Sage / "Franco com cerveja" / "Se não tem número" lockeds, adopt the Growth Brazil literal copy + Awake visual structure as the new official Growth Club brand, archive (not delete) what's superseded.

**Architecture:** 4 sequential phases gated by 24h cool-down between Phase 1 and Phase 2 (per spec §8 Risk #1). Phase 1 = brand files + ADRs + archive (lowest reversal cost — `git mv` only). Phase 2 = site copy rewrite (HTML edits only). Phase 3 = site visual refactor (CSS tokens + components + pages, then cache-bust + deploy). Phase 4 = CLAUDE.md + memory + CHANGELOG sync. Every phase reversible via `git revert` of its commits; `brand/legacy/` keeps everything that's archived.

**Tech Stack:** HTML5 + Modern CSS + JS vanilla + web components `<gc-header>`/`<gc-footer>`. Cloudflare Pages direct-upload via `wrangler pages deploy website --project-name growth-club --branch main`. Fonts Satoshi + Roboto Mono already self-hosted (AD-008 → reactivated). Commits via Conventional Commits style (existing prefixes: `brand(marca)`, `copy(home)`, `feat(site)`, `docs(specs)`, `chore(site)`).

**Reference:** Spec is the source of truth (`docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`). If a task here conflicts with the spec, the spec wins — flag the discrepancy and ask user before deviating.

---

## File Structure Preview

**Created:**
- `brand/decisions/05-archetype-multidisciplinar.md` (replaces 03)
- `brand/voice/manifesto.md` (rewritten — same path, new content; old version goes to legacy)
- `brand/legacy/2026-05-24-archetype-outlaw-sage.md` (archived 03)
- `brand/legacy/voice-2026-04/` (archived voice dir snapshot — 4 files)

**Modified:**
- `.specs/project/STATE.md` (append AD-014..AD-017)
- `website/index.html` (full rewrite of body sections; head/scripts stay)
- `website/assets/css/tokens.css` (reactivate Amber/Teal/Brick + add soft tint vars)
- `website/assets/css/components.css` (add `.nav-pill`, `.badge-pastel`, `.card-pastel`, `.pricing-card`, `.testimonial-split`)
- `website/assets/css/pages.css` (rewrite `#slot-dinamico` + add `.home-*` section selectors)
- `CLAUDE.md` (update "Project at a glance" + "Locked decisions")
- `CHANGELOG.md` (append 2026-05-24 entry)
- `~/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/project_growth_club_context.md`
- `~/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/feedback_humanizer_radical.md`

**Touched only for residue removal (Phase 2 audit):**
- `website/membro.html`, `website/empresas.html`, `website/sobre.html`, `website/meetups/*.html`, `website/recursos/*.html` — `grep` for "outlaw" / "sem palco" / "se não tem número" / "franco com cerveja" / "cerveja" residues; replace surgically with the new positioning.

**Moved (not deleted):**
- `brand/decisions/03-arquetipo-e-tom.md` → `brand/legacy/2026-05-24-archetype-outlaw-sage.md`
- `brand/voice/` (4 files) → `brand/legacy/voice-2026-04/`

---

## ============================================
## PHASE 1 — Brand reset (ADRs + archive + new brand files)
## ============================================

Gate: zero changes to `website/` in this phase. Only `brand/` + `.specs/`. Phase 2 starts after Phase 1 has sat 24h with no user objection.

### Task 1.1: Append AD-014 (archetype reset) to STATE.md

**Files:**
- Modify: `.specs/project/STATE.md` (append before `## Active Blockers` section)

- [ ] **Step 1: Read tail of STATE.md to find insertion anchor**

Run: `grep -n "^## Active Blockers" .specs/project/STATE.md`
Expected: line number of the heading. Insertion happens directly before that line.

- [ ] **Step 2: Append the new ADR block**

Edit the file: insert this block AFTER the last `### AD-013` block and BEFORE `## Active Blockers`:

```markdown
### AD-014: Reset de archetype — Outlaw+Sage → Hero+Magician aspiracional
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-003 in part)

**Context:** Sessão de brainstorming em 2026-05-24 redirecionou posicionamento e voz da marca após o founder concluir que a régua "Franco, com número, sem palco, com cerveja." e o archetype Outlaw+Sage não capturavam a comunidade que ele quer construir. Nova referência adotada: `growth-brazil.webflow.io` (estrutura/copy) + `henriques-amazing-site-a39ead.webflow.io` (elementos visuais Awake-style). Decisão completa documentada em `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`.

**Decision:** Archetype primário passa a ser **Hero + Magician** (aspiracional, inclusivo, "elite do mercado", "transformando o mercado"). Ton-anchor velho ("Franco, com número, sem palco, com cerveja.") aposentado — substituído pelo bloco sub-headline da nova copy ("Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."). `brand/decisions/03-arquetipo-e-tom.md` movido pra `brand/legacy/2026-05-24-archetype-outlaw-sage.md` via `git mv`. Novo arquivo `brand/decisions/05-archetype-multidisciplinar.md` captura a nova decisão. `brand/voice/` (manifesto, dos-and-donts, tom-por-canal, glossario) movido pra `brand/legacy/voice-2026-04/`; `brand/voice/manifesto.md` recriado com voz nova.

**Reversibility:** `brand/legacy/` mantém os artefatos antigos intactos. Reverter = `git mv` de volta + append "revert AD-014" entry neste STATE.md. Custo: 1 commit.
```

- [ ] **Step 3: Verify with grep**

Run: `grep -c "AD-014" .specs/project/STATE.md`
Expected: `1` (the new entry exists exactly once).

- [ ] **Step 4: Commit**

```bash
git add .specs/project/STATE.md
git commit -m "$(cat <<'EOF'
docs(state): AD-014 reset de archetype Outlaw+Sage → Hero+Magician

Aposenta ton-anchor "Franco, com número, sem palco, com cerveja." e
posiciona a marca em Hero+Magician aspiracional. Referência: spec
2026-05-24-growth-club-reset-pivot-design.md. Reversível via git mv +
append revert entry.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.2: Append AD-015 (positioning reset) to STATE.md

**Files:**
- Modify: `.specs/project/STATE.md`

- [ ] **Step 1: Append AD-015 block**

Insert directly after the AD-014 block:

```markdown
### AD-015: Reset de posicionamento — B2B curado → Comunidade multidisciplinar
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-001 §3-§5 in part)

**Context:** AD-001 (Business Plan v1.2) posicionava o Growth Club como "comunidade brasileira de operadores B2B de growth" com cluster analysis (AD-011) reforçando o foco em founders, CROs, growth/RevOps leads, vendedores consultivos B2B. Decisão de reset (2026-05-24) substitui esse posicionamento por "comunidade de Growth multidisciplinar do Brasil" — marketing + vendas + sucesso de clientes + analytics + produtos + founders, sem o filtro B2B-only.

**Decision:** Headline oficial passa a ser "A #1 Comunidade de Growth Multidisciplinar do Brasil". Sub-headline oficial passa a ser "Somos uma comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders". Audiência alvo se expande pra todo profissional de growth, não só operadores B2B. Sections §3-§5 do business plan (audiência, posicionamento, ângulo) ficam parcialmente desatualizadas — Phase 4 da implementação do reset atualiza CLAUDE.md e memory pra refletir isso, mas o spec do business plan original fica intacto como artefato histórico.

**Reversibility:** Reverter exige editar headline em `website/index.html` + reescrever CLAUDE.md "Project at a glance". Custo: 2 commits.
```

- [ ] **Step 2: Verify**

Run: `grep -c "AD-015" .specs/project/STATE.md`
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add .specs/project/STATE.md
git commit -m "$(cat <<'EOF'
docs(state): AD-015 reset de posicionamento B2B → multidisciplinar

Headline oficial vira "#1 Comunidade de Growth Multidisciplinar do
Brasil". Audiência se expande de B2B-curado pra growth amplo.
Business plan AD-001 §3-§5 parcialmente desatualizado.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.3: Append AD-016 (editorial rule reset) to STATE.md

**Files:**
- Modify: `.specs/project/STATE.md`

- [ ] **Step 1: Append AD-016 block**

```markdown
### AD-016: Reset de régua editorial — "Se não tem número, não é Growth Club" → retirada
**Date:** 2026-05-24
**Status:** Accepted (supersedes AD-001 cultural rule #1)

**Context:** A régua editorial "Se não tem número, não é Growth Club." era o filtro #1 da marca (AD-001 §3.3, brand/decisions/01-bandeira-pirata.md, voice manifesto). Funcionava como porta de entrada cultural — case sem número virava redirecionamento cordial. Decisão de reset (2026-05-24) retira a régua porque a copy literal Growth Brazil adotada como nova verdade não comporta o filtro: "#1 comunidade" não tem número, "elite do mercado" não tem número, "os melhores do mundo" não tem número. Manter a régua junto da nova copy seria contradição interna.

**Decision:** Régua "Se não tem número, não é Growth Club." aposentada. Nenhuma régua editorial substitui no curto prazo — comunidade passa a operar sem filtro editorial explícito (a curadoria continua existindo via triagem de candidatura, mas sem rótulo de regra). Posts/newsletter/WhatsApp/livecast continuam editados pelo founder; só não há mais uma régua nominal pública.

**Reversibility:** Reverter exige reintroduzir a régua em CLAUDE.md, brand/decisions/, voice/manifesto. Custo: 3 commits.
```

- [ ] **Step 2: Verify**

Run: `grep -c "AD-016" .specs/project/STATE.md`
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add .specs/project/STATE.md
git commit -m "$(cat <<'EOF'
docs(state): AD-016 aposenta régua "Se não tem número, não é Growth Club"

Régua editorial #1 retirada porque conflita com a nova copy literal
adotada (#1 comunidade, elite do mercado — claims sem prova
quantitativa). Sem régua substituta no curto prazo.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.4: Append AD-017 (palette reactivation) to STATE.md

**Files:**
- Modify: `.specs/project/STATE.md`

- [ ] **Step 1: Append AD-017 block**

```markdown
### AD-017: Reativação de AD-008 paleta — Tonal Warm puro → AD-008 estendido com soft tints
**Date:** 2026-05-24
**Status:** Accepted (supersedes the 2026-05-24 brainstorming-internal Tonal Warm pure approval)

**Context:** Durante a sessão de brainstorming de 2026-05-24, o founder aprovou momentaneamente uma paleta "Tonal Warm sem accent" (Paper #F7F5F0 + Charcoal #1C1B18 + Ash #6B6862 only, sem Amber/Teal/Brick). Essa aprovação foi superada pela escolha posterior do estilo Awake-inspired, que requer cor de accent — sem cor, cards pastel, retratos com círculos coloridos e pricing destacado não funcionam visualmente.

**Decision:** AD-008 (Growth Club Design System) é reativado com extensão. Paleta volta a ter: Paper `#F7F5F0`, Paper deep `#ECE7D6`, Charcoal `#1C1B18`, Ash `#6B6862`, Amber Beer `#D4A24C`, Pirate Teal `#4FB3A5`, Brick Red `#B84A3E`. Adicionados novos tokens de soft tint pra suportar o estilo Awake: `--amber-soft #F2E2C0`, `--teal-soft #CDEDE7`, `--brick-soft #F4D5CF`, `--warm-neutral #E8E2D0`, `--sage-soft #DDE6E2`. Fontes Satoshi + Roboto Mono mantidas (AD-008 → keep). Componentes web (`<gc-header>`, `<gc-footer>`) mantidos com ajustes de markup pro nav pill da Phase 3.

**Reversibility:** Reverter exige editar `tokens.css` e remover os soft tints. Custo: 1 commit.
```

- [ ] **Step 2: Verify**

Run: `grep -c "AD-017" .specs/project/STATE.md`
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add .specs/project/STATE.md
git commit -m "$(cat <<'EOF'
docs(state): AD-017 reativa AD-008 paleta com soft tints

Tonal Warm puro descartado. Volta Amber/Teal/Brick + 5 soft tints
novos (amber-soft, teal-soft, brick-soft, warm-neutral, sage-soft)
pra suportar estilo Awake.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.5: Archive brand/decisions/03-arquetipo-e-tom.md

**Files:**
- Move: `brand/decisions/03-arquetipo-e-tom.md` → `brand/legacy/2026-05-24-archetype-outlaw-sage.md`

- [ ] **Step 1: Verify source file exists**

Run: `test -f brand/decisions/03-arquetipo-e-tom.md && echo OK`
Expected: `OK`.

- [ ] **Step 2: Verify destination is clear**

Run: `test ! -f brand/legacy/2026-05-24-archetype-outlaw-sage.md && echo OK`
Expected: `OK`.

- [ ] **Step 3: Move via git**

Run:
```bash
git mv brand/decisions/03-arquetipo-e-tom.md brand/legacy/2026-05-24-archetype-outlaw-sage.md
```

- [ ] **Step 4: Verify**

Run: `git status -s | grep arquetipo`
Expected: a single line showing the rename, format `R  brand/decisions/03-arquetipo-e-tom.md -> brand/legacy/2026-05-24-archetype-outlaw-sage.md`.

- [ ] **Step 5: Commit**

```bash
git commit -m "$(cat <<'EOF'
brand(legacy): archive 03-arquetipo-e-tom (Outlaw+Sage) → legacy/

AD-014 reset de archetype. Arquivo movido intacto pra brand/legacy/
com data prefix. Reverter = git mv de volta. Conteúdo preservado.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.6: Archive brand/voice/ directory

**Files:**
- Move: `brand/voice/` (manifesto.md, dos-and-donts.md, tom-por-canal.md, glossario.md) → `brand/legacy/voice-2026-04/`

- [ ] **Step 1: Verify voice dir contents**

Run: `ls brand/voice/`
Expected: `dos-and-donts.md  glossario.md  manifesto.md  tom-por-canal.md` (4 files).

- [ ] **Step 2: Create legacy target dir**

Run: `mkdir -p brand/legacy/voice-2026-04`

- [ ] **Step 3: Move each file via git mv (preserves history)**

Run:
```bash
git mv brand/voice/manifesto.md brand/legacy/voice-2026-04/manifesto.md
git mv brand/voice/dos-and-donts.md brand/legacy/voice-2026-04/dos-and-donts.md
git mv brand/voice/tom-por-canal.md brand/legacy/voice-2026-04/tom-por-canal.md
git mv brand/voice/glossario.md brand/legacy/voice-2026-04/glossario.md
```

- [ ] **Step 4: Verify**

Run: `ls brand/voice/ 2>&1; ls brand/legacy/voice-2026-04/`
Expected first: empty (or `No such file or directory` — depends on whether the dir auto-removed). Expected second: 4 .md files.

- [ ] **Step 5: Commit**

```bash
git add -A brand/voice brand/legacy/voice-2026-04
git commit -m "$(cat <<'EOF'
brand(legacy): archive voice/ → legacy/voice-2026-04/

AD-014 reset. 4 arquivos (manifesto, dos-and-donts, tom-por-canal,
glossario) movidos com history preservado. brand/voice/manifesto.md
será recriado em Task 1.8 com a voz nova.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.7: Create new brand/decisions/05-archetype-multidisciplinar.md

**Files:**
- Create: `brand/decisions/05-archetype-multidisciplinar.md`

- [ ] **Step 1: Verify file doesn't exist yet**

Run: `test ! -f brand/decisions/05-archetype-multidisciplinar.md && echo OK`
Expected: `OK`.

- [ ] **Step 2: Write new decision file**

Create `brand/decisions/05-archetype-multidisciplinar.md` with this content:

```markdown
# Decisão 05 — Arquétipo de marca e voz · Reset 2026-05-24

**Data:** 2026-05-24
**Status:** Locked (substitui Decisão 03)
**Ancoragem:** `.specs/project/STATE.md` AD-014 + AD-015 + AD-016. Decisão completa documentada em `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`. Decisão 03 arquivada em `brand/legacy/2026-05-24-archetype-outlaw-sage.md`.

---

## Contexto da virada

Em 2026-05-24, após sessão de brainstorming, o founder concluiu que o archetype Outlaw+Sage e o ton-anchor "Franco, com número, sem palco, com cerveja." não capturavam a comunidade que ele quer construir. Adotou a copy do `growth-brazil.webflow.io` como nova verdade e o estilo visual de `henriques-amazing-site-a39ead.webflow.io` (Awake-style) como referência de design.

---

## Decisão

### Archetype primário: **Hero + Magician**

Hero — aspiracional, "transformar o mercado", "elite do mercado".
Magician — "comunidade agnóstica onde a troca é real", "membros possuem ideias semelhantes e diferentes", transformação coletiva.

### Ton-anchor

> "Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."

### Headline oficial

> "A #1 Comunidade de Growth Multidisciplinar do Brasil"

### Sub-headline oficial

> "Somos uma comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders."

### 3 pilares oficiais

1. **Encontre Talentos** — "Alcance pessoas em nosso canal de contratação. Seja para um consultor pontual ou um funcionário full-time, a elite do mercado está aqui."
2. **Conteúdo Denso** — "Curadoria diária e compartilhamento de conhecimento replicável. Newsletters, Lives Semanais e AMAs com os melhores do mundo."
3. **Vibe Única** — "Novo ou avançado, tímido ou extrovertido. Nossos membros possuem ideias semelhantes e diferentes. Somos uma comunidade agnóstica onde a troca é real."

### Footnote do meetup

> "Este meetup é um dos nossos 'épicos encontros ocasionais' para criar laços e memórias."

---

## Régua editorial

Aposentada (AD-016). Sem régua nominal pública. Curadoria continua via triagem de candidatura, mas sem rótulo de filtro editorial.

---

## O que sai de cena

- Régua "Se não tem número, não é Growth Club." (AD-016)
- Outlaw+Sage como archetype (Decisão 03, arquivada)
- Bandeira pirata como capital simbólico operante (Decisão 01 — fica como referência histórica, sem aplicação visual ativa)
- Ton-anchor "Franco, com número, sem palco, com cerveja."
- Linguagem "rataria com nome pomposo", "guru", "palco", "mural de vaga"

---

## O que permanece

- Nome canônico Growth Club (Decisão 02 — não afetada)
- 4 espaços operacionais: Newsletter Substack, WhatsApp Community, Meetup presencial, Livecast — produtos reais, apenas reagrupados sob 3 pilares de comunicação
- AD-008 (Design System) reativado com extensão de soft tints (AD-017)
- Fontes Satoshi + Roboto Mono
- Operação dentro do CNPJ Level Tech (AD-004)
- Transparência financeira radical com Founder Crew (AD-005)
```

- [ ] **Step 3: Verify**

Run: `wc -l brand/decisions/05-archetype-multidisciplinar.md`
Expected: ~60-80 lines.

- [ ] **Step 4: Commit**

```bash
git add brand/decisions/05-archetype-multidisciplinar.md
git commit -m "$(cat <<'EOF'
brand(marca): Decisão 05 archetype Hero+Magician multidisciplinar

Substitui Decisão 03 (Outlaw+Sage, arquivada). Captura ton-anchor,
headline, sub-headline, 3 pilares e footnote do meetup verbatim
conforme aprovação do founder em 2026-05-24.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.8: Recreate brand/voice/manifesto.md with new voice

**Files:**
- Create: `brand/voice/manifesto.md`

- [ ] **Step 1: Recreate the path**

Run: `mkdir -p brand/voice`

- [ ] **Step 2: Write new manifesto**

Create `brand/voice/manifesto.md`:

```markdown
# Manifesto · Growth Club v2

**Versão:** 2 (2026-05-24)
**Substitui:** `brand/legacy/voice-2026-04/manifesto.md`
**Ancoragem:** Decisão 05 + AD-014 + AD-015.

---

## Headline

A #1 Comunidade de Growth Multidisciplinar do Brasil.

## Sub-headline

Somos uma comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders.

## Voz

Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado.

## Promessa

A elite do mercado está aqui. Curadoria diária, conhecimento replicável, encontros que criam laços e memórias.

## 3 pilares

**Encontre Talentos** — Alcance pessoas em nosso canal de contratação. Seja para um consultor pontual ou um funcionário full-time.

**Conteúdo Denso** — Curadoria diária e compartilhamento de conhecimento replicável. Newsletters, Lives Semanais e AMAs com os melhores do mundo.

**Vibe Única** — Novo ou avançado, tímido ou extrovertido. Nossos membros possuem ideias semelhantes e diferentes. Somos uma comunidade agnóstica onde a troca é real.

## Convite

Faça parte. Junte-se à comunidade de Growth mais engajada do Brasil.
```

- [ ] **Step 3: Verify**

Run: `cat brand/voice/manifesto.md | head -5`
Expected: title + frontmatter visible.

- [ ] **Step 4: Commit**

```bash
git add brand/voice/manifesto.md
git commit -m "$(cat <<'EOF'
brand(voice): manifesto v2 multidisciplinar

Recria brand/voice/manifesto.md com a voz nova (Hero+Magician,
aspiracional, inclusiva). Versão anterior arquivada em
brand/legacy/voice-2026-04/. dos-and-donts/tom-por-canal/glossario
ficam dormentes — recriar conforme necessidade futura.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 1.9: Phase 1 close — verify and pause

**Files:**
- None (verification only)

- [ ] **Step 1: Verify all 4 ADRs are in STATE.md**

Run: `grep -E "^### AD-01[4-7]" .specs/project/STATE.md`
Expected: 4 lines (AD-014, AD-015, AD-016, AD-017).

- [ ] **Step 2: Verify legacy structure**

Run: `ls brand/legacy/`
Expected: `2026-05-24-archetype-outlaw-sage.md`, `voice-2026-04/`, plus pre-existing files (README.md, brand-book-v1.*).

- [ ] **Step 3: Verify new brand files exist**

Run: `ls brand/decisions/05-archetype-multidisciplinar.md brand/voice/manifesto.md`
Expected: both files listed.

- [ ] **Step 4: Verify residue in brand/voice/ is gone**

Run: `ls brand/voice/`
Expected: only `manifesto.md` (4 old files moved to legacy).

- [ ] **Step 5: Stop and wait for user confirmation**

Per spec §8 Risk #1, Phase 1 must sit 24h before Phase 2 starts. Message user:

> "Phase 1 complete. 9 commits made: 4 ADRs (AD-014..AD-017) + 2 archives (03 + voice dir) + 2 new brand files + 1 close verify. Per spec §8 cooldown, Phase 2 starts after 24h or your explicit `proceed phase 2`."

Do NOT start Phase 2 tasks until user confirms.

---

## ============================================
## PHASE 2 — Site copy rewrite + residue audit
## ============================================

Gate: Phase 1 must be merged. Phase 2 only changes HTML files in `website/`. No CSS, no JS, no deploy.

### Task 2.1: Rewrite website/index.html — head + meta

**Files:**
- Modify: `website/index.html` lines 1-42 (head section)

- [ ] **Step 1: Read current head**

Run: `sed -n '1,42p' website/index.html`

- [ ] **Step 2: Replace `<title>` and meta description**

Use the Edit tool. Find:
```html
<title>Growth Club — A comunidade brasileira de operadores B2B de growth.</title>
  <meta name="description" content="Se não tem número, não é Growth Club. Newsletter quinzenal, WhatsApp Community, meetup presencial. Operadores B2B de growth desde 2015.">
```

Replace with:
```html
<title>Growth Club — A #1 Comunidade de Growth Multidisciplinar do Brasil.</title>
  <meta name="description" content="Comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders. Newsletter, Lives Semanais, AMAs e meetups.">
```

- [ ] **Step 3: Replace og:title and og:description**

Find:
```html
<meta property="og:title" content="Growth Club — Se não tem número, não é Growth Club.">
  <meta property="og:description" content="A comunidade brasileira de operadores B2B de growth.">
```

Replace with:
```html
<meta property="og:title" content="Growth Club — #1 Comunidade de Growth Multidisciplinar do Brasil.">
  <meta property="og:description" content="Profissionais de marketing, vendas, CS, analytics, produtos e founders.">
```

- [ ] **Step 4: Update Organization schema description**

Find: `"description": "Comunidade brasileira de operadores B2B de growth desde 2015.",`

Replace with: `"description": "Comunidade de Growth multidisciplinar do Brasil — marketing, vendas, sucesso de clientes, analytics, produtos e founders.",`

- [ ] **Step 5: Verify**

Run: `grep -c "Multidisciplinar" website/index.html`
Expected: `>= 3` (title + og:title + schema description).

Run: `grep -c "Se não tem número" website/index.html`
Expected: `0`.

- [ ] **Step 6: Commit (no commit yet — bundle with hero rewrite in next task)**

Skip commit. Stage changes only:
```bash
git add website/index.html
```

---

### Task 2.2: Rewrite website/index.html — hero section

**Files:**
- Modify: `website/index.html` lines ~50-68 (the `<section class="hero">` block)

- [ ] **Step 1: Replace the hero block**

Use Edit tool. Find the entire `<section class="hero" data-theme="dark">` block (lines 50-68 in current file). Replace with:

```html
<!-- HERO -->
    <section class="home-hero">
      <div class="wrap home-hero-inner">
        <h1 class="home-hero-h1">A <span class="home-hero-num">#1</span> Comunidade de Growth <em>Multidisciplinar</em> do Brasil.</h1>
        <p class="home-hero-sub">Somos uma comunidade de profissionais de marketing, vendas, sucesso de clientes, analytics, produtos e founders.</p>
        <form class="home-hero-form" action="https://growthclub.substack.com/subscribe" method="get" target="_blank">
          <input type="email" name="email" placeholder="seu melhor email" required>
          <button type="submit" class="btn primary">Fazer parte</button>
        </form>
        <p class="home-hero-disclaimer">Sem spam. Sem cadência forçada. Aprovação por triagem.</p>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

Run: `grep -A1 'home-hero-h1' website/index.html | head -3`
Expected: H1 with "#1 Comunidade de Growth" visible.

- [ ] **Step 3: Stage (no commit yet)**

```bash
git add website/index.html
```

---

### Task 2.3: Rewrite website/index.html — replace problem section with logos strip

**Files:**
- Modify: `website/index.html` problem section (was 4 cards: PALCO/GURU/NETWORKING/PATROCINADO)

- [ ] **Step 1: Replace `<section class="problem">` block with logos strip**

Find the entire `<section class="problem" id="sobre">...</section>` block (4-card grid). Replace with:

```html
<!-- LOGOS STRIP -->
    <section class="home-logos">
      <div class="wrap">
        <p class="home-logos-label">Onde nossos membros operam</p>
        <div class="home-logos-row">
          <span class="logo-ph">[Logo 1]</span>
          <span class="logo-ph">[Logo 2]</span>
          <span class="logo-ph">[Logo 3]</span>
          <span class="logo-ph">[Logo 4]</span>
          <span class="logo-ph">[Logo 5]</span>
          <span class="logo-ph">[Logo 6]</span>
          <span class="logo-ph">[Logo 7]</span>
        </div>
      </div>
    </section>
```

Note: `[Logo N]` are placeholders. Phase 2 leaves them as-is; user fills with real company logos later (open question §6.3 of spec).

- [ ] **Step 2: Verify**

Run: `grep -c '"problem"' website/index.html`
Expected: `0`.

Run: `grep -c 'home-logos' website/index.html`
Expected: `>= 2`.

- [ ] **Step 3: Stage**

```bash
git add website/index.html
```

---

### Task 2.4: Rewrite website/index.html — layers section into 3 pillars

**Files:**
- Modify: `website/index.html` layers section (was 4 espaços)

- [ ] **Step 1: Replace `<section class="layers">` block**

Find the entire `<section class="layers" id="espacos">...</section>` block. Replace with:

```html
<!-- 3 PILARES -->
    <section class="home-pillars" id="envolva">
      <div class="wrap">
        <div class="home-pillars-head">
          <h2 class="home-pillars-h2">Formas de se envolver</h2>
          <p class="home-pillars-sub">Novo ou avançado, tímido ou extrovertido — existem muitas formas que você pode interagir com pessoas em nossa comunidade.</p>
        </div>
        <div class="home-pillars-grid">
          <article class="home-pillar home-pillar-amber">
            <div class="home-pillar-icon" aria-hidden="true">
              <svg class="icon"><use href="/assets/icons.svg#users"/></svg>
            </div>
            <h3>Encontre Talentos</h3>
            <p>Alcance pessoas em nosso canal de contratação. Seja para um consultor pontual ou um funcionário full-time, a elite do mercado está aqui.</p>
          </article>
          <article class="home-pillar home-pillar-teal">
            <div class="home-pillar-icon" aria-hidden="true">
              <svg class="icon"><use href="/assets/icons.svg#book-open"/></svg>
            </div>
            <h3>Conteúdo Denso</h3>
            <p>Curadoria diária e compartilhamento de conhecimento replicável. Newsletters, Lives Semanais e AMAs com os melhores do mundo.</p>
          </article>
          <article class="home-pillar home-pillar-brick">
            <div class="home-pillar-icon" aria-hidden="true">
              <svg class="icon"><use href="/assets/icons.svg#sparkles"/></svg>
            </div>
            <h3>Vibe Única</h3>
            <p>Novo ou avançado, tímido ou extrovertido. Nossos membros possuem ideias semelhantes e diferentes. Somos uma comunidade agnóstica onde a troca é real.</p>
          </article>
        </div>
      </div>
    </section>
```

Note: icon names `users`, `book-open`, `sparkles` need to exist in `website/assets/icons.svg` sprite. If they don't, replace with `arrow-up-right` (known existing) and let Phase 3 add the missing icons.

- [ ] **Step 2: Verify icons exist in sprite**

Run: `grep -E 'id="(users|book-open|sparkles)"' website/assets/icons.svg`
Expected: 3 lines. If fewer: edit the HTML to use icons that exist, log the missing ones for Phase 3 to address.

- [ ] **Step 3: Verify HTML**

Run: `grep -c 'home-pillar-amber\|home-pillar-teal\|home-pillar-brick' website/index.html`
Expected: `3` (one of each).

- [ ] **Step 4: Stage**

```bash
git add website/index.html
```

---

### Task 2.5: Rewrite website/index.html — timeline + closer + meetup footnote

**Files:**
- Modify: `website/index.html` timeline section (Roadmap 2026) and CTA-final section

- [ ] **Step 1: Replace `<section class="timeline">` block**

Find `<section class="timeline" id="meetups">...</section>`. Replace with:

```html
<!-- MEETUP HIGHLIGHT -->
    <section class="home-meetup" id="meetups">
      <div class="wrap home-meetup-inner">
        <span class="home-meetup-eye">/ Próximo meetup</span>
        <h2 class="home-meetup-h2">Meetup Growth SP · S1 · E1 @ Barte · jun/2026</h2>
        <p class="home-meetup-sub">Este meetup é um dos nossos "épicos encontros ocasionais" para criar laços e memórias.</p>
        <a class="btn primary" href="/meetups/sp-s1-e1">Ver detalhes <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a>
      </div>
    </section>
```

- [ ] **Step 2: Replace `<section class="cta-final">` block**

Find `<section class="cta-final" id="cta" data-theme="dark">...</section>`. Replace with:

```html
<!-- CLOSER -->
    <section class="home-cta-final">
      <div class="wrap home-cta-inner">
        <h2 class="home-cta-h2">Junte-se à comunidade de Growth mais engajada do Brasil.</h2>
        <p class="home-cta-sub">Aprovação por triagem. Newsletter chega antes mesmo da decisão.</p>
        <a class="btn primary" href="/membro">Faça parte <svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"/></svg></a>
      </div>
    </section>
```

- [ ] **Step 3: Verify residues removed**

Run: `grep -iE "outlaw|sem palco|cerveja|franco|rataria|guru|mural de vaga" website/index.html`
Expected: zero matches.

Run: `grep -c "se não tem número\|Se não tem número" website/index.html`
Expected: `0`.

- [ ] **Step 4: Stage and commit all home rewrites (Tasks 2.1-2.5)**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
copy(home): reset multidisciplinar — headline #1 + 3 pilares + meetup

Reescreve hero (#1 Comunidade Growth Multidisciplinar), substitui
problem por logos strip placeholder, troca 4-espaços por 3 pilares
(Encontre Talentos / Conteúdo Denso / Vibe Única), timeline vira
meetup highlight com footnote "épicos encontros ocasionais",
closer convida pra "comunidade mais engajada". Residues Outlaw/Sage
removidos. AD-014/AD-015/AD-016 referenciados.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2.6: Audit other pages for residue

**Files:**
- Audit only (no edits unless residue found): `website/membro.html`, `website/empresas.html`, `website/sobre.html`, `website/meetups/*.html`, `website/recursos/*.html`, `website/ai-like-a-pro/index.html`, `website/contato.html`

- [ ] **Step 1: Scan all pages for residue keywords**

Run:
```bash
grep -rliE "se não tem número|franco com|sem palco|outlaw|rataria|guru|mural de vaga" website/ --include="*.html"
```
Expected: list of files that contain residue.

- [ ] **Step 2: For each file in the list, show context**

For each file `F` returned in Step 1, run: `grep -nE "se não tem número|franco com|sem palco|outlaw|rataria|guru|mural de vaga" "$F"` and inspect.

- [ ] **Step 3: Replace residues page-by-page using Edit tool**

For each residue match, edit it to be aligned with the new voice. Use this translation table:

| Old phrase | New phrase |
|---|---|
| "Se não tem número, não é Growth Club" | (delete the sentence — no replacement) |
| "Franco, com número, sem palco" | "Comunidade engajada, sem palco vazio" |
| "Outlaw" / "rataria" | (delete or replace with "comunidade", "membros") |
| "Mural de vaga" | "canal de contratação" |
| "Guru" | "especialista" |
| "Operadores B2B" (when used as primary positioning) | "profissionais de growth multidisciplinares" |
| "Sem boost pago, sem swap de lista, sem influencer de palco" | (delete or soften to: "curadoria editorial diária") |

If a file has heavy residue (>5 matches), flag it to the user for full copy refresh in a future task instead of doing surgical edits.

- [ ] **Step 4: Re-verify**

Run:
```bash
grep -rliE "se não tem número|franco com|sem palco|outlaw|rataria|guru|mural de vaga" website/ --include="*.html"
```
Expected: empty (all residues replaced or flagged).

- [ ] **Step 5: Commit (only if edits were made)**

```bash
git add website/
git commit -m "$(cat <<'EOF'
copy(site): audit + remove Outlaw/Sage residues (membro/empresas/sobre/meetups)

Sweep das páginas auxiliares pra remover frases que conflitam com
AD-014/015/016. Substituições conservadoras quando possível, deleção
quando a frase era estrutural na voz antiga.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If no edits were needed (all residues already gone): skip commit, log "no residues" to user.

---

### Task 2.7: Phase 2 close — verify

- [ ] **Step 1: Local preview**

Run: `python3 -m http.server 8788 -d website` in background. Open `http://localhost:8788/` in browser.

Visual check on home:
- Hero shows "#1 Comunidade de Growth Multidisciplinar"
- Sub-headline mentions marketing/vendas/CS/analytics/produtos/founders
- Logos strip is visible with `[Logo N]` placeholders
- 3 pilares visible (Encontre Talentos, Conteúdo Denso, Vibe Única)
- Meetup section mentions "épicos encontros ocasionais"
- Closer says "comunidade de Growth mais engajada"

Note: visual will look UGLY because Phase 3 hasn't applied new CSS yet. That's OK — verify content only.

- [ ] **Step 2: Stop server**

`Ctrl+C` on the running `python3 -m http.server`.

- [ ] **Step 3: Tell user to proceed**

> "Phase 2 complete. Home content rewritten with the new copy verbatim. Visual still uses old Tonal Warm look (no CSS changes yet). Phase 3 starts after your `proceed phase 3` — there's no 24h cooldown here (cooldown was Phase 1→2 only). Phase 3 rewrites CSS tokens + components + pages + deploys."

---

## ============================================
## PHASE 3 — Site visual refactor + deploy
## ============================================

Gate: Phase 2 must be merged. Phase 3 changes CSS, components, deploys.

### Task 3.1: Reactivate AD-008 palette + add soft tints in tokens.css

**Files:**
- Modify: `website/assets/css/tokens.css` lines 36-60 (accents block)

- [ ] **Step 1: Read current tokens block**

Run: `sed -n '36,80p' website/assets/css/tokens.css`

- [ ] **Step 2: Replace accent block in `:root`**

Find the block starting with `/* Accents — Amber primary (CTA), Pirate Teal secondary */` (around line 36) and ending with the `--accent-mint-glow` line (around line 59).

Replace with:

```css
/* Accents — AD-008 reactivated (AD-017, 2026-05-24) */
  --accent-amber:        #D4A24C;
  --accent-amber-bright: #E5B45D;
  --accent-amber-dim:    #B88838;
  --accent-amber-soft:   rgba(212, 162, 76, 0.12);
  --accent-amber-glow:   rgba(212, 162, 76, 0.28);

  --accent-teal:        #4FB3A5;
  --accent-teal-bright: #6FC4B7;
  --accent-teal-dim:    #3A8F84;
  --accent-teal-soft:   rgba(79, 179, 165, 0.12);
  --accent-teal-glow:   rgba(79, 179, 165, 0.28);

  --accent-brick:       #B84A3E;
  --accent-brick-soft:  rgba(184, 74, 62, 0.10);

  /* Soft tints — AD-017 additions for Awake-style pastel cards */
  --tint-amber-soft:    #F2E2C0;
  --tint-teal-soft:     #CDEDE7;
  --tint-brick-soft:    #F4D5CF;
  --tint-warm-neutral:  #E8E2D0;
  --tint-sage-soft:     #DDE6E2;

  /* Legacy aliases — preserve old [violet/mint] class names */
  --accent-violet:        var(--accent-amber);
  --accent-violet-bright: var(--accent-amber-bright);
  --accent-violet-dim:    var(--accent-amber-dim);
  --accent-violet-soft:   var(--accent-amber-soft);
  --accent-violet-glow:   var(--accent-amber-glow);
  --accent-mint:        var(--accent-teal);
  --accent-mint-bright: var(--accent-teal-bright);
  --accent-mint-dim:    var(--accent-teal-dim);
  --accent-mint-soft:   var(--accent-teal-soft);
  --accent-mint-glow:   var(--accent-teal-glow);
```

- [ ] **Step 3: Verify**

Run: `grep -c -- "--tint-amber-soft" website/assets/css/tokens.css`
Expected: `1`.

- [ ] **Step 4: Commit**

```bash
git add website/assets/css/tokens.css
git commit -m "$(cat <<'EOF'
feat(tokens): AD-017 reactivate Amber/Teal/Brick + 5 soft tints

Tonal Warm puro (sessão 2026-05-24) descontinuado. Volta paleta
AD-008 extendida com 5 novos soft tints pra suportar cards pastel
estilo Awake: amber-soft, teal-soft, brick-soft, warm-neutral,
sage-soft.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3.2: Add home-specific component styles to components.css

**Files:**
- Modify: `website/assets/css/components.css` (append at end of file)

- [ ] **Step 1: Find end of file**

Run: `tail -10 website/assets/css/components.css`

- [ ] **Step 2: Append new components**

Append to end of `components.css`:

```css

/* =========================================================================
   AD-017 · Awake-style components for home reset
   ========================================================================= */

/* ---- Pastel pillar card (used in 3 pilares) ---- */
.home-pillar {
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-6);
  min-height: 240px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.home-pillar-amber { background: var(--tint-amber-soft); }
.home-pillar-teal  { background: var(--tint-teal-soft); }
.home-pillar-brick { background: var(--tint-brick-soft); }
.home-pillar-icon {
  width: 40px;
  height: 40px;
  background: rgba(28,27,24,.08);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fg-primary);
}
.home-pillar h3 {
  font-size: var(--fs-h4);
  font-weight: var(--fw-bold);
  color: var(--fg-primary);
  margin: var(--space-2) 0 0;
  letter-spacing: var(--ls-tight);
}
.home-pillar p {
  font-size: var(--fs-body-sm);
  line-height: var(--lh-relaxed);
  color: var(--fg-secondary);
  margin: 0;
}

/* ---- Logo placeholder strip ---- */
.logo-ph {
  font-family: var(--font-mono);
  font-size: var(--fs-body-sm);
  color: var(--fg-tertiary);
  opacity: .7;
}
```

- [ ] **Step 3: Verify**

Run: `grep -c "home-pillar-amber" website/assets/css/components.css`
Expected: `1`.

- [ ] **Step 4: Commit**

```bash
git add website/assets/css/components.css
git commit -m "$(cat <<'EOF'
feat(components): add home-pillar + logo-ph for Awake-style home

3 variantes pastel (amber/teal/brick) usando soft tints AD-017.
Logo placeholder strip styling. Aplicado pelo pages.css na próxima
task.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3.3: Rewrite home sections in pages.css

**Files:**
- Modify: `website/assets/css/pages.css` (replace `#slot-dinamico` block and add new `.home-*` selectors)

- [ ] **Step 1: Replace `#slot-dinamico` block (lines 9-16) with home selectors**

Find:
```css
/* ---- Home — slot dinâmico ---- */
#slot-dinamico {
  text-align: center;

  & h2 { margin-top: var(--space-3); margin-bottom: var(--space-3); color: var(--fg-primary); }
  & p { color: var(--fg-secondary); }
  & .btn { margin-top: var(--space-5); }
}
```

Replace with:

```css
/* =========================================================================
   HOME — Awake-style reset (AD-014/015/016/017, 2026-05-24)
   ========================================================================= */

/* ---- Home hero ---- */
.home-hero {
  padding-block: var(--space-24) var(--space-20);
  text-align: center;
  background: linear-gradient(180deg, var(--bg-raised) 0%, var(--bg-base) 100%);
}
.home-hero-inner {
  max-width: 880px;
}
.home-hero-h1 {
  font-size: clamp(40px, 6vw, 88px);
  line-height: var(--lh-display);
  letter-spacing: var(--ls-tightest);
  font-weight: var(--fw-black);
  margin: 0 0 var(--space-6);
  max-width: 16ch;
  margin-inline: auto;
}
.home-hero-h1 em {
  font-family: 'Iowan Old Style', Georgia, serif;
  font-style: italic;
  font-weight: var(--fw-regular);
  letter-spacing: -.02em;
}
.home-hero-num {
  color: var(--accent-amber);
}
.home-hero-sub {
  font-size: var(--fs-body-lg);
  line-height: var(--lh-normal);
  color: var(--fg-secondary);
  max-width: 56ch;
  margin: 0 auto var(--space-8);
}
.home-hero-form {
  display: flex;
  gap: var(--space-2);
  max-width: 480px;
  margin: 0 auto;
}
.home-hero-form input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  font-size: var(--fs-body-sm);
  font-family: var(--font-body);
  background: var(--bg-raised);
}
.home-hero-form .btn {
  margin: 0;
}
.home-hero-disclaimer {
  font-size: var(--fs-caption);
  color: var(--fg-tertiary);
  margin: var(--space-4) auto 0;
}

/* ---- Home logos strip ---- */
.home-logos {
  padding-block: var(--space-12);
  border-block: 1px solid var(--border-subtle);
}
.home-logos-label {
  text-align: center;
  font-size: var(--fs-body-sm);
  color: var(--fg-tertiary);
  margin: 0 0 var(--space-6);
}
.home-logos-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-12);
  align-items: center;
}

/* ---- Home 3 pilares ---- */
.home-pillars {
  padding-block: var(--space-20);
}
.home-pillars-head {
  text-align: center;
  margin-bottom: var(--space-12);
}
.home-pillars-h2 {
  font-size: clamp(28px, 4vw, 48px);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-display);
  font-weight: var(--fw-black);
  margin: 0 0 var(--space-3);
}
.home-pillars-sub {
  font-size: var(--fs-body);
  color: var(--fg-secondary);
  max-width: 56ch;
  margin: 0 auto;
}
.home-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
@media (max-width: 720px) {
  .home-pillars-grid { grid-template-columns: 1fr; }
}

/* ---- Home meetup highlight ---- */
.home-meetup {
  padding-block: var(--space-16);
  background: var(--tint-warm-neutral);
}
.home-meetup-inner {
  text-align: center;
  max-width: 720px;
}
.home-meetup-eye {
  font-family: var(--font-mono);
  font-size: var(--fs-caption);
  letter-spacing: var(--ls-loud);
  text-transform: uppercase;
  color: var(--accent-teal-dim);
}
.home-meetup-h2 {
  font-size: clamp(24px, 3.4vw, 40px);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-display);
  font-weight: var(--fw-bold);
  margin: var(--space-4) 0 var(--space-3);
}
.home-meetup-sub {
  font-size: var(--fs-body);
  color: var(--fg-secondary);
  margin: 0 0 var(--space-6);
}

/* ---- Home closer CTA ---- */
.home-cta-final {
  padding-block: var(--space-20);
  text-align: center;
  background: linear-gradient(180deg, var(--tint-amber-soft) 0%, var(--bg-base) 100%);
}
.home-cta-inner {
  max-width: 720px;
}
.home-cta-h2 {
  font-size: clamp(32px, 5vw, 64px);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-tightest);
  font-weight: var(--fw-black);
  margin: 0 0 var(--space-4);
  max-width: 20ch;
  margin-inline: auto;
}
.home-cta-sub {
  font-size: var(--fs-body);
  color: var(--fg-secondary);
  max-width: 52ch;
  margin: 0 auto var(--space-6);
}
```

- [ ] **Step 2: Verify all classes present**

Run: `grep -cE "\.home-(hero|logos|pillars|meetup|cta)" website/assets/css/pages.css`
Expected: `>= 20`.

- [ ] **Step 3: Commit**

```bash
git add website/assets/css/pages.css
git commit -m "$(cat <<'EOF'
feat(pages): home Awake-style — hero + logos + 3 pilares + meetup + closer

Substitui #slot-dinamico por 5 grupos de seletores .home-*.
Hero centrado com display Black 900 + italic serif emphasis +
form de email. 3 pilares em grid 3-col com cards pastel.
Meetup highlight + closer com gradient amber.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3.4: Local preview + smoke test

**Files:**
- None (verification only)

- [ ] **Step 1: Run local preview**

Run in foreground: `python3 -m http.server 8788 -d website`

- [ ] **Step 2: Open `http://localhost:8788/` and inspect**

Visual checks:
- Hero "#1 Comunidade de Growth Multidisciplinar do Brasil" renders with `#1` in amber + "Multidisciplinar" in italic serif
- Email form below has input + "Fazer parte" button
- Logos strip visible with `[Logo N]` placeholders aligned in row
- 3 pilares appear as colored pastel cards (amber/teal/brick), each ~240px min-height, icon top-left, h3+p below
- Meetup section has warm beige background
- Closer has amber gradient fading to paper
- No layout breaks at viewport widths 360px, 768px, 1280px

- [ ] **Step 3: Hard refresh in incognito to bypass cache**

`Cmd+Shift+R` in Chrome incognito. Verify same visual.

- [ ] **Step 4: Stop server**

`Ctrl+C`.

- [ ] **Step 5: Iterate if needed**

If anything broken: open the failing CSS file, fix the issue, commit with prefix `fix(home): <what broke>`, restart preview, re-verify. Cap at 3 iterations. If still broken after 3, flag to user for review.

---

### Task 3.5: Cache-bust CSS

**Files:**
- Modify: HTML files that reference CSS (auto-handled by script)

- [ ] **Step 1: Run cache-bust script**

Run: `./bin/bump-css-version.sh`
Expected: stdout shows new version (format `?v=YYYYMMDD[letter]`) and confirms files updated.

- [ ] **Step 2: Verify**

Run: `grep -l "?v=2026052" website/*.html | head -3`
Expected: `index.html` and other top-level pages in the list.

- [ ] **Step 3: Commit**

```bash
git add website/
git commit -m "$(cat <<'EOF'
chore(site): bump CSS cache version pre-deploy

Cache-bust antes do deploy do reset. Browsers vão recarregar
tokens.css + pages.css + components.css com a versão nova.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3.6: Deploy to Cloudflare Pages

**Files:**
- None (deploy command)

- [ ] **Step 1: Confirm wrangler is logged in**

Run: `wrangler whoami`
Expected: account info shown. If not logged in: ask user to run `! wrangler login` (interactive — needs to happen in user's terminal).

- [ ] **Step 2: Deploy**

Run:
```bash
wrangler pages deploy website --project-name growth-club --branch main
```
Expected: deploy URL printed, takes ~30-60s.

- [ ] **Step 3: Verify production**

Open `https://growthclub.pro/` in incognito browser.

Same visual checks as Task 3.4 Step 2, plus:
- View page source — `<link rel="stylesheet" href="/assets/css/tokens.css?v=...">` has the new version string.
- No console errors.
- Performance: home First Contentful Paint < 2s on desktop.

- [ ] **Step 4: Tell user**

> "Phase 3 deployed to growthclub.pro. Home now renders with reset copy + Awake-style visual. Test on mobile and desktop. If anything's off, flag specific section and I patch in a new task before Phase 4 starts."

---

### Task 3.7: Phase 3 close — verify

- [ ] **Step 1: Confirm all changes are merged to main**

Run: `git log --oneline -10`
Expected: see commits for Tasks 3.1-3.6 in recent history.

- [ ] **Step 2: Get user OK to proceed**

Wait for explicit `proceed phase 4`.

---

## ============================================
## PHASE 4 — CLAUDE.md + memory + CHANGELOG sync
## ============================================

Gate: Phase 3 deployed and verified. Phase 4 only touches documentation.

### Task 4.1: Update CLAUDE.md — Project at a glance

**Files:**
- Modify: `CLAUDE.md` lines ~7-20 (`## Project at a glance` section)

- [ ] **Step 1: Read current section**

Run: `sed -n '5,25p' CLAUDE.md`

- [ ] **Step 2: Replace `Ton-anchor` and `Archetype` lines**

Find:
```markdown
- **Ton-anchor:** `"Franco, com número, sem palco, com cerveja."` (locked — see `brand/decisions/03-arquetipo-e-tom.md`)
- **Archetype:** Outlaw + Sage (locked)
```

Replace with:
```markdown
- **Ton-anchor:** `"Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."` (reset 2026-05-24 — see `brand/decisions/05-archetype-multidisciplinar.md`; old version in `brand/legacy/2026-05-24-archetype-outlaw-sage.md`)
- **Archetype:** Hero + Magician multidisciplinar (reset AD-014, 2026-05-24)
- **Positioning:** "A #1 Comunidade de Growth Multidisciplinar do Brasil" — marketing + vendas + sucesso de clientes + analytics + produtos + founders (AD-015)
```

- [ ] **Step 3: Find and update "Cultural rule #1" line**

Find: `4. **Cultural rule #1 (editorial):** \`Se não tem número, não é Growth Club.\``

Replace with: `4. **Cultural rule #1:** (aposentada AD-016, 2026-05-24) — sem régua editorial nominal pública após o reset. Curadoria continua via triagem de candidatura, sem rótulo de filtro.`

- [ ] **Step 4: Verify**

Run: `grep -c "Hero + Magician" CLAUDE.md`
Expected: `1`.

Run: `grep -c "Outlaw + Sage (locked)" CLAUDE.md`
Expected: `0`.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "$(cat <<'EOF'
docs(claude): sync CLAUDE.md with AD-014/015/016 reset

Atualiza Project at a glance: ton-anchor, archetype, positioning.
Régua editorial #1 marcada como aposentada.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4.2: Update memory/project_growth_club_context.md

**Files:**
- Modify: `/Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/project_growth_club_context.md`

- [ ] **Step 1: Read current content**

Run: `cat /Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/project_growth_club_context.md`

- [ ] **Step 2: Append a "Reset 2026-05-24" section at end**

Use Edit tool. Find end of file. Append:

```markdown

## Reset 2026-05-24

Brand reset: archetype Outlaw+Sage → Hero+Magician multidisciplinar. Ton-anchor "Franco, com número, sem palco, com cerveja" aposentado. Régua editorial "Se não tem número, não é Growth Club" aposentada. Headline oficial: "A #1 Comunidade de Growth Multidisciplinar do Brasil". Audiência expandida de B2B-curado pra multi-disciplinar (marketing + vendas + CS + analytics + produtos + founders). Tonal Warm puro descartado; AD-008 reativado com soft tints. Detalhes: `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`. ADRs: AD-014 (archetype), AD-015 (positioning), AD-016 (régua), AD-017 (paleta).

**Why:** Founder concluiu que a voz franca/anti-palco não capturava a comunidade que ele quer construir. Referência adotada: `growth-brazil.webflow.io` (copy/estrutura) + `henriques-amazing-site-a39ead.webflow.io` (visual Awake-style).

**How to apply:** todo Outlaw+Sage / "Franco com cerveja" / "Se não tem número" mencionado em conversas anteriores está superseded. Conversa nova com Henrique sobre Growth Club assume o estado pós-reset por default. Material em `brand/legacy/` é histórico, não direção ativa.
```

- [ ] **Step 3: Verify**

Run: `grep -c "Reset 2026-05-24" /Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/project_growth_club_context.md`
Expected: `1`.

- [ ] **Step 4: Commit (memory is gitignored — skip commit, just save)**

Memory directory is outside repo (`~/.claude/projects/...`) and not part of git. No commit needed.

---

### Task 4.3: Update memory/feedback_humanizer_radical.md

**Files:**
- Modify: `/Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/feedback_humanizer_radical.md`

- [ ] **Step 1: Read current content**

Run: `cat /Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/feedback_humanizer_radical.md`

- [ ] **Step 2: Append override note**

Use Edit tool. Append to end of file:

```markdown

## Humanizer override scope 2026-05-24

Henrique autorizou explicitamente override do Humanizer skill para a copy LITERAL da home (headline #1, "elite do mercado", "épicos encontros ocasionais", etc) durante o reset de marca 2026-05-24. Decisão: copy passada por Humanizer continua sendo o default, **exceto** pra: (1) home `website/index.html`; (2) `brand/voice/manifesto.md` v2; (3) páginas que copiam estrutura da home no futuro.

Humanizer continua valendo para: newsletter Substack, posts LinkedIn, descrições de produto, ad copy, e-mails transacionais, copy de páginas de produto (AI LIKE A PRO, etc), pages auxiliares (/membro, /empresas, /sobre).

**Why:** Decisão estratégica do founder, não preferência de estilo. Documentada em `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md` §8 Risk #2.

**How to apply:** se o Henrique pedir nova copy num desses 3 escopos overridden, NÃO passar por Humanizer. Em qualquer outro escopo, default é passar por Humanizer.
```

- [ ] **Step 3: Verify**

Run: `grep -c "Humanizer override scope 2026-05-24" /Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/feedback_humanizer_radical.md`
Expected: `1`.

- [ ] **Step 4: No commit (gitignored)**

---

### Task 4.4: Append entry to CHANGELOG.md

**Files:**
- Modify: `CHANGELOG.md` (prepend new entry at top, after header)

- [ ] **Step 1: Read top of CHANGELOG.md**

Run: `head -20 CHANGELOG.md`

- [ ] **Step 2: Insert new entry**

Insert AFTER the file header / top-most section heading, but BEFORE the most recent dated entry. Format (match existing style):

```markdown
## 2026-05-24 — Brand reset: Hero+Magician multidisciplinar

- **AD-014:** archetype Outlaw+Sage → Hero+Magician aspiracional. Ton-anchor "Franco, com número, sem palco, com cerveja." aposentado.
- **AD-015:** positioning B2B-curado → comunidade multidisciplinar (marketing + vendas + CS + analytics + produtos + founders).
- **AD-016:** régua editorial "Se não tem número, não é Growth Club." aposentada. Sem régua substituta no curto prazo.
- **AD-017:** AD-008 paleta reativada com 5 soft tints novos (amber/teal/brick/warm-neutral/sage-soft).
- Home reescrita (`website/index.html`): hero "#1 Comunidade", logos strip, 3 pilares (Encontre Talentos / Conteúdo Denso / Vibe Única), meetup highlight com "épicos encontros ocasionais", closer "comunidade mais engajada".
- `brand/decisions/03-arquetipo-e-tom.md` arquivado em `brand/legacy/`. `brand/voice/` (4 arquivos) arquivado em `brand/legacy/voice-2026-04/`. Novos `brand/decisions/05-archetype-multidisciplinar.md` + `brand/voice/manifesto.md` v2.
- Spec: `docs/superpowers/specs/2026-05-24-growth-club-reset-pivot-design.md`. Plan: `docs/superpowers/plans/2026-05-24-growth-club-reset-pivot-implementation.md`.
```

- [ ] **Step 3: Verify**

Run: `grep -c "Brand reset: Hero+Magician multidisciplinar" CHANGELOG.md`
Expected: `1`.

- [ ] **Step 4: Commit**

```bash
git add CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(changelog): 2026-05-24 brand reset entry

Resumo público das mudanças AD-014..AD-017 e dos arquivos
afetados. Apontamento pra spec + plan completos.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4.5: Phase 4 close — final report

**Files:**
- None (verification + report)

- [ ] **Step 1: Run final verification sweep**

Run:
```bash
echo "--- ADRs in STATE.md ---"
grep -E "^### AD-01[4-7]" .specs/project/STATE.md
echo "--- New brand files ---"
ls brand/decisions/05-archetype-multidisciplinar.md brand/voice/manifesto.md
echo "--- Legacy archive ---"
ls brand/legacy/2026-05-24-archetype-outlaw-sage.md brand/legacy/voice-2026-04/
echo "--- Site copy residue check ---"
grep -rliE "outlaw|sem palco|franco com|rataria" website/ --include="*.html" || echo "no residue"
echo "--- CLAUDE.md sync ---"
grep -c "Hero + Magician\|AD-014\|AD-015\|AD-016\|AD-017" CLAUDE.md
echo "--- CHANGELOG.md sync ---"
grep -c "2026-05-24 — Brand reset" CHANGELOG.md
echo "--- Memory sync ---"
grep -l "Reset 2026-05-24\|Humanizer override scope 2026-05-24" /Users/henriquecaner/.claude/projects/-Users-henriquecaner-Documents-GitHub-Growth-Club/memory/*.md
echo "--- Production smoke ---"
curl -sI https://growthclub.pro/ | head -3
```

Expected: all sections show non-empty output; no residue files listed; production returns `200 OK`.

- [ ] **Step 2: Tell user**

> "Reset complete. 4 phases × ~30 tasks executed. AD-014/015/016/017 logged. Home live at growthclub.pro with new copy + visual. brand/legacy/ preserves all old artifacts (1 git mv away from reversal). CLAUDE.md + CHANGELOG + memory in sync. Spec + this plan archived in docs/. Open Questions §6 of the spec (régua editorial decision, 4 espaços vs 3 pilares, logos source, testimonials, pricing, AD-013 touch) remain unresolved — surface them when ready to address."

- [ ] **Step 3: Run post-execution-sync workflow**

Per `.agents/workflows/post-execution-sync.md`, since this was a COMPLEX/ORCHESTRATE task: review whether STACK.md / ARCHITECTURE.md / CONVENTIONS.md need updates. Likely no — the reset didn't change stack, architecture, or conventions. Confirm with user before any further `.specs/project/` edits.

---

## Self-review notes

(Author's internal check — not shown to executor.)

**Spec coverage:** spec §2 (verbatim copy) → Tasks 2.2-2.5. Spec §3 (9 invalidated items) → Phase 1 Tasks 1.1-1.8 covers items #1-6; item #7 (home copy AD-011/013 overwrite) → Tasks 2.1-2.5; items #8-9 (CLAUDE.md + memory) → Tasks 4.1-4.3. Spec §4 phased plan → 4 Phases of this plan match 1:1. Spec §5 reversibility → encoded in each Phase's commit-per-step structure + archive-not-delete. Spec §6 open questions → flagged in Task 2.3 (logos) and 4.5 close. Spec §7 definition of done → Tasks 1.9, 2.7, 3.7, 4.5 are explicit Phase closes. Spec §8 risk #1 (oscillation) → 24h cooldown between Phase 1 and 2 enforced in Task 1.9 Step 5. Spec §9 approval gate → user already gave "ok" on the spec; plan execution requires per-phase confirmation, which is built into close tasks.

**Placeholder scan:** searched for TBD/TODO/fill-in — none. All code blocks have real content.

**Type consistency:** class names `.home-hero-*`, `.home-pillar*`, `.home-meetup-*`, `.home-cta-*`, `.home-logos-*` used consistently across Tasks 2.2-2.5 (HTML) and 3.2-3.3 (CSS). AD numbers AD-014..AD-017 consistent across all phases. Token names `--tint-amber-soft` etc. consistent between tokens.css (Task 3.1) and components.css (Task 3.2). File paths consistent throughout.

**Ambiguity check:** Task 2.6 explicitly flags >5-residue files for user review instead of auto-edit. Task 3.4 caps iteration at 3 before flagging. Task 3.6 Step 1 explicitly defers `wrangler login` to user via `!` prefix. Memory updates (Tasks 4.2-4.3) explicitly state "no commit, gitignored" to avoid confusion.

**Scope check:** single plan, ~30 tasks, ~3-5 hours total. Could be decomposed into 4 sub-plans (one per Phase) if user wants finer review checkpoints, but 24h cooldown gate after Phase 1 is sufficient natural break.
