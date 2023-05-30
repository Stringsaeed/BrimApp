import React from "react";
import { ChevronRightIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

import { Note } from "contexts";

export interface NoteListItemProps {
  item: Note;
}

export default function NoteListItemView({ item }: NoteListItemProps) {
  return (
    <Pressable style={styles.container} accessibilityRole="button">
      <Text numberOfLines={1}>{item.note}</Text>
      <ChevronRightIcon color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    borderWidth: 1,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
