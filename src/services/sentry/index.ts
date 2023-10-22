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
  dsn: config.sentryDsn,
  debug: false,
});

export { Sentry, routingInstrumentation };
