import { Sentry } from "@/services/sentry";

export function callSafe(maybeFunction: unknown): void {
  try {
    // intentionally unsound type assertion
    (maybeFunction as () => unknown)();
  } catch (e) {
    Sentry.captureException(e);
  }
}
