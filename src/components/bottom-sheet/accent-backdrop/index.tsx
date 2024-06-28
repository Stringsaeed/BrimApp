import { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "tamagui";

import { useUserAccent } from "hooks";
import { UserAccentValue } from "types";

export default function AccentBackdrop({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) {
  const { accent: accentValue } = useUserAccent();
  const theme = useTheme();
  const accent = theme[accentValue as UserAccentValue].val;
  const { close } = useBottomSheet();

  const handleOnPress = useCallback(() => {
    close();
  }, [close]);

  const gestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onFinish: () => {
          runOnJS(handleOnPress)();
        },
      },
      [handleOnPress]
    );
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [-1, 0, 1],
      // 0: transparent, 1: transparent, 2: accent 50% opacity
      [`${accent}00`, `${accent}ff`, `${accent}ff`]
    ),
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 0.4, 0.8],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        pointerEvents="auto"
        style={[style, containerAnimatedStyle]}
      />
    </TapGestureHandler>
  );
}
