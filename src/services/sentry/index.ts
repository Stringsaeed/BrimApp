import * as Sentry from "sentry-expo";

const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

Sentry.Native.init({
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  debug: false,
});

export { Sentry, routingInstrumentation };
