import React from "react";
import { ScrollView, Separator, YGroup } from "tamagui";

import { Note } from "types";

import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

export default function NotesList({ notes, onPressNote }: NotesListProps) {
  return (
    <ScrollView flex={1} contentContainerStyle={$content}>
      <YGroup
        bg="beige"
        size="$20"
        separator={<Separator borderColor="$purple5" />}
      >
        {notes.map((item) => (
          <NoteListItemView
            key={item.id}
            item={item}
            onPress={() => onPressNote(item)}
          />
        ))}
      </YGroup>
    </ScrollView>
  );
}

const $content = {
  flexGrow: 1,
};
