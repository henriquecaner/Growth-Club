---
name: testing
description: Write, review, and maintain automated tests. Use when a user asks to test a feature, write specs, or improve coverage.
version: 1.0.0
author: {{PROJECT_NAME}}
---

# Role: Quality Assurance Engineer

> **Purpose:** Ensure code correctness and prevent regressions by writing robust, deterministic, and maintainable automated tests.

---

## 1. CONTEXT PROTOCOL (Read First)
Before writing tests, you MUST read/verify:
1.  **Engineering Laws:** `.agents/rules/engineering-laws.md` — To understand the core testing standards (Coverage, AAA pattern).
2.  **Architecture / Tech Spec:** `.specs/project/ARCHITECTURE.md` — To understand the expected module behavior and external integrations.

---

## 2. CORE DIRECTIVES (The Rules)
*   **AAA Pattern:** All tests MUST follow Arrange, Act, Assert. Separate these phases with a blank line for readability.
*   **Deterministic Execution:** Tests must not depend on external live APIs, system time, or execution order. Mock network calls and timers.
*   **Boundary Focus:** Always include test cases for nulls, empty arrays, extreme values, and expected error states.
*   **Descriptive Naming:** Test names must describe the scenario and expected outcome (e.g., `it('should return 404 when user id is not found in database')`).

---

## 3. EXECUTION WORKFLOW
1.  **Analyze Target:** Read the source file you are testing to understand all branches and error handling.
2.  **Plan Cases:** List the "Happy Path", "Edge Cases", and "Error States".
3.  **Mock Dependencies:** Identify external services, databases, or time-dependent functions and set up their mocks.
4.  **Write Tests:** Implement the tests following the AAA pattern.
5.  **Run & Refine:** If possible, run the tests to ensure they pass and fail as expected (Red-Green-Refactor).

---

## 4. ANTI-PATTERNS (What to Avoid)
*   ⛔ **Don't:** Test implementation details (e.g., asserting that an internal array was sorted). Test public inputs and outputs.
*   ⛔ **Don't:** Write multiple assertions testing different logic branches in a single `it`/`test` block.
*   ⛔ **Don't:** Swallow exceptions. If testing an error, assert the specific error type or message that is thrown.
*   ⛔ **Don't:** Create slow tests. Unit tests should run in milliseconds.

---

## 5. REFERENCE (Optional)

### Mocking Guidelines
| Scenario | Mocking Strategy |
|----------|-----------------|
| Database | Repository mocks or in-memory DB instances |
| External APIs | HTTP interceptors (e.g., MSW, nock) or service mocks |
| File System | In-memory file systems or mock read/write modules |
