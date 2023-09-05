import { LinearGradient } from "@tamagui/linear-gradient";
import { BlurTint, BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import { View, useThemeName } from "tamagui";

import AnimatedKeyboardView from "components/animated-keyboard-view";

import { AuthLayoutProps } from "./types";

export default function AuthLayout({ children }: AuthLayoutProps) {
  const themeName = useThemeName();

  return (
    <View flex={1}>
      <LinearGradient
        flex={1}
        style={StyleSheet.absoluteFill}
        colors={["$background", "$background", "$pink6"]}
      />
      <BlurView intensity={10} tint={themeName as BlurTint} />
      <AnimatedKeyboardView offset={40}>{children}</AnimatedKeyboardView>
    </View>
  );
}
