import React, { PropsWithChildren } from "react";
import Animated, { Layout } from "react-native-reanimated";
import { View } from "tamagui";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function AccountInfoContainer({ children }: PropsWithChildren) {
  return (
    <AnimatedView layout={Layout} gap="$5" px="$4" pt="$5" flex={1}>
      {children}
    </AnimatedView>
  );
}
