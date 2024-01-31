import * as Sentry from "@sentry/react-native";

import { config } from "config";

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
  environment: config.environment,
  dsn: config.sentryDsn,
  debug: false,
});

export { Sentry, routingInstrumentation };
