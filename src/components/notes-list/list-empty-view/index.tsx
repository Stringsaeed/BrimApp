import * as Haptics from "expo-haptics";
import { Plus } from "phosphor-react-native";
import React, { useCallback } from "react";
import { Platform, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Paragraph, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import Spacing from "components/spacing";
import { useNotesList } from "contexts";
import { useCreateEmptyNoteMutation } from "hooks";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

export default function ListEmptyView() {
  const { emptyScreenTranslateY: translateY } = useNotesList();
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const onCreate = useCallback(async () => {
    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    await createEmptyNoteMutation();
  }, [createEmptyNoteMutation]);

  const gesture = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + translateY.value;
      if (offsetDelta <= 0) return;
      translateY.value = offsetDelta;
    })
    .onFinalize((e) => {
      // handle create note
      // first we need to add haptic feedback
      // then we need to navigate to the create note screen
      if (e.translationY > 100) {
        translateY.value = withTiming(0);
        runOnJS(onCreate)();
      }
    })
    .onEnd(() => {
      translateY.value = withTiming(0);
    })
    .maxPointers(1);

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, 100], [1, 0]),
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedYStack flex={1} justifyContent="flex-end">
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["$background", "$background", "$accent"]}
        />
        <AnimatedYStack
          entering={FadeIn}
          exiting={FadeOut}
          justifyContent="flex-end"
          flex={1}
          style={stylez}
        >
          <YStack justifyContent="center" alignItems="center" pb="$7">
            <Paragraph>No Notes?</Paragraph>
            <Spacing />
            <Paragraph>
              Click the <Plus size={18} /> button to create your first note!
            </Paragraph>
          </YStack>
        </AnimatedYStack>
      </AnimatedYStack>
    </GestureDetector>
  );
}
