# Tasks

**Goal**: Break into GRANULAR, ATOMIC tasks. Clear dependencies. Right tools. Parallel execution plan.

**Skip this phase when:** There are ≤3 obvious steps. In that case, tasks are implicit — go straight to Execute and list them inline.

## Why Granular Tasks?

| Vague Task (BAD) | Granular Tasks (GOOD)             |
| ---------------- | --------------------------------- |
| "Create form"    | T-01: Create email input comp  |
|                  | T-02: Add email validation fn  |
|                  | T-03: Create submit button     |
|                  | T-04: Add form state mgt       |

**Rule**: One task = ONE of these:
- One component
- One function
- One API endpoint
- One file change

---

## Process

### 1. Review Design
Read `/.specs/features/[feature]/design.md` before creating tasks (if available).

### 2. Break Into Atomic Tasks
**Task = ONE deliverable**. Examples:
- ✅ "Create UserService interface" (one file, one concept)
- ❌ "Implement user management" (too vague, multiple files)

### 3. Define Dependencies
What MUST be done before this task can start?

### 4. Create Execution Plan
Group tasks into `Phase 1 (Sequential)`, `Phase 2 (Parallel OK)`, etc.

### 5. Output: /.specs/[feature]/tasks.md

Write the breakdown into `/.specs/[feature]/tasks.md` following its template. Do not create `.specs/[feature]/tasks.md`! The `tasks.md` file is the SINGLE source of truth for active work.

The file has an `Execution Plan` section and a tabular `Task Breakdown`.
Ensure every task includes a **Done When** column with clear, binary success criteria (e.g. "Types pass, file exports X").

---

## Task Granularity Check

Before approving tasks, verify they are granular enough:
- ✅ 1 component / 1 function / 1 endpoint = Good
- ⚠️ 2-3 related things in same file = OK if cohesive
- ❌ Multiple components or files = MUST split

## Tips

- **Reuses = Token saver** — Always reference existing code if applicable
- **Dependencies are gates** — Clear what blocks what
- **Done when = Testable** — If you can't verify it, rewrite it
- **One task = One commit** — Plan the commit strategy
