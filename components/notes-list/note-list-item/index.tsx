import React, { useMemo } from "react";
import { ListItem } from "tamagui";
import { ArrowRight } from "phosphor-react-native";

import { Note } from "types";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
}

const regex = /<[^>]+>([^<]+)<\/[a-z]+>/i;

export default function NoteListItemView({ item, onPress }: NoteListItemProps) {
  const content = useMemo(() => {
    const match = item.note.match(regex);

    return match?.[1] ?? item.note;
  }, [item.note]);

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
