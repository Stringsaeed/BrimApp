import { Plus, User } from "phosphor-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface NotesHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function NotesHeaderRight({
  onPressCreate,
  onPressProfile,
}: NotesHeaderRightProps) {
  return (
    <View style={{ gap: 8, flexDirection: "row" }}>
      <Pressable accessibilityRole="button" onPress={onPressCreate}>
        <Plus color="black" />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onPressProfile}>
        <User color="black" />
      </Pressable>
    </View>
  );
}
