import * as Haptics from "expo-haptics";
import { useCallback, useMemo } from "react";
import { Platform } from "react-native";

export type FeedbackType =
  | "light"
  | "medium"
  | "heavy"
  | "selection"
  | "success"
  | "warning"
  | "error";

export default function useHaptic(feedbackType: FeedbackType = "selection") {
  const createHapticHandler = useCallback(
    (type: Haptics.ImpactFeedbackStyle) => {
      return Platform.OS === "web"
        ? undefined
        : () => Haptics.impactAsync(type);
    },
    []
  );
  const createNotificationFeedback = useCallback(
    (type: Haptics.NotificationFeedbackType) => {
      return Platform.OS === "web"
        ? undefined
        : () => Haptics.notificationAsync(type);
    },
    []
  );

  const hapticHandlers = useMemo(
    () => ({
      warning: createNotificationFeedback(
        Haptics.NotificationFeedbackType.Warning
      ),
      success: createNotificationFeedback(
        Haptics.NotificationFeedbackType.Success
      ),
      error: createNotificationFeedback(Haptics.NotificationFeedbackType.Error),
      selection: Platform.OS === "web" ? undefined : Haptics.selectionAsync,
      medium: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
      heavy: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
      light: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
    }),
    [createHapticHandler, createNotificationFeedback]
  );

  return hapticHandlers[feedbackType];
}
