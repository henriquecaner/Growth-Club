# Growth Club — Reset/Pivot Design Spec

**Date:** 2026-05-24
**Status:** Awaiting user approval before writing-plans
**Author:** brainstorming session (Claude Opus 4.7 + Henrique)
**Replaces parts of:** AD-001, AD-003, AD-008, AD-011, AD-013

---

## 1. Context

User opened a session asking to redesign the home of `growthclub.pro` ("design ruim, mistura de marrom"). Over 11 brainstorming iterations the direction oscillated through: minimalist tonal warm (option E) → Long Letter autoral (A3) → reject of Tonal Warm → adopt copy literal of `growth-brazil.webflow.io` → adopt usability of Growth Brazil → adopt design elements of `henriques-amazing-site-a39ead.webflow.io` (Awake-style template) → final user statement:

> "quero a copy exata que entreguei para você agora. Ela é o centro e a nova verdade. faça uma deep analise e refatore tudo."

The "copy exata" reference is the Growth Brazil literal copy (headline, sub-headline, 3 pillars Encontre Talentos / Conteúdo Denso / Vibe Única, footnote). User explicitly authorized override of the Humanizer skill flagging of AI-fingerprint patterns in that copy.

This is a **brand reset**, not a home redesign. It invalidates locked decisions in 4 ADs and supersedes 6 brand artifacts. This spec maps the impact, captures the new positioning verbatim, and proposes a phased plan with archive-not-delete reversibility.

---

## 2. Decision (verbatim — user override authorized)

### New headline
> "A #1 Comunidade de Growth Multidisciplinar do Brasil"

### New sub-headline
> "Somos remotos, criativos, gentis e engajados. Invista energia em seu crescimento ao lado de Founders, VPs, CMOs e especialistas que estão transformando o mercado."

### New pillars (3, replacing the 4 espaços)

**Encontre Talentos**
> "Alcance pessoas em nosso canal de contratação. Seja para um consultor pontual ou um funcionário full-time, a elite do mercado está aqui."

**Conteúdo Denso**
> "Curadoria diária e compartilhamento de conhecimento replicável. Newsletters, Lives Semanais e AMAs com os melhores do mundo."

**Vibe Única**
> "Novo ou avançado, tímido ou extrovertido. Nossos membros possuem ideias semelhantes e diferentes. Somos uma comunidade agnóstica onde a troca é real."

### Meetup footnote
> "Este meetup é um dos nossos 'épicos encontros ocasionais' para criar laços e memórias."

### Visual reference (usability + element style)
- **Usability (structure / flow):** `growth-brazil.webflow.io` — hero centered with email form, logos strip, dual 4-grid pillars, testimonials cards, mid CTA with form, experts grid, FAQ accordion, simple footer.
- **Design elements (look / pastel):** `henriques-amazing-site-a39ead.webflow.io` (Awake) — nav pill, hero display + italic serif emphasis, pill CTA with avatar circles, colored pastel cards (Amber/Teal/Brick soft tints), portraits inside colored circles, 2-card pricing with highlighted plan, gradient CTA final.

---

## 3. What is invalidated

Each item below has a `STATUS` action that Phase 1 will execute.

| # | Artifact | LOCKED in | Conflict | Action |
|---|----------|-----------|----------|--------|
| 1 | Archetype "Outlaw + Sage" | AD-003 + `brand/decisions/03-arquetipo-e-tom.md` | New voice is Hero+Magician aspirational | ARCHIVE → `brand/legacy/2026-05-24-archetype-outlaw-sage.md` |
| 2 | Ton-anchor "Franco, com número, sem palco, com cerveja." | AD-003 + voice manifesto | Sub-headline is "remotos, criativos, gentis, engajados" | ARCHIVE → record new anchor in new ADR |
| 3 | Editorial rule "Se não tem número, não é Growth Club." | AD-001 + cluster analysis AD-011 | Hero "#1 comunidade" is auto-coronation without proof | ARCHIVE → record new rule (if any) in new ADR |
| 4 | Positioning "Comunidade curada B2B" | AD-001 + AD-011 cluster analysis | New positioning is "comunidade multidisciplinar" (marketing + vendas + CS + analytics + produto + founders) | ARCHIVE business plan section §3-§5 → write new positioning §3-§5 in new spec |
| 5 | Voice manifesto (`brand/voice/manifesto.md`, 3 versions) | brand decisions Chunk 3 | "Franco com número" voice contradicts "remotos criativos gentis engajados" voice | ARCHIVE entire `brand/voice/` dir → `brand/legacy/voice/` |
| 6 | Tonal Warm design system (Paper #F7F5F0 + Charcoal + Ash, sem accent) | AD-008 + this session's earlier approval | Awake-inspired design requires accent colors (Amber/Teal/Brick reactivated as soft tints) | UPDATE `brand/system/` → reactivate AD-008 base palette as soft tints; new ADR documents this revival |
| 7 | Home copy refined in AD-011 + AD-013 | recent commits, copy refino home/membro/empresas | "Marketing com pipeline, vendas com previsibilidade", "Se não tem número não é Growth Club" → replaced by Growth Brazil literal | OVERWRITE `website/index.html` in Phase 3 |
| 8 | `CLAUDE.md` project context | top of file | Project-at-a-glance lines, "Domain", "Ton-anchor", "Archetype", "Cultural rule #1" | UPDATE after Phase 1+2 land |
| 9 | `memory/project_growth_club_context.md` + `memory/feedback_humanizer_radical.md` | global memory | Outlaw+Sage references; humanizer radical posture | UPDATE after Phase 1 ADRs |

### What stays (out of scope of this reset)

- **AD-002** Founder Crew (3 vagas, 30% revshare, sem equity Fase 1) — operational, unaffected by brand pivot.
- **AD-003** Founder Member tier parked — financial decision, unaffected.
- **AD-004** Hospedagem em Level Tech CNPJ — legal/operational, unaffected.
- **AD-005** Transparência financeira radical — operational, unaffected.
- **AD-006/AD-007** Site v1 stack (HTML5 + Modern CSS + Cloudflare Pages) — technical, unaffected. Files change, stack stays.
- **AD-009/AD-010** AI LIKE A PRO híbrido — separate product, unaffected.
- **AD-012** Modern Web Guidance plugin — tooling, unaffected.
- **AD-013** Refino técnico Phase 4 (sprite, view-transitions, fonts) — technical, unaffected. Tokens get updated but JS/component patterns stay.
- **Fonts:** Satoshi (display + body) + Roboto Mono — already self-hosted per AD-008, KEEP.
- **Spaces/products:** Newsletter + WhatsApp + Meetup + Livecast remain real operating channels. New copy describes them differently (under 3 broader pillars) but they keep existing.

---

## 4. Phased Plan

### Phase 1 — Brand reset (highest reversibility cost, do first)

**Goal:** make the new brand official, archive the old, register ADRs.

1. Append to `.specs/project/STATE.md`:
   - `AD-014` — Reset of archetype + ton-anchor (supersedes AD-003 in part)
   - `AD-015` — Reset of positioning to multidisciplinar (supersedes AD-001 §3-§5 in part)
   - `AD-016` — Reset of editorial rule "Se não tem número..." (supersedes AD-001 cultural rule #1)
   - `AD-017` — Reactivation of AD-008 extended palette as soft tints (supersedes the session's brief Tonal Warm pure approval)
2. `git mv brand/decisions/03-arquetipo-e-tom.md brand/legacy/2026-05-24-archetype-outlaw-sage.md`
3. `git mv brand/voice brand/legacy/voice-2026-04`
4. Write new `brand/decisions/04-archetype-multidisciplinar.md` capturing Hero+Magician aspirational with the new copy as primary source.
5. Write new `brand/voice/manifesto.md` (1 version) capturing the new tone — same template, new content.

### Phase 2 — Site copy (Phase 1 must merge first)

**Goal:** replace home copy with the new positioning + 3 pillars. Other pages (membro, empresas, ai-like-a-pro) get a copy audit but probably keep most of their content since they're functional.

1. Rewrite `website/index.html` `<title>` + `<meta>` + hero + problem (delete) + layers (now 3 pilares, not 4) + timeline (probably stay as 4 marcos) + closer (new closing line).
2. Audit `website/membro.html`, `website/empresas.html` for "se não tem número" / "franco com cerveja" / "outlaw" residues → replace.
3. Audit `website/sobre.html`, `website/meetups/` — content keeps if factual, voice updates if editorial.

### Phase 3 — Site visual (Phase 1+2 must merge first)

**Goal:** apply Awake-inspired structure with Growth Brazil usability, using reactivated AD-008 palette.

1. Update `website/assets/css/tokens.css`: reactivate Amber + Teal + Brick + add soft tint variables.
2. Update `website/assets/css/pages.css`: home gets nav pill, hero display + italic serif emphasis, pill CTA with avatar circles, 3-pillar grid with soft pastel cards (Amber soft / Teal soft / Brick soft), banner CTA dark, testimonials split (big dark + stat amber + reviews), pricing 2-card with featured Amber soft, FAQ accordion, accolades 3-card, gradient final CTA.
3. Update `gc-header` and `gc-footer` components if nav pill format requires it.
4. Run `./bin/bump-css-version.sh` before each deploy.

### Phase 4 — Memory + CLAUDE.md sync (after Phases 1-3 land)

**Goal:** keep `~/.claude/projects/.../memory/` and `CLAUDE.md` consistent with new state. Per `.agents/workflows/post-execution-sync.md`.

1. Update `CLAUDE.md` — "Project at a glance", "Locked decisions", "Plugins" sections.
2. Update `memory/project_growth_club_context.md` — new archetype, new positioning.
3. Update `memory/feedback_humanizer_radical.md` — note that user overrode the Humanizer skill for the home copy; humanizer still applies elsewhere unless explicitly waived.
4. Update `CHANGELOG.md` with `2026-05-24 — Brand reset to multidisciplinar / Hero+Magician (AD-014 to AD-017)`.

---

## 5. Reversibility plan

Each Phase is designed to fail safe:

- **Phase 1** is `git mv` of files + append to `STATE.md`. To revert: `git mv` back, append "revert" entry to STATE. Cost: 1 commit.
- **Phase 2** changes copy in HTML files only. To revert: `git revert` of the Phase 2 commits. Cost: 1 commit.
- **Phase 3** changes CSS tokens + pages.css + maybe components. To revert: `git revert` of the Phase 3 commits. Cost: 1 commit.
- **Phase 4** is documentation sync. To revert: `git revert`. Cost: 1 commit.

**Critical:** `brand/legacy/` keeps everything. Nothing is deleted. If in 30 days user wants Outlaw+Sage back, the files are one `git mv` away from being reactivated.

---

## 6. Open questions (decide in writing-plans, not now)

1. **Does the editorial rule "Se não tem número..." stay as cultural memory, or fully retire?** The Growth Brazil copy has no equivalent, but the user has 11 years of content built around it.
2. **Should the 4 spaces (Newsletter / WhatsApp / Meetup / Livecast) appear under one of the 3 pillars or become a 4th pillar?** Strict adoption says 3 pillars only; pragmatic says the spaces are real ops and need surface.
3. **Logos strip — who are the logos?** "Used by" + 7-11 logos. Need to know if these are companies where members work, or partner/sponsor logos.
4. **Testimonials — 3 real members with name + role + company?** Need user to source 3 quotes or authorize using placeholders for v1 launch.
5. **Pricing card content** — Growth Hacker (free) + Growth Hacker Master (R$690-990) still apply, or does pricing change in the pivot?
6. **AD-013 Phase 4 technical refino (sprite, fonts pruned, native details, view-transitions)** — keep as-is, none of it conflicts with the visual pivot.

---

## 7. Definition of done

Phase 1 done when:
- `STATE.md` has 4 new ADs appended
- `brand/legacy/` has the archived archetype + voice files
- `brand/decisions/04-archetype-multidisciplinar.md` exists
- `brand/voice/manifesto.md` rewritten

Phase 2 done when:
- `website/index.html` reflects new copy verbatim in hero + sub + 3 pillars
- Audit checklist for other pages completed (residues removed or marked safe)

Phase 3 done when:
- Tokens reactivated, pages.css updated, components updated
- `growthclub.pro` deployed with new home rendering correctly on mobile + desktop
- Lighthouse runs, no regression

Phase 4 done when:
- `CLAUDE.md` reflects new state
- `memory/` 2 files updated
- `CHANGELOG.md` has the entry

---

## 8. Risks

1. **Oscillation history.** This session alone had 7 directional pivots in ~6 hours. The cost of executing this spec is days of work; the cost of reverting is a few commits. The archive-not-delete protocol is the structural mitigation. Behavioral mitigation: do not start Phase 2 until Phase 1 is merged and has sat for at least 24h with no objection from user.
2. **Humanizer override scope.** User overrode humanizer for the home copy. CLAUDE.md says humanizer applies to all "prosa pública substancial". The Phase 4 memory update must clarify whether the override is home-only or applies broadly. Default assumption in this spec: home-only override; other copy (membro, empresas, newsletter, posts) continues passing through humanizer unless explicitly waived per artifact.
3. **External assets that already shipped.** The Substack newsletter (2.261 inscritos) has been published with the old voice. The WhatsApp Community has 715 members onboarded to the old voice. The pivot affects new content; existing artifacts stay. This is normal and not a risk to mitigate.

---

## 9. Approval gate

Before writing-plans runs:

- [ ] User reads Sections 2, 3, 4 above
- [ ] User confirms: "yes, Phase 1 (brand reset + archive) is authorized to execute"
- [ ] User confirms: "Open Questions §6 will be answered during writing-plans"
- [ ] User confirms: "Reversibility plan §5 is acceptable as safety net"

Once those 4 boxes are checked in conversation, the brainstorming session ends and writing-plans skill takes over with this spec as its input.
