import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function BlurBackdrop({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 1, 1],
      Extrapolate.CLAMP
    ),
  }));
  const animatedProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        animatedIndex.value,
        [-1, 0, 1],
        [0, 10, 50],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Animated.View style={[style, containerAnimatedStyle]}>
      <AnimatedBlurView
        tint="light"
        animatedProps={animatedProps}
        style={[style, StyleSheet.absoluteFill, blurViewStyle]}
      />
    </Animated.View>
  );
}

const blurViewStyle = {
  backgroundColor: "rgba(0,0,0,0.2)",
};
