import React, { PropsWithChildren } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { View } from "tamagui";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function AccountInfoContainer({ children }: PropsWithChildren) {
  return (
    <AnimatedView
      testID="account-info-container"
      layout={LinearTransition}
      gap="$5"
      px="$4"
      pt="$5"
      flex={1}
    >
      {children}
    </AnimatedView>
  );
}
