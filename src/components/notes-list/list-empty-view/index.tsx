import { Plus } from "phosphor-react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Paragraph, YStack } from "tamagui";

import Spacing from "components/spacing";
import { usePullToActionContext } from "contexts";

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
        <Paragraph>
          Click the <Plus size={18} /> button to create your first note!
        </Paragraph>
      </YStack>
    </AnimatedYStack>
  );
}
