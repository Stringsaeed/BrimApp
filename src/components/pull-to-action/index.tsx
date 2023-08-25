import { useHeaderHeight } from "@react-navigation/elements";
import { Plus } from "phosphor-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, XStack } from "tamagui";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

interface PullToActionProps {
  children: React.ReactNode;
}

export default function PullToAction({ children }: PullToActionProps) {
  const { bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const actualTop = headerHeight + 16;

  const translateValue = useSharedValue(0);
  const scrollViewGesture = Gesture.Native();
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateValue.value = event.translationY > 0 ? event.translationY : 0;
    })
    .onEnd(() => {
      translateValue.value = withTiming(0, {
        easing: Easing.linear,
        duration: 350,
      });
    });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      height: translateValue.value,
    };
  });

  const plusIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(
            translateValue.value,
            [0, 80],
            [-30, 0],
            Extrapolation.CLAMP
          )}deg`,
        },
        {
          scale: interpolate(
            translateValue.value,
            [0, 80],
            [0.9, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        translateValue.value,
        [40, 70],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <GestureDetector
      gesture={Gesture.Simultaneous(panGesture, scrollViewGesture)}
    >
      <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          { paddingTop: actualTop, paddingBottom: bottom },
        ]}
      >
        <AnimatedXStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          px="$4"
          style={animatedViewStyle}
        >
          <AnimatedView
            flex={1}
            alignItems="center"
            style={plusIconAnimatedStyle}
          >
            <Plus />
          </AnimatedView>
        </AnimatedXStack>
        {children}
      </Animated.ScrollView>
    </GestureDetector>
  );
}
/*
flex={1}
        pb="$4"
        contentContainerStyle={[
          $contentContainerStyle,
          { paddingTop: actualTop, paddingBottom: bottom },
        ]}*/

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  container: { flex: 1 },
});
