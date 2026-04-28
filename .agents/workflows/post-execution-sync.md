---
description: Post-execution context sync — automatically analyzes changes and updates Spec docs and Skills after complex tasks
---

# Post-Execution Sync Workflow

> **Trigger:** Run this workflow after completing any **COMPLEX** or **ORCHESTRATE** task (as classified by the Socratic Gate). Do NOT run for SIMPLE FIX or CLARIFY requests.

---

## When to Trigger

Run this sync when the completed work matches ANY of:
- Created or deleted files
- Changed module structure, imports, or dependencies
- Added/removed/refactored a feature
- Changed architectural patterns
- Introduced new tech, libraries, or integrations
- Made decisions with >10% project impact

**Skip** for: typo fixes, copy changes, single-line tweaks, style-only edits.

---

## Step 1: Analyze Impact

Before updating anything, classify what changed:

```
CHECKLIST:
- [ ] New files or directories created?
- [ ] Files deleted or moved?
- [ ] Module boundaries changed (new imports across modules)?
- [ ] New dependency added (npm, pip, etc.)?
- [ ] API surface changed (new/modified endpoints, props, contracts)?
- [ ] Architectural pattern introduced or modified?
- [ ] New domain/concept that doesn't have a Skill yet?
- [ ] Decision was made that affects future development?
```

---

## Step 2: Update Spec Documents

Based on the impact analysis, update **only** the relevant Spec docs:

### Priority: CRITICAL (always check)

| Condition | Action |
|-----------|--------|
| Task was tracked in `tasks.md` | Mark as `[DONE]`, update date |
| Any architectural change | Update `@ARCHITECTURE` with new structure |

### Priority: HIGH (check if applicable)

| Condition | Action |
|-----------|--------|
| Tech stack changed (new lib, tool, service) | Update `@STACK` tech stack section |
| UI/design tokens changed | Update `DESIGN_SYSTEM` |

### Priority: LOGGED (append if applicable)

| Condition | Action |
|-----------|--------|
| Architectural/stack decision was made | Append to `@STATE` |
| New risk identified during implementation | Append to `@STATE` |
| Sprint milestone reached | Update `@ROADMAP` |

---

## Step 3: Evaluate Skills

Check if the completed work reveals gaps in the Skills library:

### 3a. Does a new Skill need to exist?

A new skill is warranted when:
- A **new domain** was introduced (e.g., payments, i18n, websockets)
- A **recurring pattern** emerged that future tasks will need (e.g., migration workflow)
- A **complex integration** was set up that has specific rules (e.g., Stripe webhooks)

**If yes:** Create a skeleton at `.agents/skills/<skill-name>/SKILL.md` using the template in `.agents/skills/_template/`, and add the routing entry to `universal-agent-rules.md` §3 (Dynamic Skill Loading table).

### 3b. Does an existing Skill need updating?

An existing skill needs updating when:
- The implementation **deviated** from what the skill currently documents
- New **edge cases** or **gotchas** were discovered
- **Tooling or patterns** referenced by the skill changed

**If yes:** Update the relevant `SKILL.md` with the new learnings.

---

## Step 4: Report Summary

After syncing, provide a brief summary to the user:

```markdown
## 🔄 Post-Execution Sync Complete

**Spec Updates:**
- [list of .specs/ docs updated, or "None needed"]

**Skills:**
- [new skills created, existing skills updated, or "No changes needed"]

**Decision Log:**
- [decisions recorded, or "No new decisions"]
```

---

## Notes

- **Be surgical:** Only update docs that are actually affected. Do not rewrite entire documents.
- **Preserve history:** When updating `@STATE`, always append — never overwrite past entries.
- **Minimal diffs:** Update the specific section within a Spec doc, not the whole file.
- **User confirmation:** If unsure whether a change warrants a new Skill, ask the user before creating one.
