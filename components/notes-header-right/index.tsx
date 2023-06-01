import { PlusIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { Stack } from "tamagui";

interface NotesHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function NotesHeaderRight({
  onPressCreate,
  onPressProfile,
}: NotesHeaderRightProps) {
  return (
    <Stack gap={8} flexDirection="row">
      <Stack accessibilityRole="button" onPress={onPressCreate}>
        <PlusIcon color="black" />
      </Stack>
      <Stack accessibilityRole="button" onPress={onPressProfile}>
        <UserIcon color="black" />
      </Stack>
    </Stack>
  );
}
