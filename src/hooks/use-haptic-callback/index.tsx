import useHaptic, { FeedbackType } from "hooks/use-haptic";

export default function useHapticCallback<T extends (...args: any[]) => any>(
  callback: T,
  {
    feedbackType = "selection",
    triggerWhen = "before",
    shouldWait = true,
  }: {
    shouldWait?: boolean;
    triggerWhen?: "before" | "after";
    feedbackType?: FeedbackType;
  }
) {
  const hapticFeedback = useHaptic(feedbackType);
  async function injectFeedback() {
    return shouldWait ? await hapticFeedback?.() : hapticFeedback?.();
  }
  async function wrapper(...args: Parameters<T>) {
    if (triggerWhen === "before") {
      await injectFeedback();
    }
    callback(...args);
    if (triggerWhen === "after") {
      await injectFeedback();
    }
  }

  return wrapper;
}
