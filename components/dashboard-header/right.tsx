import Row from "components/row";
import { List, Plus, User } from "phosphor-react-native";
import React from "react";
import { Pressable } from "react-native";

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
      <Pressable accessibilityRole="button" onPress={onPressCreate}>
        <List color="black" />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onPressCreate}>
        <Plus color="black" />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onPressProfile}>
        <User color="black" />
      </Pressable>
    </Row>
  );
}
