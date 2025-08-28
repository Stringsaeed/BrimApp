import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { Overlay } from "./components/overlay";
import { useImmersiveOverlayStore } from "./store";

export const ImmersiveOverlay = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { displayImmersiveOverlay } = useImmersiveOverlayStore();

  // This give us our 'warp' effect.
  const intensity = 0.1;
  const progress = useDerivedValue(() => {
    if (displayImmersiveOverlay.value) {
      return withSequence(
        withTiming(1, {
          easing: Easing.bezier(0.65, 0, 0.35, 1),
          duration: 300,
        }),
        withTiming(0, {
          easing: Easing.bezier(0.22, 1, 0.36, 1),
          duration: 1500,
        })
      );
    }
    return withTiming(0, { duration: 300 });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${progress.value * -5}deg` },
        { skewY: `${-progress.value * 1.5}deg` },
        { scaleY: 1 + progress.value * intensity },
        { scaleX: 1 - progress.value * intensity * 0.6 },
      ],
    };
  });

  return (
    <>
      {/* This is our overlay component, the main animation */}
      <Overlay />
      {/* our children, where the 'warp' effect takes place. */}
      <Animated.View
        style={[
          {
            transformOrigin: "top",
            flex: 1,
          },
          animatedStyle,
        ]}
        entering={FadeIn}
        exiting={FadeOut}
      >
        {children}
      </Animated.View>
    </>
  );
};
