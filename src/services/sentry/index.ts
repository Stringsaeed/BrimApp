import * as Sentry from "@sentry/react-native";

import { config } from "@/config";

const tracingIntegration = Sentry.reactNativeTracingIntegration();

export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  integrations: [navigationIntegration, tracingIntegration],
  enableNativeFramesTracking: true,
  environment: config.environment,
  sampleRate: __DEV__ ? 1 : 0.1,
  dsn: config.sentryDsn,
  sendDefaultPii: true,
  debug: __DEV__,
});

export { Sentry };
