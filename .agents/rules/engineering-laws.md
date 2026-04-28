---
trigger: always_on
---

# Engineering Laws: {{PROJECT_NAME}}

> This document defines the non-negotiable architectural and security standards. All generated code and refactors must comply with these laws. Customize each section to match your specific tech stack.

---

## 🔒 LAW: Security Isolation
**Goal:** Prevent privilege leaks on the client side.

* **No Server Keys on Client:** Never expose server-side secrets (service role keys, API secrets) in frontend code.
* **Zero Direct Writes:** The frontend should not perform direct database mutations. Route all state changes through API endpoints.
* **API Gateway:** All state changes must be routed through server-side handlers for session validation and authorization.
* **Security Headers:** Enforce CSP, HSTS, and Anti-Clickjacking headers in production.

---

## ⚡ LAW: Async Performance & Concurrency
**Goal:** Ensure a non-blocking, scalable backend.

* **Async-First:** Database, cache, and external API calls **MUST** be `async`.
* **No Blocking IO:** Prohibit synchronous blocking in request handlers. Use `async/await` with proper error handling.
* **Background Processing:** Delegate long-running tasks to background jobs or queues (not inline in request handlers).

---

## 🔑 LAW: Secrets & Credential Hygiene
**Goal:** Protect infrastructure keys and user data.

* **Log Sanitization:** Never log sensitive environment variables or PII (emails, phones, IDs).
* **Startup Validation:** Validate critical `ENV` variables on startup — fail fast if missing.
* **Entropy:** Token generators for invites, resets, or sessions must use cryptographically secure random generators.
* **No Hardcoding:** All secrets in `.env` files, never in source code.

---

## 🍪 LAW: Session Hardening
**Goal:** Resiliency against side-channel and cross-site attacks.

* **Auth Provider Sessions:** Use your auth provider's session management — don't roll your own JWT verification.
* **Webhook Verification:** Verify webhook signatures from external services (payment providers, auth providers).
* **CORS:** Strict domain allowlist in production (no wildcards `*`).

---

## 🏗️ LAW: Clean Architecture
**Goal:** Separation of concerns and logical modularity.

* **Services Layer:** Business logic resides in Service files — never in route handlers or repositories.
* **Routers/Controllers Layer:** Handle *only* input validation, auth checks, and service orchestration.
* **Repository/Data Layer:** Database queries only — no business logic.
* **Centralized Logic (DRY):** Shared logic must be centralized in a `shared/` module.
* **Module Boundaries:** Core modules should NOT import from platform/infrastructure modules.

---

## 🛠️ LAW: Contextual Error Handling
**Goal:** Eliminate "blind debugging" and provide clear audit trails.

* **Zero Swallow:** Never use empty `catch(e) {}`. All errors must be logged or re-thrown.
* **Correlation IDs:** Propagate request IDs (`X-Request-ID`) across services and logs.
* **Audience Segregation:** Users receive friendly messages; logs receive full stack traces with ISO8601 timestamps.
* **Fail Fast:** Validate all inputs at the function entry point with schemas (Zod, Joi, etc.).
* **Critical Ops Fail-Closed:** Payment, auth, and security operations must throw exceptions — no silent failures.

---

## 📦 LAW: Dependency Hygiene
**Goal:** Prevent supply chain attacks and code bloat.

* **Freshness:** Prefer packages updated within the last 12 months.
* **Popularity:** Minimum threshold: >1k weekly downloads (NPM) or >500 stars (GitHub).
* **Security Scans:** Run `npm audit` (or equivalent) before adding new dependencies.
* **Minimalism:** Avoid "utility" dependencies for trivial logic (e.g., `is-odd`, `left-pad`).

---

## 🧪 LAW: Testing Standards
**Goal:** Verifiable code quality.

* **Framework:** Use a modern test framework with watch mode and coverage support.
* **Workflow:** Red (fail) → Green (pass) → Refactor.
* **Coverage:**
    * **Business Logic:** 80% minimum.
    * **Edge Cases:** Handle nulls, empty arrays, and boundary limits.
    * **Error States:** Minimum one exception test per fallible function.
* **External Outputs:** All external API JSON outputs validated via schemas — never trust raw `JSON.parse`.

---

## 🌐 LAW: Environment Isolation
**Goal:** Prevent production data contamination.

* **Database Segregation:** Dev, Staging, and Prod must use strictly separate database instances.
* **No Real Data:** Using actual customer data in development environments is strictly prohibited.
* **Feature Flags:** Commit unfinished code only behind toggles; never directly to the main production flow.

---

## 🤖 LAW: AI & Prompt Integrity
**Goal:** Prevent AI-driven security breaches, hallucinations, and prompt injections.

* **No Blind Execution:** AI-generated code that modifies state, handles payments, or manages authentication MUST be human-reviewed before deployment.
* **Prompt Injection Defense:** Any user-generated content passed to an LLM must be treated as hostile. Use strict system bounds and parameterized prompt structures.
* **PII Redaction:** Never send personally identifiable information (PII) or raw database dumps to external AI APIs without sanitization.
* **Context Bounds:** AI tools should only be given the absolute minimum context required to solve the task at hand (Principle of Least Privilege).
