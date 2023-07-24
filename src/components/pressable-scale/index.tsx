import React, { useCallback } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  activeScale?: number;
  onLongPress?: () => void;
}

export default function PressableScale({
  activeScale = 0.94,
  disabled = false,
  onLongPress,
  children,
  onPress,
  style,
}: Props) {
  const animatedScale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    animatedScale.value = withTiming(activeScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScale]);

  const onPressOut = useCallback(() => {
    animatedScale.value = withTiming(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScale.value }],
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      style={{ width: "100%" }}
      containerStyle={{ width: "100%" }}
    >
      <Animated.View style={[stylez, style]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
}
