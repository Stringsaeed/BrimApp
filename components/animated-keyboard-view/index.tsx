import React from "react";
import Animated, {
  AnimateProps,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ViewProps } from "react-native";

type Props = AnimateProps<ViewProps> & {
  offset?: number;
};

export default function AnimatedKeyboardView({
  offset = 0,
  style,
  ...props
}: Props) {
  const { height } = useAnimatedKeyboard();
  const stylez = useAnimatedStyle(
    () => ({
      paddingBottom: height.value + offset,
    }),
    [height, offset]
  );

  return <Animated.View style={[stylez, style]} {...props} />;
}
