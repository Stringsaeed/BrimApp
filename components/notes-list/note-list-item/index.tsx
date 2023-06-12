import React, { useMemo } from "react";
import { ArrowRight } from "phosphor-react-native";
import { Pressable, StyleSheet } from "react-native";

import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";
import { Body } from "components/typography";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
}

export default function NoteListItemView({ onPress, item }: NoteListItemProps) {
  const content = useMemo(() => {
    const title = getNoteTitle(item.note);
    if (!item.is_private) return title;

    return cipherTitle(title);
  }, [item.is_private, item.note]);

  return (
    <Pressable
      accessibilityRole="button"
      style={styles.container}
      onPress={onPress}
    >
      <Body numberOfLines={1}>{content}</Body>
      <ArrowRight color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
  },
});
