import { Plus, User } from "phosphor-react-native";
import React from "react";
import { Pressable } from "react-native";

import Row from "components/row";

interface NotesHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function NotesHeaderRight({
  onPressProfile,
  onPressCreate,
}: NotesHeaderRightProps) {
  return (
    <Row gap={8}>
      <Pressable accessibilityRole="button" onPress={onPressCreate}>
        <Plus color="black" />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onPressProfile}>
        <User color="black" />
      </Pressable>
    </Row>
  );
}
