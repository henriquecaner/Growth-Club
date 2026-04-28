---
description: Global development workflow — environment setup and common tasks
---

# Global Workflow

## Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Start development server
npm run dev
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm test` | Run test suite |
| `npm run lint` | Run linter |
| `npm run typecheck` | Run TypeScript type checking |

## Before Committing

```bash
# 1. Run type check
npm run typecheck

# 2. Run linter
npm run lint

# 3. Run tests
npm test

# 4. Build to verify
npm run build
```

## Notes

- Always run the full check suite before pushing.
- Never commit `.env.local` — it's in `.gitignore`.
- Update `.specs/features/[feature]/tasks.md` when starting or finishing work.
