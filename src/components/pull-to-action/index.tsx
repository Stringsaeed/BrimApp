import { useHeaderHeight } from "@react-navigation/elements";
import { Plus } from "phosphor-react-native";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, XStack } from "tamagui";

import { useCreateEmptyNoteMutation, useHaptic } from "hooks";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

interface PullToActionProps {
  children: React.ReactNode;
}

export default function PullToAction({ children }: PullToActionProps) {
  const { bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const actualTop = headerHeight + 16;
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();

  const translateValue = useSharedValue(0);
  const selectionActive = useSharedValue(0);
  const scrollViewGesture = Gesture.Native();
  const hapticFeedback = useHaptic();
  const handleAdd = useCallback(async () => {
    hapticFeedback?.();
    await createEmptyNoteMutation();
  }, [createEmptyNoteMutation, hapticFeedback]);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateValue.value = event.translationY > 0 ? event.translationY : 0;
      const activatePullToAction = interpolate(
        translateValue.value,
        [0, 80],
        [0, 180],
        Extrapolation.CLAMP
      );
      if (activatePullToAction === 180) {
        selectionActive.value = 1;
      } else {
        selectionActive.value = 0;
      }
    })
    .onEnd(() => {
      if (selectionActive.value) {
        runOnJS(handleAdd)();
      }
      selectionActive.value = 0;
      translateValue.value = withTiming(0, {
        easing: Easing.linear,
        duration: 350,
      });
    });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      height: translateValue.value,
    };
  });

  const plusIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(
            translateValue.value,
            [0, 50],
            [90, 0],
            Extrapolation.CLAMP
          )}deg`,
        },
        {
          scale: interpolate(
            translateValue.value,
            [0, 50],
            [0.9, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        translateValue.value,
        [20, 40],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

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
        <AnimatedXStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          px="$4"
          style={animatedViewStyle}
        >
          <AnimatedView
            flex={1}
            alignItems="center"
            style={plusIconAnimatedStyle}
          >
            <Plus />
          </AnimatedView>
        </AnimatedXStack>
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
