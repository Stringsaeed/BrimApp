# Project Structure & Architecture

## Directory Organization

```
src/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (app)/             # Main app screens (grouped route)
│   └── auth/              # Authentication screens
├── components/            # Reusable UI components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization files
├── screens/               # Screen components (legacy structure)
├── services/              # External service integrations
├── themes/                # Tamagui theme configuration
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Architecture Patterns

### File-Based Routing (Expo Router)

- Routes defined by file structure in `src/app/`
- Grouped routes use `(groupName)` syntax
- Dynamic routes use `[param]` syntax
- Layout files: `_layout.tsx`

### Component Organization

- Each component in its own folder with `index.tsx`
- Export all components from `src/components/index.ts`
- Use default exports for components
- Co-locate tests in `__tests__` folders

### Custom Hooks

- Prefix with `use` (e.g., `useNoteForm`)
- Export from `src/hooks/index.ts`
- Group related hooks by functionality

### Services Layer

- Organized by service type (ai, database, analytics, etc.)
- Each service exports its functionality
- Centralized export from `src/services/index.ts`

### Type Definitions

- Organized by domain (notes, auth, theme, etc.)
- Use `.ts` extension for type-only files
- Export all types from `src/types/index.ts`

## Naming Conventions

### Files & Folders

- **kebab-case** for folders and files
- **PascalCase** for component files
- **camelCase** for utility files and hooks

### Components

- **PascalCase** for component names
- Default export for main component
- Named exports for sub-components

### Hooks

- Prefix with `use` followed by **PascalCase**
- Default export for single hook files

### Types

- **PascalCase** for interfaces and types
- Suffix interfaces with props: `ComponentProps`

## Import/Export Patterns

### Path Mapping

- Use `@/` alias for `src/` directory
- Absolute imports preferred over relative

### Import Order (ESLint enforced)

1. Node.js built-ins
2. External packages
3. Internal modules (`@/`)
4. Parent directory imports
5. Sibling imports
6. Index imports

### Export Patterns

- Barrel exports in `index.ts` files
- Default exports for main components/hooks
- Named exports for utilities and types

## Code Organization Rules

### Component Structure

```typescript
// Imports (ordered by ESLint rules)
import { external } from "package";
import { internal } from "@/module";

// Types (if needed)
interface ComponentProps {
  // props definition
}

// Component
function Component({ prop }: ComponentProps) {
  // hooks
  // handlers
  // render
}

export default Component;
```

### Service Structure

- Each service in its own folder
- Export main functionality from `index.ts`
- Separate configuration from implementation

### Context Providers

- One provider per context
- Export both context and provider
- Include custom hooks for context consumption

## Testing Strategy

### File Placement

- Tests alongside components in `__tests__/` folders
- Test files use `.test.tsx` or `.test.ts` extension

### Coverage

- Collect coverage from `src/**/*.{ts,tsx}`
- Coverage reports in `coverage/` directory

## Configuration Files

### Root Level

- `tsconfig.json`: TypeScript configuration with path mapping
- `.eslintrc.cjs`: ESLint rules with import ordering
- `.prettierrc.cjs`: Code formatting rules
- `jest.config.js`: Test configuration
- `app.config.ts`: Expo configuration with environment variants
