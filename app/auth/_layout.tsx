import { Slot } from "expo-router";
import React from "react";
import { ViewStyle } from "react-native";

import { AnimatedKeyboardView } from "components";
import { theme } from "themes";

export default function AuthLayout() {
  return (
    <AnimatedKeyboardView style={container}>
      <Slot />
    </AnimatedKeyboardView>
  );
}

const container: ViewStyle = {
  backgroundColor: theme.colors.background,
  justifyContent: "center",
  paddingHorizontal: 16,
  alignItems: "center",
  gap: 24,
  flex: 1,
};
