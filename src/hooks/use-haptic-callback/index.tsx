import useHaptic, { FeedbackType } from "@/hooks/use-haptic";

interface UseHapticCallbackOptions {
  shouldWait?: boolean;
  triggerWhen?: "before" | "after";
  feedbackType?: FeedbackType;
}

export default function useHapticCallback<T extends (...args: any[]) => any>(
  callback: T,
  options?: UseHapticCallbackOptions
) {
  const {
    feedbackType = "selection",
    triggerWhen = "before",
    shouldWait = true,
  } = options || {};
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
