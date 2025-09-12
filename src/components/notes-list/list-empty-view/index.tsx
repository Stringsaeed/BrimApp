import { Plus } from "@tamagui/lucide-icons";
import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Paragraph, XStack, YStack } from "tamagui";

import Spacing from "@/components/spacing";
import { usePullToActionContext } from "@/contexts";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

export default function ListEmptyView() {
  const { bottom } = useSafeAreaInsets();
  const { translateY } = usePullToActionContext();

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, 100], [1, 0]),
    };
  });

  return (
    <AnimatedYStack
      entering={FadeIn}
      exiting={FadeOut}
      justifyContent="center"
      flex={1}
      style={stylez}
      marginBottom={-bottom}
    >
      <YStack justifyContent="center" alignItems="center" pb="$7">
        <Paragraph>No Notes?</Paragraph>
        <Spacing />
        <XStack alignItems="center" gap="$2">
          <Paragraph>Click the </Paragraph>
          <Plus size={18} />
          <Paragraph> button to create your first note!</Paragraph>
        </XStack>
      </YStack>
    </AnimatedYStack>
  );
}
