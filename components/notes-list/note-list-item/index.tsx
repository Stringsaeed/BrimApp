import React, { useMemo } from "react";
import { ArrowRight } from "phosphor-react-native";
import { Pressable } from "react-native";

import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";
import Body from "components/body";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
}

export default function NoteListItemView({ item, onPress }: NoteListItemProps) {
  const content = useMemo(() => {
    const title = getNoteTitle(item.note);
    if (!item.is_private) return title;

    return cipherTitle(title);
  }, [item.is_private, item.note]);

  return (
    <Pressable
      accessibilityRole="button"
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
      onPress={onPress}
    >
      <Body>{content}</Body>
      <ArrowRight color="black" />
    </Pressable>
  );
}
