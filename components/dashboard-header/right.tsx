import { Plus, User } from "phosphor-react-native";
import React from "react";
import { Pressable } from "react-native";

import Row from "components/row";
import { theme } from "themes";

import OtherMenu from "./other";

interface DashboardHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeaderRight({
  onPressProfile,
  onPressCreate,
}: DashboardHeaderRightProps) {
  return (
    <Row gap={8}>
      <OtherMenu />
      <Pressable accessibilityRole="button" onPress={onPressCreate}>
        <Plus color={theme.colors.text} />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onPressProfile}>
        <User color={theme.colors.text} />
      </Pressable>
    </Row>
  );
}
