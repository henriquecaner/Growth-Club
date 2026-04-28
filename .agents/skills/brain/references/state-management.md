# State Management

**Purpose:** Persistent memory across sessions - decisions, blockers, learnings, risks, deferred ideas.

## Structure

**Output:** `/.specs/project/STATE.md` 

Instead of creating `/.specs/project/STATE.md`, you will update the consolidated `/.specs/project/STATE.md`.

## Sections to Update:

### 1. Recent Decisions (ADR)
When you make a significant architectural choice, add an `AD-[NNN]` entry.
Include Status, Context, Decision, Consequences, and Alternatives.

### 2. Active Blockers
When implementation gets blocked, record `B-[NNN]` with Discovered Date, Impact, Workaround, and Resolution path.

### 3. Active Risks
When a systemic risk is identified (e.g. single point of failure), add `R-[NNN]` with Impact, Probability, and Mitigation.

### 4. Lessons Learned
When something important is discovered (a gotcha, a tricky error), add `L-[NNN]` with Context, Problem, Solution.

### 5. Deferred Ideas
Ideas captured during work that belong in future features. Prevents scope creep. 

## When to Update

| Event                            | Action                                 |
| -------------------------------- | -------------------------------------- |
| Significant architecture choice  | Append AD-[NNN] to Decisions           |
| Implementation stuck             | Append B-[NNN] to Blockers             |
| Systemic vulnerability found     | Append R-[NNN] to Risks                |
| Important debugging discovery    | Append L-[NNN] to Lessons              |
| User asks for scope creep        | Add to Deferred Ideas                  |

## Size Management (Hybrid Strategy)

**Zones:**
- 🟢 <7k tokens: No action
- 🟡 7-10k tokens: Footer note `STATE.md` at [X]k. Cleanup recommended."
- 🔴 >10k tokens: Active prompt `STATE.md` critical ([X]k). Cleanup now?"

**Cleanup process:**
- Move decisions >60 days to `STATE_ARCHIVED.md`
- Clear out resolved Blockers
