# BrimApp Agent Guide

## Project Snapshot

- App type: Expo + React Native note-taking app with web support
- Router: Expo Router (`src/app`)
- UI system: Tamagui (`src/themes/theme.ts`)
- Data sync: Supabase + Legend-State (`src/services/database`)
- Forms: Formik + Zod
- Error reporting: Sentry (`src/services/sentry`)
- Feature flags: Flagsmith (`src/services/flagsmith`)
- Analytics: Vexo (`src/services/vexo`)
- Package manager: Yarn 4 (`.yarnrc.yml`)

## Working Principles

- Prefer editing files under `src/` unless the task explicitly requires native changes.
- Keep route wrappers in `src/app` thin and place UI/business logic in `src/screens`, `src/components`, `src/hooks`, and `src/services`.
- Use Tamagui components/tokens for UI primitives and theme values.
- Use the `@/*` path alias (maps to `src/*`) over deep relative imports.
- Report operational errors via Sentry (`Sentry.captureException(...)`) in async/mutation flows.

## Repository Structure

- `src/app`: Expo Router entrypoints and route layout files.
- `src/screens`: Screen implementations (feature-oriented).
- `src/components`: Reusable UI building blocks, typically one folder per component with `index.tsx`.
- `src/hooks`: Custom hooks, grouped as `use-<feature>/index.ts[x]`.
- `src/contexts`: React providers for auth, notes, query client, and feature-specific state.
- `src/services`: External and platform integrations (Supabase, Sentry, analytics, flags, storage, AI, toolbar).
- `src/themes`: Tamagui theme/font/animation configuration.
- `src/types`: Shared domain and integration types (including generated Supabase types).
- `src/utils`: Pure helpers and shared test utilities.
- `supabase`: Local Supabase config and SQL migrations.
- `assets`: App icons/splash/art assets.
- `ios`, `android`: Native projects for prebuild/ejected workflows.
- `.github/workflows`: CI workflows (`codeql.yml`, `update.yml`).

## Routing and Screen Conventions

- Route definitions live in `src/app`, but route files usually only re-export screens from `src/screens`.
- Route groups are used:
- `(app)` for authenticated/main app routes
- `auth` for auth modal stack
- Global provider and stack setup is centralized in `src/app/_layout.tsx`.
- Canonical route constants live in `src/routers/index.ts` (`Routes` enum). Use these instead of hardcoded paths.

## State, Data, and Services

- Notes sync:
- `notes$` observable is configured in `src/services/database/index.ts`.
- Supabase sync uses realtime + soft delete (`deleted_at`) + async persistence.
- `NoteService` (`src/services/notes/notes.ts`) is the primary CRUD surface for note operations.
- Auth:
- `AuthenticationProvider` in `src/contexts/auth/index.tsx` wraps Supabase auth state.
- Query/mutations:
- React Query client is created in `src/contexts/query/index.tsx`.
- Feature hooks under `src/hooks/use-*-mutation` should own async side effects and error capture.
- Storage:
- `src/services/storage/index.ts` wraps MMKV with async-like methods.

## Environment and Config

- Runtime env is validated with Zod in `src/config/env/index.ts`.
- Required public env keys:
- `EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID`
- `EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_GEMINI_API_KEY`
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SENTRY_DSN`
- Build/release env keys also used:
- `SENTRY_AUTH_TOKEN`
- `SENTRY_PROJECT`
- `SENTRY_ORG`
- App variants are configured in `app.config.ts` using `APP_VARIANT` (`development`, `preview`, `production`).

## Coding Standards

- Language: TypeScript (strict mode on).
- Formatting: Prettier (`tabWidth: 2`, double quotes, semicolons, trailing commas `es5`).
- Imports:
- Enforce group order: `builtin -> external -> internal -> parent -> sibling -> index`.
- Alphabetize ascending with blank lines between groups.
- Lint highlights:
- `no-console` is `error`.
- Keep one blank line after imports.
- UI:
- Prefer Tamagui components and tokens (`$background`, `$color`, `$<accent>`).
- Use React Native primitives directly only when needed for platform APIs/layout edge cases.
- Types/validation:
- Prefer explicit interfaces/types.
- Use Zod for schema validation and parsing (`src/types`, `src/utils/validation.ts`, `src/config/env`).

## Testing Standards

- Framework: Jest with `jest-expo`.
- Test files: `*.test.ts` and `*.test.tsx`.
- Component tests should be colocated in `__tests__` directories where practical.
- Prefer `src/utils/test.tsx` custom render helper for provider-wrapped component tests.
- Snapshot testing is used and acceptable for stable UI structures.
- Coverage is collected from `src/**/*.{ts,tsx}`.

## Commands

- `yarn start`: Start Expo dev server.
- `yarn start:web`: Start web build (`TAMAGUI_TARGET=web`).
- `yarn start:clear`: Start with cleared cache.
- `yarn ios`: Run iOS app.
- `yarn android`: Run Android app.
- `yarn lint`: Run ESLint + Prettier check.
- `yarn lint:eslint`: ESLint only.
- `yarn lint:formatting`: Prettier check only.
- `yarn format`: Prettier write + ESLint fix.
- `yarn check`: TypeScript check (`tsc --noEmit`).
- `yarn validate`: `format + lint`.
- `yarn validate:strict`: `validate + check`.
- `yarn test`: Run all tests.
- `yarn test -- path/to/file.test.tsx`: Run a specific test file.
- `yarn checkDead`: Dead code and unused export scan via Knip.
- `yarn supabase:start|stop|status|studio`: Local Supabase lifecycle.
- `yarn supabase:db:push|pull|reset`: Schema management.
- `yarn supabase:gen:types`: Regenerate `src/types/supabase.ts`.

## Git and CI Workflow

- Git hooks are managed with Lefthook.
- Pre-commit currently runs:
- `yarn lint`
- `yarn prettier --write {staged_files}`
- Commit message hook runs commitlint (`@commitlint/config-conventional`).
- Allowed commit types:
- `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- CI:
- `.github/workflows/update.yml` runs on push and executes `yarn validate:strict` before `eas update --auto`.
- `.github/workflows/codeql.yml` performs security analysis on `main` and on schedule.

## Supabase Notes

- Current base migration creates `notes` table with:
- `id`, `title`, `note`, `status`, `is_private`, `user_id`, `created_at`, `updated_at`, `deleted_at`.
- Realtime is enabled for `notes`.
- Trigger `handle_times` maintains `created_at` and `updated_at`.

## Agent Checklist Before Handoff

- Run `yarn validate:strict` for production-facing changes.
- Run relevant tests (`yarn test` or targeted test files) when behavior changes.
- Regenerate Supabase types when schema changes.
- Keep route wrappers thin and avoid business logic in `src/app` files.
- Confirm no secrets are committed from `.env` or service credential files.
