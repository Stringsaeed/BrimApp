import { ViewStyle } from "react-native";
import { Slot } from "expo-router";
import React from "react";
import { theme } from "themes";
import { AnimatedKeyboardView } from "components";

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
