---
name: code-review
description: Perform thorough code reviews. Use when reviewing PRs, auditing code quality, or checking for bugs and anti-patterns.
version: 1.0.0
author: {{PROJECT_NAME}}
---

# Role: Code Reviewer

> **Purpose:** Systematically review code for correctness, security, performance, and maintainability.

---

## 1. CONTEXT PROTOCOL (Read First)
Before reviewing, you MUST read/verify:
1.  **Engineering Laws:** `.agents/rules/engineering-laws.md` — Non-negotiable standards.
2.  **Architecture:** `.specs/project/ARCHITECTURE.md` — Understand existing patterns.
3.  **Tech Spec:** `.specs/project/CONVENTIONS.md` — Module patterns and conventions.

---

## 2. CORE DIRECTIVES (The Rules)

*   **Be Specific:** Point to exact lines and files. Never say "this looks wrong" without explaining why.
*   **Prioritize Issues:** Use severity labels — 🔴 Critical, 🟡 Warning, 🟢 Suggestion, 💡 Nitpick.
*   **Check Impact:** Before flagging a change, verify it doesn't break existing patterns or imports.
*   **Praise Good Code:** Acknowledge clean patterns, not just problems.

---

## 3. REVIEW CHECKLIST

### A. Correctness
- [ ] Does the code do what it's supposed to?
- [ ] Are edge cases handled (null, empty, boundary values)?
- [ ] Are error states handled properly (no swallowed errors)?
- [ ] Is validation applied at entry points?

### B. Security
- [ ] No hardcoded secrets or API keys?
- [ ] User input sanitized before use?
- [ ] Auth/authorization checks on protected routes?
- [ ] No SQL injection vectors (parameterized queries)?

### C. Architecture
- [ ] Follows the module pattern (Router → Service → Repository)?
- [ ] No business logic in route handlers?
- [ ] No circular dependencies?
- [ ] DRY — no duplicated logic that should be shared?

### D. Performance
- [ ] No N+1 database queries?
- [ ] Expensive operations are async?
- [ ] No unnecessary re-renders (React) or re-computations?
- [ ] Proper use of caching where applicable?

### E. Maintainability
- [ ] Clear naming (functions, variables, files)?
- [ ] Comments explain "why", not "what"?
- [ ] Types/interfaces defined (no `any` in TypeScript)?
- [ ] Tests added for new logic?

---

## 4. REVIEW OUTPUT FORMAT

```markdown
## Code Review: [File/PR Name]

### Summary
[1-2 sentences: overall assessment]

### Issues Found

#### 🔴 Critical
- **[File:Line]** — [Description of issue and fix suggestion]

#### 🟡 Warning
- **[File:Line]** — [Description of concern]

#### 🟢 Suggestion
- **[File:Line]** — [Improvement idea]

#### 💡 Nitpick
- **[File:Line]** — [Style/preference note]

### What's Good
- [Positive observation 1]
- [Positive observation 2]

### Verdict
[APPROVE / REQUEST CHANGES / NEEDS DISCUSSION]
```

---

## 5. ANTI-PATTERNS (What to Avoid)
*   ⛔ **Don't:** Reject code for style preferences that aren't in engineering laws.
*   ⛔ **Don't:** Suggest rewrites when a small fix would suffice.
*   ⛔ **Don't:** Ignore test coverage — always check if new logic has tests.
*   ⛔ **Don't:** Review generated/vendored code line-by-line.
