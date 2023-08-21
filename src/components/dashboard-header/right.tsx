import { MotiView } from "moti";
import { Plus, User } from "phosphor-react-native";
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import Row from "components/row";
import { theme } from "themes";

import OtherMenu from "./other";

interface DashboardHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
  createAnimatedStyle?: Animated.AnimateStyle<ViewStyle>;
}

export default function DashboardHeaderRight({
  createAnimatedStyle,
  onPressProfile,
  onPressCreate,
}: DashboardHeaderRightProps) {
  return (
    <Row gap={8} center>
      <OtherMenu />
      <MotiView
        from={{
          opacity: 0,
          scale: 0.2,
        }}
        style={createAnimatedStyle}
        transition={{ type: "spring" }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Pressable
          accessibilityRole="button"
          style={{
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            padding: 6,
          }}
          onPress={onPressCreate}
        >
          <Plus color={theme.colors.onPrimary} size={16} weight="bold" />
        </Pressable>
      </MotiView>
      <Pressable accessibilityRole="button" onPress={onPressProfile}>
        <User color={theme.colors.text} />
      </Pressable>
    </Row>
  );
}
