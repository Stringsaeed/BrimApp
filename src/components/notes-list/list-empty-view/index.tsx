import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "phosphor-react-native";
import React, { useCallback } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Spacing from "components/spacing";
import { Body } from "components/typography";
import { useNotesList } from "contexts";
import { useCreateEmptyNoteMutation } from "hooks";
import { theme } from "themes";

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
      <Animated.View style={$emptyContainer}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            theme.colors.background,
            theme.colors.background,
            theme.colors.primary,
          ]}
        />
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[$emptyContainer, stylez]}
        >
          <View style={$emptyContent}>
            <Body>No Notes?</Body>
            <Spacing />
            <Body>
              Click the <Plus size={18} /> button to create your first note!
            </Body>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const $emptyContainer: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
};

const $emptyContent: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 40,
};
