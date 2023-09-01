import { LinearGradient } from "@tamagui/linear-gradient";
import { BlurTint, BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import { View, useThemeName } from "tamagui";

import AnimatedKeyboardView from "components/animated-keyboard-view";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeName = useThemeName();

  return (
    <View flex={1}>
      <LinearGradient
        style={[StyleSheet.absoluteFill, { flex: 1 }]}
        colors={["$background", "$background", "$pink6"]}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={10}
        tint={themeName as BlurTint}
      />
      <AnimatedKeyboardView offset={40}>{children}</AnimatedKeyboardView>
    </View>
  );
}
