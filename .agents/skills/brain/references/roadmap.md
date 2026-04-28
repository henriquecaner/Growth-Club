# Roadmap Creation

**Trigger:** "Create roadmap", "Plan features", "Map project phases"

## Process

Based on `/.specs/project/STACK.md`, decompose the project vision into:
- Milestones (shippable increments)
- Features (user-facing capabilities)
- Status tracking (`[PLANNED]` / `[IN PROGRESS]` / `[DONE]`)

## Output: /.specs/project/ROADMAP.md

When generating or updating the roadmap, append or edit the file following the existing structure found in `/.specs/project/ROADMAP.md`. 

**Structure Focus:**
Make sure you update the `Roadmap Overview` table, the `Milestones & Shippable Increments` lists, and log active sprint progress in the `Sprint Log`.

**Status values:**
- `[PLANNED]`: Not started
- `[IN PROGRESS]`: Currently implementing
- `[DONE]`: Shipped and verified

**Update strategy:**
- Mark features `[PLANNED]` → `[IN PROGRESS]` when starting
- Mark `[IN PROGRESS]` → `[DONE]` when the feature tasks are verified
- Add new milestones as project evolves
- Append current sprint focus in the Sprint Log

**Validation:**
- Each milestone has a clear shippable outcome?
- Features are user-facing capabilities?
- Status reflects current reality?
