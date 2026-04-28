# Step A: Codebase Mapping (Brownfield)

**Trigger:** "Map codebase", "Analyze existing code", "Document current architecture", "Initialize Step A"

**Purpose:** Understand existing project structure before adding features and fill the Spec metrics.

## Process

Before starting, use available code search tools (grep, ripgrep, ast-grep) for discovery and navigation tasks below.

**High-level approach:**

1. Explore directory structure systematically.
2. Identify technology stack from dependency manifests (`package.json`, `go.mod`, `requirements.txt`, etc.).
3. Extract patterns from representative code samples (framework usage, state management, etc.).
4. Document observed conventions, architectures, and testing infrastructure.
5. Catalog external integrations.
6. Identify concerns: tech debt, known bugs, security risks.

**Analysis depth:**

- Sample 5-10 representative files per category.
- Focus on consistency and patterns, not exhaustive coverage.
- Extract actual examples, not assumptions.

## Output 1: /.specs/project/STACK.md

**Purpose:** Document the tech stack, metrics, and project identity found in the codebase.

**Content:**
- Tech Stack (framework, languages, databases observed).
- Codebase Metrics (LOC count, table count, file count).
- Project Identity (vision/mission) - leave TBD if unclear.

## Output 2: /.specs/project/ARCHITECTURE.md

**Purpose:** Document the exact architectural patterns and data flow.

**Structure:**

```markdown
# ARCHITECTURE
**Last Updated:** [Date]

## 1. High-Level Structure
[Provide a component diagram or text representation of how the system binds together]

## 2. Identified Patterns
### [Pattern Name - e.g. MVC, Clean Architecture, Next.js App Router]
**Location:** [Where this pattern lives]
**Purpose:** [What it achieves]
**Example:** [reference to actual file]

## 3. Data Flow
### [Key Flow - e.g. Auth, Main CRUD path]
[Map flow from code analysis]

## 4. Code Organization & Conventions
**Structure Approach:** [Feature-based, layer-based, etc.]
**File Naming:** [camelCase, kebab-case, etc.]
**Testing Strategy:** [Jest, PyTest, etc.]

## 5. Integrations & External Services
- [Service]: [How it's used / where]

## 6. Structural Tree
[Tree representation - max 3 levels deep of key dirs]
```



## Total Context Budget

Load `package.json` or equivalent first to guide further directory exploration. Don't read thousands of files. Read only the crucial config files and entry points.
