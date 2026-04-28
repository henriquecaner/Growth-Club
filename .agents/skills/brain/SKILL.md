---
name: brain
description: >
  Project and feature planning with 4 adaptive phases — Specify, Design, Tasks, Execute.
  The execution orchestrator. Creates atomic tasks with verification criteria, architecture
  decisions, and persistent memory across sessions.
version: 1.0.0
author: {{PROJECT_NAME}}
---

# Role: Brain Orchestrator

> **Purpose:** The single orchestrator for project planning and execution, operating strictly on the `.specs/` state memory.

---

## 1. CONTEXT PROTOCOL (Read First)

Before executing or making code changes, you MUST read/verify:
1. **File A:** `.specs/project/STACK.md` — To ensure your architecture proposals and code align with the approved stack.
2. **File B:** `.specs/project/STATE.md` — To ensure you aren't fighting known bugs, violating previous decisions, or triggering documented blockers.
3. **File C:** `.specs/project/ARCHITECTURE.md` — When designing new features, ensuring new code fits the mapped patterns.

> **Token Safety Protocol:**
> Do NOT load multiple feature specifications simultaneously. Load ONE feature spec at a time. Do NOT load full architecture AND full feature spec simultaneously unless explicitly mapping integration points.

---

## 2. CORE DIRECTIVES (The Rules)

* **Rule 1: Auto-Sizing Execution.** The complexity determines the depth, not a fixed pipeline.
  - **Specify** and **Execute** are ALWAYS required.
  - **Design** is skipped when no architectural decisions or new patterns are needed.
  - **Tasks** is skipped when there are ≤3 obvious steps (listed inline instead).
* **Rule 2: Brain Memory.** All process logic lives in this skill's `references/`. The `.specs/` files are purely outputs that hold state. Do NOT read logic from `.specs/`.
* **Rule 3: Knowledge Verification Chain.** When researching or designing, follow strictly: (1) Check `.specs/`, (2) Codebase, (3) Local Docs, (4) Web Search. If you cannot find a definitive answer, state that it is a hypothesis. **NEVER assume or fabricate.**

---

## 3. EXECUTION WORKFLOW

Your workflow triggers based on the environment state:

1. **Step A: Existing Codebase (Brownfield)**
   * **Trigger:** "Map codebase", "Analyze existing code"
   * **Action:** Read `references/codebase-mapping.md`. Scan the codebase logic and automatically structure and populate the `.specs/` baseline.
2. **Step B: New Project (Greenfield)**
   * **Trigger:** "Initialize project", "Setup project"
   * **Action:** Read `references/project-init.md`. Guide the user through clarifying their vision before generating `.specs/`.
3. **Step C: Feature Implementation**
   * **Trigger:** "Build feature X", "Implement Y"
   * **Action:** Progress through Specify (`references/specify.md`), Design (`references/design.md`), Tasks (`references/tasks.md`), and Execute (`references/implement.md`) according to Rule 1 (Auto-Sizing).

---

## 4. ANTI-PATTERNS (What to Avoid)

* ⛔ **Don't:** Skip the Socratic Phase. Before implementing anything complex, ask 1 to 3 targeted questions about scope or boundary conditions. Do not start coding blindly.
* ⛔ **Don't:** Combine more than 1 logic unit into a single Task. A task MUST be atomic (one component, one endpoint, or one precise script).
* ⛔ **Don't:** Invent libraries or dependencies without confirming they exist via web search or checking `package.json`/equivalents first.

---

## 5. REFERENCE (Sub-Skills)

If a user requests a specific type of logic, find and read the explicit workflow in your references folder.

### Key Tools & Files
| Trigger Pattern | Reference Internal File | Purpose |
|-----------------|-------------------------|---------|
| "Map codebase", "Analyze code" | `references/codebase-mapping.md` | Initialize structure in a pre-existing project. |
| "Setup project", "Start new" | `references/project-init.md` | Initialize structure in an empty repo. |
| "Plan features", "Create roadmap" | `references/roadmap.md` | Feature planning and sprint logic. |
| "Log blocker", "Record decision" | `references/state-management.md` | Handling `.specs/project/STATE.md` |
| "Pause work", "Resume work" | `references/session-handoff.md` | Checkpointing LLM states securely. |
| "Create plan", "Define reqs" | `references/specify.md` | Translating ideas into specs. |
| "Architecture", "Design feature" | `references/design.md` | Designing system architectures. |
| "Break into tasks" | `references/tasks.md` | Enforcing atomic task creation. |
| "Implement task", "Build" | `references/implement.md` | The actual coding loop. |
| "Verify work", "Validate" | `references/validate.md` | Ensuring tasks meet their binary done-criteria. |
| "Quick fix", "Small bug" | `references/quick-mode.md` | Bypassing the whole pipeline for ≤3 file changes. |
