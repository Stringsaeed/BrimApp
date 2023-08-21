import { useSx } from "dripsy";
import { View } from "moti";
import React from "react";
import { ViewProps } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Spacer from "components/spacer";

type Props = ViewProps & {
  offset?: number;
};

const from = {
  transform: [{ translateY: -20 }],
  opacity: 0,
};
const animate = {
  transform: [{ translateY: 0 }],
  opacity: 1,
};

const wrapWithAnimatedView = (child: React.ReactNode, idx: number) => {
  return (
    <View
      key={idx}
      transition={{ type: "spring" }}
      from={from}
      animate={animate}
    >
      {child}
    </View>
  );
};

export default function AnimatedKeyboardView({
  offset = 0,
  children,
  ...props
}: Props) {
  const sx = useSx();
  const { bottom, top } = useSafeAreaInsets();
  const { height } = useAnimatedKeyboard();
  const stylez = useAnimatedStyle(
    () => ({
      paddingBottom: withTiming(height.value && height.value + offset),
    }),
    [height, offset]
  );

  return (
    <Animated.View
      {...props}
      style={[
        sx({
          bg: "white",
          flex: 1,
        }),
        stylez,
      ]}
    >
      <Animated.ScrollView
        style={sx({ flex: 1 })}
        contentContainerStyle={sx({
          paddingBottom: Math.max(bottom, 40),
          paddingTop: top + 16,
          bg: "$background",
          flexGrow: 1,
          pb: "$4",
          px: "$3",
          gap: 24,
        })}
      >
        {React.Children.toArray(children).map((child, idx) => {
          if (React.isValidElement(child) && child.type !== Spacer) {
            return wrapWithAnimatedView(child, idx);
          }
          console.log("i'm spacer");

          return child;
        })}
      </Animated.ScrollView>
    </Animated.View>
  );
}
