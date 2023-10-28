import * as Sentry from "sentry-expo";

import { config } from "config";

const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

Sentry.Native.init({
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
  environment: config.environment,
  dsn: config.sentryDsn,
  debug: false,
});

export { Sentry, routingInstrumentation };
