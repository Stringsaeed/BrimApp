import * as Sentry from "@sentry/react-native";
import { config } from "@/config/env";

const tracingIntegration = Sentry.reactNativeTracingIntegration();

export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  integrations: [navigationIntegration, tracingIntegration],
  enableNativeFramesTracking: true,
  environment: config.environment,
  sampleRate: __DEV__ ? 0.05 : 0.1,
  dsn: config.sentryDsn,
  sendDefaultPii: !__DEV__,
  debug: false,
});

export { Sentry };
