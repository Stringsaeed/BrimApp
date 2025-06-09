# BrimApp

A cross-platform note-taking application with AI-powered features built with React Native, Expo, and Supabase.

## 📝 Project Overview

BrimApp is a modern note-taking application that allows users to create, edit, and manage notes with rich text support. Notable features include:

- AI-powered grammar fixing and text rephrasing using Google's Gemini API
- Voice transcription for audio-to-text conversion
- Real-time synchronization across devices
- Archive and trash functionality for note management
- Light/dark mode and accent color customization
- Internationalization support

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Components**: Tamagui
- **Navigation**: Expo Router
- **Backend**: Supabase for authentication, database, and real-time subscriptions
- **Form Management**: Formik
- **Text Editor**: TipTap for rich text editing
- **Package Manager**: yarn
- **Testing**: Jest
- **Error Tracking**: Sentry
- **Analytics**: Vexo Analytics
- **Internationalization**: i18next

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- [yarn](https://yarnpkg.com/) package manager
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd BrimApp

# Install dependencies
yarn install
```

### Environment Configuration

Create a `.env` file at the root of the project with the following variables:

```
EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID=your_flagsmith_id
EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY=your_vexo_key
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## 💻 Development

### Development Server

```bash
# Start Expo development server
yarn start

# Start with web support
yarn start:web

# Clear cache and start
yarn start:clear
```

### Running on Devices

```bash
# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

### Code Quality Tools

```bash
# Run ESLint and Prettier checks
yarn lint

# ESLint only
yarn lint:eslint

# Prettier check only
yarn lint:formatting

# Auto-format code
yarn format

# TypeScript type checking
yarn check

# Full validation (format, lint, type check)
yarn validate:strict

# Check for dead code
yarn checkDead
```

### Testing

```bash
# Run all tests
yarn test

# Run a specific test file
yarn test -- path/to/test/file.test.tsx
```

## 🗄️ Supabase Setup

### Starting Supabase Locally

To run Supabase services locally for development:

```bash
# Start Supabase services
yarn supabase:start

# Stop Supabase services
yarn supabase:stop

# Check status of Supabase services
yarn supabase:status

# Open Supabase Studio (UI)
yarn supabase:studio
```

### Database Management

```bash
# Apply migrations to local database
yarn supabase:db:push

# Pull schema from remote database
yarn supabase:db:pull

# Reset local database (caution: destructive)
yarn supabase:db:reset

# Generate TypeScript types from database schema
yarn supabase:gen:types
```

## 📱 Building and Deployment

The app uses EAS (Expo Application Services) for building and deployment with three environments:

```bash
# Build development client
eas build --profile development

# Build preview version for testing
eas build --profile preview

# Build production version
eas build --profile production

# Submit to app stores
eas submit --profile production
```

## 📂 Project Structure

- `/src/app` - Expo Router screens and navigation
- `/src/components` - Reusable UI components
- `/src/config` - Application configuration
- `/src/contexts` - React context providers
- `/src/hooks` - Custom React hooks
- `/src/i18n` - Internationalization files
- `/src/screens` - Screen components
- `/src/services` - Service integrations (AI, database, analytics, etc.)
- `/src/themes` - Theming and styling
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions
- `/supabase` - Supabase configuration and migrations

## 🧪 Testing Strategy

- Component tests in `__tests__` directories alongside the components they test
- Snapshot testing for UI components
- Jest for running tests and providing assertions
- Mock providers for contexts and services

## 🤝 Contributing

1. Ensure you've discussed the change you wish to make
2. Fork the repository
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Make your changes following the code style guidelines
5. Run validation (`yarn validate:strict`)
6. Commit your changes
7. Push to your branch
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

Built with ❤️ using Expo, React Native, and Supabase
