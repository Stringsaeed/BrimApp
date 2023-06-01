import React from "react";
import { Heading, Stack, useTheme } from "tamagui";
import { ChevronRightIcon } from "lucide-react-native";

import { Note } from "types";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
}

export default function NoteListItemView({ item, onPress }: NoteListItemProps) {
  const theme = useTheme();
  return (
    <Stack
      accessibilityRole="button"
      borderRadius="$10"
      paddingHorizontal={16}
      paddingVertical={8}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      bg="$purple12"
      onPress={onPress}
    >
      <Heading color="$yellow10" numberOfLines={1}>
        {item.note}
      </Heading>
      <ChevronRightIcon color={theme.yellow10.val} />
    </Stack>
  );
}
