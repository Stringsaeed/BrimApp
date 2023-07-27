import { Slot } from "expo-router";
import React from "react";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedKeyboardView } from "components";
import { theme } from "themes";

export default function AuthLayout() {
  return (
    <SafeAreaView style={safeArea}>
      <AnimatedKeyboardView style={container}>
        <Slot />
      </AnimatedKeyboardView>
    </SafeAreaView>
  );
}

const safeArea: ViewStyle = {
  backgroundColor: theme.colors.background,
  flex: 1,
};

const container: ViewStyle = {
  backgroundColor: theme.colors.background,
  paddingHorizontal: 16,
  gap: 24,
  flex: 1,
};
