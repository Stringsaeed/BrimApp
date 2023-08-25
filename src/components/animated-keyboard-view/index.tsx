import { View } from "moti";
import React, { ComponentProps } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, getTokenValue } from "tamagui";

import Spacer from "components/spacer";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

type Props = Omit<ComponentProps<typeof AnimatedYStack>, "key"> & {
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

export default function AnimatedKeyboardView({ children, ...props }: Props) {
  const { bottom, top } = useSafeAreaInsets();
  const token$5Value = getTokenValue("$5", "space");
  const token$3and5Value = getTokenValue("$3.5", "size");
  const { height } = useAnimatedKeyboard();
  const stylez = useAnimatedStyle(
    () => ({
      paddingBottom: withTiming(
        height.value ? height.value : Math.max(bottom, token$3and5Value)
      ),
    }),
    [height, bottom]
  );

  return (
    <AnimatedYStack
      {...props}
      pt={top + token$5Value}
      gap={24}
      px="$3.5"
      bg="$colorTransparent"
      flex={1}
      style={stylez}
    >
      {React.Children.toArray(children).map((child, idx) => {
        if (React.isValidElement(child) && child.type !== Spacer) {
          return wrapWithAnimatedView(child, idx);
        }
        return child;
      })}
    </AnimatedYStack>
  );
}
