# Tech Stack & Build System

## Core Technologies

- **Framework**: React Native 0.79.5 with Expo 53.0.22
- **Language**: TypeScript with strict mode enabled
- **UI Library**: Tamagui for cross-platform components
- **Navigation**: Expo Router (file-based routing)
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Package Manager**: Yarn 4.9.2

## Key Libraries

### State Management

- **@legendapp/state**: Observable state management
- **@tanstack/react-query**: Server state management
- **zustand**: Lightweight state management

### UI & Animation

- **@tamagui/**: UI components and theming system
- **moti**: Declarative animations
- **react-native-reanimated**: High-performance animations
- **@gorhom/bottom-sheet**: Bottom sheet components

### Forms & Validation

- **react-hook-form**: Form state management
- **formik**: Alternative form library
- **zod**: Schema validation

### AI & Services

- **@google/generative-ai**: Gemini API integration
- **@sentry/react-native**: Error tracking
- **flagsmith**: Feature flags

## Development Commands

### Development Server

```bash
yarn start              # Start Expo dev server
yarn start:web          # Start with web support
yarn start:clear        # Clear cache and start
yarn ios                # Run on iOS simulator
yarn android            # Run on Android emulator
```

### Code Quality

```bash
yarn lint               # Run ESLint + Prettier checks
yarn format             # Auto-format code
yarn check              # TypeScript type checking
yarn validate:strict    # Full validation (format, lint, types)
yarn checkDead          # Check for dead code with knip
```

### Testing

```bash
yarn test               # Run Jest tests
```

### Supabase

```bash
yarn supabase:start     # Start local Supabase
yarn supabase:studio    # Open Supabase Studio UI
yarn supabase:db:push   # Apply migrations
yarn supabase:gen:types # Generate TypeScript types
```

### Building

```bash
yarn expo:prebuild      # Generate native code
eas build --profile development   # Build dev version
eas build --profile production    # Build production
```

## Code Quality Tools

- **ESLint**: Configured with TypeScript, Expo, and custom rules
- **Prettier**: Code formatting with 2-space tabs, double quotes
- **TypeScript**: Strict mode with path mapping (`@/*` → `./src/*`)
- **Jest**: Testing with Expo preset and coverage reporting
- **Lefthook**: Git hooks for pre-commit validation
- **Commitlint**: Conventional commit message format

## Environment Variables

Required `.env` variables:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_GEMINI_API_KEY`
- `EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID`
- `EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY`
- `EXPO_PUBLIC_SENTRY_DSN`
