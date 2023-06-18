import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "phosphor-react-native";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import Spacing from "components/spacing";
import { Body } from "components/typography";
import { theme } from "themes";

interface Props {
  height: number;
}
export default function ListEmptyView({ height }: Props) {
  if (height <= 0) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[$emptyContainer, { height }]}
    >
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={[
          theme.colors.background,
          theme.colors.background,
          theme.colors.primary,
        ]}
      />
      <View style={$emptyContent}>
        <Body>No Notes?</Body>
        <Spacing />
        <Body>
          Click the <Plus size={18} /> button to create your first note!
        </Body>
      </View>
    </Animated.View>
  );
}

const $emptyContainer: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
};

const $emptyContent: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 40,
};
