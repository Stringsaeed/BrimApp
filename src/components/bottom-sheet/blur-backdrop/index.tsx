import { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
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

  const gestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onFinish: () => {
          runOnJS(handleOnPress)();
        },
      },
      [handleOnPress]
    );

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[style, containerAnimatedStyle]}>
        <AnimatedBlurView
          tint="light"
          animatedProps={animatedProps}
          style={[style, StyleSheet.absoluteFill, blurViewStyle]}
        />
      </Animated.View>
    </TapGestureHandler>
  );
}

const blurViewStyle = {
  backgroundColor: "rgba(0,0,0,0.2)",
};
