import { useHeaderHeight } from "@react-navigation/elements";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePullToActionContext } from "contexts";
import { useCreateEmptyNoteMutation, useHaptic } from "hooks";

interface PullToActionProps {
  children: React.ReactNode;
  enabled?: boolean;
}

/**
 * @beta
 */
export default function PullToAction({
  enabled = true,
  children,
}: PullToActionProps) {
  const { translateY } = usePullToActionContext();
  const { bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const actualTop = headerHeight + 16;
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();

  const selectionActive = useSharedValue(0);
  const scrollViewGesture = Gesture.Native();
  const hapticFeedback = useHaptic();
  const handleAdd = useCallback(() => {
    hapticFeedback?.();
    createEmptyNoteMutation.mutate();
  }, [createEmptyNoteMutation, hapticFeedback]);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateY.value = event.translationY > 0 ? event.translationY : 0;
      selectionActive.value = translateY.value >= 80 ? 1 : 0;
    })
    .onEnd(() => {
      if (selectionActive.value) {
        runOnJS(handleAdd)();
      } else {
        selectionActive.value = 0;
      }
      translateY.value = withTiming(0, {
        easing: Easing.linear,
        duration: 350,
      });
    })
    .enabled(enabled);

  return (
    <GestureDetector
      gesture={Gesture.Simultaneous(panGesture, scrollViewGesture)}
    >
      <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          { paddingTop: actualTop, paddingBottom: bottom },
        ]}
      >
        {children}
      </Animated.ScrollView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  container: { flex: 1 },
});
