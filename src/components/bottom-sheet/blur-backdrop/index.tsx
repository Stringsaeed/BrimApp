import { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function BlurBackdrop({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) {
  const { close } = useBottomSheet();

  const handleOnPress = useCallback(() => {
    close();
  }, [close]);
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex?.value,
      [-1, 0, 1],
      [0, 1, 1],
      Extrapolation.CLAMP
    ),
  }));
  const animatedProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        animatedIndex?.value,
        [-1, 0, 1],
        [0, 10, 50],
        Extrapolation.CLAMP
      ),
    };
  });

  const tapGesture = Gesture.Tap()
    .onFinalize(() => {
      handleOnPress();
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        testID="blur-backdrop"
        style={[style, containerAnimatedStyle]}
      >
        <AnimatedBlurView
          tint="dark"
          animatedProps={animatedProps}
          style={[style, StyleSheet.absoluteFill, blurViewStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const blurViewStyle = {
  backgroundColor: "rgba(0,0,0,0.2)",
};
