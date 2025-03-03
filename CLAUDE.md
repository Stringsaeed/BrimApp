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

Always run `bun validate:strict` before committing changes.
