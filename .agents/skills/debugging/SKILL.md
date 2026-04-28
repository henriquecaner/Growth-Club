---
name: debugging
description: Systematic debugging workflow. Use when investigating bugs, unexpected behavior, errors, or performance issues.
version: 1.0.0
author: {{PROJECT_NAME}}
---

# Role: Debugger

> **Purpose:** Systematically isolate and fix bugs using evidence-based reasoning, not guesswork.

---

## 1. CONTEXT PROTOCOL (Read First)
Before debugging, you MUST read/verify:
1.  **Architecture:** `.specs/project/ARCHITECTURE.md` — Understand the system flow.
2.  **Known Issues:** `.specs/project/STATE.md` — Check if this is a known issue.
3.  **Decision Log:** `.specs/project/STATE.md` — Check if behavior is intentional.

---

## 2. CORE DIRECTIVES (The Rules)

*   **Evidence First:** Never guess. Read logs, check data, reproduce the issue before proposing fixes.
*   **Isolate Before Fixing:** Identify the exact file, function, and line before writing a fix.
*   **One Change at a Time:** Make one targeted fix, then verify. Never shotgun-debug.
*   **Document Findings:** Update `.specs/project/STATE.md` if the bug reveals a systemic issue.

---

## 3. DEBUGGING WORKFLOW (The 5-Step Method)

### Step 1: REPRODUCE
- Get exact steps to reproduce the issue.
- Identify: What was expected? What actually happened?
- Note environment details (dev/staging/prod, browser, OS).

### Step 2: GATHER EVIDENCE
- Read error messages and stack traces **completely**.
- Check server logs, browser console, network tab.
- Identify the **last working state** — what changed since then?
- Check recent commits/deploys that may have introduced the bug.

### Step 3: HYPOTHESIZE
- Based on evidence, form **2-3 hypotheses** ranked by likelihood.
- For each hypothesis, identify:
  - What file(s) are involved?
  - What test would prove/disprove it?

```markdown
| # | Hypothesis | Likelihood | Test |
|---|-----------|------------|------|
| 1 | [Most likely cause] | HIGH | [How to verify] |
| 2 | [Second cause] | MED | [How to verify] |
| 3 | [Edge case] | LOW | [How to verify] |
```

### Step 4: TEST & ISOLATE
- Test hypotheses **in order** (most likely first).
- Use targeted techniques:
  - **Add logging** at suspected failure points.
  - **Read the code path** from entry to failure.
  - **Check data** — is the input what you expect?
  - **Binary search** — if unsure where it breaks, add a log in the middle.
- Stop when you find the **root cause**, not just a symptom.

### Step 5: FIX & VERIFY
- Write the **minimal fix** for the root cause.
- Verify the fix:
  - [ ] Original bug is resolved.
  - [ ] No regressions (run test suite).
  - [ ] Edge cases handled.
- Clean up debugging artifacts (remove added logs).
- Add a test that catches this specific bug.

---

## 4. DEBUGGING TOOLKIT

### Quick Commands
```bash
# Search for error messages in codebase
grep -rn "error message text" src/ server/

# Find recent changes to a file
git log --oneline -10 path/to/file

# Check what changed since last working commit
git diff <last-good-commit> -- path/to/file

# Find all usages of a function
grep -rn "functionName" src/ server/ --include="*.ts"
```

### Database Debugging
```sql
-- Check recent records
SELECT * FROM [table] ORDER BY created_at DESC LIMIT 10;

-- Verify data integrity
SELECT COUNT(*), [column] FROM [table] GROUP BY [column];
```

---

## 5. ANTI-PATTERNS (What to Avoid)
*   ⛔ **Don't:** Guess and apply random fixes hoping something works.
*   ⛔ **Don't:** Change multiple things at once — you won't know what fixed it.
*   ⛔ **Don't:** Ignore the stack trace — it usually points to the exact problem.
*   ⛔ **Don't:** Fix symptoms instead of root causes (e.g., wrapping in try/catch without fixing the error).
*   ⛔ **Don't:** Leave debugging logs in production code.

---

## 6. COMMON PATTERNS

| Symptom | Common Root Cause | Where to Look |
|---------|------------------|---------------|
| `undefined is not a function` | Import path wrong or circular dependency | Check imports, barrel exports |
| `401 Unauthorized` | Token expired, auth middleware misconfigured | Auth provider config, middleware order |
| `500 Internal Server Error` | Unhandled exception in async code | Look for missing `await` or uncaught promises |
| Data not updating | Cache serving stale data, or mutation not invalidating | Cache layer, query invalidation |
| Intermittent failures | Race condition or timeout | Look for concurrent writes, async ordering |
| Works locally, fails in prod | Environment variable missing or different config | Compare `.env` files, check deployment logs |
