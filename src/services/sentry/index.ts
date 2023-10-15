import * as Sentry from "sentry-expo";

const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

const reactNativeTracingIntegration = new Sentry.Native.ReactNativeTracing({
  routingInstrumentation,
});

Sentry.init({
  _experiments: {
    profilesSampleRate: 1.0,
  },
  integrations: [reactNativeTracingIntegration],
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  debug: __DEV__,
});

export { Sentry, routingInstrumentation };
