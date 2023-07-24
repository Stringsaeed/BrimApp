import React from "react";
import { ViewProps } from "react-native";
import Animated, {
  AnimateProps,
  Layout,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

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
    () => ({ paddingBottom: height.value + offset }),
    [height, offset]
  );

  return (
    <Animated.View
      layout={Layout.springify()}
      style={[stylez, style]}
      {...props}
    />
  );
}
