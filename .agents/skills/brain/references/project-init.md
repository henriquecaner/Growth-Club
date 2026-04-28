# Step B: Project Initialization (Greenfield)

**Trigger:** "Initialize project", "Setup project", "Start new project", "Initialize Step B"

## Process

Extract project vision via iterative Q&A (max 3-5 questions per message):

**Essential questions:**

1. What are you building?
2. Who is it for and what problem does it solve?
3. What tech stack are you using? (if known)
4. What's in scope for v1? What's explicitly excluded?
5. Critical constraints? (timeline, technical, resources)

**Stop when:** Clear understanding of vision, goals, and boundaries.

## Output 1: /.specs/project/STACK.md

**Structure:**

```markdown
# STACK: [Project Name]
**Last Updated:** [Date]

> **AI CONTEXT:** This document is the authoritative source of truth for the project's scope, tech stack, and goals. DO NOT guess or hallucinate these details. Always refer to this document.

---

## 1. Objective & Scope

### Mission
[1-2 sentence description of what you're building]

### Value Proposition
- **For:** [Target users/personas]
- **Problem:** [Core problem you're solving]
- **Solution:** [How your product solves it]

### In Scope
| Feature | Status | Description |
|---------|--------|-------------|
| [Feature] | 📋 TODO | [Brief description] |
| [Feature] | 📋 TODO | [Brief description] |

### Out of Scope (Future Roadmap)
- [Explicitly excluded feature 1]
- [Explicitly excluded feature 2]

---

## 2. Tech Stack

### Current Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND                                │
│  [Framework] + [Build Tool] + [Styling]                     │
└───────────────────────────┬─────────────────────────────────┘
                            │ [Protocol]
┌───────────────────────────▼─────────────────────────────────┐
│                     BACKEND                                 │
│  [Runtime] + [Framework] + [ORM] + [Validation]             │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Database    │   │   External    │   │     Auth      │
│   [Type]      │   │   Services    │   │   [Provider]  │
└───────────────┘   └───────────────┘   └───────────────┘
```

### Key Technologies
| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | [Stack choice] | SPA / SSR |
| Backend | [Stack choice] | API / Server |
| Database | [Stack choice] | Data persistence |

---

## 3. Stakeholders & Constraints
- Constraints: [timeline, tech, resources]

## 4. Success Metrics
- [Target metrics]
```

## Output 2: /.specs/project/ROADMAP.md

Draft a high-level roadmap based on the v1 scope. Group the features into milestones/sprints.

**Structure:**

```markdown
# ROADMAP
**Last Updated:** [Date]

## Phase 1: MVP (Month X)
- [ ] Core Setup
- [ ] Authentication
- [ ] Feature X (Core loop)

## Phase 2: Polish (Month Y)
- [ ] Analytics Integration
- [ ] Optimization
```

**Validation:**
- Vision is clear in 1-2 sentences.
- Goals have measurable outcomes.
- Scope boundaries are explicit.
- Both core docs are filled.
