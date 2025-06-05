# BrimApp Development Guide

## Key Commands

- Build/Start: `bun start` or `bun start:web` (web version)
- Lint: `bun lint` (includes ESLint + Prettier)
- Type Check: `bun check`
- Format: `bun format`
- Validate All: `bun validate:strict` (format, lint, type check)
- Test: `bun test`
- Single Test: `bun test -- path/to/test/file.test.tsx`

## Code Style

- **Imports**: Organized in groups (built-in → external → internal → parent → siblings)
- **Components**: Functional components with TypeScript interfaces
- **Formatting**: 2-space indents, double quotes, semicolons required
- **UI**: Use Tamagui components instead of direct React Native components
- **Types**: Define interfaces/types, use Zod for validation
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use Sentry.captureException for error reporting
- **Testing**: Component tests in `__tests__` directories, snapshot testing

## Git Workflow

- Pre-commit hook runs linting, formatting, TypeScript checks, and tests
- Commit messages follow conventional commits format:
  - `feat:` New features
  - `fix:` Bug fixes
  - `docs:` Documentation changes
  - `style:` Code style changes (formatting, etc.)
  - `refactor:` Code changes that neither fix bugs nor add features
  - `perf:` Performance improvements
  - `test:` Adding or updating tests
  - `chore:` Changes to the build process, dependencies, etc.
  - `ci:` CI configuration changes
  - `build:` Changes that affect the build system
  - `revert:` Reverts a previous commit

Always run `bun validate:strict` before committing changes.
