import React, { ComponentProps } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, getTokenValue } from "tamagui";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

type Props = Omit<ComponentProps<typeof AnimatedYStack>, "key"> & {
  offset?: number;
  handleTopSafeArea?: boolean;
};

export default function AnimatedKeyboardView({
  handleTopSafeArea = true,
  children,
  ...props
}: Props) {
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
      pt={(handleTopSafeArea ? top : 0) + token$5Value}
      gap={24}
      px="$3.5"
      bg="$colorTransparent"
      flex={1}
      style={stylez}
      {...props}
    >
      {children}
    </AnimatedYStack>
  );
}
