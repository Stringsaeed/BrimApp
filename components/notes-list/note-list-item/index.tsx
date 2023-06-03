import React, { useMemo } from "react";
import { ListItem } from "tamagui";
import { ArrowRight } from "phosphor-react-native";

import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";

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
    <ListItem
      bg="beige"
      // borderWidth="$1"
      onPress={onPress}
      textProps={{ numberOfLines: 1 }}
      iconAfter={<ArrowRight color="black" />}
    >
      {content}
    </ListItem>
  );
}
