import * as Sentry from "@sentry/react-native";

import { config } from "@/config";

export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});
export const tracingIntegration = Sentry.reactNativeTracingIntegration();

Sentry.init({
  integrations: [navigationIntegration, tracingIntegration],
  enableNativeFramesTracking: true,
  environment: config.environment,
  sampleRate: __DEV__ ? 1 : 0.1,
  dsn: config.sentryDsn,
  debug: __DEV__,
});

export { Sentry };
