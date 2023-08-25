import React, { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AnimatedKeyboardView from "components/animated-keyboard-view";

export default function AccountInfoContainer({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: { bottom: 0, right: 0, left: 0, top: 0 },
        frame: { height: 0, width: 0, y: 0, x: 0 },
      }}
    >
      <AnimatedKeyboardView gap="$5" px="$4" pt="$5" flex={1}>
        {children}
      </AnimatedKeyboardView>
    </SafeAreaProvider>
  );
}
